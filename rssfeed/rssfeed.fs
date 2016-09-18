module rssFeed

open Suave
open Suave.Filters
open Suave.Operators
open Suave.Response
open Suave.Successful
open Suave.Files
open Suave.Filters
open Suave.Json

open Chiron

open System.IO
open System.Net
open System.Json
open System.Runtime.Serialization
open System.Text

open Messages
open RSSReader
open Db

let exists (x: string option) =
    match x with
    | Some(x) -> printfn "%s" x
    | None -> printf "Not found"

let alphabet = [ '0' .. '9' ] @ [ 'a' .. 'z' ] @ [ 'A' .. 'Z' ] |> Array.ofList
let alphabetMap = Seq.zip alphabet [ 0 .. alphabet.Length - 1 ] |> dict

let pathWithId pf f =
  pathScan pf (fun id ctx -> async {
    if Seq.forall (alphabetMap.ContainsKey) id then
      return! f id ctx
    else return None } )

let serializeFeed (x: Db.Feed): Json =
    Object <| Map.ofList [
          "feedid", Number (decimal x.Feedid);
          "name", String x.Name;
          "description", String x.Description;
          "source", String x.Source ]

let serializeFeeds (fs: Db.Feed List): Json =
  Array [for f in fs -> serializeFeed f]

let feeds: WebPart =
  Db.getContext()
  |> Db.getFeeds
  |> serializeFeeds
  |> Json.formatWith JsonFormattingOptions.Pretty
  |> OK >=> Writers.setMimeType "application/json; charset=utf-8"

let feedById (feedId: string) =
  Db.getFeedById(Db.getContext(), feedId)
  |> serializeFeed
  |> Json.formatWith JsonFormattingOptions.Pretty
  |> OK >=> Writers.setMimeType "application/json; charset=utf-8"

let app : WebPart =
  choose [
    GET >=> choose
      [
        path "/" >=> file "rssfeed/web/public/index.html"
        pathScan "/public/%s" (fun (filename) -> file (sprintf "rssfeed/web/public/%s" filename))
        path "/api/feeds" >=> feeds
        pathWithId "/api/feedById/%s" feedById
      ]
  ]

[<EntryPoint>]
let main argv =
    printfn "Starting Suave server on port 8083"
    startWebServer defaultConfig app
    0

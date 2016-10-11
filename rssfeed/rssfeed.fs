module RssFeed

open Suave
open Suave.Filters
open Suave.Operators
open Suave.Response
open Suave.Successful
open Suave.Files
open Suave.Filters
open Suave.Json

open Chiron

open FSharp.Data

open System.IO
open System.Net
open System.Json
open System.Runtime.Serialization
open System.Text

open Messages
open XmlLoader
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
          "source", String x.Source ]

let serializeFeeds (fs: Db.Feed List): Json =
  Array [for f in fs -> serializeFeed f]

let serializeMessage (ms: string * string * string): Json =
  let fst, snd, trd = ms
  Object <| Map.ofList [
    "title", String fst;
    "link", String snd;
    "description", String trd ]

let serializeMessages (ms: List<string * string * string>): Json =
  Array [for f in ms -> serializeMessage f]

let loadRssFeed(url: string): List<string * string * string> =
  let doc = XmlLoader.Load(url, LowerCase = true)
  let (Messages.Rss(Channel(Title title, Link link, Description description, items))) = doc.Root
  let items = seq {
    for (Item(Title title, Link link, Description description)) in items do
      yield title, link, description
  }
  Seq.toList items

let loadRssName(url: string): string =
  let doc = XmlLoader.Load(url, LowerCase = true)
  let (Messages.Rss(Channel(Title title, Link link, Description description, items))) = doc.Root
  title

let feeds() =
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

let messagesByFeedId (feedId) =
  let feed = Db.getFeedById(Db.getContext(), feedId)
  loadRssFeed(feed.Source)
  |> serializeMessages
  |> Json.formatWith JsonFormattingOptions.Pretty
  |> OK >=> Writers.setMimeType "application/json; charset=utf-8"

let insertFeed<'a> (req : HttpRequest) =
  let getString rawForm = System.Text.Encoding.UTF8.GetString(rawForm)
  let data: FeedSource  = req.rawForm |> getString |> Json.parse |> Json.deserialize
  let feedName = loadRssName(data.Source)
  Db.insertNewFeed(feedName, data.Source) (Db.getContext())
  |> serializeFeed
  |> Json.formatWith JsonFormattingOptions.Pretty
  |> OK >=> Writers.setMimeType "application/json; charset=utf-8"

let deleteFeed<'b> (req: HttpRequest) =
  let getString rawForm = System.Text.Encoding.UTF8.GetString(rawForm)
  let data: FeedName = req.rawForm |> getString |> Json.parse |> Json.deserialize
  Db.deleteFeedByName(data.Name) (Db.getContext())
  |> serializeFeed
  |> Json.formatWith JsonFormattingOptions.Pretty
  |> OK >=> Writers.setMimeType "application/json; charset=utf-8"

let app : WebPart =
  choose [
    GET >=> choose
      [
        path "/" >=> file "rssfeed/web/public/index.html"
        pathScan "/public/%s" (fun filename -> file (sprintf "rssfeed/web/public/%s" filename))
        path "/api/feeds" >=> request (fun req -> feeds())
        pathWithId "/api/feedById/%s" feedById
        pathWithId "/api/feedContentById/%s" messagesByFeedId
      ]
    POST >=> choose
      [ path "/api/newFeed" >=> request (insertFeed)
        path "/api/deleteFeed" >=> request (deleteFeed) ]
    RequestErrors.NOT_FOUND "Found no handlers"
  ]

[<EntryPoint>]
let main argv =
    printfn "Starting Suave server on port 8083"
    startWebServer defaultConfig app
    0

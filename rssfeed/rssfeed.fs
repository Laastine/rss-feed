module rssFeed

open Suave
open Suave.Filters
open Suave.Operators
open Suave.Response
open Suave.Successful
open Suave.Files
open Suave.Filters
open Suave.Json
open System.Runtime.Serialization

open Chiron

open System.IO
open System.Net
open System.Json
open System.Text

open Messages
open Db

let fetch (url: string) =
  try
    let req = WebRequest.Create(url) :?> HttpWebRequest
    req.UserAgent <- "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"
    req.Timeout <- 3000
    use response = req.GetResponse()
    let content = response.ContentType
    let isXML = RegularExpressions.Regex("xml").IsMatch(content)
    match isXML with
    | true -> use stream = response.GetResponseStream()
              use reader = new StreamReader(stream)
              let xml = reader.ReadToEnd()
              Some xml
    | false -> None
  with
  | _ -> None

let exists (x : string option) =
    match x with
    | Some(x) -> printfn "%s" x
    | None -> printf "Not found"

let serializeFeed (x: Db.Feed) =
    Object <| Map.ofList [
          "feedid", Number (decimal x.Feedid); 
          "name", String x.Name;
          "description", String x.Description ]

let serializeFeeds (fs: Db.Feed List) =
  Array [for f in fs -> serializeFeed f]

let feeds = 
  Db.getContext()
  |> Db.getFeeds
  |> serializeFeeds

let app : WebPart =
  choose [
    GET >=> choose
      [ 
        path "/" >=> file "rssfeed/web/public/index.html"
        pathScan "/public/%s" (fun (filename) -> file (sprintf "rssfeed/web/public/%s" filename))
        path "/api/feeds"
        >=> OK (Json.formatWith JsonFormattingOptions.Pretty feeds)
        >=> Writers.setMimeType "application/json; charset=utf-8"]
  ]

[<EntryPoint>]
let main argv =
    printfn "Starting Suave server on port 8083"
    startWebServer defaultConfig app
    0

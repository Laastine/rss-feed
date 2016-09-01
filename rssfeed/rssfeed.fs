module rssfeed

open Suave
open Suave.Filters
open Suave.Operators
open Suave.Response
open Suave.Files

open System
open System.IO
open System.Net
open System.Text.RegularExpressions

let getVar (envVar: string) = 
  System.Environment.GetEnvironmentVariables()
  |> Seq.cast<System.Collections.DictionaryEntry>
  |> Seq.map (fun d -> d.Key :?> string, d.Value :?> string)
  |> Seq.filter (fun x -> String.Compare(fst x, envVar) = 0)

let fetch (url: string) =
  try
    let req = WebRequest.Create(url) :?> HttpWebRequest
    req.UserAgent <- "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"
    req.Timeout <- 3000
    use response = req.GetResponse()
    let content = response.ContentType
    let isXML = Regex("xml").IsMatch(content)
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

let app : WebPart =
  choose [
    GET >=> choose
      [ 
        path "/" >=> file "rssfeed/web/public/index.html"
        pathScan "%s" (fun (filename) -> file (sprintf "rssfeed/web/public/%s" filename)) ]
  ]

[<EntryPoint>]
let main argv =
    printfn "Starting Suave server on port 8083"
    let addr = getVar("POSTGRES_URL")
    printfn "%A" addr
    startWebServer defaultConfig app
    0

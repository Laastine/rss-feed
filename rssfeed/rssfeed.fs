module rssfeed

open System.IO
open System.Net
open System.Text.RegularExpressions

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
    | Some(x) -> printf "%s\n" x
    | None -> printf "Not found"

[<EntryPoint>]
let main argv =
    printfn "Starting Suave server on port 8083"
    let xml = fetch "http://feeds.feedburner.com/RockPaperShotgun"
    exists(xml)
    0

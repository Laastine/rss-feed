module rssfeed

open Suave

[<EntryPoint>]
let main argv =
    printfn "Starting Suave server on port 8083"
    startWebServer defaultConfig (Successful.OK "Hello World!")
    0 // return an integer exit code

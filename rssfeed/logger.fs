module Logger

open Suave.Logging

let infoLogger line =
  printfn "INFO: %s" (line ()).message

let debugLogger line =
  printfn "DEBUG: %s" (line ()).message

let errorLogger line =
  printfn "ERROR: %s" (line ()).message

type ServerLogger() =
  interface Logger with
    member __.Log level line =
      match level with
      | LogLevel.Info -> infoLogger line
      | LogLevel.Debug -> debugLogger line
      | LogLevel.Error -> errorLogger line
      | _ -> ()

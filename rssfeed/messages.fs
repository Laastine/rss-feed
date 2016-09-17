namespace Messages

open System.IO
open System.Text
open Chiron
open Chiron.Operators

type Feed = {
  FeedId: int
  Name: string
  Description: string
  Source: string
}

type Feed with
  static member ToJson (f: Feed) =
    Json.write "feedid" f.FeedId
    *> Json.write "name" f.Name
    *> Json.write "description" f.Description
    *> Json.write "source" f.Source
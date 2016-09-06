namespace Messages

open System.IO
open System.Text
open System.Json
open Fleece
open Fleece.Operators

type Feed = {
  FeedId: int
  Name: string
  Description: string
}

type Feed with
  static member ToJSON (f: Feed) =
    jobj [
      "feedid" .= f.FeedId
      "name" .= f.Name
      "description" .= f.Description
    ]

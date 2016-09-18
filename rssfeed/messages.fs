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

type Title = Title of string
type Link = Link of string
type Description = Description of string

type Item = Item of Title * Link * Description
type Channel = Channel of Title * Link * Description * list<Item>

type Rss = Rss of Channel

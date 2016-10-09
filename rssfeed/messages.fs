module Messages

open Chiron
open Chiron.Operators

type FeedSource =
  { Source: string }

  static member FromJson (_: FeedSource): Json<FeedSource> =
    fun f -> { Source = f }
    <!> Json.read "source"
  static member ToJson (f: FeedSource) =
    Json.write "source" f.Source

type Title = Title of string
type Link = Link of string

type Item = Item of Title * Link
type Channel = Channel of Title * Link * list<Item>

type Rss = Rss of Channel

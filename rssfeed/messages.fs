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

type FeedName =
  { Name: string }

  static member FromJson (_: FeedName): Json<FeedName> =
    fun f -> { Name = f }
    <!> Json.read "name"
  static member ToJson (f: FeedName) =
    Json.write "name" f.Name

type Title = Title of string
type Link = Link of string
type Description = Description of string

type Item = Item of Title * Link * Description
type Channel = Channel of Title * Link * Description * list<Item>

type Rss = Rss of Channel

type AtomTitle = AtomTitle of string
type AtomSummary = AtomSummary of string
type AtomLink = AtomLink of string
type AtomContent = AtomContent of string

type AtomEntry = AtomEntry of AtomTitle * AtomLink * AtomSummary * AtomContent
type AtomChannel = AtomChannel of AtomTitle * AtomLink * list<AtomEntry>

type Atom = Atom of AtomChannel

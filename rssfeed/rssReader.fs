module RSSReader

open FSharp.Data
open StructuralXml

type Title = Title of string
type Link = Link of string
type Description = Description of string

type Item = Item of Title * Link * Description
type Channel = Channel of Title * Link * Description * list<Item>

type Rss = Rss of Channel

type Listing =
  { Title: string
    Link: string
    Items: seq<string * string * string>
  }

let loadRssFeed(url: string) =
  let doc = StructuralXml.Load(url, LowerCase = true)
  let (Rss(Channel(Title title, Link link, _, items))) = doc.Root
  let items = seq {
    for (Item(Title title, Link link, Description description)) in items do
      yield title, link, description
  }
  items

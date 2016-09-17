module XmlReader

open FSharp.Data

type Rss = XmlProvider<"http://feeds.feedburner.com/RockPaperShotgun">

let blog = Rss.GetSample()



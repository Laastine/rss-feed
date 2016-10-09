module Db

open System
open FSharp.Configuration
open FSharp.Data.Sql

let getEnvVar (envVar: string) =
  let d = System.Environment.GetEnvironmentVariables()
  d.[envVar] :?> string

type Settings = AppSettings<"app.config">

let configConnectionString = Settings.ConnectionStrings.Localhost

type Sql = SqlDataProvider<
              ConnectionString        = "Server=192.168.99.100;Database=rssfeed;User Id=postgres;Password=postgres",
              DatabaseVendor          = Common.DatabaseProviderTypes.POSTGRESQL,
              CaseSensitivityChange   = Common.CaseSensitivityChange.ORIGINAL >

type DbContext = Sql.dataContext
type Feed = DbContext.``public.feedsEntity``

let getContext() = Sql.GetDataContext configConnectionString  //Override default

let getFeeds (ctx : DbContext) : Feed list =
    ctx.Public.Feeds
    |> Seq.toList

let getHighestFeedId (ctx: DbContext): int =
  getFeeds(ctx)
  |> List.map (fun x -> x.Feedid)
  |> List.max

let getFeedById (ctx: DbContext, feedId: string) : Feed =
    ctx.Public.Feeds
    |> Seq.toList
    |> List.filter(fun (x) -> x.Feedid = System.Int32.Parse(feedId))
    |> List.head

let insertNewFeed (name: string, source: string) (ctx: DbContext): Feed =
    let f = ctx.Public.Feeds.Create()
    let id = getHighestFeedId(ctx) + 1
    f.Feedid <- id
    f.Name <- name
    f.Source <- source
    ctx.SubmitUpdates()
    f

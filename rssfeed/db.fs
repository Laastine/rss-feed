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
  ctx.Public.Feeds |> Seq.toList

let getHighestFeedId (ctx: DbContext): int =
  let feedList = getFeeds(ctx) |> List.map (fun x -> x.Feedid)
  if feedList.Length > 0 then List.max feedList + 1 else 0

let getFeedById (ctx: DbContext, feedId: string) : Feed =
  ctx.Public.Feeds
  |> Seq.toList
  |> List.filter(fun (x) -> x.Feedid = System.Int32.Parse(feedId))
  |> List.head

let getFeedByName (ctx: DbContext, feedName: string) : Feed =
  ctx.Public.Feeds
  |> Seq.toList
  |> List.filter(fun (x) -> x.Name = feedName)
  |> List.head

let insertNewFeed (name: string, source: string) (ctx: DbContext): Feed =
  let f = ctx.Public.Feeds.Create()
  let id() = getHighestFeedId(ctx)
  f.Feedid <- id()
  f.Name <- name
  f.Source <- source
  ctx.SubmitUpdates()
  f

let deleteFeedByName (feedName: string) (ctx: DbContext): Feed =
  let f = getFeedByName(ctx, feedName)
  f.Delete()
  ctx.SubmitUpdates()
  f

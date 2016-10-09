module Db

open System
open FSharp.Configuration
open FSharp.Data.Sql

let (|Int|_|) str =
  match System.Int32.TryParse(str) with
  | (true,int) -> Some(int)
  | _ -> None

let stringToInt32 str =
  match str with
  | Int i -> i
  | _ -> 0

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

let getFeedById (ctx: DbContext, feedId: string) : Feed =
    ctx.Public.Feeds
    |> Seq.toList
    |> List.filter(fun (x) -> x.Feedid = System.Int32.Parse(feedId))
    |> List.head

let insertNewFeed (name: string, description: string, source: string) (ctx: DbContext): Feed =
    let f = ctx.Public.Feeds.Create()
    let id = Guid.NewGuid().ToString("N")
    f.Feedid <- stringToInt32 id
    f.Name <- name
    f.Description <- description
    f.Source <- source
    ctx.SubmitUpdates()
    f

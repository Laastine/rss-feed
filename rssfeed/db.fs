module db

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

let getContext() = Sql.GetDataContext configConnectionString

let getFeeds (ctx : DbContext) : Feed list = 
    ctx.Public.Feeds |> Seq.toList

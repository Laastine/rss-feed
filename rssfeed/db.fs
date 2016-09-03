module db

open System
open FSharp.Data.Sql

let getEnvVar (envVar: string) = 
  let d = System.Environment.GetEnvironmentVariables()
  d.[envVar] :?> string

let addr = "Server=" + getEnvVar "DATABASE_URL" + ";Database=postgres;User Id=postgres;Password=postgres"

type Sql = SqlDataProvider<
              ConnectionString        = "Server=192.168.99.100;Database=rssfeed;User Id=postgres;Password=postgres",
              DatabaseVendor          = Common.DatabaseProviderTypes.POSTGRESQL,
              CaseSensitivityChange   = Common.CaseSensitivityChange.ORIGINAL >

type DbContext = Sql.dataContext
type Feed = DbContext.``public.feedsEntity``

let getContext() = Sql.GetDataContext()

let getFeeds (ctx : DbContext) : Feed list = 
    ctx.Public.Feeds |> Seq.toList

# RSS-feed

### Environment setup (CLI-friendly)
http://fsharp.org/guides/mac-linux-cross-platform/

Mono cross platform .NET framework: `brew install mono`</br>
F# Project Builder: `brew tap samritchie/forge && brew install forge`

### Build and run

#### Front end
 
```
cd rssfeed/web
npm install
npm run build
```

#### DB setup
Create rss-feed virtualbox image:
`docker-machine create --driver virtualbox rss-feed`

Add env variable to your shell where you run docker cmds:
`eval "$(docker-machine env rss-feed)"`

Install postgres DB to docker:
`docker pull postgres:9.6`

Start postgres in docker: 
`docker run --name rss-feed-db -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d postgres:9.6`

Save connection string to .env
`echo -e export DATABASE_URL=`docker-machine ip rss-feed` > .env`

Start docker postgres
`docker-machine start rss-feed ; eval "$(docker-machine env rss-feed)" ; docker start rss-feed-db` after initial setup is done

#### Compile & run app

- Compile sources 
`./build.sh`

- Run application
`mono build/rssfeed.exe`

### F# project tl;dr version
- Fake (make for F#)
- Paket (package manager) `mono .paket/paket.exe add/remove nuget <package name>`
- Forge (CLI project builder) `forge reference add <path to package>`

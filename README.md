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

- Compile sources 
`./build.sh`

- Run application
`mono build/rssfeed.exe`

### F# project tl;dr version
- Fake (make for F#)
- Paket (package manager) `mono .paket/paket.exe add/remove nuget <package name>`
- Forge (CLI project builder) `forge reference add <path to package>`

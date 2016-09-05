module View

open System
open Suave.Html
open Suave.Form

let h2 s = tag "h2" [] (text s)
let aHref href = tag "a" ["href", href]

let notFound = [
    h2 "Page not found"
    p [
        text "Could not find the requested resource"
    ]
    p [
        text "Back to "
        aHref "/" (text "Home")
    ]
]
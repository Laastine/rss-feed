namespace JsonParser

open System.IO
open System.Text
open System.Json
open Fleece
open Fleece.Operators

type Feed = {
  FeedId: int
  Name: string
  Description: string
}


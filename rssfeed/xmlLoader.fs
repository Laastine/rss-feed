namespace XmlLoader

open System
open System.Net
open System.Xml
open System.Xml.Linq

open Microsoft.FSharp.Reflection

module InternalHelper =
  type Helper =
    static member CastList<'T>(input:System.Collections.IEnumerable) =
      input |> Seq.cast<'T> |> List.ofSeq

  let castList objType input =
    let methodInfo = typeof<Helper>.GetMethod("CastList").MakeGenericMethod [| objType |]
    methodInfo.Invoke(null, [| input |])

type XmlLoader<'T> private (url:string, ns, lowerCase) =
  let resolveName (str: string) =
    let lowerCaseStr = if lowerCase then str.ToLower() else str
    match ns with
    | Some(ns) -> XName.Get(lowerCaseStr, ns)
    | _ -> XName.Get(lowerCaseStr)

  let rec parseType (element:XContainer) (targetType:System.Type) =

    let isList, objType =
      if targetType.IsGenericType &&
         targetType.GetGenericTypeDefinition() = typedefof<_ list> then
        true, targetType.GetGenericArguments().[0]
      else false, targetType

    if objType = typeof<string> then
      box (element :?> XElement).Value
    elif not(FSharpType.IsUnion(objType)) then
      failwithf "Expected discriminated union!\nGot: %s" objType.Name
    else
      let children =
        [ for case in FSharpType.GetUnionCases(objType) do
            let fields = case.GetFields()
            let children = element.Elements(resolveName case.Name)
            for ch in children do
              let args = [| for field in fields -> parseType ch field.PropertyType |]
              yield FSharpValue.MakeUnion(case, args) ]

      match isList, children with
      | true, children -> InternalHelper.castList objType children
      | false, [child] -> child
      | false, _ ->
          failwithf
            "Wrong number of children in node (%d).\nWhen formatting XML as '%s'."
            children.Length objType.Name

  let root : 'T = (parseType (XDocument.Load(url)) typeof<'T>) :?> 'T

  member x.Root = root

  static member Load<'T>(url, ?Namespace, ?LowerCase) =
    new XmlLoader<'T>(url, Namespace, defaultArg LowerCase false)

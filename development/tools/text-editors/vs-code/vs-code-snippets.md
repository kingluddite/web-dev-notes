# VS Code Snippets
* `cmd` + `shift` + `p`
* Select `Preferences: Configure User Snippet`
    - Choose global or specific language
* We'll choose `JavaScript(babel)`
    - That will open up a file `javascript.json` that is confusing
    - Delete the contents of the `{}`

## Create a simple log snippet
* prefix - what you want to type
    - **note** Be careful - if you have other snippets with that prefix you will create a CONFLICT!
    - So if you are using a snippet in another 3rd party (ie ES7 React/Redux/GraphQL/React-Native)

```
{
    "Console Log": {
        "prefix": "cl",
        "body": "console.log($1);",
        "description": "Console log"
    }
}
```

### Important notes
* Restart VS Code
* It took a while for the snippets to kick in
* Make sure the file form (bottom right) is `javascript babel`
* I got it to work with `ctrl` + `n` and choosing bottom right `javascript (babel)`

## More complicated snippets
* A named function
* A placeholder (to put our name) `${1:functionName}`
* An argument cursor $2
* The body cursor $3

### We use the `snippet-generator-app` URL (see above)
1. Add a Name
    * That will add a name and a description
    * Add your trigger `nfn`
    * Type in the body how you want it to work
    * Copy it
    * Add it to your custom snippet (in our case `javascript.json`)

```
{
    "Console Log": {
        "prefix": "cl",
        "body": "console.log($1);",
        "description": "Console log",
    },
    "Named Function": {
        "prefix": "nfn",
        "body": [
            "function ${1:namedFunction}($2) {",
            "  ${3}",
            "}"
        ],
        "description": "Named Function"
    }
}
```

## Save and test it
1. Type the trigger in a JavaScript file `nfn`
2. name the function
3. Hit `tab`
4. Enter an argument
5. hit tab
6. Enter the body

## Add an arrow function snippet
```
"Arrow Function": {
  "prefix": "arfn",
  "body": [
    "const ${1:functionName} = ($2) => {",
    "  $3",
    "}"
  ],
  "description": "Arrow Function"
}
```

* Add to the JavaScript file and make sure to add a comma after the last snippet

## Add choices for our snippets
* We can have a dropdown of choices

### Create snippets for array methods of higher order functions
* Array, match, forEach, filter

```
"Array Method": {
  "prefix": "arrmth",
  "body": [
    "${1|forEach,map,filter,reduce,some|}((${item}) => {",
    "  $3",
    "})"
  ],
  "description": "Array Method"
}
```

* To use `arrmth` and choose what array type you want

`javascript.json`

```
{
    "Console Log": {
        "prefix": "cl",
        "body": "console.log($1);",
        "description": "Console log",
    },
    "Named Function": {
        "prefix": "nfn",
        "body": [
            "function ${1:namedFunction}($2) {",
            "  ${3}",
            "}"
        ],
        "description": "Named Function"
    },
    "Arrow Function": {
        "prefix": "arfn",
        "body": [
            "const ${1:functionName} = ($2) => {",
            "  $3",
            "}"
        ],
        "description": "Arrow Function"
    },
    "Array Method": {
        "prefix": "arrmth",
        "body": [
            "${1|forEach,map,filter,reduce,some|}((${2:item}) => {",
            "  $3",
            "})"
        ],
        "description": "Array Method"
    },
    "Route Comment": {
        "prefix": "rcom",
        "body": [
            "// @route.    ${1|GET,POST,DELETE,PUT,PATCH,HEAD,OPTIONS|} ${2:route/}",
            "// @desc.     ${3:description}",
            "// @access.   ${4|PUBLIC,PRIVATE|}"
        ],
        "description": "Route Comment"
    },
    "Dev URLs": {
        "prefix": "durl",
        "body": [
            "// vs-code-snippet-generator https://snippet-generator.app/"
        ],
        "description": "Dev URLs"
    },
    "Axios Request": {
        "prefix": "axreq",
        "body": [
            "axios.${1|GET,POST,PUT,DELETE|}('${2:url}')",
            "     .then(res => console.log(res.data))",
            "     .catch(err => console.log(err))"
        ],
        "description": "Axios Request"
    },
    "Express Server": {
        "prefix": "expsrv",
        "body": [
            "const express = require('express');",
            "",
            "const app = express();",
            "",
            "app.${1|get,post,put,delete|}('${2:route}', (req, res) => {",
            "  $3",
            "});",
            "",
            "const PORT = process.env.PORT || ${4|3000,5000,8000,8080|}",
            "",
            "app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`);"
        ],
        "description": "Express Server"
    }
}
```

## Resource
* [Traverse Media - Code Faster With Custom VS Code Snippets](https://www.youtube.com/watch?v=JIqk9UxgKEc)

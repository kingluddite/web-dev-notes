# CSS Quickstart
## Work with hangman
### Folder/File Management
* Create 2 directories
    - scripts
        + Drag `.js` files inside
    - styles
        + Create `styles.css`

`index.html`

```
<!DOCTYPE html>

<html>
    <head>
      <title>Hangman</title>
      <link rel="stylesheet" href="styles/styles.css">
    </head>
    <body>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <button id="reset">Reset</button>
        <script src="scripts/requests.js"></script>
        <script src="scripts/hangman.js"></script>
        <script src="scripts/app.js"></script>
    </body>
</html>
```

## Houston we have a problem!
* And that problem is `paths`
* We are running on a server and that server is the root so we need to preface our paths to point to the "root" of the server and we do that by starting the path with a `/`
* Our 
* Think of **link** `href` as source for the `script` tag 
## New index.html with the correct "root" path
* This is how we link external CSS and JavaScript
    - We put our path to that file from our web server
        + Our web server starts at `hangman` directory

`<link rel="stylesheet" href="/styles/styles.css">`

* We also set up the `rel` attribute (short for "relationship")
    - And in this case we are just defining that the thing we are linking is of a certain type and the relationship we'll use here is "stylesheet"

`index.html`

```
<!DOCTYPE html>

<html>
    <head>
      <title>Hangman</title>
      <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <button id="reset">Reset</button>
        <script src="/scripts/requests.js"></script>
        <script src="/scripts/hangman.js"></script>
        <script src="/scripts/app.js"></script>
    </body>
</html>
```

## Test to make sure CSS is working
* We'll turn all text red
* Ugly but at least we know CSS is working

`hangman/styles/styles.css`

* `*` is the selector (* is the universal selector (selects everything on the page))
* Inside the curly braces we add our various style declarations
* We just have a single declaration below
    - Property on left of colon
    - Property value on right of colon
* [CSS reference docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

```
* {
  color: red;
}
```

`$ live-server hangman`

* You should see all text is red
* This verifies our app is connected to the the external stylesheet (CSS)

## and vs or with selectors
### and
```
button#puzzle {
    color: red;
}
```

### or
```
#puzzle, button {
   color: red 
}
```


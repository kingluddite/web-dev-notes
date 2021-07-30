# Gatsby Sanity Cheatsheet

# Gatsby
## Where is gatsby?
* Make sure you are in the gatsby folder!

## Start gatsby
* Instead of using the traditional `$ gatsby develop`
* Runs through `package.json` script so can use ES modules

```
// MORE CODE

    "develop": "cross-env NODE_OPTIONS=\"-r esm\" gatsby develop",
    "start": "npm run develop",

// MORE CODE
```

`$ npm start`

## Stop Gatsby
`$` <kbd>ctrl</kbd> + <kbd>c</kbd>

# Sanity
## Where is Sanity?
* Make sure you are in the sanity folder!

## Start sanity
* Instead of traditional `$ sanity start` runs through `package.json` script

```
// MORE CODE

    "start": "sanity start"

// MORE CODE
```

`$ npm start`

## Stop Sanity
`$`  <kbd>ctrl</kbd> + <kbd>c</kbd>

# Alfred App
## Alfred App snippets
* Open gatsby `localhost:8000` (alfredapp) `!gat`
* Open GraphQL `localhost:8000/___graphql`  (alfredapp) `!gpg`
* Open sanity `localhost:3333` (alfredapp) `!sat`
* Open netlify `localhost:8888` (alfredapp) `!net`

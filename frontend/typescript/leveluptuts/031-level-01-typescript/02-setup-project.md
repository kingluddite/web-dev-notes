# Setup Project
* We will get setup with Parcel which will be the parser that runs typescript for us

## Install Parcel
* You need node installed first
* Create your project folder

`$ npm install -g parcel-bundler`

### Create typscript folder
`$ mkdir typescript && cd typescript`

## Parcel is much easier to setup than webpack
* Open your typescript folder inside vscode

`$ code .`

* Create 2 files

`$ touch index.html index.ts`

`index.html`

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Typescript</title>
</head>

<body>
<h1>TypeScript</h1>
</body>
<script src="./index.ts"></script>
</html>
```

* the `script` works with typescript only because we are using parcel and parcel will take care of it for us

```
console.log('hello world');
```

## Bundle up site and run index.html
`$ parcel index.html`

* This gives us a server and runs `http://localhost:1234`
* Gives us a `.cache` folder
    - Allows app to go fast when we bundle it with parcel
* Gives us a `dist` folder

## View page
`http://localhost:1234/`

You will see h1 of Typescript

You will see `hello world` Chrome Dev Tool Console (CDTC)

## Time to add dependencies
* Open in a new Terminal tab

`$ npm init -y`

## Modify `package.json` scripts
`package.json`

```
// MORE CODE

"scripts": {
    "start": "parcel index.html"
  },
// MORE CODE
```

* Stop the server in the terminal `ctrl + c`

## Start parcel again
`$ npm start`

* Server will run in browser just like it did before
    - Will run parcel

## Summary
* This is how you create a project in parcel and run typescript


# Webpack Dev Server
* Now we'll use localhost:8080 instead of having to us the not-user friendly `file:///`
* Currently we have to browse to our html file and use our editor to open it in the browser
* This is not efficient
* We will fix this

## Start our dev server
`$ yarn run dev`

## Install Webpack Dev Server
`$ yarn add -D webpack-dev-server`

* Make this change:

`package.json`

```
// MORE CODE
"scripts": {
  "dev": "webpack-dev-server",
  "olddev": "webpack --mode development --watch",
  "prod": "webpack --mode production"
},
// MORE CODE
```

* Now run `$ yarn run dev` to run the webpack-dev-server

## Path
`webpack.config.js`

```
// MORE CODE
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  // MORE CODE
```

* Now it is important that we use `__dirname` to get the correct path
* We would get an error if we hardcoded the `dist` folder
* We need to use `path`

`path: path.resolve(__dirname + '/dist')`

* Now webpack will know where our distribution folder is

`webpack.config.js`

```
// MORE CODE
output: {
  path: path.resolve(__dirname + '/dist'),
  filename: 'bundle.js',
},
devtool: 'inline-source-map',
// MORE CODE
```

## Run the dev server
`$ yarn run dev`

* Your terminal will tell you running on `localhost:8080`
* Open browser to `http://localhost:8080`
* You'll see the same site we saw before but now we are viewing it through our very own webpack server

## Webpack dev server is automatically in watch mode
* Change your console.log inside `index.js` to anything and watch how it updates (without us refreshing page!)

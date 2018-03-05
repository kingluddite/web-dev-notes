# Advanced Webpack Dev Server
* Webpack generates the files
* Webpack dev server operates from memory (disc space)

## Test
* If we go back to old way

`package.json`

```
// MORE CODE
"scripts": {
  "dev": "webpack --mode development --watch",
  "prod": "webpack --mode production"
},
// MORE CODE
```

* You will see our files physically changing in our text editor sidebar
* But with this:

```
"scripts": {
  "dev": "webpack-dev-server",
  "prod": "webpack --mode production"
},
```

* We can see the files inside the terminal output but nothing changes on our computer disc

## Add options to our dev server with `devServer`
* [webpack dev server documentation](https://webpack.js.org/configuration/dev-server/)

`webpack.config.js`

```
// MORE CODE
devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
},
// MORE CODE
```

* Run again `$ yarn run dev`
* All we did is change the port
* `compress` offers gzip compression for everything served

## Show errors only
* Running the server generates a ton of info
* To truncate this data use `stats: "errors-only"`

`webpack.config.js`

```
// MORE CODE
devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
  stats: 'errors-only',
},
// MORE CODE
```

* Stop server `ctrl` + `c`
* Run the code `$ yarn run dev` again
* Now the terminal is so much nicer!

## Open a new window every time you run webpack
* This is great as it opens a new browser window with your app loaded
* But if your window is already open it is smart enough not to open another window

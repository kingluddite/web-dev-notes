# How to load images with Webpack
* How to load images through css or template
* How to use the file loader through your webpack config

## image-webpack-loader
* [documentation](https://github.com/tcoopman/image-webpack-loader)

## file-loader
* [documentation](https://github.com/webpack-contrib/file-loader)
* Install

`$ yarn add -D file-loader`

* This loader will scan all our files and wherever we are referencing an image it will try to load it inside our `dist`

## ADD image with css
* background image

`index.scss`

```
html, body {
  height: 100%;
  min-height: 100%;
  background: url('./img/puma-logo.jpg') center center no-repeat;
}

body {
  h1 {
    color: red;
  }
}
```

`$ yarn run dev`

* You will get an error
* You need to add a loader for images

## Add a loader for jpg
`webpack.config.js`

```
// MORE CODE
{
  test: /\.jpg$/,
  use: ['file-loader'],
},
// MORE CODE
```

* Stop and start server `$ yarn run dev`
* The puma logo appears in middle of page

## Load image into template
* We'll use html and not pug (pug we'll do later)
* We'll use a svg
* Don't forget to change from `.pug` to `.html`

`webpack.config.js`

```
// MORE CODE
new HTMLPlugin({
  title: 'Home Page',
  minify: {
    collapseWhitespace: true,
  },
  hash: true,
  excludeChunks: ['contact'],
  template: './src/index.html',
}),
// MORE CODE
```

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <h1>Webpack and images</h1>
    <h2>How to configure Webpack to use images from our template or CSS</h2>
    <img src=<%= require("./img/pen.png") %> alt="pen" />
  </body>
</html>
```

* Run dev server and view penquin in browser

`$ yarn run prod`

* Image will be saved to `img` folder

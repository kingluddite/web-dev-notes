# How to use Pug templates with Webpack
* [pug documentation](https://github.com/pugjs/pug)
* Rename `index.html` to `index.pug`

```
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <h1>Pug templates with Webpack</h1>
  </body>
</html>
```

* Run `$ yarn run dev`
* We get an **error** because we need to rename our entry point from `index.html` to `index.pug`

`webpack.config.js`

```
// MORE CODE
plugins: [
  new HTMLPlugin({
    title: 'Home Page',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
    excludeChunks: ['contact'],
    template: './src/index.pug', // we change this line
  }),
// MORE CODE
```

* Run it `$ yarn run dev`
* It serves us and we don't see any errors but we need to use the pug syntax
* Make `index.pug` look like this (got this code from pug github page)

`index.pug`

```
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

* Now we see the browser shows us it just sees one long string
* We need to install pug and pug-loader

## Install pug stuff
`$ yarn add -D pug raw-loader pug-html-loader`

### Create new rule for `pug` files
`webpack.config.js`

```
// MORE CODE
    {
      test: /\.pug$/,
      use: ['raw-loader', pug-html-loader'],
    },
  ],
},
devServer: {
// MORE CODE
```

## Run in browser
* You should see that the string is now converted into HTML (view source)

### Create the include file
`src/includes/header.pug`

```
h1 hello from the include file
```

`index.pug`

```
// MORE CODE
body
  include includes/header.pug
  h1 Pug - node template engine
// MORE CODE
```

## Run it
`$ yarn run dev`

* Should show you the content from the include on the page

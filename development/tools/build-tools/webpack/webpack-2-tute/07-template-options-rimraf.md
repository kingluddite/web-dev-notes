# Multiple templates options and RimRaf
* How to change the final template location
    - Where the final file will be exported to
    - How to clean up dist folder every time you run your build

## Change the location of the exported template
* Let's move our `index.html` to the root of our app
* Run prod

`$ yarn run prod`

* Now `index.html` is in root of site instead of the `dist` folder
* But we'll put it back as we want the files to be saved to the `dist` folder

`webpack.config.js`

```
// MORE CODE
plugins: [
  new HTMLPlugin({
    title: 'Custom template22',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
    // Load a custom template (lodash by default see the FAQ for details)
    filename: './../index.html',
    template: './src/index.html',
  }),
// MORE CODE
```

* Put it back the way it was

```
// MORE CODE
plugins: [
  new HTMLPlugin({
    title: 'Custom template22',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
    // Load a custom template (lodash by default see the FAQ for details)
    template: './src/index.html',
  }),
// MORE CODE
```

## Clean dist folder with every build using `RimRaf`
### Install RimRaf
`$ yarn add -D rimraf`

### Create a clean script
`package.json`

```json
// MORE CODE
"scripts": {
  "dev": "webpack-dev-server --mode development",
  "olddev": "webpack --mode development --watch",
  "prod": "webpack --mode production",
  "clean": "rimraf ./dist/*"
},
// MORE CODE
```

* And we want to run clean before we run in production mode

```json
// MORE CODE
"scripts": {
  "dev": "webpack-dev-server --mode development",
  "olddev": "webpack --mode development --watch",
  "prod": "yarn run clean && webpack --mode production",
  "clean": "rimraf ./dist/*"
},
// MORE CODE
```

* `&&` is a way to combine tasks in webpack scripts

## Run prod
`$ yarn run prod`

* You will see the `dist` folder is wiped out and regenerated
* Need to use an Editor like Sublime with the `dist` folder expanded to see the files removed and re-generated

## Include 2nd template
* Only include a specific part of our JavaScript

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
    template: './src/index.html',
  }),
  new HTMLPlugin({
    title: 'Contact Page',
    hash: true,
    filename: 'contact.html',
    template: './src/contact.html',
  }),
// MORE CODE
```

`src/contact.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <h1>Contact Page</h1>
  </body>
</html>
```

## Navigate to contact page
* [contact.html](http://localhost:9000/contact.html)

## Create JavaScript just for this page
`src/constact.js`

```js
console.log('this is from the contact.js file');
```

* **note** If you want to have multiple bundles you will need to define multiple entries
* Currently we have only one

`webpack.config.js`

```
// MORE CODE
module.exports = {
  entry: './src/index.js',
// MORE CODE
```

* To store more than one we'll use an object instead

`webpack.config.js`

```
// MORE CODE
module.exports = {
  entry: {
    app: './src/index.js',
    contact: './src/contact.js',
  },
// MORE CODE
```

* Now we also need to change the name of the `filename` from this:

```
// MORE CODE
output: {
  path: path.resolve(__dirname + '/dist'),
  filename: 'bundle.js',
},
```

* To this:

```
// MORE CODE
output: {
  path: path.resolve(__dirname + '/dist'),
  filename: '[name].bundle.js',
},
// MORE CODE
```

* This will make the name dynamic

## Run it
`$ yarn run dev`

* That will run the `contact.js` on all HTML pages

## Just run `contact.js` on the `contact.html` page

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
    template: './src/index.html',
  }),
  new HTMLPlugin({
    title: 'Contact Page',
    hash: true,
    chunks: ['contact'],
    filename: 'contact.html',
    template: './src/contact.html',
  }),
// MORE CODE
```

* We include and exclude the chunks we want and don't want
* Now `contact.js` won't run on `index.html`
* Run to test `$ yarn run dev`

## Check it in Chrome dev tools
* View the Network tab in Chrome
* You will see only `index` bundle on home page (index.html)
* You will see only `contact` bundle on the contact page

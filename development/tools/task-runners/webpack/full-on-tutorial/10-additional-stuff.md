# Additional Stuff

## Hard things in programming
* Naming things
* Invalidating cache
    - Can be very hard with these kinds of assets which are front end assets which are cached on the browser of the client

Solution is to give every bundle a unique file name.
* If you give every file a unique file name you could cache it forever. Let the browser cache it for a year or two. And if the browser wants another bundle with a new bundle name, it will re-download it.

Let's first do that with the CSS file (this will be easy)

### Update `webpack.config.js`

```js
// MORE CODE HERE
const plugins = PRODUCTION
      ? [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin( 'styles-[contenthash:10].css' ),
      ]
      : [new webpack.HotModuleReplacementPlugin()];
      // MORE CODE HERE
```

* That's all you need to do to add hashes to your file names.

Will name the css external file something like `styles-66bac11179.css`

But we are still using the old file name when we are requiring it in the style tag

`index.html`

```html
<link rel="stylesheet" href="dist/styles.css">
```

Easy way around this problem is tell webpack to also create a new HTML file when we are building

## html-webpack-plugin
Yes there is a plugin to automatically create a new HTML file

`$ npm install html-webpack-plugin --save-dev`

## new html template file
Save `index.html` as `index-template.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Full On Webpack 2col</title>
</head>

<body>
  <div id="app"></div>
  <!-- /#id -->
</body>

</html>
```

* **note** We removed the `<link>` and `<script>` tags as they both will now be injected

## Remove `dist` from `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Full On Webpack 2col</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div id="app"></div>
  <!-- /#id -->
  <script src="bundle.js"></script>
</body>

</html>
```

* Since the template HTML will be created inside the `dist` folder, we don't need that in the path anymore

## Change folder destination depending on ENV
If production the `publicPath` will be `/` and if development the `publicPath` will be `/dist/`

### Update `webpack.config.js`

```js
output: {
    path: path.join( __dirname, 'dist' ),
    publicPath: PRODUCTION ? '/' : '/dist/',
    filename: 'bundle.js',
  },
```

## Run build
`$ npm run build`

* Change into `dist`

`$ cd dist`

* Run server

`$ http-server`

View in browser and inspect and you should see something like:

```html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Full On Webpack 2col</title>
<link href="/styles-66bac11179.css" rel="stylesheet"></head>

<body>
  <div id="app"></div>
  <!-- /#id -->
<script type="text/javascript" src="/bundle.js"></script></body>

</html>
```

* Both external files were injected

## Make JavaScript file have hash in name too

`webpack.config.js`

```js
output: {
    path: path.join( __dirname, 'dist' ),
    publicPath: PRODUCTION ? '/' : '/dist/',
    filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js',
  },
```

`$ npm run build`
`$ cd dist`
`$ http-server`

View in browser and check source out and you should see:

```html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Full On Webpack 2col</title>
<link href="/styles-66bac11179.css" rel="stylesheet"></head>

<body>
  <div id="app"></div>
  <!-- /#id -->
<script type="text/javascript" src="/bundle.1bb5e0f04558.min.js"></script></body>

</html>
```

So now we are injecting both files, and adding hashes to both so this will do wonders for improving site loading time with caches. When we generate a new build, the new hash will cause the page not to cache and load the new material.

Cache these `forever`



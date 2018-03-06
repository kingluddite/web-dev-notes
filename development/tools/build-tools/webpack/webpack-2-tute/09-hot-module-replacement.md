# Hot Module Replacement
* Enable you to refresh your CSS without reloading the page
* [documentation](https://webpack.js.org/concepts/hot-module-replacement/)
* Similar to Live Reload but much smarter

`webpack.config.js`

```
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack'); // add this line
const path = require('path');

// MORE CODE
devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
  hot: true, // add this line
  stats: 'errors-only',
  open: true,
},
plugins: [
    new HTMLPlugin({
// MORE CODE
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: true, // modify this line
      allChunks: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
// MORE CODE
```

* Just `hot: true`
* You just switched on hot mode replacement
* You also need to include webpack
* [hot module replacement guide](https://webpack.js.org/guides/hot-module-replacement/)
* **important** Out of the box Hot Module Replacement DOES NOT WORK with `ExtractTextPlugin` so we also disable it
    - We also have to edit our rules from:

`webpack.config.js`

```
// MORE CODE
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }),
    },
// MORE CODE
```

* To this:

```
// MORE CODE
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
// MORE CODE
```

* Run it `$ yarn run dev`
* View console of browser

```
[HMR] Waiting for update signal from WDS...
hot load replacement working!
[WDS] Hot Module Replacement enabled.
```

* Change the `sass` and watch it update in real time

`index.scss`

```
body {
  color: #fff;
  background-color: pink; // updated this line
  p {
    color: red;
  }
}
```

* Background turns to pink almost instantly!

### Why is it so fast?
* It just changes the parts that need to be changed, very powerful in really large apps

## Get extract-text-plugin working
* We had to turn if off
* Now we will get it running **but only in production mode**

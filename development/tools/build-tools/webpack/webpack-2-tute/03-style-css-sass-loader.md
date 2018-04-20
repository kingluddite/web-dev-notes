# Style, CSS and Sass loaders
## Flash of CSS (Flash of Unstyled Content)
* If all your CSS is baked inside the JavaScript, this is not good for producton
* This solution doesn't allow cache CSS
* You can also get a Flash of Unstyled Content (FOUC)
  - FOUC happens because the browser takes a while to load JavaScript and the styles would be applied only then
  - Separating CSS to a file of its own avoids the problem by letting the browser to manage it separately
* Webpack provides a means to generate a separate CSS bundles using ExtractTextPlugin
* [How to avoid FOUC](https://survivejs.com/webpack/styling/separating-css/)

## Loaders
* webpack enables use of loaders to preprocess files
* This allows you to bundle any static resource way beyond JavaScript
* You can easily write your own loaders using Node.js

## css-loader
`$ yarn add -D css-loader`

`src/index.css`

```css
body {
  color: #fff;
  background-color: grey;
}
```

`webpack.config.js`

```
// MORE CODE
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.css$/, use: 'css-loader' }],
  },
  plugins: [
  // MORE CODE
```

## require the stylesheet
```
import css from './index.css';

console.log('hello from webpack');
```

* But the css is not applied to the `index.html` in the browser
* It is in the `bundle.js`
* But the browser doesn't know how to interpret CSS inside javascript

### style-loader
* This is what will get the browser to understand and show the css

`$ yarn add -D style-loader`

* Now we are using 2 loaders so we put them in an array

`webpack.config.js`

```
// MORE CODE
module: {
  rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
},
// MORE CODE
```

`$ yarn run dev`

* refresh browser
* You will see styles taking affect

## Use Sass
* We need to install 2 loaders

`$ yarn add -D sass-loader node-sass`

`webpack.config.js`

```
// MORE CODE
module: {
  rules: [
    { test: /\.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
  ],
},
// MORE CODE
```

* **note** The order of the loaders is important

## Change `css` to `scss`
`index.scss`

```css
body {
  color: #fff;
  background-color: grey;
  p {
    color: red;
  }
}
```

## Change import
```
import css from './index.scss';

console.log('hello from webpack');
```

* `$ yarn run dev`

## Error
* We missed a change `/\.scss$/`

```
// MORE CODE
module: {
  rules: [
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
  ],
},
// MORE CODE
```

* Refresh browser
* Paragraph should be red text

## All CSS is inside the `bundle.js`
* We want to put CSS inside its own file
* We will extract all CSS from javascript
* We need `extract-text-webpack-plugin`
    - `[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)`

`$ yarn add -D extract-text-webpack-plugin@next`

### Import it into webpack
```
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // MORE CODE

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract(['style-loader', 'css-loader', 'sass-loader']),
        },
      ],
    },
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
        new ExtractTextPlugin('bundle.css'),
      ],
    };
```

* We name it at the end and we can test and see if the file and our `sass` and `css` are working
* Lots of fixes here:
* Entry point---> Need to install a specific version of extract-text-webpack-plugin
* **troubleshoot tip** `npm` isn't always up to date so check webpack site for compatibility issues

`$ yarn add -D extract-text-webpack-plugin@next`

* At the end of the day, you now have `bundle.css`
* `$ yarn run prod`
* The CSS will be minified too!

## final webpack.config.js
```js
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
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
    ],
  },
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
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
  ],
};
```

`$ yarn run prod`

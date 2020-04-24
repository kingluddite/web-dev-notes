# Add CSS and Sass to webpack
* When we make changes to our CSS it does not automatically refresh the browser and show changes

## Let's fix that
* Move your CSS from `public/css/main.css` into `src/index.css`
* Comment out in index.html

`index.html`

```
// MORE CODE

  <!-- <link rel="stylesheet" href="/assets/css/main.css"> -->

// MORE CODE
```

## Run dev server
`$ npm run dev-server

* The styles are gone

## Install css-loader
* `$ yarn add -D css-loader`
* `$ npm i -D css-loader`

## update webpack config
`webpack.config.js`

```
// MORE CODE

module: {
  rules: [
    { test: /\.css$/, use: 'css-loader' },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
  ],
},

// MORE CODE
```

## require the stylesheet
`index.js`

```
import css from './index.css';

console.log('hello from webpack');
```

## Houston we have a problem
* We get this error

![css error](https://i.imgur.com/7eRLB26.png)

* But the CSS is not applied to the `index.html` in the browser
* It is in the `bundle.js`
* But the browser doesn't know how to interpret CSS inside JavaScript

### style-loader
* This is what will get the browser to understand and show the CSS 

`$ yarn add -D style-loader`
`$ npm i -D style-loader`

* Now we are using 2 loaders so we put them in an array

`webpack.config.js`

```
// MORE CODE
module: {
  rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
},
// MORE CODE
```

## Restart dev server

`$ npm run dev-server`

* refresh browser

## Congratulations! CSS is working with webpack
* You will see styles taking affect instantly
* This is a huge time savings in your dev workflow

## Use Sass
* We need to install 2 loaders
* **note** This install will take time

`$ yarn add -D sass-loader node-sass`
`$ npm i -D sass-loader node-sass`

`webpack.config.js`

* **note** The order of the loaders is important

```
// MORE CODE
module: {
  rules: [
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
  ],
},
// MORE CODE
```

## Change `index.css` to `index.scss`
* If you don't make this change you'll get this error:

![error not using .scss](https://i.imgur.com/LYhgUQu.png)

* Just make a drastic global CSS change using nested rules (only can work in Sass and not in CSS)
  - This will prove Sass is working as a preprocessor with webpack

`index.scss`

```
body {
  background: #2b292e;
  color: #fafafa;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.6rem;

  h1 {
    background-color: red;
  }
}
```

## Change import
```
import css from './index.scss';

console.log('hello from webpack');
```

* `$ npm run dev-server`

## Error - you also need to update your regular expression to find all sass files (.scss extension)
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
* The h1 should have a red background

## Congratulations! - Sass and Webpack are working
* And you get immediate browser update with your changes

## Put CSS inside it's own file 
* All CSS is inside the `bundle.js`
* We want to put CSS inside its own file
* We will extract all CSS from JavaScript
* We need `extract-text-webpack-plugin`
    - `[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)`

`$ yarn add -D extract-text-webpack-plugin@next`
`$ npm i -D extract-text-webpack-plugin@next`

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

## We need an HTML template
### html-webpack-plugin
* Use webpack plugin to generate template for us
* [html-webpack-plugin github](https://github.com/jantimon/html-webpack-plugin)
  - Use documentation to update `webpack.config.js`

`$ yarn add html-webpack-plugin -D`
`$ npm i -D html-webpack-plugin`

`webpack.config.js`

* Notice how `__dirname` is used to get correct path
* As of webpack 2 you can use `const` and `let` instead of `var`
* We also add the HTML plugin
    - We put it inside an array because we'll add a bunch later

```
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    // path: path.resolve(__dirname, 'public/assets/js'),
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // use: ExtractTextPlugin.extract([
        //   'style-loader',
        //   'css-loader',
        //   'sass-loader',
        // ]),
      },
      plugins: [
        new HTMLPlugin()
      ]

// MORE CODE
```

* Check out `/dist/index.html` and you'll see `bundle.js` was injected
* And that file was created
* Delete `dist` folder and its contents
* Re-run `$ npm run dev-server`
* Files are regenerated but the folder is now cleaner
* Now `index.html` is dynamically created by this HTML plugin

## Customize your HTML template
`webpack.config.js`

```
// MORE CODE

  plugins: [
    new HTMLPlugin({
      title: 'My Todo Webpack App',
      template: './src/index.html'
    })
  ]
}
```

* The `title` we put in above will be injected into our dynamically generated HTML file

`src/index.html`

```
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <p>My custom stuff</p>
  </body>
</html>
```

* Now our HTML file is automatically generated by this plugin
* Also the script is automatically injected into the HTML file

## Minify HTML
`webpack.config.js`

```js
// MORE CODE
module.exports = {

 // MORE CODE

  plugins: [
    new HTMLPlugin({
      title: 'Custom template222',
      minify: {
        collapseWhitespace: true
      },
      // Load a custom template (lodash by default see the FAQ for details)
      template: './src/index.html'
    })
  ]
}
```

## View in browser
* The `index.html` is now minified to 1 line!
* Save space `===` save bandwidth

## Hash busting
* If you don't want to worry about the cache just hash and each build will show your changes

```
// MORE CODE
module.exports = {

  // MORE CODE

  plugins: [
    new HTMLPlugin({
      title: 'Custom template222',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.html'
    })
  ]
}
```

* Check `dist/index.html`

```html
<!DOCTYPE html><html><head><meta http-equiv="Content-type" content="text/html; charset=utf-8"><title>Custom template222</title></head><body><p>My custom stuff</p><script type="text/javascript" src="bundle.js?febfcc9b40b8a8b34060"></script></body></html>
```

### Cache bust on every build!
* This is the hash `src="bundle.js?febfcc9b40b8a8b34060`
* Now you will cache bust on every build

## make dev and prod simple
* For production `$ npm run prod` (used to be `$ npm run build`)
* For development `$ npm run dev` (used to be `$ npm run dev-server`)

## Improve our Dev server
`webpack.config.js`

* We can change the port (we switched it to from 8080 to 9000)
* `compress` offers gzip compression for everything served

## Show errors only
* Running the server generates a ton of info
* To truncate this data use `stats: "errors-only"`

```
// MORE CODE

  devServer: {
    // contentBase: path.resolve(__dirname, 'public'),
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/js/',
    compress: true,
    port: 9000,
    stats: 'errors-only',
  },

// MORE CODE
```

* Run again `$ npm run dev` and you'll see much nice output

# Hot Module Replacement
* Enable you to refresh your CSS without reloading the page
* [documentation](https://webpack.js.org/concepts/hot-module-replacement/)
* **note** Similar to Live Reload but much smarter

`webpack.config.js`

* Just change `hot: true` and you just switched on hot mode replacement

### You also need to include `webpack`
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

* Run it `$ npm run dev`

## View console of browser

```
[HMR] Waiting for update signal from WDS...
hot load replacement working!
[WDS] Hot Module Replacement enabled.
```

* Change the `sass` and watch it update in real time

`index.scss`

```
body {

  /* MORE CODE */

  h1 {
    backgound-color: pink;
  }
}
```

* Background turns to pink almost instantly!

### Why is it so fast?
* It just changes the parts that need to be changed, very powerful in really large apps

## Get extract-text-plugin working
* We had to turn if off
* Now we will get it running **but only in production mode**

# Production vs Development Environment
`webpack.config.js`

* We again use `ExtractTextPlugin`

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
    plugins: [
    // MORE CODE
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false, // modify this
      allChunks: true,
    }),
  ],
};
```

* Stop and start dev `$ npm run dev`

## Change some `scss`

`index.scss`

```
body {
  // MORE CODE

  p {
    color: lightblue;
  }
}
```

* It will update to `lightblue` but only if you refresh the browser

## How can we make Hot Module Replacement only work in `development` mode and use the ExtractTextPlugin only for `production`?

`package.json`

```
// MORE CODE

"scripts": {
  "dev": "webpack-dev-server --mode development",
  "prod": "NODE_ENV=production webpack --mode production"
},

// MORE CODE
```

* We want to disable `ExtractTextPlugin` if it is in **development mode**
* So if `isProd` is true we will just that variable with `!isProduction` because if we are not in production mode, we are in `devMode` and we will set `disable: false`

`webpack.config.js`

```
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// use extract-text-webpack-plugin only in prod
const isProd = process.env.NODE_ENV === 'production' // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        url: false,
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
})

const cssConfig = isProd ? cssProd : cssDev
module.exports = {
  // entry: ['babel-polyfill', './src/index.js'],
  entry: ['./src/index.js'],
  output: {
    // path: path.resolve(__dirname, 'public/assets/js'),
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLPlugin({
      title: 'Todo Webpack App',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: !isProd,
      allChunks: true,
    }),
  ],
  // plugins: [new HTMLPlugin(), new ExtractTextPlugin('bundle.css')],
  devServer: {
    // contentBase: path.resolve(__dirname, 'public'),
    contentBase: path.resolve(__dirname, 'dist'),
    // publicPath: '/assets/js/',
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    stats: 'errors-only',
  },
  devtool: 'source-map',
}
```

* Stop and start dev `$ npm run dev`

`index.scss`

```
body {
  // MORE CODE

  background-color: darkblue; // modify this line 

  // MORE CODE
}
```

* Now make changes and it loads
* Look at console and you'll see HMR is working

## Test in production
`$ yarn run prod`

## Congrats you have Hot Reload working in the development environment and extract-text-webpack-plugin working in production
* Should generate new CSS file
* You should see the new dark blue color in the dist `css` folder and that means `extract-text-plugin` is working fine in production

# How to load images with Webpack
* How to load images through CSS or template
* How to use the file loader through your webpack config

## image-webpack-loader
* [documentation](https://github.com/tcoopman/image-webpack-loader)

`$ npm i -D image-webpack-loader`

## file-loader
* [documentation](https://github.com/webpack-contrib/file-loader)
* Install file-loader

`$ npm i -D file-loader`

* This loader will scan all our files and wherever we are referencing an image it will try to load it inside our `dist`

## ADD image with CSS
* background image

`index.scss`

```

// MORE CODE

body {
  background: #2b292e;
  background: url('./img/sample.png');

// MORE CODE
```

* Add the image inside `src/sample.png`

`$ npm run dev`

* You will get an error
* `ERROR in ./src/index.scss ...Module not found: Error: Can't resolve './img/sample.png'`

## Solution to Error
* You need to add a loader for images

## Add a loader for jpg
`webpack.config.js`

```
// MORE CODE
{
  test: /\.png$/,
  use: ['file-loader'],
},
// MORE CODE
```

* Stop and start server `$ npm run dev`

## Congrats - you see your image!
* The sample logo appears in middle of page

## Load image into template
* We'll use HTML and not pug (pug we'll do later)
* We'll use a `svg`
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

* **note** If you're using pug and want to use require the syntax is only a tad different

`img(src=require("./../assets/image.png"))﻿`

* Run dev server and view penquin in browser

`$ npm run prod`

* Image will be saved to `img` folder

### file-loader
* [documentation](https://github.com/webpack-contrib/file-loader)

#### Modify where image files are saved
* Modify what image filename is

`webpack.config`

```js
// MORE CODE
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }  
}
// MORE CODE
```

* Or

```
// MORE CODE
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: 'file-loader?name=[name].[ext]&outputPath=images/',
    },
  ],
},
devServer: {
// MORE CODE
```

* That will save the original name inside the `img` folder

## Name your images with hash

```
// MORE CODE
{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: 'file-loader?name=[hash:6].[ext]&outputPath=img/',
},
// MORE CODE
```

![hash named images of size 6](https://i.imgur.com/JJGIY6J.png)

## Optimize images
* Before they are saved into the `dist/img`

### image-webpack-loader
* Install it

`$ npm i -D image-webpack-loader`

* Change back to name and not hash
* So we can compare original img size with optimized img size
* Include `image-webpack-loader`

```
// MORE CODE
{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader?name=[name].[ext]&outputPath=img/',
    'image-webpack-loader',
  ],
},

// MORE CODE
```

* The order of the loaders matters
* We want optimize the image first (last in array)
* Then we name and move them to `dist/img`

## Cool app - Beyond Compare
* [download](https://www.scootersoftware.com/download.php)
* Compares file size/folder size
* After downloading point to original `src/img` and on the right point to `dist/img`
* Run `$ yarn run prod`
* Refresh Beyond Compare and see file size reduction

## Fix background css so that it is optimized and moved
`webpack.config.js`

```
// MORE CODE
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        url: true, // change this to true
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
});
// MORE CODE
```

* Now you'll see 2 images inside `dist/img`
* Compare again and see file savings

#### Lots of options (see documentation)
```
rules: [{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
  ],
}]
```

## Houston we have a problem!
* Currently, the html file doesn't know where the file is saved

`index.html`

```
// MORE CODE
    <img src=<%= require("./img/pen.png") %> alt="pen" />
  </body>
</html>
```

* The `publicPath` needs to be defined with `outputPath`

## Update
* I had issues with public path and ended up not using it as I could not get it working
* I used the modern webpack 4 notation instead of the antiquated query string method

`webpack.config.js`

```
// MORE CODE
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // use: [
        //   'file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/',
        //   'image-webpack-loader',
        // ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              // publicPath: 'img/',
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
// MORE CODE
```

* I installed `html-loader` (https://github.com/webpack-contrib/html-loader)

`$ yarn add -D html-loader`

`webpack.config.js`

```
// MORE CODE
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false,
              collapseWhitespace: false,
            },
          },
        ],
      },
// MORE CODE
```

* So I could use this in `index.html`

`<img src="img/pen.png" alt="pen" />`

* Instead of this:

`<img src=<%= require("./img/pen.png") %> alt="pen" />`

* I installed `html-loader` with `$ yarn add -D html-loader`﻿

## Clean dist folder with every build using `rimraf`
### Install RimRaf
`$ npm i -D rimraf`

## clean
`package.json`

```
// MORE CODE

"scripts": {
  "dev": "webpack-dev-server --mode development",
  "prod": "npm run clean && NODE_ENV=production webpack --mode production",
  "clean": "rimraf ./dist/*"
},

// MORE CODE
```

* `&&` is a way to combine tasks in webpack scripts

## Run prod
`$ npm run prod`

* You will see the `dist` folder is wiped out and regenerated

## Houston we have a problem!
* Currently, the index.html file doesn't know where the file is saved

`index.html`

```
// MORE CODE
    <img src=<%= require("./img/pen.png") %> alt="pen" />
  </body>
</html>
```

* The `publicPath` needs to be defined with `outputPath`

### webpack.config.js
* This will set:
  - title
  - description
  - viewport
  - theme-color
  - favicons
  - output directories can easily be adjusted
  - handlebars can be added if needed
  - optimizes image
  - adds sourcemaps
  - adds css and or sass in separate file
  - css and html is optimized

## Final webpack.config.js
```
const path = require('path')
// const handlebars = require('handlebars-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// use extract-text-webpack-plugin only in prod
const isProd = process.env.NODE_ENV === 'production' // true or false
// dev
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
// prod
const cssProd = ExtractTextPlugin.extract({
  // we want to use css
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        // url: false,
        url: true,
        sourceMap: true,
      },
    },
    // we want to use sass
    {
      loader: 'sass-loader',
      options: {
        // get original scss in production
        sourceMap: true,
      },
    },
  ],
})

const cssConfig = isProd ? cssProd : cssDev
module.exports = {
  // polyfill is for async/await
  entry: ['babel-polyfill', './src/index.js'],
  // entry: ['./src/index.js'],
  output: {
    // path: path.resolve(__dirname, 'public/assets/js'),
    // output goes inside 'dist' folder
    path: path.resolve(__dirname, 'dist'),
    // all js goes in this one file
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // if you need handlebars
      // {
      //   test: /\.hbs$/, loader: "handlebars-loader"
      // },
      {
        // look for css or scss
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        // all js except for node_modules
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // use babel to transpile modern js into old js
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // look for all images inside src
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            // creating files in output
            loader: 'file-loader',
            options: {
              // name: '[path][name].[ext]',
              // name: '[path][name].[ext]?[hash]',
              // how images will be named
              name: '[name].[ext]?[hash]',
              // where images are going
              outputPath: 'assets/img',
            },
          },
          {
            // optimize images
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // hot reload for dev
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // if you want to use handlebars
    // new HtmlWebpackPlugin({
    //   title: 'Custom template using Handlebars',
    //   template: 'index.hbs',
    // }),
    new HTMLWebpackPlugin({
      meta: {
        // add a viewport and theme color
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        'theme-color': '#4285f4',
        // Will generate: <meta name="theme-color" content="#4285f4">
      },
      // inject custom title
      title: 'Todo Webpack App',
      description: 'This app will let you find out what you need to do',
      hash: true,
      // our html template
      template: './src/index.html',
    }),
    // html-webpack-plugin must come before favicons-webpack-plugin in the plugins array
    new FaviconsWebpackPlugin({
      // here is our image we want to turn into a favicon
      logo: './src/assets/img/favicon-32x32.png',
      cache: true,
      // publicPath: '/static',
      // store favicons stuff inside favicon directory
      prefix: 'assets/favicon',
      inject: true,
    }),
    new ExtractTextPlugin({
      // our prod css bundle
      filename: 'bundle.css',
      // if dev don't use extract text plugin
      disable: !isProd,
      allChunks: true,
    }),
  ],
  // plugins: [new HTMLPlugin(), new ExtractTextPlugin('bundle.css')],
  devServer: {
    // contentBase: path.resolve(__dirname, 'public'),
    // dev server doesn't record to hard drive only in memory
    contentBase: path.resolve(__dirname, 'dist'),
    // publicPath: '/assets/js/',
    // make as small as possible
    compress: true,
    // our port
    port: 9000,
    // hot reloading is on
    hot: true,
    // open a new browser when app starts up
    open: true,
    // truncate the terminal output when webpack runs
    stats: 'errors-only',
  },
  // turn on source maps
  devtool: 'source-map',
}
```

## babel-polyfill
* Look at this code fragment

`webpack.config.js`

```
// MORE CODE

module.exports = {
  // entry: ['babel-polyfill', './src/index.js'],
  entry: ['./src/index.js'],
// MORE CODE
```

* I had to remove babel-polyfill loader which is used for async/await but another loader I'm using already requires it so I was getting a duplicate polyfill loader and only one is needed error (so I uncommented the polyfill line and just pointed to `index.js` and the error was remove)

## Recources
* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
* [favicon-webpack-plugin](https://www.npmjs.com/package/favicons-webpack-plugin)
 

# webpack.config.js

Require a build step before ready to be deployed

## Common build tasks
* Module loading
    - Webpack gathers dependencies automatically
      + Allows a more modular style of coding
      + And helps prevent errors
        + We don't have to list the required files like we do in gulp
        + Much more modular
        + Prevents dependencies being loaded in wrong order
* Concatenation
    - Combining several files into one, which helps with loading performance
    - Instead of multiple http requests to get all our dependencies we only need to make one
* Minification
    - Extracting unnecessary lines and characters to create the smallest file size possible

* webpack is an opinionated tool
    - If you stick to industry standard practices you won't need to do much configuring

## Clone this: 

`$ git clone https://github.com/treehouse-projects/webpack-workshop.git`

`$ cd webpack-workshop`

`$ git checkout lesson-02-webpack-config`

Let's look at devDependencies in **package.json**

```js
"devDependencies": {
  "babel-loader": "^6.2.4",
  "babel-preset-es2015": "^6.9.0",
  "babel-preset-stage-2": "^6.11.0",
  "css-loader": "^0.23.1",
  "html-webpack-plugin": "^2.22.0",
  "node-sass": "^3.8.0",
  "sass-loader": "^4.0.0",
  "style-loader": "^0.13.1",
  "webpack": "^1.13.1"
},
```

* babel dependencies 
    - Allow us to process ES2015
* html-webpack-plugin
    - Automatically injects our bundle into an HTML template
* webpack
    - Most important dependency
    - Uses a `node.js` file `webpack.config.js` for configuration
        + We will focus on
            * Entry
                - Starting point for your app
                - It tells webpack with file(s) to start with and webpack builds out the dependency tree from there
                - Can be a string (simple, single entrypoint)
                    + Or an object with multiple entry points
            * Output
                - Defines where your app will be placed once all the build tasks have been performed
                - This is the bundle you'll use when you're ready to deploy your app to production
                - Output is specified with an object
                    + The path property of that object tells webpack which folder to place your bundle in and the filename property will be used as the name of your bundled file
            * Module
                - Has many properties to customize webpack
                - We are concerned with loaders property
                    + This is where we define how we want installed loaders to process our app

**webpack.config.js**

```js
var HtmlWebpackPlugin = require("html-webpack-plugin");

var webpackConfig = {
    entry: "./src/index.js",
    output: {
        path: "build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.js$/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.ejs"
        })
    ]
};

module.exports = webpackConfig;
```

### Let's take a test drive

`$ git checkout lesson-03-first-application`

`$ npm install`

### Examine files

* webpack.config.js
* src/index.js
* src/index.ejs

We are using an `ejs` template for our HTML so that webpack can inject our dependencies onto the page
* Webpack can handle, if we want, plain HTML files fine

## Define build command
We do this in package.json's `script` section

**package.json**

```js
"scripts": {
  "build": "webpack --optimize-minimize"
},
```

`--optimize-minimize`

* Will bundle and minify our code

## Run build script

`$ npm run build`

![after running build output](https://i.imgur.com/L0Sw5Ct.png)

1. Examine `build/bundle.js` (_you'll notice it is minified_)
2. View `build/index.html` in browser
3. `cmd` + `option` + `j` and you'll see `Hello, weback`

## import loadDropdown.js

**src/index.js**

```js
import loadDropdown from './loadDropdown';

console.info( "Hello, webpack." );

loadDropdown();
```

## Run webpack again

`$ npm run build`

View `index.html` and click 'SHOW'/'HIDE' link. 

### It works! And it is bundled!!

## Automating Your Development with Webpack Dev Server
* CLI is great for one off builds but tedious for constant reps of build tasks manually every time we make a change to our application

### Webpack dev server
This tool makes automation easy
* Perform new builds each time we save
* Also runs as file server
* So we don't need to access our page using the finder anymore

`$ git checkout lesson-04-webpack-dev-server`

Install webpack dev server

`$ npm install --save-dev webpack-dev-server`

Add server to `package.json`

```js
"scripts": {
  "build": "webpack --optimize-minimize",
  "start": "webpack-dev-server"
},
```

* We don't need to minimize because we are just using this server for development

## Run server

`$ npm start`

### Watchmode
Now webpack is watching 

### View page

Visit [localhost:8080](http://localhost:8080)

Change `src/index.js` to:

```js
import loadDropDown from "./loadDropDown";

console.info( "Hello, webpack!" );
loadDropDown();
```

webpack will rebundle for us automatically. Cool!

`$ git add -A`
`$ git commit -m 'complete exercise`

## Adding styles with webpack

`$ git checkout lesson-05-adding-styles`

We need 3 loaders to bundle Sass code we need 3 loaders

* **style-loader**
    - Inject styles into our JavaScript file
* **css-loader**
    - Parse css into injectable styles
* **sass-loader**
    - Transpile Sass into parsible CSS

Stop dev server with `ctrl` + `c`

`$ npm install save-dev style-loader css-loader sass-loader`

Open `webpack.config.js`

We'll need to chain 3 loaders to compile Sass to injected CSS and we'll do this in the loaders property

* To chain one loader to feed into another use an array to list each loader in the chain

**webpack.config.js**

```js
var HtmlWebpackPlugin = require( "html-webpack-plugin" );

var webpackConfig = {
  entry: "./src/index.js",
  output: {
    path: "build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/
            },
      {
        loaders: [ "style-loader", "css-loader", "sass-loader" ],
        test: /\.scss$/
            }
        ]
  },
  plugins: [
        new HtmlWebpackPlugin( {
      template: "src/index.ejs"
    } )
    ]
};

module.exports = webpackConfig;
```

We added:

```js
{
  loaders: [ "style-loader", "css-loader", "sass-loader" ],
  test: /\.scss$/
      }
```

And in `src/index.js` we import our scss

```js
import loadDropDown from "./loadDropDown";
import './styles.scss'; // ADD THIS LINE

console.info( "Hello, webpack" );
loadDropDown();
```

## Run webpack again

`$ npm start`

## [view in browser](http://localhost:8080/)

Styles are added!

## Working with images

## Webpack with [Loaders](http://webpack.github.io/docs/loaders.html)

* Analogous to plugins with Grunt

* We'll add a background property to our styles
  + the url that points to our local image
* Behind the scenes webpack will encode the image and return a data url
so the browser will know how to load the image from local data, instead of retrieving it from the internet

`$ ga -A`

`$ gc -m 'complete files`

`$ git checkout lesson-06-using-loaders`

`me.png` is inside `src` folder

## Install image and url loaders

`$ npm install save-dev img-loader url-loader`

Update the loaders in **webpack.config.js**

```js
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/
            },
      {
        loaders: [ "style", "css", "sass" ],
        test: /\.scss$/
          },
      {
        loaders: [ "url", "img" ],
        test: /\.png$/
          }
        ]
```

### Start dev server

`$ npm start`

Update **src/styles.scss**

```css
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  float: left;
  margin-right: 20px;
  background: gray;
  background-image: url(me.png); // add this line
  background-size: contain; // add this line
}
```

Refresh page `localhost:8080` and you'll see an image

[list of loader](https://webpack.github.io/docs/list-of-loaders.html)

## Try: Bootstrap 4 with Sass

# Setup Webpack with SCSS
## Let's start with simple CSS
* Create `src/styles/styles.css`
* We'll use the CSS universal selector `*` to turn everything to red

`src/styles/styles.css`

```
* {
  color: red;
}
```

## update webpack.config.js
* We will add a rule to look for all files that end in `.css`

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
```

* That change alone will not work

## We also need to add a loader
* Actually we need to use 2 loaders

### css-loader
* Will be a package that will allow us to load

## Add css rule to `package.json`

* **note** search packages using this url pattern:

`https://npmjs.com/package/NAMEOFPACKAGEHERE`

* [link to css-loader](https://www.npmjs.com/package/css-loader)
* This will help load in our css assets
* It will teach it how to take css and convert it into a JavaScript representation of that css

### style-loader
* [link to style-loader](https://www.npmjs.com/package/style-loader)
* Takes the CSS that is in JavaScript and adds it to the DOM by injecting a style tag into our content

`$ yarn add style-loader css-loader -D`

`$ npm i style-loader css-loader -D`

### Update our webpack config
`webpack-config.js`

* We need to use an array of loaders instead of just one so we'll use the `use` property

```
const path = require('path');

module.exports = {
  // MORE CODE

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // MORE CODE

};
```

* **note** That's all it takes to setup CSS inside of webpack!
* We check for any files that have a `.css` extension
* The rule says whenever webpack encounters a `.css` file it will read that file in with `css-loader` and it will dump its contents into the DOM using `style-loader`... End result is our styles show up

## Now we need to restart our webpack build
`$ npm run dev-server`

## Test in browser
* Nothing is red?
* The reason is we haven't done anything to load that new file in

### Add a line to app.js
* We will load all of our styles in

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css'; // add this line

import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```

## Import our css file
`import './styles/styles.css'`

* We don't need a from and we don't need a named export or default export
* We are just loading the entire file into our main app (app.js)

## Run the server
`$ yarn run dev-server`

* View in browser and all text in app is red
* That's all we need to set up css inside webpack

### Efficiency Question
* We import the css and currently webpack waits until all our JavaScript runs until it sets up our styles - first all js and then css
  - This is very inefficient!
* Is webpack really waiting for all the JavaScript before it sets up our styles?
    - Yes
    - Later we'll create our own CSS file and make this more efficient

## SCSS (sass)
### How can we set it up with webpack to compile regular SCSS down to CSS?
* This is just like compiling JSX down to JavaScript
* The browser doesn't understand SCSS but does understand CSS and someone wrote a tool to convert SCSS to CSS
* We need a new loader that has rules on how to handle `.scss` files
* And we'll need the `.scss` compiler itself

### Sass docs
* [sass webpage](https://sass-lang.com/)
* [sass docs](https://sass-lang.com/documentation/variables)

#### SASS vs SCSS
* Same preprocessor 2 different ways to write code
* Sass doesn't use curly braces
* We will use SCSS

## Start using Sass
* We need to install 2 new tools
  - loader

### Let's start looking for .scss files
`webpack.config.js`

```
// MORE CODE

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

// MORE CODE
```

## Rename the file from .css to .scss
`src/styles/styles.scss`

* Update the code from CSS to SCSS

```
$brand-color: blue;

* {
  color: $brand-color;
}
```

* Update the import

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss'; // update this line

// MORE CODE
```

* Our code will still fail
* It is equivalent trying to run JSX without running it through babel
* The browser doesn't understand SCSS so we need to compile it down into something the browser does understand and that is `CSS`

## Houston we have a problem
`error - You may need an appropriate loader to handle this file type,`

![loader error for scss](https://i.imgur.com/ODqP7fc.png)

## Add two new modules
* `sass-loader`
  - Will enable us to import those new files
* `node-sass`
  - Takes our SCSS and converts it to regular CSS

### Install sass loaders needed for transpiling scss to css
`$ yarn add sass-loader node-sass -D`

`$ npm i sass-loader node-sass -D`

* Update our code to transpile SCSS to CSS

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
```

* We just added `sass-loader` to our **use** loaders array

## Test
`$ yarn run dev-server`

`$ npm run dev-server`

* All our font color should now be blue in the browser

## Now we have access to full power of Scss
* Will make it easy to organize our styles
* We can break them up into multiple files

## Recap
* At the start of this lesson if we tried to load a .scss file it would have crashed

1. It would try to load file
2. It would see that it was not JavaScript
3. It would output an error to the console

### How we fixed this
* We told webpack what to do when it found a file with a .scss extension
  - We did that by specifying a new rule
  - We used 3 loaders
    + Get the code, covert it from SCSS to CSS and finally get it up and showing in the browser by dumping it into a style tag

# Look at our code in the style tag
* You will see the scss variable is gone and just CSS remains (because it was compiled from SCSS to CSS by webpack)

![style tag](https://i.imgur.com/deshjEQ.png)

## Later
* We'll learn how to set up a separate styles file for production


# Code Spitting
The art of splitting your project into multiple files

* So that different files can be loaded at different times
* This means:
    - Faster loading times
    - The browser doesn't have to load those things it doesn't need
    - In Angular, React, View...
        + They usually split by URL routes
        + But we can use code splitting without routes
        + Webpack will handle code splitting automatically
            * First we'll do this with ES2015 modules
            * If we were using Webpack 1, we could do this with commondJS modules

Create two new modules, `page1.js`, `page2.js`

`page1.js`

```js
const page1 = `<h1>This is page 1</h1>`;
export default page1;
```

`page2.js`

```js
const page2 = `<h1>This is page 2</h1>`;
export default page2;
```

`index.js`

```js
import globalStyle from './style/globalStyle.css';

const app = document.getElementById( 'app' );
app.innerHTML = `
  <div id="menu">
    <button id="loadPage1">Load Page 1</button>
    <button id="loadPage2">Load Page 2</button>
  </div>
  <div id="content">
    <h1>Home</h1>
  </div>
`;

if ( module.hot ) {
  module.hot.accept();
}
```

## Fix index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Full On Webpack 2col</title>
  <link rel="stylesheet" href="dist/styles.css">
</head>

<body>
  <div id="app"></div>
  <!-- /#id -->
  <script src="dist/bundle.js"></script>
</body>

</html>
```

We now have 2 buttons on. Let's make things happen when you press those buttons 

## Add a click event listener

`index.js`

```js
import globalStyle from './style/globalStyle.css';

const app = document.getElementById( 'app' );
app.innerHTML = `
  <div id="menu">
    <button id="loadPage1">Load Page 1</button>
    <button id="loadPage2">Load Page 2</button>
  </div>
  <div id="content">
    <h1>Home</h1>
  </div>
`;

document.getElementById( 'loadPage1').addEventListener( 'click', () => {
  console.log( 'hi1' );
} );
document.getElementById( 'loadPage2').addEventListener( 'click', () => {
  console.log( 'hi2' );
} );

if ( module.hot ) {
  module.hot.accept();
}
```

## System
One of the lesser known functions of the ES6 specification is that it defines 2 primary module features

1. Module Syntax

`import { asdf } from 'asdf`;

2. Module Loader

`System.import()`

* Which returns a promise

`index.js`

Update the following chunk of code

```js
document.getElementById( 'loadPage1' ).addEventListener( 'click', () => {
  System.import( './page1' )
    .then( ( pageModule ) => {
      document.getElementById( 'content' ).innerHTML = pageModule.default;
    } );
} );
```

* When I click page 1, I will call System.import( './page1' )
* And Since this is a promise, we use `then`
    - When this promise is fullfilled, the `then` clause should happen

   When I click this, import page 1, then some time happens because it will import it over the internet (network) and when this is fulfilled, give me the content of this module and then set the `innerHTML` of the div content to the content of that page module
   
## Do same thing with page2

`index.js`

```js
document.getElementById( 'loadPage2' ).addEventListener( 'click', () => {
  System.import( './page2' )
    .then( ( pageModule ) => {
      document.getElementById( 'content' ).innerHTML = pageModule.default;
    } );
} );
```

Click the buttons and see the page content change

## Lazy loading modules

Look at the Chrome inspector `network` tab
Refresh.
It loads `bundle.js`
Click `Load Page 1` button. It loads `3.bundle.js`
Click `Load Page 2` button. It loads `2.bundle.js`
This is the shank name. A separate file.
But if you load page 1 again. It won't load that because it is already loaded. It is lazy loading it and storing it.

If you `$ npm run build`, you will see it creates multiple JavaScript files. The content will be minified but you can see that it is the page1 and page2 JavaScript files

## Side loading modules
Let's say you are using a third party module
It is as easy as npm installing it
And then just requiring/importing it, to get it bundled with the rest of your stuff
**caution** Webpack can only use tree shaking when it comes to ES6 modules

If you npm install lodash, you'll get the entire lodash, without tree shaking

But if you do `$ npm install lodash --es` (their ES6 versionof lodash)
* It then can do tree shaking and only include the parts that you want

That being said, if you are usign Angular or React, it might not be the smartest thing to include jQuery in your bundle.js

* For a few reasons
    1. You want to cache your bundle for as long as possible
    2. You want your web browser to not have to do any unnecessary downloads
    3. With our unique hash names we can cache forever but if we change our code we obviously need to redownload it but if we include jquery with it that bundle also includes the entire jQuery, which has not been updated
    4. The user probably has Angular, React already cached in their browser, if you are loading it from a Content Delivery Network (CDN)

## Install jquery
`$ npm install jquery --save`

## Update `index.js`

### Import jQuery
```js
import globalStyle from './style/globalStyle.css';
import $ from 'jquery';
```

### Add some jQuery to `index.js`

```js
$( '#app' ).css( 'background-color', 'yellow' );

if ( module.hot ) {
  module.hot.accept();
}
```

Run dev sever and view in browser and you will see yellow background and you know how to import and use jQuery

If you run for production, our build is 90K (big) because we added jquery

## Tell webpack that jquery is an external library

`webpack.config.js`

```js
module.exports = {
  externals: {
    'jquery': 'JQuery' // jQuery is external and available at the
    // global varaibel jQuery
  },
  // more code
}
```

**note** the index.html is used for development and the `index-template.html` is used for production

Find the CDN for jQuery and add it to both `index.html` and `index-template.html`

```html
<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
```

Run your build script and you will see your `bundle.js` is down to 2kb (when it used to be 90 with jQuery)

then if you run the build
and cd into dist and run `http-server`
you can see that the network tab shows you are downloading jquery from CDN but most people might have this cache already so it will load faster

webpack.github.io
webpack.github.io/docs/list-of-plugins.html
offline plugin makes real easy to work with offline available code
webpack.github.io/docs/list-of-loaders.html

## POSTCSS + AUTOPREFIXER
`$ npm install`

```js
const autoprefixer = require('autoprefixer' );

module.exports = {
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'css-loader!postcss-loader'
            }]
    },
    postcss: [
        autoprefixer()
    ]
};
```

![postcss](https://i.imgur.com/IiJZJsD.png)

* Will remove stuff not used anymore for browsers
* ![stuff used](https://i.imgur.com/WDMEPwr.png)
* ![more stuff to read](https://i.imgur.com/utWLRdx.png)
* github.com/emiloberg/webpack-tutorial
* twitter.com/emilioberg

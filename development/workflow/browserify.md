# Browserify

Normal setup for a site with jquery.

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="app.js"></script>
</head>
<body>
    
</body>
</html>
```

* adding a bunch of js files can quickly become problematic especially when it comes to the order of when those files will run

## Create app.js

`app.js`

```js
alert('yo');
```

## Install browserify

first create `package.json` with:

```
$ npm init -y
```

* this will create a `package.json` without asking you all the standard questions (it will just accept all the default values)

```
$ npm i browserify --save-dev
```

`package.json`

```js
{
  "name": "beginner-browsify",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "build": "browserify app.js -o bundle.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browserify": "^13.0.1"
  }
}
```

* things to point out
    - main: app.js
        + this is the file that will be compiled
    - scripts and build
        + takes app.js and outputs as bundle.js
            * include bundle.js in your html

## Test it out

update `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="bundle.js"></script>
</head>
<body>
    
</body>
</html>
```

In the terminal type:

```
$ npm run build
```

Open `index.html` in the browser

```
$ open index.html
```

You will see "yo" in the alert window. Your JavaScript is working. Nice.

## But what about other JavaScript libraries

Let's install jQuery

```
$ npm i jquery --save
```

**note**: `npm i` is shortcut for `npm install`
* this will save jquery to package.json for future use and download to node_modules

 updated `package.json`

 ```json
{
  "name": "beginner-browsify",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "build": "browserify app.js -o bundle.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browserify": "^13.0.1"
  },
  "dependencies": {
    "jquery": "^2.2.4"
  }
}
 ```

$ npm run build

refresh page and it won't work
move script to bottom of page and refresh browser and you'll see your button that adds the alert when clicked

## make life easier with watchify

```
$ npm i watchify --save-dev
```

update package.json

```json
"scripts": {
    "build": "browserify app.js -o bundle.js",
    "watch": "watchify app.js -o bundle.js"
  },
```


Then type this:

```
$ npm run watch
```

Now all changes will be compiled automatically. Change the alert message and save. Refresh the page and Click the button again but this time you'll see your new alert message.

We can also do this

Create `buttons/button.js` and add the following inside it:

```js
var $ = require( 'jquery' );

var button = $( '<button/>' ).html( 'click here' ).on( 'click', function() {
  alert( 'yo yo ma' );
} );

module.exports = button;
```

then alter app.js to this:

```js
var $ = require( 'jquery' );

// here we are looking for a local file
var button = require( './buttons/button.js' );

// add to body
$( 'body' ).append( button );
```

Run it just like before and it will work the same but our code is now more modular.

## Learn More

* [entry level video tutorial](https://www.youtube.com/watch?v=CTAa8IcQh1U)
* [browserify web site](http://browserify.org/)

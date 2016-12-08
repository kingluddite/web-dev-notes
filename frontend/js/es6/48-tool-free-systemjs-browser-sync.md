# Tool-Free Module with SystemJS
And BrowserSync setup

### [SystemJS](https://github.com/systemjs/systemjs)
Alternative to Webpack

* Really just a way to quickly test something out

* works with jspm - JavaScript package manager
* jspm sits on top of npm, not an alternative to npm
* One great feature is you can run it in the browser, makes the tool a lot simpler and all the stuff we did for WebPack we don't have to do

New project

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>System JS</title>
</head>

<body>
  <script src="https://jspm.io/system@0.19.js"></script>
</body>

</html>
```

Need to run the HTML through some type of server.
* Needs to run not on `file://` but something like `localhost`

## Set up BrowserSync
`$ npm init -y`

`$ npm i browser-sync -D`

### Update `scripts` in `package.json`

`package.json`

```js
{
  "name": "48-system-js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "browser-sync start --directory --server --files '*.js, *.html, *.css'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.18.2"
  }
}
```

`$ npm run server`

Add stuff to `index.html` and the browser will update in real time with your changes.

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>System JS</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <script src="https://jspm.io/system@0.19.js"></script>
  <script>
    System.config({
      transpiler: 'babel'
    });
    System.import('./main.js');
  </script>
  <h1>Test</h1>
</body>

</html>
```

`main.js`

```js
console.log( 'it works' );
```

View in browser inspector and you will see `it works`

* With SystemJS
    - I don't need to use npm install
    - or any of the other webpack steps we used

### Normal way to import

`main.js`

`import { sum, kebabCase } from 'lodash';`

But using SystemJS we use:

`import { sum, kebabCase } from 'npm:lodash';`

The URL did not work. It was updated and changed.


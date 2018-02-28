# Webpack
* javascript module bundler
* need node/npm
* `$ yarn init -y`
* `$ yarn add webpack -D`

## see all version
`$ npm view webpack versions` (only last 20)

### see all
`$ npm view webpack versions --json`

Create `src` and `dist` folders

## .gitignore (node_modules)

## test file
* src/index.js ---> dist/bundle.js
    - **note** must be named `index.js`

`console.log('hello form app.js)`

## Need to also install webpack-cli
* This is new in Webpack 4
* `$ yarn add webpack-cli -D`

## Show detailed webpack errors
`$ webpack --display-error-details`
## Basic run of webpack
`$ webpack ./src/index.js`

* Will output as `/dist/main.js` and minified

## watch files
`$ webpack ./src/index.js --watch`

## webpack.config.js
* in root of project

```js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
};
```

* Add script to `package.json`

`package.json`

```json
{
  "name": "113e-webpack-2-fun",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --watch",
    "dev": "webpack"
  },
  "license": "MIT",
  "devDependencies": {
    "webpack": "^4.0.1",
    "webpack-cli": "^2.0.9"
  }
}
```

* Now to run webpack just:

`$ webpack run dev`

## question - do we need to use `-p` or `-d` for dev and production?

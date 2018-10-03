# package.json
* I could not get `eslint`, prettier Visual Studio and `create-react-app` to work
* I found a way to get them all to play nice together
  - The solution is to delete `node_modules`
  - Replace `package.json` with the code below
  - `$ yarn install`
* Then follow the instructions inside `01g-visual-studio-prettier-eslint.md`
  - Prettier will also format your code on save
  - `eslint` will tell you if you have errors
  - Prettier will replace `""` with `''` (and a bunch of other rules you can set and modify to your hearts content)

`package.json` (create and place in root of soccer project)

```json
{
  "name": "team-builder-app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build:dev": "webpack --watch",
    "build:prod": "webpack -p --env production",
    "lint": "eslint --fix src/*.js",
    "pretest": "npm run lint",
    "dev-server": "webpack-dev-server",
    "precommit": "lint-staged",
    "eslint-check": "eslint --print-config .eslintrc.js | eslint-config-prettier-check",
    "start": "node src/index.js",
    "heroku-postbuild": "yarn run build:prod",
    "test": "cross-env NODE_ENV=test jest --config=jest.config.json"
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ]
  },
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-eslint": "^8.2.1",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "enzyme-to-json": "^3.3.1",
    "eslint": "^4.19.1",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-last": "0.0.5",
    "eslint-config-prettier": "2.9.0",
    "eslint-config-standard": "^11.0.0-beta.0",
    "eslint-loader": "^1.9.0",
    "eslint-plugin-flowtype": "^2.41.0",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-jsx-a11y": "^6.0.3",
    "eslint-plugin-node": "^5.2.1",
    "eslint-plugin-prettier": "2.5.0",
    "eslint-plugin-promise": "^3.6.0",
    "eslint-plugin-react": "^7.5.1",
    "eslint-plugin-standard": "^3.0.1",
    "express": "^4.16.2",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "firebase": "^4.9.0",
    "history": "^4.7.2",
    "husky": "^0.14.3",
    "lint-staged": "^6.0.0",
    "moment": "^2.20.1",
    "node-sass": "^4.7.2",
    "normalize.css": "^7.0.0",
    "numeral": "^2.0.6",
    "prettier": "1.10.2",
    "prettier-eslint": "^8.7.5",
    "prettier-eslint-cli": "^4.4.0",
    "raf": "^3.4.0",
    "react": "^16.2.0",
    "react-dates": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-modal": "^3.1.10",
    "react-redux": "^5.0.6",
    "react-router-dom": "^4.3.0-rc.2",
    "redux": "^3.7.2",
    "redux-thunk": "^2.2.0",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.19.1",
    "uuid": "^3.1.0",
    "validator": "^9.2.0"
  },
  "devDependencies": {
    "cross-env": "^5.1.3",
    "dotenv": "^5.0.0",
    "jest": "^22.1.4",
    "react-test-renderer": "^16.2.0",
    "redux-mock-store": "^1.5.1",
    "webpack": "^4.5.0",
    "webpack-cli": "^2.0.14",
    "webpack-dev-server": "^3.1.3"
  }
}
```<article style="background-image: url(&quot;http://storeytimeonline.com/wp-content/uploads/2018/09/Night-at-Opera-Web-2-pdf-240x400.jpg&quot;); 

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <title>Team Picker App</title>
  <link rel="stylesheet" href="/dist/styles.css">
</head>

<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
</body>

</html>
```

`.babelrc`

```json
{
    "presets": [
        "env",
        "react"
    ],
    "plugins": [
        "transform-class-properties",
        "transform-object-rest-spread"
    ]
}
```

`webpack.config.js`

```js
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}
/* eslint-enable global-require */

module.exports = env => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
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
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
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
    mode: 'development',
    plugins: [
      new webpack.LoaderOptionsPlugin({ options: {} }),
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      }),
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist',
    },
  };
};
```

.eslintignore

```
node_modules/**
```

.stylelintrc

```
{
  "rules": {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [ "always", {
      "ignore": ["stylelint-commands", "after-comment"]
    } ],
    "declaration-colon-space-after": "always",
    "indentation": [int, {
      "except": ["value"]
    }],
    "max-empty-lines": 2,
    "rule-empty-line-before": [ "always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"]
    } ],
    "unit-whitelist": ["em", "rem", "%", "s", "vh", "vw"]
  }
}
```

`$ yarn run dev server`

## View in browser
`http://localhost:8080`

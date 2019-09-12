# Setup Expensify
## Create our boilerplate
* Gut indecision app and keep only stuff we'll use for all future projects

## Make copy of indecision-app and name it `expensify-app`
`$ cp -R indecision-app expensify-app`

* **tip** Save time and blow up `node_modules` before you duplicate

* `$ cd expensify-app`

## Remove git
`$ rm -rf .git`

## Install dependencies
`$ npm i`

## Run Server
`$ yarn run dev-server`

`$ npm run dev-server`

* You will see same app as last time

## Make our boilerplate
* We'll gut the existing app to only use tools we'll use for all future apps
* This will greatly increase our app building speed
* Delete `src/components` and `src/playground` folders and their contents
    - Then just create empty folders of `src/components` and `src/playground` and just save an empty `.gitkeep` file in each
    - This will enable you to push empty files to github
        + Without `.gitkeep`, you can't push empty folders to github

`styles/styles.scss`

```
@import './base/settings';
@import './base/base';
```

`styles/base/_base.scss`

```
html {
  font-size: 62.5%
}
body {
  background-color: $white;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
}

h1 {
  font-size: 2.4rem;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: default;
}
```

`src/styles/base/_settings.scss`

```
// colors
$white: #ffffff;
// Spacing
$s-size: 1.2rem;
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;

// Media Query Breakpoints
$desktop-breakpoint: 45rem;
```

`public/index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My React Boilerplate</title>
  <link rel="icon" type="image/png" href="/img/favicon.png" />
</head>
<body>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>
</html>
```

`src/app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(
  <p>This is my React boilerplate</p>,
  document.getElementById('root')
);
```

`package.json`

```json
{
  "name": "peh2 react boilerplate",
  "version": "1.0.0",
  "description": "Starting point for build modern websites",
  "main": "index.js",
  "scripts": {
    "build": "webpack",
    "dev-server": "webpack-dev-server",
    "fix-styles": "prettier-stylelint --write 'src/**/*.{css,scss}' "
  },
  "babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties"
    ]
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 9"
  ],
  "keywords": [],
  "author": "Kingluddite",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "autoprefixer": "^9.6.1",
    "babel-cli": "^6.26.0",
    "babel-eslint": "^10.0.2",
    "babel-loader": "^8.0.6",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.11",
    "eslint": "4.10.0",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-prettier": "2.7.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.1",
    "eslint-plugin-prettier": "2.3.1",
    "eslint-plugin-react": "^7.4.0",
    "node-sass": "^4.12.0",
    "postcss-loader": "^3.0.0",
    "prettier": "1.8.2",
    "prettier-eslint-cli": "^4.4.0",
    "prettier-stylelint": "^0.4.2",
    "sass-loader": "^8.0.0",
    "style-loader": "^0.18.2",
    "stylelint": "^10.1.0",
    "stylelint-order": "^3.1.0",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.7",
    "webpack-dev-server": "^3.8.0"
  },
  "dependencies": {
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "normalize.css": "^8.0.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-modal": "^3.10.1",
    "strip-ansi": "^5.2.0",
    "validator": "^11.1.0"
  }
}

```

## That's it
* We now have our boilerplate tooling

## Save this boilerplate
* Duplicate the folder as `peh2-react-boilerplate-v1`
* Added new script addition to open browser

`package.json`

```
// MORE CODE

  "scripts": {
    "build": "webpack",
    "dev-server": "webpack-dev-server --open",
    "fix-styles": "prettier-stylelint --write 'src/**/*.{css,scss}' "
  },

// MORE CODE
```

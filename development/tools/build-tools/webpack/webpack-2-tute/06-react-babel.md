# React Babel with Webpack
* [documentation](https://reactjs.org/docs/add-react-to-an-existing-app.html#installing-react)
* Create react app is fast way to use webpack and react

## Manual install of react with webpack and babel
`$ yarn add -D react react-dom`

## Enable ES6 and JSX
`$ yarn add -D babel babel-preset-react babel-preset-es2015`

## create .babelrc in root of your project
`$ touch .babelrc`

`.babelrc`

```
{
    "presets": ["es2015", "react"]
}
```

## Replace code inside `index.js`
`index.js`

```
import css from './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
```

## Add root to `index.html`
`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## Run it
`$ yarn run dev`

* We get an error because we need to add a loader

## Add a React loader
* We will add a loader that checks for all JavaScript files
* View babel site, click on Setup and click `Webpack`
    - [webpack on babel docs](http://babeljs.io/)

`$ yarn add -D babel-loader babel-core`

`webpack.config.js`

```
// MORE CODE
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
  ],
},
devServer: {
    // MORE CODE
```

* You will see hello world

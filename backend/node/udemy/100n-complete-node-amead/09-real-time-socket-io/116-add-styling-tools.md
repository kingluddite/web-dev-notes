# Add Styling tools

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Node Chat App</title>
</head>
<body>
  <p>The Chat App</p>  

  <ol id="messages"></ol>

  <form id="message-form" action="">
    <input name="message" type="text" placeholder="Message"
    />
    <button>Send</button></form>
  <button id="send-location">Send Location</button>
  <script src="/bundle.js"></script>
</body>
</html>
```

* Remove unneed script tags and css link

`src/styles/styles.scss`

```css
@import './base/settings';
@import './base/base';
@import './components/header';
@import './components/chat';
@import './components/message';
@import './components/centered-form';
@import './components/form-field';
```

* We get rid of boring css and add scss with partials

`styles/base/_settings.scss`

```
// colors
$white: #a5afd7;
// Spacing
```

`styles/base/_base.scss`

```
* {
  box-sizing: border-box;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  font-weight: 300;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
}

html {
  font-size: 62.5%
}

body {
  font-family: Helvetica, Aria, sans-serif;
  font-size: 1.6rem;
}

h1 {
  font-size: 2.4rem;
}

ul, li {
  list-style-position: inside;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

button {
  background: #265f82;
  border: none;
  color: white;
  cursor: pointer;
  padding: 1rem;
  transition: background .3s ease;
}

button:hover {
  background: #1F4C69;
  border: none;
  color: white;
  padding: 1rem;
}

button:disabled {
  background: #698ea5;
  cursor: default;
}
```

`styles/components/_centered-form.scss`

```
.centered-form {
  align-items: center;
  background: linear-gradient(325deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* w3c */
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  &__form {
    background: rgba(250, 250, 250, 0.9);
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    margin: 20px;
    padding: 0px 20px;
    width: 230px;
  }
}
```

`styles/components/_chat.scss`

```
.chat {
  display: flex;
  
  &__sidebar {
    background: linear-gradient(325deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* w3c */
    height: 100vh;
    overflow-y: scroll;
    width: 26rem;

    @media (max-width: 600px) {
      display: none;
    }
  }
  
  &__sidebar__title {
    color: #e6eaee;
    margin: 1rem 2rem;
    text-align: left;
  }

  &__sidebar ul {
    list-style-type: none;
  }

  &_sidebar li {
    background: #e6eaee;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    margin: 1rem;
    padding: 1rem;
  }

  &__main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
  }

  &__messages {
    flex-grow: 1;
    list-style-type: none;
    overflow-y: scroll;
    padding: 1rem;
  }

  &__footer {
    background: #e6eaee;
    display: flex;
    flex-shrink: 0;
    padding: 1rem;

    @media (max-width: 600px) {
      flex-direction: column;

      button {
        margin-right: 0;
      }
    }
  }

  &__footer form {
    display: flex;
    flex-grow: 1;
    
    @media (max-width: 600px) {
      margin-bottom: 1rem;
    }
  }

  &__footer form * {
    margin-right: 1rem;
  }

  &__footer form input {
    border: none;
    flex-grow: 1;
    padding: 1rem;
  }
}
```

`styles/components/_form-field.scss`

```
.form-field {
  margin: 20px 0;
}

.form-field > * {
  width: 100%;
}

.form-field label {
  display: block;
  margin-bottom: 7px;
}

.form-field input, .form-field select {
  border: 1px solid #e1e1e1;
  padding: 10px;
}
```

`styles/components/_message.scss`

```
.message {
  padding: 10px;
}

.message__title {
  display: flex;
  margin-bottom: 5px;
}

.message__title h4 {
  font-weight: 600;
  margin-right: 10px;
}

.message__title span {
  color: #999;
}
```

## Now we update our client side JavaScript
`app.js`

* Here is the correct way to import socket.io
* And jQuery, normalize.css and your custom styles

```js
import io from 'socket.io-client';
import jQuery from 'jquery';
// import validator from 'validator';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const socket = io(); // opens a connection
console.log('app is running');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', message => {
  console.log('newMessagei', message);
  const li = jQuery('<li></li');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', message => {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current Location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', e => {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: jQuery('[name=message]').val(),
    },
    () => {}
  );
});
const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return console('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      console.log('Unable to fetch location.');
    }
  );
});
```

* Stylelint makes working with css/scss easier

`.stylelintrc`

```json
{
    "plugins": [
        "stylelint-order"
    ],
    "rules": {
        "order/order": [
            "custom-properties",
            "declarations"
        ],
        "order/properties-alphabetical-order": true
    }
}
```

`package.json`

```json
{
  "name": "node-chat-app",
  "version": "1.0.0",
  "main": "index.js",
  "browserslist": [
    "> 1%",
    "ie > 9"
  ],
  "license": "MIT",
  "scripts": {
    "start": "nodemon server/server.js",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --watch",
    "test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**/*.test.js",
    "test-watch": "nodemon --exec 'npm test'",
    "dev-server": "yarn run dev-server"
  },
  "engines": {
    "node": "9.3.0"
  },
  "dependencies": {
    "express": "^4.16.2",
    "jquery": "^3.2.1",
    "normalize.css": "^7.0.0",
    "socket.io": "^2.0.4",
    "stylelint": "^8.4.0",
    "stylelint-order": "^0.8.0"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.1",
    "css-loader": "^0.28.7",
    "eslint": "4.10.0",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-prettier": "2.7.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.1",
    "eslint-plugin-prettier": "2.3.1",
    "eslint-plugin-react": "^7.4.0",
    "expect": "^22.0.3",
    "extract-text-webpack-plugin": "^3.0.2",
    "html-webpack-plugin": "^2.30.1",
    "mocha": "^4.1.0",
    "node-sass": "^4.7.2",
    "nodemon": "^1.14.7",
    "postcss-loader": "^2.0.10",
    "prettier": "1.8.2",
    "prettier-eslint-cli": "^4.4.0",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.19.1",
    "webpack": "^3.10.0"
  }
}
```

* Did not get autoprefixer to work with postcss (fix)
* I added babel inside this file instead of a separate file
* Added the browser list
* Imported
    - socket.io
    - stylelint
    - stylelint order (puts properties in alphabetical order)
    - html-webpack-plugin (didn't use it yet)
    - postcss-loader (didn't use it yet)
    - webpack (didn't use it yet)

`webpack.config.js`

```js
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const ETP = require('extract-text-webpack-plugin');

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
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, 'public'),
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname, 'src', 'index.html'),
  //     inject: 'body',
  //     filename: 'index.html',
  //   }),
  //
  //   // new webpack.HotModuleReplacementPlugin(),
  //
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //   name: 'common',
  //   // }),
  //   //
  //   // new ETP({
  //   //   filename: '[name].styles.css',
  //   //   allChunks: true,
  //   // }),
  // ],
};
```

* I commented out stuff I didn't use yet
* Test it out
*   Should work with Sass transpiled into CSS 
* Should look similar to this:

![start styles look](https://i.imgur.com/s57wIEh.png)

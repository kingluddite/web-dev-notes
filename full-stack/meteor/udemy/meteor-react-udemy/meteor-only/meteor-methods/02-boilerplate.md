# Boilerplate
## Create new mtr project
`$ meteor create shorten-my-link`

`$ cd shorten-my-link`

## Install React and ReactDOM
`$ npm install --save react react-dom`

## Remove boilerplate code
Delete all files inside `client`

Keep `server` folder and file

## Generate our main boilerplate App and render to screen
`$ touch client/main.js`

Simple task here is create a new React component and render it to the screen

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <p>My App</p>
  )
}

ReactDOM.render(<App />, document.querySelector('.render-target'));
```

**WARNING** Don't forget to use `Meteor's startup()` method

Don't forget you are working inside Meteor's environment so you need to add this code to wait for Meteor to finish loading everything before rendering to page

Update `client/main.js` to:

```
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <p>My App</p>
  )
}

Meteor.startup(() =>{
  ReactDOM.render(<App />, document.querySelector('.render-target'));
}); 
```

## Run Meteor
The first time you start it up, it takes forever

`$ meteor`

## Add your HTML container
`client/main.html`

```html
<head>
  <title>ShortenMyLinks</title>
</head>

<body>
  <div class="render-target"></div>
  <!-- /.render-target -->
</body>
```

### Test in browser
You should see `My App`





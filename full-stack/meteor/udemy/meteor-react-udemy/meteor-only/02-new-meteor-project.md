# New Meteor Project

* Create a new project
`$ meteor create employees`

* Change into that directory
`$ cd employees`

* Open project inside atom
`$ atom .`

* Run Meteor
`$ meteor`

**note** Last project very little use of the **server** folder. This time we will use it more

* Remove the default meteor `client` and `server` folders with 

`$ rm -rf client server`

* Create a new `client` directory with `$ mkdir client`

`client/main.html`

```html
<head>
  <title>Employee Directory</title>
</head>

<body>
  <div class="container"></div>
  <!-- /.container -->
</body>
```

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

// After Meteor loads in the browser, render my app to the DOM
Meteor.startup(() => {
  // React render call
});
```

### Woops! We forgot to install something
* react
* react-dom

Meteor is there to help us and we can copy this [helpful hin](https://i.imgur.com/Z49oJm8.png)t in the terminal

### Stop Meteor
With this keyboard shortcut: `ctrl` + `c`

### Install React and ReactDOM with:

`$ meteor npm install --save react react-dom`

### Start Meteor again
`$ meteor`

## The App component
The top level component for all **React** apps is usually called `App` and it's only job is to import other Components

`main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>Hello from <strong>App</strong></div>
  )
}


// After Meteor loads in the browser, render my app to the DOM
Meteor.startup(() => {
  // React render call
  ReactDOM.render(<App />, document.querySelector('.container'));
});
```

## View in browser
You will see `Hello from **App**`

**note** What we did so far is absolute boilerplate that needs to be done for every application that uses **Meteor** and **React**


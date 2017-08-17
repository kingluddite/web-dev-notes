# A separate Front End Server
* `$ ls` and you'll now see `client` folder
    - This `client` folder shows everything having to do with the react side of our app
* `$ cd client` and you'll see this:

![create react app folders](https://i.imgur.com/Bnr9jWh.png)

* Create-react-app has it's own built-in server

## Run react
* Make sure you are inside the `client` directory
* `$ npm start`

* After a few seconds it will kick open the browser on `localhost:3000` and you will see a landing page with some basic react boilerplate code

## Edit our first react file
`/client/src/App.js`

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello World!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

* Change `Welcome to React` to `Hello World`
* Magically the browser updates automatically with Hello World

![hello world](https://i.imgur.com/f99xBL5.png)

## Why does the react app have it's own server?
* We already have the Express app
* That is a very good question
* The reason we have a second server is going to cause us a lot of headache
    - Only a headache as far as how the stuff works internally
    - But the setup will be very straight forward

## Overall Architecture
![how react and Express work](https://i.imgur.com/B5DXGAm.png)

### The Express Server
* The Express server pulls some info out of `MongoDB` and it can respond to requests that the browser makes with some amount of JSON
    - The Express server is solely concerned with generating JSON data and nothing else
    - It serves data and doesn't do a darn thing besides that

### The React Server
* It will take a bunch of component files and bundle them all together into one file (using Webpack and babel) and spit out a single `bundle.js` file that will be loaded up into the browser

## Takeaway
* We have one server that will be serving up our front end assets
* And a second server that serves up all different types of data inside our app

## Why not just use one server?
* We totally could use one server
* We could create a really smart Express server
    - And inside that Express server is going to be all the logic for building our react app and serving it up to the browser

## Create React App is the easiest way to get started
* And that's why we're using it
* All it's pre-built config will save us so much time
    - In trying to wire together:
        + Webpack
        + Babel
        + Development server
        + All the dependencies
        + All the CSS handling
        + Webpack plugins
        + All of the above and more we get out of the box, for free, with create-react-app
* We will spend time figuring out how to get react server and Express server to work together nicely
* Getting them to work together is easy
    - Understanding how they work together is hard

# Client React Setup
* We are going to setup:
    - React
    - React Router
    - Redux

## Delete all files inside `src`
* Except `registerServiceWorker.js`

![two root files](https://i.imgur.com/QrnElsg.png)

## index.js (Redux stuff)
* Very root on client side will be `index.js`
    - This will contain the initial bootup logic for the react side and redux side of our app
    - Think of this file as putting together all the initial Data layer of our app
    - index.js will be all about Redux
    - Data layer control

## App.js (React stuff)
* Directly under the `index.js` we'll make a single Component called `App.js`
* This will be essentially concerned with the rendering layer (or the React layer) of our app
* This will be the file that determines what Components show up on the screen
* We will use this to setup all our React Router related logic

## Why two files?
* There will be a lot of configuration for both
* Stuffing them both in a single file will be confusing

![what it will look like with two files inside our app](https://i.imgur.com/ToVyiTT.png)

## Check terminal
* Error - index.js - We deleted it
* Shutdown server

## Install dependencies

### Client vs Server side dependencies
* IMPORTANT!!!!
    - We have 2 package.json files
    - Right now we need to be inside our `client` folder
    - If you run npm install in `server` directory it will install dependencies inside the `node_modules` inside the `server` directory
    - If you run npm install in `client` directory it will install dependencies inside the `node_modules` inside the `client` directory
`$ cd client`

`$ yarn add redux react-redux react-router-dom`

## Create `/client/src/index.js`
* This file we will use to create the Redux configuration for our app

`index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render();
```


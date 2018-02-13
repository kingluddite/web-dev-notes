# Intro to Middleware
* We have our API key
* We know what the request response JSON will look like
* We know what the API endpoint we want to use
* And we have our search term (_the city the user will search for_)

And all of that is what we need to make our network request to get our forecast data

### If only it were easy
So this should be easy, right?

Actually, doing AJAX requests in Redux (_the right way_) is kind of complicated the first time you do it

At first you will think it is over the top but once you use this on your own projects a couple of times, you will find it easy and you will be amazed at how well designed it is

![action creator cycle diagram](https://i.imgur.com/pHlf6N8.png)

#### Middleware is the additional step
This wasn't in our diagram before

![middleware step](https://i.imgur.com/ubwAlhh.png)

### What is a Middleware?
Middlewares are functions that take an `action` and depending on the `action`s **type** and the `action`s **payload** (_or any other number of factors_), the Middleware can choose to let the `action` pass through, it can manipulate the `action`, it can `console.log()` the `action`, or it can stop the `action` all together BEFORE they reach any `reducer`

* Think of Middlewares as **gate keepers** (_like a bouncer_)
* They inspect all `actions` and can stop it or say "_you're fine and you can go through_", or "_no, I'm sorry but you can't go to any reducers_", or "_you can go but I'm going to change this value on you_"

### Why would I ever want to modify an action at all?
I just called the `Action Creator`, so of course I wanted to call it, I want to change the `state`

Middlewares give us the ability to do interesting things by intercepting these `actions` which we'll see soon enough but right now just know that all the `actions` flow through this Middleware step and that the Middlewares can modify `actions`

**note** We can have many different steps of Middlewares in our Applications ( _we could have one piece of Middleware, we could have hundreds of Middleware's, we could have zero Middlewares_) but they're all just functions where `actions` pass through them before hitting a `reducer`

## redux-promise
A very popular package for Middleware for **Redux** and we'll install this package to help us handle `Ajax` requests inside of our Application

### Chrome Search
Search for `redux promise` and your first result should be [redux promise](https://www.npmjs.com/package/redux-promise)

### Install redux-promise
`$ npm install --save redux-promise`

### Import it into our project
`src/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'; // add this line
```

### Apply that Middleware
`src/index.js`

```
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
```

We just hooked Middleware into our **Redux** process

### Next Challenge
Making use of this Middleware








# Install Redux Dev Tools
The main page has lots of steps for install

## easier way to install
* Add the chrome extension redux dev tool (Redux devTools)

## add our store to redux devTools
`$ npm i redux-devtools-extension`

### No store found?
![image of no store found](https://i.imgur.com/fgSwLBU.png)

* To get this to work we need to do a little more configuring

`App.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';

// add the below line
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore } from 'redux';
import rootReducer from './rootReducer';

import logo from './logo.svg';
import './App.css';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

// update the following code
const store = createStore(rootReducer, {}, composeWithDevTools(),
);

// MORE CODE
```

* Now open up redux dev tools and it should be working
* Initial state and diff
* click `State` and you'll see the entire redux store
* We also have a chart 
* Raw is JSON of all our data

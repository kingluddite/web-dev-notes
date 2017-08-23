# The Auth Reducer
* We will create one `reducer`
* We'll import it into `index.js`
* And replace the "dummy" `reducer` with a real one

## Two Reducers
![two Reducers](https://i.imgur.com/67t0csU.png)
* We are going to have two distinct `reducers inside our application
    1. `authReducer` - Will be responsible for determining whether or not the user is logged in
    2. `surveysReducer` - Will determine a list of surveys user has created

## Next
* I will create a file to house my `authReducer`
* I will pass it to our combineReducers
* And then pass that off to the Redux Store

## Create new directory `/client/reducers`
* Create `/client/reducers/authReducer.js` file
    - **note** the spelling of `authReducer.js`
    - camelCase because we are going to be export a function from this file
    - As apposed to a function class
* Create `/client/reducers/index.js`
* Now we have two `index.js` files inside our React project
    - This can be tough to get used to
    - But there is a purpose to this
    - Because we name the file inside `reducers` `index.js` it will allow us to simply import the `reducers` directory with by convention with import statements will automatically give us any file inside that directory named `index.js`
    - Lots of people don't like this naming convention but it is definately the naming convention people use in React Redux projects

`/client/src/reducers/authReducer.js`

```js
export default function(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

## Next
* We will import `authReducer.js` into our reducers `index.js`
* We'll then wire it up with a combineReducers call
* And then hook that up to the Redux store inside of our root `index.js`

`/client/src/reducers/index.js`

```js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});
```

`/client/index.js`

* Change this:

```js
// more code
import App from './components/App';

const store = createStore(() => [], {}, applyMiddleware());
// more code
```

* To this:

```js
// more code
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware());
// more code
```

## Test
* Check out terminal to make sure there are no errors
* And your browser should still say `Hi There!`

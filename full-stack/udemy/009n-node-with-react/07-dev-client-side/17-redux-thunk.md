# Basics of Redux Thunk
* Talking points
    - Redux Thunk
    - Refactor our `Action Creator` to use the `asycn-await` syntax

## What is the purpose of an `Action Creator`?
![Action Creator diagram](https://i.imgur.com/tnNcwFO.png)

* To return an Action
* An Action gets sent to all the reducers inside our app
* When then produce new values for `state`
* And updates that `state` inside our Redux store
* The Redux store sends the newly updated `state` back to our `React` Components and they will rerender with the new `state`

### Key for this process
* Vanilla Redux (no extra features add)
    - Expects that any `Action Creator` we call we immediately return an Action

#### What is an Action?
* A JavaScript object with a type property and optionally with a **payload** as well
    - `payload` - (_aka The data_)

## What is Redux Thunk?
* And what does it have to do with all this stuff?
    - The entire purpose of Redux Thunk is to break this rule:

![break this rule](https://i.imgur.com/gnGFzr2.png)

* Redux Thunk breaks the rule that we have to immediately return an action from every `Action Creator` we create

## What is Redux Thunk really doing for us?
![diagram of Redux Thunk process](https://i.imgur.com/afzuobE.png)

* Think of Redux Thunk as a big funnel that just sits there and waits for Actions to be passed into it

### Steps
1. The `React` Component calls an `Action Creator`
2. This time instead of `returning an action` we `produce an action`
    - The `Action Creator` somehow produces an Action
    - The real question is about how the `Action Creator` communicates that Action back to the Redux store
3. Now instead of returning the Action it will be passing it to the `Dispatch Function` (the funnel)
    - The **Dispatch Function** belongs to the Redux Store
    - If we call the `Dispatch Function` with an Action
    - The Action will be automatically forwarded on to all the different reducers inside the app
    - **note** To be clear the `Dispatch Function` is already where this Action is being sent to

![Action and Dispatch Function](https://i.imgur.com/FgGeSTV.png)

* Invisible step

![invisible step](https://i.imgur.com/BdXLwJk.png)

* When it says `Sent to..` this is the invisible step
* We are looking at here what the Dispatch Function is doing
* The Dispatch Functions purpose is to send these Actions off to the reducers
* This step is already happening with Redux when we use it
4. The reducers will run like normal
5. They will produce a new value for `state`
6. And they'll pass all that `state` back to the store

## So what the heck is the purpose of Redux Thunk?
* The only thing it is really doing is it is giving us direct access to the Dispatch Function
* It says, "OK, in your Action, you don't want to follow the rules. You don't want to return an action like usual"
    - "Instead I'm going to give you direct access to this Dispatch Function and then at any time, at any point after doing whatever you want, if you want to manually dispatch an Action, just pass the Action to this Dispatch Function"

## Takeaway
* Redux Thunk helps us bend the rules
* Instead of just returning an Action immediately
* It allows us to manually Dispatch and action at any point in time that we wish from an `Action Creator` rather than just flat our require us to return it from the `Action Creator`
* The Dispatch Function exists without Redux Thunk but by using Redux Thunk we get a handle directly on the Dispatch Function

## Let's create our `Action Creator`
* First go round will be rough
* The goal is just to get it working first
* Then we'll refactor with cool modern code

### We won't do it this way (now with Redux Thunk)
`/client/src/actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  const request = axios.get('/api/current_user');

  return {
    type: FETCH_USER,
    payload: request
  };
};
```

* Instead we will get direct access to the Dispatch function
* When we wired up Redux Thunk we wired it up as a middleware

`/client/src/index.js`

```js
// more code
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
// more code
```

* The purpose of Redux Thunk is to inspect whatever value we return from this `Action Creator` (fetchUser)
* If Redux Thunk sees we return a function instead of a normal action
    - Redux Thunk will automatically call this function and pass in that `Dispatch` function as an argument

`client/src/actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  return function(dispatch) {
    axios.get('/api/current_user');
  };
};
```

* So `dispatch` is a function
* And this is the same function we saw in the diagram

![Dispatch function](https://i.imgur.com/qdpsQnd.png)

* We think of it as a big funnel that any Action we toss into it will be automatically passed on to all the reducers in our app
* Now that we have this `dispatch` function we don't have to immediately return an Action
    - We can do it when we want
    - This is pertinent to our Ajax call to our API because we want to dispatch and Action after our Ajax call has been successfully completed
    - That's the whole point of all this
    - If we tried to dispatch an Action before the API request was completed we would get an error
    - We want to treat this: `axios.get('/api/current_user');` as an asynchronous piece of code (_because that's what it is_)
    - We will chain on a `.then()` because `axios.get()` returns a Promise and once the Promise is resolved only then will we dispatch an Action and have that be sent off to all of our reducers

`/client/src/actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
```

## Next
* Wire up our `Action Creator` so it gets called
* Test it to make sure it's working
* Then we'll refactor to make the code look nicer than it does now using modern JavaScript syntax

# Redux Promise Continued
We successfully requested an **Ajax** request for a weather forecast and we did that by wiring our `SearchBar` **Container** to our `fetchWeather()`

## How did we get access to the `Action Creator` by `connect()`ing our Component through `mapDispatchToProps` with `SearchBar`

## Two things we'll focus on now:
1. Learning more about `Redux Promise`
2. How do deal with the data that is coming back

### Create a new `reducer` for handling the `fetchWeatherAction`

Create `src/reducers/ReducerWeather.js`

**note** Remember that `reducers` are just functions

* The first argument of a `reducer` is ALWAYS our `state`
* Our second argument of a `reducer` is ALWAYS our `action`

```
export default function(state = null, action) {
  
}
```

* We make sure to export it so we can access this `reducer` in other files
* We use ES6 to default our first argument (`state`) to **null**

## Test to see if our `reducer` is working
```
export default function(state = null, action) {
  console.log('Action received', action);
  return state;
}
```

## Make sure we make use of our `reducer`
We do this by adding it to our `combineReducers` function in `src/reducers/index.js`

```
import { combineReducers } from 'redux';
import WeatherReducer from './ReducerWeather';

const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer;
```

* We import the `reducer` **WeatherReducer**
* And this will be responsible for our weather part of our `state` (_weather is the key_) so we set it's value to our `reducer` like this:

```
weather: WeatherReducer
```

###Review of what we just did:
* We have a simple `reducer` here that just takes an `action`
* It `console.log()`s it
* It doesn't do anything with the `state` so we can ignore `return state` for now
* We just are concerned with the `console.log()`

```
export default function(state = null, action) {
  console.log('Action received', action);
  return state;
}
```

### Let's console.log() the request we are sending out as well
`src/actions/index.js`

```
import axios from 'axios';

const API_KEY = '4bdc423659b58443ad1676fe261eeac5';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
   const url = `${ROOT_URL}&q=${city},us`;
   const request = axios.get(url);

   console.log('Request:', request); // add this line

   return {
     type: FETCH_WEATHER,
     payload: request
   };
}
```

#### Here is what happens in our Application
1. User enters search term
2. They submit the form that calles the `Action Creator` (**fetchWeather()**) and when we call **fetchWeather(city)** we pass in the city as an argument
3. We craft a URL with the city and make an `Ajax` request with **axios**
4. Axios return a `promise`

## What is a `Promise`?
A Promise is a data structure that doesn't yet contain any of our request data but we are returning the `promise` on our **payload** key

```
return {
  type: FETCH_WEATHER,
  payload: request
};
```

**important** We are returning the `promise` as the **payload**

### Let's do an experiment
We have two `console.log()`

* One inside our `reducer`
* One inside our `Action Creator`
    - We are `console.log()`ing the **request** and then attaching it to our **payload**

`src/actions/index.js`

```
// more code
export function fetchWeather(city) {
   const url = `${ROOT_URL}&q=${city},us`;
   const request = axios.get(url);

   console.log('Request:', request);

   return {
     type: FETCH_WEATHER,
     payload: request
   };
}
```

Inside our `reducer` we are `console.log()`ing our entire `action` which should have that same exact **payload**

`src/reducers/ReducerWeather.js`

```
export default function(state = null, action) {
  console.log('Action received', action);
  return state;
}
```

### Test in browser
Refresh page and you'll instantly be greeted by three `console.log()`s that are all `Action received` and the **types** you see (_i.e. @@redux/INIT_), these are default actions that **Redux** ALWAYS dispatches with **Redux** first starts up (_these are just bootup actions to assemble some initial state for our Application and makes sure that all of our `reducers` make sense and don't return `undefined`_)

#### Search for `Philadelphia` and press `enter` key
Check out your console and you'll see we get one **request** (_which is coming from our `Action Creator`_) and we see `Action received` which is coming from our `reducer`

##### The request shows us:
We are `console.log()`ing a **Promise** and we take this **Promise** and we assign it to the **payload** key and that goes off to our `reducer`s

Then in `Action received` we see that same `action`, the **payload** has an Object which should be the **Promise**

In the console expand the Object under the `action` received, expand `payload`, expand `data` and expand `city` and you will see the data we want

![our response](https://i.imgur.com/Ch9d2H8.png)

We get our data but you must know that something strange is going on. We have our

* We have our **request**

![action creator](https://i.imgur.com/VSTd2zW.png)

* We return it our `request` as the **payload** It is a `Promise`

![Promise as payload](https://i.imgur.com/GFjFh8X.png)

The `action` is supposed to go straight over to the `reducer`

![action in our `reducer`](https://i.imgur.com/DQySCcH.png)

We `console.log()` our **action**

But now instead of having a `Promise` as a **payload**, we have the `response` there instead???

### So what is happening here?
This is the purpose of `Redux Promise`. Remember `Redux Promise` is a Middleware. Middlewares have the ability to stop or manipulate actions before they hit any `reducer` whatsoever

So what is happening in our Application is Redux Promise sees this incoming action (_because it is the **Gate Keeper** and it's job is to see all actions when they come into the Middleware_). It looks at specifically the **payload** property

![payload property](https://i.imgur.com/mb1yg2B.png)

If the **payload** is a `Promise`, `redux-promise` stops the action entirely, (_It says, "Hey! Here's an action. It has a payload of a Promise. I care about this. This is what I do. This is what I'm about. This is my deal."_) It stops the action entirely and then once the `request` finishes it **dispatches** a new `action` of the same **type** but with a **payload** of the resolved `request` (_In other words, it unwraps the Promise for us_) It says, "_Ok this is a promise_", the `reducer`s don't really care about the Promise, they just care about the data so it stops the `action`, it waits until the `Promise` resolves and then it says, "_OK I've got the resolved data, here's the request from the server, I'm now going to send that as the **payload**_)

And this is where Middleware starts to get super fantastic by doing this kind of [interstitial](https://i.imgur.com/SmQ2Pv1.png) handling of actions for us

### What would happen if we ended up inside our `reducer` with a Promise? 
That would be hard to work with. We would have a **switch statement** but don't run our **switch statement** until this action gets resolved. That would be a big pain. So we use this Middleware that stops the action in its tracks until the `Promise` is resolved and then it goes off and does its thing

## Diagram to help clarify what we are talking about here:

![diagram Redux-Promise Middleware](https://i.imgur.com/HQkJTiL.png)

This is the flow of the Application of this action

1. We have our `action` that returns from our `Action Creator`
2. Our `action` enters our Middleware (_specifically it enters our Redux-Promise Middleware_)
3. Our Middleware asks does the `action` have a `Promise` as a **payload**
4. If No (_the **action** does not have a **Promise** as the **payload**_)
    * I don't care about it. Let it go through to all the `reducer`s
5. If the `action` does have a **Promise** as the **payload**
    1. Stop the `action`
    2. Only after the `Promise` resolves (_after the Ajax request is finished_) create a new `action` and then send it through to the `reducer`s

So this fantastic ability Middleware gives us which dramatically simplifies our Application

## Holy Smokes Batman! Our code is clean!
The code we wrote (_the Ajax request_) is asynchronous in nature. It doesn't happen instantly. Normally, we would have to pass a **callback** to it. Or we have to deal with a `Promise` but the code that we wrote doesn't appear like we have any asynchronous code here. It all looks like it is 100% synchronous and what this allows us to do is to have some nice looking code that is not overly complex and that is the point of `Redux-Promise`. To clean up our code.

### Next Challenge
Finish up `ReducerWeather`

First remove our two `console.log()`s.

[remove from our Action Creator](https://i.imgur.com/Jd9vRmx.png)
[remove from our `reducer`](https://i.imgur.com/jNG8SGQ.png)




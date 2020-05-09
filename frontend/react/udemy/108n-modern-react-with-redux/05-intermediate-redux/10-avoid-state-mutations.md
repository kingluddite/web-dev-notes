# Avoid `state` mutations in Reducers
We just talked about how a **Redux** `Promise` unwraps a `Promise` for us so we only have to work with data in our `reducer`s not `Promises`

## What part of the request do we want to save?
Look at the action that is coming in

The only thing inside of **payload** that we care about is `data` property

![data prop inside payload](https://i.imgur.com/MGPHDbh.png)

* This data contains
    - city
    - list that contains all of our forecasts

### action.data.payload
This is the only thing we care about in our `action`

![mockup](https://i.imgur.com/Balyifm.png)

### A List of sorts
* Remember we want to show multiple cities at a time
    - This implies that our data structure will be a `list of sorts`
    - We will want to store all these pieces of weather data inside an array

`src/reducers/ReducerWeather.js`

So because of this we will change our initial `state` of **null**

`export default function(state = null, action) {`

To an initial `state` of an empty array like this:

`export default function(state = [], action) {`

### Add our switch statement
This will handle only the `FETCH_WEATHER` action **type**

**note** We will now use the `FETCH_WEATHER` variable we exported from our `Action Creator` in this file: `src/actions/index.js`

```
import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:

  }  
  return state;
}
```

* import our `Action Creator`
    `import { FETCH_WEATHER } from '../actions/index';`

## Handle the payload
* Remember that what we will return will be inside an array
* We put it inside an array because we will have multiple cities coming back here
* We only care about data inside `action.payload.data`
* Currently we are not building a list of cities, we only have one city at a time
    - What we need to do here is say, "_take our current state (_our current list of cities_) and add this new city `action.payload.data` to it_"
    - So we need to add on to the existing `state` (_not replace the existing state entirely_)
    - So we think maybe this will work

`return state.push(action.payload.data);`

### Bad Idea Jeans
If we use the line above we are opening up a HUGE can of worms and this line exemplifies one of the most subtle traps in all of **Redux**

## In React we said we had a few important rules:

### Never Ever Call or say something like...

`this.state.text = 'bla, bla bla'`

### Never set state equal to something!

## Those rules are completely true in Redux as well
In **Redux**, we don't ever manipulate state directly and this line is manipulating `state` directly which is a HUGE NO-NO!

`return state.push(action.payload.data);`

We are changing the above `state` array. We are **mutating** that array in place 

### We only ever update state by called `setState()`

### Don't Mutate our `state`!
Whenever we are inside a `reducer` like this we don't mutate our `state`, we return a completely new instance of `state`

So we are going to return all the old weather data and the new piece of weather data

### This is a much better approach
We aren't mutating our `state`, we are returning a new version of our state

* This is super important in **Redux**
* Never mutate state in Redux over time (_Learn it. Live it. Love it!_)
    - Always make sure you are always returning a new instance of `state`

```
import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return state.concat([action.payload.data]);
  }
  return state;
}
```

* `concat()` doesn't change the existing array
    - It contains a new array that contains all the old stuff and the new stuff in here `[action.payload.data]`

### Use ES6 syntax to do the same thing in a more modern JavaScript way
A very compact way of writing a new array (_which is what we always want to do with our `state` as opposed to mutating our `state`_)

**note** If you use the ES6 way, the new record will be added at the very top of our new array

Replace this line:

`return state.concat([action.payload.data]);`

With this line:

`return [ action.payload.data, ...state];`

* **note** Both lines are almost completely identical in functionality

They both say, make a new array, put `action.payload.data` inside of that new array and then take this other variable (_because the variable is prefaced by `...` which says, "oh yeah, this might be an array so take all of the existing entries inside of it and insert it into this new outside array (kind of like saying 'flatten it out for us'"_)

The output array **WILL LOOK LIKE** `[ city, city, city ]`
It **DOES NOT LOOK LIKE** `[ city, [ city, city ] ]`

* We wired up our `reducer`
* We've got it added to our Application under the `combineReducers`

### Next Challenge
Testing it out by making a new Component that will render a list of cities

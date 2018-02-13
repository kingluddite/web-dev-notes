# redux-promise Review
We just finished setting up a new `Action Creator` called `fetchWeather()`

* This `Action Creator`will be responsible for creating an action that contains a request to the backend API
* It's **type** was `FETCH_WEATHER`
* Our `fetchWeather()` `Action Creator`takes a `city`, which is a `string` as its only argument and we use that `city` as part of our search query

```
export function fetchWeather(city) {
const url = `${ROOT_URL}&q=${city},us`;
```

* We also installed the `axios` library
    - Works almost exactly like the jQuery Ajax method
        + It just reaches out
        + Does an Ajax request in the form of a GET to the URL that we supply and it returns a **Promise**

`const request = axios.get(url);`
        + We pass that **Promise** in to the `actions` **payload** property

`payload: request`

`SearchBar`

## Goal
Call the `Action Creator`whenever the user **submits** the form

So we will place our code inside our `onFormSubmit()` **handler**

```
onFormSubmit(event) {
  event.preventDefault();

  // We need to go and fetch weather data
}
```

## Wiring Up
* We need to wire up `onFormSubmit()` so that whenever a user enters anything or presses the **submit** button or presses **enter** key, we then want to fire that `Action Creator`and that in turn will make our **API request**

**note** We are working inside a `Container` here and this `Container` needs to be able to call an `Action Creator`. It needs to reach out to **Redux** and work with **Redux** directly

This means we need to connect our **SearchBar** `Container` to **Redux** which means we need to use the `connect()` method using the `react-redux` Library

## Import the connect() method
```
import React, { Component } from 'react';
import { connect } from 'react-redux'; // add this line
```

## Import bindActionCreators() method
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; // add this line
```

## Import our fetchWeather() Action Creator
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index'; // add this line
```

### Test in browser
Refresh and just make sure you have no errors

## Goal
We want to hook up our `Action Creator``fetchWeather()` to our `SearchBar` `Container`

We do that by defining at the bottom of **SearchBar** the `mapDispatchToProps()`

```
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}
```

* This causes the `Action Creator``fetchWeather` (_whenever it gets called and returns an `action`_), `bindActionCreators()` with **dispatch** makes sure that that **action** flows down to that Middleware and then the `reducers` inside of our **Redux Application**

### Using connect()
At the bottom add:

`export default connect(null, mapDispatchToProps)(SearchBar);`

* We have not seen `connect()` with **null** as the first argument
* Previously when using `connect()` we mapped both `mapDispatchToProps` and also `mapStateToProps` as well

Why are we passing in `null`?

Whenever we are passing in a function that is supposed to map our **dispatch** to props of our `Container` it always goes in as the second argument in here

`connect(null, mapDispatchToProps)`

### No `state` needed here!
So we pass `null` which says, "_hey I know that Redux is maintaining some state but this `Container` just doesn't care about it at all. Thanks but we don't need any `state` here_"

So by **bindingActionCreators()** `fetchWeather` to **dispatch** and then mapping it to `props`, that gives us access to the function `this.props.fetchWeather` inside of our Component here

### Calling our `Action Creator`now!
```
onFormSubmit(event) {
  event.preventDefault();

  // We need to go and fetch weather data
  this.props.fetchWeather(this.state.term);
  // clear out our search input
  this.setState({ term: '' });
}
```

### Test in browser
1. Save and refresh
2. In Chrome console click on the **Network** tab
3. On your app form field, search for a city

#### Error!
Cannot read property `props` of null

Remember you have to **bind** this of `onFormSubmit` **callback**

Add `this` binding to `constructor()`

```
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''};

    this.onFormSubmit = this.onFormSubmit.bind(this); // add this line
    this.onInputChange = this.onInputChange.bind(this);
  }
```

### Test again
You should get this after entering city name and pressing `enter` key

![xhr successful](https://i.imgur.com/sLnpmju.png)

* Our input clears out after we hit **submit** (_which is what we wanted_)

Our **Network** tab is letting us know our **endpoint** received a status of `200`

* Zoom in on `Network` and click on **request** and then click the **Preview** tab

![preview tab of Network tab](https://i.imgur.com/QlTaJRp.png)

**note** This `response` looks just like the **JSON** `response` we were looking at earlier

We have:

* Our city property (has the long and lat)
* The name of our city
* And the long list of all the weather snapshots
    - One for every three hours for the next five days
        + And each of these has their own **temperature**, **pressure** and **humidity**

### Next Challenges
1. We still are not making any use of the `redux-promise` package we installed earlier
2. We successfully made an **Ajax** request but we are not doing anything with it yet (_we assigned it to the payload but we are not make use of it yet_)






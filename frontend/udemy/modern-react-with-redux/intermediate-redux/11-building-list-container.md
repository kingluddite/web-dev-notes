# Building a List Container
The **Redux** side of our Application is looking good

* We have an `Action Creator` that can make an Ajax request to the Weather API
* We have a `reducer` to handle that as well

We need to make a new Component to render our list of cities with all the appropriate data

## Should this be a `Container` or a `Component`?
Before making this Component we need to ask ourselves the 20,000 dollar question we should ask before we ever create a Component inside a Redux Application, "Should this be a `Container` or a `Component`?"

* This Component will need to render a list of cities
    - So we will need access to the **Redux** `state`

So we need to make a `Container`

`src/containers/WeatherList.js`

```
import React, { Component } from 'react';

class WeatherList extends Component {
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    )
  }
}

export default WeatherList;
```

## Import and add instance of `WeatherList` `Container`

`src/components/App.js`

```
import React, { Component } from 'react';

import SearchBar from '../containers/SearchBar';
import WeatherList from '../containers/WeatherList';

class App extends Component {

  render() {
    return (
      <div>
        <SearchBar />
        <WeatherList />
      </div>
    );
  }
}

export default App;
```

### Test and view in browser
![Our apps two containers](https://i.imgur.com/SrPbPtK.png)

We should see the above in our App

![review of wireframe](https://i.imgur.com/nYVms3x.png)

We need to add **Temperature**, **Pressure** and **Humidity** columns on our table

`WeatherList`

```
import React, { Component } from 'react';

class WeatherList extends Component {
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    )
  }
}

export default WeatherList;
```

### Time to add our individual rows
#### How do we get this data into this Component? 
Because it is a `Container` we have to get the data into our `Container` from Redux

### Add the necessary imports
`WeatherList`

```
import React, { Component } from 'react';
import { connect } from 'react-redux'; // add this line
```

### Add mapStateToProps()
`WeatherList`

```
function mapStateToProps(state) {
  return { weather: state.weather }
}
```

**note** We specifically used `state.weather` here because we assigned our WeatherReducer to the `weather` **key** in the `combineReducers()`

`src/reducers/index.js`

```
const rootReducer = combineReducers({
  weather: WeatherReducer
});
```

## Refactor with ES6
This will help clean up our code

`WeatherList`

```
function mapStateToProps(state) {
  return { weather: state.weather }
}
```

* Notice that we are using one argument and from that argument we are pulling off just one property so we can change our code to:

```
function mapStateToProps({ weather }) {
  // this argument is identical to doing it this longer way
  // const weather = state.weather
  return { weather: weather }
}
```

## More ES6 refactoring
Whenver we have a key and value that are the same like `{weather: weather}` we can just use one value like `{ weather }`

```
function mapStateToProps({ weather }) {
  return { weather }
}
```

### Last step: Connect our Component with matchStateToProps
`export default connect(mapStateToProps)(WeatherList);`

### Final code
`WeatherList`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather }
}

export default connect(mapStateToProps)(WeatherList);
```


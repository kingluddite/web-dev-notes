# Review
* We worked more with Redux and we created another `Action Creator` named `fetchWeather()`

We used a CONSTANT for our action **type** that enabled us to specify our `action` **type** in our `action` and in our `Reducer` as well. This was done to cut down on our ability to make typing mistakes which using a pure string would surely increase our adds of typing mistakes

## Use of MiddleWares
### Specifically Redux Promise
We used Redux Promise on a Promise we received from using **axios** (axios was used to make our Ajax request)

The Middleware we used was especially helpful because it automatically detected that we provided a `payload` of a Promise, it stopped that `action`, and then waited for the Promise to resolve. Once the Promise resolved it took the data coming back from the request, stuck it on the **payload** property and sent the `action` on to all of the Reducers in our Application

So even though we wrote an Ajax request that just inherently involves asyncronous code, we didn't have to think of the asynchronous nature of our code at all

We just wrote code where an action is created, it flows to the Reducers. We didn't have to worry about any Promises or **callbacks**

## Reducers
We really want to strive to avoid mutating our `state`

Remember we never want to do something like `state.weather.push` or `state.tomorrowsWeather = weather` (_we never want to modify our state directly_)

Instead we return a new object that will take the place of our existing state

### Destructuring existing arrays
`return [ action.payload.data, ...state ]`

Here we took an existing array `...state`, flattened it out, to create a new one `action.payload.data`

## We used the Sparklines Library
Sparklines are designed to be small and give users a quick idea of what was happening with the data

We added average function and units as an additional property

## Google Maps
We created a Component that uses GoogleMaps and imported it into our App

**note** We could have also used the `react-google-maps` by importing this:

```
import React, { Component } from 'react';
import { GoogleMapLoader, GoogeMap } from 'react-google-maps';

export default (props) => {
  return (
    <GoogleMapLoader
      containerElement={ div style={{height: '100%'}} /> }
      googleMapElement={
        <GoogleMap defaultZoom={12} defaultCenter={{lat: props.lat, lng: props.lon}} />
      }
    />
  );
}
```

And installing `$ npm i -S react-google-maps`

And the GoogleMap Component could be coded like this:

```
import React, { Component } from 'react';

class GoogleMap extends Component {
  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: {
        lat: this.props.lat,
        lng: this.props.lon
      }
    });
  }
  render() {
    // this.refs.map
    return <div ref="map" />
  }
}

export default GoogleMap;
```

But we now have two different ways to create 3rd Party Components

We broke `Chart` and `GoogleMap` into their own Components so we could use them in other places in our app or other apps

Middleware is one of the coolest and most powerful features of Redux


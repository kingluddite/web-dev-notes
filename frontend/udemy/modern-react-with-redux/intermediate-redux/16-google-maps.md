# Google Maps Integration
## Style Improvements
* Center each individual chart
* Make each chart the same size
* Add some space between the address bar and our SearchBar

**note** Our css is already wired up to our `index.html`

`<link rel="stylesheet" href="/style/style.css">`

`style/style.css`

```
td, th {
  vertical-align: middle !important;
  text-align: center !important;
}

.input-group {
  margin: 20px 0;
}

svg {
  height: 150px;
}
```

### Test in browser
The charts and SearchBar should look good

![charts and SearchBar styled](https://i.imgur.com/RCOe0Zt.png)

## Google Maps to the rescue
Instead of just using the name of the city let's replace it with a tiny google maps window

* We need to make a separate Component to house this map
* We won't need to touch Redux at all so we can just make this just a Component and not a Container
* It won't have any concept of Application `state`
* We'll just pass in some `props` from the parent Component and have the Component decide on how to make the map appear on the screen

`src/components/GoogleMap.js`

```
import React, { Component } from 'react';

class GoogleMap extends Component {
  
}

export default GoogleMap;
```

We are importing the google maps APIs JavaScript file

`index.html`

`<script src="https://maps.googleapis.com/maps/api/js"></script>`

So because our project is already wired up to use google maps we don't have to install any addition modules

**note** We've been getting an **warning** in our console all this time because of that link in `index.html` to google maps

Type `google.maps` in your console and you'll see:

`Object {Animation: Object, ControlPosition: Object, __gjsload__: function, Circle: function, Data: function…}`

So we know we have access to this fancy object which will give us the ability to create a google map

## Houston we have a problem
We are about to use google maps which has no idea how to integrate with a React application. This means our code will look a lot different than how we've been doing stuff up and until this point when building Components

## refs
`ref` (_short for **reference**_) enables us to a direct reference to an HTML element that has been rendered to the page

So after this component has been rendered to the page I can get a direct reference to the `div` we created here

`GoogleMap`

```
import React, { Component } from 'react';

class GoogleMap extends Component {
  render() {
    return <div ref="map" />
  }
}

export default GoogleMap;
```

All we need to do to get a reference to the `div` element is to use `this.refs.map`

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

### componentDidMount()
This is a LifeCycle method that is called immediately after our Component has been rendered to the screen

### `new google.maps.Map()`
This is how we create an embedded Google Map inside of our document

* It's first argument takes a reference to an HTML node `this.refs.map`
    + This is the HTML element where we want to render this map to
    + Google will take that HTML element on the screen and render an embedded map into it
    + This is how we deal with 3rd party Libraries that don't know how to interact with a React ecosystem
* Second argument is an `options` object
    - You can go from street view to full scale planet view
        + That is what `zoom` gives you and `12` will give you a good glance at a city
    - We use `center` property to tell Google Maps where we want to center the map on
        + Inside we use Google's `lat` and `lon` keys and we give them the values we have access to in `props` using `this.props.lat` and `this.props.lon` (**note** google uses `lng` and weatherapi using `lon`)

## Add our GoogleMap to our WeatherList Component

### Import our GoogleMap

`WeatherList`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import _ from 'lodash';
import GoogleMap from '../components/GoogleMap'; // add this line
```

### Add `lon` and `lat` variables
```
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => 1.8 * (temp - 273) + 32);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const lon = cityData.city.coord.lon; // add this line
    const lat = cityData.city.coord.lat; // add this line
```

Use ES6 to condense 2 lines into 1 line using:

Change this:

```
const lon = cityData.city.coord.lon; // add this line
const lat = cityData.city.coord.lat; // add this line
```

To this:

```
const { lon, lat } = cityData.city.coord;
```

Replace:

```
  return (
      <tr key={name}>
```

With our Google Map

```
return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat}/></td>
        <td><Chart data={temps} color="orange" units="F" /></td>
        <td><Chart data={pressures} color="red" units="hPa" /></td>
        <td><Chart data={humidities} color="blue" units="%" /></td>
      </tr>
    )
```

## Houston we have a problem
The Google Map makes no assumptions about height and width so you will need to add some CSS to size your Google Maps

`style.css`

```
/* other code */
td:first-of-type, td:first-of-type > div {
  height: 200px;
  width: 250px;
}
```

Above CSS rule says find the first `td` inside of each row and also find the first `td` and it's first child `div` (_which will be the google map_)

# Adding Sparkline Charts
We want to work on our temperature, pressure and humidity charts now

![wireframe](https://i.imgur.com/TI3xC25.png)

* For each of our columns we have one individual chart

## Are we going to have to create all these charts from scratch?
No. We are going to use a React 3rd Party Library called `React Sparklines`

[react-sparklines documentation](https://github.com/borisyankov/react-sparklines)

There are animated `Sparklines` and static `Sparkline` charts. We'll create a static `Sparkline` chart

* Using Sparklines is super easy

### Sample Sparkline
```
<Sparklines data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20} margin={5}>
</Sparklines>
```

We use a `Sparklines` Component instance and pass it some data (_which is just an array of numbers_)

* We provide a width and height for the Component
* And that's it
* Limit and margin is optional
* If you want to use colored Charts, we nest `SparklinesLine` and pass it a color

```
<Sparklines data={[5, 10, 5, 20]}>
  <SparklinesLine color="blue" />
</Sparklines>
```

Adding `Charts` to our page using `Sparklines` is simple but adding data inside our charts will be a bit more challenging

* The data we pass `Sparklines` should just be an array of numbers. It doesn't know how to handle it if we pass it an object. So we need to figure out how to pass it just a plain array of flat numbers

![review redux state diagram](https://i.imgur.com/d9TLWbq.png)

* We made a couple changes to this diagram
* We have our weather **property** which is an array that holds bunch of **cityData** objects
    - one for:
        + san francisco
        + los angeles
        + dallas

We use `weather.map()` to produce one row for each **city**

We need to produce an array of numbers for the

* temperature
* humidity
* pressure

![zooming in on diagram](https://i.imgur.com/umIEdTS.png)

* These numbers are nested inside **list** (_which is an array_)
    - Inside list is **main** (_which is an object_) that contains **temperature**, **humidity** and **pressure**

### Our task
We need to take all these different temperatures that are inside the **list** and get them all out as a simple, flat array (for temperature, humidity and pressure)

* Three separate arrays
* That `.map()` function should help make this simple for us
    - For any give **city**, `cityData.list.main.temp` (and that would give you the temperature)

`cityData.list.map()` and inside of the map we'll get access to main and temperature and humidity and pressure

### Let's pull off an array of temperatures
**note** `cityData.list` is a list of all the different forecasts for this particular city (one for every three hours over the next five days)

```
// more code
class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp)
// more code
```

This is `cityData`

![cityData](https://i.imgur.com/yoea9Yz.png)

This is `cityData.list`

![cityData.list](https://i.imgur.com/8AqXwsZ.png)

We map over `cityData.list` and each one of these objects (see below)

![mapping over](https://i.imgur.com/qRkaDj6.png)

Each one of these objects (all for of them) is passed into this function as the argument **weather**

`cityData.list.map(weather`

And for each of those we say `weather.main`

![weather.main](https://i.imgur.com/y75LTQF.png)

and `weather.main.temp`

![weather.main.temp](https://i.imgur.com/bReQzsP.png)

And that will return (using our wireframe) a temperature of `260` Kelvin (all of the units are in Kelvin which is a different unit system for temperatures)

### Console log to test
```
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    console.log(temps); // add this line

    return (
      <tr key={name}>
        <td>{name}</td>
      </tr>
    )
  }

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
          {this.props.weather.map(this.renderWeather)}
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

View in browser. Refresh. Enter a city and press `enter`

You should see an array similar to this:

```
[283.04, 285.29, 286.25, 289.51, 293.577, 292.68, 289.705, 287.301, 285.828, 284.344, 284.314, 288.547, 292.027, 293.148, 288.587, 286.923, 286.294, 284.904, 283.509, 287.778, 291.464, 288.62, 286.658, 283.625, 278.501, 277.086, 277.571, 279.586, 280.79, 280.439, 279.533, 278.843, 278.175, 277.209, 277.186, 280.662, 282.088, 283.139]
```

That is what we expected to see. Just a plain, flat array of numbers. Awesome! That is exactly what the Sparklines Library needs.

**note** Remove the `console.log(temps)` because we now know it works

### Install Sparklines Library
`$ npm install --save react-sparklines`

### Import Sparklines and SparklinesLine
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines'; // add this line
```

* **note** Sparklines is the parent element and SparklinesLine is nested inside it

```
return (
      <tr key={name}>
        <td>{name}</td>
        <td>
          <Sparklines height={120} width={180}/>
        </td>
      </tr>
    )
```

We add numbers for width and height and they are just pixel values. Feel free to change them as you wish

### Final Code
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);

    return (
      <tr key={name}>
        <td>{name}</td>
        <td>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red" />
          </Sparklines>
        </td>
      </tr>
    )
  }

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
          {this.props.weather.map(this.renderWeather)}
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

### Test in browser
Save and refresh browser.

Enter cities, press enter and watch the red charts appear. Excellent!

![our charts are working](https://i.imgur.com/dU7DYSG.png)


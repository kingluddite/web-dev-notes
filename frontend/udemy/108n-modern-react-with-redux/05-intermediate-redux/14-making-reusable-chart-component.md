# Making a Resusable Chart Component
We just need to replicate what we did for temperature once for pressure and once for humidity

If we did that we might end up with code that looks like this:

```
  return (
      <tr key={name}>
        <td>{name}</td>
        <td>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red" />
          </Sparklines>
        </td>
        <td>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red" />
          </Sparklines>
        </td>
        <td>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red" />
          </Sparklines>
        </td>
      </tr>
    )
```

And that is not good code because it is not DRY

If you ever find yourself to be replicating some piece of markup in this fashion it means you should break that piece up into it's own Component (a Resuable Component)

### Time to refactor our Sparklines code into a separate Component
We are making a separate Component

We need to ask ourselves will this be a `Container` or a Component?

* We're generating all of our data from this function

`const temps = cityData.list.map(weather => weather.main.temp);`

And we're always going to be passing it into the chart

```
<Sparklines height={120} width={180} data={temps}>
  <SparklinesLine color="red" />
</Sparklines>
```

* That means this Chart Component doesn't need to talk to Redux at all because it is going to be getting its data from its parent. So we will make it just a Component

`src/components/Chart.js`

Now we need to ask ourselves should this be a class-based Component or a functional Component?

In this case we don't need to make any use of `state` inside our Component at all. It will be just some `props` come in, we render a Component. That's it. No extra fancy stuff going on at all. So we can just create a **functional Component**

```
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const Chart = (props) => {
    return (
      <div>
        <Sparklines height={120} width={180} data={props.data}>
          <SparklinesLine color={props.color} />
        </Sparklines>
      </div>
    );
}

export default Chart;
```

* We will be passing in **data** and **color** into our new `Chart` Component

`WeatherList`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);

    return (
      <tr key={name}>
        <td>{name}</td>
        <td>
          <Chart data={temps} color="orange" />
        </td>
        <td>
          <Chart data={pressures} color="red" />
        </td>
        <td>
          <Chart data={humidities} color="blue" />
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
Save and Refresh and enter some cities

![reusable charts](https://i.imgur.com/nXw2aeR.png)



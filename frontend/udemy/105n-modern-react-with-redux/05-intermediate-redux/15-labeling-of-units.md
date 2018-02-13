# Labeling of Units

`WeatherList`

```
const name = cityData.city.name;
const temps = cityData.list.map(weather => weather.main.temp);
const pressures = cityData.list.map(weather => weather.main.pressure);
const humidities = cityData.list.map(weather => weather.main.humidity);
```

And we generate our other Charts

```
return (
  <tr key={name}>
    <td>{name}</td>
    <td><Chart data={temps} color="orange" /></td>
    <td><Chart data={pressures} color="red" /></td>
    <td><Chart data={humidities} color="blue" /></td>
  </tr>
)
```

### Adding numeric values to our temperatures
* We'll add a line that represents the average
* We'll add a number under each chart that shows the average

### [How do I add an average line?](https://github.com/borisyankov/react-sparklines#reference-line)

We will add a reference line

This is what they have on the main page of the documentation:

```
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
...
<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="mean" />
</Sparklines>
```

And when we dig deeper we find we can change `mean` to `avg` to get the **average**

```
<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="avg" />
</Sparklines>
```

### To implement
We add the import statement to pull off `SparklinesReferenceLin` and include the SparklinesReferenceLine instance

`src/components/Chart.js`

```
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

const Chart = (props) => {
    return (
      <div>
        <Sparklines height={120} width={180} data={props.data}>
          <SparklinesLine color={props.color} />
          <SparklinesReferenceLine type="avg" />
        </Sparklines>
      </div>
    );
}

export default Chart;
```

And now we will have a line with the average numbers

![average number line](https://i.imgur.com/q0q9snL.png)

### Now lets show a numeric average underneath each chart
How will we get the average?
Easy just take the `props.data` that we already have and calculate an average from it

```
import _ from 'lodash';
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

function average(data) {
  return _.round(_.sum(data)/data.length));
}

const Chart = (props) => {
    return (
      <div>
        <Sparklines height={120} width={180} data={props.data}>
          <SparklinesLine color={props.color} />
          <SparklinesReferenceLine type="avg" />
        </Sparklines>
        <div>
          {average(props.data)}
        </div>
      </div>
    );
}

export default Chart;
```

* We use `lodash` to make our math job easier
* And we drop in our helper function `average()` and pass it our `props.data` to get the average

Now we have the average number below each chart

![average number below each chart](https://i.imgur.com/2xGGf1f.png)

## Now we need to add some units
We'll add in the units in our table headers

`WeatherList`

```
more code
  <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
more code
```

### Add units to each chart

`WeatherList`

```
more code
return (
      <tr key={name}>
        <td>{name}</td>
        <td><Chart data={temps} color="orange" units="K" /></td>
        <td><Chart data={pressures} color="red" units="hPa" /></td>
        <td><Chart data={humidities} color="blue" units="%" /></td>
      </tr>
    )
more code
```

### Now consume those units in the child Component
`Chart`

### Convert Kelvin to Fahrenheit
Import `lodash`

`WeatherList`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import _ from 'lodash'; // add this line
```

### Add [conversion formula](http://www.wikihow.com/Convert-Kelvin-to-Fahrenheit-or-Celsius)

`WeatherList`

```
renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => 1.8 * (temp - 273) + 32);
```






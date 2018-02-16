# Mapping props to render helper
We started putting together our `WeatherList` `Container`

* We put our table together
* And we hooked it up to our Redux `state` along with the **weather** `state`

![weather state](https://i.imgur.com/5PwIQjE.png)

We now have access to `this.props.weather` inside of `WeatherList`

## How can we build our list of rows now?
* One row will represent one city

### Reviewing our data structure response we are getting from our Weather API

`this.props.weather` contains an array of objects ([see here](https://i.imgur.com/yanKfFx.png))

Each object has a **city** and a **list**

Each **list** has an array of individual forecast snapshots

1[Redux state mockup](https://i.imgur.com/EjB184c.png)

* Our Redux `state` contains a single property `weather` (_which is an array_)
    - Inside that array are a bunch of objects
        + Each object has a **city** and a **list**

In order to build the rows of our table all we'll need to do it map over `this.props.weather`

* When we map over the `weather` array we'll get one city per row
* `weather.map()` will produce one row for each city

```
<tbody>
 {this.props.weather.map(this.renderWeather)}
</tbody>
```

```
renderWeather(cityData) {

}
```

This is what the `cityData` argument would contain

![cityData](https://i.imgur.com/o7ibXXG.png)

### Why are we using `cityData.city.name`?
This is why

![city.name](https://i.imgur.com/6qGSPCy.png)

### Test it out in the browser
Save and refresh

Type in any US city, press enter, and it should appear. Do these same steps for several cities and you should see each row of city appears. Also notice that even if you mildly misspell a city name, the correct spelling will appear in the search result

### Error because list needs unique key
Remember - Any time you render a list you need to provide React with a unique key so it can optimally render the DOM

**note** Rule for adding a key in a **React** list

* We add the `key` to the top-level element in the list
* And it just has to be some unique piece of data

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherList extends Component {
  renderWeather(cityData) {
    return (
      <tr key={cityData.city.id}>
        <td>{cityData.city.name}</td>
      </tr>
    )
  }
// more code
```

### Test in browser
Save and refresh. Enter a city and press enter. The error is gone. Yes!

If you use React Developer tools and search for the WeatherList Component, you will see what the key is outputting:

![key output](https://i.imgur.com/t58gp6M.png)

* I just used the unique `id` property found under city 

`<tr key={cityData.city.id}>`

### Same output but cleaner code
Instead of `id` we could just use the city name for both

```
renderWeather(cityData) {
    return (
      <tr key={cityData.city.name}>
        <td>{cityData.city.name}</td>
      </tr>
    )
  }
```

#### DRY
Don't Repeat Yourself - We'll create a variable

```
renderWeather(cityData) {
    const name = cityData.city.name;
    
    return (
      <tr key={name}>
        <td>{name}</td>
      </tr>
    )
  }
```

Now our code is cleaner and it works the same. Win-Win for everyone!

### Next Challenge
Sprucing our table up with Charts!

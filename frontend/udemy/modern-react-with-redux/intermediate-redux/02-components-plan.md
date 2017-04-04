# Plan for our Components
![wireframe of Components](https://i.imgur.com/DolzTpK.png)

* `App` - Overall Application Component
    - Take the `SeachBar` and `ForecastList` and render them onto page
    - The "glue Component" that ties everything together
* `SearchBar` Component
    - Responsible for showing `input` and `button`
    - Will also be responsible for calling an `Action Creator` in **Redux**
* `ForecastList` Component
    - Will be general overall table Component
    - Previously we had a list Component and a list item Component
    - Because this one is simpler we will combine the list Component and list item Component into a single Component
        + One Component that knows how to render the indivual table and each of the line items inside of it
* `Chart` Component
    - Have one single chart Component that we can pass our data to and it will give us a chart
        + We can use this Component across other projects if we want
        + Truly resuable Components

## Working on SearchBar
### Will this be a `Component` or `Container`
First question we always need to ask ourselves

The `SearchBar` needs to have the ability to modify the `state` of our Application by dispatching `actions`

* It needs the ability to call an `Action Creator`
* It needs to say, "_Hey, someone just entered a search term, we need to make an API request_"
* This means it needs to talk to **Redux** so we need to make it a `Container`
    - Because a `Container` has the ability to talk to **Redux** wheres a normal Component does not (_A normal Component just shows some content on the screen_)

### Create the `containers` directory `src/containers`

### Create the `SearchBar` `Container`
`src/containers/SearchBar.js`

`SearchBar`

```
import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <form className="input-group">
        <input type="text" />
      </form>
    );
  }
}

export default SearchBar;
```

### Add `SearchBar` to `App`
Inside the `components` directory, I rename `app.js` to `App.js`

* You will need to update the import statement in `src/index.js` to:

`import App from './components/App';`

```
import React, { Component } from 'react';
import SearchBar from '../containers/SearchBar';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default App;
```

### View in browser
Refresh and you'll see our `input` form element

#### Add a button
```
import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <form className="input-group">
        <input />
        <span className="input-group-btn">
          <button
            type="submit"
            className="btn btn-secondary">
              Search
          </button>
        </span>
      </form>
    );
  }
}

export default SearchBar;
```


# Refactoring functional Components
We will refactor `App` Component from a functional based Component to a class-based Component

We are doing this because we need our `App` Component to have state so it can keep track of the list of videos

## Steps in converting a functional Component into a class-based Component
This is where we are starting from:

```
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
const API_KEY = 'AIzaSyC9bJsdEJpmtGcBb_c7ck0NvOvyShMx47I';

YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
  console.log(data);
});

const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('.container'));
```

## Extend the Component
We need to pull off the `Component` property from React so we can create a class and extend that Component property

`import React, { Component } from 'react';`

And update this:

```
class App extends Component {
  return (
    <div>
      <SearchBar />
    </div>
  )
}
```

## Need to add a render() method
```
class App extends Component {
  return (
    <div>
      <SearchBar />
    </div>
  )
}
```

### Test in browser
No errors after refresh and you'll still see our Youtube videos from the console.log()

## Data will change over time
As the user changes the search, the videos will change and this means data will change over time which is a great case for using `state`

So whenever a user conducts a new search we need to update state with the new search results

## We need to set up our constructor() function
```
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}
```

* We always pass `constructor()` and `super()` the `props` argument

```
constructor(props) {
    super(props);

    this.state = { videos: [] };
  }
```

* We are going to set our `state` equal to at the start to an empty array for `videos`. Since we are going to have a bunch of videos, `videos` seems like an appropriate name. We will have an array of objects (which will be videos) so that is why we use the empty array to start with

## Do we want video data to be empty at the start of our app?
No. We should pre-populate our app with video data right from the start

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
const API_KEY = 'AIzaSyC9bJsdEJpmtGcBb_c7ck0NvOvyShMx47I';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { videos: [] };

    YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
      this.setState({ videos: data });
    });
  }
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
```

* We intialize our state and then we make an API call to Youtube and grab our 5 surf starter videos and then we `this.setState()` to be those 5 videos. This is done inside our constructor() method so it will happen as soon as we initialize our `App` Component

## Refactor from `function` keyword to `fat arrow function`

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
const API_KEY = 'AIzaSyC9bJsdEJpmtGcBb_c7ck0NvOvyShMx47I';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { videos: [] };

    YTSearch({key: API_KEY, term: 'surfboards'}, (data) => {
      this.setState({videos: data });
    });
  }
  
  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
```

## We can name the `data` object whatever we want so...
```
YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
  this.setState({videos: videos });
});
```

Which can be refactored in ES6 to this: (we can do this when the `key` and the `value` of an object are the same terms)

```
YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
  this.setState({videos });
});
```


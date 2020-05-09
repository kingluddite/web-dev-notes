# Refactoring functional Components
* We will refactor `App` Component from a **Functional based Component (FBC)** to a **class-based Component (CBC)**
  - FBC --> CBC

* We are doing this because we need our `App` Component to have `state` 
* So it can keep track of the list of videos
* You will do this often in React apps

## Steps in converting FBC --> CBC
* This is where we are starting from:

```
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/SearchBar';

const GOOGLE_API_KEY = '???';

YTSearch({ key: GOOGLE_API_KEY, term: 'soccer' }, data => {
  console.log(data);
});
// Create a new Component. This Component should produce some HTML
const App = function() {
  return (
    <div>
      <SearchBar />
    </div>
  );
};
// Take this Component's generated HTML and put it on the page (inside the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
```

* And this is what it looks like after the FBC is converted to a CBC

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
const API_KEY = '???';

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

## Let's analyze what we just did to convert into a CBC
### We need to set up our `constructor()` function
`App.js`

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

* We are going to set our `state` equal to at the start to an empty array for `videos`
* Since we are going to have a bunch of videos, `videos` sees like an appropriate name
* We will have an array of objects (which will be videos) so that is why we use the empty array to start with

## Do we want video data to be empty at the start of our app?
* No
* We should **pre-populate** our app with video data right from the start

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
const API_KEY = '???';

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

* We intialize our state and then we make an API call to Youtube and grab our 5 surf starter videos and then we `this.setState()` to be those 5 videos
* This is done inside our `constructor()` method so it will happen as soon as we initialize our `App` Component

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
```js
YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
  this.setState({videos: videos });
});
```

* Which can be refactored in ES6 to this:
* We can do this when the `key` and the `value` of an object are the same terms

```js
YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
  this.setState({videos });
});
```


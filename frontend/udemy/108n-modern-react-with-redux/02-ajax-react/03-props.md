# Props

`VideoList`

```
import React from 'react';

const VideoList = () => {
  return (
    <ul className="col-md-4 list-group">
    </ul>
  );
};

export default VideoList;
```

* Is a parent Component of VideoListItem and VideoDetail
* VideoList has no need for `state`
    + It doesn't record any user interaction
    + It doesn't rerender itself in any fashion

* This means we can make it a plain **functional Component**

## We are using Bootstrap 4
* It is imported inside our `index.html`

## Import into `App`
`index.js`

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList'; // add this line
const API_KEY = 'AIzaSyC9bJsdEJpmtGcBb_c7ck0NvOvyShMx47I';
```

## Add Component to `App`
```
// more code
render() {
    return (
      <div>
        <SearchBar />
        <VideoList />
      </div>
    );
  }
// more code
```

### View in browser
* Refresh and make sure there are not errors
* `App` is a parent of the `VideoList` Component
* `VideoList` needs to get access to the state of `videos` that is in `App`
* We pass our state of videos into `VideoList` by defining a `tag` inside the JSX Component and set it equal to `{this.state.videos}`

```
render() {
    return (
      <div>
        <SearchBar />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
```

### Passing props
* Passing data like this down to child Components is referred to as **passing props** in React
  - We are passing **prop** `videos` to the `VideoList` Component

**note** Anytime that `App` re-renders (like when we `setState()` on that Component), `VideoList` will get the new list of videos as well

* When we use a functional Component, the **props** object will arrive as an argument to the function
* So this:

```
const VideoList = () => {
  return (
    <ul className="col-md-4 list-group">
    </ul>
  );
};
```

* Becomes this (props is passed into the fat arrow function):

```
const VideoList = (props) => {
  return (
    <ul className="col-md-4 list-group">
     {props.videos.length}
    </ul>
  );
};
```

## View in browser
* You will see the input and underneath it the number `5`

## Why do we briefly see `0` and then `5`?
* We start our app as an empty state but then we make a network request to the youtube API
* This is not an instantaneous request so that is why we see `0` (length of array is `0`)
    - And then our Youtube API request response comes back
    - And then the number changes to `5`

## `props` in functional Components vs class-based Components
* In a functional Component, the `props` object is an argument
* In a class-based Component, `props` are available anywhere in any method we define as `this.props`

`App`

```
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { videos: [] };

    YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
      this.setState({ videos });
    });
  }

  render() {
    this.props; // we could use this if we wanted to
    
    return (
      <div>
        <SearchBar />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}
```

**important** If you ever update your functional Component to a class-based Component, you must remember to update your `props` to `this.props`


# Fetching data from an API
## And async await

## [themoviedb.org](https://www.themoviedb.org/login)
* Sign up for an account
* Verify the email they send
* Go to profile settings > fill it out to get an API
    - be ready to use it later

## Go to developer docs
* [dev docs here](https://developers.themoviedb.org/3/getting-started/introduction)
    - Click to discover movies [link to discover movies](https://developers.themoviedb.org/3/discover/movie-discover)
        + Scroll down and click `Try it out` tab
            * It will ask you to enter your API key
            * Scroll down to bottom of page and click `Send Request`
            * If all goes well you should see a JSON object with a bunch of movies
            * You will see on the right of the button you clicked a long URL. Copy that URL to your clipboard
                - This is what will return this JSON object of movies

something like:

`https://api.themoviedb.org/3/discover/movie?api_key=6bsseef87158ec0aba138db3ce714fbdd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

* Paste that URL inside your fetch like this:

`App.js`

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Movie from './Movie';

const movies = [
  {
    id: 1,
    title: 'Star Wars',
    desc: 'Galaxy far, far away',
  },
  {
    id: 2,
    title: 'Spider Man',
  },
  {
    id: 3,
    title: 'Karate Kid',
  },
];

class App extends Component {
  async componentDidMount() {
    try {
      const res = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=6bed0f87158ec0aba138db3ce714fbdd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
      );
      const movies = await res.json();
      console.log(movies);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} desc={movie.desc} />
        ))}
      </div>
    );
  }
}

export default App;
```

* If you view that the console will show you a ton of movies have been returned!

## Use React Dev tools to see the state is holding your movies
* But if you tried to render the state to your component like:

```
// MORE CODE
render() {
  console.log(this.state.movies);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
// MORE CODE
```

* You will get an error like "Cannot read property movies of null"
* To fix this error you need to set a default state

```
// MORE CODE
class App extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {

// MORE CODE
```

That fixes the error
* You should see an empty array
* and then when the data arrives it populates our state with it

## Show live data from an API

`App.js`

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Movie from './Movie';

class App extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=6bed0f87158ec0aba138db3ce714fbdd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
      );
      const movies = await res.json();
      console.log(movies);
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </div>
    );
  }
}

export default App;
```

`Movie.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Movie extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  };

  render() {
    return (
      <div>
        <h3>{this.props.movie.title}</h3>
      </div>
    );
  }
}
```


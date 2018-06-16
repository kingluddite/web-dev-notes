# React Router
`Movie.js`


```
import React from 'react';
import PropTypes from 'prop-types';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <div>
    <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
  </div>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
```

## Add our first route

`App.js`

```
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
        'https://api.themoviedb.org/3/discover/movie?api_key=6bed0f87158ec0aba138db3ce714fbdd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
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
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Route path="/test" component={Test} />
          {this.state.movies.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;

const Test = () => <h1>Test</h1>;
```

* visite `/test` to see the route in action

## Link to 2 pages

`Movie.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <div>
    <Link to="/test">
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    </Link>
  </div>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
```

`App.js`

```
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import MoviesList from './MoviesList';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/test" component={Test} />
      </Switch>
    </div>
  </Router>
);

export default App;

const Test = () => <h1>Test</h1>;
```

## Add dynamic params
* Will link to an id of a movie

`Movie.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <div>
    <Link to={`/${movie.id}`}>
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    </Link>
  </div>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
```

* **match** - This is where `params` are stored inside React Router

`App.js`

```
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import MoviesList from './MoviesList';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/:id" component={Test} />
      </Switch>
    </div>
  </Router>
);

export default App;

const Test = ({ match }) => <h1>{match.params.id}</h1>;
```



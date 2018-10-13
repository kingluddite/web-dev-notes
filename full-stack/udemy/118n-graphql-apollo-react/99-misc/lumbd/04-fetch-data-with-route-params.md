# Fetching Data with Route Params
* Create `MovieDetail.js` (Just copy and paste from MoviesList.js and change where appropriate)

`MovieDetails.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

require('dotenv').config();

class MovieDetail extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  };

  static defaultProps = {
    movie: {},
  };

  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const apiMovie =
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_PROD_MYDB_API
          : process.env.REACT_APP_DEV_MYDB_API;
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiMovie}`);
      const movies = await res.json();
      this.setState({ movies: movies.results });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}
export default MovieDetail;
```

* Update `App.js`

```
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.css';

// custom components
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <h1 className="App-title">Movies</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/" exact component={MoviesList} />
            <Route path="/:id" exact component={MovieDetail} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
```

* How do we output a single movie (instead of an array of 20 movies)

### Change the URI of the API we are using
* From this
    - `https://api.themoviedb.org/3/discover/movie`
* To this
    - `https://api.themoviedb.org/3/movie/`

* We now are looking for 1 movie, the details of the movie and that is why we call this page `MovieDetail`
* We change our variable from `movies` to `movie` because it is only holding 1 movie
* We set our state to that one movie
* Our **default** `state` of `movie` will be an object `{}` and no longer an array `[]`
* Use React Dev tools to see we have access to the single movie in our state of MovieDetail
* Change to the home page and use React Dev Tools to view the state of MoviesList and you'll see we have an array of movies

### Show movie data in our MovieDetail UI
* **note** `this.setState(movie)` vs `this.setState({movie})`
    - This is a small but major bug
    - If you don't put movie inside an object, your movie data will be in the root of the `state` and not be inside the property `movie`
    - I spent 30 minutes trying to figure out that bug

## Eslint destructuring must match state or props assignement
`MovieDetail.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('dotenv').config();

class MovieDetail extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      vote_average: PropTypes.number,
    }),
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = {
    movie: {},
  };

  state = {
    movie: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const apiMovie =
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_PROD_MYDB_API
          : process.env.REACT_APP_DEV_MYDB_API;
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${apiMovie}`
      );
      const movie = await res.json();
      this.setState({ movie });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <div>
        <h1>{movie.title}</h1>
      </div>
    );
  }
}
export default MovieDetail;
```

## Add more content
`MovieDetail.js`

```
// MORE CODE

render() {
  const { movie } = this.state;
  return (
    <div>
      <h1>{movie.title}</h1>
      <h2>{movie.release_date}</h2>
      <p>{movie.overview}</p>
    </div>
  );
}

// MORE CODE
```

## Constant variables
* Define them outside the class like this:

`Movie.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

class Movie extends Component {
  static propTypes = {
    movie: PropTypes.object,
  };

  static defaultProps = {
    movie: [],
  };

  render() {
    // console.log()
    const { movie } = this.props;
    return (
      <div>
        <Link to={`/${movie.id}`}>
          <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        </Link>
      </div>
    );
  }
}

export default Movie;
```

## Copy code
* We have a poster in a previous component
* We'll copy and share it
* Movie.js uses props and MovieDetail.js uses state but they both use the variable `movie` so we can use our same code and it doesn't matter whether we are pulling data from state or props the same `movie` variable can work for both

`MovieDetail.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('dotenv').config();

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

class MovieDetail extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      vote_average: PropTypes.number,
    }),
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = {
    movie: {},
  };

  state = {
    movie: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const apiMovie =
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_PROD_MYDB_API
          : process.env.REACT_APP_DEV_MYDB_API;
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${apiMovie}`
      );
      const movie = await res.json();
      this.setState({ movie });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <div>
        <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <h2>{movie.release_date}</h2>
        <p>{movie.overview}</p>
      </div>
    );
  }
}
export default MovieDetail;
```

* Now we have the image working on the `Movie.js` component as well as the `MovieDetail.js` component

## Make backdrop path
* One large image and one small image

`MovieDetail.js`

```
// MORE CODE

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {

// MORE CODE

  render() {
    const { movie } = this.state;
    return (
      <div>
        <img src={`${BACKDROP_PATH}${movie.backdrop_path}`} alt={movie.title} />
        <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <h2>{movie.release_date}</h2>
        <p>{movie.overview}</p>
      </div>
    );
  }
}
export default MovieDetail;
```

* Now one large image on top and a smaller image below it
* We used the movie API to find out the width of the larger images

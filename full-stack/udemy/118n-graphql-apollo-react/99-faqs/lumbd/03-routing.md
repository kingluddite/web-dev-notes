# Routing
* MyDB expects a root path
    - View path in React Dev Tools
    - You only see a `/nameoffile.jpg`
    - It is missing stuff
        + This is because they offer choices on how to transform each movie
        + [image docs](https://developers.themoviedb.org/3/getting-started/images)
        + You'll need 3 pieces of data
        + Those pieces are a `base_url`, a `file_size` and a `file_path`
        + Here's what a full image URL looks like if the poster_path of `/kqjL17yufvn9OVLyXYpvtyrFfak.jpg` was returned for a movie, and you were looking for the w500 size:

`https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg`

`App.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Movie extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  };

  static defaultProps = {
    movie: {},
  };

  render() {
    // console.log()
    const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
    const { title, poster_path } = this.props.movie;
    return (
      <div>
        <img src={`${POSTER_PATH}${poster_path}`} alt={title} />
      </div>
    );
  }
}

export default Movie;
```

### Install react-router-dom
`$ npm i react-router-dom`

`App.js`

```
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.css';

// custom components
import MoviesList from './MoviesList';

const Test = ({ match }) => <h1>{match.params.id}</h1>;

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
            <Route path="/:id" exact component={Test} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

```

`MoviesList.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

require('dotenv').config();

class MoviesList extends Component {
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
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}
export default MoviesList;
```

`Movie.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
  render() {
    // console.log()
    const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
    const { id, title, poster_path } = this.props.movie;
    return (
      <div>
        <Link to={`/${id}`}>
          <img src={`${POSTER_PATH}${poster_path}`} alt={title} />
        </Link>
      </div>
    );
  }
}

export default Movie;
```

* You pull in images of movie
* Link back to home anytime on logo
* click on movie images and you are taken to the id of that movie using `match.params.id`

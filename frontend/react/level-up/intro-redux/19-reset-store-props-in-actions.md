# Resetting Our store and props in actions
* Open MovieDetail
    - We need to hit the API again and pull a single movie
        + It grabs a prop from the URL the params.id and fits the API with that `id`
    - This is different from before. It needs to accept a prop from the React Router and then this prop needs to go into an action (or more appropriately a "thunk"), hit the API, return that particular movie, store in our redux store as an individual movie
    - Then we need to output it like we did before

`movies/reducer.js`

```
import { GET_MOVIES, GET_MOVIE } from './actions';

const initialState = {
  movies: [],
  moviesLoaded: false,
  movie: {},
  movieLoaded: false,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: data,
        moviesLoaded: true,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: data,
        movieLoaded: true,
      };
    default:
      return state;
  }
}
```

* We initially set movie to an empty object
* We initially set that the movie has not loaded `movieLoaded: false`
* We create a case for GET_MOVIE and do the singular of what we did for GET_MOVIES
    - We `import { GET_MOVIES, GET_MOVIE } from './actions';` **GET_MOVIE** to help reduce code bugs (we'll add that to actions now)

`movies/actions.js`

```
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';

// MORE CODE

export function getMovie(id) {
  return async function (dispatch) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6bed0f87158ec0aba138db3ce714fbdd&language=en-US`,
    );
    const movie = await res.json();
    return dispatch({
      type: 'GET_MOVIE',
      data: movie,
    });
  };
}
```


`MovieDetail`

```
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Poster } from './Movie';
import { getMovie } from './actions';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  componentDidMount() {
    const { getMovie, match } = this.props;
    getMovie(match.params.id);
  }

  render() {
    const { movie } = this.props;
    if (!movie.id) return null;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={`${movie.id}`}>
            <Poster
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movies.movie,
  isLoaded: state.movies.movieLoaded,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMovie,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
```

* We will need to pass the id to our getMovie
* We use `match` from this.props.match and pass it like this `getMovie(match.params.id)`
    - getMovie is dispatching a `thunk`
    - the thunk is defined inside our actions file
    - and getMovie will accept the id
    - Then it hits the API with that id
    - gets the JSON
    - then it dispatches and action GET_MOVIE with our data (which is our movie)
    - that heads to our reducer where is hits GET_MOVIE
    - loads the movie into our redux state
    - sets the movieLoaded to true
    - then in MovieDetail it will bring in our movie as movie from mapStateToProps
    - we also change this.state to this.props
    - and the app should be working
    - use redux dev tools and you'll see our movies array and movie and movieLoaded
        + when we browsed to one movie we didn't have to do an API call to load all our movies (but if you go to home page it will know loadMovies is false and then load them with that API call)

## Small bug
* when we click on a movie and then click on another movie we get a brief toggle of the previous movie
* Why?
    - When we arrive on the new movie, the componentDidMount did not fire
    - the movie loads once then runs componentDidMount, then grabbing new movie, then rerendering, we need to stop this from flashing the old movie

## Fix - Reset your store

`movies/actions.js`

```
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIE = 'GET_MOVIE';
export const RESET_MOVIE = 'RESET_MOVIE';

// MORE CODE

export function resetMovie() {
  return {
    type: 'RESET_MOVIE',
  };
}
```

`reducer.js`

```
import { GET_MOVIES, GET_MOVIE, RESET_MOVIE } from './actions';

const initialState = {
  movies: [],
  moviesLoaded: false,
  movie: {},
  movieLoaded: false,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: data,
        moviesLoaded: true,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: data,
        movieLoaded: true,
      };
    case RESET_MOVIE:
      return {
        ...state,
        movie: {},
        movieLoaded: false,
      };
    default:
      return state;
  }
}
```

`MovieDetail.js`

```
// MORE CODE
import { Poster } from './Movie';
import { getMovie, resetMovie } from './actions';

// MORE CODE

class MovieDetail extends Component {
  componentDidMount() {
    const { getMovie, match } = this.props;
    getMovie(match.params.id);
  }

  // add this LifeCycle
  componentWillUnmount() {
    const { resetMovie } = this.props;
    resetMovie();
  }

  render() {
    // MORE CODE

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMovie,
      resetMovie,
    },
    dispatch,
  );

// MORE CODE
```

Now you can test redux tools and see that you click a movie and movieLoaded is true but if you click a home page, movieLoaded is false


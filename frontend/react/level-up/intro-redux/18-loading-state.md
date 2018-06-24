# Loading state
* How can we stop the API getting hit every time we visit the home page even though all our movies have been loaded

## We will set up a loading state
* That will determine if our data has already been loaded

`movies/reducer.js`

```
import { GET_MOVIES } from './actions';

const initialState = {
  movies: [],
  moviesLoaded: false,
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
    default:
      return state;
  }
}
```

* We add a default moviesLoaded state of false
* And once the movie are loaded we set moviesLoaded to true

`MoviesList.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Movie from './Movie';
import { getMovies } from './actions';

class MoviesList extends PureComponent {
  componentDidMount() {
    const { getMovies, isLoaded } = this.props;
    if (!isLoaded) {
      getMovies();
    }
  }

  render() {
    const { movies, isLoaded } = this.props;
    if (!isLoaded) return <h1>Loading...</h1>;
    return (
      <MovieGrid>
        {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  isLoaded: state.movies.moviesLoaded,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMovies,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
```

* We add this to our mapStateToProps

`MoviesList.js`

```
// MORE CODE
const mapStateToProps = state => ({
  movies: state.movies.movies,
  isLoaded: state.movies.moviesLoaded,
});
// MORE CODE
```

* We render "loading" if our movies are loading

```
render() {
  const { movies, isLoaded } = this.props;
  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <MovieGrid>
      {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
    </MovieGrid>
  );
}
```

* We use logic to only call getMovies to load our movies if `!isLoaded` is true
* Now only API hits if movies were not loaded
* Use Redux tools to see that the GET_MOVIES action only is called once

## Next
* Doing same thing for `MovieDatail.js`

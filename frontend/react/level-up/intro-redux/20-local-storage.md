# Local Storage
* we load a movie in detail page
* refresh and movie is gone in state

`$ npm i redux-localstorage-simple`

`App.js`

```
// MORE CODE
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';
import rootReducer from './rootReducer';
// MORE CODE
```

save - will save to localstorage
load - will load from localstorage

`App.js`

```
// MORE CODE
const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(...middleware, save())),
);
// MORE CODE
```

* now do what we did at the beginning and you'll see the movies is stored in local storage
* but now we'll never hit the API again so we'll never get new movies...
* view localstorage in Application of dev chrome tools

![redux_localstorage_simple](https://i.imgur.com/gpNGPG8.png)

clear local storage in application
refresh and click on movie

![moviesLoadedAt](https://i.imgur.com/BJToW5o.png)

`App.js`

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
    const { movies, isLoaded, moviesLoadedAt } = this.props;
    const oneHour = 60 * 60 * 1000;
    // console.log(new Date() - new Date(moviesLoadedAt));
    if (!isLoaded || new Date() - new Date(moviesLoadedAt) > oneHour) {
      getMovies();
    }

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
  moviesLoadedAt: state.movies.moviesLoadedAt,
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

## Resources
* https://redux.js.org/
* https://github.com/xgrommx/awesome-redux

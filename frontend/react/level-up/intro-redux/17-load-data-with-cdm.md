# Load data with componentDidMount LifeCycle
* We will transform our componentDidMount() with async await into a redux version of the same thing
* How can we pull in data from redux rather than componentDidMount?
    - Why?
    - So we can keep our data that is displayed up to date with our store

## We use Toggle as a way to copy and paste a lot of resuable code
`MovieList.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Movie from './Movie';

class MoviesList extends PureComponent {
  componentDidMount() {}

  render() {
    const { movies } = this.props;
    return (
      <MovieGrid>
        {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
```

* Now our movies do not appear automatically in our app
* But when we click the `Load Movies` button they load in

## Review
* We import `connect` and `bindActionCreators` from our redux modules
* We use connect inside our default export and pass it mapStateToProps, which will use our state to grab all our movies
* We use destructuring inside our MoviesList component so we can type less code (type `movies.map` instead of `this.props.movies.map`)
* We thin out a lot of our MoviesList component

`Toggle.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMessage } from './actions';

const Toggle = ({ messageVisibility, toggleMessage }) => (
  <div>
    {messageVisibility && <p>You will be seeing this</p>}
    <button onClick={toggleMessage}>Toggle Me</button>
  </div>
);

const mapStateToProps = state => ({
  messageVisibility: state.toggle.messageVisibility,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMessage,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
```

* We strip it of all things movie related

## Summary
1. We import getMovies from our actions file
2. we then map it to a prop by using (using bindActionCreators and storing it inside mapDispatchToProps)
3. We then pass mapDispatchToProps to our connect() higher order component which will set mapDispatchToProps to this.props.getMovies

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
    const { getMovies } = this.props;
    getMovies();
  }

  render() {
    const { movies } = this.props;
    return (
      <MovieGrid>
        {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
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

`Toggle.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMessage } from './actions';

const Toggle = ({ messageVisibility, toggleMessage }) => (
  <div>
    {messageVisibility && <p>You will be seeing this</p>}
    <button onClick={toggleMessage}>Toggle Me</button>
  </div>
);

const mapStateToProps = state => ({
  messageVisibility: state.toggle.messageVisibility,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMessage,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
```

* Now we structured our app to use redux to load our movies everytime we visit the home page

## Next - Make app more efficient
* Making API calls on every home page visit is not efficient
* We can do better and next notes page, we will

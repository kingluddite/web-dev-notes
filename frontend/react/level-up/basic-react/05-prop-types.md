# Prop Types
`$ npm i prop-types`

## Rules for prop types
1. You should have a prop type for every single prop that is used in your component
2. You must use `isRequired` or a `defaultProp`

### Why are these rules important?
* You will be alerted every single time that things in your app are not as they should be
* It will save you time and effort to debug your app
* Following these rules will make your components absolutely **Bullet Proof** in terms of what is coming in and what is going out
    - People who will hire you will look for these things in your code
    - We will set a linter up to complain if it is missing

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

`Movie.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Movie extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    desc: PropTypes.string,
  };

  static defaultProps = {
    desc: 'Description not available',
  };

  render() {
    return (
      <div>
        <h3>{this.props.movie.title}</h3>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}
```

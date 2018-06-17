# Stateless Functional Components
* Use anytime you are not using state, refs or Life Cycle Methods
* Linter will tell you this

## Convert class based (CBC) component to stateless functional component (SFC)

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

* Move static props to bottom and comment out
    - Can only be used inside a class
* Not a class so no access to a render() method (we remove it)
* We remove the default export
* You can not do this

`export default const Movie = props => (...`

* Why not?
    - You can not have a default export in a function definition (Not a react rule.. a JavaScript rule)


`Movie.js` (now as a SFC)

```
import React from 'react';
import PropTypes from 'prop-types';

const Movie = props => (
  <div>
    <h3>{props.movie.title}</h3>
  </div>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
```


## Refactor using ES6 destructuring

```
import React from 'react';
import PropTypes from 'prop-types';

const Movie = ({ movie }) => (
  <div>
    <h3>{movie.title}</h3>
  </div>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
```


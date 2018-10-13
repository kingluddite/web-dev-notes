# Styled Components
## Install styled-components
`$ npm i styled-components`

`MoviesList.js`

```
import React, { Component } from 'react';
import styled from 'styled-components'; // add this line

// MORE CODE

class MoviesList extends Component {

// MORE CODE

  render() {
    const { movies } = this.state;
    return (
      <MovieGrid>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    );
  }
}
export default MoviesList;

const MovieGrid = styled.div`
  background: red;
`;
```

* View the MoviesList and you will see style components working and adding a red background

## Use CSS grid
`MoviesList.js`

```
// MORE CODE
k
```

* View that and look how cool it is!

## Inspect a movie with chrome console
* click on the div and you'll see the long string name styled components gave us
    - This prevents css inheritance collisions because each name is unqiue
    - BEM also did this but you had to come up with all those names and remember them, styled components does all that work for you
    - Change `grid-template-columns: repeat(6, 1fr) to repeat(3,1fr)
    - That's how easy it is to change your grid

## Style our image
`Movie.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'; /add this line

// MORE CODE

  render() {
    // console.log()
    const { movie } = this.props;
    return (
      <Link to={`/${movie.id}`}>
        <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      </Link>
    );
  }
}

export default Movie;

const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;
```

* Now we have a styled background

## Change global styles
`index.css`

```
body {
  background-color: #000; /* add this line */
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
```

`App.css`

```
.App-header {
  background-color: #111;
  height: 60px;
  padding: 20px;
  color: white;
}
```

## Put styled compoents in their own file
* You can also export them

`Movie.js`

```
// MORE CODE

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;
```

* Remember when we import it, it is now the default export so that means it is a named export and when you import it you'll need to use this syntax `import { Poster } from 'Movie'`

`MovieDetail.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styles
import { Poster } from './Movie';

// MORE CODE

class MovieDetail extends Component {

// MORE CODE

  render() {
    const { movie } = this.state;
    return (
      <div>
        <img src={`${BACKDROP_PATH}${movie.backdrop_path}`} alt={movie.title} />
        <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <h2>{movie.release_date}</h2>
        <p>{movie.overview}</p>
      </div>
    );
  }
}
export default MovieDetail;
```

* Notice we did not have to import `styled-component` as it was used in the file we imported our Styled components from `Movie.js`

## Question
* Why are the URLs giving GET errors? But yet the images load

![get errors from movies](https://i.imgur.com/RUxYDEK.png)

## Pass data into React using props
```
// MORE CODE

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <h2>{movie.release_date}</h2>
        <p>{movie.overview}</p>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props.backdrop}) no-repeat;
  background-size: cover;
`;
```

* But that won't work
* To pass props into a styled component you need to use an arrow function
* So change it to this and it will work:

```
// MORE CODE
const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;
```

* View in browser and it works as it did before

## Add MovieInfo Styled Component wrapper

`MovieDetail.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styles
import { Poster } from './Movie';

require('dotenv').config();

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

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
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <div>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
            <h1>{movie.title}</h1>
            <h2>{movie.release_date}</h2>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

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

* Notice the nested elements
* We have no fear of css naming collisions to we can use generic `div` and `img`

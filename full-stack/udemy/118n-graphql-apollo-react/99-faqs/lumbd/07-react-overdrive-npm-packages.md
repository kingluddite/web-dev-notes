# React Overdrive
## Install react-overdrive
`$ npm i react-overdrive`

`MoviesList.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiMovie}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      );
      const movies = await res.json();
      this.setState({ movies: movies.results });
    } catch (error) {
      console.log(error);
    }
  }

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
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
```

`Movie.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
class Movie extends Component {
  static propTypes = {
    movie: PropTypes.object,
  };

  static defaultProps = {
    movie: {},
  };

  render() {
    const { movie } = this.props;

    return (
      <div>
        <div style={{ color: '#fff' }}>hello from Movie.js</div>
        {this.props &&
          movie && (
            <Overdrive id={movie.poster_path}>
              <Link to={`/${movie.id}`}>
                <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
              </Link>
            </Overdrive>
          )}
      </div>
    );
  }
}

export default Movie;

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;
```

`MovieDetail.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

// styles
import { Poster } from './Movie';

// api keys hidden
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
      <div>
        <div style={{ color: '#fff' }}>welcome</div>
        {this.state &&
          movie &&
          movie.poster_path !== undefined && (
            <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
              <MovieInfo>
                <Overdrive id={movie.poster_path}>
                  <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                </Overdrive>
                <div>
                  <h1>{movie.title}</h1>
                  <h2>{movie.release_date}</h2>
                  <p>{movie.overview}</p>
                </div>
              </MovieInfo>
            </MovieWrapper>
          )}
      </div>
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

## Pure Components
`MoviesList.js`

```
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Movie from './Movie';

require('dotenv').config();

class MoviesList extends PureComponent {

// MORE CODE

```

* Use if you know an component won't change a lot
* It helps speed up your app
* But use it cautiously because if you use it wrong stuff you want to update will not



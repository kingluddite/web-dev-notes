# Fetching data using router params
`MovieDetail.js`

```
import React, { Component } from 'react';

import Movie from './Movie';

class MovieDetail extends Component {
  state = {
    movies: {},
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=6bed0f87158ec0aba138db3ce714fbdd&language=en-US`,
      );
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div>
        <h1 />
      </div>
    );
  }
}

export default MovieDetail;
```

* Check React Dev tools and you'll see an object filled with a movie

`MovieDetail.js`

```
import React, { Component } from 'react';

import Movie from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=6bed0f87158ec0aba138db3ce714fbdd&language=en-US`,
      );
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;

    return (
      <div>
        <img src={`${POSTER_PATH}${movie.backdrop_path}`} alt={movie.title} />
        <img src={`${BACKDROP_PATH}${movie.poster_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <h2>{movie.release_date}</h2>
        <p>{movie.overview}</p>
      </div>
    );
  }
}

export default MovieDetail;
```

1. We start at App.js
2. We have 2 paths
3. The id comes in from the Route path `path=/:id` (which actually comes in from the movie itself when we link it)
4. That takes us to MovieDetail
5. MovieDetail doesn't care about the path
6. But in ComponentDidMount we hit the API with the parameter id, telling the API telling the API to give us this specific individual movie
7. We then use that data by setting it to the state of the movie
8. And we use movie in the render of MovieDetail

Summary
1. Pass in a parameter
2. Parameter hits the API
3. The API gets us the data
4. We output the data

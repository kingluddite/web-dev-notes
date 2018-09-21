# Mocking Fetch
* We'll write tests for the MovieDetail page
`MovieDetail.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=hi&language=en-US`);
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
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={`${movie.id}`}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
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

* We are using async componentDidMount to fetch from a real API
* This will be the tough part of this test
* Make our test file `MovieDetail.test.js`

`MovieDetail.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';

// custom components
import MovieDetail from './MovieDetail';

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

test('<MovieDetail />', () => {
  const { debug } = render(<MovieDetail />);
  debug();
});
```

* We have lots of errors
    - `Cannot read property params of undefined`
    - In our MovieDetail we use this `this.props.match.params.id` to get the `id` of the API call
    - We will test the id and give it fake numbers

```
// MORE CODE

const match = {
  params: {
    id: 'asdfkasjf;',
  },
};

console.error = jest.fn();

test('<MovieDetail />', () => {
  const { debug } = render(<MovieDetail match={match} />);
  debug();
});
```

* Our tests all pass
* We see our debug DOM output
* It passes because we created a params value and passed it to our `MovieDetail` component
* But scroll down and we have a `network request error`

## Why is it failing?
* You don't want to hit a real API for your tests
* That introduces a 3rd component where we have to do a HTTP request
* They take time and we don't want to wait for Network requests to complete when testing
    - We also don't want to use up our data limits for that API

## Mocking global components is easy
* We can do `global.fetch` and mock the results of fetch
* fetch has more going on then your average function
* And has more going on than your average function that returns a Promise
    - We can return a Promise from a mocked function no problem
* The big deal is we want is an actual JSON result from our fetch query

### Install jest-fetch-mock
* Will be a package that will take care of mocking all of our fetch calls
* And will do so expertly

`$ yarn i jest-fetch-mock`

* **tip** Click `+` button in VS Code to open a new terminal window so you can install `jest-fetch-mock`

#### Replace our global fetch with our fancy mock fetch
* We will add this to MovieDetail.test.js

```
global.fetch = require('jest-fetch-mock');
```

* This will set `fetch` globally for our entire test suite to be equal to `jest-fetch-mock`

## Tests all pass but we get a Syntax Error
`SyntaxError: Unexpected end of JSON input`

* That means our fetch is officially fake
* But we need to return some real data from it

## Let's mock the response - fetch.mockResponseOnce

`MovieDetail.test.js`

```
// MORE CODE

test('<MovieDetail />', () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      movie: {
        id: '123',
        title: 'I love mock responses',
      },
    }),
  );
  const { debug } = render(<MovieDetail match={match} />);
  debug();
});
```

* Test and our error goes away

## Houston we have a problem
* We have no errors
* Our tests all pass
* But the `h1` doesn't have our `title`
    - It's totally blank!

![debug dom](https://i.imgur.com/GuOrdi6.png)

## Why no data?
* It still takes time
* We are mocking it yes but it is still an async function
* So on initial render() it just renders that information than our API goes out and does the rerender
* Problem: we don't have a means of finding out when this re-renders

## Tip - Setup globals for your entire project
* Using `Setup framework script file`
* This will allow something to run pre all your tests

## Troubleshoot `TypeError: environment.teardown`
* In case you run into an error with jest try this solution
* After installing `jest-fetch-mock` my app broke
* [error on jest github](https://github.com/facebook/jest/issues/6393)

### Solution
1. Delete `package-lock.json`, `yarn.lock`, `node_modules`
2. Removing `jest` from the dependencies in `package.json`, 
3. Then doing `$ npm install` and `$ yarn install`

## Next - waitOnElement
* Waiting for something to appear on screen
* We will have this thing where we say let's wait for this thing to show up and we don't have to wait for anything or care about the code or the return of a promise
* All we care about is if this stuff shows up on screen



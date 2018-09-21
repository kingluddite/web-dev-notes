# Testing Loading States & More Pitfalls
## MoviesList.js
* Complex
* Hits an API
* It waits for data
* It renders things
* And it renders a sub component
* That subcomponent will use that real data

## Create `MoviesList.test.js`
* Copy all of `MovieDetail.test.js` and paste into `MoviesList.test.js`

`MoviesList.test.js`

```
import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';

// custom components
import MovieDetail from '../MovieDetail';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

const match = {
  params: {
    id: 'asdfkasjf;',
  },
};

console.error = jest.fn();

const movie = {
  id: '123',
  title: 'I love mock responses',
  release_date: '1/1/2019',
  overview: 'very good!',
};

test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));
  const { getByTestId } = render(<MovieDetail match={match} />);

  await waitForElement(() => getByTestId('movie-title'));
  await waitForElement(() => getByTestId('movie-date'));
  await waitForElement(() => getByTestId('movie-overview'));

  expect(getByTestId('movie-title').textContent).toBe(movie.title);
  expect(getByTestId('movie-date').textContent).toBe(movie.release_date);
  expect(getByTestId('movie-overview').textContent).toBe(movie.overview);
});
```

* Command find in VS Code and replace all `MovieDetail` with `MoviesList`
* We are not using `match` so we can get rid of it
    - Delete the 2 places it is created and where it is passed into `<MoviesList />`

## Add in debug
```
// MORE CODE

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));
  const { getByTestId, debug } = render(<MoviesList />);
  debug();

// MORE CODE
```

* We can comment out all our calls to `getByTestId` as that id doesn't exist in `MoviesList.js`

## Add a console.log()
* We need to see what data we are getting

`MoviesList.js`

```
// MORE CODE

const movies = await res.json();
console.log(movies); // add this log
this.setState({
  movies: movies.results,
});

// MORE CODE
```

* Our test shows us this is the object we are getting back
* Also know that we are getting `movies.results`
    - So this is a results array inside of our object
    - We'll need to mock that up

```
{ 
    id: '123',
    title: 'I love mock responses',
    release_date: '1/1/2019',
    overview: 'very good!' 
}
```

* But we need an array of data
* Because we need a list of movies
* Here is what a mock up of our data structure that we'll need

`MoviesList.test.js`

```
// MORE CODE

const movies = {
  results: [
    {
      id: '123',
      title: 'I love mock responses',
      poster_path: 'something.jpg', // we bring this in
      release_date: '1/1/2019',
      overview: 'very good!',
    },
  ],
};

test('<MoviesList />', async () => {

// MORE CODE
```

## Take it for a test drive
* Now we can see that we have the structure we want

![we have our results array](https://i.imgur.com/ASPFXZh.png)

## What should we wait for to show up on screen?
* It should be things we know are going to show up after the data comes in
    - These things might be more obvious in the `Movie` component
    - The things we tested for in `Movie.test.js`
        + We tested if `movie-link` had a certain attribute
        + We tested to make sure there wasn't an error

```
// MORE CODE

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId, debug } = render(<MoviesList />);
  debug();
  await waitForElement(() => getByTestId('movie-link'));
});

// MORE CODE
```

* Our test fails
* It can't find it - `Unable to find an element by: [data-testid="movie-link"]`
* We get a ton of error messages but we've seen this before with `You should not use <Link> outside of <Router>`
* Import `MemoryRouter`

```
// MORE CODE

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId, debug } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  debug();
  await waitForElement(() => getByTestId('movie-link'));
});

// MORE CODE
```

## Another common pitfall
* Our code is working but we hit another snag because debug isn't showing us the correct DOM output
* We just need to move our debug AFTER our await call

```
// MORE CODE

  <MemoryRouter>
    <MoviesList />
  </MemoryRouter>,
);

await waitForElement(() => getByTestId('movie-link'));
debug(); // we moved this after our await!

// MORE CODE
```

## Test
* Now it works!

### Time to talk about Loading state
* We are output an array of movies here:

`MoviesList.js`

```
// MORE CODE

render() {
  return (
    <MovieGrid>
      {this.state.movies.map(movie => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </MovieGrid>
  );
}

```

* We never check if the movies have loaded

`MoviesList.js`

```
// MORE CODE

render() {
    const { movies } = this.state;
    if (movies.length < 1) return <div data-testid="loading">Loading...</div>;
    return (
      <MovieGrid>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    );
  }

// MORE CODE
```

* VS Code and eslint fire errors when you don't destructure so we destructured `movies` from state which removes the red sqiggly line errors and makes our code more readable
* Very nice to add a `data-testid="loading"` so we can test for it's existance
* Then in our test before our data loads we expect our `loading` element to exist

`MoviesList.test.js`

```
// MORE CODE

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  debug();
});
```

* Run the test
* It will pass
* Even though we don't see it on the screen we can trust that it is working
    - The point to remember here is you don't have to spend time in the browser to understand how your stuff works

## But test after data loads
* Our loading `div` should not exist so let's test for that

```
// MORE CODE

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  expect(getByTestId('loading')).toBeTruthy();
  debug();
});
```

* That fails the test because it is not finding our loading div after the data loads
* But change it to the following:

```
// MORE CODE

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  expect(getByTestId('loading')).toBeTruthy();
  debug();
});
```

* That still fails. wtf?
* It fails because it can't find it because it is not there
* This is where we need to use `queryByTestId` and we then we use that on `toBeFalsy()`

```
// MORE CODE

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));
  const { getByTestId, queryByTestId, debug } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  expect(queryByTestId('loading')).toBeFalsy();
  debug();
});
```

* Now our tests pass!
* It looked for it, it didn't exist and then it reported it as `Falsy`

**tips** 
* If you know something should be there.... use `getByTestById`
* If you know something is not there... use `queryByTestId`

## Pull the first movie out of our mock array
`MoviesList.test.js`

```
// MORE CODE

const movies = {
  results: [
    {
      id: '123',
      title: 'I love mock responses',
      poster_path: 'something.jpg',
      release_date: '1/1/2019',
      overview: 'very good!',
    },
  ],
};

const movie = movies.results[0];

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId, queryByTestId, debug } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  expect(queryByTestId('loading')).toBeFalsy();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  debug();
});
```

* We just tested to make sure the link shows up and we do that for the sole purpose of testing that our component shows up

## We need to test our list
* Let's make our array longer

```
// MORE CODE

const movies = {
  results: [
    {
      id: '123',
      title: 'I love mock responses',
      poster_path: 'something.jpg',
      release_date: '1/1/2019',
      overview: 'very good!',
    },
    {
      id: '1234',
      title: 'I also love mock responses',
      poster_path: 'something.jpg',
      release_date: '1/1/2019',
      overview: 'good!',
    },
    {
      id: '12345',
      title: 'I do not love mock responses',
      poster_path: 'something.jpg',
      release_date: '1/1/2019',
      overview: 'meh',
    },
  ],
};

```

* Our debug shows the output of the new movies

## getAllBy
* We want to make sure that the same amount of things that we are expecting to show up are actually showing up
    - How do we do that?
        + We already used getBy... and queryBy... but we haven't used `getAllBy`

```
// MORE CODE

  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  console.log(getAllByTestId('movie-link'));
  debug();
});
```

* That gives us a long list of all the DOM nodes
* Let's just find out the lenght

```
// MORE CODE

  console.log(getAllByTestId('movie-link').length);
  debug();
});
```

* That gives us back a length of 3

### Test our number of `movie-link`s to match the length of movies
```
// MORE CODE

  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
  debug();
});
```

## Remove the debug
`MoviesList.test.js`

```
import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

// custom components
import MoviesList from '../MoviesList';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const movies = {
  results: [
    {
      id: '123',
      title: 'I love mock responses',
      poster_path: 'something.jpg',
      release_date: '1/1/2019',
      overview: 'very good!',
    },
    {
      id: '1234',
      title: 'I also love mock responses',
      poster_path: 'something.jpg',
      release_date: '1/1/2019',
      overview: 'good!',
    },
    {
      id: '12345',
      title: 'I do not love mock responses',
      poster_path: 'something.jpg',
      release_date: '1/1/2019',
      overview: 'meh',
    },
  ],
};

const movie = movies.results[0];

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId, queryByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  expect(queryByTestId('loading')).toBeFalsy();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});
```

* Comment out the `console.log(movies)` from MoviesList.js

## Review
1. We are checking loading state
2. If the loading state is there then that test will pass
3. Then we wait to see if a movie link shows up with our fake data
4. Once our movie-link shows up our loading should be gone
5. We ensure the movie-link is the correct path (we do this to show a deeply nested component is rendering properly and that the data is correct)
6. Then we test to make sure all the `movie-link` we get are the same out as the movies

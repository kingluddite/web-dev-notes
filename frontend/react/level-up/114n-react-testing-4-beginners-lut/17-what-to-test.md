# What to Test
* We'll bring in `debug` so we won't `fly blind`

`Movie.test.js`

```
// MORE CODE

const movie = {
  id: '123',
  title: 'A fist full of dollars',
  poster_path: 'fist-dollars.jpg',
};

test('<Movie /> with movie', () => {
  const { debug } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
  debug();
});
```

* Analyze the code by looking at the output from debug and our `Movie.js`

`Output from Movie.test.js`

![output debug](https://i.imgur.com/4GtGm44.png)

`Movie.js`

```
// MORE CODE

const Movie = ({ movie }) => {
  if (!movie) return null;
  return (
    <Link to={`/${movie.id}`}>
      <Overdrive id={`${movie.id}`}>
        <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      </Overdrive>
    </Link>
  );
};

// MORE CODE
```

* We have a Link ---> which converts to `<a href=...>`
* It has the correct path `id`
* It has a `<div>` which comes in from Overdrive an animation library
* Then we have Poster which is just a styled component
    - Which just uses and image and gives it a box shadow

## What's important?
* The image path and link path
* How can we get quick access to the Link so we can test on it?
    - How about using the `data-testid`?
    - We need to get the `href` 

```
test('<Movie /> with movie', () => {
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(movie.id);
  debug();
});
```

* That fails because we forgot the `/` in our path

## Tip to add path
* Use prettier to convert your old JS concatenation to using string interpolation
    - Type this

```
expect(getByTestId('movie-link').getAttribute('href')).toBe('/' + movie.id);
```

* Save and Prettier (if set up) will convert it to:

```
expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
```

* We check the link because it is checking the `id` and so as long as that is correct our links will work whether relative or coming from remote API

## Test to make sure the URL is the same
* In regards to the image
* We can export our POSTER_PATH

`Movie.js`

* Change this:
 
`const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';`

* To this:

`export const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';`

* Now we can import that poster path like this:

`Movie.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

// custom components
import Movie, { POSTER_PATH } from './Movie'; // modify this line

// MORE CODE
```

* Adding test to check image path

```
// MORE CODE
test('<Movie /> with movie', () => {
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getByTestId('movie-img').src).toBe(
    `${POSTER_PATH}${movie.poster_path}`,
  );
  debug();
});
```

* We get an error so make sure you add the correct `data-testid`

`Movie.js`

```
// MORE CODE

<Poster
  data-testid="movie-img"
  src={`${POSTER_PATH}${movie.poster_path}`}
  alt={movie.title}
/>

// MORE CODE
```

## Summary
* We just tested the most important things about this component
    - We tested that the image is what it is supposed to be
    - We tested that the link is where it is supposed to go
* So our component is fully tested

### A little cleanup
* We now can remove the `debug` so it is not clogging up our terminal

`Movie.test.js`

```
// MORE CODE

test('<Movie /> with movie', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getByTestId('movie-img').src).toBe(
    `${POSTER_PATH}${movie.poster_path}`,
  );
});
```

## Next - MovieDetail
* We have an async `componentDidMount` that is fetching data for us
* And then returning data through `res.json()`
* Then setting the movie in our state
* We will learn how to `mock` **fetch** and how we can mock the data that comes back from **fetch** so we can get a component rendered out

## Resources
* Kent C. Dodds talks about why `data-testid` is very useful
    - [Read the article](https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269)

# Mocking Fetch Part 2 Async Tests Working with Data
## `waitForElement`
* Gives a little wait until it finds something on the screen
* After a "reasonable" amount of time, if it doesn't show up than it cancels and it fails the test
    - enzyme handle is like:
        + It renders once
        + Then you have to physically tell enzyme to re-render after a given amount of time and hope that data comes in
        + Our process is better because it is actually how your app is working

`MovieDetail.test.js`

```
import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';

// MORE CODE
```

## Out title will appear as text
* getByText

```
// MORE CODE

  const { debug, getByText } = render(<MovieDetail match={match} />); // modify
  debug();
});
```

* We need an asynchronous `waitForElement`
* How can we do this?
* It's easy!

## Async Await!
```
// MORE CODE

test('<MovieDetail />', async () => { // modify this line
  fetch.mockResponseOnce(
    JSON.stringify({
      movie: {
        id: '123',
        title: 'I love mock responses',
      },
    }),
  );
  const { debug, getByText } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByText('I love mock responses')); // and here!
  debug();
});
```

* Test and it fails because it can't find our text

## Not sure why it isn't working
* Let's log out the `movie` object

`MovieDetail.js`

```
// MORE CODE

async componentDidMount() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.match.params.id
      }?api_key=hi&language=en-US`,
    );
    const movie = await res.json();
    this.setState({
      movie,
    });
    console.log(movie);
  } catch (e) {
    console.log(e);
  }
}

// MORE CODE
```

* Now our test shows this:

```
{ movie: { id: '123', title: 'I love mock responses' } }
```

* We see that we have movie inside an object
* This could be the problem
* If we remove `movie` object and just include `id` and `title` inside an object like this:

```
// MORE CODE
test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      id: '123',
      title: 'I love mock responses',
    }),
  );
  const { debug, getByText } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByText('I love mock responses'));
  debug();
});
```

* That test passes and our `h1` now finally has data inside it
* We got this working because we changed how the mock data was coming back

### Why was this an issue in the first place?
* It has to do with how this JSON.stringify mock response is working
* In our actual app code

```
// MORE CODE

const movie = await res.json();
this.setState({
  movie,
});

// MORE CODE
```

* All we were doing was taking the result and setting it equal to a variable named `movie`
* Then we were setting that movie to the state named `movie`
* There was never an instance where there was an object with the property of `movie` in it
* So keep in mind when we were returning our data it needed to be in the exact same configuration as what MovieDetail would have been setting to it's state
* That is huge and a real world problem you will run into all the time
* The biggest problem people have is the mock data is not the same shape as the data the component is expecting

## Stop false positives
* We don't want to render until we get test data
* We don't want to output any HTML before there is a movie

`MovieDetail.js`

```
// MORE CODE

render() {
  const { movie } = this.state;
  if (!movie.id) return null;

  return (

// MORE CODE
```

* That will prevent debug from rendering with no data beforehand
* That way we won't get any false positives if we are looking for a test `id`

`MovieDetail.js`

```
// MORE CODE

<div>
  <h1 data-testid="movie-title">{movie.title}</h1>
  <h3>{movie.release_date}</h3>
  <p>{movie.overview}</p>
</div>

// MORE CODE
```

`MovieDetail.test.js`

```
// MORE CODE

const movie = {
  id: '123',
  title: 'I love mock responses',
  release_date: '1/1/2019',
  overview: 'very good!',
};

test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));
  const { debug, getByText, getByTestId } = render(
    <MovieDetail match={match} />,
  );
  await waitForElement(() => getByTestId('movie-title'));
  await waitForElement(() => getByTestId('movie-date'));
  await waitForElement(() => getByTestId('movie-overview'));

  expect(getByTestId('movie-title').textContent).toBe(movie.title);
  expect(getByTestId('movie-date').textContent).toBe(movie.release_date);
  expect(getByTestId('movie-overview').textContent).toBe(movie.overview);
  debug();
});

```

* Other things to test
    - Outputs the `backdrop` path
    - We already tested to make sure the h3 and p tags were output correctly
    - Also do the POSTER path just like we did in a previous section 

## Summary
* We did asynchronous testing
* We are waiting for an element to show up on a page (using `getByTestId`)
* We're expecting the testById to be a movie title
* We coded this to be less fragile because we are using the data from a movie object we created instead of a brittle string

## Clean up
* Remove the debug 

```
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

## We can't easily assign a variable to `getByTestId('movie-title'))`
```
// MORE CODE

test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));
  const { getByTestId } = render(<MovieDetail match={match} />);
  const movieTitle = getByTestId('movie-title');

  await waitForElement(() => getByTestId('movie-title'));

// MORE CODE
```

* That will fail because `movie-title` is undefined
* The reason is it comes before our await so if it can't find it the `get` will fail `getByTestId`
    - We could always do a `queryByTestId` but it's fine as it is

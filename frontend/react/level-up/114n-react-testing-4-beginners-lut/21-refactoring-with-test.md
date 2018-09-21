# Refactoring with Tests
* Create `movies` folder
    - Put all Movie files inside it
    - Create `__tests__` inside `movies`
    - Drag `__snapshots__` inside `movies` too
    - Drag all Movie `.test.js` files inside `__tests__`
* Stop all tests
    - They are breaking because of file paths
    - Open in __tests__ and make all paths to Movie files to be `../`

`Movie.test.js`

```
// MORE CODE

import Movie, { POSTER_PATH } from '../Movie';

// MORE CODE
```

## You need to test App.js
* Just do a test to make sure this stuff is rendering and showing up on screen
* Need to update paths to custom components

## Start our app
`$ npm start`

![structure now](https://i.imgur.com/dqO5M7n.png)

`src/components/App.js`

```
/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import './App.css';

import MoviesList from './movies/MoviesList';
import MovieDetail from './movies/MovieDetail';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">Test</Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
```

`src/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

* I removed serviceworkers

## Now we get an error on MoviesList
* `TypeError: Cannot read property 'length' of undefined`
* `movies` has no length

### Problem - The API is failing
* Let's log out `movies`
* We see our array of movies does come back
* Open up inspect
* We see an object but we have a `status_code: 7` and `success: false`

![401 unauthorized](https://i.imgur.com/aReApld.png)

* This means we need a `success: true` before we display our movies
* So after we check and we get `success: true`, then we'll set the `state`

`MoviesList.js`

```
// MORE CODE

const movies = await res.json();
// console.log(movies);
if (movies.success) {
  this.setState({
    movies: movies.results,
  });
}

// MORE CODE
```

* Our test will fail because we need to mock `success: true` inside our object

`Movies.test.js`

```
// MORE CODE

const movies = {
  success: true, // add this line
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
// MORE CODE
```

* We could also add another test that if the API fails, how should we respond
* Copy our last test from MoviesList.test.js
* Past below it:

```
// MORE CODE

test('<MoviesList /> api fail', async () => {
  movies.success = false;
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

* This test will fail
* Remove unnecessary code

```
// MORE CODE
test('<MoviesList /> api fail', async () => {
  movies.success = false;
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId, queryByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
});
```

* Now all tests pass
* Check for more robost than just show loading
    - You could have an error state in your component and then you could check to see if that error state showed up
* Check actual app in browser and you will see `loading`
* We just confirmed that our app will load even if the API isn't going to load

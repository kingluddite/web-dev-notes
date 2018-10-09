# API
* [movie db API](https://developers.themoviedb.org/3/discover/movie-discover)
* Click try it out
* Get your API key (click on movie db logo)
    - Create account
    - Copy your API key in settings of Movie DB site
* Go back to discover link of themoviedb API
* Click try it out tab
* Paste your API in the text box
* Click Send request and you'll see various forms of the response
* If you don't see the response filled with data, then you won't get data in your app

## create-react-app and dotenv
* API is a safety concern you must protect it
* [step by step instructions](https://medium.com/@danieljameskay/create-react-app-dotenv-281693a19ecd)

### Install dotenv
`$ npm i dotenv --S`

* The install instructions on the NPM site mention to require and configure as earlier as possible, (either in the `index.js` or `App.js`)

### Require it
`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));
```

###  create a `.env` file
* In the root directory of our project
* Then we can add environment specific variables on new lines in the form of `REACT_APP_SECRET=VALUE`

## Create `variables.env.development.local` in root of your project
`variables.env`

```
REACT_APP_DEV_API_URL="https://devapiurl.com/api/"
```

* Adding the variables to your React project
Yeah, that’s great and all

## But there’s one problem
* `Dotenv` only works server-side
* And we’re not doing back-end stuff
* But create react app has a way around this
    - If you are not using create-react-app you'll have to research another way
    - **note** If we weren't using `create-react-app` we wouldn't have to place `REACT_APP_` in front of the variable
* Done! 
* We can now access the keys and values defined in our `.env` file
* Use the following to get access to your hidden API key

`process.env.REACT_APP_DEV_API_URL`

## Don't forgot
* Remember to add the `.env` file to your `.gitignore` so it doesn't find itself in GitHub
* Now you need to remember to find a way to share your API keys when people need them or if you are using multiple computers you need a way to sharing API keys between computers
    - When you or your team pull your app down from github, they will not have your API keys and your app will break

## Suggestions
* Create two .env files
    - .env.development
    - .env.production

`.env.development`

```
REACT_APP_DEV_MYDB_API=6bed0f87158ec0aba138db3ce714fabc
```

`.env.production`

```
REACT_APP_PROD_MYDB_API=6bed0f87158ec0aba138db3ce714fxyz
```

`App.js`

```
import React, { Component } from 'react';
import './App.css';

// custom components
import President from './President';

require('dotenv').config();

const presidents = [
  { id: 1, lastName: 'Washington' },
  { id: 2, lastName: 'Adams', desc: '2nd President of U.S.' },
  { id: 3, lastName: 'Jeffereson' },
];

class App extends Component {
  async componentDidMount() {
    try {
      const apiMovie =
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_PROD_MYDB_API
          : process.env.REACT_APP_DEV_MYDB_API;
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiMovie}`);
      const movies = await res.json();
      console.log(movies);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Presidents</h1>
        </header>
        {presidents.map(president => (
          <President key={president.id} president={president} desc={president.desc} />
        ))}
      </div>
    );
  }
}

export default App;
```

* **important** When changing your API keys restart your server every time as `dotenv` it won't update to the new API keys until you do

`.gitignore`

```
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
/node_modules

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development
.env.test.local
.env.production

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

## Test your app out
* You will see your array of movies in the Chrome console

### Our next problem
* We have this array of movies but how do we get them out of `componentDidMount()`?
    - Set them to `setState()`

`App.js`

```
// MORE CODE

class App extends Component {

  async componentDidMount() {
    try {
      const apiMovie =
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_PROD_MYDB_API
          : process.env.REACT_APP_DEV_MYDB_API;
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiMovie}`);
      const movies = await res.json();
      // console.log(movies);
      this.setState({ movies });
    } catch (error) {
      console.log(error);
    }
  }

// MORE CODE
```

## View in React Dev Tools
* You will see that `movies` has an **array** (named `results` of all the movies inside it)
* We can make our result set cleaner (because we only want the movies) using this:

`App.js`

```
// MORE CODE
this.setState({ movies: movies.results }); // make this small update
// MORE CODE
```

## View React Dev tools again
* You now see our result set of `movies` returns an array of 20 movies

## But inside our render if we console.log(this.state)
`App.js`

```
// MORE CODE

render() {
  console.log(this.state.movies);

// MORE CODE
```

* You will see we get an error because `movies` doesn't exist in state when our component renders
* To fix this we need to add a default `state` for our app

`App.js`

```
// MORE CODE

class App extends Component {
  state = {
    movies: [],
  };

// MORE CODE
```

## Test again
* Our error goes away
    - Notice in the console we see two things

1. Empty array
2. Array of 20 movies

* This lets you know when our component first renders `state.movies` is **empty** `[]` but after our data loads `state.movies` is populated with an array of 20 `movie` **objects**

## Change our app from Presidents to movies
`Movie.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Movie extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  };

  static defaultProps = {
    movie: {},
  };

  render() {
    // console.log()
    const { title, vote_average } = this.props.movie;
    return (
      <div>
        <h3>{title}</h3>
        <p>{vote_average}</p>
      </div>
    );
  }
}

export default Movie;
```

`App.js`

```
// MORE CODE

// custom components
import Movie from './Movie';

// MORE CODE

class App extends Component {

// MORE CODE

  render() {
    const { movies } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movies</h1>
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


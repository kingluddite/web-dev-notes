# Add spinners when loading
* This is a 3rd party package we can use to quickly add this functionality

## Download it
* [react spinners site](http://www.davidhu.io/react-spinners/)

## Install in our client folder
`ctrl` + `c` to quit server

`$ cd client`

`$ npm i react-spinners`

## Create a new Component
`components/Spinner.js`

```
import React from 'react';
import { HashLoader } from 'react-spinners';

const Spinner = () => (
  <div className="spinner">
    <HashLoader color={'#1eaedb'} size={30} margin={'3px'} />
  </div>
)

export default Spinner;
```

`$ cd ../`

`$ npm run dev`

`App.js`

```
import React, { Component } from 'react';
import pose from 'react-pose';
import Spinner from './Spinner';

 // MORE CODE

class App extends Component {
  // MORE CODE

  render() {
    return (
      // MORE CODE
        <Query query={GET_ALL_GENEALOGIES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;

// MORE CODE
```

## Replace all loading text with spinner
1. Stop the server
2. `$ cd client/src`
3. `$ grep -r -i "loading" .`
4. Command click each link that has `if (loading) return <div>Loading...</div>;` and replace with `<Spinner />`
5. Make sure to import `Spinner` at the top of all components that use it

## Run app
`$ cd ../../` (make sure you are in app root)

`$ npm run dev`

## Test
* You should see brieg Spinner animations

## Add style to Search input
`Search.js`

```
// MORE CODE

<div className="App">
             <input
               type="search"
               name="search"
               id="search"
               className="search"

// MORE CODE
```

## Redeploy for production
* Change port back to 80
* `variables.env` 

``` 
PORT=80
```

## Point client to remote URI on live heroku site

`client/src/index.js`

```
// MORE CODE

// uri: 'http://localhost:4444/graphql'
// uri (prod): https://protected-ravine-56983.herokuapp.com/
const client = new ApolloClient({
  uri: 'https://protected-ravine-56983.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

## If there is a network error, set the token to an empty string

`index.js`

```
// MORE CODE

  onError: ({ networkError }) => {
    if (networkError) {
      // console.log('Network Error', networkError);
      localStorage.setItem('token', '');
    }
  },
});


// MORE CODE
```

* Our server will crash because it can't run on any port less than 1000
* So Port 80 will never work on our dev server

## Add and commit to github and heroku
`$ git push heroku master`

`$ git push origin master`

## Possible cors issues
`server.js`

```
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors('*'));
```


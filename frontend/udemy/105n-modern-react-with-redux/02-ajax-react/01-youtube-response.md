# Youtube response
Now we'll use our API searches with our Youtube API key

## Call the Youtube API
We do this to get some information and then figure out how to spread that info throughout the entire app

## Where should we fetch that list of videos?
In other words, what Component should be responsible for grabbing that info?

### Downwards data flow
This is a name used in the React World and this means **only the most parent Component** in an application should be responsible for fetching data be it from an API, or a Flux framework or Redux itself even

### What is the most parent Component we have?
index.js

* All the other Component's will be children of the `App` Component (which resides inside `index.js`)

## Let's fetch some data
remember `index.js` is a silo of sorts so we need to import the search package into `index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'; // add this line
```

### Test out fetching data
```
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/SearchBar';

const API_KEY = 'AIzaSyC9bJsdEJpmtGcBb_c7ck0NvOvyShMxXXX';

YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
  console.log(data);
});

const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('.container'));
```

Here we are passing our key and the term, and then we have a call back function that is outputting the data response

### Save and test in browser
Refresh and you should see we get a bunch of objects returned in the console and when you open and inspect each object we see each object is populated with lots of Youtube data that we can use



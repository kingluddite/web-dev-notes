# ReactDOM
* React is starting to diverge into two core libraries
* We imported `React` and it knows how to work with **React Components**
* It knows how to render them and nest them together
* But the functionality to render them to the DOM is now a separate library called `ReactDOM`

## Test in browser
* We get rid of our `React not defined` error but we now have two errors. `React.render()` is deprecated
* Please use `ReactDOM.render()` from `require('react-dom`) instead

### Import ReactDOM
```
import React from 'react';
import ReactDOM from 'react-dom'; // add this line
```

* And change this line:

`React.render(App);`

* To this:

`ReactDOM.render(App);`

## Test in browser
We get yet another error: `make sure to instantiate it by passing it to React.createElement`


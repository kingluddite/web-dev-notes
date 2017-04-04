# Export Statements
We will talk about:

* Exporting Modules
* Classes
* State

`SearchBar.js`

```
const SearchBar = () => {
  return <input />
}
```

## Important to `import` 
Even though we are not making use of React inside this Component we still need to include it

```
import React from 'react';

const SearchBar = () => {
  return <input />
}
```

**note** When we write JSX like `<input />` the transpile to Babel will be `React.createElement()` so you need to import `React`
    * If you don't believe me go [babel](https://babeljs.io/repl) and try it yourself

**important** React need to be imported into all of our Components when we write JSX

## Do something so that use can see it
If we can get our SearchBar over and into `index.js` we can render it to the page

One problem. To render the SearchBar Component, `index.js` needs a reference

**note** All of our Components are **siloed** from each other unless we explicitly declare a connection between them

We have learned how to **import** code but we have yet to learn how to **export** code 

We only want to export a subset of our file so we write this at the bottom of `SearchBar.js`

```
export default SearchBar;
```

Now any file that **imports** `SearchBar` will get our `SearchBar` component

```
const SearchBar = () => {
  return <input />
}
```

Complete `SearchBar.js`

```
import React from 'react';

const SearchBar = () => {
  return <input />
}

export default SearchBar;
```

If we changed the export like this:

```
import React from 'react';

const SearchBar = () => {
  return <input />
}

const foo = 5;

export default foo;
```

* Then our export would be `5` and not our `SearchBar` Component
* Make sure to change it back to the way it was before we added `foo`

```
import React from 'react';

const SearchBar = () => {
  return <input />
}

export default SearchBar;
```

### Now import SearchBar into `index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';

const API_KEY = 'AIzaSyC9bJsdEJpmtGcBb_c7ck0NvOvyShMxXXX'; // fake API

const App = () => {
  return (
    <div>
      <input />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('.container'));
```

* Make sure the path is correct
    - `import SearchBar from './components/SearchBar';`
    - Whenever we import code that we write we have to give an actual file reference to the file we are trying to import
    - We don't have to do that with Libraries we import (like React) because they are **namespaced**
        + We can only have one installed package called `React`
            * Go into the `node_modules` folder and get the directory called `react` (Same thing with `ReactDOM`)
    - So with your custom code inside your React app, make sure you import using relative paths from the file you are in to where the file is where you are importing it from
    - `./` This represents the **current directory**
    - You do not need `.js` suffix as long as it is a JavaScript file

### Multiline JSX
```
return (
    <div>
      <SearchBar />
    </div>
  )
```

**important** Have one parent tag for your JSX

### Tree of Components
We are now starting to form a `tree of components`

At the very top of the tree we have our `App` Component
The first child inside of this tree is our `SearchBar` Component

## Test in browser
You should see an input element on the screen

# App Layout & Component Setup
All files outside `client` are tooling files

## `client` holds all our app files

`client/reduxstagram.js`

```
import React from 'react';
```

**tip** if you don't see `../` or some path in front of `react`, then you know that it is being imported from `node_modules`

**note** Building an app from scratch requires using `npm install` for every package you are using. We stacked our `package.json` with all the `npm` packages we are using for this app so we can bypass that process in this example:

## `import { render } from 'react-dom`

* This will enable us to render out to **HTML** (_react could also work with `canvas` and `react-native_`)
    - So this imports the **DOM stuff** and from the `react-dom` package

`reduxstagram.js`

```
import React from 'react';

import { render } from 'react-dom';

// imports css
import css from './styles/style.styl';

render(<p>hello</p>, document.getElementById('root'));
```

## View in browser
You will see `hello`

## HotReloading
Right now if we change the text we need to **refresh** to see update. But `Hot Reloading` will refresh not just the component but the entire page

## What are the components we will be building?
* Main
* PhotoGrid
* Single

### We put all our components in the `client/components`
Create the components folder and inside create our components

`$ touch Main.js PhotoGrid.js Single.js`

### `Main.js`
```
import React from 'react';
import { Link } from 'react-router';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Reduxstagram</Link>
        </h1>
      </div>
    )
  }
}

export default Main;
```

### Update `reduxstagram.js`

```
import React from 'react';

import { render } from 'react-dom';

// import css
import css from './styles/style.styl';

// import components
import Main from './components/Main';

render(<Main />, document.getElementById('root'));
```

### Hot Reload
Change the text inside the `Main.js` and you will see the browser update autmatically without a page refresh


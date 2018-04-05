# Create application layout with components
* Time to add Prettier and Eslint
* [Read this article](https://medium.com/technical-credit/using-prettier-with-vs-code-and-create-react-app-67c2449b9d08)

## Step 1: Install Prettier and the ESLint Plugin

```
$ yarn add -D prettier eslint-plugin-prettier
```

## Step 2: Install the Prettier and ESLint VS Code Extensions
* ESLint
* Prettier

## Step 3: Create the Prettier and ESLint Configuration files

`.eslintrc`

```
{
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

* If you are not happy with the default Prettier configuration then you can create a `.prettierrc` file with your own [options](https://prettier.io/docs/en/options.html), for example:

`prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

## Step 4: Apply Prettier Formatting on Save (Optional)
* You most likely want to apply the Prettier formatting whenever you save your files
* To do so, add the following to your Visual Studio Code Workspace Settings:

`"editor.formatOnSave": true`

## Step 5: Prevent Prettier Violations from being Committed (Optional)
* To prevent unformatted code from being committed to Git you can add a pre-commit hook
* pretty-quick respects the `.prettierrc` file

`$ yarn add -D pretty-quick husky`

```
{
  "scripts": {
    "precommit": "pretty-quick --staged"
  }
}
```


## `src/components/App.js`
* Save `TeamPicker.js` as `App.js`

```
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="team-of-the-day">
        <div className="menu">
          <Header />
        </div>
        <Lineup />
        <Roster />
      </div>
    )
  }
}

export default App;
```

## View in browser
* Nothing changes because `index.js` is still rendering `<TeamPicker />`

## Update `index.js`

```
import React from 'react';
import { render } from 'react-dom';
import './css/style.css';
import App from './components/App';

import TeamPicker from './components/TeamPicker';

render(<App/>, document.querySelector('#main'));
```

## Why do we get an error?
* We get errors like `Header is not defined` because we did not define those components yet
* **time saving tip** If you have an error in your component, click the error and it will open that component in your default text editor

![errors](https://i.imgur.com/nLblST3.png)

## Create `/src/components/Header.js`
* Save `App.js` as `Header.js` and modify the code to look like:

```
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <p>Header</p>
    )
  }
}

export default Header;
```

## Update `App.js`

```
import React from 'react';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <header className="top">
        <h2>Teams</h2>
        <h3 className="tagline">
          <span>EPL</span>
        </h3>
      </header>
    );
  }
}

export default App;
```

## View in browser and you'll see our `Header`

## Add Lineup and Roster Components
### Steps
1. Create the Components inside the `components` folder by saving `App.js` as each Component (`Lineup.js` and `Roster.js`)
2. Rename the class name and export default name for both
3. Add the module imports for each Component to top of the `App.js` file

`src/components/Lineup.js`

```
import React from 'react';

class Lineup extends React.Component {
  render() {
    return (
      <p>Lineup</p>
    )
  }
}

export default Lineup;
```

`src/components/Roster.js`

```
import React from 'react';

class Roster extends React.Component {
  render() {
    return (
      <p>Roster</p>
    )
  }
}

export default Roster;
```

## Update `src/components/App.js`

```
import React from 'react';
import Header from './Header';
import Lineup from './Lineup';
import Roster from './Roster';

class App extends React.Component {
  render() {
    return (
      <div className="team-of-the-day">
        <div className="menu">
          <Header />
        </div>
        <Lineup />
        <Roster />
      </div>
    )
  }
}

export default App;
```

### View in browser
* You'll see the 3 components we just built:
    - Header
    - Lineup
    - Roster

#### Use React in Dev Tools to see the App, Header, Lineup and Roster Components

### Warning Will Rogers
* You will see this annoying light yellow colored `eslint` **TeamPicker** warning in the console
* Eslint is telling you you have a Component imported and you are not using it
* This is a `no-no` in React
* You only import what you will use
* We will use this Component soon



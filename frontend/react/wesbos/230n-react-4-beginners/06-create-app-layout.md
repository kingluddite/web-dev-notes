# Create application layout with components

## `src/components/App.js`
* Let's turn our Component into a layout that will hold other components
* Save `TeamPicker.js` as `App.js`
* Make App.js look like this:

`App.js`

```
  import React from 'react';
import Header from './Header'; // Add this line

class App extends React.Component {
  render() {
    return (
      <div className="team-of-the-day">
        <div className="menu">
          <Header />
        </div>
      </div>
    );
  }
}

export default App;
```

## View in browser
* Nothing changed?
* Our `index.js` is still pointing to `TeamPicker.js`

## Update `index.js`

```
import React from 'react';
import { render } from 'react-dom';
import './css/style.css';
import App from './components/App'; // add this line

import TeamPicker from './components/TeamPicker';

// modify this line
render(<App/>, document.querySelector('#main'));
```

## Why do we get an error?
* We get errors like `Header is not defined` because we did not define those components yet
* **time saving tip** If you have an error in your component, click the error and it will open that component in your default text editor (create react app only)

![errors](https://i.imgur.com/nLblST3.png)

## TeamPicker warning
* We get a warning about `TeamPicker.js`
* If you don't use a file that is imported you will get this warning

## Create `/src/components/Header.js`
* Save `App.js` as `Header.js` and modify the code to look like:

`Header.js`

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
import Header from './Header'; // Add this line

class App extends React.Component {
  render() {
    return (
      <div className="team-of-the-day">
        <div className="menu">
          <Header />
        </div>
      </div>
    )
  }
}

export default App;
```

## View in browser and you'll see our `Header`

## Make our Header cooler

`Header.js`

```
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h2>Teams</h2>
        <h3 className="tagline">
          <span>tagline here</span>
        </h3>
      </header>
    );
  }
}

export default Header;
```

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

## Update `App.js`

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



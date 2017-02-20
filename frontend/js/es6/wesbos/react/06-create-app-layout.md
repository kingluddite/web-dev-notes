# Create application layout with components

## `src/components/App.js`
Save `StorePicker.js` as `App.js`

```
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header />
        </div>
        <Order />
        <Inventory />
      </div>
    )
  }
}

export default App;
```

View in browser. Nothing changes because `index.js` is still rendering `<StorePicker />`

## Update `index.js`

```
import React from 'react';
import { render } from 'react-dom';
import './css/style.css';
import App from './components/App';

import StorePicker from './components/StorePicker';

render(<App/>, document.querySelector('#main'));
```

## Why do we get an error?
We get an error `Header is not defined` because we did not define the Header Component yet

## Create `/src/components/Header.js`
Save `App.js` and `Header.js`

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
      <div className="catch-of-the-day">
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

## Add Order and Inventory Components
### Steps
1. Create the Components inside the `components` folder by saving `App.js` as each Component (`Order.js` and `Inventory.js`) and rename the class name and export default name for both.
2. Add the module imports for each Component to top of the `App.js` file

`src/components/Order.js`

```
import React from 'react';

class Order extends React.Component {
  render() {
    return (
      <p>Order</p>
    )
  }
}

export default Order;
```

`src/components/Inventory.js`

```
import React from 'react';

class Inventory extends React.Component {
  render() {
    return (
      <p>Inventory</p>
    )
  }
}

export default Inventory;
```

## Update `src/components/App.js`

```
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header />
        </div>
        <Order />
        <Inventory />
      </div>
    )
  }
}

export default App;
```

### View in browser and you'll see Header, Order and Inventory

#### Use React in Dev Tools to see the App, Header, Order and Inventory Components



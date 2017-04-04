# Header Component
Simple component placed inside our existing App component

`client/components/Header.js`

```
import React from 'react';

const Header = () => {
  return (
    <p>Header</p>
  )
}

export default Header;
```

## Import it into `client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />  
    </div>
  )
}

Meteor.startup(() =>{
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
```

## View in browser
You should see the text `Header` added to our existing page

## Add Bootstrap
Here we add the classes and HTML elements

`client/components/main.js`

```
import React from 'react';

const Header = () => {
  return (
    <nav className="nav navbar-default">
      <div className="navbar-header"><a href="" className="navbar-brand">ShortenMyLink</a></div>
    </nav>
  )
}

export default Header;
```

### Add Bootstrap via Meteor's package manager
`$ meteor add twbs:bootstrap@3.3.6`

View in page and you should see:

![Brand with bootstrap](https://i.imgur.com/iP76Mt0.png)

# Materialize CSS
* Create `client/src/components/Header.js`

`Header.js`

```
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <h2>Header</h2>
      </div>
    );
  }
}

export default Header;
```

* Import Header into App

`App.js`

```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```

* And it looks the same in the browser as it did before
* But our codebase just got a little more modular

## Materialize CSS
[link](http://materializecss.com/)

* CSS framework that is intended for general use by any type of web application
    - Edit with plain CSS
    - Easy to set up and use
* Other libraries [Material-UI](http://www.material-ui.com/#/)
    - Why are we not useing this one?
    - It handles all it's CSS with JavaScript
    - It is harder to customize
    - It is naturally more challenging to override properties via JavaScript than it is with CSS

### Ways to install Materialize CSS
* You can use CDN links
* You can use NPM
    - It is not as straight forward as adding CDN links
    - But it is getting more and more popular with CSS libraries that you can install
* We are going to install materialize css as an NPM module to our client side project
* Kill the server
* `$ cd client`
* `$ yarn add materialize-css`

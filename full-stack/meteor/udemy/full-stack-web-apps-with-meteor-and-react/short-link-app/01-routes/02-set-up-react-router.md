# Setting up React Router
## Create your Meteor app
`$ meteor create short-link`

## Install all your npm dependencies
`$ meteor npm install`

## Change into your new project
`$ cd short-link`

## Open your project inside Atom
`$ atom .`

## How do you update your version of meteor?
`$ meteor update --release 1.4`

* That is an older version so it will migrate from the newer to the older

## What version of Meteor am I currently running?
Inside `.meteor` you can open `release` and it will have the current Meteor release (_currently, as of 4/15/2017, I'm running 1.4.4.1_)

## Gut Blaze from our project
We are using React

`client/main.html`

```
<head>
  <title>Short Link</title>
</head>

<body>
  <div id="app"></div>
  <!-- /#app -->
</body>
```

Remove all code from `client/main.js`

### Install React, ReactDOM and React Router
`$ meteor npm i react react-dom react-router@3.0.0 -S`

**React Router** is in flux so we need to install a specific version that we know will work

### Install babel-runtime and meteor-node-stubs
We already did this but just in case, you can do it again and it won't override anything but if the package(s) were not installed it will install them now

These are in `package.json` and we just need to install them

`$ meteor npm install`

## Run your Meteor app
`$ meteor run`

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Signup extends Component {
  render() {
    return (
      <div>
        Signup
      </div>
    );
  }
};

Meteor.startup(() => {
  ReactDOM.render(<Signup />, document.getElementById('app'));
});
```

### View in browser
Should see `Signup`

## Exercise
Take `Signup` and put in its own file

<details>
  <summary>Solution</summary>
`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import App from './../imports/ui/components/App';
import Link from './../imports/ui/components/Link';

Meteor.startup(() => {
  ReactDOM.render(<Link />, document.getElementById('app'));
});
```

`imports/ui/components/Signup.js`

```
import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return(
      <div>
        Signup
      </div>
    );
  }
};

export default Signup;
```

`imports/ui/components/App.js`

```
import React, { Component } from 'react';
import Signup from './Signup';

class App extends Component {
  render() {
    return(
      <div>
        <Signup />
      </div>
    );
  }
};

export default App;
```

`imports/ui/components/Link.js`

```
import React, { Component } from 'react';

class Link extends Component {
  render() {
    return (
      <div>Link</div>
    );
  }
};

export default Link;
```
</details>

## Next
We have two Components `Link` and `Signup` and we'll use **React Router** to switch between the two


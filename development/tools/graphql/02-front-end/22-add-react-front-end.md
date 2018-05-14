# Add React Front-end
* We like to keep our graphql server running in the background
* So open a new terminal window tab

## Make sure you are in the root directory of our app (not in the server folder!)
`$ cd ../`

* install create react app globally
* `$ npm install create-react-app -g`

## Create our client front end react app
`$ create-react-app client`

* That will take some time

### New commands
* `$ npm start`
    - starts development server (we'll use this most)
* `$ npm run build`
    - bundles app into static files for production

## Change into our react app
`$ cd client`

## Front end and back end server
* React will be running on a server on port 3000
* GraphQL will be running on a server on port 4000

(we could have the front end served from the same server for production but we are keeping this simple and serving from two different servers)

### Clean up to keep this simple
delete serviceworker in `index.js` to keep it simple

`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

* Delete App.css (also remove it's import from `App.js`)
* Make it look like this:

`App.js`

```
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Reading List</h1>
      </div>
    );
  }
}

export default App;
```

* Delete registerServiceWorker.js
* Delete App.test.js
* Delete logo.svg

## View in browser and you'll see `Reading List` on localhost:3000

`src/index.css`

```
body {
  background: #eee;
  font-family: Ariel 
}
```

## Create a component to list out our books

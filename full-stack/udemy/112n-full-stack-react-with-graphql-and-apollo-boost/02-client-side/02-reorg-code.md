# Clean up App.js and add a `components` folder

`client/src/App.js`

* Make it look like this:

```
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return <div className="App">Home</div>;
  }
}

export default App;
```

## Delete the following:
* `App.test.js`
* `registerServiceWorker.js`

`client/src/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

* Remove both lines referring to `registerServiceWorker`
* Update paths because you will soon have a `components` folder

## Create `components` folder
`client/src/components`

* All our components will live there
* Move `App.js` and `App.css` inside `components`

## Run app
`$ npm start`

## But we need to run client and server at the same time
* And we already dealt with this in the server
* We added a script CLI command in the server's `package.json` that uses `concurrently` package to run both server and client simultaneously in same terminal tab
* If you did not use this, you would have to open two tabs and run the client in one and the server in the other

`$ npm run dev`

## Run script from app root (not client root)
* You will get an error because you are inside your `client` folder
* Back out of the folder into the root of your app

`$ cd ../`

* Now run the same script as before

`$ npm run dev`

* A new browser window will open that is running your react app and all you'll see is `Home`





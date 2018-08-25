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
* App.test.js
* registerServiceWorker.js

`client/src/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

* Remove both lines referring to registerServiceWorker
* Update paths because you will soon have a `components` folder

## Create `components` folder
`client/src/components`

* All our components will live there
* Move `App.js` and `App.css` inside `components`

## Run app
`$ npm start`

* Our app runs but we also want to run our server simultaneously with our client
* We could open two tabs in our terminal or we could save a step by using this script in our `package.json`

`package.json`

```
// MORE CODE

"scripts": {
  "server": "nodemon server.js",
  "client": "cd client && npm start",
  "dev": "concurrently --names \"server,client\" \"npm run server --silent\" \"npm run client --silent\""
},

// MORE CODE
```

* We do that with this:

`$ npm run dev`

* You will get an error because you are inside your `client` folder
* Back out of the folder into the root of your app

`$ cd ../`

* Now run the same script as before

`$ npm run dev`





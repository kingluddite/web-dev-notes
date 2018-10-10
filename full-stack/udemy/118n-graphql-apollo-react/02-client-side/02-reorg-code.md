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
`$ npm run dev`

## Run script from app root (not client root)
* You will get an error if you are not in the right location
* Know when you are in the server
* Know when you are in the client

* A new browser window will open that is running your react app and all you'll see is `Home`

## We now have Sass
* With create react app 2 you know longer have to "eject" just install in the client with:

`$ npm i node-sass` (it is a 5 minute install)

### Test sass with:

`App.js`

```
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
      </div>
    );
  }
}

export default App;
```

`App.scss`

```
.App {
  text-align: center;
  h1 {
    color: red;
  }
}

// MORE CODE
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Reorg React folder structure`

## Push to github
`$ git push origin add-react`





# Bootstrap our app
run meteor

`$ meteor`

remove all files inside `client`

add `main.html` and `main.js`

`client/main.html`

```html
<head>
  <title>MarkBin</title>
</head>

<body>
  <div class="render-target"></div>
  <!-- /.render-target -->
</body>
```

client/main.js

```
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';



ReactDOM.render(<App />, document.querySelector('.render-target'));
```

client/components/App.js

```
import React from 'react';

const App = () => {
  return (
     <p>App</p>
  );
};

export default App;
```

**note**

You might also see this written as:

```
import React from 'react';

export default () => {
  return (
     <p>App</p>
  );
};
```

## Error
If you forget to add the Meteor.startup() you'll have an error so modify `client/main.js` with this new code:

```
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';


Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
```

## View in browser
You should see our basic app boilerplate working with `App` rendered on the screen


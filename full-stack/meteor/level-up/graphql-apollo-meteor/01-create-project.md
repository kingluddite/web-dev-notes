# Create Project
https://www.meteor.com/install

`$ meteor create apollo --bare`

`$ cd apollo`

`$ meteor`

## Open files
Remove unneeded modules

`.meteor/packages`

* Remove any and meteor will automatically remove that package
    - remove reactive-var and save (meteor will remove it)

## Create /index.html

```
<head>
  <title>Apollo App</title>
</head>

<body>
  <div id="app"></div>
</body>
```

## Create /imports/ folder
* client/
    - init.jsk
* server/
* imports/
    - ui/
    - api/
    - startup/
        + client/
        + server/

## import the startup code
`client/init.js`

```
import '../imports/startup/client'
```

## View our app
`localhost:3000` and you'll see **Hello world**

## Setup meteor so that it is talking with React
`imports/ui/App.js`

```
import React from 'react';

const App = () => <h1>Hello world</h1>;

export default App;
```

`imports/startup/client/index.js`

```
import React from 'react';
import {Meteor} from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../../ui/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'))
});
```

* View in browser again and it is the same output but more structured


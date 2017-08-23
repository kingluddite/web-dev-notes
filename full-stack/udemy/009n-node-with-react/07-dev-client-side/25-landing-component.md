# Landing Component

## Update our Landing Content
* Make a functional Component
* Create `/client/src/components/Landing.js`

`Landing.js`

```
import React from 'react';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Emaily</h1>
    </div>
    <p>Collect feedback from your users</p>
  );
};

export default Landing;
```

* Import Landing into App

`App.js`

```
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
```

![centered landing](https://i.imgur.com/srkaooT.png)

## Next
* Make the logo clickable to send us back to the root of our app

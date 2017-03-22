# Accessing the URL with Route Params

`client/main.js`

Change our `bins` route from:

`<Route path="/bins" component={BinsMain} />`

To this

`<Route path="/bins/:binId" component={BinsMain} />`

**note** by defining a route with a `/:some-name` it sets up a **parameter** (kind of like a variable of sorts), now whenever user visits the route `/bins/abcd` (or any variation of `/bins/some-string`) they will automatically be matched up as a wild card to the route `/bins/blablabla`

And just as important the `BinsMain` Component will receive a `prop` of `binId` as well that contains the string of characters from the URL that matched up to this part of the URL. With this, the `BinsMain` component can figure out which `bin` to show to the user

### Let's test it out
`BinsMain.js`

```
import React, { Component } from 'react';

class BinsMain extends Component {
  render() {
    console.log(this.props.params.binId);
    return (
      <div>BinsMain</div>
    );
  }
}

export default BinsMain;
```

### Test in browser
Browse to `http://localhost:3000/bins/sayjoe!`

You will see `sayjoe!` in the console

We can remove the `console.log(this.props.params.binId);`




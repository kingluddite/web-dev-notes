# LinkCreate component
This will be the form the users use to enter their long URL and it will be transformed into the new link inside of our app

`client/components/LinkCreate.js`

This will be a `class-based` component

`LinkCreate.js`

```
import React, { Component } from 'react';

class LinkCreate extends Component {
  render() {
    return (
       <form>
         LinkCreate
       </form>
    );
  }
}

export default LinkCreate;
```

## Import it into our main Component

`main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import LinkCreate from './components/LinkCreate';

const App = () => {
  return (
    <div>
      <Header />
      <LinkCreate />
    </div>
  )
}

Meteor.startup(() =>{
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
```

## LinkCreate form
* Needs
    - label
    - input
    - button

`LinkCreate.js`

```
import React, { Component } from 'react';

class LinkCreate extends Component {
  render() {
    return (
       <form>
         <div className="form-group">
           <label htmlFor="shortenURL">Link to shorten</label>
           <input type="text" id="shortenURL" className="form-control" />
         </div>
         <button className="btn btn-primary">Shorten!</button>
       </form>
    );
  }
}

export default LinkCreate;
```

## Tangent
What is the exact flow of actions that needs to occur when a user submits a link?

![flow diagram](https://i.imgur.com/0lqdh0V.png)

On URL form Submit
1. User enters a URL
2. Validate the text input
   * User must enter a string
   * User must enter a valid URL
   * 12345 should be rejected
   * blablabla should be rejected
3. Create a new token that matches this URL
    * Token is just short random string of characters
    * We will take token and compare it to the saved URL in our links collection to determine if there is a match
    * If valid and there is a match we will redirect user to that URL
    * This token is a key part to how our app will work
4. Add the token and the URL to a collection
    * Whenever we get a URL we save it to our collection

## Next Up
Form submits and refs


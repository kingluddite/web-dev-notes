# Hide if not Auth
* Conditionally hide or show the button based on whether the user is logged in or now
* We'll use `withSession` component to pull this off
* **note** Here we'll use it directly instead of using the props that we passed down from root
* We log out `props` to make sure we are getting the session data on our props

`LikeGenealogy.js`

```
import React, { Component } from 'react';

// components
import withSession from '../withSession';

export class LikeGenealogy extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <button>Like</button>
      </div>
    );
  }
}

export default withSession(LikeGenealogy);
```

## Test in browser
* Browse to a single `genealogy` page
* Look at console and you'll see `refetch` and `session`
* `getCurrentUser` is set to `null` (since we are not logged in)

## Now we're ready to conditionally hide or show button depending on login state
* We need this check as soon as the component is mounted to our app so we will use the React Life Cycle `componentDidMount()`

`LikeGenealogy.js`

```
import React, { Component } from 'react';

// components
import withSession from '../withSession';

export class LikeGenealogy extends Component {
  state = {
    username: '',
  };

  componentDidMount = () => {
    console.log(this.props.session);

    if (this.props.session.getCurrentUser) {
      const { username } = this.props.session.getCurrentUser;
      console.log(username);
      this.setState({
        username,
      });
    }
  };

    render() {
      const { username } = this.state;

      return username && <button>Like</button>;
    }
  }

export default withSession(LikeGenealogy);

// MORE CODE
```

* Remove console.log()
* We log `getCurrentUser` when not logged in (it will be `null`)
* And when logged in, `getCurrentUser` will be the **user** object
* We store the `username` in the `state` and our logic checks if it exists:
    - And if it does, show the like button
    - And if it doesn't hide it

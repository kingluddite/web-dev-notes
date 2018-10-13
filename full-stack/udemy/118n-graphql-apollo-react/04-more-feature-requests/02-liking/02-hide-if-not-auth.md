# Hide if not Auth
* Conditionally hide or show the button based on whether the user is logged in or now

## User story
```
As a user I want to have the ability to like a cologne only if I am logged in so that I can keep track of all the colognes I like and prevent people not logged in from liking colognes
```

* We will keep this under the `like` feature branch and just make a commit statement that lets us know we added this feature
* We'll use `withSession` component to pull this off
* **note** Here we'll use it directly instead of using the props that we passed down from root

## Log to test values we get inside our component
* We log out `props` to make sure we are getting the session data on our props

`LikeCologne.js`

```
import React, { Component, Fragment } from 'react';

// custom components
import withSession from '../withSession';

class LikeCologne extends Component {
  render() {
    console.log(this.props);

    return (
      <Fragment>
        <button type="button">Like</button>
      </Fragment>
    );
  }
}

export default withSession(LikeCologne);
```

## Test in browser
* Browse to a single `Cologne` page
* Look at console and you'll see `refetch` and `session`
* `getCurrentUser` is set to `null` (since we are not logged in)

![log of session and refetch](https://i.imgur.com/IvsoTy7.png)

## Now we're ready to conditionally hide or show button depending on login state
* We need this check as soon as the component is mounted to our app so we will use the React Life Cycle `componentDidMount()`

`LikeCologne.js`

```
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// custom components
import withSession from '../withSession';

class LikeCologne extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
  };

  state = {
    username: '',
  };

  componentDidMount = () => {
    const { session } = this.props;
    console.log(`session: ${session}`);

    if (session.getCurrentUser) {
      const { username } = session.getCurrentUser;
      console.log(`username: ${username}`);
      this.setState({
        username,
      });
    }
  };

  render() {
    const { username } = this.state;

    return (
      <Fragment>
        <button type="button">Like</button>
      </Fragment>
    );
  }
}

export default withSession(LikeCologne);
```

* Remove `console.log()`
* We log `getCurrentUser` when not logged in (it will be `null`)
* And when logged in, `getCurrentUser` will be the **user** object
* We store the `username` in the `state` and our logic checks if it exists:
    - And if it does, show the like button
    - And if it doesn't hide it

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add hide if not auth`

## Push to github
`$ git push origin like`

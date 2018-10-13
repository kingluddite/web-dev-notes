# Add Signup Form
`Auth/Signup.js`

* Convert to a class-based component

```
import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <form className="form">
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email Address" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
          />
          <button type="submit" className="button-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;
```

## Test
`http://localhost:3000/signup`

* This is what you will see:

![signup form](https://i.imgur.com/nyiMyNC.png)

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add Signup Form`

## Push to github
`$ git push origin master`

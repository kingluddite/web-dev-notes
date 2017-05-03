# Navigate Between Routes
We can switch pages inside our Application two ways

1. Via **links** that show up in the browser
2. Via **JavaScript**
    - Programmatically switch what the user sees
    - Useful for when someone logs out, we'll have a **callback** function that fires, we'll clean up private data but we want to also send them from the private `/links` to the public `/`

![router diagram](https://i.imgur.com/OV7hLJA.png)

## History API
* Provided by your browser
* Just like all other JavaScript methods you can access this
* You don't need to install anything to get the History API
* [MDN history](https://developer.mozilla.org/en-US/docs/Web/API/History)
* **React Router** does not directly interact with the History API

### The **History API** is a building block
* It uses a Library called `History` (_designated as **History Library** in diagram but named it that just to differentiate it from the History API_)
* We have access to the History Library through `browserHistory` that we imported from **React Router**
    - We can use methods from `browserHistory` to enable us to programatically change routes
* Our Code and **React Router** send information to the **History Library** (_as an example... go back and go forward_)
* They can also listen to changes in the **History**
    - **React Router** does that to swap out the dynamic content
    - And our code can listen to do whatever we like when someone switches routes

## browserHistory Exposed!
### `Global Window object`
Let's play around with the methods to understand how they work

`client/main.js`

```
// more code
import Login from './../imports/ui/components/Login';

window.browserHistory = browserHistory;
// more code
```

After page refresh type `browserHistory` in `console`

![browserHistory in global Window](https://i.imgur.com/hg95lMN.png)

We will primarily use the `push` method to switch pages

Type this in the `console`:

`browserHistory.push('/signup')`

* And you will see you get taken to that **URL** `/signup`
    - And the `Signup` Component shows up on the screen
    - Also note that there was no full page refresh we were able to use the `History API` to swap out content without going through a refresh

## browserHistory.goBack()
Takes no arguments and does the same thing as the **back button** in the browser

## browerHistory.goForward()
The opposite of the `.goBack()` method

## browserHistory.go()
* Takes one argument
    - negative or positive number
        + negative goes back that number of pages
        + positive goes forward that number of pages

**React Router** bundles **History Library** inside of it and behind the scenes **History Library** uses the **History API**

[documentation of the history library](https://github.com/ReactTraining/history)

## Navigating via Link
* We can't use "regular anchor tags" when we are navigating internally in our app
* We can use "regular anchor tags" when navigating **externally** from our app
* If we want to navigate **internally** inside our app without a <u>full page refresh</u> we have to use **Link** that **React Router** gives us

`Login`

```
import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return(
      <div>
        <h1>Login to Short Link</h1>
        <h2>login form here</h2>

        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
};

export default Login;
```

## Exercise
Create a `Link` from the `Signup` page to the `Login` page

<details>
  <summary>Solution</summary>
`Signup.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router';

class Signup extends Component {
  render() {
    return(
      <div>
        <h1>Signup</h1>

        <Link to="/">Home</Link>  
      </div>
    );
  }
};

export default Signup;
```
</details>

**note** Remove `window.browserHistory = browserHistory;` from `client/main.js` as we don't need it anymore

## Fake Log Out with Event Handlers
In the `Link` Component create a programmatic link that will mimic someone logging out and when they do, they will be taken to the home page `/`

`Link`

```
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Link extends Component {
  render() {
    return (
      <div>
        <h1>Short Links</h1>
        <button onClick={() => {
           browserHistory.push('/');
        }}>Logout</button>
      </div>
    );
  }
};

export default Link;
```

You could also do it like this:

```
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Link extends Component {
  onLogout() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <h1>Short Links</h1>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
};

export default Link;
```

## binding `this`
You don't have to bind unless you are using `this` in your custom event handler but a lot of times people will just bind `this` anyway as it saves time if they ever decide to expand their event handlers

`<button onClick={this.onLogout.bind(this)}>Logout</button>`

**tip** - Bind all methods to `this` even if they don't use the binding. This makes changing and expanding methods a little easier later





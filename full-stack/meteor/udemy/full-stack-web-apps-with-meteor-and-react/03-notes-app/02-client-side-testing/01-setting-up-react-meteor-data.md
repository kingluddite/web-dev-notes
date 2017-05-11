# Setting up React-Meteor-Data
We will not set up properly the `handleLogout` prop for both production and development environments

## Remember the Score Keep app?
We set up `Tracker.autorun()` at the root of our app `client/main.js` and we then fetched our data and we were able to use `Tracker.autorun()` to rerun this function if the data ever changed. If the data did change, we used `ReactDOM.render()` passing in `<App />` and passing in the new prop information

Then we went into the App Component and saw that it did take the players but it didn't do anything with them, it just passed them down to `PlayerList`

And then inside `PlayersList` is the first time the **players** array is actually used (_even though it's used in `main.js` and `App.js` it doesn't need to be there_) it is simply getting passed a long

## We did solve this problem in shortlink app
We no longer queried our data at the root level because we set up React Router and instead we had to do something different

* We didn't have any info related to fetching links in `main.js`
* We didn't have any data related to fetching links in side of the `Link` Component we also didn't need to get data and pass it along
* The `Link` Component took zero `0` props

### How did we solve the problem in shortlink?
* We set up `Tracker.autorun()` inside of the `componentDidMount()` Lifecycle
* We created a cool container Component that knew how to fetch the data it needed
* It did not need to get those things passed in as props

### Time to improve
* We are going to improve on this technique
* Instead of setting up our own `Tracker.autorun()` calls inside of Components we define we will use a library instead that generates very simple Container Components for us
* At the end of the day we're really just going to be defining a single function, the `Tracker.autorun()` function and it will do everything else for us, allowing us to easily re-render a new Component when the data in our function changes

We first need to install

`$ npm install -S react-addons-pure-render-mixin`

We never use this directly but it required for the next thing we are installing

## Now we install a meteor app
`$ meteor add react-meteor-data`

This will create container Components that are responsible for fetching all of the data we need to render stuff to the screen

## If you used React and Redux...
Think of `react-meteor-data` like the Connect function from Redux

* `react-meteor-data` will take the place of Redux in this project

`Header.js`

Import `react-meteor-data`

`import { createContainer } from 'meteor/react-meteor-data';`

**note** We are no longer exporting `Header` as the **default export**

Now we will export `Header` as a **named export**

```
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export const Header = (props) => {

    return (
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">{props.title}</h1>
          <button className="button button--link-text" onClick={() => props.handleLogout() }>Logout</button>
        </div>
      </header>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
     handleLogout: () => Accounts.logout()
  };
}, Header);
```

* `createContainer()` takes two args
    - arg1 - function (similar to Tracker.autorun() - anything that `Header` needs to render itself will get defined inside of hear)
        + currently it will just be handleLogout()
        + But later down the road it could be the result of Database queries
    - arg2 - the Component you want to render to the screen (`Header`)
        + The Container Component that gets rendered is `stupid`, it doesn't actually render anything except for whatever you pass as `arg2`
            * It's whole purpose and job is to fetch the data required
    - returns something (our "containererized Component")
        + We export that so it can be used (export default)
    - Then we fill out the function
    - By default any props that get passed into the container Component (like `title`) will still get passed through
        + So we don't have to pass `props.title` into our Container, it is automatically passed
        + But we will have to pass handleLogout out so we need to return an object

```
return {
    // in here we specify all the props we want to pass all the props from the Container Component down to our presentational Component
    handleLogout: // gets called as a function so it better be one
}
```

```
export default createContainer(() => {
  return {
     handleLogout: () => Accounts.logout()
  };
}, Header);
```

This pattern is very similar to Flux and Redux

* You have your Component (plain old boring Component) that has no global dependencies
    - this means things like functions are passed is as props
    - and data is also passed in like props
    - That makes it easy to test this

```
export const Header = (props) => {

    return (
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">{props.title}</h1>
          <button className="button button--link-text" onClick={() => props.handleLogout() }>Logout</button>
        </div>
      </header>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};
```

But we do need a way to pass in real information in development and in production and that happens via the Container Component which knows how to generate `handleLogout()` and get it in to our presentational Component

Now after those changes we need to change the import code anywhere `Header` is used (because we just changed the exports)

# REVIEW THESE NOTES
change this in `Dashboard.js`

`import Header from './Header';`

Refresh the page and all our test cases are passing again

**note**
So now we have the raw `Header` Component and we have the default "Containerized" Component. 

In our test file `Header.test.js` we will grab the raw named export for `Header`

`import { Header } from './Header';`

We do this because we still want to specifize our mocked properties

But for development and production we will grab the default `Header` export which contains our "Containerized" Component

So inside `Dashboard` we import `import Header from './Header';`

We need to shut down test mode
And make sure we are still logged out

Shut down test server
`ctrl` + `c`

Run Meteor
`$ meteor`

* Now you should see the web app and not the web reporter
* Create a user, log in and see if you log out
* If you hang after clicking logout you code isn't working
* If you are redirected to the home page, your logout code is working

## Review
1. Inside of Dashboard we get our "Containerized" Component
2. We then render it and pass in a single prop

`<Header title="Dashboard" />`

3. But we wrote `Header` and it requires both `title` and `handleLogout()` and that is ok because `handleLogout` comes from the container Component

```
export default createContainer(() => {
  return {
     handleLogout: () => Accounts.logout()
  };
}, Header);
```

* The Container Component is a really dumb React Component
* It runs this function through Tracker.autorun() and anything that gets returned on this object gets passed down to the presentational Component as a prop and this is how we have both **title** and **handleLogout** successfully rendered inside our Application
    - One comes from `Dashboard`
    - And the other one comes from Container `createContainer()` call

Inside of our test suite this is great
We can take the one we wrote and pass in whatever we like
* I can pass in custom values for `props.title` and `props.handleLogout()`
    - Whether that is a string we test
    - Or Whether it is a `spy` we test


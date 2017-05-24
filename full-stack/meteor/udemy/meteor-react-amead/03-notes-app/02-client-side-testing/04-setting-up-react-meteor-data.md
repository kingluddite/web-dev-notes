# Setting up React-Meteor-Data


## Remember the Score Keep app?
`client/main.js`

```
Meteor.startup(() => {
  Tracker.autorun(() => {
    const players = Players.find({}, {sort: { score: -1 }}).fetch();
    const positionedPlayers = calculatePlayerPositions(players);
    const title = 'Score Keep';
    ReactDOM.render(<App players={positionedPlayers} title={title} />, document.getElementById('app'));
  });
});
```

1. We set up `Tracker.autorun()` at the root of our app `client/main.js`
2. And then we then fetched our data
    * Grab all players and sort by descending score
3. If the data ever changed `Tracker.autorun()` will rerun this function 
    - and `ReactDOM.render()` takes `<App />` and `<App />` takes **props**

### From `client/main.js` we go into the App Component
`App.js`

```
// more code
export default class App extends React.Component {
  render() {
    return (
      <div>
        <TitleBar title={this.props.title} subtitle="Created by Andrew Mead"/>
        <div className="wrapper">
          <PlayerList players={this.props.players}/>
          <AddPlayer/>
        </div>
      </div>
    );
  }
};
// more code
```

4. `App` Component did take the **players** but it didn't do anything with them
    - It just needed them to get them into `PlayerList`

### Diving into the PlayerList Component
`PlayerList.js`

```
// more code
export default class PlayerList extends React.Component {
  renderPlayers() {
    if (this.props.players.length === 0) {
// more code
```

5. And then inside `PlayersList` ---> this is the first time the **players** array is actually used
    - Even though it's used in `main.js` and `App.js` <u>it doesn't need to be there</u>
    - It is simply getting passed a long

## We did solve this problem in our shortlink app
We no longer queried our data at the root level because we set up **React Router** and had to do something different

* We didn't have any info in in `client/main.js` related to fetching links
* Also in `Link.js`, we didn't need to get data and pass it along
* The `Link` Component took zero `0` props

### How did we solve the problem in the shortlink app?
We modified `LinksList.js`

```
// more code
componentDidMount() {
  console.log('componentDidMount LinksList');
  this.linksTracker = Tracker.autorun(() => {
    Meteor.subscribe('links');
    const links = Links.find({
      visible: Session.get('showVisible')
    }).fetch();
   this.setState({ links });
  });
}
// more code
```

* We set up `Tracker.autorun()` inside of the `componentDidMount()` **Lifecycle**
* We created an awesome **Container Component** that knew how to fetch the data it needed
* <u>It did not need to get those things passed in as props</u>

### We are going to improve on this technique
* This new technique will be more sustainable
* Instead of setting up our own `Tracker.autorun()` calls inside of Components we define
    - We will use a Library that generates very, very simple Container Components for us
  - At the end of the day we're really just going to be defining a single function
    + the `Tracker.autorun()` function
    + And it will do everything else for us
        * Allowing us to easily re-render a new Component when the data in our function changes

## Install react-addons-pure-render-mixin
We never use this directly but it required by the next meteor package we will be installing

`$ yarn add react-addons-pure-render-mixin`

## Install react-meteor-data
This will create container Components that are responsible for fetching all of the data we need to render stuff to the screen

`$ meteor add react-meteor-data`

## Redux vs react-meteor-data
* Think of `react-meteor-data` like the **Connect** function from `Redux`
* `react-meteor-data` will take the place of `Redux` in this project

`Header.js`

Import `react-meteor-data`

`import { createContainer } from 'meteor/react-meteor-data';`

* We are no longer exporting `Header` as the **default export**
* Now we will export `Header` as a **named export**

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
// eslint has problems with this format
//export default createContainer(() => {
//  return {
//    handleLogout: () => Accounts.logout(),
//  };
//}, Header);

export default createContainer(() => ({
  handleLogout: () => Accounts.logout(),
}), Header);
```

* `createContainer()` takes two args
    - **arg1** - function (_similar to Tracker.autorun()_)
        + Anything that `Header` needs to render itself will get defined inside of here
        + Currently it will just be `handleLogout()`
        + But later down the road it could be the result of Database queries
    - **arg2** - The Component you want to render to the screen (`Header`)
        + The **Container Component** that gets rendered is `stupid`
        + It doesn't actually render anything except for whatever you pass as `arg2`
        + Its whole purpose and job is to fetch the data required
    - **returns** something (our "containererized Component")
    - We export that so it can be used (_export default_)
    - Then we fill out the function
    - By default any `props` that get passed into the **Container Component** (like `title`) will still get passed through
        + So we don't have to pass `props.title` into our Container, it is automatically passed
        + But we will have to pass `handleLogout()` out
        + So we need to <u>return an object</u>

```
return {
    // in here we specify all the props we want to pass from the Container Component down to our presentational Component
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

* You have your Component (_plain-old-boring Component_) that has no global dependencies
    - This means things like functions are passed is as `props`
    - And `data` is also passed in like `props`
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

* But we do need a way to pass in real information in development and in production
* And that happens via the **Container Component** which knows how to generate `handleLogout()` and get it into our presentational Component
* Now after those changes we need to change the import code anywhere `Header` gets imported (_because we just changed the exports_)

### Open `Header.test.js`
* This is for development
* In our test file `Header.test.js` we use the raw named export for `Header`
* We do this because we still want to specify our mocked properties

**Change this:**

`import Header from './Header';`

**To this:**

`import { Header } from './Header';`

* Refresh the page and all our test cases are passing again
* So now we have the raw `Header` Component
* And we have the default "Containerized" Component. 

## Open `Dashboard.js`
* Dashboard is already using the default export so we won't have to change it
* But you should check imports when converted Components to **Component Containers**

### Let's run the app outside of test mode
1. Shut down test mode

`ctrl` + `c`

2. Make sure we are still logged out

3. Run Meteor

`$ meteor`

### What should we see on the screen?
The **web app** and not the **web reporter**

1. Create a user
2. Log in
3. Log out

* If you hang after clicking logout <u>your code isn't working</u>
* <u>If you are redirected to the home page</u>, **your logout code is working**

## Review
1. Inside of Dashboard we get our **"Containerized Component"**
2. We render it and pass in a single `prop`

`<Header title="Dashboard" />`

3. Our `Header` Component requires both `title` and `handleLogout()`
    *  No problem because `handleLogout` now comes from our **Container Component**

```
// long way to write it
export default createContainer(() => {
  return {
     handleLogout: () => Accounts.logout()
  };
}, Header);

// or the ES6 preferred way to write it
export default createContainer(() => ({
  handleLogout: () => Accounts.logout(),
}), Header);
```

* The **Container Component** is a really, really dumb React Component
    - It runs this function through `Tracker.autorun()`
    - Anything that gets returned on this object gets passed down to the presentational Component as a `prop`
    - This is why we have **title** and **handleLogout** successfully rendered inside our Application
        + One comes from `Dashboard`
        + The other comes from container `createContainer()` call

### Good news for our Test Suite
* Inside of our test suite this is great
* We can take our Component (_the one we wrote_) 

`Header.js`

```
export const Header = (props) => {
// more code

  return (
    <header className="header">
      <div className="header__content">
        <h1>{props.title}</h1>
        <h2 className="header__slogan">{renderSlogan()}</h2>
        <div>
          <button className="button" onClick={() => props.handleLogout()}>Logout</button>
        </div>
        </div>
      </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  slogan: PropTypes.string,
};

// more code
```

* and pass in whatever we like
* I can pass in custom values for `props.title` and `props.handleLogout()`

Whether that is a string we test `Header.test.js`

```
// more code
it('should have h1 with title', function() {
  const title = 'Test title';
  const wrapper = mount( <Header title={title} /> );

  const h1Text = wrapper.find('h1').text();

  expect(h1Text).toBe(title);
});
// more code
```

Or whether it is a `spy` we test `Header.test.js`

```
// more code
it('should call handleLogout on click', function() {
  const spy = expect.createSpy();
  const wrapper = mount( <Header title="title" handleLogout={spy} /> );

  wrapper.find('button').simulate('click');
  expect(spy).toHaveBeenCalled();
});
// more code
```

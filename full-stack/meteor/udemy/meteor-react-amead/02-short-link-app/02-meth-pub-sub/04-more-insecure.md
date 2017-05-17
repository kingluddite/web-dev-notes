# Wrapping Up Insecure part of App
We want to get our list of links output to the screen in a very simple way

## Step 1 - Render Component to Screen
Create this new Component
`LinksList`

```
import React, { Component } from 'react';

class LinksList extends Component {
  render() {
    return (
      <div>
        <p>LinksList</p>
      </div>
    );
  }
};

export default LinksList;
```

This will be responsible for fetching the links from the database but it is also responsible for rendering all of the items

## `Link`
Import and render the `LinksList` Component 

```
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Links } from './../../api/links';
import LinksList from './LinksList';

class Link extends Component {
  onLogout() {
    Accounts.logout();
  }

  onSubmit(e) {
    const url = this.refs.url.value.trim();

    e.preventDefault();

    if (url) {
      Links.insert({ url });
      this.refs.url.value = '';
    }
  }

  render() {
    return (
      <div>
        <h1>Short Links</h1>
        <LinksList />

        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
};

export default Link;
```

**Step One Completed!**

## Step Two - Render Collection to Screen
How can we **render** the array of all the `links` Collection in our database onto the screen

### Using React Router makes how we do this change 
* Inside `client/main.js` we are not directly rendering a specific Component that we pass in to `ReactDOM.render()`
* There we were passing in our `router` and because of that we can't use `Tracker.autorun()` function to re-render the Application
    - Why?
    - Because what we were doing was when we were on a specific route

We need to figure out how the `LinksList` Component can call `Tracker.autorun()`, getting the information it needs and having that information updated live to the screen

## LifeCycle Methods
In order to do that we will be using two `LifeCycle` Methods

1. `componentDidMount()`
2. `componentWillUnmount()`

**note** When you are using a built-in LifeCycle Method it is very similar to using `render()`

* You never called `render()`
* It is called internally by the **React** code
* This is the same case for `componentDidMount()`

## componentDidMount()
When the Component first renders to the screen this function lets us hook into that event and do something

`LinksList`

```
class LinksList extends Component {
  componentDidMount() {
    console.log('componentsDidMount LinksList');
  }
```

* `componentDidMount()` gets called just after the Component renders
* Our `console.log()` will [show up in our console](https://i.imgur.com/cB1dTTw.png)

## componentWillUnmount()
* This gets called internally by **React** when the Component is removed from the screen
* We use this for clean up

```
componentWillUnmount() {
    console.log('componentsWillUnmount LinksList');
}
```

### Test it out
* **Log in** and you will see `componentsDidMount LinksList` in the console
* **Log out** and you will see `componentsWillUnmount LinksList` in the console

Now that we have these two `LifeCycle` Methods set up we are ready to integrate `Tracker.autorun()` directly into our LinksList Component

### Tracker.autorun()
* This will listen to our collection
* At first it will be empty
* Then when MiniMongo and DDP hook up, our collection will have items inside the array (if we added any)
* Any time the collection changes, `Tracker.autorun()` will rerun

### General idea
* Inside of `componentDidMount()` we're going to be setting up a `Tracker.autorun()` call
* We will grab all the links out of the MiniMongo Collection and we will render them to the screen (_similar to how we fetched all of the Players and rendered those to the screen_)

### Why are we doing this in the individual Component's LifeCycle Method?
Because we are using `React Router`, which means we can't just re-render the entire Application

### Why are we using componentWillUnmount()?
To clean up the `Tracker.autorun()` call (_It uses resources in the background and if you don't clean up and you have a bunch of `Tracker.autorun()`s running in the background, your Application will slow down and consume unnecessary resources_)

### Setting up `state` for `LinksList`
* It will be an array
* This array will store all the `links` that should be rendered
* If we use `state` we need to be using a **class-based** Component and we need to add a `constructor()` method

```
// more code
class LinksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  }
// more code
```

Now we're going to **cut** our `Tracker.autorun()` from `client/main.js`

**note** Also remove the `Links` named export from the imports

```
Tracker.autorun(() => {
  const links = Links.find().fetch();
  console.log('New links', links);
});
```

Paste it into our `LinksList` `componentDidMount()` LifeCycle method

```
componentDidMount() {
  console.log('componentsDidMount LinksList');
  Tracker.autorun(() => {
    const links = Links.find().fetch();
    console.log('New links', links);
  });
}
```

Here's our code so far:

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

`LinksList`

```
import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from './../../api/links';

class LinksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  }

  componentDidMount() {
    console.log('componentsDidMount LinksList');
    Tracker.autorun(() => {
      const links = Links.find().fetch();
      console.log('New links', links);
    });
  }

  componentWillUnmount() {
    console.log('componentsWillUnmount LinksList');
  }

  render() {
    return (
      <div>
        <p>LinksList</p>
      </div>
    );
  }
};

export default LinksList;
```

### Updating `state`
Currently, we just use a `console.log()` statement to output our list of `links`. 

* We need to change that
* We need to update the Component's (_LinksList_) `state`

We want to change the `links` **state**:

```
this.state = {
 links: []
};
```

To whatever this variable equals:

`const links = Links.find().fetch();`

So we do this:

```
componentDidMount() {
    console.log('componentsDidMount LinksList');
    Tracker.autorun(() => {
      const links = Links.find().fetch();
      // console.log('New links', links);
      this.setState({
        links
      });
    });
  }
```

And if you view the **React Dev tools** and search for `LinksList` Component, you will see that our `state` now has our list of links (_in an array_)

![links in state](https://i.imgur.com/ntDtUv4.png)

### Show me the Data!
As of right now, we have nothing that will render our list of `links` to the screen

## Exercise
Add this function call inside your `LinksList` Component

```
// more code
render() {
    return (
      <div>
        <p>LinksList</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
// more code
```

Then add that function inside `LinksList`

```
renderLinksListItems() {
    // You need to use .map()
    // map over all your links
    // render JSX with something like <p key>add url here</p>
  }
```

And your output should look something like this:

![output links list](https://i.imgur.com/6DogKkk.png)

<details>
  <summary>Solution</summary>
`LinksList`

```
import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from './../../api/links';

class LinksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  }

  componentDidMount() {
    console.log('componentsDidMount LinksList');
    Tracker.autorun(() => {
      const links = Links.find().fetch();

      this.setState({
        links
      });
    });
  }

  componentWillUnmount() {
    console.log('componentsWillUnmount LinksList');
  }

  renderLinksListItems() {
    return this.state.links.map((link) => {
      return <p key={link._id}>{link.url}</p>
    });
  }

  render() {
    return (
      <div>
        <p>LinksList</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
};

export default LinksList;
```
</details>

### Working with ESLint
You may get an ESLint error

```
renderLinksListItems() {
    return this.state.links.map(link => (
      <div key={link._id}>
        <p>{link.url}</p>
      </div>
    ));
}
```

or this:

```
renderLinksListItems() {
    return this.state.links.map(link => (
      <p key={link._id}>{link.url}</p>
    ));
  }
```

### Clean up
We need to stop our `Tracker.autorun()` call inside of `componentWillUnmount()`. In order to accomplish that we need to store the return value from `Tracker.autorun()` (_it has useful information_)

`LinksList`

```
componentDidMount() {
    console.log('componentsDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      const links = Links.find().fetch();

      this.setState({
        links
      });
    });
  }
```

* We just used the arbitrary name of `this.linksTracker`, it could be named anything but since we are naming it so we can use it later, we name it something that makes sense to us whenever we see it

## Stopping `Tracker.autorun()` with `.stop()`
`LinksList`

```
componentWillUnmount() {
    console.log('componentsWillUnmount LinksList');
    this.linksTracker.stop();
  }
```

* This stops the function from ever running again
* This means that although the `links` Collection might get updated this code will never run
* Once the Component is gone, we do not want to try to set the `state` as that would only cause errors

## Test
* Log out
* If you see no errors and you see your console message of `componentsWillUnmount LinksList`

Now we need to test if `this.linksTracker.stop()` is working

### Open the Mongo console
`> meteor mongo`

### Remove all links for the `links` Collection
`> db.links.remove({})`

* Remembering to pass `.remove()` and empty object `.remove({})`
* After you see your [links Collection is empty](https://i.imgur.com/tdPwa7q.png)
* log in
* then log out


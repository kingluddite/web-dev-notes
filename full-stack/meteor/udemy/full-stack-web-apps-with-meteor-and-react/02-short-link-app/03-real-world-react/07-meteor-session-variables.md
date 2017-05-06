# Meteor Session Variables
I only want to show links that are visible

`LinksList.js`

```
// more code
  componentDidMount() {

    console.log('componentsDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      const links = Links.find({
        visible: true
      }).fetch();

      this.setState({
        links
      });
    });
  }
// more code
```

Test it out and we'll see that when we click to hide links the hidden links are removed from our screen

* Change it to `visible: false` and the opposite will occur

## Task
We need to find a way to set the visible value to true or false inside our Collection query. We will use a **check** input field to toggle **true** or **false**

## Meteor Session package
* This lets us create a key/value store (similar to localStorage)
    - We can set/get values
    - But the cool thing is it is reactive (just like our queries)
* If we use the Session package inside of a `Tracker.autorun()` call we can do something when that value changes
* This is a `Client-side` package and therefore it is only meant for **Client-side** state management
* Showing our hiding our links is a great example for *Client-side** state because this is something that should not be stored inside the Database because it really is just temporary in the UI

## Session on Meteor
[Session Documentation](http://docs.meteor.com/api/session.html)

It is not built-in to Meteor so we must add it

`$ meteor add session`

**note** If you are paying attention to version installs you won't have to add any special version here as it will know which version to install based on the version of meteor you are running

## Test on the Client
We can't use the server to test this package as it is a `Client-side` only package

`client/main.js`

```
// more code
Session.set('name', 'Elvis Presley');
const name = Session.get('name');
console.log(`Name: ${name}`);
Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

And in the console we'll see after page refresh `Name: Elvis Presley`

## Why do we need this?
This looks similar to localStorage or Session storage so why would we ever use Meteor Session?

One reason - It is reactive. So if we use Session.get() inside of `Tracker.autorun()` the Session will rerun every time this value `Session('name')` changes - and this is exactly what we want and need

When our **filter** changes we want to re-render our links list

### Let's show how reactive Sessions work
`client/main.js`

```
// more code
Tracker.autorun(() => {
  const name = Session.get('name');
  console.log(`Name: ${name}`);
});

Session.set('name', 'Elvis Aaron Presley');
// more code
```

Once you hit save, you will see the page refreshes and the name in the console automatically updates

You can also type it directly inside your console to change the name

`> require('meteor/session').Session.set('name', 'Lisa Marie Presley')`

And this will show you:

![update Session](https://i.imgur.com/giqauIj.png)

## Task
We'll set `state` with our checkbox
Inside our Component we will be getting some `state`

Put `client/main.js` back to the way it was:

```
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes';
import './../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

## Set a default value for `showVisible`
`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // add this line
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes';
import './../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Session.set('showVisible', true); // add this line
  ReactDOM.render(routes, document.getElementById('app'));
});
```

## Update `LinksList.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'; // add this line

import { Links } from './../../api/links';
import LinksListItem from './LinksListItem';

class LinksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  }

  componentDidMount() {

    console.log('componentsDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      const links = Links.find({
        // we modified this line
        visible: Session.get('showVisible')
      }).fetch();

      this.setState({
        links
      });
    });
  }

  componentWillUnmount() {
    console.log('componentsWillUnmount LinksList');
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
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

## Exercise
Use the console to manually change the session using `Session.set()`. Change it so that `showVisible` will show all the links on the page

<details>
  <summary>Solution</summary>
```
> require('meteor/session').Session.set('showVisible', true)
```
</details>

## Next Up
Wiring up our checkbox to show and hide lists depending on if it is checked or not




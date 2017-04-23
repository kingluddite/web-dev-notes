# Controlled and Uncontrolled Inputs
The `checkbox` is an uncontrolled input

![uncontrolled input](https://i.imgur.com/BtNNX2u.png)

## Why is it called `an uncontrolled input`?
Because its value only ever gets set when a user interacts with the Application

## Problem
If our hidden list and checkbox are not in sync our app will not function properly and confuse our user

## Difference between uncontrolled and controlled inputs
![uncontrolled input diagram](https://i.imgur.com/AXonJbm.png)

### Uncontrolled Input
Let's focus on our `AddLink` Component

* This input, where the user types the input is a classic uncontrolled input
* This is a dummy input where the user types into it
* The only time we ever interact with it is in our `onSubmit` handler
    - onSubmit we:
        1. Fetch the value via a ref (`this.refs.url`)
        2. Perform some validation (optional)
        3. We may need to format the url (optional)
            * Add hyphens if its a SS# (111.22.3333) or phone# (111) 222-3333
        4. Display errors using `state`
        5. Do something with that value if we are error free
            * We could use Meteor.call() to trigger a Meteor Method
            * If not using Meteor we could use a HTTP Ajax call to send the data off to some server
* This is an uncontrolled input because we are never setting its value
    - The value is set by the user typing into the keyboard

## Controlled Input

![controlled input diagram](https://i.imgur.com/4QROpHq.png)
* This is a classic controlled input
    - Notice the circular pattern which give us fine grained control
        + If you want a button to clear the form, we could just wire it up to `this.setState({ error: ''})` and it would update our Component in real time
* We can use the same form with input and button
* Differences
    - We respond to changes in the input using `onChange`
        + We used this with our **checkbox**
    - The `onChange` event will fire every time the input field changes
        + When it changes what do we want to do?
            1. Fetch that input value from the DOM using the event object (our field will be the `e.target`)
            2. Validate/format - We can do this on every change of the input
            3. **most important** - We persist this data inside the Component `state`
                * We need to use this `state` to rerender the form
                * We could take the new URL value and place it inside the `input` making it a **controlled input**
                * This restricts what a user can type into an input
                * We can show errors if the value was not valid and this can be done in real time without requiring them to submit the form
            4. They will submit the form via `onSubmit()` handler but the bonus is the `onSubmit()` handler does a lot less work
                1. Do something with `state` value
                2. If all works as expected, clear errors and form field values (_just wipe our `state` and that will re-render our form without having to manage the DOM directly_) and call it a day!

## Time to put this into Practice and start coding
`AddLink.js`

Here is our starting point

```
import React, { Component } from 'react';

class Header extends Component {
  onSubmit(e) {
    const url = this.refs.url.value.trim();

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url);
      this.refs.url.value = '';
    }
  }

  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
};

export default Header;
```

## We need to work with `state`
So we need to add a constructor function

```
import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'Elvis was here'
    };
  }
// more code
render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" value={this.state.url} />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
};

export default Header;
```

* We set our input value to some text to test that it is working with `state`
* We use **value** for input and we would use **check** for `checked` input or `radio` button
* We no longer can type into the `input` field
* We get a new warning `Warning: Failed form propType: You provided a 'value' prop to a form field without an 'onChange' handler. This will render a read-only field. If the field should be mutable use 'defaultValue'. Otherwise, set either 'onChange' or 'readOnly'. Check the render method of 'Header'.`

## Format our input code and add `onChange` event
```
// more code
<input
  type="text"
  ref="url"
  placeholder="URL"
  value={this.state.url}
  onChange={this.onChange.bind(this)}
/>
// more code
```

## Add our `onChange()` hander
```
// more code
onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }

  render() {
// more code
```

* We use the event object to grab the value in the input
* We can use `trim()` and that will prevent the user from adding spaces into the input field which is great for our `url` but we will perform that validation in our Meteor Method so we will remove `trim()`

```
// more code
onChange(e) {
    this.setState({
      url: e.target.value
    });
  }

  render() {
// more code
```

## Update our `onSubmit` handler
Change this:

```
// more code
onSubmit(e) {
    const url = this.refs.url.value.trim();

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url);
      this.refs.url.value = '';
    }
  }
// more code
```

To this final code:

```
import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ''
    };
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '' });
        }
      });
    }
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }

  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={this.onChange.bind(this)}
          />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
};

export default Header;
```

* We set the `state` of **url** to an empty string when our Component first is rendered to the screen
* We use ES6 destructuring as it is a common technique you will see a lot
* We pass a third argument to Meteor.call() that will enable us to grab any errors and we'll only clear the input field if there is no error and at the same time we clear out our `state`
* We set the current input value to our `url` state

### Test it out
* Enter a bad url and we'll see the console error. We'll add a modal error later to clean this up
* Enter a good URL, and paste that shortUrl generated into the address bar to see if it links to the correct URL

## Review
General Process for converting an uncontrolled input into a controlled input

* You provide a `value` and an `onChange` handler and you add glue to wire it all up
* Instead of directly manipulating the DOM, we manipulate the `state` and that in turn will get React to manipulate the DOM for us and the screen updates for the user accordingly
* We will use this technique to the `LinksListFilters` to fix the problem with our **checkbox**

## We will need to use LifeCycle events
So we need to convert our Stateless functional component to a class-based Component

`LinksListFilter.js`

```
import React from 'react';
import { Session } from 'meteor/session';

export default () => {
  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => {
          Session.set('showVisible', !e.target.checked);
        }} />
        show hidden links
      </label>
    </div>
  )
}
```

And we'll convert it to a class-based Component

```
import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class LinksListFilters extends { Component } {
  render() {
    return (
      <div>
        <label>
          <input type="checkbox" onChange={(e) => {
            Session.set('showVisible', !e.target.checked);
          }} />
          show hidden links
        </label>
      </div>
    );
  }
};
```

## We will be maintaining `state` so we need our constructor

```
import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class LinksListFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: false
    };
  }
  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={(e) => {
            Session.set('showVisible', !e.target.checked);
            }}
          />
          show hidden links
        </label>
      </div>
    );
  }
};
```

* We use `checked={!this.state.showVisible}` and that will allow us to show our checkbox "checked" or "unchecked" (using `true` or false which is stored in our `state` of `showVisible`)
* We use `!` because if `showVisible` is **true** we don't want to show the box so we set the `checkbox` to be the opposite of our current `showVisible` state
* We set `showVisible` to **false** by default so that as we load our Component it will be checked

**important** Change `showVisible` to **true** as we want to no show hidden links by default

```
// more code
export default class LinksListFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    };
  }
// more code
```

## Exercise
* Inside `LinksListFilter` use two LifeCycle React events `componentDidMount()` and `componentWillUnmount()`
* Inside each set up `Tracker.autorun()` calls to watch for changes to `showVisible` (anytime `showVisible` changes - either through a click or through other code, we want to check this box by setting the `state`))
    - **hint** Remember when we used this code in `LinksList`?

```
// more code
  componentDidMount() {

    console.log('componentsDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();

      this.setState({
        links
      });
    });
  }
// more code
```

* Also cancel the `Tracker.autorun()` call similar to `LinksList` in `componentWillUnmount()`
* Test
    - In console use `require('meteor/session').Session.set('showVisible', false)` and that should not only show hidden links but is should also check the box

<details>
  <summary>Solution</summary>
  `LinksListFilters.js`

```
import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    };
  }
  componentDidMount() {
    console.log('componentsDidMount LinksListFilters');
    this.linksFilterTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }
  componentWillUnmount() {
    console.log('componentsWillUnmount LinksListFilters');
    this.linksFilterTracker.stop();
  }
  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={(e) => {
            Session.set('showVisible', !e.target.checked);
            }}
          />
          show hidden links
        </label>
      </div>
    );
  }
};
```
</details>

# Single Responsibility React
## Single Responsibility Principle
Make sure all your React Components are just responsible for one thing if not they will be:

* Hard to use
* Difficult to update
* Difficult to test

## Analyze Current `Link` Component
It is responsible for lots of stuff right now:

* It is reponsible for rendering and managing the header area
* It is responsible for rendering the `LinksList` Component
* It is responsible for managing and rendering the form that inserts new links

### What's the big deal? The file is only 37 lines
The problem is if we try to reuse anything we wrote

* If I want another page with a header, I have to duplicate [this highlighted code](https://i.imgur.com/NqX6Wjv.png)
* If I want to reuse the form I have to take [this highlighted code](https://i.imgur.com/2F9bJ8g.png) and duplicate it (_form and handler_)
* Both of these should be their on Components so we can easily resuse and extend (_scale_) them

## Exercise
* Create new components
    - `AddLink.js`
        + Move necessary handler to this Component
    - `Header.js`
        + Takes `title` **prop**
        + Add **PropType** that requires this **prop**
        + Move `logout()` handler and necessary import
    - Make sure to upate `Link` to include new Component instances and only use necessary `import` statements

<details>
  <summary>Solution</summary>
`Link.js`

```
import React, { Component } from 'react';
import Header from './Header';
import LinksList from './LinksList';
import AddLink from './AddLink';

class Link extends Component {
  render() {
    return (
      <div>
        <Header title="Your Links" />
        <LinksList />
        <AddLink />
      </div>
    );
  }
};

export default Link;
```

`AddLink.js`

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

`Header.js`

```
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

class Header extends Component {
  onLogout() {
    Accounts.logout();
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
};

Header.propTypes = {
  title: PropTypes.string.required
}


export default Header;
```
</details>




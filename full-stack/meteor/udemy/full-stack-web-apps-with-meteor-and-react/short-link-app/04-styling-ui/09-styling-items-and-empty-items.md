# Styling Items and Empty Items
## Exercise
`LinksList`

```
renderLinksListItems() {

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    });
  }
```

* Add an if statement that checks if there are no links
    - If there are none
        + render a `div` with a nested `p` with the text "No Links Found"

<details>
  <summary>Solution</summary>
```
renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div>
          <p>No Links Found</p>
        </div>
      );
    }

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    });
  }
```

![No Links Found](https://i.imgur.com/OLFdQQk.png)
</details>

**note** Remove `<p>LinksList</p>` from **LinksList.js**

Also this code with nested `div` tags is redundant but we'll work on it soon

```
render() {
    return (
      <div>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
```

## Create `_item.scss` and import it

```
.item {
  background: $item-bg;
  border: 1px solid $item-border;
  margin-bottom: $space;
  padding: $space;
}

.item__message {
  color: $item-text-color;
}

.item__status-message {
  color: $item-text-color;
  font-style: italic;
  text-align: center;
  margin: 0;
}
```

`_variables.scss`

```
// Colors
$brand-primary: #5b4681;
$grey: #dddddd;
$white: #ffffff;
$light-grey: #f9f9f9;
$dark-grey: #777777;


// Spacing
$space: 1.4rem;
$site-max-width: 50rem;

// Font sizes
$base-font-size: 1.4rem;
$large-font-size: 1.8rem;

// Header
$header-bg: $brand-primary;
$header-color: $white;
$header-link-color: $white;

// Form inputs
$input-border: $grey;
$input-spacing: 1rem;

// Boxed view
$boxed-view-overlay-bg: $grey;
$boxed-view-bg: $white;

// Links
$link-color: #000000;

// Button
$button-bg: $brand-primary;
$button-color: $white;
$button-pill-color: $brand-primary;
$button-default-bg: $light-grey;
$button-default-color: $dark-grey;
$button-default-border-color: $grey;

// item
$item-bg: $light-grey;
$item-border: darken($item-bg, 8%);
$item-text-color: $dark-grey;
```

`_button.scss`

```
.button--pill {
  background-color: transparent;
  border: 1px solid $button-pill-color;
  color: $button-pill-color;
  padding: 0.3rem 0.8rem;
  margin: 0 ($space / 2) 0 0;
}
```

`LinksList.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

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
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    }

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
};

export default LinksList;
```

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
    this.linksFilterTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }
  componentWillUnmount() {
    this.linksFilterTracker.stop();
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box"
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

`_main.scss`

```
@import './variables';
@import './base';
@import './components/boxed-view';
@import './components/button';
@import './components/header';
@import './components/page-content';
@import './components/checkbox';
@import './components/item';
```




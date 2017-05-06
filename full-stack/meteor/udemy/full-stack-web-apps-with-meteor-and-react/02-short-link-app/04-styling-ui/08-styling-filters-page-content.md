# Styling Filters and Page Content
We add a div so we can center three Components

`Link.js`

```
import React from 'react';

import Header from './Header';
import LinksList from './LinksList';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
      return (
        <div>
          <Header title="Your Links" />
          <div className="page-content">
            <LinksListFilters />
            <AddLink />
            <LinksList />
          </div>
        </div>
      );
}
```

## Exercise
* Create a new Sass component for **page-content**
* Add a selector
* Set **max-width** equal to our config value
* Set **margin** to auto on sides center
* Set **padding** to our `space` variable value

<details>
  <summary>Solution</summary>
`_page-content.scss`

```
.page-content {
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $space;
}
```

Remember to import with `@import './components/page-content';`

Should look like this:

![center page content](https://i.imgur.com/FgrM41A.png)
</details>

## Style Checkbox
`_checkbox.scss` (remember to import it!)

```
.checkbox {
  display: block;
  margin-bottom: $space;
}

.checkbox__box {
  margin-right: $space / 2;
}
```

Add classes to `LinksListFilters.js`

```
import React, { Component } from 'react';
import { Session } from 'meteor/session';
// import { Tracker } from 'meteor/tracker';

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

![styled checkbox](https://i.imgur.com/wecP6Op.png)

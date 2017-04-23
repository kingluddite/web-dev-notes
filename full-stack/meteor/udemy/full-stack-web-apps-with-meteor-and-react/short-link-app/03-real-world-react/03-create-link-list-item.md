# Creating `LinkListItem` Component

## Grab the complete URL
We can use a Meteor Method to grab this

In the console type:

`> require('meteor/meteor').Meteor.absoluteUrl()`

That will return `"http://localhost:3000/"`

![Meteor Absolute URL](https://i.imgur.com/KhGSIhC.png)

## absoluteUrl() takes an optional argument
It appends the string argument to the Absolute URL

![append arg](https://i.imgur.com/U0GjQki.png)

* We will use this to not pass in `about` we'll use it to pass in our unique url `_id`

## Exercise
* Create `LinksListItem.js` as an ES6 class-based Component (We will be adding complexity to it so we'll need it to be a class-based Component)
* Use `this.props` to grab the `url` and the `shortUrl` and render to the screen
* Define PropTypes for `url`, `shortUrl`, `_id` and `userId`
* Test and make sure the app is working
    - Visit the short URLs in the browser and make sure they are working properly

<details>
  <summary>Solution</summary>
`LinksListItem.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LinksListItem extends Component {
  render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
       </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

export default LinksListItem;
```
</details>

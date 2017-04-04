# Navigating with Link tags
## Manual routes
We can manually change routes

## Better routes
We want to build our route changes into our navigation links

## Traditional Application
We would use anchor tags `<a href="some-link.html">About Us</a>`

## React Router doesn't use anchor tags
When we want to navigate around inside our React application

### Why? 
Because with **React Router** we are not navigating to different HTML pages we are just showing and hiding different sets of Components on the screen

## The Link tag
We use this in **React** instead of anchor tags

### Import Link
`Header.js`

```
import React, { Component } from 'react';
import Accounts from './Accounts';
import { Link } from 'react-router'; // add this line
```

### All about Link
`Link` is an actual Component that we can place inside any `render()` method

Change this line:

`<a href="" className="navbar-brand">Markbin</a>`

To this:

`<Link to="/" className="navbar-brand">Markbin</Link>`

## Test in browser
You will see that it takes you to your home route (_it also updates the URL in the address_)

## Add Link to take us to individual bin
First, import `Link` Component

`import { Link } from 'react-router';`

`BinsList`

```
renderList() {
  return this.props.bins.map(bin => {
    const url = `/bins/${bin._id}`; 
     return (
      <li className="list-group-item" key={bin._id}>
        <Link to={url}>Bin {bin._id}</Link>
        <span className="pull-right">
          <button
            className="btn btn-danger"
            onClick={() => this.onBinRemove(bin)}>
            Remove
          </button>
        </span>
      </li>
    );
  });
}
```

* Because we are creating a more complicated URL we create our own variable and use this:

`const url = ``/bins/${bin._id}``;`

* We also formatted our code nicer to make it easier to read and understand
* We can break up our props on their own lines like:

```
<button
  className="btn btn-danger"
  onClick={() => this.onBinRemove(bin)}>
  Remove
</button>
```

* Our new `Link` looks like `<Link to={url}>Bin {bin._id}</Link>`

### Test in browser
When you click on a **Link**, you are taken to that **URL**, the [address updates](https://i.imgur.com/85pciQI.png) and because it matches one of our particular routes, we are served the `BinsMain` Component

**note** Hovering over URLs [shows you the new URL that we generated](https://i.imgur.com/fBYi9UE.png)

## Next Challenge
When we click `Create Bin` we want to not only show the `CreateBin` Component but we also want to update the Address with the new URL of that new `bin`



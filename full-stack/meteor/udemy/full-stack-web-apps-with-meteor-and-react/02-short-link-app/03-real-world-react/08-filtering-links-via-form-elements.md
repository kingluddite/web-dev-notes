# Filtering Links via Form Elements
We will create a new Component to add this functionality

## Exercise
Create `LinksListFilters` and wire it up with super basic functionality

<details>
  <summary>Solution</summary>
`LinksListFilters.js`

```
import React from 'react';

export default (props) => {
  return (
    <div>LinksListFilters</div>
  )
}
```

* We used a Stateless functional component
* We don't need `props` so we don't pass them to the Stateless functional component

`Link.js`

```
import React from 'react';
import Header from './Header';
import LinksList from './LinksList';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters'; // add this line

export default () => {
      return (
        <div>
          <Header title="Your Links" />
          {/* add this line */}
          <LinksListFilters />
          <LinksList />
          <AddLink />
        </div>
      );
}
```
</details>

## Add our checkbox
`LinksListFilters.js`

```
import React from 'react';

export default () => {
  return (
    <div>
      <label>
        <input type="checkbox" />
        show hidden links
      </label>
    </div>
  )
}
```

* Placing the `input` inside the label is important as that will only allow us to toggle the checkbox if we click on `show hidden links` (_if input is outside the label, it will not toggle on click_)

## onClick, onSubmit and now onChange
* onChange lets us fire an event when an input changes

`LinksListFilters.js`

```
import React from 'react';

export default () => {
  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => {
          console.log(e.target.checked);
        }} />
        show hidden links
      </label>
    </div>
  )
}
```

* We want to use `e` because we want to grab the elements value
* Test in browser and toggling checkbox shows you **true** if checked and **false** if unchecked

## Exercise
Wire up the checkbox to show or hide our list depending if it is checked or not

<details>
  <summary>Solution</summary>
`LinksListFilters.js`

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

* We use `!e.target.checked` because we want the opposite value when we click the checkbox
</details>

## Houston we have a problem
If you run this inside your console:

`> require('meteor/session').Session.set('showVisible', false)`

You will see all the links are visible but the checkbox does not automatically get checked. That form field is known as an `uncontrolled input`

## Next
We'll address this issue and `uncontrolled inputs` next 

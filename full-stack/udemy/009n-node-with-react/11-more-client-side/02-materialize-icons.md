# Materialize Icons
* Visit `/surveys` and you'll see our `Dashboard` Component with the "Dashboard" text

## Adding icons
* Visit [materializecss.com](http://materializecss.com/)
* Search for buttons
* Select buttons.html
* Scroll down to fixed action button
* Hover over pencil icon and you'll see the effect
* We don't want the effect
* We just want the red button
* We'll edit the code to this:

`Dashboard.js`

```
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
```

* We have our button

![button added](https://i.imgur.com/cM2q3vS.png)

* But we need to work on it

## We need to add a icon
* Replace our `ADD` test with an icon
* Search for icons and select icons.html
* Documentation tells us we need to add `link` tag pointing to where all the icons are on Google
* Then we add this `<i class="material-icons">add</i>` and replace the word `add` with any of the 932 icons on this page (just change the name and put it inside the `i` element open and closed tags)

## Add new icon link tak
`/client/public/index.html`

```html
// more code
<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
// more code
```

### Test in browser
![we have our red button with icon](https://i.imgur.com/JkVFhh6.png)

### Update our link to Link
`Dashboard.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
```

* Click add button and it will take you our SurveyNew Component
* Click logo and you go back to the home page of the logged in user
* You can easily go back and forth

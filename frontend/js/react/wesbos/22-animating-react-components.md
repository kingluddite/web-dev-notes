# Animation with React
## The fold animation

```css
input#fold:not(:checked) ~ #main .team-of-the-day > * {
  transform: none;
}

label[for="fold"] {
  position: absolute;
  top: 1rem;
  left: 1rem;
  text-transform: uppercase;
  font-size: 1.3rem;
  background: #000;
  color: #fff;
  border: 2px solid #000;
  cursor: pointer;
  padding: .5rem 1rem;
}

input#fold {
  display: none;
}

input#fold:checked + label {
  background: #fff;
  color: #000;
}
```

## CSS
Editing and recompiling

`$ npm start` - runs react-scripts (webpack)

But we also want to run sass

Create ./sass/main.scss

```
.example {
    h1 {
        color: green;
    }
}
```

Replace css link to sass link

```
// import './css/style.css'; comment this out
import './sass/main.css'; // add this line
```

## Compile Sass

First, let’s install the command-line interface for Sass:

```
$ npm install node-sass --save-dev
```

## Install npm-run-all
You may find it convenient to run watch-css automatically with npm start, and run build-css as a part of npm run build. You can use the && operator to execute two scripts sequentially. However, there is no cross-platform way to run two scripts in parallel, so we will install a package for this:

`$ npm install --save-dev npm-run-all`

## Update `package.json`
```
{
  "name": "cotd",
  "version": "0.0.1",
  "private": true,
  "devDependencies": {
    "autoprefixer-stylus": "0.10.0",
    "babel-eslint": "^7.1.1",
    "concurrently": "3.0.0",
    "eslint": "^3.12.2",
    "eslint-plugin-flowtype": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^3.0.2",
    "eslint-plugin-react": "^6.8.0",
    "node-sass": "^4.5.0",
    "npm-run-all": "^4.0.2",
    "react-scripts": "0.6.1",
    "stylus": "0.54.5"
  },
  "dependencies": {
    "history": "4.2.0",
    "re-base": "2.2.0",
    "react": "15.3.2",
    "react-addons-css-transition-group": "15.3.2",
    "react-dom": "15.3.2",
    "react-router": "4.0.0-alpha.4"
  },
  "scripts": {
    "start-js": "react-scripts start",
    "start": "npm-run-all -p watch-css start-js",
    "build": "npm run build-css && react-scripts build",
    "watch": "concurrently --names \"webpack, stylus\" --prefix name \"npm run start\" \"npm run styles:watch\"",
    "build-css": "node-sass src/ -o src/",
    "watch-css": "npm run build-css && node-sass src/ -o src/ --watch",
    "eject": "react-scripts eject",
    "styles": "stylus -u autoprefixer-stylus ./src/css/style.styl -o ./src/css/style.css",
    "styles:watch": "stylus -u autoprefixer-stylus -w ./src/css/style.styl -o ./src/css/style.css"
  },
  "eslintConfig": {
    "extends": "./node_modules/react-scripts/.eslintrc"
  }
}

```

This is what we added to `scripts` in `package.json`

![added to scripts](https://i.imgur.com/wkb74eK.png)

Now running `$ npm start` and `$ npm run build` also builds Sass files. Note that `node-sass` seems to have an issue recognizing newly created files on some systems so you might need to restart the watcher when you create a file until it’s resolved.

## Good Practice
At this point you might want to remove all CSS files from the source control, and add `src/**/*.css` to your `.gitignore` file. It is generally a good practice to keep the build products outside of the source control.

We are going to automatically generate css every time we save. It will take our `main.scss` file and create a `main.css` file that will import all our partials code.

### Import the CSS not the SASS
`import style from './css/main.css';`

Notice we are not pointing to the `main.scss` file. When the Sass works it's magic it will create a CSS file and that is what we want to import and that will be injected into our `bundle.js` file

![css inside bundle.js](https://i.imgur.com/AEKKtlP.png)

### Updated Git to have Sass instead of Stylus
[Grab code])https://github.com/kingluddite/react-wb)

## CSSTransitionGroup
Not everyone uses css transitions with React so react maintains it but puts it inside it's own package

`Lineup.js`

```
import React from 'react';
import { formatPrice } from '../helpers.js';
import CSSTransitionGroup from 'react-addons-css-transition-group'; // add this
```

Change the `render()` return from:

```
return (
  <div className="lineup-wrap">
    <h2>Your Starting Lineup</h2>
    <CSSTransitionGroup className="lineup">
      {lineupIds.map(this.renderLineup)}
      <li className="total">
        <strong>Total:</strong>
        {formatPrice(total)}
      </li>
    </CSSTransitionGroup>
  </div>
)
```

To:

```
return (
  <div className="lineup-wrap">
    <h2>Your Starting Lineup</h2>
    <CSSTransitionGroup
      className="lineup"
      component="ul"
      transitionName="lineup"
      transitionEnterTimeout={5000}
      transitionLeaveTimeout={5000}
    >
      {lineupIds.map(this.renderLineup)}
      <li className="total">
        <strong>Total:</strong>
        {formatPrice(total)}
      </li>
    </CSSTransitionGroup>
  </div>
)
```

* We replace `ul` with CSSTransitionGroup but we still want to output a `ul` so we add the `component="ul"` and if you view source you'll see `ul` but if you view React tab you'll see `CSSTransitionGroup`

### Change transition time to 5 seconds
```
transitionEnterTimeout={5000}
transitionLeaveTimeout={5000}
```

Add players to lineup

`<li class="lineup-leave lineup-leave-active"><span>` - You see in inspector that when you delete a player from the lineup these classes appear for 5 seconds and then disappear

React gives us these classes and we can hook into with our CSS

## Add `_animations.scss`
```
.lineup-enter {
  background: #f00;

  &.lineup-enter-active {
    background: #ff0;
  }
}
```

* Add import to `main.scss`

`@import 'animations';`

### View in browser
Add a player to the roster and it will be yello for 5 seconds

In CSS transitions we need a start color and an end color (to transition from one color to another color)

```
.lineup-enter {
  background: #f00;
  transition: all 0.5s;

  &.lineup-enter-active {
    background: #ff0;
  }
}
```

View in browser again and when you add a player it will go from red to yellow in a half of second

### Slide in/out animation
Use inspector Elements tab to highlight Lineup `li` and change the `element.style {}` under the `Styles` tab to `transform: translateX(-120%)`. Use your up arrow on the keyboard to increase the value and watch how it slides in the screen

![slide in screen](https://i.imgur.com/zbfZUQB.png)

```
.lineup-enter {
  background: #f00;
  transition: all 0.5s;
  transform: translateX(-120%);
  max-height: 0;
  padding: 0 !important;

  &.lineup-enter-active {
    background: #ff0;
    max-height: 60px;
    padding: 2rem 0 !important;
    transform: translateX(0);
  }
}
```

You can remove the background colors for a more subtle effect
Reduce back to 1/2 second

```
transitionEnterTimeout={500}
transitionLeaveTimeout={500}
```

## Number Animation (`Lineup.js`)
Update return of `renderLineup()` to:

```
return (
  <li key={key}>
    <span>
      <CSSTransitionGroup>
        <span key={count}>{count}</span>
      </CSSTransitionGroup>
      {player.firstName} {removeButton}
    </span>
    <span className="price">{formatPrice(count * player.fee)}</span>
  </li>
)
```

* A `key` is needed so react knows which item is leaving and which item is staying

```html
<span>6</span>
<span>5</span>
```

```
return (
  <li key={key}>
    <span>
      <CSSTransitionGroup
        component="span"
        className="count"
        transitionName="count"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        <span key={count}>{count}</span>
      </CSSTransitionGroup>
      {player.firstName} {removeButton}
    </span>
    <span className="price">{formatPrice(count * player.fee)}</span>
  </li>
)
```

Now view in browser and add a lineup and the number will briefly show then hide. Increase timeout from 250 to 2500 for both enter and leave

```
transitionEnterTimeout={2500}
transitionLeaveTimeout={2500}
```

To see the DOM react works with and how it adds and removes them

![dom added](https://i.imgur.com/2n1sR6t.png)

* Put both back to 250 milliseconds

Add our final animation

```
/* number increase/decrease animation */
.count-enter {
  transition: all 0.25s;
  transform: translateY(100%); // start off screen
  &.count-enter-active {
    transform: translateY(0); // end in normal resting spot
  }
}

.count-leave {
  transition: all 0.25s;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(0); // start at normal resting spot
  &.count-leave-active {
    transform: translateY(-100%); // end on screen
  }
}
```



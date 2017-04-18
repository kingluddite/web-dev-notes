# Rendering Everything with App Component
![wireframe](https://i.imgur.com/GnVLEbQ.png)

## Make the `slogan` prop optional

In `client/main.js` change `<TitleBar title={title} slogan={slogan} />` into `<TitleBar title={title} />` and comment out the `slogan` variable

And remove the `isRequired` from PropTypes:

`TitleBar`

Change

```
TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  slogan: PropTypes.string.isRequired
}
```

To

```
TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  slogan: PropTypes.string
}
```

But currently the `h2` element is still getting rendered to the screen, even though it is empty:

![empty h2 still rendered](https://i.imgur.com/EHYkxq5.png)

Currently, this is not a problem but as we add CSS it will become a problem so we need to prevent it from being rendered when it is empty

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TitleBar extends React.Component {
  renderSlogan() {
    if (this.props.slogan) {
      return <h2>{this.props.slogan}</h2>;
    } else {
      return;
    }
  }

  render() {
    return (
       <div>
         <h1>{this.props.title}</h1>
         {this.renderSlogan()}
       </div>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  slogan: PropTypes.string
}

// TitleBar.defaultProps = {
//   title: 'Default title'
// };

export default TitleBar;
```

### Test
You won't see the empty `h2` element anymore but if you add a `slogan` prop inside `<Titlebar slogan={slogan} />` you will then see the slogan rendered inside the `h2`

**notes**

* Inside of JSX if you use `{undefined}` or `{null}` it gets completely ignored by the JavaScript expression and the rendered JSX does not change at all (_It acts as if those two things don't even exist_)
  - So we don't need an `else` part of our `if` statement
  - If there is a `slogan` we'll return the `slogan` but if there is no slogan we'll implicitly return `undefined`
* If you do not explicitly return something from a function, the function implicitly returns `undefined`

Change this:

```
renderSlogan() {
    if (this.props.slogan) {
      return <h2>{this.props.slogan}</h2>;
    } else {
      return;
    }
  }
```

To this:

```
renderSlogan() {
    if (this.props.slogan) {
      return <h2>{this.props.slogan}</h2>;
    }
  }
```

## We will create the App Component
This is moving files and content around and will make our Score Keep app a lean mean fighting machine

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from './../imports/ui/components/App';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();
    const title = 'Score Keep';
    // const slogan = 'One contest at a time';
    ReactDOM.render(<App players={players} title={title} />, document.getElementById('app'));
  });

});
```

* We import our `App` Component and directly place it inside `ReactDOM.render()`
* We pass our `props` into the `App` Component

### The App Component
```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import AddPlayer from './AddPlayer';
import PlayerList from './PlayerList';

class App extends Component {

  render() {

    return (
      <div>
        <TitleBar title={this.props.title} />
        <PlayerList players={this.props.players} />
        <AddPlayer />
      </div>
    );
  }
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
};

export default App;
```

* We create a parent `div` and place our three child Components `TitleBar`, `PlayerList` and `AddPlayer`
* Since `App` was given **props** we access them with `this.props.title` and `this.props.players`
* Both of these `props` require values or our Application won't work so we add PropTypes


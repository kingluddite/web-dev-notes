# Handling events

`TeamPicker.js`

* Change  `console.log(this)` to `console.log(this.teamInput)`

```
  // MORE CODE
  class TeamPicker extends React.Component {
    teamInput = React.createRef();

    goToTeam = event => {
      // 1. Stop the form from submitting
      event.preventDefault();
      // 2. get the text from that input
      console.log(this.teamInput);
    };

    render() {

  // MORE CODE
```

## View in browser
* Click button and we get an **object**
  - Inside that object with have a `current` object
  - Inside the current object we have a **value** property that holds the value of our textbox

`this.teamInput.current.value`

* Now grab the value with:

`TeamPicker.js`

```
// MORE CODE
class TeamPicker extends React.Component {
  teamInput = React.createRef();

  goToTeam = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    console.log(this.teamInput.current.value);
  };

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam}>
        <h2>Pick a Team</h2>
        <input
          type="text"
          ref={this.teamInput}
          required
          placeholder="Team Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Team</button>
      </form>
    );
  }
}

export default TeamPicker;
```

* (if we leave off `value` ---> That will output the actual input element in the console)
* This is [more info](https://reactjs.org/docs/refs-and-the-dom.html) on `refs and the dom`

## View in browser
1. Click the button
2. See the name in the textfield appear in the console

## Change the url
* We could use `window.location`
* But we don't want to change the page
* We just want to change the URL

### Push state
* This will enable us to change the URL without refreshing the page and losing anything we have stored in memory
* We do this using React Router

### How can we access React Router inside TeamPicker?
* One way would be to use `props`
* But that's not a good idea because we have a lot of Components to traverse and it would take to long

#### A better way
* `TeamPicker` is a child of the Router
* Use React tab in console to select TeamPicker component
* You will see a bunch of **Props**
  - We want to access `props.history.push`

`TeamPicker.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from './../utilities/helpers';

class TeamPicker extends React.Component {
  teamInput = React.createRef();

  goToTeam = e => {
    // 1. Stop the form from submitting
    e.preventDefault();
    // 2. Get the text from that input
    const teamName = this.teamInput.current.value;
    // 3. Change the page to /team/whatever-they-entered
    this.props.history.push(`/team/${teamName}`);
  };

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam}>
        <h2>Pick a Team</h2>
        <input type="text" ref={this.teamInput} required placeholder="Team Name" defaultValue={getFunName()} />
        <button type="submit">Visit Team</button>
      </form>
    );
  }
}

TeamPicker.propTypes = {
  history: PropTypes.object.isRequired,
};

export default TeamPicker;
```

* Click on button
* Url will update and you will be routed to that page
* **note** How the back button works!
  - Why so fast?
  - Every time we hit a route that we created using React Router, a different component will be rendered to the screen

## PropTypes
* We also add prop types which checks to make sure we include the required props for our Component

## Contemplate this
* Everything in React are components
* Data is passed down from parent component to child component
* This could be cumbersome if you have many nested components
* But since Router is a component and TeamPicker is a child of Router, we will have a bunch of props passed in (use React tab to see this for yourself)
  - One of the props is history and we want a method on this called `push` (this will activate push state)

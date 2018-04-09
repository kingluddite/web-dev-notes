

# Handling events

`TeamPicker.js`

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
* Click button and we get an object
  - Inside the object we have a value
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
    console.log(this.teamInput.current);
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

* That will output the actual input element in the console
* This is [more info](https://reactjs.org/docs/refs-and-the-dom.html) on `refs and the dom`

## How do we get the value?
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

// MORE CODE
```

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
* One way would be to use props
* But that's not a good idea because we have a lot of Components to traverse and it would take to long

#### A better way
* TeamPicker is a child of the Router
* Use React tab in console to select TeamPicker component
* You will see a bunch of Props
  - We want to access `props.history.push`

`TeamPicker.js`

```
// MORE CODE
class TeamPicker extends React.Component {
  teamInput = React.createRef();

  goToTeam = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const teamName = this.teamInput.current.value;
    // 3. Change the page to /team/whatever/they-entered
    this.props.history.push(`/team/${teamName}`);
  };

  render() {
// MORE CODE

```

* Click on button
* Url will update and you will be routed to that page
* **note** How the back button works!

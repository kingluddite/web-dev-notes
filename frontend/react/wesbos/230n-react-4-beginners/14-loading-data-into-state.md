# Loading data into `state`

Update `src/components/Roster.js`

```js
import React from 'react';
import AddPlayerForm from './AddPlayerForm';

class Roster extends React.Component {
  render() {
    return (
      <div>
        <h2>Roster</h2>
        <AddPlayerForm addPlayer={this.props.addPlayer} />
        <button onClick={this.loadSamples}>Load Sample Players</button>
      </div>
    )
  }
}

export default Roster;
```

### Where do we put our `loadSamples()` method?
* Not in `Roster.js`
* We need to include it where our `state` lives and that lives in our `App` Component

## Let's start by wiring up the function

`App.js`
* We need to import our `sample-players.js` file into `App`

```
// MORE CODE
loadSamplePlayers = () => {
  alert('Loading Sample');
};

render() {
// MORE CODE
```

* Pass the prop to Roster

```
// MORE CODE
<Roster addPlayer={this.addPlayer} loadSamplePlayers={this.loadSamplePlayers} />
// MORE CODE
```

* Add the event on the button

```
// MORE CODE
class Roster extends React.Component {
  render() {
    return (
      <div className="roster">
        <h2>Roster</h2>
        <AddPlayerForm addPlayer={this.props.addPlayer} />
        <button onClick={this.props.loadSamplePlayers}>Load Sample Players</button>
      </div>
    );
  }
}
// MORE CODE
```

* Click the **Load Sample Players** button and the alert will fire
* The button is wired up

## Now we need sample data
* Grab this code `https://gist.github.com/kingluddite/08e15d765530f11b00728bacab9fa805`
* And save it in `/src/sample-data/sample-players.js`

`import samplePlayers from '../data/sample-players';`

## public/images
* You can create images and put them in the public folder
* Point the paths in your json to that folder
* The path would be `/images/mussels.jpg`
  - Because we don't need to include `public` in the path as our root server points to `public`

`App.js`

```
import React from 'react';
// MORE CODE
import Roster from './Roster';
import samplePlayers from './../sample-data/sample-player-data';

class App extends React.Component {
// MORE CODE

  loadSamplePlayers = () => {
    this.setState({
      players: samplePlayers,
    });
  };
// MORE CODE
```

* CLick the button and the React tab will be populated with all our players
* But they do not render to the page
  - Because we didn't tell them to... yet

### View in browser
1. Click **Load Sample Players** button
2. View **React Tab** and search for `App` Component
3. View `state` and you'll see our 20 sample players have been added

![sample players added](https://i.imgur.com/0pk5zhh.png)



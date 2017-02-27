# Component Validation with PropTypes
React forces us to write well structured and modular Components

## PropTypes
Allow us to validate the data coming into our Components

You will want to share your Components with your team or people on the Internet

## Header Component
How can we use PropTypes to let our team/other developers know what type of data our `tagline` must be

### Real Word Example - [react-tabs](https://github.com/reactjs/react-tabs/blob/master/src/components/TabPanel.js)

View and see PropTypes. That is all things this Component needs to run. If I grab this Component and don't follow the PropTypes it will yell at me and make me feel sad :(

[React.PropTypes Documenation](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

`Header.js`

Just above our Header export we add our PropTypes:

```
Header.propTypes = {
  tagline: React.PropTypes.string
}

export default Header;
```

### How to test if our PropTypes is working
Open `App.js` and make this modification:

`<Header tagline={999} />` and we'll get a `Failed prop type` error and that it `expected 'string'`

**note** This error only shown in development

#### isRequired
But we could leave out the `tagline` and it would make our App look strange. We want to make sure someone puts in a tagline and that is where `isRequired` comes in. Make the following update to `Header.js`

```
Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}
```

And make this update to `App.js`

`<Header />`

Now you will get this error: `Warning: Failed prop type: Required prop `tagline` was not specified in `Header`.`

Now put this back in `App.js` 

`<Header tagline="Great Players"/>`

And our errors go away

**rule of thumb** Any time you pass a prop into a Component you should add that to the Component's `propTypes`

## Let's add PropTypes to all our Components

`AddPlayerForm.js`

```
AddPlayerForm.propTypes = {
  addPlayer: React.PropTypes.func.isRequired
}

export default AddPlayerForm;
```

* If we changed that to `React.PropTypes.object.isRequired` we would get an error saying we passed a function but expected an object

`App.js`

```
App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
```

`Player.js`

```
Player.propTypes = {
  addToLineup: React.PropTypes.func.isRequired,
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired
}

export default Player;
```

`Lineup.js`

```
Lineup.propTypes = {
  lineup: React.PropTypes.object,
  players: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  removeFromLineup: React.PropTypes.func.isRequired
}

export default Lineup;
```

`Roster.js`

```
Roster.propTypes = {
  addPlayer: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  players: React.PropTypes.object.isRequired,
  removePlayer: React.PropTypes.func.isRequired,
  updatePlayer: React.PropTypes.func.isRequired
}

export default Roster;
```


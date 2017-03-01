# Bi-directional Data Flow and Live State Editing
## Roster
We need to create a block for every single player on our roster to edit it

We can add players but we can't edit or delete that player

### Looping over players in Roster component

We will loop over all our players using [Object.keys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

#### What does Object.keys() do again?
`Object.keys()` returns an array whose elements are strings corresponding to the enumerable properties found directly upon object. The ordering of the properties is the same as that given by looping over the properties of the object manually.

So we use this: `{Object.keys(this.props.players).map(this.renderRoster)}`

And that will loop through all the array items and for each one it will call the `renderRoster()` method which is another `render()` method which is something we did previously and we do this to break up our `render()` methods for being too large. One important difference is `this` is bound to the `render()` method but `this` is not bound to our soon to be created `renderRoster()` method. If we will use `this` inside `renderRoster()` we will have to (_like we did previously_) bind `this` to the `renderRoster()` method explicitly

##### renderRoster(key)
```
renderRoster(key) {
    return (
      <p>{key}</p>
    )
}
```

We pass it the key that `.map()` will pass to it each time as it loops through our array of player keys in `players`. Then to test we see if we will see each key output to our page inside `p` tags

We do not and we get a ton of errors. The reason is because we never passed down our players `state` to the Roster Component in `App.js`

Can we access the **players** `state` on our `Roster`? Not yet

Open `App.js` and check out our current `<Roster />` Component

```
<Roster
  addPlayer={this.addPlayer}
  loadSamples={this.loadSamples}
/>
```

We need to pass down our players `state` to the Roster

```
<Roster
  addPlayer={this.addPlayer}
  loadSamples={this.loadSamples}
  players={this.state.players}
/>
```

## Now we see all the player keys
We also get an error because we are not using unique "key" props. Each child in an array or iterator should have a unique "key" prop

![error](https://i.imgur.com/phHctsY.png)

**emmet tip**
This `div.player-edit[key={key}]` tabs into this `<div className="player-edit" key="{key}"></div>`

But that will give you quotations around your dynamic key value so make sure you remove those quotations or you'll get a duplicate key error

`<div className="player-edit" key={key}>`

## Update renderRoster(key) method
```
renderRoster(key) {
return (
  <div className="player-edit" key={key}>
    <input type="text" name="firstName" placeholder="First Name" />
    <input type="text" name="lastName" placeholder="Last Name" />
    <input type="text" name="email" placeholder="Email" />
    <input type="text" name="fieldPosition" placeholder="Field Position" />
    <input type="text" name="fee" placeholder="Game Fee" />
    <input type="text" name="jerseyNumber" placeholder="Jersey Number" />
    <select type="text" name="status" placeholder="Status">
      <option value="active">Active</option>
      <option value="inactive">Injured</option>
      <option value="inactive">Vacation</option>
      <option value="inactive">Unexcused</option>
    </select>
    <input type="text" name="imageURL" placeholder="Image URL" />
    <textarea type="text" name="comments" placeholder="Comments"></textarea>
  </div>
)
}
```

## View Roster in browser
We have forms for all our players but the fields are not populated with that players current `state`

We need to get the value of each player so we use:

`const player = this.props.players[key];` and for each field we set the value to `value={player.firstName}` (changing the value for each field to match it's corresponding `name` value)

### Update our `renderRoster()` method
```
renderRoster(key) {
    const player = this.props.players[key];
    return (
      <div className="player-edit" key={key}>
        <input type="text" value={player.firstName} name="firstName" placeholder="First Name" />
        <input type="text" value={player.lastName} name="lastName" placeholder="Last Name" />
        <input type="text" value={player.email} name="email" placeholder="Email" />
        <input type="text" value={player.fieldPosition} name="fieldPosition" placeholder="Field Position" />
        <input type="text" value={player.fee} name="fee" placeholder="Game Fee" />
        <input type="text" value={player.jerseyNumber} name="jerseyNumber" placeholder="Jersey Number" />
        <select type="text" value={player.status} name="status" placeholder="Status">
          <option value="active">Active</option>
          <option value="inactive">Injured</option>
          <option value="inactive">Vacation</option>
          <option value="inactive">Unexcused</option>
        </select>
        <input type="text" value={player.imageURL} name="imageURL" placeholder="Image URL" />
        <textarea type="text" value={player.comments} name="comments" placeholder="Comments"></textarea>
      </div>
    )
  }
```

## Binding error
If we use `this` in a render method other than `render()` we need to explicitly bind it to the Component

```
class Roster extends React.Component {
  constructor() {
    super();
    this.renderRoster = this.renderRoster.bind(this);
  }
// MORE CODE
```

### View in browser

That gets rid of our binding warning but now we get a `Failed form propType: You provided a 'value' prop to a form field without an 'onChange' handler. This will render a read-only field. If the field should be mutable use 'defaultValue'. Otherwise, set either 'onChange' or 'readOnly'.`

But we do see all our player values populating the form fields but they are not editable

The reason for the error is React does not want you using state in form fields unless you have a plan for updating it

**note** In TeamPicker we used `defaultValue` HTML5 property to prepopulate our TeamPicker form field input with a value returned by the `getFunName()` method but that value was not tied to our `state` at all

React is forcing us to use one core area for our `state` and that is our App `state`

## So how do we fix this?
We need to update our `state` and then React will keep them in sync

When any of our inputs change we need to listen for it and then update the corresponding `state`

### Let's add a listener for the firstName input
`<input type="text" value={player.firstName} name="firstName" placeholder="First Name" onChange={(e) => this.handleChange(e, key)} />`

#### Create handleChange() method
```
handleChange(e, key) {
  const player = this.props.players[key];
  console.log(player);
}
```

* Make sure to pass it the `e` for the event and the `key`. We pass them both when the `onChange` event is fired

#### Bind handleChange to `this`
```
this.handleChange = this.handleChange.bind(this);
```

#### View in browser
Try to change the firstName field. You can't because it is read only but you will see the firstName player field and it's values output to the console

#### Why can't we change the input field value?
Because we did not update `state` yet

#### Take a copy of the player and update it with the new data
How do you copy an Object?

One way: `const updatedFish = Object.assign({}, player);`

* That will take an empty Object and assign it the value of `player`

* But we can use the player spread `{...player}` and then we need to overlay our new properties (aka attributes) on top of it

## First of all what changed?
How do we know what changed?

```
handleChange(e, key) {
const player = this.props.players[key];
  console.log(e.target);
}
```

### Find the e.target
When we click on the `firstName` field and type `x` the console will output `<input type="text" value="Philip" name="firstName" placeholder="First Name">`

### Find e.target.name
We gave all our fields a `name` attribute so now if we `console.log(e.target.name)` this:

```
handleChange(e, key) {
const player = this.props.players[key];
  console.log(e.target.name);
}
```

Which will output `firstName` when we click on field and type `x`

### Find e.target.value
```
handleChange(e, key) {
const player = this.props.players[key];
  console.log(e.target.value);
}
```

Click in firstName field and type `x` and `x` will be what is returned in the console

So now we have the name field that we clicked on (`e.target.name`) and the new value that we added (`e.target.value`) so now we are going to use our `updatedPlayer` Object and overlay our new properties on it

### Computer Property
We can's use `firstName` or `lastName` but we can use a computed property which will look like this `[e.target.name]` and the value of that computed field will be `e.target.value`

```
const updatedPlayer = {
  ...player,
  [e.target.name]: e.target.value
}
console.log(updatedPlayer);
```

View in browser, click on firstName field and type `x` and you will see that firstName says it is now `Philipx`. Click on another `firstName` field in the Roster and when you type `x` you will see that that `firstName` has chanded to whatever the `firstName` was to `somenamex`

### App.js
Add this method to our `App.js`

```
updatePlayer(key, updatedPlayer) {
  const players = {...this.state.players};
  players[key] = updatedPlayer;
  this.setState({ players });
}
```

* We spread out all the state players into the players variable
* When we call the updatePlayer method (from the Roster Component we pass it the updatedPlayer and store that as a key of players and then we set the state to what is now in players

## Add updatePlayer to the Roster Component
By adding this we can then access the `updatePlayer()` method from inside the Roster Component

`App.js`

```
<Roster
  addPlayer={this.addPlayer}
  loadSamples={this.loadSamples}
  players={this.state.players}
  updatePlayer={this.updatePlayer}
/>
```

* If you use the React tab and search for the `Roster` component you will see that `updatePlayer` is now available on the Roster Component

## Update the Roster Component's handleChange() method
```
handleChange(e, key) {
  const player = this.props.players[key];

  // take a copy of that player and update it with the new data
  const updatedPlayer = {
    ...player,
    [e.target.name]: e.target.value
  };

  this.props.updatePlayer(key, updatedPlayer);
}
```

We can now access `updatePlayer()` by using `this.props.updatePlayer()` and passing it the key and the newly updated state that we stored inside `updatedPlayer`

### It finally works!
Now edit any First Name and it will change under Roster and also under players. If you add the player to the Lineup you will see that all 3 update at the same time!

### Reviewing the flow
* We have an `onChange` handler that will trigger when someone type into that field and that will run the `handleChange()` method which will take a copy of that one single player and we overwrite whatever had changed in that player by using `[e.target.name]` and `e.target.value` and then we pass that up to our `updatePlayer()` method (which lives on `App.js`) and that `updatePlayer(key, updatedPlayer)` takes in the `key` and newly updated state held in `updatedPlayer` object. We take a copy of all of our players (we always do this when we update our `state`), we overwrite that one updatedPlayer with our updatedPlayer object and then finally we set `state` and that will finally update our field

### WTF?! That was a ton of work just to change one field!
That may seem like a lot of work where we could have updated this field with one line of jQuery but once your apps get really complicated you are really going to appreciate the benefits doing it this way offers. Having your `state` in one place and not having to worry about having a bunch of coding balls in the air

**tip** In Atom, `cmd` + `r` will allow you to quickly find your methods (enter name in search box and press `return`)

**tip** * [hyperclick](https://leveluptutorials.com/tutorials/react-tips/quickly-navigating-components-with-hyperclick)

Keyboard shortcut - hover over any Component while holding down the `cmd` key and then click and you will instaneously be take to that Component

### Update the rest of the fields inside the Roster Component

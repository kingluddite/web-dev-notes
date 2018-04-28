# Understanding State - Core fundamental concept!

## What is state?
* `state` is just an object that holds data that itself needs as well some children may need
* This of `state` as a single source of truth

## "single source of truth"
* Sometimes in `jquery` your data lives in multiple places
  - maybe in a variable and some in a data attribute on a DOM element
  - Pull it out of there and put it back in and use that as a place to store your data
* The representation of all of the data in our application
* Each Component can have its own `state`
* Think of `state` as one object that holds the data of all of our application or a piece of our application
* We just want to update our data and let react take it from there
* Remember in React we "don't want to touch the DOM"

### `state` in team of the day app
* We have state with: 
  - How many players we have
  - How many rosters we have

### `state` in jQuery

### One way to go about it
* You could save **data** in `attributes`

1. Save **data** in the **DOM**
2. Then pull it out
3. Then put it back in
4. Rince and repeat
5. And where the application is currently at is done entirely in the **DOM**

### React is different!
* In React you store all of your **data** in this master object called `state` 
* Whenever you want to change anything on the page
  - You edit your `state`
  - **React** will handle updating the **DOM**

### Fight the urge to directly touch the HTML 
* Coming from **HTML** directly you may want to touch the **HTML** 
    - In **React** you edit the **data**
        + And **React** will edit the **HTML**

### Huge idea behind `state`
* If you view a website made with **React** in the browser and you change the `state` inside one of it's Components
    - That will change everywhere that `state` is pulled from and **React** will update the **HTML**
* The great thing is you have all these balls in the air but you don't have to:
    - **id** them,
    - Grab their contents
    - And change them all
    - Just change the `state` and React handles the rest

## Adding the player form
* We will create a new Component called `src/components/AddPlayerForm.js`

```
import React, { Component } from 'react';

class AddPlayerForm extends Component {
  render() {
    return (
      <form className="player-edit">
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="price" placeholder="Price" />
        <select name="status">
          <option value="available">Starter</option>
          <option value="unavailble">Substitute</option>
        </select>
        <textarea name="desc" placeholder="Desc" />
        <input type="text" name="image" placeholder="Image" />
        <button>Add Player</button>
      </form>
    );
  }
}

export default AddPlayerForm;  
```

## Update Roster.js
* We **import** and **add** our new Component to `Roster.js`

```
import React from 'react';
import AddPlayerForm from './AddPlayerForm';

class Roster extends React.Component {
  render() {
    return (
      <div>
        <h2>Roster</h2>
        <AddPlayerForm />
      </div>
    )
  }
}

export default Roster;
```

### View in browser
* You should see the `AddPlayerForm` in the Roster section

### Add the event handler
* When the player is added we need to submit the form so we add an `onSubmit` event handler inside our opening `<form>` element
* `onSubmit` works with both pressing the `enter` key or clicking the submit button
* `this` works inside `render()`

```
// MORE CODE
class AddPlayerForm extends Component {
  createPlayer = event => {
    event.preventDefault();
    console.log(this);
  };

  render() {
    return (
      <form className="player-edit" onSubmit={this.createPlayer}>
// MORE CODE
```

* We see `this` works and our button is working

## How do you take all the text entered into the text fields, selects and text areas and put it into an object?
* We want to create a `player` object with all their properties inside that object
* We have no way of accessing individual fields in our form yet
* We didn't give them `names` or `ids` but with React the way we access them is with using `ref`

### Adding `ref` to our form

```
import React, { Component } from 'react';

class AddPlayerForm extends Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createPlayer = e => {
    e.preventDefault();
    const player = {
      name: this.nameRef.current.value,
      price: this.priceRef.current.value,
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };
    console.log(player);
  };

  render() {
    return (
      <form className="player-edit" onSubmit={this.createPlayer}>
        <input type="text" name="name" ref={this.nameRef} placeholder="Name" />
        <input type="text" name="price" ref={this.priceRef} placeholder="Price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Starter</option>
          <option value="unavailble">Substitute</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input type="text" name="image" ref={this.imageRef} placeholder="Image" />
        <button>Add Player</button>
      </form>
    );
  }
}

export default AddPlayerForm;
```

### Test it out
* Enter some fake data and submit
* You will see an object with all our data nicely inside

### Make our money a number and not a string
`price: parseFloat(this.priceRef.current.value),`

* Test and you'll see `priceRef` is blue in chrome dev tools because it is a number
* Doing it like this will keep us from worrying about decimals

## How do we get our player object into our state?
* We will put our `state` on our `App` Component (_the parent of all our other Components_)

## How do you use state on a React Component?
**note** In older React apps it was called `getInitialState`

### Good to know
* Right now our data is only available in our `AddPlayerForm` component
* We will put our `state` in our app and pass down that `state` to nested components using `props`

### React needs to know:
* What `state` you are going to have?
* What type of `state` it is going to be?
* What to expect?
* When our `App` Component initializes we will tell `App` we will have a **players** `state` and a **lineup** `state`
* We do that using a **ES6** class `constructor` method
* You can't pass data up but you can always pass data down

## How do we set state in our App
* We could use a constructor

```
// MORE CODE
class App extends React.Component {
constructor() {
  super();
  this.state = {
    // stuff in here
  }
}
// MORE CODE
```

* But my preferred way is to use a **property**

```js
state = {
  fishes: {},
  order: {}
}
```

* You could also set them to arrays, strings, null
* Just make them the shape they will be when they are set at a later point in time

## How do we get an item into `state`?
* We can't update directly from AddPlayerForm because the methods that update state and the actual state ALWAYS need to live in the exact same component
* So we will put all our methods inside App
  - We'll use arrow function because we need to access `this` inside of it

`App.js`

```
// MORE CODE
 class App extends React.Component {
    state = {
      players: {},
      order: {},
    };

   addPlayer = player => {
     console.log('Adding player');
   };

   render() {
// MORE CODE
```

* This will cause a prop type error because we are sending AddPlayerForm a string when our prop type requires a function
  - Just change it to accept a string (temporary change)

## Now how do we call state?
  - We have our method inside `App` but we want to call it two levels deeper inside `AddPlayerForm`

![3 levels deep](https://i.imgur.com/VZ3kj0z.png)

* This screenshot shows App > Roster > AddPlayerForm

### How do we get a function that lives in App all the way down to AddPlayerForm?
* The answer is `props`
  - That's the only way we can get something into a component
  - We will first pass it to `Roster`
    + And then inventory will in turn pass it over to `AddPlayerForm`

## Add addPlayer to Roster

`App`

*  We will first pass our function down into `Roster`

```
// MORE CODE
render() {
  return (
    <div className="team-of-the-day">
      <div className="menu">
        <Header tagline="Soccer Stars" />
      </div>
      <Lineup />
      <Roster addPlayer={this.addPlayer} />
    </div>
  );
}
// MORE CODE
```

* View `Roster` inside React tab and you'll see the one `Props` listed as `addFish`
* **tip** Good to keep name of function the same so you will recognize it inside the other nested components

### Now pass it to `AddPlayerForm` inside `Roster`

`Roster`

```
// MORE CODE
class Roster extends React.Component {
  render() {
    return (
      <div className="roster">
        <h2>Roster</h2>
        <AddPlayerForm addPlayer="this.props.addPlayer" />
      </div>
    );
  }
}
// MORE CODE
```

* We change it from `this.addPlayer` to `this.props.addPlayer` because the function doesn't live on `Roster` its just been passed in via **props**

![addPlayer inside AddPlayerForm](https://i.imgur.com/sUw3kQE.png)

* This is an error because it is a string `"this.props.addPlayer"` and not `{this.props.AddPlayer}`

`AddPlayerForm.js`

```
// MORE CODE
createPlayer = e => {
  e.preventDefault();
  const player = {
    name: this.nameRef.current.value,
    price: parseFloat(this.priceRef.current.value),
    status: this.statusRef.current.value,
    desc: this.descRef.current.value,
    image: this.imageRef.current.value,
  };
  this.props.addPlayer(player);
};

render() {
// MORE CODE
```

* Put at top of `Roster.js` and `AddPlayerForm`
* We'll use prop types later
* You should see `addPlayer: fn()` in `Roster` and `AddPlayerForm` props (React tab of Chrome dev)

## Click AddPlayerForm button and notice the console

## Now how do we get it into our `state`?
* `this.state.fishes.push(fish)` (if it was an array)
* `this.state.fishes.fish1 = fish` (if it was an object)
* But they would both be wrong
  - You need to use React's `setState()` API

## Steps to update State
* Using Reacts existing `setState()` API otherwise it will not work

1. Take a copy of the existing `state`
* You never want to reach into state and modify it directly
* That is called a `mutation` in JavaScript
  - That is when you reach directly into an object
  - That can cause issues with performance
  - It can cause issues with things updating out of order
  - `const players = {...this.state.fishes}`
    + This will make a copy of everything inside `state`
    + It is called and **object spread**
2. Add our new piece to the the copy of state held in the `player` variable
  - `players[`player${Date.now()}`] = player;
  - That will make sure each player is unique
3. Set the new players object to state
```
  this.setState({
    players
    });
```

* Now when you add players that will be added to the `state`

![added to state](https://i.imgur.com/CMWkiTi.png)

### Clean up time
* Currently, the values stay on form after creating player
* We need to reset our form after we add a player

`AddPlayerForm.js`

```
// MORE CODE
createPlayer = e => {
  e.preventDefault();
  const player = {
    name: this.nameRef.current.value,
    price: parseFloat(this.priceRef.current.value),
    status: this.statusRef.current.value,
    desc: this.descRef.current.value,
    image: this.imageRef.current.value,
  };
  this.props.addPlayer(player);
  // refresh the form
  e.currentTarget.reset();
};
// MORE CODE
```

* Submit form and values will be cleared
* Check to make sure the Player is still being added to state

**note** It might be better if `setState` was called `this.pleaseUpdateThesePiecesOfState()`
* But it's not so we just have to live with it

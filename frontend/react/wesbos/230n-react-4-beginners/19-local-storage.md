# Persisting Order State with localstorage
* Our Players persists on page refresh but our starting `Lineup` does not

## HTML5 localstorage
* Sync our Lineup to HTML `localstorage`
* This will save it in the browser
* We could use cookies to do this
* But `localstorage` is a much better fit

![clear out localstorage](https://i.imgur.com/mcQiZSQ.png)

## We store Players in our players state inside Firebase

### We did not store our Lineup in firebase
* We will store Lineup in localstorage

## Back to the Lifecycle Methods
* We need to tap into two more Lifecycle methods

### componentDidUpdate
* This is invoked immediately after updating occurs
* This method is NOT called for the initial render
* This is what we need
  - As soon as App is loaded and someone clicks on Add to Game button
  - We want to update our localstorage showing us this is exactly what they added to their order
* **tip** Put your Lifecycle methods in the order that they occur

`App`

```
// MORE CODE
componentDidUpdate() {
  console.log('It updated!');
}

componentWillUnmount() {
  base.removeBinding(this.ref);
}

addPlayer = player => {
// MORE CODE
```

## Test it out
* Add a new team
  - will update
* Load players
  - will update
* Add player
  - will update

* componentDidUpdate() takes not arguments
* If we need to access props ---> this.props
* If we need to access state ---> this.state

```
// MORE CODE
componentDidUpdate() {
  console.log(this.state.lineup);
}
// MORE CODE
```

* When your team loads and you add two players you'll see this:

![after updates of lineup state](https://i.imgur.com/MxwFEOh.png)

## How do we stick that into our localstorage?
* If you have an object

`const joe = { name: 'joe' }`

* And if you alert it with `alert(joe)`
* It will alert [object Object]
* This happens when you try to put an object in a place where a string is required
* The browser will say, hmm, I was expecting a string you gave me an Object, I am just going to call the `toString()` method on that object and that is what gives us [object Object]
* We need to convert that object to a string representation
* That is what `JSON.stringify()` does

`> JSON.stringify(joe)` (in chrome console)

* Will give us:

`< "{"name":"joe"}"` (which is what we want)

## Avoid this problem
* Make sure you can see Key and Value
* I had dragged my line up to much in Application and did not see them
* I only saw the bottom part which shows you what is inside the localStorage object

![should look like this](https://i.imgur.com/sGIKDq0.png)

### Houston we have a problem
* When I refresh the page, the localStorage for my team gets set to an empty object

### [componentWillUpdate()](https://facebook.github.io/react/docs/react-component.html#componentwillupdate)
* `componentWillUpdate()` is invoked immediately before rendering when new `props` or state are being received
* Use this as an opportunity to perform preparation **before an update occurs**
* This method is not called for the initial render
* `componentWillUpdate()` runs whenever `props` or `state` changes
    - This works for us because our `lineup` is `state` and that is passed down via `props`
* We need to hook into when the data actually changes

```js
componentWillUpdate(nextProps, nextState) {
  console.log('Something changed');
  console.log({nextProps, nextState});
}
```

* **tip** Passing `console.log()` a `{}` will name our arguments
* Like this:

`Object {nextProps: Object, nextState: Object}`

* If you don't wrap them in `{}` you will get (**unnamed arguments**)like this:

`Object {params: Object, isExact: true, pathname: "/team/itchy-grumpy-women", location: Object, pattern: "/team/:teamId"} Object {players: Object, lineup: Object}`

## Use {}
* The second options is obviously harder to read
* So use the `{}`

## Tell me more about localstorage
### How can I access localstorage?
1. Chrome Inspector > `Application` tab > Under **Storage**
2. Expand `localStorage`
3. Click on the **domain name**

## Clear our localstorage to start
* You may have stuff inside it already
* But clear everything out if there is
    - Highlight and click `x` to Delete entries)
* `localStorage` is stored in `key` and `value` pairs
* It is very similar to an Object but you can not nest an Object inside of it
* You can only store `numbers`, `strings` and `booleans` as **key/value** pairs

### Setting items in localStorage
* You set items with:

`localStorage.setItem(key, value)` or `localStorage.setItem('Pele', 'was a great soccer player')`

* Type this in your console:

`localStorage.setItem('Pele', 'was a great soccer player')`

![localstorage](https://i.imgur.com/Ihmq3p8.png)

## Getting items in localStorage
* Type this in console: `localStorage.getItem('Pele')`
* And you will see this returned `"was a great soccer player"`

### How will we use localStorage in our app?
* Whenever our **lineup** `state` is updated, we will store it in `localStorage` using `localStorage.setItem()`
* And then when user refreshes the page, when they are loading it for the first time we will check localStorage using `localStorage.getItem()` to see if anything is in there
* And if there is we will restore our `state` via one of our Lifecycle hooks

```js
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(`itchy-grumpy-people`);
}
```

* We check React tab for `App` and see that `props.params.teamId` is available
* But if we search for `Lineup` we'll see that it is not available 

### How can we make params available in our Lineup Component?
* Which is a child of the App Component?

`App.js`

* Add the `params` attribute to the `<Lineup />` Component

```
<Lineup
  players={this.state.players}
  lineup={this.state.lineup}
  params={this.props.params}/>
```

* And now you'll see when you search the `React` tab for `Lineup` this:

![Lineup params](https://i.imgur.com/cKzmniG.png)

* But we want to make it dynamic using `props` (_because they get passed down_)
* So we use:

`syntax`

```js
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(key, value);
}
```

* Add this code just below the `componentWillUnmount()` method

```
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(`lineup-${this.props.params.teamId}`, `${this.props.params.teamId}`);
}
```

* That will not work because when you check `localStorage` you will see that we stored an `Object` as a **value** and **that is not allowed**
* **rule** You **can only store strings**
* The reason we get `[object Object]` is it is converting our Object into a string

## How can you convert an Object into a string?
* [stackoverflow convert object into string](http://stackoverflow.com/questions/5612787/converting-an-object-to-a-string)

```js
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(`lineup-${this.props.params.teamId}`, JSON.stringify(nextState.lineup));
}
```

![JSON stringify](https://i.imgur.com/ORAHnYs.png)

## Page refresh
* Our `Lineup` disappears but the `key` still exists
* But our `value` gets overwritten on page load and is just `{}`

### How can we fix this problem
* We'll need to go back to our `componentWillMount()` from the Lifecycle
* Because that method runs before the `<App>` is rendered
* **note** We already used this method to `sync` our Firebase
* But we can use this method for multiple tasks
    - Like also checking if there is any `Lineup` in **localStorage**

```js
componentWillMount() {
  // this runs before the <App> is rendered
  this.ref = base.syncState(`${this.props.params.teamId}/players`, {
    context: this,
    state: 'players'
  });

  // check if there is any lineup in localStorage
  const localStorageRef = localStorage.getItem(`lineup-${this.props.params.teamId}`);

  if(localStorageRef) {
    // update our App component's lineup state
    this.setState({
      lineup: localStorageRef
    });
  }
}
```

* That won't work because we converted our current `state` into a string using `JSON.stringify(nextState.lineup)` and set that as our localStorage
* Then to get that value we use `localStorage.getItem()` and store it inside a variable (`localStorageRef`)
* And pass it our dynamic generated `key`
* But that value is just a stringified JSON
* We need to now convert that back to an Object using `JSON.parse(localStorageRef)`
* And set our new `state` with:

```
this.setState({
  lineup: JSON.parse(localStorageRef)
});
```

* And that will give us this:

```js
componentWillMount() {
  // this runs before the <App> is rendered
  this.ref = base.syncState(`${this.props.params.teamId}/players`, {
    context: this,
    state: 'players'
  });

  // check if there is any lineup in localStorage
  const localStorageRef = localStorage.getItem(`lineup-${this.props.params.teamId}`);

  if(localStorageRef) {
    // update our App component's lineup state
    this.setState({
      lineup: localStorageRef
    });
  }
}
```

* And now we see that **localStorage** is working when we refresh the page

## Houston we have a minor issue
* There is a slight pause where it says `Sorry player not available`
* And then it populates with our state

## Fix this issue by using a different Lifecycle
`shouldComponentUpdate(nextProps, nextState)`

# Persiting Order State with localstorage
Our Players persists on page refresh but our starting lineup does not.

## HTML5 localstorage
Sync our Lineup to HTML localstorage

* This will save it in the browser
* We could use cookies to do this
* But localstorage is a much better fit

## Back to the Lifecycle Methods
We need to tap into two more Lifecycle methods

### [componentWillUpdate()](https://facebook.github.io/react/docs/react-component.html#componentwillupdate)
`componentWillUpdate()` is invoked immediately before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

* `componentWillUpdate()` runs whenever `props` or `state` changes
    - This works for us because our `lineup` is `state` and that is passed down via `props`

* We need to hook into when the data actually changes

```js
componentWillUpdate(nextProps, nextState) {
  console.log('Something changed');
  console.log({nextProps, nextState});
}
```

**tip** Passing `console.log()` a `{}` will name our arguments. Like this:

`Object {nextProps: Object, nextState: Object}`

If you don't wrap them in `{}` you will get unnamed arguments like this:

`Object {params: Object, isExact: true, pathname: "/team/itchy-grumpy-women", location: Object, pattern: "/team/:teamId"} Object {players: Object, lineup: Object}`

The second options is obviously harder to read so use the `{}`

## Tell me more about localstorage
### How can I access localstorage?
Chrome Inspector > `Application` tab > Under **Storage** expand `localStorage` and click on the **domain name**

You may have stuff inside it already but clear everything out if there is (Highlight and click `x` to Delete entries)

* localStorage is stored in `Key` and `Value` pairs. It is very similar to an Object but you can not nest an Object inside of it. You can only store `numbers`, `strings` and `booleans` as `Key` `Value` pairs

### How does localStorage work?
You set items with:

#### setting items in localStorage

`localStorage.setItem(key, value)` or `localStorage.setItem('Pele', 'was a great soccer player')`

Type this in your console:

`localStorage.setItem('Pele', 'was a great soccer player')`

![localstorage](https://i.imgur.com/Ihmq3p8.png)

## getting items in localStorage
Type this in console: `localStorage.getItem('Pele')` and you will see this returned `"was a great soccer player"`

### How will we use localStorage in our app?
Whenever our **lineup** `state` is updated, we will store it in localStorage using `localStorage.setItem()` and then when user refreshes the page, when they are loading it for the first time we will check localStorage using `localStorage.getItem()` to see if anything is in there and if there is we will restore our `state` via one of our Lifecycle hooks

```js
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(`itchy-grumpy-people`);
}
```

We check React tab for `App` and see that `props.params.teamId` is available but if we search for `Lineup` we'll see that it is not available. 

### How can we make params available in our Lineup Component which is a child of the App Component?

`App.js`

Add the `params` attribute to the `<Lineup />` Component

```
<Lineup
  players={this.state.players}
  lineup={this.state.lineup}
  params={this.props.params}/>
```

And now you'll see when you search the `React` tab for `Lineup` this:

![Lineup params](https://i.imgur.com/cKzmniG.png)

But we want to make it dynamic using `props` (_because they get passed down_)so we use:

`syntax`

```js
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(key, value);
}
```

Add this code just below the `componentWillUnmount()` method

```
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(`lineup-${this.props.params.teamId}`, `${this.props.params.teamId}`);
}
```

That will not work because when you check localStorage you will see that we stored an Object as a value and that is not allowed. You can only store strings and the reason we get `[object Object]` is it is converting our Object into a string.

## [How can you convert an Object into a string?](http://stackoverflow.com/questions/5612787/converting-an-object-to-a-string)

```js
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem(`lineup-${this.props.params.teamId}`, JSON.stringify(nextState.lineup));
}
```

![JSON stringify](https://i.imgur.com/ORAHnYs.png)

## Page refresh
Our Lineup disappears but the Key still exists but our Value gets overwritten on page load and is just `{}`

### How can we fix this problem
We'll need to go back to our `componentWillMount()` from the Lifecycle because that method runs before the <App> is rendered

We already used this method to sync our Firebase but we can use this method for multiple tasks like also checking if there is any lineup in localStorage

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

That won't work because we converted our current `state` into a string using `JSON.stringify(nextState.lineup)` and set that as our localStorage. Then to get that value we use `localStorage.getItem()` and store it inside a variable (`localStorageRef` and pass it our dynamic generated `key`. But that value is just a stringified JSON. We need to now convert that back to an Object using `JSON.parse(localStorageRef)` and set our new `state` with:

```
this.setState({
  lineup: JSON.parse(localStorageRef)
});
```

And that will give us this:

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

And now we see that localStorage is working when we refresh the page. There is one issue and that is there is a slight pause where it says `Sorry player not available` and then it populates with our state.

## Fix this issue by using a different Lifecycle
`shouldComponentUpdate(nextProps, nextState)`

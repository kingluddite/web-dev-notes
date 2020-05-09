# Lifecycle Methods
## Run our app (if not already running)

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* Explore differences between CBCs and SFCs
* Look at built-in methods available to our CBC that we can't add to SFC

## Lifecycle Methods (only for CBCs)
* They fire at various times in a given component's life
  - Examples
    + When component first gets rendered to the screen
    + When component gets removed from the screen
    + When something in the component updates (the state or prop inside the Component updates)
 
## Benefits of LCMs
* This gives us tons of power like:
- Populate the options array with data from Database when the component first gets mounted to the browser
- We'll be able to save the data as the component updates
  + We'll be able to watch for changes to state and when state changes we'll be able to save things 

## How will will store our data?
* We'll start just using `localStorage` (in the client) and later we'll use a Database
* It will help us persist data between page views

## componentDidMount (Lifecycle Method)
* When component first mounts to browser
* We never call this, it gets called automatically
* **important** Spelling is crucial
    - Spell it wrong and it won't work

```
class IndecisionApp extends React.Component {
  constructor(props) {
   // MORE CODE
  }

  componentDidMount() {
    console.log('IndecisionApp Component did mount');
  }
  // MORE CODE
```

* View console and you'll see `IndecisionApp Component did mount` (load right away)
* Why SFCs are so fast is they don't have to manage state or Lifecycles which means they never have to deal with all that code

## componentDidUpdate (Lifecycle Method)
* Fires after the component updates
    - `state` or `prop` values changes
    - Great for our app, means we can do something when the option array changes

```
componentDidMount() {
  console.log('IndecisionApp Component did mount');
}

// add this lifecycle method
componentDidUpdate() {
  console.log('IndecisionApp Component did update');
}
```

## Houston we have a problem!
* componentDidUpdate LCM won't load on page load
* But will load `IndecisionApp Component did update` to console when we change state

### Add an option in the UI
* This will update state and therefor fire the `componentDidUpdate()` LCM
  - If fire when we add another, remove an option, remove all options... anytime we change state

#### this.props and this.state && prevState and prevProps
* Inside the method itself we have access to `this.state` and `this.props` for the new `state` and new `prop` values
* We also have access to arguments that enable us to access the **previous state** `prevState` and **previous props** `prevProps`

```
// MORE CODE

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate fired');
  }
// MORE CODE
```

* prevProps and prevState are both objects
* prevProps is the first argument and prevState is the second argument
  - Use both inside of `componentDidUpdate()` to do something meaningful like figure out if a specific part of a component updated
    + So if we have a search term and other parts of the app that are changing we may not always want to save options every time componentDidUpdate fires
    + Maybe we only want to save options if the option.length array changed and prevState will give us access to old length and we can compare it to the new one

## componentWillUnmount (lifecycle method) 
* This LCM fires just before your component goes away (unmounts)
* Not used often but good to know it exists

```
componentWillUnmount() {
  console.log('IndecisionApp Component did unmount');
}

handleDeleteOptions() {
```

* Not often used but good to know it exists

### How can we fire this?
* If we had multiple pages we could fire this easily
* But for now let's simulate it in the console

#### Check this out!
* We'll use the console to replace our app with a simple paragraph tag

`> ReactDOM.render(React.createElement('p'), document.getElementById('root'));`

* Now you will see `IndecisionApp Component did unmount` and the page is replaced by one empty `p` tag
* Because our original app was removed the `componentWillUnmount()` LCM fires

### More Lifecycle documentation
[link to docs](https://reactjs.org/docs/react-component.html)
* The docs will walk you through the 3 various phases of Lifecycle

1. Mounting
2. Updating
3. Unmounting

#### Mounting
* constructor()
  - First the constructor() method fires
* componentWillMount()
  - Then between when the constructor() method fires and the render() method fires the componentWillMount() LCM fires
* render()
* componentDidMount()
  - componentDidMount() LCM fires after render

#### Updating
* componentWillReceiveProps()
* shouldComponentUpdate()
* componentWillUpdate()

#### Unmounting
* componentWillUnmount()

## Save and fetch data using localStorage
```
componentDidMount() {
  console.log('Fetching data');
}

componentDidUpdate() {
  console.log('Saving data');
}
```

* Uses both mechanisms we'll be able to save all of the data the user enters whether they add or remove items
* And when they come back to the app we'll be able to fetch the last saved data repopulating the list with all of the options they have in place

## Next - Make lifecycle methods useful


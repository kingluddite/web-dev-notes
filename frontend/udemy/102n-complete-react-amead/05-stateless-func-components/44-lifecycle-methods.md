# Lifecycle Methods
* Explore differences between CBCs and SFCs

## Lifecycle Methods only for CBCs
* Used during the components "life":
    - When Indecision app first gets rendered to the screen
    - When it gets removed from the screen
    - When the state or prop inside the Component updates
    - This gives us tons of power like:
        + Populate the component with data from the db when the component first gets mounted to the browser
        + We'll be able to save the data as the component updates

## Local Storage vs Real DB
* We'll start with local storage
* It will help us persist data between page views

## ComponentDidMount (Lifecycle Method)
* When component first mounts to browser
* We never call this, it gets called automatically
* Spelling is crucial
    - Spell it wrong and it won't work

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    this.state = {
      options: this.props.options,
    };
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
    - state or prop values changes
    - Great for our app, means we can do something when the option array changes

```js
componentDidMount() {
  console.log('IndecisionApp Component did mount');
}

// add this lifecycle method
componentDidUpdate() {
  console.log('IndecisionApp Component did update');
}
```

* Won't load on page load
* But will load `IndecisionApp Component did update` to console when we add options, delete all or one option
* Inside the method itself we have access to `this.state` and `this.props` for the new state and new prop values
    - We also have access to arguments that enable us to access the **previous state** `prevState` and **previous props** `prevProps`

## componentWillUnmount (lifecycle method) 
* Fires just before you component goes away
* Not used often but good to know it exists

```
componentWillUnmount() {
  console.log('IndecisionApp Component did unmount');
}

handleDeleteOptions() {
```

* How can we fire this?
* If we had multiple pages we could fire this easily
* But for now let's simulate it in the console

`> ReactDOM.render(React.createElement('p'), document.getElementById('app'));`

* Now you will see `IndecisionApp Component did unmount` and the page is replaced by one empty `p` tag

### More Lifecycle documentation
[link to docs](https://reactjs.org/docs/react-component.html)

* `Mounting`
    - constructor()
    - componentWillMount()
    - render()
    - componentDidMount()
* `Updating`
    - componentWillReceiveProps()
    - shouldComponentUpdate()
    - componentWillUpdate()
* `Unmounting`

## Save and fetch data using local storage
```js
componentDidMount() {
  console.log('Fetching data');
}

componentDidUpdate() {
  console.log('Saving data');
}
```

## Next - Make lifecycle methods useful


# Build-it! Adding State
* Comment out all of `counter-example.js`
* This was built without our knowledge of Component classes
  - We didn't know we could create methods on those classes
* We had a variable that managed our application state
  - Now we will use Component state instead

## Point babel to a new file
`$ babel src/playground/counter-example.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* Will show an empty screen - no code rendered yet

## Add Code to make our Counter render to the page
```
class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>Count: </h1>
        <button>+1</button>
        <button>-1</button>
        <button>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));
```

* No user interaction yet

## Challenge - Create 3 methods
* handleAddOne()
* handleMinusOne()
* handleReset()
* log to print method name when buttons clicked
* Wire up onClick & bind in constructor function

## Next
* Go over the 5 steps necessary to set up component state in Counter

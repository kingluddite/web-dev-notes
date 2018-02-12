# Method Binding
* Issues binding with `this`
* We used `this` before and it bound perfectly fine
    - But that was inside `render()`
    - Outside of render `this` breaks

```
class Options extends React.Component {
  handleRemoveAll() {
    console.log(this.props.options);
    // console.log('remove all test');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <p>Options here</p>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
        <Option />
      </div>
    );
  }
}
```

* Click remove all button and we get an error `Cannot read property 'props' of undefined`

### Why does `this.props.options` work inside `render()` but not outside?
* **note** This is NOT a React issue, this is a JavaScript issue

```js
const obj = {
  name: 'John',
  getName() {
    return this.name;
  },
};

console.log(obj.getName());
```

* Put the above snippet at the top of `app.js`
* Run it and you'll see `> John` in the console

* But if we pass the function "by reference"

```js
const obj = {
  name: 'John',
  getName() {
    return this.name;
  },
};

const getName = obj.getName;
```

* We get an error 'cannot read property "name" of undefined'
* We broke our binding. How?
    - It worked when we accessed the method of the object because `this` was bound to the object
    - But when we set the object equal to a function, we lost the binding of this:

```js
const func = function() {
  console.log(this);
};
func(); // undefined
```

## Solution - Use the `bind()` method available in JavaScript
* Set the `this` binding in certain situations

`const getName = obj.getName.bind(obj);`

* Now our error goes away
* We can use `bind()`s first argument to set the **context** of `this`
* Now we get access to `this` again

`const getName = obj.getName.bind({ name: 'Joe' });`

* Now I force `this.name` to be `Joe`
* You lose the `this` binding in various places in JavaScript and event handlers is one of those places

### More info on `bind`
* Search chrome with `mdn bind`
* [more documenation on bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* We are using it to reset the **context**
* You can delete the test code we added to experiment with bind

### Fix our existing error on `Remove All` button using bind
```
// MORE CODE
class Options extends React.Component {
  handleRemoveAll() {
    console.log(this.props.options);
    // console.log('remove all test');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>
        <p>Options here</p>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
        <Option />
      </div>
    );
  }
}
// MORE CODE
```

* Now we no longer get the error and we see the output in the console `["Option Uno", "Option Dos", "Option Tres"]`

## A better solution
* We need to rerender `bind()` every time the component renders
* It is expensive on our resources

### Steps
1. Define the constructor inside the class
2. The constructor function gets called with the `props` objects
    * Same thing that we can access in `render()` but it also gets passed into `constructor()`
    * We need to make sure we call `super(props)`
    * If we don't call `super(props)` then we won't have access to `this.props`

```
class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }

  handleRemoveAll() {
    console.log(this.props.options);
    // console.log('remove all test');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>
        <p>Options here</p>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
        <Option />
      </div>
    );
  }
}
```

* Now wherever we call `handleRemoveAll` we will have access to `this`
* This is better because I only have to render this bind once when the component gets initialized and doesn't need to get rebound every time the component renders - way more efficient then binding it inline every time
* Click `Remove All` button again and you'll see it still works

## Takeaway
* Binding inline is less efficient then binding in the constructor

## Next
* We are going to learn how we can set up our React components to render data and have real time binding so that when the data changes, automatically rerender the UI, (that is different than what we did in `jsx-indecision` where we manually called `render()` every single time we manually changed the data)

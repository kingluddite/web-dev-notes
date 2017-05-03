# Component `state` and `Signup` Form
* One way to render dynamic information inside our **React** Components 
    - Pass in `props` and use those `props` in our render method(s) that get called by `render()`
    - This enables us to render dynamic **JSX**

## React `state`
Essential to understand for building real world **React** Components

## How does `state` fit in with the rest of the Component?

![state diagram with props](https://i.imgur.com/E89ZOG7.png)

Your Component can not update `props` but your Component can update `state`

1. A form that needs to show an error message if the input is invalid
2. The Component needs to do something with the user clicks a button
3. Then we need to render a warning message, "_Hey, you need to fill out those fields_"

### Example of how `state` could be used
* Our `state` is nothing more than an object
* It is just like `props`
    - Instead of `this.props` 
    - We access `state` via `this.state`

### Why use `state?`
We can use that Component `state` when we are rendering just like we can with `props`

* The value is user interaction can change the `state`
* So if someone clicks a button we can increment a counter and we can show that new count in our Component

## Our `Signup` form
1. Someone signs up and **submits** form
2. We check if they filled it out properly
3. If not we update the `state` and show that **warning message**
4. This will get re-rendered to the browser

## `props` === external vs `state` === internal
* `props` come into a Component
* `state` is manage internally by the Component
* Other Components **CAN NOT** manage this Component's state
* And this Component **CAN NOT** manage the `props` that get passed in
* `props` are external
* `state` is internal

## How do we create the `state` object?
Via the `constuctor()` method

`Signup.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }
  render() {
    return(
      <div>
        <h1>Signup</h1>

        <p>{this.state.count}</p>
        <Link to="/">Already have an account?</Link>
      </div>
    );
  }
};

export default Signup;
```

* The `constructor()` method gets called 
    - When the Component **class** gets instantiated
    - With whatever arguments get passed in
* In the case of our Components class, **JSX** passes in the `props` object
    - So we have access to all of our `props`
* If we are going to override the `constructor()` for **React.Component**
    - We have to:
        1. Call the parent `constructor()` using `super()`
        2. Pass in the `props` (_super(props)_)
    - This just makes sure that **React.Component** gets the values it needs

## Setting `state`
We can set it equal to an empty object

```
this.state = {
      
};
```

### A Simple `state` counter
We can put anything inside it we want and for now, we'll just use a simple counter

* We can have **properties** that are:
    - `strings`
    - `numbers`
    - `objects`
    - `objects` with `arrays`
    - `arrays of objects`
    - Just use your imagination and you can put any value inside of `state`
    
* Your Component updates when:
    - The `props` get changed
    - The `state` gets changed

### How do we render `state`?
`this.state.count`

```
this.state = {
  count: 0
};
```

## View in browser
You should see `0` rendered to the screen

![0 rendered](https://i.imgur.com/l8mUYad.png)

## How can we update our `state`?
### Never do this!
You never manipulate `state` directly with something like:

```
  increment() {
    this.state.count = 1;
  }
```

Because your Component needs to know when the `state` gets updated so it can do stuff behind the scenes to make sure the new `state` value shows up.

## The right way to set state
Instead, when you want to update `state` you use:

`this.setState({})`

* `this.setState()`
    - Super simple function
      + It takes an **object** and on that **object** you can provide all of the `state` **properties** you want to update
    - If you don't provide one, that's fine, it won't get erased
    - We just provide the `state` **properties** we want to change

```
import React, { Component } from 'react';
import { Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  increment() {
    this.setState({
      count: this.state.count + 1
    });
  }
  
  render() {
    return(
      <div>
        <h1>Signup</h1>

        <p>{this.state.count}</p>
        <button onClick={this.increment.bind(this)}>+1</button>
        <Link to="/">Already have an account?</Link>
      </div>
    );
  }
};

export default Signup;
```

### View in browser
* Click the `+1` button and you will see the counter increase by **one** with every **click**
* If you don't bind `this` (_this.increment.bind(this)_) you will get an error

![bind error](https://i.imgur.com/ukW9QGn.png)

### `props` and `state` - the dynamic duo!
* When we set our `state` we have access to our `props`
* So we can use `props` to set default values for our `state`

#### Example:

```
// more code
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: this.props.count || 0
    };
  }
// more code 
```

We would just have to pass in the **count** `props` to `Signup`

`<Signup count={4} />`

## Exercise
Create a `decrement()` function and button that when clicked reduces the `state` value

<details>
  <summary>Solution</summary>
```
import React, { Component } from 'react';
import { Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  increment() {
    this.setState({
      count: this.state.count + 1
    });
  }

  decrement() {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return(
      <div>
        <h1>Signup</h1>

        <p>{this.state.count}</p>
        <button onClick={this.increment.bind(this)}>+1</button>
        <button onClick={this.decrement.bind(this)}>-1</button>
        <Link to="/">Already have an account?</Link>
      </div>
    );
  }
};

export default Signup;
```

### inline functions are another option
You could also use an inline event handler (_They both work the same_)

```
<button onClick={this.increment.bind(this)}>+1</button>
<button onClick={() => {
 this.setState({ count: this.state.count - 1})
}}>-1</button>
```
</details>

* Remove the `increment()` and `decrement()` methods as we don't need them inside our app

## Create our form
* We want to have a form that had email and password inputs and a button
* When the user submits the form it will generate an error if either are empty
* It will keep track of error message inside `state`
* The default error should just be an empty string
* If there are no errors we don't want to show anything at all

```
import React, { Component } from 'react';
import { Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      error: 'Oops. You broke something.'
    });
  }

  render() {
    return(
      <div>
        <h1>Signup</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password"/>
          <button type="submit">Create Account</button>
        </form>
        <Link to="/">Already have an account?</Link>
      </div>
    );
  }
};

export default Signup;
```

* **important** `undefined` returned from JSX results in nothing showing up
* We use a **ternary operator** to check for errors and not to render extra unneeded `<p>` which would mess up layout if we were rendering them with no content inside them
* We pass `e` which could be spelled `evt` or `event`. You will see it spelled like all of these the more you work with JavaScript as each developer has their own style
* We `preventDefault()` to make sure we don't get the default page refresh when submitting a form

## Output
Submit the form and you'll see

![broke](https://i.imgur.com/c53Aa1b.png)

## Next
Connect our form with the **Meteor API** creating real user accounts

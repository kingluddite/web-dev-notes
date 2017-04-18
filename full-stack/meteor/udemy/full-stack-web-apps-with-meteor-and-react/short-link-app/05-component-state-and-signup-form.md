# Component State and Signup Form
Rendering information inside our **React** Components we have one way to do it and that is by passing in `props` and using those `props` in our render method or methods that get called by `render()` and this enables us to render dynamic **JSX**

## React State
Essential to understand for building real world **React** Components

## How does State fit in with the rest of the Component?

![state diagram with props](https://i.imgur.com/E89ZOG7.png)

Your Component can not update `props` but your Component can update `state`

A form that needs to show an error message if the input is invalid. The Component needs to do something with the user clicks a button, and then we need to render a warning message, "_Hey, you need to fill out those fields_"

Our `state` is nothing more than an object. It is just like `props` (_instead of `this.props` we would access the `state` values via `this.state`_)

We can use that Component `state` when we are rendering just like we can with `props` (_so if we can do the same thing, what's the real value of using `state`?_)

The value is user interaction can change the `state`. So if someone clicks a button we can increment a counter and we can show that new count in our Component

## Our signup form
When someone signs up and **submits** form, we will check if they filled it out properly and if not we will update the `state` and show that warning message and this will get re-rendered to the browser

**note**

* `props` come into a Component
* `state` is manage internally by the Component
* Other Components can not manage this Components state and this Component can not manage the `props` that get passed in
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

* The `constructor()` method gets called when the Component **class** gets instantiated (_in this example when `Signup` **class** gets instantiated_)
* The `constructor()` method gets called with whatever arguments get passed in
    - In the case of our Components class, **JSX** passes in the `props` object
        + So we have access to all of our `props`
* If we are going to override the `constructor()` for React.Component we do have to call the parent `constructor()` using `super()` and passing in the `props` (`super(props)`)
    - This just makes sure the **React.Component** gets the values it needs

## Setting `state`
We can set it equal to an empty object

```
this.state = {
      
};
```

We can put anything inside it we want and for now, we'll just use a simple counter

* We can have:
    - **properties** that are `strings`, `numbers`, `objects`, `objects` with `arrays`, `arrays of objects`, just use your imagination and you can put any value inside of `state`
* Just as your Component updates when the `props` get changed, your Component also updates when the `state` gets changed
* To render `state` we just use `this.state.count` (_we use `count` here because that was the property we initially set inside our `state`_)

```
this.state = {
  count: 0
};
```

## View in browser
You should see `0` rendered to the screen

![0 rendered](https://i.imgur.com/l8mUYad.png)

## How can we update our `state`?
You never manipulate `state` directly with something like:

```
  increment() {
    this.state.count = 1;
  }
```

Because your Component needs to know when the `state` gets updated so it can do stuff behind the scenes to make sure the new `state` value shows up.

Instead, when you want to update `state` you use:

`this.setState({})`

* `this.setState()`
    - Super simple function
      + It takes an object and on that object you can provide all of the `state` properties you want to update
    - If you don't provide one, that's fine, it won't get erased
    - We just provide the `state` properties we want to change

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
Click the `+1` button and you will see the counter increase by **one** with every **click**

Using `state` and `props` together we can create awesome apps!

### props and state
When we set our `state` we have access to our `props` so we can use `props` to set default values for our `state`

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

## Exercise
Create a `decrement()` function and button that when clicked reduces the `state` value

### Solution
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

## Create our form
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

* `undefined` returned from JSX results in nothing showing up
* We use a **ternary operator** to check for errors and not to render extra unneeded `<p>` which would mess up layout if we were rendering them with no content inside them
* We pass `e` with could be spelled `evt` or `event`. You will see it spelled like any of these
* We `preventDefault()` to make sure we don't get the default page refresh when submitting a form

## Output
Submit the form and you'll see

![broke](https://i.imgur.com/c53Aa1b.png)

## Next
Connect our form with the **Meteor API** creating real user accounts

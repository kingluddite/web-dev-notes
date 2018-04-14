# Working with React Events
* Events in React are same as events in JavaScript
* [SyntheticEvent](https://facebook.github.io/react/docs/events.html)
* The only difference is all React events are wrapped in the cross-browser `SyntheticEvent`
    - The only reason for this is to make sure it works across all browsers
    - One of the reasons people used and loved jQuery so much was because it "just worked" across all browsers
    - Because React wraps all its events inside the **SyntheticEvent** it "just works" and you don't have to worry about React events not working in other browsers

## inline JavaScript? WTF???
* Yes, in React, you write your events inline
* You probably have been taught that the separation of concerns is good (put html in html, css in css and JavaScript in JavaScript)
* In React, they all come back together and go against what you were taught... but for a good reason

## Simple example of event
```
// MORE CODE
class TeamPicker extends React.Component {
  handleClick() {
    alert('yo');
  }

  render() {
    return (
      <form className="team-selector">
        <h2>Please Enter a Team Name</h2>

        <button onClick={this.handleClick}>Click Me!</button>

        <input type="text" required placeholder="Team Name" defaultValue={getFunName()} />
        <button type="submit">Visit Team</button>
      </form>
    );
  }
}
// MORE CODE
```

* Refresh page
* Click button
* You will see alert window pop up with 'yo'

## Our first event
```
import React from 'react';
import { getFunName } from './../utilities/helpers';

class TeamPicker extends React.Component {
  goToTeam() {
    console.log('goToTeam function called');
  }

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam}>
        <h2>Please Enter a Team Name</h2>

        <input type="text" required placeholder="Team Name" defaultValue={getFunName()} />
        <button type="submit">Visit Team</button>
      </form>
    );
  }
}

export default TeamPicker;
```

## View in browser
* There is a flicker
* Add `preserve log` inside chrome dev tools (in console)
  - Check the checkbox

* We need to do **2** things:

1. When the user submits the `TeamPicker`'s button we need to grab the value the user entered into the input field and get that value into React
2. We need to change the URL from `/` to `/team/value-they-type-in-input-field`

### Which event should we use? click or submit?
* We need `click` but also if someone hits the `return/enter` key and that event is the `onSubmit` event

#### Creating our own method
* What do we want to happen when the `onSubmit` is fired? 
* We will create a function above the `render()` that will have what we want to happen coded inside that custom function
* We will then call that function by name at the value for our `onSubmit()` event

## Important Rule! - No commas inside ES classes

`src/components/TeamPicker.js`

```
class TeamPicker extends React.Component {
  goToTeam() {
    console.log('goToTeam() method fired!');
    // first grab text from text field
    // second change URL from / to /team/:teamId
  }

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam}>
        {/* Look here */}
        <h2>Please Enter a Team</h2>
        <input type="text" required placeholder="Team Name" defaultValue={getFunName()} />
        <button type="submit">Visit Team</button>
      </form>
    )
  }
}

export default TeamPicker;
```

### We use `this.goToTeam` and not just `goToTeam`
* Why `this`?
    - Because `render()` methods are bound to the class they are inside of

### Bind or not to Bind
* But all the other methods that we create will not be bound to the class so we need to use `this` to associate that method with the class

### How can we bind these methods to the component (class) 
* There is a way that we will talk about later

### Using `this`
* Because `render()` is bound to the Component, we can use `this` inside the `render()` method and it will always equal the Component

### Why did my page just flash?
* Why when we `press enter` or `click` the button does the `console.log()` first and then disappear?
    - Because the page refreshes

### We don't want our event to fire when page loads
* We do not use `goToTeam()` 
* But rather `goToTeam` because we don't want to fire the event as soon as the page loads
* So we omit the `()`
* And just reference the function name
    - Then we just wait for the user to `click` submit button
    - Or `press enter` before we call the function and trigger the `console.log()`

## Preserve the log
* To preserve the log and prevent it from quickly disappearing we can click the `Preserve log` checkbox in the inspect
* Check it and click the button
    - You should see:

![Preserve log](https://i.imgur.com/6i4Z0f4.png)

## Why is `console.log()` flashing and leaving?
* Forms by default take the data you enter into them and then it will send that data to whatever the action of the form is
    - Or it will just refresh the page if we didn't provide an action

### preventDefault()
* In vanilla JavaScript we just use `preventDefault()` to stop a form from submitting or refreshing the page

#### Update our `goToTeam()` method
```
// MORE CODE
class TeamPicker extends React.Component {
  goToTeam(e) {
    // 1. Stop the form from submitting
    e.preventDefault();
    // 2. get the text from that input
    // 3. Change the page to /team/whatever-they entered
  }
// MORE CODE
```

* `event` is the event that we are now passing to our `goToTeam()` method
* `event.preventDefault()` prevents the form from refreshing the page
* You can uncheck the `Preserve log` checkbox
* View the console tab and you will see every time you click or press enter or `goToTeam()` method is fired
* And the default page refresh on submit does not happen because we turned off the default JavaScript form behavior

## Grabbing the input text value
**note** golden rule in React is **don't touch the DOM**
* React handles the DOM - not you!
* We can't use jQuery with something like `const value = $('input').val();`
* But in React you want to avoid touching the DOM as much as possible
* Because the way React works is:
    - We modify the data and we write our JSX
    - And we are hands off with touching the DOM
    - We let React handle handling the DOM for us

### So if we can't touch the DOM how do we get stuff from the DOM when we need it?
* Using a `ref`

#### What is a `ref`?
* A way to reference the actual inputs

```
// This is a functional ref ------ YUCKY!
render(
 return (
   <input type="text" required placeholder="Team Name" defaultValue={getFunName()} ref={(input) => { this.teamInput = input }} />
 )
)
```

* So what the above code is doing is when the input is added to the page, it will have a reference added to it on the class itself
* I don't like referencing like above so below is a better solution and the one I recommend
* `ref="myInput"` is **deprecated**
* **function ref** (harder to understand)
  - `ref={(myInput) => this.myInput = myInput`
    + Was the standard way to do references and React is keeping but there is a much simpler way to use references
    + Can be used for any element on the page

## New "cleaner" way to use `ref`

```
import React from 'react';
import { getFunName } from './../utilities/helpers';

class TeamPicker extends React.Component {
  teamInput = React.createRef();

  goToTeam(e) {
    e.preventDefault();
    // console.log('goToTeam() method fired!');
    console.log(this.teamInput);
  }

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam}>
        <h2>Pick a Team</h2>
        <input
          type="text"
          ref={this.teamInput}
          required
          placeholder="Team Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Team</button>
      </form>
    );
  }
}

export default TeamPicker;
```

* This is the new way to add references in React

```
// MORE CODE
teamInput = React.createRef()
// MORE CODE
<input
  type="text"
  ref={this.teamInput}
// MORE CODE
```

## View in browser
* We get an error `teamInput` of undefined
  - `Cannot read property 'teamInput' of undefined`
* Why is `this` undefined?

```
// MORE CODE
goToTeam(e) {
  e.preventDefault();
  // console.log('goToTeam() method fired!');
  console.log(this);
  // this.myInput;
}
// MORE CODE
```

* This error is a weird part of React
* The fix is simple but you need to understand why this is happening
* Above we just log out `this` and see that it is **undefined**

### more on `this`
* Inside `render()` `this` is defined as the component it is inside (so this is defined inside the component)
* But outside of the `render`, `this` is **undefined**
* This is because of **binding** in react

## Binding in React
* React has a bunch of built-in methods:
  - render()
  - LifeCycle events
    + example:
      * `componentDidMount() {}`
        - Runs as soon as component is put on the page (aka mounted to the page)

`TeamPicker.js`

```
// MORE CODE
class TeamPicker extends React.Component {
  componentDidMount() {
    console.log('Mounted');
    console.log(this);
  }

  teamInput = React.createRef();

  goToTeam(e) {
// MORE CODE
```

## View in browser
* As soon as page loads we see that `componentDidMount()` is working because we see `Mounted` in the console
* We also see that `this` is bound to the `TeamPicker` component
* **note** All built-in React methods are bound by default
* But any methods we `extend`, are not bound by 
  - This makes it hard to reference a component from inside one of our custom methods
  - So when you use `extends` on the **mamma** React component, any method you create on that extended component is not bound by default
    + This makes it hard to reference a method from inside your custom components
    + When working with state and trying to reference it with `this.setState` not accessing `this` will be a problem

### What is the solution to this problem?
* Bind our own methods as well

## Why is there so many elements in our React tab?
* So check out **React tab**
* You will see that it takes a lot of clicking to get to our `TeamPicker`
* Because now that we are using the `router` Component, it has added a ton of nested Components

![long path to TeamPicker](https://i.imgur.com/T07GSBa.png)

Notice that when we select the `input` we see it has a `Ref` on it

### Search is faster
* Instead of digging deep to find the `TeamPicker` Component you can just search for it inside the `Search by Component Name` text field (on **React tab**) and type `TeamPicker`

## To Bind or not to bind
* We can use `this` inside `render()` but outside of `render()` **this** does not equal the Component

### How do I reference the TeamPicker inside of another method?

#### The Old way

```
var TeamPicker = React.createClass({
    goToTeam() {
    }
    render() {
        return <p>yo</p>
    }
});
```

* But **React** now switched to using ES6 class and the binding of `this` has changed
    - Why?
    - Because ES6 classes do not implicitly bind all the methods to the class (Component)

### Three ways to manually bind `this` to our Component
1. In the constructor
2. Inline
3. Use a property instead of a method (preferred)

### A better way to bind - Make it a property
* (_instead of a method_)
* inline make your code verbose (con)
* binding inside constructor can take up a lot of space (con)

`TeamPicker.js`

```
// MORE CODE
class TeamPicker extends React.Component {
  myInput = React.createRef();

  goToTeam = (event) => {
    event.preventDefault();
    console.log(this);
  }

  render() {
// MORE CODE
```

## The above solution
* Instead of creating a **method** on the Component we declare a **property** which will be set to an arrow function
  - since properties are bound to the instance rather than nothing
  - Now we're able to access `this` inside of it
* You may have wondered why we would use the arrow function over a regular function and the reason it was created was to handle `this`
  - When we have an arrow function the `this` inside that arrow function is bound to the parent (which would be the class)

## Test in browser
* Now we see that `this` is defined and represents the Component

## Reading Assignment
* [What is the DOM?](https://css-tricks.com/dom/)

# Class based components

**note** If [you see an error](https://i.imgur.com/V9hOVOm.png) when you stop and restart **Meteor**, just copy and paste `meteor npm install --save meteor-node-stubs` and hit enter. If you don't see it, no worries and continue on down the road to learning react and meteor

## Where should we put our axios request?
Right now we are doing it inside our `Meteor.startup()` method and in a **Meteor** App that is a good place for it. But in a **React** app we don't want to make the request outside of the application

Whenever we are working with data inside of **React** we always want a **React** Component to be able to source it's own data (_aka - we want a component to be able to go and fetch it's own data_)

### Let's analyze our components right now
All our components are simple functions. So they run one time. They get executed. They return some **JSX**. And that's it. That's all they do. There is no ability to tell a component to go and fetch some data and when it's done fetching that data, go ahead and rerender itself. Or take the data and render something new to the screen

So we need a bit of a construct here. A methodology where we can tell a component when you are about to be rendered please go and make a request. To do that we are going to introduce a new class of components

Up to this point we've only been using `functions` as components. The other type of component we have access to in React is a `class based component`

## Class based components
ES6 (_aka ES2015 - whatever terminology you like to go with_) class

### Time to refactor our functional component to a class based component

Let's refactor our `App` Component

`App.js`

Here is our starting point:

```
const App = () => {
  return (
    <div>
      <ImageList />
    </div>
  );
};
```

And make this change:

```
class App extends Component {
  render() {
    
  }
}
```

The `render()` method is a special method in a React Component. In all our existing components they were functions, they were executed, they returned some **JSX** and that **JSX** was put on the screen

With a class based component we instead define a `render()` method. The `render()` method is executed whenever this component needs to be rendered to the screen

So in our case when we try to render `App` to the screen with `ReactDOM.render()`

`ReactDOM.render(<App />, document.querySelector('.container'));`

Then the `App` class's `render()` method will be executed and whatever it returns will be placed on the screen

```
class App extends Component {
  render() {
    return (
      <div>
        <ImageList />
      </div>
    );
  }
}
```

### View in browser
We get an error: `ReferenceError: Component is not defined`

#### Why the error?

Look at this line:

`class App extends Component {`

Component is a base class for our component. It is a component that already has already completed functionality. And this is set up by **React**. So when our `App` **extends** `Component`, we are sub-classing (as much as JavaScript can do sub-classing (_it really doesn't sub-class but just extends with prototypal inheritence_), we are borrowing functionality from `Component`

So we just need to make sure that this `Component` is defined

* To define this Component we import it as a separate object off of the **React** library at the top of our `App` code

`import React, { Component } from 'react';`

This means - find the **React** library and pull off the property `Component` from the **React** library

That then gives us access to the `Component` object right here:

`class App extends Component {`

Which allows us to **extend** `App`

**note** Even though we use the term **class** in JavaScript there really is no such thing as `classes`. It really is syntactic sugar over prototypal inheritence which is what JavaScript uses

### View in browser
It should work just as it did before but now we are using a class based Component which will give us the ability to say when `App` is about to be rendered to the screen, then go ahead and fetch our data, then go ahead and make our **Ajax** request



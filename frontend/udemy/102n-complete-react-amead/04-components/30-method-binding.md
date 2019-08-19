# Method Binding
`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* Let's talk about the `this` binding
  - This involves class methods
    + handlePick()
    + handleRemoveAll()
    + handleAddOption()

## Let's focus on Options class and `handleRemoveAll()`
* The methods are bound to the class instance

### Remember the student class?
```
// MORE CODE

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    let description = super.getDescription();

    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }

    return description;
  }
}
// MORE CODE
```

* The word `this` referred to the class Student
* We do the same thing in Options class

```
// MORE CODE

class Options extends React.Component {
  handleRemoveAll() {
    alert('Remove all options');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
    );
  }
}
// MORE CODE
```

* Inside the `render()` method `this` binding works as expected
  - handleRemoveAll() in `render()` works as expected
  - But we broke the binding for the method `handleRemoveAll()`

## Let's prove the binding is broken
* If we try to log out `this.props.options` inside our `handleRemoveAll()` method

```
// MORE CODE

class Options extends React.Component {
  handleRemoveAll() {
    console.log(this.props.options);

  }
// MORE CODE
```

* Click on the `Remove All` button

### Houston we have a problem!
* We get an error `TypeError: Cannot read property 'props' of undefined`
* `this` loses it's binding and this is the problem

#### This losing binding is not ES6 class specific or React specific
* So we can explore this in isolation

##### binding exploration
* We'll create an object with a property and a method
* **note** Remember objects separate properties and methods with commas
* **note** When we use ES6 classes we can use the method definition
  - We can also use that in our objects

```
const obj = {
  name: 'John',
  getName() {
    return this.name;
  },
};
console.log(obj.getName()); // John

class IndecisionApp extends React.Component {
// MORE CODE
```

* So our client console output is `John` as expected

## Now let's break the `this` binding
* With a small tweak to our code

```
const obj = {
  name: 'John',
  getName() {
    return this.name;
  },
};
const getName = obj.getName;
console.log(getName());
// MORE CODE
```

## Houston we have a problem!
* Uncaught TypeError: Cannot read property 'name' of undefined
* The code is the same in both cases but the context is different
  - obj.name is in the context of an object so we have access to that object as the `this` binding
    + But when we break it out into a function like `console.log(getName())` we lost that binding because the context does not get transferred
      * Now we just have a regular function and regular function have `undefined` for their `this` 

## Prove regular functions have undefined for `this`
```
const obj = {
  name: 'John',
  getName() {
    return this.name;
  },
};
const getName = obj.getName;

const func = function() {
  console.log(this);
};
func();
console.log(getName());
```

* You will see `undefined` prints to log before the error 

## Fix for binding issue
* How can we set the `this` binding in certain situations with the `bind()` method available in JavaScript

### The `bind()` method
* Bind is a method on a function
* We are going to want to call the `bind()` method
* When we call the `bind()` method we'll get our function back
* So this: `obj.getName` and `obj.getName.bind()` return the same thing and we'll get the same error
* But what is useful with `bind()` is that you can use the first argument to set the `this` context
  - Which means that I can set it equal to `obj.getName` like this:

##
```
const obj = {
  name: 'John',
  getName() {
    return this.name;
  },
};
const getName = obj.getName.bind(obj);
// MORE CODE
```

* Now we get `John` and we've fixed our binding issue
* By setting bind() equal to our object `bind(obj)` we bring the context back to what we expect

## Do I have to reference an object?
* No you can reference whatever you want
* I could set the context to be an inline custom object

```
const obj = {
  name: 'John',
  getName() {
    return this.name;
  },
};
const getName = obj.getName.bind({ name: 'Jane' });
```

* We just forced the `this` context for `getName` to be that object accessing this.name returns `Jane`

### The `bind()` is a very handy tool in JavaScript
* There are various places we lose the binding and event handlers are one of them
* [More about JavaScript bind method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

## Let's integrate `bind()` into our classes
### We'll work with our Options class
* The goal is to log out our options array inside of `handleRemoveAll()`

```
// MORE CODE

class Options extends React.Component {
  handleRemoveAll() {
    console.log(this.props.options);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
    );
  }
}
// MORE CODE
```

* There are a few places you can use bind inside of your components
* Here is one place we can use bind:

```
// MORE CODE

class Options extends React.Component {
  handleRemoveAll() {
    console.log(this.props.options);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
    );
  }
}
// MORE CODE
```

* Notice where we used bind:

`<button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>`

* We reference the method like we did for the method in the plain object example
  - This gets called later which breaks the `this` context

`<button onClick={this.handleRemoveAll>Remove All</button>`

* We can fix that by setting our own context

`<button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>`

* In this case `render()` is not an event handler so it won't lose that binding
  - `render()` has the correct `this` binding
    + We were able to access this.props.options and this.handleRemoveAll so what we want to set the binding equal to is `this` like:

`<button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>`

* This will ensure that `this` binding for `handleRemoveAll()` has the exact same binding as `render()`
* So when you click the `Remove All` button it will console log to the client the options `["Item One", "Item Two", "Item Four"]`

## This technique works but is a little inefficient
* It requires us to rerun bind every time the component rerenders
* And as our components rerender more and more often it can get "expensive"

### An improvement
* We'll remove the bind and it will break again
* We'll override the constructor function for React Component very similar to what we did for Student:

```
// MORE CODE

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
// MORE CODE
```

* We'll do the same thing to fix the `this` binding for `handleRemoveAll`

1. Step 1: Define the constructor

```
// MORE CODE

class Options extends React.Component {
  constructor() {

  }

  handleRemoveAll() {
// MORE CODE
```

* **note** The constructor function in React gets called with the `props` object

```
// MORE CODE

class Options extends React.Component {
  constructor(props) {}

  handleRemoveAll() {
// MORE CODE
```

* The `props` in the constructor function refers to the same thing as the `this.props` does inside the render() method but the constructor function gets it passed in

2. We also need to call `super(props)` just as we did with `Student`

* It is very important to pass super `props` because if we don't then we will not have access to `this.props`

```
// MORE CODE

class Options extends React.Component {
  constructor(props) {
    super(props);
  }
// MORE CODE
```

* Above is just the bare minimum if you are going to override the constructor function this does NOT add on any behavior?

## How do we add on behavior?
* We want to add on behavior
* Our goal is to bind `this.handleRemoveAll`
* We will just sent in the constructor `this.handleRemoveAll` equal to itself

```
// MORE CODE

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll;
  }

  handleRemoveAll() {
// MORE CODE
```

* But that really doesn't do anything because we just set something equal to it's own value

3. Add the `bind()` method

```
// MORE CODE

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind();
  }

  handleRemoveAll() {
// MORE CODE
```

* Now the constructor function is not an event callback like `this.handleRemoveAll` so much like render() the context is correct by default so all we need to do now is bind it to `this`

4. Bind it to `this`

```
// MORE CODE

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }

  handleRemoveAll() {
    console.log(this.props.options);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
// MORE CODE
```

* Now when you click you will see the options in the client console

### What improvement did we just make?
* Our code change makes sure that wherever we call `handleRemoveAll` the context is correct which means if we used it multiple times below I wouldn't have to type manual multiple bind calls inline
* And it also means I just run the binding once in the constructor, when the component first gets initialized, and it does not need to get rebound every single time the component renders which is far more efficient than our previous solution

## Save and test
* It should work just as it did before but it is now far more efficient

## Recap
* We have 2 ways to bind those event handlers

1. We can call `bind()` inline in render() but that is not efficient
2. Call bind in the constructor() which is far more efficient

## Don't worry about setting up the bind() for the other components

## Next
* We will look at how we can set up our React components to render data and have that real time binding so when the data changes automatically rerender the UI which is in contrast to what we saw in the jsx-indecision.js file where we needed to manually call render every single time we manually changed the data

`jsx-indecision.js`

```
const app = {
  title: 'My First React App',
  subtitle: 'Learning About Expressions',
  options: [],
};
const onFormSubmit = e => {
  e.preventDefault();
  const optionEl = e.target.elements.option;
  const option = optionEl.value;

  if (option) {
    app.options.push(option);
    optionEl.value = '';
    rerenderPageEls();
  }
};

const removeAllItems = () => {
  if (app.options.length > 0) {
    app.options = [];
    rerenderPageEls();
  }
};

// const onMakeDecision = () => {
//   const optionsLen = app.options.length;
//   const randomNum = Math.floor(Math.random() * optionsLen);
//   console.log(randomNum);
// };

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};
const rerenderPageEls = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      {app.options.length > 0 ? (
        <p>Here are your options</p>
      ) : (
        <p>No options</p>
      )}
      <button onClick={removeAllItems}>Remove All</button>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>
        What should I do?
      </button>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
      <ol>{app.options.map(option => <li key={option}>{option}</li>)}</ol>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('root');

rerenderPageEls();
```

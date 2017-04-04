# Difference between Component instances and Component classes
ReactDOM is used to interact with the actual DOM while React is used to create and manager our Components

We still have an error. Why?

When we create a Component we create a class of a Component. A type of Component. We currently have one Component `App`. We could have many different intstances of `App`

```
const App = function () {
  return <div>Hello</div>;
}
```

This is a class. Not an instance

Think of the above function as a factor where we pump out instances and render it to the DOM

### Making sense of our error
` Instead of passing a component class, make sure to instantiate it by passing it to React.createElement`

We passed a **class** to ReactDOM, not an **instance**

### Lesson learned
We need to instantiate our Components before we try to render them to the DOM

[try it out](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&code=%3Cdiv%3E%3C%2Fdiv%3E)

If you type: `<div></div>` babel will transpile it to this:

```
"use strict";

React.createElement("div", null);
```

So when we write JSX, and type the Component name `App`. That Component name is a Component class, but using it inside of **JSX** turns it into a Component instance

That is the connection between JSX, a Component and a Component instance

So if you type this in babeljs.io:

```
const App = function () {
  return <div>Hello</div>;
}
// Take this Component's generated HTML and put it on the page (inside the DOM)
ReactDOM.render(<App />);
```

You will get this in the output

```
"use strict";

var App = function App() {
  return React.createElement(
    "div",
    null,
    "Hello"
  );
};
// Take this Component's generated HTML and put it on the page (inside the DOM)
ReactDOM.render(React.createElement(App, null));
```

This means that typing `<App />` you are actually typing the **instance** of `App`

The following code passed an instance of `App` to `ReactDOM.render()`

### Test in browser
The last error is gone but we have yet another error: `_registerComponent(...): Target container is not a DOM element`


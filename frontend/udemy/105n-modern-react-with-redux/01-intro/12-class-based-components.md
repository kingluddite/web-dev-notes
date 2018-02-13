# Class-based Components
* Here we will create a Component not with a function but with an ES6 **class**
* Here is our current `SearchBar` Component

```js
const SearchBar = () => {
  return <input />
}
```

* Some information comes in (maybe through an argument)
* Some information comes out (through the `return`)
* And JSX is eventually rendered to the DOM

## Functional Component
* This is a **React** Component we call a **functional Component**
* We call it this because it literally is a function
    - One function, some info goes in some JSX comes out - 
    - It's that simple!

## Class [Component](Component)
* This is another type of Component in `React`
* We create a **class Component** whenever we need the Component to keep some sort of internal record keeping 
* Some ability for it to be aware of itself
    - And what's happened to it since it has been rendered
* Because our `SearchBar` is an **input** we are going to need the ability for this Component to introspect itself, some way for it to tell other Components stuff like, 'hey the user just typed into my input here and here is exactly what they typed'

## Time to upgrade our component
* From function to have more intelligence (more awareness)
* We will convert the functional Component to a `class-based Component`

### The functional Component

```jsx
import React from 'react';

const SearchBar = () => {
  return <input />
}

export default SearchBar;
```

* **note** We will create the class-based Component using an ES6 class
* An ES6 class is an actual JavaScript object with properties and methods to it

```
import React from 'react';

class SearchBar {
  
}

export default SearchBar;
```

* This creates a new class with the name `SearchBar`
* We could create a new instance of this class by typing:

`new SearchBar`

* But we don't just want our class 
* We want to extend a class that `React` has already created for us, 
* They already have a class named `Component` so we will create our class by extending it from their class

```
import React from 'react';

class SearchBar extends React.Component {
  
}

export default SearchBar;
```

* We can read this as `Define a new class called "SearchBar" and give it access to all of the funtionality that React.Component has`
  - In other words it gives our SearchBar all of the functionality from the React.Component class
* When we use the class-based method we still need to give this Component the ability to render itself
  - This means we need to return some JSX
  - So we must define a method on this class called `render()`

**note** Every Component that we create that is "class-based" must have a `render()` method

```
import React from 'react';

class SearchBar extends React.Component {
  render() {
    
  }
}

export default SearchBar;
```

**note**
* This looks different than a normal JavaScript object 
* There is no `:` after `render()` but it is still a method/function
  - Even though it doesn't look like a traditional function
* So now whenever our App Component tries to render the SearchBar Component instead of just calling a normal function (which it was before when it was a functional Component) it is going to call this `render()` function instead

## rule
* Whenever we call a `render()` we  must return some JSX (or we will get an error)

```
import React from 'react';

class SearchBar extends React.Component {
  render() {
    return <input />;
  }
}

export default SearchBar;
```

## Test in browser
* Same input as before is on the screen
* No errors

### Refactor with ES6 syntax
```
import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return <input />;
  }
}

export default SearchBar;
```

* We could have done this:

`const Component = React.Component;`

* But by using `import React, { Component } from 'react';` we are saying by using the curly braces, import React and pull off the property called `Component` as a variable called Component
* This is **named** export and you know it is a **named** export when you see it inside `{}`

## Dumb and Smarter
* Previously our Component was kind of a **dumb Component**
* It was just a function that we could call and it would return some plain JSX
* It had no ability to be aware of it's surrounding, or aware of it's **state** or have the ability to communicate with other Components very effectively

## Class based Component
* Because we want `SearchBar` to have the ability to communicate with the other Components we will be creating (to say `Hey the user just typed in this input and here is what they typed`) we decided to promote the functional Component to a class-based Component

When we write a class-based component we:
* write `class`
* The name of the Component (i.e. `SearchBar`)
* We extend React.Component
    - And that essentially gives this class a bunch of added functionality
* We must always define a `render()` method
* And we must always return some JSX inside that `render()` method
    - Or you'll get an error
* To `render()` a class-based Component is the same as a functional Component
    - We still export it
    - And we still import it into the other Components we want to use it inside of

## When to use functional Components vs class-based Components

### Best Practice
* It is a best practice to start with functional Components and only when you need to promote it to class-based then refactor it





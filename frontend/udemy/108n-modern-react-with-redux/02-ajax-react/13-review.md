# Review
* Difference between class-based Components and functional Components
    - class is used whenever we want the concept of `state` in our Component
    - functional Components are used when we have a simple Component that just takes some properties and returns some amount of static JSX
        + Nothing really changes with these, they are always the same
        + functional Components are super light-weight and super fast and very easy to get started with
        + The amount of code is dramatically less then a class-based Component
* `state`
    - Old React used `createClass` syntax but now we use class-based syntax
        + `createClass()` did a more clear job of initializing state because there was a dedicated method for it called `getInitialState`
    - But in a class-based Component we set our `state` inside a `constructor()` method
        + We don't get a special function to do that
        + In this one place (`the constructor()`)
        + We use `this.state = {}`
        + And then everywhere else (outside the `constructor()`) we use `this.setState({})`
    - Most important thing to remember with `state` is that whenever we change our `state` the Component instantly re-renders
    - Along with any children this Component contains as well
* Using `import` statements and `export` statements
    - Whenever we try to bring in a file that we wrote we give a **relative path reference**
    - Whereas, whenever we `import` a Library, we just give the name of the Library
* Using callbacks a lot to manipulate data
    - In a React app, we used callbacks twice
    - In Redux we will use callback much less often
* Component level `state`
    - Both `App` and `SearchBar` have their own `state`
        + We can pass callbacks to change the `state`
        + We can pass data from the `state` to other Components
        + But at the end of the day whenever we change `SearchBar` **state** using search state, it only triggers a change on `SearchBar`, it is very localized form of `state`
        + That will change in Redux
            * React `state` is more **component** level
            * Redux `state` is more **application** level

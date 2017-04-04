# Refactoring Functions to Classes

**note** When we made this call:

```
<button onClick={() => Meteor.subscribe('employees', 40) }
  className="btn btn-primary">
  Load More...
</button>
```

* We are not recreating our `subscription`. We are simply updating it
* We won't delete data we already loaded
    - We will just add a new set of data on top of the old data, for each button click (_This is an important distinction_)

How can we increment `40` every time the user clicks the `load more` button?

## We need to refactor
* Currently, we have a functional Component
* With **functional Components** you need to know you can render it as many times as you want
* There is no `state` that persists with a **functional Component**
* Some `props` come in. Some **JSX** goes out. But we don't get to hold onto variables like '_Hey here is the current number of employees that are fetched_'.

If we need data to persist in a component, between renders, when the component is created, we will need to refactor to a class based component

## Here is our functional component
```
// more code

const EmployeeList = (props) => {
  // props.employees => an array of employee objects

  return (
    <div>
      <div className="employee-list">
        {props.employees.map(employee =>
          <EmployeeDetail key={employee._id} employee={employee}/>)}
      </div>
      <button onClick={() => Meteor.subscribe('employees', 40) }
        className="btn btn-primary">
        Load More...
      </button>
    </div>
  )
};

// more code
```

### Here is our class based component:

```
import React, { Component } from 'react'; // make sure you modify this line
// more code
class EmployeeList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee =>
            <EmployeeDetail key={employee._id} employee={employee}/>)}
          </div>
          <button onClick={() => Meteor.subscribe('employees', 40) }
            className="btn btn-primary">
            Load More...
          </button>
        </div>
      )
  }
  // props.employees => an array of employee objects

};

// more code
```

**rule** All class components must have a `render()` method and that `render()` method must return some amount of JSX

## Functional Components vs Class-based Components
**gotcha** - Watch out for this!
* In a **functional component** our `props` object is an argument to the function
* In a **class based component** `props` are assigned to the component's `this.props` property

**note** the `this.props` is one of the things that occurs in the `Components` constructor

* We don't need the `constructor()` so we can remove this code:

```
  constructor(props) {
    super(props);
  }
```

We could use component based `state` to keep track of our initial `20` record count and then every click we increment it by `20`



# Refactoring Functions to Classes

**note** When we made this call:

```
      <button onClick={() => Meteor.subscribe('employees', 40) }
        className="btn btn-primary">
        Load More...
      </button>
```

* We are not recreating our subscription. We are simply updating it. We won't delete data we already loaded, we will just add a new set of data on top of the old data, for each button click (This is an important distinction)

How can we increment `40` everytime the user clicks the `load more` button?

## We need to refactor
Currently, we have a functional Component. With functional Components you need to know you can render it as many times as you want. There is no `state` that persists with a functional component. Some `props` come in. Some JSX goes out. But we don't get to hold onto variables like 'Hey here is the current number of employees that are fetched'.

If we need data to persist in a component, between renders, when the component is created, we will need to refactor to a class based component

## Here is our functional component
```
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './EmployeeDetail';

const PER_PAGE = 20;

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

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);
  // return an object. Whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
```

Here is our class based component:

**rule** All class components must have a `render()` method and that `render()` method must return some amount of JSX

**gotcha** - Watch out for this!
* In a functional component our `props` object is an argument to the function
* In a class based component `props` are assigned to the component's `this.props` property

**note** the `this.props` is one of the things that occurs in the `Components` constructor

```
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
```

* We don't need the `contructor()` so we can remove this code:

```
  constructor(props) {
    super(props);
  }
```

We could use component based `state` to keep track of our intial `20` record count and then every click we increment it by `20`



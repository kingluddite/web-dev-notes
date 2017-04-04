# Fetching More Users
Why are we not going to use component level state here?

* We have a subscription wired up inside our container
* Then we go and fetch all the records inside our `Employees` collection
* So whenever we get more employees, that is what is causing our component to rerender
* So inside of our component itself we are not going to use component level state here because we used component level state only to cause our component to re-render
* But in this case I don't care if my component is not going to re-render when the user clicks on the button, should not cause the component to re-render. I only want my component to re-render when my subscription updates
* Every time the user clicks on the button we increment by 20 
* We need much more logic than just update by 40

So we will pull our `subscribe()` call out to a **clickEvent** handler on the class

```
<button onClick={this.handleButtonClick.bind(this)}
            className="btn btn-primary">
            Load More...
          </button>
```

* Because this is a `callback` I need to bind the context of `this`
    - I could also define this inside the `constructor`

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './EmployeeDetail';

const PER_PAGE = 20;

class EmployeeList extends Component {
  handleButtonClick() {
    Meteor.subscribe('employees', 40);
  }

  render() {
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee =>
            <EmployeeDetail key={employee._id} employee={employee}/>)}
          </div>
          <button onClick={this.handleButtonClick.bind(this)}
            className="btn btn-primary">
            Load More...
          </button>
        </div>
      )
  }
  // props.employees => an array of employee objects

};

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);
  // return an object. Whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
```

## Add the logic
To implement the record count by 20 every time the button is clicked

We need a starting variable for the number of employees that I should be fetching

### We have access to Lifecycle Methods
A Lifecycle method is a method we can choose to define on our class and if we define it, it will be called automatically

```
// more code
class EmployeeList extends Component {
  componentWillMount() {
    this.page = 1;
  }
// more code
```

**note** `this.page = 1` will be a variable we will use to decide how many employees we are going to fetch

```
handleButtonClick() {
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }
```

* We use (_this.page + 1_) because we are already starting with 20 and so when we click the button the first time, we want to load 40 and (this.page + 1) allows us to do that (_if we didn't do this, we would see 20 records on app load but after clicking button 1 time, we still would only see 20 records but if we click again then we would see the 40 records_)

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './EmployeeDetail';

const PER_PAGE = 20;

class EmployeeList extends Component {
  componentWillMount() {
    this.page = 1;
  }

  handleButtonClick() {
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee =>
            <EmployeeDetail key={employee._id} employee={employee}/>)}
          </div>
          <button onClick={this.handleButtonClick.bind(this)}
            className="btn btn-primary">
            Load More...
          </button>
        </div>
      )
  }
  // props.employees => an array of employee objects

};

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);
  // return an object. Whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
```

Now every time you click `Load More...` button, 20 new records are loaded

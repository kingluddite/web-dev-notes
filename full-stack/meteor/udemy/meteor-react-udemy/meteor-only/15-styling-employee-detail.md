# Styling EmployeDetail

## Next Challenge
How do we pass our `employee` down into the `EmployeeDetail` Component

Whenever we are communicating from the parent Component to the child Component we use `props`

`{props.employees.map(employee => <EmployeeDetail employee={employee}/>)}`

Look at `employee={employee}`

* `{employee}` - Is from our `.map()`
* `employee=` - This the property that is going to show up on our `props` object inside of the `EmployeeDetail` Component

```
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './EmployeeDetail';

const EmployeeList = (props) => {
  // props.employees => an array of employee objects

  return (
    <div>
      <div className="employee-list">
        {props.employees.map(employee => <EmployeeDetail employee={employee}/>)}
      </div>
    </div>
  )
};

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees');
  // return an object. Whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
```

`EmployeeDetail.js`

## Here we use ES6 Destructuring

```
import React from 'react';

const EmployeeDetail = (props) => {
  // props.employee is our employee model
  const { avatar } = props.employee;
  return (
    <div className="thumbnail">
      <img src={avatar} alt="" />
    </div>
  )
}

export default EmployeeDetail;
```

## Another way

* Notice we pass the employee object `{employee}` instead of props

```
import React from 'react';

const EmployeeDetail = ({ employee }) => {
  const { name, email, phone, avatar } = employee;

  return (
    <div className="thumbnail">
      <img src={avatar} alt={name} />
      <div className="caption">
        <h3>{name}</h3>
        <ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      </div>
    </div>
  )
}

export default EmployeeDetail;
```

### View in browser
You will see it is not very pretty but we are getting there

### Next Up!
Making `EmployeeDetail` even prettier with styling



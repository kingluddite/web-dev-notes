# Updating Subscriptions
To increase the number of records we load, we will update our **subscription**

## Where is our `subscription`?
At the bottom of `EmployeeList.js`

```
export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees');
  // return an object. Whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
```

## Passing additional arguments to `subscribe()`

We can add additional arguments to the `subscribe()` call and they will be passed to the **subscription** function

```
export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);
  // return an object. Whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
```

## We get an error
**PER_PAGE** is not defined

* We need to define this CONSTANT somewhere in our file

`EmployeeList.js`

```
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './EmployeeDetail';

const PER_PAGE = 20;
// More code
```

* Now, when a user first loads our app, they are going to get 20 records per page
* Test this out by changing `PER_PAGE = 20` to `PER_PAGE = 1`

## Nothing changes? Why?
Because we need to make sure we pass this value to our publication

That `PER_PAGE` argument will be passed to this function inside `server/main.js`

```
Meteor.publish('employees', function() {
  return Employees.find({}, { limit: 20 });
});
```

And we'll update that to:

```
Meteor.publish('employees', function(per_page) {
  return Employees.find({}, { limit: per_page });
});
```

Now, if you change `PER_PAGE = 20` to `PER_PAGE = 1`, you'll only see one record

* Put the default `PER_PAGE` value to 20

When clicked, show us 40 records

```
<button onClick={() => Meteor.subscribe('employees', 40) }
  className="btn btn-primary">
  Load More...
</button>
```

We click and see 40 records but we only get 40. No more than 40

### Next Challenge
How can we increment this number by 20 each time? Why did we hard code 40?




# Creating a Container
![render diagram](https://i.imgur.com/OCKZogT.png)

Publications exist on the **server side** of our app and it acts as a window to our database (_Our MongoDB database_)

## Now let's work on the React side of our app
### Working on our first `subscription`

### What is the purpose of a subscription?
To get access to a publication

**Publication** will say - "_Here's what data I have available_"

**Subsciption** is like - "_Hey, I want that you got_"

### First Question: Where will we place the code for this subscription?

**note** Our **subscription** might change over time. So whenever we get data from our *subscription* we always have an expectation that that data will change over time. And this is true in our app. The *subscription* data is the first 20 records but when we click 'more' we will get the next 20 records, so we can see that the data in our *subscription* will change over time

So we inform you of this because anytime someone loads up more data, we need to somehow re-render our **React** components

### A Meteor package to the rescue
That will handle this case we have just discussed

![Container diagram](https://i.imgur.com/GkDC9uc.png)

#### React Meteor Data
Meteor package we will install

* This package helps us work specifically with **React** Components when we are using `collections`

**React Meteor Data** allows us to create a `Container`

##### What is a `Container`?
A **function** that allows us to update some amount of **data** that is being passed to the Component whenever a `subscription` changes (_Just a fancypants way of saying we are going to watch the **Employees collection**, whenever the **Employees collection** changes, we will take all the data that's been loaded to it on the **client side** and pass it to `EmployeeList`_)

### What is the Purpose of Container
Watch a `Collection`. Whenever it changes we will pass the **new data** to some Component that we set up

### Setting up our Container
Let's take a quick detour from **React** and get this `Container` set up. Once it is set up, we can then set up our `subscription` on the `client` side

#### Step 1 - Install library that helps us create a container
We will install two packages:

* one `npm` package (_react-addons-pure-render-mixin_)

`$ npm i -S react-addons-pure-render-mixin`

* One `Meteor` package (_react-meteor-data_)
    - This will allow us to create a `Container`
        + **remember** - Purpose of `Container` is to watch a `collection`/`subscription`, whenever that `collection` changes, we will go ahead and rerender our Component

`$ meteor add react-meteor-data`

`client/components/EmployeeList.js`

### import `meteor/react-meteor-data`

`import { createContainer } from 'meteor/react-meteor-data';`

Just at the end of this file:

```
export default createContainer(() => {

}, EmployeeList);
```

To create a `Container` we'll call `createContainer()` and as the first argument we'll pass a **fat arrow function** and the second argument will be the `EmployeeList` Component

### Two Step Process How a Container works
1. We set up the subscription inside of the Container
2. Return an object. Whatever we return will be sent to `EmployeeList` as `props`

```
export default createContainer(() => {
  // set up subscription
  
  // return an object. Whatever we return will be sent to EmployeeList
  // as props

}, EmployeeList);
```

This is all we have to do to set up our **subscription**

`Meteor.subscribe('employees');`

```
export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees');
  // return an object. Whatever we return will be sent to EmployeeList
  // as props

}, EmployeeList);
```

Now whenever our Component renders the Component's `Container` is first going to reach out to the `Employee`'s publication and say '_hey, whatever's available for this publication, please give it to me right now_'

Then the `publication` will then make that data available to us

### Now onto our Second part... 

### How do we get access to that data? 
To get access to that data it automatically gets piped in to the `Employees` collection

`import { Employees } from '../../imports/collections/employees';`

```
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';

const EmployeeList = () => {
  return (
    <div>
      <div className="employee-list">
        EmployeeList
      </div>
    </div>
  )
};

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees');
  // return an object. Whatever we return will be sent to EmployeeList
  // as props

}, EmployeeList);
```

And the last part of this:

`return { employees: Employees.find({}).fetch() };`

### Final code

```
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';

const EmployeeList = () => {
  return (
    <div>
      <div className="employee-list">
        EmployeeList
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




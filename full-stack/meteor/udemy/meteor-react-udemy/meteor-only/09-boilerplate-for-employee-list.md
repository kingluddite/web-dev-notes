# Boilerplate for Employee List
Switching to the **React** side of things to consume our data

The purpose of **React** in this application is solely to display information on the screen

**notes** 

* Our collection has 5000 records which is way too many to load up into a web browser at one time
* We need to figure out a way to pare down or cut down on records that get displayed on the screen at any given time

## Building components
All our **React** components will go inside `client/components`

`$ mkdir client/components`

`$ touch client/components/EmployeeList.js`

`EmployeeList.js`

```
import React from 'react';

const EmployeeList = () => {
  return (
    <div>
      <div className="employee-list">
        EmployeeList
      </div>
    </div>
  )
};

export default EmployeeList;
```

## Update `client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import EmployeeList from './components/EmployeeList';

const App = () => {
  return (
    <div>
      <EmployeeList />
    </div>
  )
}


// After Meteor loads in the browser, render my app to the DOM
Meteor.startup(() => {
  // React render call
  ReactDOM.render(<App />, document.querySelector('.container'));
});
```

## View in browser
You'll see `EmployeeList` on screen

## Next Challenge
We have 5000 records inside our collection. We need to find a way to stuff it inside our `EmployeeList` component

But really we need to find a way to take all of the data that is sitting inside our `MongoDB` **collection** and push it into the `React` side of our Application








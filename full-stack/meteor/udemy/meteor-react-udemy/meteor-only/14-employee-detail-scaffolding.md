# Employee Detail Scaffolding

## Test to see our data
We need to see if our data is actually showing up inside of **React**

`EmployeeList.js`

**note** Don't forget to pass the `props` argument to your functional Component

`const EmployeeList = (props) => {`

```
// MORE code
const EmployeeList = (props) => {
  // props.employees => an array of employee objects
  console.log(props.employees);
  return (
    <div>
      <div className="employee-list">
        EmployeeList
      </div>
    </div>
  )
};
// MORE code
```

Interesting! We get two console logs

![two console logs](https://i.imgur.com/W10NAnl.png)

### Why the empty array?
Our first empty array comes from the instant our application loads it will instantly render to our page. Even if there is no data inside of our collection yet, we'll still get an empty array

Then when we set up our **subscription** and we wait for our data to be loaded from the backend we get the array of 20 employee objects

![first 20 records](https://i.imgur.com/MwLeLkD.png)

**note**

When you first start up Meteor and `main.js` runs this code:

```
const numberRecords = Employees.find({}).count();
  if (!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name, email, phone,
        avatar: image.avatar()
      });
    });
  }
```

You will create 5000 records. 

### Why is there no avatar key in our faker data?
If you have avatar as a key ([It should look like this](https://i.imgur.com/VMCaR4W.png))
But this is a good tip on working with Mongo

### How to drop a MongoDB database
* I forgot to add the `avatar: image.avatar()` line and didn't see it when I tried to render Employee records on my EmployeeList component
* I had to open a new tab in the terminal (_with Meteor running in other tab_)
* Then I had to run `$ meteor mongo` to open **Meteor Mongo**
* I then needed to manually delete the `employees` collection with the following **MongoDB** code:

`db.employees.drop()`

You will see `true` returned which means the collection was deleted (_aka dropped_)

### Stop and restart Meteor
It should add 5000 records but this time it will include the `avatar` link to live image

### Which port is Meteor MongoDB running on?
**note** `$ meteor mongo -U` Will show you which port **MongoDB** is running on

## And Now back to our lesson...

Look inside our `Employee` objects and you'll see `_id` property. this `_id` was assigned by our **MongoDB database**

We will use `_id` a lot in the future!

We can remove our `console.log(props.employees);`

## Create `EmployeeDetail` Component
`$ touch client/components/EmployeeDetail.js`

The purpose of this Component is this will render one **employee profile**

`EmployeeDetail.js`

```
import React from 'react';

const EmployeeDetail = (props) => {
  return (
    <p>EmployeeDetail</p>
  )
}

export default EmployeeDetail;
```

**note** If you do not return JSX from Components you [will get an error](https://i.imgur.com/28lXFRR.png)

To get rid of the error change your code from this:

```
const EmployeeDetail = () => {
  return (
    
  );
};
```

To this:

```
const EmployeeDetail = () => {
  return (
    <div>EmployeeDetail</div>
  );
};
```

`EmployeeList.js`

* We need to import `EmployeeDetail.js`

`import EmployeeDetail from './EmployeeDetail';`

### Goal
For every employee inside of `props.employees` we are going to render one **EmployeeDetail**. So this is a good time to use `.map()`

**note** - The last time we did a `.map()` we did it as a separate helper function and we saved that list to a variable. This time we will do it inline inside our JSX

```
const EmployeeList = (props) => {
  // props.employees => an array of employee objects

  return (
    <div>
      <div className="employee-list">
        {props.employees(employee => <EmployeeDetail />)} 
      </div>
    </div>
  )
};
```

If it is all in one line, it is an implicit return, so just note that is what we are doing above and we are implicitly returning `<EmployeeDetail />`. It is very dense code and if it is not readable to you, feel free to break it out into a helper function like we did before.

```
const EmployeeList = (props) => {
  // props.employees => an array of employee objects

  return (
    <div>
      <div className="employee-list">
        {props.employees.map(employee => <EmployeeDetail />)}
      </div>
    </div>
  )
};
```

### Test in browser
We get twenty `EmployeeDetail` but we also get that pesky unique key error

### Next Up
Working more with `EmployeeDetail` and making it look nicer with some styles

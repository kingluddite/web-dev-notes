# Publication Subscription Review
![diagram](https://i.imgur.com/eg53oQG.png)

## First thing to keep in mind
All data that we are going to expose to our `clients` is made available through the `subscription` and `publication` system

A **Meteor** server can choose to publish sets of records and make them available to a front end **React** application

The **React** application can then `subscribe` to collections that are being published by the **Meteor** backend

The purpose of **subscriptions** and **publications** is to make sure that we pare down the total number of records to a very small slice 

In our case, we have a **collection** of `Employees` that has 5000 records so for our `publication` of `Employees` we limited the number of employees that could be fetched at any given time to just the first 20 (_The purpose of this is two-fold, we want to make sure we are not sending down too much data to everyone that connects to our application at any given time, the second purpose of this is to make sure we have some level of security in our application_) 

## I'm feeling a little insecure...

By default, **Meteor** comes with the `insecure` package installed by default and that publishes all data to anyone who connects to our application at any given time (_insecure is obviously not safe but it is the default setting to help developers with quickly creating prototype apps_)

By setting up a **publication** and **subscription** (_after uninstalling the `insecure` package_) we make sure that users are only seeing a smaller subset of our data

### Add logic
We can stick a lot more logic into our publication than just this:

```
Meteor.publish('employees', function() {
  return Employees.find({}, { limit: 20 });
});
```

* examples
    - For a given user, only find form posts that they created
    - Or only find private messages that this user has used

![Diagram](https://i.imgur.com/bSYabEd.png)

## Then we jumped to the React side
### We set up our first `subscription`
The `subscription` is the the `flip-side` to the publication

The `subscription` is where we are looking back to the `server`, we're looking over the internet, back to the `server`, and we ask '_hey if you got any data over there on employees, I would love to have it, please give me access to employees_'

So just **publishing** a `collection` isn't enough, **we have to BOTH PUBLISH and SUBSCRIBE to the publication**

## React application

![React Container diagram](https://i.imgur.com/gDHjSDS.png0)

* In a **React** application we get access to the subscriptions by setting up a `Container`
* A `Container` watches a `subscription` and whenever that subscription changes it is then going to pass that information down into a `Component` and this will cause the `Component` to re-render

```
export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees');
  // return an object. Whatever we return will be sent to EmployeeList
  // as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
```

* We use `createContainer()`
* We first set up a **subscription** (_Hey there is the employees publication - and I want whatever's contained inside that publication_)
* Then we added a `Employees` collection query at the bottom, the `Employee`'s query finds every record and fetches it

**note** By just calling `Employees.find()`, all that really does for us is it returns a **Cursor** and it doesn't actually find any records. To actually find the records, we have to call `.fetch()` (_`.fetch()` is what actually executes the search_). At this point in time we are executing the search over just the `client side` of our application. This means:

`Employees.find({}).fetch()`

When we do the above `.fetch()` we are only fetching records that we have subscribed to: `Meteor.subscribe('employees');`

So at present, our current `.fetch()` call will only ever return 20 records

After we fetch this data, we then stick it into an object with an `employees` property (_aka with a `key` of `employees`_)

`{ employees: Employees.find({}).fetch() };`

We also `return this object`

`  return { employees: Employees.find({}).fetch() };`

Because we are returning this object, it is going to show up inside of our `EmployeeList` Component as `props`

### Updating our UI
* We can pass `props` to the `EmployeeList` argument

`const EmployeeList = (props) => {}`

```
const EmployeeList = (props) => {
  // props.employees => an array of employee objects
```

That is everything from the **publication** side down the the **React** Component side

**note**

This may seem overwhelming and convuluted but it is something we will repeat over and over again in every **Meteor React** application we create

## Next Challenge
Add more employees when someone clicks **'more'**


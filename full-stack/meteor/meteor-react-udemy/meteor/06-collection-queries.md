# Collection queries
We want to create thousands of records

## Make sure we import our `employees` collection

`server/main.js`

```
// Only executed on the server
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';

// This fat arrow function will only be called once Meteor has successfully booted up inside of our development environment
Meteor.startup(() => {
  // Great place to generate data
});
```

## Check for our data
**important**

* We want to make sure when we start up our server we're not always inserting 10,000 records
* So we need to first set up a check about our **data**
    - That check will look to see if our `collection` is empty. If it is, we'll insert data on `Meteor.startup()` otherwise, we won't
        + To do this we have to query our `collection` to see if there are any existing records
            * `const numberRecords = Employees.find({}).count();`
            * `record` - Individual object that represents an individual **employee**
            * `.find({})`
                - Very versatile when used with `collections`
                - We could pass into `.find({})` some amount of configuration to tell it exactly what we are trying to find within this collection
                - when we use `.find({})`, we are saying "_I don't want to filter by anything at all... give me everything_"
                - This is similar to **SQL** `SELECT * from table_name`
                - When we call `Employees.find({})`, we are not getting back an `array` so we can not use the `.length` on it
                    + What we are getting back is something called a `Cursor`
                      - Which is a fancy way of representing some amount of data in our **database**. So we can't use `.length` but with Cursor's we can use `.count()` to find out the number of records in this `collection`
                    + So if there are no records in our collection and `numberRecords` is equal to zero (**0**), then we want to generate some amount of fake data for our application

## Final `server/main.js`

```
// Only executed on the server
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';

// This fat arrow function will only be called once Meteor has successfully booted up inside of our development environment
Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if (!numberRecords) {
    // Generate some data...
  }
});
```







# Inserting records into collections
We will use both the `lodash` library and `  ` library so we need to import them both

## Lodash using '_' as it's name
Most imports use a name to pull in a package. Not Lodash.
**Lodash** is the exception to the rule and uses an underscore `_` as it's variable declaration. 

**note**`_` (_underscore_) is a valid JavaScript variable so there is nothing special about the variable. It is a normal variable like any other variable out there in the world of variables  

`import _ from 'lodash';`

## Not the for loop
How will we import **data**? Should we make a for **loop** and loop from 1 - 5000 and for every step of the loop let's generate a record

That is a valid approach but we will use the **lodash** library and this will make our code look a little bit cleaner than a for loop

```
Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if (!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      
    });
  }
});
```

Instead of the `for loop` we use 

`_.times(how-man-times, function to run that many times`

This function is just much cleaner than a for loop and makes our lives (_as developers_) easier

Inside the `_.times()` will be a great place to create our **employee** model and `insert` it into the `employees` **collection**

## Faker to the rescue
### import helpers from the `faker` library
`import { image, helpers } from 'faker';`

* `faker` is the **npm module** that we just installed
* So we can now use the **faker library** to generate our `name`, `email` and `phone` for our **employee**

`const { name, email, phone } = helpers.createCard();`

* The `createCard()` method is a part of `faker` and it is a method that generates a full profile for a fake person
* This fake person has properties like **name**, **email**, and **phone** (_with somewhat realistic values for each_)

**note** We are using ES6 destructuring here `{ name, email, phone}`

* So the object that is returned from `helpers.createCard()` has properties like **name**, **email** and **phone** and we are just pulling off those properties in one step
* The long way of writing these three would be:

```js
const name = helpers.createCard().name;
const email = helpers.createCard().email;
const phone = helpers.createCard().phone;
```

## So we now have a fake profile
With `name`, `email` and `phone`

`server/main.js`

```
// Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

// This fat arrow function will only be called once Meteor has successfully booted up inside of our development environment
Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if (!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();
    });
  }
});
```

## Insert new record
We have a **fake profile** so now we need to `insert` a new record into our `collection` of **employees** and save it to our **MongoDB database**

**Meteor JS** - Great thing is it is incredibly easy to save data

### Saving data in MongoDB
Whenever I want to save a record to a **Mongo** `collection` I:

* Write the name of the collection `Employees`
* And then `insert()` 
* And inside `insert({})` (_we pass an object_) - The object is the exact object that I want to insert into my database

And that's all we have to do! No other magic needed

## Insert some Employees
```
Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if (!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        
      });
    });
  }
});
``` 

* Our **Employee** model, the object that is going to represent a single employee is going to have the properties `name`, `email`, `phone`

```
Employees.insert({
        name: name,
        email: email,
        phone: phone
});
```

* In the case of each of these three variables, the property name is identical to the value of the property. When we have duplication like this we can condense down by just writing **name**, **email** and **phone** one time

```
Employees.insert({
        name, email, phone
});
```

Because the `value` and the `key` are identical the ES6 code or the ES6 generator will automatically expand it out to sytnax that looks like:

```
Employees.insert({
        name: name,
        email: email,
        phone: phone
});
```

Our code so far:

```
// Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

// This fat arrow function will only be called once Meteor has successfully booted up inside of our development environment
Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if (!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name: name,
        email: email,
        phone: phone
      });
    });
  }
});
```

## Let's also add an avatar
(_this will be a imageURL that will serve as the employees portrait on the screen_)

```
Employees.insert({
        name, email, phone,
        avatar: image.avatar()
      });
```

* We generate the `URL` from the **faker** library
* We imported `image` at the top of `server/main.js` and we can generate our URL by calling `image.avatar()`

`import { image, helpers } from 'faker';`

* This generates a **URL** to a real image that is hosted online that we can load up on the browser

## Great news!
We will run code 5000 times and each time we will generate **one** user profile with a realistic looking profile data and insert them one at at time into our `employees` collection

## Final code
```
// Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

// This fat arrow function will only be called once Meteor has successfully booted up inside of our development environment
Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
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
});
```
 


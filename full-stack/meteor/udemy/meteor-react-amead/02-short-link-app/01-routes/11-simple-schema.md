# Schema Validation
Time to validate:

* Make sure an email is an `email`
* And a `password` is a `password` of some length

## Simple Schema (Library)
### What is a Schema?
A set of properties

#### I need more of an explanation
* A Schema is an object with a property `name` 
* The Schema lets you define rules for those properties

### Example Schema
Pet Schema

#### Here our Schema rules
Using those rules we can validate user data against the schema and from that we can determine if that information should be allowed in our database

* Pets can have a **name** and an **age**
* **name** should be
    - A string 
    - And it should be at least one character
* **age** 
    - Should be a number with a minimum value of `0`


## Simpl Schema
_(yes I spelled Simpl without the `e`)_
Simpl Schema lets you define a schema

## Install `simpl-schema`
**Important!**

* Make sure you don't install `simple-schema` that is not the one we want
* Ours does not have an `e` at the end of `simpl`

`$ yarn add simpl-schema`

## Let's play around with simple-schema first on our server `server/main.js`

```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'; // we import it here

Meteor.startup(() => {
  // code to run on server at startup

  const petSchema = new SimpleSchema({
    name: {
      type: String
    }
  });

  petSchema.validate({
    name: 'King'
  });
});
```

### Nothing happen?
Because `.validate()` will only show results when the data doesn't validate

* When you create a **schema** every property you define is required by default
* Any property that is on the object and that is not part of the **schema** is not allowed (_both of those will cause errors_)
* This is great because it will stop malicious users from sending additional properties we did not make with bad stuff inside

So if we remove one line like:

```
petSchema.validate({
    
});
```

And check the server in the Terminal you will see:

`ClientError: Name is required`

Or if you change it to:

```
petSchema.validate({
    name: 12
});
```

You'll get this error in the Terminal on the server:

`ClientError: Name must be of type String`

### Other types of validations
* Set `min` and `max` for a string

```
const petSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 200
    }
  });
```

You need at least **one** character and no more than `200` for a name

```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // code to run on server at startup

  const petSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 200
    },
    age: {
      type: Number,
      min: 0,
      optional: true
    }
  });

  petSchema.validate({
    name: 'Spot',
    age: 21
  });
});
```

* Add a type of `Number` for age
* Age has a minimum number of `0`
* Because of `optional` we can leave off **age**

[simpl-schema documentation](https://github.com/aldeed/node-simple-schema)

## Regular Expressions!
`RegEx` part is great for things like

* phone numbers
* zip codes
* emails
* URLs which have very specific patterns
* Lots more!

They have built in RegEx for lots of stuff which means you won't have to write a Regular Expression you just use something like `SimpleSchema.RegEx.Phone` and it will do the RegEx for you

```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // code to run on server at startup

  const petSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 200
    },
    age: {
      type: Number,
      min: 0,
      optional: true
    },
    contactNumber: {
      type: String,
      optional: true,
      regEx: SimpleSchema.RegEx.Phone
    }
  });

  petSchema.validate({
    name: 'Spot',
    age: 21,
    contactNumber: '1111*'
  });
});

```

Will give us an error: `ClientError: Contact number must be a valid phone number`

**tip** We should try to create a schema for all Collections in our MongoDB database are to have some sort of schema associated with them

## Exercise
* Create employeeSchema
    - with:
        + `name` - string between 1 and 200 chars (_required_)
        + `hourlyWage` - number > 0 (_required_)
        + `email` - should be valid email (_required_)
        + `zip code` - optional should be valid zip

<details>
  <summary>Solution</summary>
```
const employeeSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 200
    },
    hourlyWage: {
      type: Number,
      min: 1
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    zipCode: {
      type: String,
      optional: true,
      regEx: SimpleSchema.RegEx.ZipCode
    }
  });

  employeeSchema.validate({
    name: 'Phil',
    hourlyWage: 100,
    email: 'phil@gmail.com'
  });
```
</details>

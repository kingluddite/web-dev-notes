# Generate data with Faker
By default whenever we create a collection it starts out as completely empty

* Not very useful
    - We need some amount of static data that we can prepopulate our app with
* We don't just want 10 records
    - We want several thousands of records in our collection
    - 1000 of records would take to long to manually create them but if we could automate the process of creating records we could really save some time

[npmjs.com](http://npmjs.com) - list of all the modules we can download via **npm**

Go there and look up `faker` (_lots pop up - but we want `faker` by marak_)

### [faker](https://www.npmjs.com/package/faker)
Just used for client side development

## How to use Faker
Lots of different types of fake data like:

* address
* phone
* random
* links to images
    - We want an image for each employee that we set up for our app
    - `faker.image.imageURL`
* And a ton of others

### Install faker
`$ npm i -S faker lodash`

* We are also install `lodash`
    - A collection of utility functions that make development easier

### Generate our fake data
Now that we have **lodash** and **faker** installed we can generate our fake data

#### We will work on the server side of our Meteor app
So we'll work inside `server` folder

##### Why not do this on the client?
* Because we don't want to try to save 5000 entries from the client
* But if we generate this fake data on our server directory
* Then our fake data will take place only on the server which will make our app run much faster

`$ mkdir server`

`$ touch server/main.js`

**note** Just like our `client` has access to `Meteor.startup()`, our `server` does as well

`server/main.js`

```
// Only executed on the server
import { Meteor } from 'meteor/meteor';

// This fat arrow function will only be called once Meteor has successfully booted up inside of our development environment
Meteor.startup(() => {
  // Great place to generate data
});
```



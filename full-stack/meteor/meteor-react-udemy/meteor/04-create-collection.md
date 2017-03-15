# Creating MongoDB collections
A collection is an array of objects where each object for us is going to represent a single employee that will have a picture in our directory

## Create a collection
`/imports`

* Any code in the `client` folder will automatically be bundled up and shipped down to the **client** (_our web browser_)
* Any code put in the `server` folder will be held back and only will run and exist on our server
* Any code that we want to run and share between two different environments, we can place inside of the `imports` folder
    - The `imports` folder is automatically shared between the **client** and the **server**
    - **note** Any code inside the `imports` folder **will be executed first** before anything on the `client` and the `server`
        + This makes it a fantastic spot to some intial application setup or declaration

`/imports/collections/employees.js`

```
// Declare our collection
import { Mongo } from 'meteor/mongo';
```

This gives us a handle on our **MongoDB** database

* Our **MongoDB** database is automatically executed and created whenever we make and run our **Meteor** application
* So we have **Meteor** running in the background in our terminal and that means we also have a `mongo server` running at the same time as well

### We create our first collection next
`const Employees = new Mongo.Collection('employees');`

We create a new collection and pass the name of that new collection `employees` into it

Save it. Just by declaring a collection like we just did will automatically create that collection inside our **MongoDB database**. That's all you have to do to create a collection

#### Important to `export` your collection
So other files inside our code base can reference this collection or get access to the data that is sitting inside of it

* All over our codebase we will be importing this collection that we just declared

`export const Employees = new Mongo.Collection('employees');`

Why are we not just use `export default Employees`?

The reason is we may want to export other variables from this file in the future (_and we will_). So because we expect to use multiple pieces from this file, we just use `export` and not `default export`

* I want to export multiple things from this file instead of just by default exporting one default object

### Final code:
```
// Declare our collection
import { Mongo } from 'meteor/mongo';

export const Employees = new Mongo.Collection('employees');
```

## Next Up
Pushing data into our collection


# Controllers

MVC pattern

M - Model - code that we write in the data that is stored that access the Database, anything that interacts with fetching data from our Database 
V - View - (pug, templates)
C - Controller - traffic cop inbetween the Model and the View
    * You have to get data and put it into a template and that is the Controller
    * Traffic cop sitting in the middle - "Hey Model, give me some data" and then it pulls it back and once it has it, it sends it over to the View

Silly Way to Remember this
* You are having a party
* You have a friend who has booze and snacks (Model)
* You have a friend that have a cool party house (View)
* But those two friends aren't people persons so you call Torrey who is the people person and will text people and get them to the party

## Bad Design
* If you build lots of logic into your routes is a recipe for disaster
* If you have a large application, it can get pretty ugly, it can be really hard to test, it's not reusable

## Solution
We factor this logic out into it's own Controller

## Controllers
* We have a folder called `controllers` and that's where all our **Controllers** will live
* Generally good to have a **Controller** for every specific area of the website
    - Controller for stores (creating and finding them)
    - Controller for dealing with the users
    - Controller for dealing with the reviews

### Controller Naming Convention
camelCase

`exports` is kind of like a global variable and anything that you put on the `exports` variable will be **importable** in any other file

`/controllers/storeController.js`

```
exports.homePage = (req, res) => {
  res.render('index');
};
```

`/routes/index.js`

```
const express = require('express');
const storeController = require('./../controllers/storeController');

const router = express.Router();

// Do work here
router.get('/', storeController.homePage);

module.exports = router;
```

## Refresh browser
* We have an error because we didn't create our **View** yet
* We are trying to render `index` but we haven't passed it anything

`/views/index.pug`

```
p hi
```

## Refresh browser
We just see `p hi`

`index.pug`

```
extends layout

block content
  p hi
```

## Refresh browser
Now we see the navbar, the `hi` and the footer

![layout working](https://i.imgur.com/9E78LQP.png)

Generally how it will work:

* Our `routes.js` file will tell us the URLs that we hit are
    - And then we'll always push that off to the Controller (a separate file to do the work)
    - We can have multiple Controllers inside one of our routes
    - Multiple Controllers called 'Middleware'




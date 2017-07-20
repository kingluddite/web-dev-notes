# Controllers
## MVC pattern

* M -> `Model`
    - Our code that accesses the Database
    - Anything that interacts with fetching data from our Database 
* V -> `View` 
    - (_pug, templates_)
* C -> `Controller`
    - Traffic cop inbetween the Model and the View
    - You have to get data and put it into a template
        + (_And that is the Controller_)
    - Traffic cop sitting in the middle shouts - **"Hey Model, give me some data"**
        + And then the `controller` pulls the **data** back and once the `controller` has the **data**, the `controller` sends the **data** over to the `View`

### Silly Way to Remember this
* You are having a party
* You have a friend who has drinks and snacks (_Model_)
* You have a friend that has a cool party house (_View_)
* But those two friends aren't **"people persons"** so you call up that `people person` friend you have and he/she will text people and get them to the party (_Controller_)

## Bad Design
* Don't build lots of logic into your routes (_recipe for disaster_)
* If you have a large application
    - It can get pretty ugly
    - It can be really hard to test
    - It's not reusable

### Key Programming Principle
* DRY
    - `D`on't `R`epeat `Y`ourself

## Solution
We factor this logic out into it's own `Controller`

## Controllers
* We have a folder called `controllers` and that's where all our **Controllers** will live
* Generally good to have `one` **Controller** for every specific area of the website
    - Controller for stores (_creating and finding them_)
    - Controller for dealing with the **users**
    - Controller for dealing with the **reviews**

### Controller file Naming Convention
* `camelCase.js`

### What is `exports`?
* `exports` is from the world of NodeJS
* And it is kind of like a global variable
* And anything that you put on the `exports` variable will be **importable** in any other file

#### Delete `learning.pug`
* We don't need it anymore

`/controllers/storeController.js`

```
exports.homePage = (req, res) => {
  res.render('index');
};
```

`/routes/index.js`

* Replace all the code inside `index.js` with the following:

```
const express = require('express');
const storeController = require('./../controllers/storeController');

const router = express.Router();

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

![layout working](https://i.imgur.com/HI6kU9t.png)

Generally how it will work:

* Our `routes.js` file will tell us the URLs that we hit are
    - And then we'll always push that off to the Controller (_a separate file to do the work_)
    - We can have multiple Controllers inside one of our routes
    - Multiple Controllers called 'Middleware'
## Git
* Save
  - `$ ga -A`
* Commit
  - `$ gc -m 'mvp notes`
* Checkout master
  - `$ gcm`
* Merge branch into master
  - `$ git merge mvp`
* Push master to github (_and all branches_)
  - `$ git push --all`




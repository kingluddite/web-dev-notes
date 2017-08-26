# Create Surveys
`surveyRoutes.js`

```js
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    
  });
};
```

* This file will grow large

## First things first
![survey route handler diagram](https://i.imgur.com/DwAVqYh.png)
* I want to take the incoming request object (`req`)
    - When someone wants to create a request we expect the body of the request to contain a few different properties
        + title
        + subject
        + body
        + commas separated string of email addresses
* I want to access all of the above properties from the request object (Step #1)
* Once we have access to all of them, we use them to create a new instance of a survey (using the mongoose Survey model we worked with recently)
* All that info exists on the `body` property of the `req` object (`req.body`)
    - This is possible thanks to `body-parser` npm module
* We will use ES6 destructuring to save us some typing

`surveyRoutes.js`

```js
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
  });
};
```

* **note** we do not yet
    - Have any logic on our frontend that requests these properties
    - Nor do we have any links going to the `api/surveys` route
    - So we are designing our backend server, assuming we will have these properties
    - Then when we move to the React/Redux side of our app we'll make sure that when we create a survey form on the frontend, we'll pass along all these properties

## Frontend or Backend First?
* It is more common in big project to start building the backend first
    - That way we can say:
        + "OK, here's all the different routes we have and here are the requirements for each route handler"
* Even though it might feel like the frontend would be easier to start off with

## Use the Survey mongoose Model
* To create a new instance of the Survey

### Solution to Problem with Tests and mongoose
* This is a way to avoid a problem you will run into if you ever add Tests to your project
* We have a slightly different methodology getting access to mongoose Models because of an issue of running your tests with Node and Mongoose
    - side topic here
    - Sometimes if you use mongoose with any type of testing framework, it will sometimes complain if you attempt to require in a Model file multiple times
    - To skirt that issue

`surveyRoutes.js`

```js
const mongoose = require('mongoose');
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
  });
};
```

* We could directly require out of the `models/Survey` file our mongoose model class but we are taking the above approach to sidestep the issue of running tests with Node and mongoose
* We can use the Model class to create an **instance** of a survey
    - An **instance** of our survey is not automatically persisted to `MongoDB`
        + We first create the survey
        + Manipulate the survey
        + And then to actually save it to the database we have to eventually call the `.save()` method

## Create a new instance of a survey
* We will use ES6 shortcut syntax when key and value are the same

`surveyRoutes.js`

```js
const mongoose = require('mongoose');
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      
    })
  });
};
```

## Next - Creating the Recipient subDocument Collection

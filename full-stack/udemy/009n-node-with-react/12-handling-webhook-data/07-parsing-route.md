# Parsing the route
* We already installed `lodash` (but on the client)
    - We now need to also install in on the server
* We also need to install `path-parser`

`$ yarn add lodash path-parser`

## Import modules
`surveyRoutes.js`

```js
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
// more code
```

* We did not install `url`
    - `url` is a default module in the Node.js system
    - You don't have to install it
    - You get it for free when you use Node
    - `url` has lots of helpers for helping us parse URLs inside our app
    - We only care about the `URL` helper in the `url` library

`surveyRoutes.js`

```js
// more code
module.exports = app => {

  app.post('/api/surveys/webhooks', (req, res) => {
    // map over list of events
    const events = _.map(req.body, event => {
      // extract just the route of the URL
      const pathname = new URL(event.url).pathname;
      // just extract the surveyId and choice from path
      const p = new Path('/api/surveys/:surveyId/:choice');
      console.log(p.test(pathname));
    });
  });
// more code
};
```

* Click on the link in your email
    - We extracted the URL
    - And grabbed the surveyId and choice
* You will see output in the terminal
* `{ surveyId: '59a666d44dac50588da3f9a3', choice: 'yes' }`
* The `p` contains an object from every wildcard from the given URL `:surveyId` and `:choice`
    - If `p.test(pathname)` can not extract both a surveyId and a choice, it will return `null` instead

`surveyRoutes.js`

```js
// more code
app.post('/api/surveys/webhooks', (req, res) => {
  // map over list of events
  const events = _.map(req.body, event => {
    // extract just the route of the URL
    const pathname = new URL(event.url).pathname;
    // just extract the surveyId and choice from path
    const p = new Path('/api/surveys/:surveyId/:choice');
    // match will be an object or null if there is no match
    const match = p.test(pathname);
    // if we find a match
    if (match) {
      // return the match
      return match;
    }
  });
});
// more code
```

## We also need an email
* We will modify the above to also check the user email

`surveyRoutes.js`

```js
// more code
app.post('/api/surveys/webhooks', (req, res) => {
  // map over list of events
  const events = _.map(req.body, event => {
    // extract just the route of the URL
    const pathname = new URL(event.url).pathname;
    // just extract the surveyId and choice from path
    const p = new Path('/api/surveys/:surveyId/:choice');
    // match will be an object or null if there is no match
    const match = p.test(pathname);
    // if we find a match
    if (match) {
      return {
        email: event.email,
        surveyId: match.surveyId,
        choice: match.choice
      };
    }
  });
});
// more code
```

## ES6 refactoring
`surveyRoutes.js`

```js
app.post('/api/surveys/webhooks', (req, res) => {
  // map over list of events
  const events = _.map(req.body, ({ url, email }) => {
    // extract just the route of the URL
    const pathname = new URL(url).pathname;
    // just extract the surveyId and choice from path
    const p = new Path('/api/surveys/:surveyId/:choice');
    // match will be an object or null if there is no match
    const match = p.test(pathname);
    // if we find a match
    if (match) {
      return {
        email,
        surveyId: match.surveyId,
        choice: match.choice
      };
    }
  });
  console.log(events);
});
```

* We cannot destructure `match` because if `p.test(pathname)` returns **null** we can't use destructuring because trying to return properties off of `null` returns and error

## Test
* Click email link and you will see something like:

![email event](https://i.imgur.com/jLjyptG.png)

## Remove the elements that are `undefined`
* `_.compact()` (function inside lodash library)
    - The `compact()` function takes an array, it goes through all the elements in the array and removes any elements that are `undefined`

`surveyRoutes.js`

```js
// more code
app.post('/api/surveys/webhooks', (req, res) => {
  // map over list of events
  const events = _.map(req.body, ({ url, email }) => {
    // extract just the route of the URL
    const pathname = new URL(url).pathname;
    // just extract the surveyId and choice from path
    const p = new Path('/api/surveys/:surveyId/:choice');
    // match will be an object or null if there is no match
    const match = p.test(pathname);
    // if we find a match
    if (match) {
      return {
        email,
        surveyId: match.surveyId,
        choice: match.choice
      };
    }
  });

  // remove all elements in the array that are undefined
  const compactEvents = _.compact(events);
});
// more code
```

## Remove any duplicate records in our array
* lodash to the rescue again!
    - `_.uniqBy()`

`surveyRoutes.js`

```js
// more code
app.post('/api/surveys/webhooks', (req, res) => {
  // map over list of events
  const events = _.map(req.body, ({ url, email }) => {
    // extract just the route of the URL
    const pathname = new URL(url).pathname;
    // just extract the surveyId and choice from path
    const p = new Path('/api/surveys/:surveyId/:choice');
    // match will be an object or null if there is no match
    const match = p.test(pathname);
    // if we find a match
    if (match) {
      return {
        email,
        surveyId: match.surveyId,
        choice: match.choice
      };
    }
  });

  // remove all elements in the array that are undefined
  const compactEvents = _.compact(events);
  // remove any duplicates
  const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
  console.log(uniqueEvents);

  res.send({}); // prevents Sendgrid from resending requests because it thought the request was lost
});
// more code
```

* We now filter out any duplicates with same email or surveyId (on same survey)

## Test
* Click `yes` in email five times
* You should see only one appears
* We may get duplicates from Sendgrid (it will resend request if they think it broke), just send an empty respose to fix that behavior



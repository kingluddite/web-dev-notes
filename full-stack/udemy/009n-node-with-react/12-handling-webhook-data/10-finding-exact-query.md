# Finding the exact query
* After we process our events we end up with an object that looks like this:

![processed object](https://i.imgur.com/yW2Xet2.png)

* $inc - Mongo operator
    - Allows us to put some slightly intelligent logic inside the query that we issue to our Database
* { [choice]: 1 }
    - Key interpolation
    - It does not create an array
    - Instead, when this object is evaluated by the JavaScript runtime, it will say "OK, what is the value of the `choice` variable"
        + If the value of choice is `yes`
            * $inc: { 'yes': 1 }
                - increment `yes` by one
        + If the value of choice is `no`
            * $inc: { 'no': 1 }
                - increment `no` by one
* `$set`
    - `$set: { 'recipients.$.responded': true }`
        + Look at the subdocument that was found
        + Inside the subdocument collection there are lots of different records
        + To make sure we only update the recipient that we care about we make sure to only update that recipient and we do that with the `$`
            * The `$` lines up with the `$elemMatch`

### id vs _id
* In Mongo all records have a `_id` unique column that is created when you create a new collection
* We have not been using `_id` and instead we were using `id` because **mongoose** let's use use `id`
    - Whenever you passing a query specifically to `MongoDB`, you have to specifically say `_id`
    - If you find that confusion, you can always be safe but always using `_id`
* `.exec()` - Actually executes the query
* We are **not** using `async-await` this time
    - Sendgrid sent us data but we don't have to respond back to them with anything
    - We don't have to wait for this query to finish before we send back a response

`surveyRoutes.js`

```js
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');
const Mailer = require('./../services/Mailer');
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('Survey');

module.exports = app => {
  // app.get('/api/surveys/thanks', (req, res) => {
  //   res.send('Thanks for voting!');
  // });

  app.post('/api/surveys/webhooks', (req, res) => {
    // just extract the surveyId and choice from path
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      // map over list of events
      .map(({ url, email }) => {
        // extract just the route of the URL
        // match will be an object or null if there is no match
        const match = p.test(new URL(url).pathname);
        // if we find a match
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      // remove all elements in the array that are undefined
      .compact()
      // remove any duplicates
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true }
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    try {
      // Great place to send an email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
```

## Add lastResponded Date
`surveyRoute.js`

```js
// more code
Survey.updateOne(
  {
    _id: surveyId,
    recipients: {
      $elemMatch: { email, responded: false }
    }
  },
  {
    $inc: { [choice]: 1 },
    $set: { 'recipients.$.responded': true },
    lastResponded: new Date() // add this line
  }
).exec();
// more code
```

* When we update it will update the date with the time in epoch (milliseconds since the epoch)

## Test and you should see
* Yes and No votes work
* lastResponded updates

`surveyRoutes.js`

```js
// more code
module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });
// more code
}
```

* Now when you click yes or no, you will be taken to website with thanks message

# Bad Mongoose Queries
![array looks like this](https://i.imgur.com/DovaUFW.png)

* We will find the choice and increment it by 1 vote

`Survey.js`

```js
// more code
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});
// more code
```

* We have a `no` and `yes` field that starts at `0` and we'll increment each by `1` if they are the selected choice in the user's email

## How to write bad Mongoose code
`bad-code.js`

```js
._forEach(events, ({ surveyId, email, choice }) => {
  // we are pulling data over from `MongoDB` over to our Express server
  let survey = await Survey.findById(surveyId);

  // find a recipient that matches email and has not responded yet
  const responder = survey.recipients.find(recipient => recipient.email === email && email && !recipient.responded);
  if (!responder) {
    // the recipient has already responded
    return console.warn('Response already logged!');
  } else {
    // recipient hasn't responded, set their responded flag to true
    survey.recipients.id(responder._id).responded = true;
    surevey[answer] += 1;
    survey.lastResponded = new Date(timestamp * 1000);

    survey.save();
  }
})
```

* `let survey = await Survey.findById(surveyId);`
    - This part is bad
    - We are not just getting a survey, we are returned the entire survey in the subdocument of our recipients back to our Express server
    - There might be thousands of recipients that we would get back because they are all associated with one survey
        + But we only care about 1 recipient
        + We are transporting a possibly huge data object which is way more data than we need to care about

```
const responder = survey.recipients.find(recipient => recipient.email === email && email && !recipient.responded);
```

* Above we are walking through all the recipients, one-by-one, checking every email to see if we found the correct recipient
* When we do find the recipient
    - We then update just their responded property
* And then we save the survey back to the Database
    - When we call `survey.save()`, This sends back not just the survey but it also sends back the entire list of recipients as well
    - This could be thousands of recipients, even though we only cared about 1 recipient

## A Better approach
* We want to do execute as much search logic inside of `MongoDB` as we can, rather than pulling this data over to our server, updated it, searching it and then saving it back over to mongo
* We need to find the appropriate survey and only the one recipient we are looking for

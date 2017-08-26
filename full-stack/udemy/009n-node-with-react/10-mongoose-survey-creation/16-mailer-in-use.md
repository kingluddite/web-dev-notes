# Mailer in use
`Mailer.js`

```js
const sendgrid = require('sendgrid');
const keys = require('../config/keys');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {}

module.exports = Mailer;
```

## Where do we want to use this Mailer?
* Where inside our project do we want to create and send emails?
    - Inside `surveyRoutes.js`

### Require the Mailer into our routeHandler
`surveyRoutes.js`

```js
const mongoose = require('mongoose');
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');
const Mailer = require('../services/Mailer'); // add this line
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email
  });
};
```

### How do we send that email?
* How do we make a class and send off an email
    - We use the `new` keyword to create a new **instance** of the class

`surveyRoutes.js`

```js
// more code

    // Great place to send an email
    const mailer = new Mailer();
  });
};
```

### Customize that Mailer
* We'll pass it some arguments to customize it
* We'll pass it our entire survey object
* What content will we add to it?

`surveyRoutes.js`

```js
// more code
    // Great place to send an email
    const mailer = new Mailer(survey, );
  });
};
```

* Let's revisit a diagram

![Mailer diagram with content](https://i.imgur.com/kyHbh7z.png)

* The template is what produces the **body** of the email
    - We'll centralize all this logic inside a function in our template
    - We'll receive some data, the body of our survey, and the template should return some HTML to represent the body of the email

## Let's build our Template!
`surveryRoutes.js`

```js
    // Great place to send an email
    const mailer = new Mailer(survey, template);
  });
};
```

### New folder `services/emailTemplates`
* This folder will hold all our email templates

### Create a new file
* `/services/emailTemplates/surveyTemplate.js`

```js
module.exports = survey => {
  return `<div>${survey.body} Hello from the survey template!</div>`;
};
```

* Import our surveyTemplate into our route handler

`surveyRoutes.js`

```js
// more code
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate');

// more code

module.exports = app => {
  // more code

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};
```


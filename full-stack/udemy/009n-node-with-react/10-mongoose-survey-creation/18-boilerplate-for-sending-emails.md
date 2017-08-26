# Boilerplate For Sending Emails
`Mailer.js`

```js
const sendgrid = require('sendgrid');
const keys = require('../config/keys');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
  }
}

module.exports = Mailer;
```

* We use the SendGrid helper for from_email and body
* It makes sure our content is properly formatted inside an email
* We will do something similar for setting up list of emails (recipients)
* **note** recipients here is the recipients property from our survey instance

![recipients diagram](https://i.imgur.com/xyxZglm.png)

* Our Recipients is now an array of objects
* Where each object has a key of `email`
* When we format this we need to extract just the email addresses
* **note** You can use ES6 destructuring with an arrow function without including the parentheses

`Mailer.js`

```js
const sendgrid = require('sendgrid');
const keys = require('../config/keys');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
}

module.exports = Mailer;
```

* `recipients` should be an array of these helper.Email() things

#### Four things we need to do now
1. Add body as the content to the email
    - We can't just use `this.body`, we also have to register the body with the Mailer itself
        + `this.addContent(this.body)`
        + This `addContent` is a built in function on Mail that when we `extended` the class, we have access to
2. Enable `click tracking` inside our email
    - Every time we have a link inside our email, SendGrid replaces our links with their own special links
    - Click tracking will enable this

`surveyRoutes.js`

```js
const sendgrid = require('sendgrid');
const keys = require('../config/keys');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
}

module.exports = Mailer;
```

* The trackSettings is SendGrid code. Not much in their documentation on how this works but they just say, if you want to use SendGrid, set this up like this :(

## Next
* Write the code for addRecipients



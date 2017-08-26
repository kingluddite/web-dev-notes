# Sending SendGrid Emails
* We'll define one last property
* It will represent the SendGrid object that will communicate this mailer off to the SendGrid API

`Mailer.js`

```js
const sendgrid = require('sendgrid');
const keys = require('../config/keys');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
      super();

      this.sgApi = sendgrid(keys.sendGridKey);
      this.from_email = new helper.Email('no-reply@emaily.com');
      this.subject = subject;
      this.body = new helper.Content('text/html', content);
      this.recipients = this.formatAddresses(recipients);

      this.addContent(this.body);
      this.addClickTracking();
      this.addRecipients();
    }

// more code

    async send() {
        const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
    });

    const response = this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
```

* Since we are making an API call, we will use async-await
* Yes, the code is nasty but since SendGrid is free, it makes it easy to show how to use

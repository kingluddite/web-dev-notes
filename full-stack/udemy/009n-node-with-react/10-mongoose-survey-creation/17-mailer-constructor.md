# Mailer Constructor
* First argument
    - Will give us the subject of the email
    - And a list of the recipients
* The Second argument will contain the template that will be the body of the email


## JavaScript tip
* Whenever we use `new` to create an new instance of a class the first function that is automatically executed is the `constructor` function
    - The constructor gives us a change to do some amount of initialization or setup inside the class instance
        + Any arguments we use in `new CLASSNAME(arg1, arg2)` will be used inside the `constructor`

`Mailer.js`

```js
const sendgrid = require('sendgrid');
const keys = require('../config/keys');

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
  }
}

module.exports = Mailer;
```

* We name the arguments generically so we can reuse them in the future
* We call `super()` to make sure that any constructor defined on the `Mail` class gets executed

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

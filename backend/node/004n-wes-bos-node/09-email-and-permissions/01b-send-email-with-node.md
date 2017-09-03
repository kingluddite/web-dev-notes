# Sending email with Nodejs - Part 2
## Let's practice sending an email
* Whenever the server starts up it will send an email
* Let's configure that now

### Create an object to hold your mail options
`mail.js`

```js
// more code
let mailOptions = {
  from: 'Johnny Ballgame <Johnny@ballgame.com>', // sender address
  to: 'Jenny@Ballgame.com, zack@attack.com', // list of receivers
  subject: 'Interfacing with SMTP yo!', // Subject line
  text: 'I **invented** the Internet', // plain text
  html: 'I <b>really</b> invented the internet' // html
}

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
});
```

## If we import this `mail.js` into anyone of our files that is already running
It will trigger `transport.sendMail()` and send us an email

## Import `mail.js` into `start.js`
* Before we do the `cmd` + `k` your terminal to clear it out

`start.js`

* We will temporarily place this at the bottom of `start.js`
* <u>But we must remember to remove it later on</u>

```js
// TEMP send email
require('./handlers/mail');
```

### View in Mailtrap
![mailtrap email](https://i.imgur.com/oPgbfQ4.png)

### View in Terminal
![email sent in Terminal message](https://i.imgur.com/7pGpEyc.png)

### Remove this from `start.js`
```js
// TEMP send email
require('./handlers/mail');
```

* I just commented it out for the notes

![commented out code](https://i.imgur.com/IPphF9h.png)

### Delete this code
`mail.js`

```js
// more code
let mailOptions = {
  from: 'Johnny Ballgame <Johnny@ballgame.com>', // sender address
  to: 'Jenny@Ballgame.com, zack@attack.com', // list of receivers
  subject: 'Interfacing with SMTP yo!', // Subject line
  text: 'I **invented** the Internet', // plain text
  html: 'I <b>really</b> invented the internet' // html
};

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
});
```

* We just wrote that code to make sure that our email sending was working
* We will improve on this code later

### When someone resets their password
We will call a function called `send()`

#### Add our options in the `send()` method
`mail.js`

```js
exports.send = async (options) => {
  const mailOptions = {
    from: 'Johnnie Ballgame <noreply@johnnyballgame.com>',
    to: options.user.email,
    subject: options.subject,
    html: 'This will be filled in later',
    text: 'This will be filled in later'
  };
};
```

#### Promisify our `send()` email function
* By default `send()` works with **callbacks**

```js
const sendMailPromisify = promisify(transport.sendMail, transport);
```

* **Remember** `transport` is our mailtrap
* Good News - ones you swap out your `variables.env` for a production one, that will all just naturally work and hook up when you move onto a production level email sending app like Postmark (which actually does send your email)

### use your new promisified send() method
`return sendMail(mailOptions);`

### All together
`mail.js`

```js
// more code
exports.send = async (options) => {
  const mailOptions = {
    from: 'Johnnie Ballgame <noreply@johnnyballgame.com>',
    to: options.user.email,
    subject: options.subject,
    html: 'This will be filled in later',
    text: 'This will be filled in later'
  };
  const sendMailPromisify = promisify(transport.sendMail, transport);
  return sendMailPromisify(mailOptions);
};
```

### Wire up functionality to send the email when the user resets their password

`authController.js`

```js
// more code
const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  req.flash('success', `You have been emailed a password reset link. ${resetURL}`);
// more code
```

This is our current code that we have to alter to get our email sent via node

### Import our mail library
`authController.js`

```js
const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const mail = require('./../handlers/mail'); // add this line
```

### Call the `send()` method controller
`authController.js`

```js
// more code
const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
// start adding the below code
await mail.send({
    user,
    subject: 'Password Reset',
    resetURL,
    filename: 'password-reset'
  });
// stop adding code
req.flash('success', `You have been emailed a password reset link.`);
  // 4. redirect to login page
  res.redirect('/login');
// more code
```

* We also need to add `filename: 'password-reset'`
    - When we try to render out our HTML this **key/value** pair will enable us to look for `password-reset.pug`
* We use `await` to wait for the email to be sent
    - Once it is sent we will flash a success message
    - And redirect the user to the `/login` route

### Test to see if it works
1. Log out
2. Reset your email
3. Check mailtrap and you should see your email was sent

![mailtrap sent email](https://i.imgur.com/5hCfYp9.png)

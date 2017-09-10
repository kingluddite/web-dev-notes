# Sending email with Nodejs - Part 1
* Take pug file and convert to HTML ready email
* Take CSS and inline it
    - HTML email is a nightmare (_very hard_)
    - All CSS must be inlined into HTML emails in order to ensure it works across all different types of email Clients

## Mailtrap
Freemium email service

[link to Mailtrap](https://mailtrap.io/)

* You get 20 sends - delete the older ones and you get newer ones
* Instead of setting up a SMTP server (like [Postmarkapp](https://postmarkapp.com/))
    - For production you should use something like Postmarkapp
    - For development Mailtrap is great
        + It fakes being a mail server
        + Anytime you send mail to this fake mail server, instead of sending mail to your users it will send it to this mailtrap account
            * You will see who the emails are being sent to
            * What they look like
            * When they've been sent
            * And you don't have to worry about having to go to your email account
            * Or accidentally sending out emails to users (huge embarrassment!)

## Sign up for Mailtrap
* Once signed up and logged in, you will have access to your SMTP credentials
* We will make a **transport** with `node mailer` and to do this we will need all of the SMTP and POP3 credentials mailtrap gives us
* This is sensitive information so it should go inside `variables.env`

Update these values:

`variables.env`

* `port` and `host` are already set up for mailtrap
* Put in your username and password

```
// more code
MAIL_USER=123
MAIL_PASS=123
MAIL_HOST=mailtrap.io
MAIL_PORT=2525
// more code
```

* When we send these credentials it won't go anywhere, instead it will be **"trapped"** by mailtrap

## How do we send email?
* We will add a new handler

### Packages we need to send email
* nodemailer
* pug
* juice
* html-to-text
* es6-promisify

#### nodemailer
* [nodemailer link](https://nodemailer.com/about/)
* nodemailer will interface with SMTP or a number of **"transports"** and it will do the sending of the email for you

#### pug
* [pug link](https://www.npmjs.com/package/pug)
* template engine

#### juice
* [juice link](https://www.npmjs.com/package/juice)
* `juice` will inline your CSS properties into the style attribute
* This is useful for HTML emails

#### html-to-text
* [html-to-text link](https://www.npmjs.com/package/juice)
*  Mainly designed to transform HTML E-Mail templates to a text representation

#### es6-promisify
* [es6-promisify link](https://www.npmjs.com/package/es6-promisify)
* Converts callback-based functions to Promise-based functions

## Require all the packages
`/handlers/mail.js`

```js
const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
```

### Create our transport
* Transport is a way to interface with different ways of sending email
* SMTP being the most common one
* Below is sample code from the nodemailer website

![sample from nodemailer website](https://i.imgur.com/TWhvJKX.png)

`mail.js`

```js
// more code
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
```


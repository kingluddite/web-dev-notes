# Mailer Setup
![Mailer Setup](https://i.imgur.com/UXyHF2b.png)

* We just set up our SendGrid API keys
* We also installed the SendGrid NodeJS module

## SendGrid NodeJS module
* Created by SendGrid
* The purpose is to help us create our Mailer Object and send it off to the SendGrid API
    - SendGrid is our email Provider
    - They are the ones sending emails out to our users

## Mailer - Putting it together
* The Mailer code is the most complicated in our app
    - Because we are just going to be using a lot of their methods

![Mailer diagram](https://i.imgur.com/rqjbQpI.png)

* We'll set up our Mailer as a ES6 class
    - So every time we want create a new email and send it out to people
        + We'll import this class (or require it into one of our route files)
        + We'll create a new instance of the Mailer
        + We'll customize it in some fashion
        + And then somehow we'll send it off to the outside world
        + This will resemble a React JS Component

### Inside the Mailer class
* We'll do a couple of different setups for a few different properties
    - subject
        + Every email needs a subject
        + It will come from our Survey Model
            * Which we already created inside our route file
    - recipients
        + Already created and comes from Survey Model as well
    - body
        + This is where our outside template comes in
        + This provides the HTML body of the email
            * What the users see when they open up the email
            * To make sure we put the correct content inside the template we will pass in a properties from the Survey Model into the template
                - The template will produce some HTML to display as the body of the email
                - We take that template and pass it in as the body property of our Mailer
    - from_email
        + This is a bit tricky
        + This will be the email address that will be displayed on the from field inside of our emails
            * We need to set some default email inside `from_email`
    - from_email
* Once all properties are set up we'll call a function on the Mailer object called `toJSON()`
    - **remember** The Mailer represents the actual email
        + It's what we want to send off to SendGrid
        + It takes all our properties and turns in into JSON data
* Then we take that JSON and send it to SendGrid
* They will author and send our email

## New service - Email
* Create `/services/Mailer.js`
* We Capitalize Mailer because it exports a class
* `passport.js` has a lowercase `p` because it doesn't export anything at all

### Requires
`Mailer.js`

```js
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
```

* **note** We usually use ES6 destructuring here and if we did it would look like this:

`const { mail } = sendgrid;`

* But in all the SendGrid documentation they use `helper` so for convention we'll use `helper` instead
    - Because it is a helper object that helps us create the mailer

## Add our keys
`Mailer.js`

```js
const sendgrid = require('sendgrid');
const keys = require('../config/keys');

const helper = sendgrid.mail;
```

## helper.Mail
* We'll take this Mail class and add some stuff on it for our Mailer class
* And after we `extend` Mail we now have inherited the properties and methods inside Mail and have access to them inside our Mailer class
* 



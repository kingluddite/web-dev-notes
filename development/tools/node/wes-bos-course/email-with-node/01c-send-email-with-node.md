# Sending email with Nodejs - Part 3
## How do we get the HTML generating for our email?

### Our current file for password reset is done in pug
`password-reset.pug`

```
extends email-layout

block content
  h2 Password Reset
  p Hello. You have requested a password reset. Please click the following button to continue on with resetting your password. Please note this link is only valid for the next hour.
  +button(resetURL, 'Reset my Password →')
  p If you can't click the above button please visit #{resetURL}
  br
  p If you didn't request this email, please ignore it.
```

## Two questions we need to answer now:
1. How do we convert `password-reset.pug` into HTML?
2. How to we take our HTML and CSS and inline it?

### How do we convert `password-reset.pug` into HTML?

`mail.js`

```
// more code
const generateHTML = (filename, options = {}) => {

};
// more code
```

* Why did we not use `exports.generateHTML`?
    - Because the code generated is not needed anywhere outside of `mail.js`

`const html = pug.renderFile();`

* We imported `pug` so we could use it's `renderFile()` method and that will take as an argument the name of the file we are looking for (in our case it will be `password-reset.pug`)

## Houston we have a problem!
* Whenever you pass a function a reference to something on your `disc` you don't know where you are in the folder system
    - We know our `mail.js` is in the `handlers` folder but `renderFile()` is in a completely different folder and because of this it will get mixed up

### __dirname
* This is a special variable
    - Think of it like `Window` or `console` in the browser
    - `__dirname` is a variable that is always available to us in every single file
        + And `__dirname` will be equal to the current directory that we are running this file from (in this case it will be `HARDRIVE/handlers`)

`mail.js`

```
// more code
const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
};
// more code
```

* We point to where our `reset-password.pug` is located
* `options` will contain all the information (_like the reset variable and the user's email address_)

### Test
```
const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
  console.log(html); // add this line
  return html; // add this line
};
```

* When we run this it should:
    - Go off to our pug and find `password-reset.pug`
    - Generate it into HTML
    - return it
    - Which should enable us to pass it along to our email
    - And we should see it inside mailtrap when we reset our password

## Try it out
After you request to reset your password you should see this in mailgrab

![mailgrab html email sent](https://i.imgur.com/25Cm18O.png)

* This is pretty cool
* Let's go through what is happening here because someone we are using variable values inside our HTML email
* Let's dig in and talk about how this happened

### How did we put our token inside our HTML template email?
![email token](https://i.imgur.com/SFvcLIr.png)

* Because when we generated the resetURL

`authController.js`

```
// more code
const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
// more code
```

We then passed it via our `mail.send()`

![mail.send](https://i.imgur.com/WlgD10W.png)

Which accepted it in `mail.js` **send()**

![mail.send() options](https://i.imgur.com/7J5hbpO.png)

Then when we called generateHTML() and passed it `options`

![generateHTML options](https://i.imgur.com/3uRtEqn.png)

And then inside `generateHTML()` we gave `options` to all of our pug template files

![pug has options](https://i.imgur.com/DHTMYCa.png)

And finally inside of `password-reset.pug` we used **resetURL**

![resetURL inside pug](https://i.imgur.com/Ihss2vV.png)

Whew!

### We need to make a couple improvements
* Our `text` hasn't been properly updated in our email
* We need to add inline CSS
    - Our email looks fine in the Chrome browser but if you open it up in Windows XP 95, it will look really bad because CSS should be inlined

### Time to use `html-to-text`
* You give it HTML and it gives you text
    - We imported this package earlier

`const htmlToText = require('html-to-text');`

We'll update these two lines:

![htmlToText update](https://i.imgur.com/BEXxQhB.png)

`mail.js`

```
// more code
exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: 'Johnnie Ballgame <noreply@johnnyballgame.com>',
    to: options.user.email,
    subject: options.subject,
    html,
    text
  };
  const sendMailPromisify = promisify(transport.sendMail, transport);
  return sendMailPromisify(mailOptions);
};
```

* Maybe some of the people you are sending this to are reading their emails on VIM so we can provide them with a text only email

#### Test if text is working
Reset your password again and check mailtrap

![text only email working](https://i.imgur.com/BKU0iEv.png)

### How to we take our HTML and CSS and inline it?
#### We will use the `juice` module to do this
* How does `juice` work?
    - You give it HTML with style tags
    - It will take the style tags and it will:
        + inline them inside every single paragraph
        + it will find out which selectors match HTML and inline all of our CSS for us
* We are still logging the generated HTML so you can see it inside the termial

![terminal HTML](https://i.imgur.com/7UCbf0z.png)

* That CSS won't apply to the HTML in many email Clients
* We need to make the CSS inline and match it to our HTML tags
* That's what `juice` will do for us

We'll update this line of code

![console log html](https://i.imgur.com/YcmCJyk.png)

And instead we'll use `juice` in place of our `console.log`

`mail.js`

```
// more code
const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
  const inlined = juice(html); // add this line
  return inlined; // change this from html to inlined
};
// more code
```

## Test and once again reset your password
* Because you are using an awesome browser like Chrome, you won't see any difference
* But if you were using an old browser or Windows 95, you will see the same email layout that we have on our shiny, hip and happening computers
* Check out the HTML Source tab in `mailtrap` and you'll see at the body a really long line of inlined CSS

![inlined CSS](https://i.imgur.com/amBGbOj.png)

```
<body style="background-color: #303030; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><table class="body" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%"><tr><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top"> </td><td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top"><div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"><table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #fff; border-top: 20px solid #fff200; width: 100%;" width="100%"><tr><td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%"><tr><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top"><h2 style="color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; Margin-bottom: 30px;">Password Reset</h2><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello. You have requested a password reset. Please click the following button to continue on with resetting your password. Please note this link is only valid for the next hour.</p><table class="btn btn-primary" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%"><tbody><tr><td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"><tbody><tr><td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #fff200;" valign="top" align="center" bgcolor="#fff200"><a href="http://localhost:7777/account/reset/6ca659eece36896e29638601b1260e011c28c6cf" target="_blank" style="border: solid 1px #fff200; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #fff200; border-color: #fff200; color: #3a3a3a;">Reset my Password →</a></td></tr></tbody></table></td></tr></tbody></table><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you can't click the above button please visit http://localhost:7777/account/reset/6ca659eece36896e29638601b1260e011c28c6cf</p><br><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you didn't request this email, please ignore it.</p></td></tr></table></td></tr></table></div></td></tr></table></body></html>
```

### What did people do before `juice`
* Used tools like MailChimp's [CSS Inliner Tool](https://templates.mailchimp.com/resources/inline-css/) and paste the HTML into the box and it would convert it for you
* But juice does automatically everything for you which is amazing and a huge time saver

## Reusability of `send()`
* Sending email with node.js is really nice
* You can resuse this `send()` function over and over again
    - All you need to do is:
        + Pass it a new file name
        + Pass it a new user email
        + Pass it a new subject

![three things to reuse send()](https://i.imgur.com/Jc7tAH6.png) 

# Sending email with Nodejs - Part 3
## How do we get the HTML generating for our email?

### Our current file for password reset is done in pug
`/views/email/password-reset.pug`

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

`views/email/email-layout.pug`

```
//- Handy mixin for making buttons
mixin button(url, text)
  table.btn.btn-primary(border='0', cellpadding='0', cellspacing='0')
    tbody
      tr
        td(align='left')
          table(border='0', cellpadding='0', cellspacing='0')
            tbody: tr: td: a(href=url, target='_blank')= text

//- The Email
doctype html
html
  head
    meta(name='viewport', content='width=device-width')
    meta(http-equiv='Content-Type', content='text/html; charset=UTF-8')
    style
      include styles.css
  body
    table.body(border='0', cellpadding='0', cellspacing='0')
      tr
        td  
        td.container
          .content
            table.main
              tr
                td.wrapper
                  table(border='0', cellpadding='0', cellspacing='0')
                    tr
                      td
                        block content
```

`views/email/styles.css`

```css
/* -------------------------------------
    GLOBAL RESETS
------------------------------------- */
img {
  border: none;
  -ms-interpolation-mode: bicubic;
  max-width: 100%; }

body {
  background-color: #303030;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  padding: 0;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%; }

table {
  border-collapse: separate;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
  width: 100%; }
  table td {
    font-family: sans-serif;
    font-size: 14px;
    vertical-align: top; }

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */

.body {
  width: 100%;
  }

/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
.container {
  display: block;
  Margin: 0 auto !important;
  /* makes it centered */
  max-width: 580px;
  padding: 10px;
  width: 580px; }

/* This should also be a block element, so that it will fill 100% of the .container */
.content {
  box-sizing: border-box;
  display: block;
  Margin: 0 auto;
  max-width: 580px;
  padding: 10px; }

/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
  background: #fff;
  border-top:20px solid #fff200;
  width: 100%; }

.wrapper {
  box-sizing: border-box;
  padding: 20px; }

.footer {
  clear: both;
  padding-top: 10px;
  text-align: center;
  width: 100%; }
  .footer td,
  .footer p,
  .footer span,
  .footer a {
    color: #999999;
    font-size: 12px;
    text-align: center; }

/* -------------------------------------
    TYPOGRAPHY
------------------------------------- */
h1,
h2,
h3,
h4 {
  color: #000000;
  font-family: sans-serif;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  Margin-bottom: 30px; }

h1 {
  font-size: 35px;
  font-weight: 300;
  text-align: center;
  text-transform: capitalize; }

p,
ul,
ol {
  font-family: sans-serif;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  Margin-bottom: 15px; }
  p li,
  ul li,
  ol li {
    list-style-position: inside;
    margin-left: 5px; }

a {
  color: #fff200;
  text-decoration: underline; }

/* -------------------------------------
    BUTTONS
------------------------------------- */
.btn {
  box-sizing: border-box;
  width: 100%; }
  .btn > tbody > tr > td {
    padding-bottom: 15px; }
  .btn table {
    width: auto; }
  .btn table td {
    background-color: #ffffff;
    border-radius: 5px;
    text-align: center; }
  .btn a {
    background-color: #ffffff;
    border: solid 1px #fff200;
    border-radius: 5px;
    box-sizing: border-box;
    color: #fff200;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 12px 25px;
    text-decoration: none;
    text-transform: capitalize; }

.btn-primary table td {
  background-color: #fff200; }

.btn-primary a {
  background-color: #fff200;
  border-color: #fff200;
  color: #3a3a3a; }

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
  margin-bottom: 0; }

.first {
  margin-top: 0; }

.align-center {
  text-align: center; }

.align-right {
  text-align: right; }

.align-left {
  text-align: left; }

.clear {
  clear: both; }

.mt0 {
  margin-top: 0; }

.mb0 {
  margin-bottom: 0; }

.preheader {
  color: transparent;
  display: none;
  height: 0;
  max-height: 0;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  mso-hide: all;
  visibility: hidden;
  width: 0; }

.powered-by a {
  text-decoration: none; }

hr {
  border: 0;
  border-bottom: 1px solid #303030;
  Margin: 20px 0; }

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 620px) {
  table[class=body] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important; }
  table[class=body] p,
  table[class=body] ul,
  table[class=body] ol,
  table[class=body] td,
  table[class=body] span,
  table[class=body] a {
    font-size: 16px !important; }
  table[class=body] .wrapper,
  table[class=body] .article {
    padding: 10px !important; }
  table[class=body] .content {
    padding: 0 !important; }
  table[class=body] .container {
    padding: 0 !important;
    width: 100% !important; }
  table[class=body] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important; }
  table[class=body] .btn table {
    width: 100% !important; }
  table[class=body] .btn a {
    width: 100% !important; }
  table[class=body] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important; }}

/* -------------------------------------
    PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */
@media all {
  .ExternalClass {
    width: 100%; }
  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%; }
  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important; }
  .btn-primary table td:hover {
    background-color: #00ffde !important; }
  .btn-primary a:hover {
    background-color: #00ffde !important;
    border-color: #00ffde !important; } }

```

## Two questions we need to answer now:
1. How do we convert `password-reset.pug` into HTML?
2. How to we take our HTML and CSS and inline it?

### How do we convert `password-reset.pug` into HTML?

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

// add this code
const generateHTML = (filename, options = {}) => {

};
// more code
```

#### Why did we not use `exports.generateHTML`?
* Because the code generated is not needed anywhere outside of `mail.js`

`const html = pug.renderFile();`

* We imported `pug` so we could use it's `renderFile()` method
* And that will take as an argument the name of the file we are looking for
* In our case it will be `password-reset.pug`

## Houston we have a problem!
* Whenever you pass a function a reference to something on your computer's physical disc you don't know where you are in the folder system
* We know our `mail.js` is in the `handlers` folder but `renderFile()` is in a completely different folder and because of this it will get mixed up

### __dirname
* This is a special variable
    - Think of it like `Window` or `console` in the browser
    - `__dirname` is a variable that is always available to us in every single file
        + And `__dirname` will be equal to the current directory that we are running this file from (_in this case it will be `HARDRIVE/handlers`_)

`mail.js`

```js
// more code
const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
};
// more code
```

* We point to where our `reset-password.pug` is located
* `options` will contain all the information (_like the reset variable and the user's email address_)

### Test
```js
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

`mail.js`

```js
// more code
const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${filename}.pug`,
    options
  );
  console.log(html); // add this line
  return html; // add this line
};

exports.send = async options => {
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

## Try it out
After you request to reset your password you should see this in mailgrab

![mailgrab html email sent](https://i.imgur.com/25Cm18O.png)

* This is pretty cool!
* We are using variable values inside our HTML email

### How did we put our token inside our HTML template email?
![email token](https://i.imgur.com/SFvcLIr.png)

* Because when we generated the `resetURL`

`authController.js`

```
// more code
const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
// more code
```

* We then passed it via our `mail.send()`

![mail.send](https://i.imgur.com/WlgD10W.png)

* Which accepted it in `mail.js` **send()**

![mail.send() options](https://i.imgur.com/7J5hbpO.png)

* Then when we called `generateHTML()` and passed it `options`

![generateHTML options](https://i.imgur.com/3uRtEqn.png)

* And then inside `generateHTML()` we gave `options` to all of our pug template files

![pug has options](https://i.imgur.com/DHTMYCa.png)

* And finally inside of `password-reset.pug` we used **resetURL**

![resetURL inside pug](https://i.imgur.com/Ihss2vV.png)

## Whew!

### We need to make a couple of improvements
* Our `text` hasn't been properly updated in our email
* We need to add `inline CSS`
    - Our email looks fine in the Chrome browser but if you open it up in Windows XP 95, it will look really bad because CSS should be inlined

### Time to use `html-to-text`
* You give it HTML and it gives you text
    - We imported this package earlier

`const htmlToText = require('html-to-text');`

* We'll update these two lines:

![htmlToText update](https://i.imgur.com/BEXxQhB.png)

`mail.js`

```js
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

* Maybe some of the people you are sending this to are reading their emails on the VIM text editor so we can provide them with a text only email

#### Test if text is working
* Reset your password again and check mailtrap

![text only email working](https://i.imgur.com/BKU0iEv.png)

### How do we take our HTML and CSS and inline it?
#### We will use the `juice` module to do this
* How does `juice` work?
    - You give it HTML with style tags
    - It will take the style tags and it will:
        + Inline them inside every single paragraph
        + It will find out which selectors match HTML and inline all of our CSS for us
* We are still logging the generated HTML so you can see it inside the termial

![terminal HTML](https://i.imgur.com/7UCbf0z.png)

* That CSS won't apply to the HTML in many email Clients
* We need to make the CSS inline and match it to our HTML tags
* That's what `juice` will do for us
* We'll update this line of code

![console log html](https://i.imgur.com/YcmCJyk.png)

And instead we'll use `juice` in place of our `console.log`

`mail.js`

```js
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
* Sending email with `Node.js` is really nice
* You can reuse this `send()` function over and over again
    - All you need to do is:
        + Pass it a new file name
        + Pass it a new user email
        + Pass it a new subject

![three things to reuse send()](https://i.imgur.com/Jc7tAH6.png) 

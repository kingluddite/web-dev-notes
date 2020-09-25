# Forgot Password Send Email
## First save `Forgot Password` route in Postman

## Nodemailer
* This is a popular package
* [docs for nodemailer](https://nodemailer.com/about/)
* Fairly simple
* We create a transporter
* We can use gmail
    - In production it will be better to use [sendgrid](https://sendgrid.com/pricing/)
    - But for development we'll use `mailtrap`
        + [mailtrap docs](https://mailtrap.io/)

## Mailtrap
* Safe Email Testing for Staging & Development
* This is like a "fake SMTP" server
* We'll have emails sent to our users but we'll catch the emails so they won't actually get sent
* It's free
* Create an account in Mailtrap

### Access the Credentials
* This will give you the info you need to trap emails
* We will put these credentials in our config file

`config/config.env`

```
// MORE CODE
JWT_COOKIE_EXPIRE=30

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=024aaaa37dda60
SMTP_PASSWORD=9057db9bc8123a
FROM_EMAIL=noreply@example.com
FROM_NAME=RevADevDev
```

* `SMTP_HOST=` get from mailtrap
* `SMTP_PORT=` get from mailtrap
* The `SMTP_EMAIL=` you put in the id mailtrap gives you but you could swap this out with a gmail email
* `FROM_EMAIL=` you can use your domain
* `FROM_NAME=` make it what you want

## Install nodemailer
`$ npm i nodemailer`

## Remember to restart your server
`$ npm run dev`

## We will create a utility for sending emails
`$ mkdir utils/sendEmail.js`

* Copy and paste this code we get from nodemailer site:

`utils/sendEmail.js`

```
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
```

## After updates it will look like this:
`utils/sendEmail.js`

```
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // We don't need to create a test account

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
```

## And let's work on our auth controller
`controllers/auth.js`

```
// MORE CODE

const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); // ADD!

// MORE CODE
```

* Now we'll jump back in our `forgotPassword` controller
* We will need to prepare things that we need to send into our `//` utility
    - One will be to reset URL that includes the token
    - We'll need to get the protocol `req.protocol`
    - We'll need to get the host with `req.get('host')`
    - We'll need to add on our `resetToken`

```
// MORE CODE

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

// MORE CODE
```

* Now we'll create a message to pass in
* If we were using a frontend this would be different
    - Here if we were using React, we would include a frontend link
    - But in this case

`controllers/auth.js`

```
// MORE CODE

// @desc     Forgot password
// @route    POST /api/v1/auth/forgotpassword
// @access   Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // Get user by their email in the request body
    const user = await User.findOne({email: req.body.email});

    // Check if user exists
    if (!user) {
        return next(new ErrorResponse(`There is no user with that email`, 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });

        res.status(200).json({
            success: true,
            data: 'Email sent'
        });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorResponse('Email could not be sent', 500));
    }
});

// MORE CODE
```

* We set `resetPasswordToken` and `resetPasswordExpire` to **undefined** to clean up client if there was an error (we don't want to leave anything lying around that could possibly be used to reset an email password - very important for security)

## Test in Postman
* Send the forgot password request
* You should get this successful response

```
{
    "success": true,
    "data": "Email sent"
}
```

* Then look on mailtrap and you'll see something like this:

```
You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to 

 http://localhost:5000/api/v1/resetpassword/b8631d658c7f9c64246871a847bfee71e89700e5
```

![mailtrap working](https://i.imgur.com/pBtV39X.png)

## Next
* We need to handle this URL we sent in the email
* Currently it does nothing
    - We need to send the new password to this URL and have it reset the password
    - **note** This URL will only last for 10 minutes

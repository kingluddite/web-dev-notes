# Sending Email
* To send emails we need an SMTP account to send emails
* This is usually hard to set up
    - You need to verify your domain name and do a bunch of stuff before you can actually get to sending email
    - And when you're `dev'ng` you don't want to send email
    - That is where a service called `mailtrap` comes in

## What is mailtrap?
* It is an SMTP server that won't actually send emails to anyone but it will "trap" them and put them in this backend and this gives you the following benefits:
    - You don't bother people with test emails
    - You can see what gets sent
    - What it looks like
    - Who's sending it
    - Lots of useful information

## But what do I do when I'm ready to push my emails live?
* Use [Postmark](https://postmarkapp.com)
    - Others
        + Sendgrid
        + Others but whatever it is, just swap out your SMTP credentials with the new ones

## Get started with mailtrap
* Sign up for Mailtrap
* Log in and go to inbox
* Click the Demo Inbox
    - Here you will see your SMTP credentials
        + Important stuff:
            * Host (MAIL_HOST)
            * Port (MAIL_PORT)
            * Username (MAIL_USER)
            * Passsord (MAIL_PASSWORD)
    - Because these will change depending if you are in development or production we will stick this info inside our `.env` file
* **note** This info changes per your mailtrap account
    - Mail Port is `25`, `465` or `2525` (we'll use `2525`)

`/backend/.env`

```
// MORE CODE
MAIL_HOST="smtp.mailtrap.io"
MAIL_PORT=2525
MAIL_USER="usernamegoeshere"
MAIL_PASS="passwordgoeshere"
```

## Use Nodemailer npm package
* The best way to send email with NodeJS
* Click dropdown and select `Nodemailer` from inside the `mailtrap` dashboard
* They give you the code to configure a `transport`
    - What is a `transport`?
        + One way of sending email
        + You can have multiple transports
        + You can hook it up to your gmail if you want
            * But we will be hooking our transport up to a SMTP
* We could hardcode our `transport` but we will keep security in mind and use our `.env` to hide our important values  

## /mail.js
* Create `mail.js` in `backend/src/mail.js`

```
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

exports.transport = transport;
```

## What are we going to use to template out our email
* Lots of ways to template emails
* You can even do templating in React using `MJML`
* [MJML](https://mjml.io/)
* We could use Pug to template with `juice` to inline the CSS
* We will just use barebone email

## Barebone template email
`mail.js`

```
// MORE CODE

const makeANiceEmail = text => `
 <div className="email" style="
 border: 1px solid black;
 padding: 20px;
 font-family: sans-serif;
 line-height: 2;
 font-size: 20px;
 ">
    <h2>Hi from a server side basic template</h2>
  <p>{$text}</p>
  </div>
`;

exports.transport = transport;
```

* So that is a super basic email template
* We can do better

### Let's try MJML
* Will be responsive
* Will work in every email client, including smart phones and apps
* You won't have to write HTML tables

#### What is MJML
* Mail Jet Markup Language(MJML)
* Open source framework that abstracts away the complexity of responsive email

### Install MJML globally
`$ sudo npm i -g mjml`

* We install it globally because we will use the CLI to transform a nice MJML prebaked template into an awesome design email template that is responsive and will look great in everyone's email

#### Grab a nice template
* [nice mgml email template](https://mjml.io/try-it-live/templates/happy-new-year)
* [VS Code MJML Syntax](https://marketplace.visualstudio.com/items?itemName=digitalstreamio.mjml-syntax#overview)
* Save the MJML template as `basic-email.mjml`

`backend/src/email-templates/basic-email.mjml`

```
<mjml version="3.3.3">
  <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
    <mj-section background-color="#C1272D" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
      <mj-column>
        <mj-image align="center" padding="10px 25px" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1h3k4.png" width="128px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
      <mj-column>
        <mj-image align="center" padding="10px 25px" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1h3s5.gif" width="600px"></mj-image>
        <mj-image align="center" alt="Happy New Year!" container-background-color="#ffffff" padding="10px 25px" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1hlvp.png" width="399px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding="20px 0px 20px 0px" text-align="center" vertical-align="top">
      <mj-column>
<mj-text align="center" font-weight="300" padding="30px 40px 10px 40px"
font-size="32px" line-height="40px" color="#5FA91D">Your Password Reset Has Arrived!</mj-text>
        <mj-text align="center" color="#55575d" font-family="Arial, sans-serif" font-size="14px" line-height="28px" padding="0px 25px 0px 25px">
       DYNAMIC TEXT HERE 
        </mj-text>
        <mj-image align="center" alt="Best wishes from all the Clothes Team!" padding="10px 25px" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1hlv8.png" width="142px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#C1272D" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
      <mj-column>
        <mj-text align="center" color="#ffffff" font-family="Arial, sans-serif" font-size="13px" line-height="22px" padding="10px 25px">Simply created&nbsp;on&nbsp;<a style="color:#ffffff" href="http://www.mailjet.com"><b>Mailjet Passport</b></a></mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-repeat="repeat" background-size="auto" padding="20px 0px 20px 0px" text-align="center" vertical-align="top">
      <mj-column>
        <mj-text align="center" color="#55575d" font-family="Arial, sans-serif" font-size="11px" line-height="22px" padding="0px 20px">[[DELIVERY_INFO]]</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`
);

exports.basicEmailHtmlOutput = basicEmailHtmlOutput;
```

### Convert MJML into an HTML email friendly template
`mjml -r basic-email.mjml -o email-template.html`

* Now I want to dynamically inject some text into this
* I'm sure there is a better way to do this but this is how I got it to work
* Create a `basic-email.js` file

`email-templates/basic-email.js`

```
const makeANiceEmail = text => `
  <div style="background-color:#F4F4F4;">
    <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="background:#C1272D;background-color:#C1272D;Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#C1272D;background-color:#C1272D;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                        <tbody>
                          <tr>
                            <td style="width:128px;">
                              <img height="auto" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1h3k4.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="128" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                        <tbody>
                          <tr>
                            <td style="width:550px;">
                              <img height="auto" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1h3s5.gif" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="550" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background:#ffffff;font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                        <tbody>
                          <tr>
                            <td style="width:399px;">
                              <img alt="Happy New Year!" height="auto" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1hlvp.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="399" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="center" style="font-size:0px;padding:30px 40px 10px 40px;word-break:break-word;">
                      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:32px;font-weight:300;line-height:40px;text-align:center;color:#5FA91D;"> Your Password Reset Has Arrived! </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size:0px;padding:0px 25px 0px 25px;word-break:break-word;">
                      <div style="font-family:Arial, sans-serif;font-size:14px;line-height:28px;text-align:center;color:#55575d;"> ${text} </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                        <tbody>
                          <tr>
                            <td style="width:142px;">
                              <img alt="Best wishes from all the Clothes Team!" height="auto" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1hlv8.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="142" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="background:#C1272D;background-color:#C1272D;Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#C1272D;background-color:#C1272D;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:center;color:#ffffff;"> Simply created&nbsp;on&nbsp;<a style="color:#ffffff" href="http://www.mailjet.com"><b>Mailjet Passport</b></a>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="center" style="font-size:0px;padding:0px 20px;word-break:break-word;">
                      <div style="font-family:Arial, sans-serif;font-size:11px;line-height:22px;text-align:center;color:#55575d;"> [[DELIVERY_INFO]] </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
  </div>
`;

exports.makeANiceEmail = makeANiceEmail;
```

* We made it a function and exported it and it can take some `text`

## Open up Mutation resolver for the `requestReset` of the password
* **note** The actual resetPassword doesn't need to seed an email
    - But the `requestReset` does need to send the email

### Import the email template into the Mutation
* Move the `return { message: 'Thanks!' };` to the bottom
    - If you don't we will never see past that line as the `return` stops us moving to the next line

`Mutation.js`

```
// MORE CODE
const crypto = require('crypto');

// custom imports
const { transport } = require('../mail');
const { makeANiceEmail } = require('../email-templates/basic-email');

const setCookieWithToken = (ctx, token) => {
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
};

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );
    console.log(item);

    return item;
  },

  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // console.log(where);
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // 2. Check if they own that item or have the permissions
    // TODO
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    // make sure all emails are lowercase
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the jwt as a cookie on the response
    setCookieWithToken(ctx, token);
    // We did it! Now return the user to the browser!
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // 1. Check if there is an email with that user
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if there password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. Generate the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    setCookieWithToken(ctx, token);
    // 5. Return the user
    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Live long and prosper!' };
  },

  async requestReset(parent, args, ctx, info) {
    // 1. Check if this is a real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    // 2. Set a reset token and expiry on that user
    const randomBytes = util.promisify(crypto.randomBytes);
    const resetToken = (await randomBytes(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });
    // 3. Email them that reset token
    const mailRes = await transport.sendMail({
      from: 'howley.phil@gmail.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: makeANiceEmail(`Your Password Reset Token is here!
        \n\n
        <a href="${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
    });
    // 4. Return the message
    return { message: 'Thanks!' };
  },
};

module.exports = Mutations;
```

* We use the `transorts` **sendMail()** method and pass it:
    - from (who is sending the email)
    - to (who are we sending it to)
        + We have the `user` so we have their email and can send it to that specific email
    - subject (subject of the email)
    - html: We call our js file that was made into a function so we can inject into text and important information
    - `/n/n` (2 new lines for an email)
    - We don't want to hardcode the href pointing to our `http://localhost:7777` as that will change in production
        + This is the beauty of environment variables and whey we stored `FRONTEND_URL="http://localhost:7777"` in our `.env` file so when our environment changes to production this USR will automatically update to the production URL
        + We point the link to the reset page and make sure the `resetToken` (that we have access to from above) and send it along for the ride in a **query string**
        + We use ES6 template strings to make this formatting super simple

### Ways to improve this code (Homework)
* If there is an error and we are assuming it will work
* You could check for the `mailRes` or you could wrap the entire `mailRes` in a **try/catch** and send an error back, or throw and error and that would tell the user sorry, something wrong happened
* But we will keep it simple and assume it worked fine

## Test if it works
* Sign out
* Sign in
* Request a password reset and enter your email
* You will see a success message to check your email
* Check your mailtrap
* You will see Your Password Reset Token email subject
* Open it and you will see the lovely email
* Examine link inside email, hover over it and see the URL is pointing to `http://localhost:7777`
* Click link
* Change and confirm password
* And you should be automatically logged in

## Additional Resources
* [mgml blog tutorial](https://mydigitalsauce.com/blog/create-responsive-emails-in-under-10-minutes/)
* [mgml 10 min video tutorial](https://mydigitalsauce.com/blog/create-responsive-emails-in-under-10-minutes/)



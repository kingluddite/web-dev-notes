# Serverless functions intro
* With gatsby we have HTML, CSS and JavaScript so it's all frontend
* But if you need to do something on the backend you can't really do that
    - Sanity allows us to create, using and pulling data
    - But what about something like sending an email?
        + That has to happen on the server side
* So anytime you want to do something server side you are SLO with Gatsby
* But gatsby works well with `serverless functions`

## What are serverless functions?
* Similar to a Node.js server
* But instead of a Node.js server that does lots and lots of stuff
    - A serverless function just does one thing and then shuts itself down

## How can I use serverless functions?
* You can use it with any service you just need a URL you can ping

## We will use Netlify functions
* Netlify does a great job hosting gatsby
* And they also offer hosting serverless functions
    - Netlify makes it easy to use these serverless functions in both:
        + development
        + deployment

## Create our first netlify serverless function
* Create a folder in the root called `functions`
* We need to create a `netlify.toml` file in our functions folder
* [More info on netlify.toml](https://docs.netlify.com/configure-builds/file-based-configuration/)

### What is .toml?
* `TOML` stands for Tom's Obvious, Minimal Language
* It is a data serialisation language designed to be a minimal configuration file format that's easy to read due to obvious semantics
* It is an alternative to YAML and JSON

`netlify.toml` (IT IS IMPORTANT TO PLACE THIS FILE IN THE ROOT OF YOUR APP)

* Use tab to indent
* This tells netlify where our functions reside

```
[build]
  functions = "functions/"
```

## Change in how we run gatsby when using netlify serverless functions
`$ netlify dev`

`package.json`

* Instead of running `$ npm start` (that ran `$ npm run develop` which ran `$ gatsby develop` (using esm mode so we have ass))
* We now will run `$ npm run netlify`
    - That in turn will run `$ netlify dev`
        +  
```
// MORE CODE

  "scripts": {
    "//": "‚ÅâÔ∏è Hey! This might look confusing but allow me to explain. The command we want to run is called gatsby build. But because we want to use es modules with gatsby, we use a package called esm. One way to require it is to set the NODE_OPTIONS environmental variable to -r esm. Finally to make this work for windows users, we use the cross-env package. Hopefully once Node es modules are stable, we can bring this back to simple gatsby build",
    "build": "cross-env NODE_OPTIONS=\"-r esm\" gatsby build",
    "develop": "cross-env NODE_OPTIONS=\"-r esm\" gatsby develop",
    "start": "npm run develop",
    "serve": "cross-env NODE_OPTIONS=\"-r esm\" gatsby serve",
    "clean": "gatsby clean",
    "lint:css": "stylelint './src/**/*.js'",
    "netlify": "netlify dev",
    "prebuild": "netlify-lambda install"
  },

// MORE CODE
```

## Run Netlify
`$ npm run netlify`

* **note** You will see the build starts with some proxy stuff
* Under the hood that will both run:
    - `$ npm start`
    - And it will also set us up properly for running serverless functions
* Kill the gatsby build
* **FOLLOW UP** Why when I run `$ npm run netlify` does the `:8888` endpoint open but hangs on a white screen until I refresh?

### We'll get a new URL `http://localhost:8888`
* Now we'll run our website off of this URL
* We were previously using `http://localhost:8000`
    - But `$ netlify dev` will proxy our website
    - Netlify will do all the regular gatsby stuff for us under the hood
* **note** You may have to refresh the `:8888` site if it hangs
    - Eventually you should see the pizza gatsby site running

### Writing our first serverless function
* Rules
    - For each of the functions we have create a new folder
    - example: `yo`
        + Inside that folder you need to make a file with same name
            * `yo/yo.js`
            * The code inside this file is referred to as a "handler"
            * The code is just node.js
                - (they are actually just amazon serverless functions under the hood)
                - **note** netlify docs are not great
                - **note** but the [AWS LAMDBDA docs](https://docs.aws.amazon.com/lambda/index.html) are good
`functions/yo/yo.js`

```
exports.handler = async (event, context) => {
  console.log(event);
  return {
    statusCode: 200,
    body: 'Yo!',
  };
};
```

* Restart netlify with `$ npm run netlify`
* Now to run this serverless function visit `http://localhost:8888/.netlify/functions/yo`
* You will see `Yo` in the browser when you hit that URL
* If you see `Function not found` restart netlify

## Inside of our `yo.js` file we can install any npm package we want
* You can require anything
* You can parse anything
* And when you are finished doing what you need to do, just return the data that you need

### We will write a serverless function that will
* It will be called `placeOrder`
* It will use nodemailer to hook up to an external email service and send those emails out
* **note** If your serverless function is so large you may want to have your own `package.json` inside your serverless function folder
    - **West Practice** Create a `package.json` for each of your serverless functions
        + **note** You could also put them in your main app's `package.json`
    - Navigate to your `functions/placeOrder/` folder
    - `$ npm init -y`
    - `$ npm i nodemailer` (will enable us to send emails with JavaScript)
        + **note** Currently we can't use ES Modules with serverless functions
        + postmarkapp.com wes likes to send email
        + sendgrid is another good email app
        + But you can test using `Ethereal.email`
            * Allows you to create a temporary testing email
            * Which is what you need when in development
            * **note** Almost all of your email sending will use port `587`

## email testing site: `https://ethereal.email`
* Just click create ethereal Account button
* Copy and paste the code like this:

functions/placeOrder/placeOrder.js

```
const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'emile.gaylord48@ethereal.email',
        pass: 'LArKXadXbbvNhQn2PT'
    }
});
```

### Don't hardcode your values
* Put them in your: 

`.env`

```
SANITY_TOKEN=blablabla
GATSBY_PAGE_SIZE=2
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=emile.gaylord48@ethereal.email
MAIL_PW=LArKXadXbbvNhQn2PT
```

`functions/placeOrder/placeOrder.js`

```
const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});
```

##West Practice
* If you don't know where the email will go us `example.com` domain
    - jdoe@example.com
    - example.com was set aside specifically for testing emails
    - If you test and send to a real email that will cause problems

```
const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

// Test send an email
transporter.sendMail({
  from: 'ZA ZA Gabore Pizza! <zaza@example.com>',
  to: 'orders@example.com',
  subject: 'New order!',
  html: `<p>Your new pizza is here!</p>`,
  });
```

* And we export using Common JS (not ES Modules)

`placeOrder.js`

```
const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

exports.handler = async (event, context) => {
  // Test send an email
  const info = transporter.sendMail({
    from: 'ZA ZA Gabore Pizza! <zaza@example.com>',
    to: 'orders@example.com',
    subject: 'New order!',
    html: `<p>Your new pizza is here!</p>`,
  });

  console.log(info);

  return {
    statusCode: 200,
    body: info,
  };
}
```

* Restart netlify

`$ npm run netlify`

* Hit this endpoint - http://localhost:8888/.netlify/functions/placeOrder/placeOrder
    - You get this error
        + Your function response must have a string body. You gave: [object Promise]
        + We need to stringify our info
* Success terminal message

![success email sent](https://i.imgur.com/aFsIoz8.png)

* And in the browser you'll see this after hitting endpoint

![browser email success](https://i.imgur.com/FqgaCLN.png)

* And then checkinging your email in `ethereal.email`
    - **note** Don't close this site or you'll have to regenerate another user and then update the `.env` MAIL environment variables
* You should see a new order

![new email order](https://i.imgur.com/a6g58me.png)

* And click on the new email and you'll see it's content
    - If you do see it, it worked!

![a sent email with the order](https://i.imgur.com/iBBMLdh.png) 

# Sendgrid Setup
![mailer object diagram](https://i.imgur.com/yNVYDlK.png)

## Setup for the Sendgrid API
* Signup for the Sendgrid API keys
* Setup the Sendgrid API keys
* Install a NodeJS package to help us interact with Sendgrid better

## Sign up for free trial account
* Enter valid email and confirm your email in email they send you
* They have lots of stuff
* All we care about is the API keys
* Settings > API > Create API key
    - Enter some key name `emaily`
    - Select API key with Full Access Permissions
        + Send, receive email
* Then click `Create & View`
* They show you their API key and then they never show it to you again. If you forget it, you'll have to regenerate it
    - Click on box of API key to copy it

### ADD API KEY
`/config/dev.js`

```
// more code
  stripeSecretKey: 'sk_test_CR6hLfQGFI1sWBTfasfasfasdf',
  sendGridKey:
    'SG.tvHvg0WTT1mX3d15-aOu9A.aSNAlaNaZzVT6YpCtLnK5-6UZD-asfasfasdfs'
};
```

`/config/prod.js`

```
// more code
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY
};
```

* Add to Heroku SEND_GRID_KEY (like we did for other keys)

## Install SendGrid API module to our NodeJS project
`$ yarn add sendgrid`

**note**

* Start server again `$ npm run dev`
* Make sure to periodically check if you have errors as we move along from now on

## Next - Setup Mailer Object

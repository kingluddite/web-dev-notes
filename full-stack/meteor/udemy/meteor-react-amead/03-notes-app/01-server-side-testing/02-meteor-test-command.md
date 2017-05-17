# Meteor Test command
[mochajs.org](http://mochajs.org/)

* Mocha is a JavaScript framework that works with `Node.js` and the browser which is great because we have a **full stack** application
* Very popular
* Well documented

## Meteor package to add Mocha to our project
* `Mocha` alone is generic
* We will use a `Test Driver` to teach **Mocha** how to work with **Meteor**

## Clone Meteor Boilerplate project
`$ git clone git@github.com:kingluddite/meteor-react-boilerplate.git notes`

`$ cd notes`

`$ meteor test`

We'll get an error

![Error test driver](https://i.imgur.com/8D3lBix.png)

[practicalmeteor-mocha](https://atmospherejs.com/practicalmeteor/mocha)

### Install
`$ meteor add practicalmeteor:mocha`

### Install all dependencies
`$ meteor npm install`

Now let's use our `test driver`

`$ meteor test --driver-package=practicalmeteor:mocha`

* This will give us a **URL**
* We use this **URL** to view the output (_if our tests were successful or failed_)
* This is called a `Web Reporter`
    - An alternative to a `console reporter`

![Web Reporter](https://i.imgur.com/KvrqixL.png)

## Add test script to `package.json`
```
{
  "name": "short-link",
  "private": true,
  "scripts": {
    "start": "meteor run",
    "test": "meteor test --driver-package=practicalmeteor:mocha"
  },
  "dependencies": {
    "babel-runtime": "^6.20.0",
    "meteor-node-stubs": "~0.2.4",
    "moment": "^2.18.1",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "react-router": "^3.0.5",
    "simpl-schema": "^0.2.3"
  },
  "devDependencies": {
    "babel-eslint": "^7.2.3",
    "eslint": "^3.19.0",
    "eslint-plugin-react": "^6.10.3"
  },
  "engines": {
    "node": "4.6.2"
  }
}
```

## Run Test script
`$ npm run test` or just `$ npm test`

# Intro
## Meteor version
`$ meteor --version`

## Help
`$ meteor --help`

## [What is Meteor?](https://guide.meteor.com/#what-is-meteor)
* Meteor is a **full-stack** JavaScript platform for developing modern web and mobile applications
* Meteor includes a key set of technologies for building
    - Connected-client reactive applications
    - A build tool
    - And a curated set of packages from the `Node.js`
    - General JavaScript community

## What is full-stack?
Both client and server

* On the `client` Meteor uses **JavaScript**
* On the `server` Meteor uses **NodeJS** behind the scenes

To use **node** you would normally have to install it but Meteor bundles all of its dependencies together

* Meteor `server` always runs on **Node.js**
* But on the `client side` could be:
    - A browser app
    - An android app
    - Or an IOS app

## Meteor has a real time component
* By using web sockets we can have **real time communication**
    - So the `server` can tell the `client` something has changed and the `client` can re-render itself
    - And the `client` can say, "_Hey the user has interacted with the app and you the server should update the data to reflect that_"

**note** This is two way communication and Meteor has that by default

## Meteor is a build tool

## Meteor has packages
* [npmjs.com](https://www.npmjs.com/) (_general purpose packages_)
* [atmospherejs.com](https://atmospherejs.com/) (_meteor specific packages_)

## Data is stored in MongoDB

## Overall Diagram
* We have a **Node.js** `server`
    - This will connect to our **MongoDB database**
    - This will serve up our **assets**
* `Client-side` JavaScript (_JavaScript that runs in the browser_)
* **MongoDB** database
* **Web Sockets** - Connect our **Node.js** server to the `Client-side` JavaScript
* **Blaze** - Meteor comes bundled with a rendering tool called **Blaze**
    * We won't use it
    * We will use **React** as our rendering tool instead
        + It is currently a very popular choice

![overall meteor application diagram](https://i.imgur.com/OVInJnV.png)

**note** The first time you create a Meteor app it will take significantly longer then future Meteor apps you create and that is only because Meteor adds a bunch of tools the first time

### Why are we using `$ meteor npm install` instead of `$ npm install`?
Meteor comes with its own version of **npm** and that is why we use `$ meteor npm install` instead of just `$ npm install`

### How do I run Meteor?
`$ meteor run` 

Or just `$ meteor` (_The later is just an alias for the other_)

### When you run Meteor it:

* Starts up your Web Server
* Starts up MongoDB
* Compiles your Application files into a nice minified, concatenated bundle
    - This makes sure your app runs smoothly

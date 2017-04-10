# Intro
## Meteor version
`$ meteor --version`

## Help
`$ meteor --help`

## [What is Meteor?](https://guide.meteor.com/#what-is-meteor)
Meteor is a full-stack JavaScript platform for developing modern web and mobile applications. Meteor includes a key set of technologies for building connected-client reactive applications, a build tool, and a curated set of packages from the Node.js and general JavaScript community.

**full-stack** - both client and server
On the client Meteor uses JavaScript
On the server Meteor uses NodeJS behind the scenes

To use node you would normally have to install it but Meteor bundles all of its dependencies together

Meteor server always runs on node
But on the client side could be a browser app, an android app, or an IOS app

Meteor has a real time component - by using websockets we can have real time communication so the server can tell the client something has changed and the client can re-render itself, and the client can say, hey the user has interacted with the app and you the server should update the data to reflect that. this is two way communication and Meteor has that by default

Meteor is a build tool

Meteor has packages
* npmjs.com (general purpose packages)
* atmospherejs.com (meteor specific packages)

Data is stored in MongoDB

## Overall Diagram
* We have a Node.js server, this will connect to our MongoDB database, serve up our assets
* Client-side JavaScript (_JavaScript that runs in the browser_)
* MongoDB database
* Web Sockets - Connect our Node.js server to the Client-side JavaScript
* Meteor comes bundled with a Rendering tool called Blaze, we will use React instead

![overall meteor application diagram](https://i.imgur.com/OVInJnV.png)

The first time you create a meteor app it will take significantly longer then future Meteor apps you create and that is only because Meteor adds a bunch of tools the first time

Meteor comes with its own version of npm and that is why we use `$ meteor npm install` instead of just `$ npm install`

## To run Meteor
`$ meteor run` or just `$ meteor` (the later is just an alias for the other)

When you run Meteor it:

* Starts up your Web Server
* It starts up MongoDB
* And it compiles your Application files into a nice minified concatenated bundle, make sure your app runs smoothly 

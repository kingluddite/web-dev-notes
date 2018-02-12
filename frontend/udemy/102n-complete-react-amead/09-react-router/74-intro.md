# Intro to React Router (Start of Part 2)

## New Project
* Expense Mgr - Expensify
* [Final Working app](http://expensify.mead.io/)
* [Final Code](https://github.com/andrewjmead/react-course-2-expensify-app)

### Features
* Client side routing - multiple pages
* Integrate a DB
* Integrate user accounts
* Oauth
* Deploy live to web
* Log in and use app
* Date picker (3rd Party tools)
* Add expenses, Edit them, Update them delete them

## Server vs Client Routing

![big picture diagram](https://i.imgur.com/1VU9o8T.png)

### Server side routing
* The traditional
* We define the routes on the server
* Involves the cloud
* Network latency is involved
* Gets to be an expensive process of many HTTP Requests to the Server and Responses from the server

### Client side routing
* We define the routes inside JavaScript so we can dynamically change what gets shown in the UX
* HTML5 history API available by browsers
    - Allows us to watch for URL changes
    - And run JavaScript when URL does change
    - Also enables us to do it on the client and not go to the Server
    - Runs a ton faster

#### Made popular by
* Angular
* View
* Meteor
* React
* Backbone
* Ember

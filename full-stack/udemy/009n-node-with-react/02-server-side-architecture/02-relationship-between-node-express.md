# Relationship between NodeJS and Express

## Working Directory
`/Documents/dev/experiments/react-stuff/udemy/009e-node-with-react`

```
$ mkdir server
$ cd server
$ npm init -y
// let's use yarn as it's faster
$ yarn add express
# show contents of package.json
$ cat package.json
```

## What is difference between Express and NodeJS?
* Node
    - JavaScript runtime used to execute code outside of the browser
    - Traditionally JavaScript was only executed inside a web browser
    - That's where JavaScript got its big start
    - It was used to add a little "pizzazz" - aka interactivity
    - Node let's us use JavaScript to execute code on my laptop, on my phone or any location you can think of
* Express
    - Library that runs in the NodeJS runtime
    - Has helpers to make dealing with HTTP traffic easier (aka servers)
    - We could totally do everything Express does by just writing it from scratch using plain JavaScript and some NodeJS code
    - We use Express to speed up our workflow and prevent us from reinventing the wheel so we can spend more time on building the core of our app
    - Express makes our lives a little bit easier

![crazy detailed diagram](https://i.imgur.com/K7eUlVk.png)

* You have a computer that has a server on it
* That server will be listening for HTTP traffic on a single `port`
    - What is a `port`?
        + Think of it as a little door where HTTP requests can be routed
        + We could have incoming HTTP requests coming in from my browser (Chrome) and that request is coming in through one specific `port` on my machine
        + We will configure Express to listen to one specific `port` on our machine
        + Node is listening on that port `let's say port 5000` and it waits for some traffic to flow through it
        + Node will take that info that is coming in and it will hand it off to Express
        + All could be done with Node and Node alone, it is what handles all the HTTP traffic
            * But we want to use express because it makes our lives easier
        + Express will look at the request and it will decide what chunk of code will "handle" or **respond** to the **request**
        + **Route Handlers**
            * We will route handlers to respond to incoming requests
            * We write in Express Route Handlers to handle requests
            * Route Handlers are used to handle HTTP requests that are asking for a very specific service
                - One route handler might authenticate a user
                - One route handler might be responsible for logging out a user
                - One route handler might allow the user to create and save a campaign
        + We will write the route handlers that will generate some outgoing **response**
        + That response will be sent back to the Node Process
        + And Node will respond to the incoming **request** with this **response** that we `author`
        + Eventually the `incoming` request, which we call `req` will get sent back the `response` which we call `res` to whoever made that incoming HTTP request

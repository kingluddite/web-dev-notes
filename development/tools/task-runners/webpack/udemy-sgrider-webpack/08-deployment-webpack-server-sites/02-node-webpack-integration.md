# Node and Webpack Integration
Integrating webpack with node will be different depending on if we our on our development machine or our application has been deployed to some outside service provider (_ie AWS, Heroku..._)

## Enviroment counts!
Our node server will behave differently depending on its environment

## Two Different Ways to Set up node
How it will behave differently on a development world or production world

### How node will behave on our local machine
#### In the Development World
![development diagram](https://i.imgur.com/jpiZVDM.png)

* We will set up node so that it automatically passes requests through to our webpack build process
    - Whenever a browser loads up and we try to access our node server and we try to say "**I just want to look at the Application, give me my `index.html` file and any dependent JavaScript files too**"
    - In development world we will make use of `webpack middleware` (so when incoming request comes in from our server and says "**hey give me that index.html**", express (_or node_) will say, "**oh, they want `index.html` I'll pass that straight through to the current webpack process**")
        + This is great because doing it this way prevents us from having to set up a separate webpack server (_so it will all be running internally to our node js server_)

#### In the Production World
![production world diagram](https://i.imgur.com/hYDBFtM.png)

* Things behave slightly differently
* Remember in a production world we don't want to run webpack at all because it is a HUGE resource hog
* Instead, we want to deploy our application one time
    - We want to build our Application
    - Save the generated assets inside `dist` directory
    - Whenever user navigates to our Application running in the browser, we tell our server to go ahead and serve up the statically build assets from this very particular directory (_dist_)
    - Getting the environment split is annoying
        + This means our node server will have some amount of logic in it that will change how it behaves depending on the development environment
        + It would be ideal if a server behaved identically in both production and development (this would enable us to catch errors earlier much more easily)

## Create stand alone web server and hook webpack into it
* We'll do the development environment first
* After that we'll implement the production environment

### Install `Express JS`
This is a server framework that sits on top of node
Express is very common in many node Applications

`$ yarn add express`

### Create `/server.js`
```
const express = require('express');

const app = express();

app.listen(3050, () => console.log('Listening'));
```

### Start server
`$ node server.js`

You will see `Listening` in the terminal

![listening](https://i.imgur.com/V2zKWlh.png)



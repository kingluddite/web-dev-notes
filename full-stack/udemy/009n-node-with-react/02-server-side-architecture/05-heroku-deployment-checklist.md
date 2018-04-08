# Heroku Deployment Checklist
## How to deploy our Application
* We will use Heroku, it's free

## Deployment Checklist
* `Dynamic Port Binding`
    - Heroku tells us which port our app will use, so we need to make sure we listen to the port they tell us to
    - We used port 5000 locally but when we deploy to Heroku it will tell us which port we need to listen to
    - Heroku hosts tons of sites on one machine so it wants the ability to dynamically tells us which port is open for us

`index.js`

```js
// more code
const PORT = process.env.PORT;
app.listen(PORT);
```

* Whenever Heroku runs our Application it has the ability to inject environment variables
    - `environment variables`
        + Are variables that are set in the underlying runtime that Node is running on top of and it is Heroku's ability to pass us runtime configuration that Heroku only has to tell us after we have deployed our Application
        + So this means we can't look up on Heroku what our port is going to be ahead of time
            * We have to wait until the very last second when are app is starting to be executed by Heroku to figure out what the PORT is
            * And that is what `process.env.PORT` does
                - It says, "Look at the underlying environment and see if they have declared a PORT for us to use"
            * But there is a trick because we are not just running our app in production, we are also running it inside a development environment (like we are doing with our app)
            * So that means that `process.env.PORT` is not defined
            * To address this issue we will add on a simple Boolean statement

```js
// more code

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* The above line says, 
    - "If there is a defined environment variable than use that
    - otherwise use port 5000"

* `Specify Node Environment`
    - We want to use a specific version of `Node`, so we need to tell **Heroku** which version we want
    - By default **Heroku** attempts to use an older version of `Node` and it will crash our app

`package.json`

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "engines": {
    "node": "8.1.4",
    "npm": "5.3.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.15.4"
  }
}
```

* Above we add "engines"
    - You need to use my numbers or higher for both node and npm
    - You find out your versions of each using
        + `$ node -v`
        + `$ npm -v`
    - Make sure you **use double quotes** (and not single quotes)
        + It won't work if you don't
    - Don't forget the necessary commas I use above
    - That's it
        + When Heroku boots up it will see our `package.json` and look at engines and then it will use the `node` and `npm` versions I specify
        + And whenever we deploy our Application, Heroku will use those versions

## `Specify start script` ----- This is mandatory!
* Instruct `Heroku` what command to run to start our server running
* Here is where we tell `Heroku` exactly **how to start up our server**

`package.json`

```json
// more code
"engines": {
  "node": "8.1.4",
  "npm": "5.3.0"
},
"scripts": {
  "start": "node index.js"
},
// more code
```

## Heroku runs the start script
* That is how we started our server when we were testing it `$ node index.js`
    - And `Heroku` has to start it the same way
* Whenever `Heroku` runs our Application it will attempt to run the start script in `package.json`

## Time to ignore some stuff
* `Create .gitignore file`
    - We don't want to include dependencies, `Heroku` will do that for us
    - We have a `node_modules` folder with all our 3rd party **dependencies** and **devDependencies**
    - We do not deploy `node_modules` to Heroku

## We let Heroku install all of our dependencies itself

`$ touch .gitignore`

* Inside the file add `node_modules` and save

`.gitignore`

```
node_modules
```

![first and subsequent deploys](https://i.imgur.com/O6EeZDy.png)

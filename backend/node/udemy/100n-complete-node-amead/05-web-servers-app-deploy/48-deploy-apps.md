# Deploy Apps
## Heroku.com
* Sign up - free

## Install Heroku Command Line tools
* Will enable us to:
    - create apps
    - deploy apps
    - all from the terminal
    - without having to come into the web app
    - this will save time
    - And make development a lot easier
* [link to install](https://devcenter.heroku.com/articles/heroku-cli#macos)

`$ brew install heroku/brew/heroku`

* May have to restart terminal if you don't see it working

## Test if you installed Heroku properly
`$ heroku --help`

## Login to heroku locally
* You will see `login` as one of the commands in the help list

`$ heroku login`

* Use your heroku email and password to successfully log in

## Put our SSH key on heroku
* We will do this 100% via the command line so it will be easier and faster

`$ heroku keys:add`

* This command will scan our local ssh directory `~/.ssh` and add the key up to heroku
* Now we just added our key (much easier than github!)

### Print all your keys on heroku
`$ heroku keys`

### Remove all keys (if you want to get rid of them all)
`$ heroku keys:remove`

### Test our connection to heroku
`$ ssh -v git@heroku.com`

* Your get authenticity can't be established do you want to continue do you want to continue? type `yes`
* You'll get a bunch of mumbo jumpo output but all you care about seeing is `debug1: Authentication succeeded (publickey).`
* If it doesn't work you'll see `permission denied` with the public key in parentheses

## Make two changes
* Heroku does lots of stuff automatically
* We need to make 2 changes to our code

### Change the environment variable
* Our port is statically code inside of `server.js`

```js
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
```

* We need to make the port dynamic
* So we'll need to use a variable
* We will use an environment variable that heroku will set
* Heroku will tell your app which `port` to use because that port will change as you deploy your app, this is internal to heroku and we have no choice as to which port we can use (like we can change it on our own machine)
* If we had to swap out our port every time we deploy would be a time suck if not impossible
* we set an environment variable, heroku populates the value of that environment variable with their internal server port number and it will use it for our app

### Environment variables
* All machines have environment variables
* View your environment variables

`$ env`

* This will generate a long list of key value pairs
* process.env
    - process.env is an object that stores all of our environment variables as key value pairs
    - We are looking for one that heroku will set called `port`

`server.js`

```js
const hbs = require('hbs');
const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT;
// more code
```

* This will work great for heroku
* But locally we are in trouble because the environment variable will not exist
* So then we'll set a default value for port if the environment variable does not exist

```js
const hbs = require('hbs');
const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// more code
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT} yo!`);
});
```

`$ node server.js`

* App will work as expected locally

## Specify script inside `package.json`
* By default we have a scripts object set by default by npm
* We can add as many scripts as we like inside of here as we wish
* A **script** is nothing more than a command we run from the terminal
* We'll add `"start": "node server.js"`
    - This is ESSENTIAL
    - Because when heroku tries to start our app it doesn't know what our file name is called
    - Instead it will run the start script and the start script will be responsible for doing the right thing and in this case it will boot up the server.js file
    - We can run this script from the terminal using `$ npm start`
    - Works just like it did before but now we're ready for heroku

## Test
* You could also run the `test` script with `$ npm test`
* We'll use this later

## Git
`$ git add .`
`$ git push` (can leave off `$ git push origin master`) because it is the default
`$ git commit -m 'add start script and heroku port`

## Create app on heroku
`$ heroku create`

* Will create a remote app on heroku web app
* Will add a new remote to your local git repo
    - `origin` remote points to our github repo
    - `heroku` remote points to our heroku git repo
    - When you push to heroku, they will see the changes and then deploy them to the web
    - We still have to push to heroku to initiate the deploy process
    - `$ git push heroku master`
        + You will see normal process
        + Then you will see logs
        + Logs letting you know how your app is deploying
        + You should see URL if successful
        + visit that URl or `$ heroku open`

## Challenge
* remove maintenance page by commenting out the code
* git add, commit and push to heroku
* Make sure it works

### One More challenge
* Add new `projects` page to website
* This page will link to github projects
* create a new route pointing to a new handlebars template
    - `/projects`
* create template inside views `project.hbs`
    - duplicate other page an just change main content to be `Portfolio page here`
    - Add project link to header partial
* test locally make sure you see projects page and the links work
* git
    - add, commit and push to github
    - also push to heroku remote which will deploy it live to the web
* test remote URL to make sure projects page and links work as expected

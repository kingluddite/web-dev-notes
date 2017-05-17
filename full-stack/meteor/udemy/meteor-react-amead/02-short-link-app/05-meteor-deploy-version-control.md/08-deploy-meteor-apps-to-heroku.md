# Deploying Meteor Apps to Heroku
* Heroku doesn't support Meteor by default
* No worries because it does support Node
    - We will use a Heroku build pack
        + It is like a deployment recipe that will teach Heroku how to install our Meteor apps on their servers

### Install Meteor [build pack for Heroku](https://github.com/AdmitHub/meteor-buildpack-horse)

### Create heroku app
`$ heroku create` (will generate a set of random letters and numbers) so it is better to give it a custom name and it needs to be unique

Example:

`$ heroku create short-link-peh2`

* It will give you the URL for your app
* It will give you a remote git URL to push your code up to
* You can get your own domain on their free plan using their DNS servers

### Check out remotes
`$ git remote -v`

### Test your remote Heroku URL
[https://short-link-peh2.herokuapp.com/](https://short-link-peh2.herokuapp.com/)

### Use our build app
We don't have to do this everytime, <u>just the first time we deploy our app</u>

`heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git`

That command didn't do anything it just sets up for the next time it gets deployed

### Which node version?
We need to find out which version of node our Meteor app is using

`$ meteor node -v`

Take note of it: My node version is `v4.8.1`

### package.json
Heroku will take our package.json and install everything

### Add engines to `package.json`
```
{
  "name": "short-link",
  "private": true,
  "scripts": {
    "start": "meteor run"
  },
  "dependencies": {
    "babel-runtime": "^6.20.0",
    "clipboard": "^1.6.1",
    "meteor-node-stubs": "~0.2.4",
    "moment": "^2.18.1",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "react-flip-move": "^2.9.2",
    "react-modal": "^1.7.7",
    "react-router": "^3.0.5",
    "shortid": "^2.2.8",
    "simpl-schema": "^0.2.3"
  },
  "devDependencies": {
    "eslint": "^3.19.0"
  },
  "engines": {
    "node": "4.6.2"
  }
}
```

### Save and Commit
`$ git add .`

`$ git commit -m 'Add node version to engines'`

### Set up MongoDB database (a real one)
We will use a Heroku addon

Open up the app you just created (remember the name!) and then click `Configure Add-ons` then click `Find more add-ons`

We'll addon mLab MongoDB and use the free plan

`$ heroku addons:create mongolab:sandbox`

* That will create a new database and link it to your app
* It will create a new environment variable for you `MONGODB_URI`

### Why use Environment variables
It is a way to configure that value without having that value in your code. This makes it easy to change and makes it way more secure

### How can I see all my environment variables?
`$ heroku config`

Make sure you see the MONGODB_URI - the build pack we installed knows how to use this value

## ROOT_URL
* Set custom environment variable
* Meteor requires this when you are deploying that you set a custom environment variable
* It needs to be your URL (the one showing our app on heroku's servers)
* It helps generate any absolute value URLs

`$ heroku config:set ROOT_URL="https://short-link-peh2.herokuapp.com"`

**note** Make sure you remove the last trailing slash!

## Test to make sure ROOT_URL is set
`$ heroku config`

## Push our code up to Heroku
`$ git push heroku master`

Wait about 5 minutes and test that URL and you should see your app

The Database will be empty so set up a new user

## Exercise
Deploy Scorekeep

![Exercise Deploy Checklist](https://i.imgur.com/U1vIOkd.png)

**tip** open your default app `$ heroku open`

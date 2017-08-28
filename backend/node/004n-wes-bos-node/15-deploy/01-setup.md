# Deployment Setup
## Create a Git repo
`$ git init`

## Add a gitignore
`.gitignore`

```
node_modules/
.DS_Store
*.log
.idea
/haters
variables.env
variables.env.now
```

* `.idea` (webstorm)
* `/haters` - don't have them :)
* never put `variables.env` in Git

## Add to Staging
`$ git add -A`

## Commit
`$ git commit -m 'intialize repo'`

## Environments
We will have development and production

### Database
* Can use existing Database
* You will want a test Database and a Production Database
    - Recommended to create a second Database
    - You can create your own Database on your local server
    - CAUTION - if you create your own local `MongoDB` Database you must set a username and password
        + By default `MongoDB` does not come with a username and password 
            * And you will get hacked!

### Mail Info
Lots of services that provide Transactional Email where they just send one email at a time and you need a service to do this

* Postmark (10,000 free emails) after that it is pennies

#### Other Mail
* Sendgrid
* Mailgun

## Port
When you deploy you want to change Port to `80`

## Have your own Google Map Key

## SECRET and KEY
Keep as is

**note** You need to have all your `variables.env` ready before you start to deploy

## Changes to `package.json`
* In production we don't need to:
    - `watch`, because we are not developing it
    - `npm run assets` - we won't be recompiling on our prod server

We should rename `start` to `dev`

So change:

`package.json`

```
// more code

"scripts": {
    "prod": "node ./start.js",
    "watch": "nodemon ./start.js --ignore public/",
    "start": "concurrently \"npm run watch\" \"npm run assets\" --names \"💻,📦\" --prefix name",

// more code
```

To This:

```
// more code

"scripts": {
    "prod": "node ./start.js",
    "watch": "nodemon ./start.js --ignore public/",
    "dev": "concurrently \"npm run watch\" \"npm run assets\" --names \"💻,📦\" --prefix name",

// more code
```

* Now to run our dev server we use `$ npm run dev`

### Rename prod to start

`package.json`

And change this:

```
// more code
"scripts": {
    "prod": "node ./start.js",
// more code
```

To this:

```
// more code
"scripts": {
    "start": "node ./start.js",
// more code
```

We do this is because this is how you would start your Application normally without a dev server and webpack

So on our production server it will start with `$ npm start` which will run `$ node ./start.js`

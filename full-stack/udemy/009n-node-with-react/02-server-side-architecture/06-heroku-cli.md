# Installing the Heroku CLI

## Deploy to heroku
* Make sure all code is merged to `main` branch

```
$ git push origin feature/comments
$ git checkout develop
$ git merge feature/comments
$ git checkout main
$ git merge develop
$ git push origin main
```

`$ gh issue close 5`

`$ gh repo view --web`

## Do you ALWAYS have to push to Heroku from the `main` branch?
* No
* Feature branches can be deployed using:

`$ git push heroku <feature-branch>:main`

* This is very helpful if you are using the Heroku URL for testing
    - **note** But you wouldn't want to do this if the app is already in production 

## Deploy Node App with mysql Database to heroku
`$ heroku create just-tech-knews` (can't be a name already used)

`$ git push heroku main`

## Heroku port
* You've already taken one step in making your app Heroku-compatible with the following line in `server.js`:

`server.js`

```
// MORE CODE

const PORT = process.env.PORT || 3001;

// MORE CODE
```

* This uses Heroku's `process.env.PORT` value when deployed and `3001` when run locally
* **tip** Having a dynamic port number is important, because it is very unlikely that the port number you hardcode (e.g., `3001`) would be the port Heroku runs your app on

## Make sure our Database is not hardcoded
`config/connection.js`

* This wouldn't work
    - As of now, this will only work with your local database

```
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});
```

### Could you continue using your local database even on Heroku? 
* Well, yes, but then you'd have to make your ports public (probably not a good idea)
* And always leave your computer on

## Better idea
* Instead, we should make a new remote database on Heroku and tell the app to connect to that one when deployed but still use the local database when run locally
* Fortunately, Heroku comes with a variety of add-ons that make setting up a remote database relatively easy
* The one we'll use for MySQL is called `JawsDB`
    - **important** Credit Card Required
        + When using Heroku add-ons, Heroku will require you to put a credit card on file
        + Heroku will not charge you, though, unless you specifically upgrade to one of their paid services

### Our checklist we need
* Remote Database
* Tell our apps to connect to that Database when deployed
* But we still want to use our local Database when running locally

### How can we achieve all this?
* We'll install an add-on on Heroku called `JawsDB`

### What's my app name again on Heroku?
`$ git remove -v` will show you your name

* It will look something like:

```
heroku  https://git.heroku.com/sacred-cow-72631.git (fetch)
heroku  https://git.heroku.com/sacred-cow-72631.git (push)
origin  git@github.com:myGitHub/just-tech-news.git (fetch)
origin  git@github.com:myGitHub/just-tech-news.git (push)
```

* Get to the Heroku Dashboard
* Find your app
* Click Resources tab
* Search under `Add-on` for `JawsDB MySQL` and click on it when it appears

* Heroku will confirm that you want to add JawsDB to your app
* Click the `Provision` button, and you're done!
* You now have access to a remote MySQL database hosted by Heroku

### Settings
* If you click the settings tab you'll see under Config Vars that behind the scenes Heroku added `JAWSDB_URL` and it's string connection value automatically
* We'll now update our code to take this Heroku remote environment variable into consideration

## Update our code connection
* Return to your codebase and open the connection.js file again. Update the connection logic to look like the following code:

`config/connection.js`

```
// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// load environment variables
require('dotenv').config();

let sequelize;
// create conn to our Database, pass in your MySQL info for username and password
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    },
  });
}

module.exports = sequelize;
```

* After we deploy our app
    - It will have access to Heroku's `process.env.JAWSDB_URL` variable and use that value to connect [aka production environment]
    - Otherwise, it will continue using the localhost configuration (our local machine configuration) [aka dev environment]

## Push our changes to Heroku
```
$ git add -A
$ git commit -m "connect to jawsdb"
$ git push heroku main
```

## Test remote stuff
* **note** The app still doesn't have a front end, so there won't be much to see in the browser
* You can still test the API endpoints with Insomnia Core, though
* Simply replace http://localhost:3001 with the name of your Heroku app
* Example: `https://just-tech-knews.herokuapp.com/api/posts`

## Why is our data empty?
* Of course, all of your GET requests will return empty data sets, because you're connected to a brand new database
* You'll need to make a few POST requests first to fill up the JawsDB database

## TODO
* How can I remotely seed Heroku Database?

## Do you ALWAYS have to push to Heroku from the `main` branch?
* No
* Feature branches can be deployed using:

`$ git push heroku <feature-branch>:main`

* This is very helpful if you are using the Heroku URL for testing
    - **note** But you wouldn't want to do this if the app is already in production 

## How to add seeder data
1. Log in `$ heroku login`
2. `$ heroku run bash`
3. `$ node seeders/seeds` (or path to seeds)

## Steps you repeat for any Node JS project you want to deploy on Heroku
![steps for heroku deploy](https://i.imgur.com/Se3L9Vj.png)

## List of Steps for first time deployments
![steps for deploy](https://i.imgur.com/cnxb4gi.png)

1. Create Heroku Account - Easy and free
2. Create code base to git
    * Heroku uses a git based deployment
    * Create our code base to git
        - Sounds easy
        - But can be very confusing

## Move index.js and package.json to the root of your project
* This is mandatory or your won't be able to push your site to heroku

### Git stuff
* Make sure you have Git installed on your machine `$ git --version`
* If not, install it from [download git](https://git-scm.com/downloads)
* Or install `homebrew` and install Git with homebrew - [watch video](https://www.youtube.com/watch?v=WUviVWnvBM8)
* `$ git init`
    - That will initialize an empty Git repo
    - Add code to staging `$ git add .`
    - If you created and setup `.gitignore` correctly, you should not see `node_modules`
        + If you do see `node_modules` - Time for you to troubleshoot
    - Commit code `$ git commit -m 'initialize repo'`

3. Install Heroku CLI - [Read the instructions](https://devcenter.heroku.com/articles/heroku-cli)
    * The purpose of this CLI is to generate a new Heroku project
    * I recommend installing it with homebrew `$ brew install heroku`
    * After installing check install was successful with `$ heroku -v`
        - If you see a version you are ready to proceed to next step
        - If not ----------> Time to troubleshoot!

4. Create a new Heroku App
    * Log into your Heroku account via the terminal with: `$ heroku login`
    * Enter your heroku `email` and `password`
    * Create heroku app with `$ heroku create`

### You will see two links
1. First link is URL to our **live site**
2. Second link is URL to **heroku Git repo**
    * The second link is one we really care about
        - It is our deployment target
        - It is a Git repository that we can push our local server to
                * We already committed our entire code base to Git
                * We are now going to push that local repo to the remote repo that is managed by Heroku
                    - The minute we do this, Heroku will then deploy our entire application and start it up automatically

![heroku create](https://i.imgur.com/Run0zeo.png)

5. Deploy App with Git
    * We first need to set up a remote Git repo
        - We do this by copying the second link (remote Heroku Git repo)
        - Then typing `$ git remote add heroku https://git.heroku.com/mysterious-sierra-29112.git`
            + **note** This will be set up automatically when you use the Heroku CLI
        - (Make sure to use your own remote Heroku link)
        - You may not see any feedback if it was successful
        - If you did this already you will see 'fatal: remote heroku already exists' which you can safely ignore
    * We deploy to heroku with `$ git push heroku master`
        - You will see feedback of deployment from Heroku in Terminal
        - It will build our application
        - It will [automatically detect we are using Node.js](https://i.imgur.com/fHminXS.png)
        - It will set some [runtime flags](https://i.imgur.com/j4Lnapj.png)
        - It will [detect our engines of node and npm](https://i.imgur.com/8eWXizu.png) that we specified in `package.json`
            + I accidentally put the wrong node version (I put `8.4.1` instead of `8.1.4`) and I got an error and it could not deploy
            + I changed the number to `8.1.4` and tried it again but it still errored on deployment and it still said the old number of `8.4.1` - This is an **important** point to remember, when you make changes, you need to add and commit them to your local Git repo before pushing to Heroku's remote repo, or Heroku won't see your changes!
        - It will [install all our dependencies](https://i.imgur.com/8mxT1Gp.png) inside `package.json`
        - At the end you should see `Build succeeded!`
            + If not, time to troubleshoot
        - At end you will see [verifying deploy... done](https://i.imgur.com/UMOeKHU.png) and shows you where it was deployed to (your remote Heroku Git repo)
    * Open our new application
        - `$ heroku open`
        - You should see it opens the browser and navigates to our deployed Project!
        - Just says **'hi there'** inside JSON object on our live heroku domain

## Heroku Troubleshooting
* `$ heroku logs`
    - Heroku will now give you some output generated by the output process
    - Look for an error to find out what went wrong during the deployment

## List of Steps for Subsequent deployments
![subsequent deploy steps](https://i.imgur.com/yBPMTUQ.png)

1. Make a change to the code base
2. Make sure all files inside your editor are saved
    * `File` > `Save All` (Sublime Text 3) --> `opt` + `cmd` + `s`
3. Check Git status `$ git status`
    * You will see all the files you changed/added/deleted
4. Add files `$ git add -A`
5. Commit `$ git commit -m 'useful commit message here`
6. `$ git push heroku master`
    * It will give you the same feedback as before
    * If you have errors troubleshoot with `$ heroku logs`
    * If all works, congrats
    * Rinse and repeat for the life of your app
    * When you type `$ heroku open` you should see your new changes have been implemented

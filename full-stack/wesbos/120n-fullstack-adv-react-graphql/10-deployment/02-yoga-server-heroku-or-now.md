# Deploying Yoga Server to Heroku or Now
* You need to install the Heroku CLI
    - `$ brew install heroku/brew/heroku`

## Do I have heroku's CLI?
`$ heroku --help`

* If you see all the commands you can use you have it installed
* You may want to update it

`$ brew upgrade heroku`

* Sign up for Heroku if you don't have an account
    - You get 5 free apps before you have to pay

## Login to Heroku
`$ heroku login`

* A browser window will open. You can close it
* When you view the terminal again you will see you are now logged into Heroku

### Single repo with two apps
* We have one github repo that has two apps inside it
    - `frontend`
    - `backend`
* **note** It is pretty common to run separate repos for your `backend` and your `frontend`
* Heroku needs you to have a git repo for each (frontend and backend)

### Set one up on github
* Make sure you are in the **root** of your app

`$ git init`

* Add and commit all your changes

### Create a remote repo on github
* Hub is an app you can install with homebrew
* But you need to configure it
* Google `hub` github mac app to install it on your mac

`$ hub create`

* Push all changes to github

`$ git push origin master`

**note** We don't need to use github, we only need to be using git (_to work with heroku_)

### Now we need to create a heroku app
* You are creating an app from the terminal on heroku and this is why you logged in to Heroku from the terminal and you previously installed the heroku CLI to give you the commands to do this

`$ heroku apps:create acme-yoga-prod`

* This is what you will see:

![yogo prod URL and heroku git repo](https://i.imgur.com/1GrBdKl.png)

* The left is your yoga server URL
  - `https://acme-yoga-prod.herokuapp.com/`
* The right is your Heroku remote git repo (just for the yogo server)
  - `https://git.heroku.com/acme-yoga-prod.git`

## Open heroku
* You will see your new app

![logged into Heroku](https://i.imgur.com/P1dXgdw.png)

* Click on your yoga app
* Click on your Settings tab

![heroku yoga settings tab](https://i.imgur.com/WoHZOWn.png)

* Scroll down to domain and you will see your yogo domain:

![yoga domain](https://i.imgur.com/1UaH4yE.png)

## Back in your local terminal
* Let's see what repos we are connected to:

`$ git remote -v`

* Will show you that we have that URL listed at `heroku`

![heroku repo](https://i.imgur.com/8v5n5Ff.png)

```
heroku  https://git.heroku.com/acme-yoga-prod.git (fetch)
heroku  https://git.heroku.com/acme-yoga-prod.git (push)
```

* And if you set up `github` you would see that listed also as `origin` (fetch and push)

## We won't be using the heroku remote
* Because we just need to deploy `subfolders`
* Why?
    - Because if I were to deploy this git repo to heroku, heroku wouldn't know how to deploy this application because the yoga apps in the `backend` folder and the `frontend` has a next.js node application inside it
    - So to fix this we will add some more remotes that are for **heroku frontend** and **heroku backend**

### Let's add some more remotes

`$ git remote add heroku-backend https://git.heroku.com/acme-yoga-prod.git`

## git subtree
### Now how do we push up a subfolder to a remote git repo?
* We can do this using `git subtree`
    - And this will only push the contents of the `backend` folder to heroku

`$ git subtree push --prefix backend heroku-backend master`

* **That will push our backend to heroku**
* It will detect that it is a `Node.js` application

## scripts in package.json
* We were running `$ npm run dev`
* But in production by default it will run `$ npm start`
    - That will run the `nodemon` command
        + That will watch our `js` and `graphql` files
    - And it will run the node command `node src/index.js`
* If you have any errors you need to check the heroku remote log but it can be really long so `--tail` just

`$ heroku logs --tail --app peh2-yoga-prod` - only shows you log for this remote heroku

## You need to add your environment variables to Heroku
**IMPORTANT!!!!!!!!! - Save hours of life and make sure you are entering these server variables in the Yoga server on Heroku**
* Log in > dashboard > your yoga site > settings > Reveal Config Vars
* Open your `.env` file and put in your remote information into Heroku
* Add all of them
    - We'll use `localhost:7777` for now for FRONTEND_URL
    - And add the new PRISMA_ENDPOINT too

![heroku settings](https://i.imgur.com/QVFt89O.png)

* Put your real live stripe token
* Put your real SMTP host (Postmark, mailjet, mandral)

## Make a change to your site (need to push to heroku)
* Add and commit
* git push the **backend subtree** again

`$ git subtree push --prefix backend heroku-backend master`

* That will do a whole restart of the **dyno** which is the machine we are running on

## View URL
* You will see playground appear (_could take a moment for the app to start itself_)
* It will show all our schemas

## Tip - Pushing no changes to Heroku remote git repo
* When you push to heroku it is based on your git so you need to add then commit and then push to heroku
* If you have no changes it won't push
* So make a simple comment change to the code, add and commit that to get to push to heroku

## View your yoga server
* View the URL and you will see the GraphQL Playground
* Open the schema and all "public facing" schema is there

![yoga server public schema](https://i.imgur.com/PUABB4a.png)

## Test it out in playground
* We don't have any data so we can't query for any data
* But we can query for users with:

```
query {
  users {
    id
  }
}
```

* And the output will be an error

```
{
  "data": null,
  "errors": [
    {
      "message": "You must be logged in to do that",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "users"
      ]
    }
  ]
}
```

* So we know our schema is working even though our `db` is not populated



## Resources

### Zeit Now
* If you want to try Zeit's Now follow the next instructions (optional)

### Install Yoga on `Now`
* Create an account [zeit/now](https://zeit.co/now)
* Login
* Install the now CLI globally

`$ npm i now -g`

or

`$ brew cask install now`

`$ now help`

`$ now login`

* With now go to the folder that you want (last time we did it from the root of our app)
    - Now we `$ cd backend`
    - Then just deploy with `$ now`
* Go through dashboard and you will see the Playground
* You can click to watch it go through the deployment
    - This is currently using our `.env` file
        + You can overwrite that using [env variables and secrets](https://zeit.co/docs/v1/features/env-and-secrets)
        + **note** If you installed zeit/now awhile ago [upgrade to v2](https://zeit.co/docs/v2/platform/upgrade-to-2-0)

### Troubleshooting tips
### Nodemon error
* If you get a `nodemon` error
* You need to be in `backend` folder
  -Add `nodemon` as a dependency

`$ npm nodemon`

* Add and commit again

`git subtree push --prefix backend heroku-backend master`

* I was trying to add `nodemon` to `package.json` several times and it would not add it to `package.json`. I manually copied the line from `devDependencies` and added it to `dependencies`, then ran `$ npm i` and then added, commited and pushed **backend subtree** again
* This worked then I got the can't find `dotenv` and so for some reason it wasn't adding it to the `package.json` so I had to manually add it as well
* Not sure why this happened but it took an hour to figure out - lesson learned is if you see module not found, check `package.json` and see if package is listed as a dependency (_we are dealing with production and want all packages in dependency that we need_)

## Get rid of multiple remotes error
`git remote remove heroku` - This gets rid of duplicate heroku error

## Clean up
* I deleted `node_modules` and `package-lock.json` from backend
* I ran audit cleanup `$ npm audit fix`
* I re-reran `$ npm i` from `backend`
* Add and commit

## Run subtree one more time
`$ git subtree push --prefix backend heroku-backend master`

### Errors? - You'll have to do some troubleshooting
* You can view errors on the heroku website dashboard
`$ heroku logs` - good way to find why errors are happening
* If your node version is off you will get an error

`$ node -v`

* My version is `v11.6.0`

#### Add engine to `package.json`
* Heroku needs to know what version of `Node.js` to download for any app that is deployed on our platform

`backend/package.json`

```
// MORE CODE

  "engines": {
    "node": "11.6.0"
  },
  "scripts": {

// MORE CODE
```

* Make sure your node version matches exactly or you may well be troubleshooting for hours
* Add and commit your changes and push the **backend subtree** again

`$ git subtree push --prefix backend heroku-backend master`

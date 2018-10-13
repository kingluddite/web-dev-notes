# Deploy to Heroku
* Now it's time to take you app and make it public
* This means we need to deploy

## Environments
* So as it stands now, all this time you have been working in the development environment
* But now you will soon have a production environment

## The big picture
* Let's pretend that this cologne app is going to be big or at least you want to share it with the world but maybe you think the task is too big for one person so you go to a few meetups and build a team of developers to help build this cologne app
* You will be the head honcho, jefe, boss so you'll create a master repo and that will be referred to as `upstream`
* You tell all your homeboy developers to fork this repo which will take your repo and make a copy of it on all their individual github repos and they will all be known as **origin**
* Now the fun begins

## Local
* So all the developers clone their **origin** repos (which are all forked copies of your repo (known as **upstream**))
* They also add your original repo as **upstream**
* You delegate to all the team members **feature requests** you want them to build
* They start creating branches with the **feature requests** you want them to build
  - When finished they add, commit and push their branch to their **origin** and then they make a PR to your **upstream** repo
  - You review the code and if good merge it into the master branch on your **upstream** repo, and you delete the remote branch
  - You inform all members that there is new stuff in the **upstream** branch so all members switch to their local **master** branches and `$ git pull upstream master` to get the latest changes
  - They then push their new master changes to their **origin** repos so that your upstream their local and **origin** are all in sync
  - The developer who created the PR will also delete their local feature request branch just to keep things clean
  - All of the other developers do the same thing, rinse and repeat to start developing your app
  - To make things even more confusing you are **upstream** but you are only **upstream** to everyone else
    + You merged the feature request into master but you also have your own local computer that has not been updated, in order to get those changes on your computer you use `$ git pull origin master` and that will sync your local computer with your github repo (which is origin for you but upstream for all your other team members)

## Production
* We are learning about Heroku here which is just one of numerous choices for deployment
* We are using it because it is free
* The way Heroku works is you create an account, download their global CLI and create an app
* This will create a remote git repository on their servers and this production repo will be known as **heroku**
* You push your code to heroku and what that does is push your code to their remote git repo and when the code is pushed to their servers, they have a hook on that push that will run a production build of your code that will install all your dependencies (inside your `package.json`) but it does not install any devDependencies (inside your `package.json`) because those packages were only for you as a developer and your app does not need them
* Heroku will give you a URL where your server will run and when you are ready for production you will change your code to fit the production URL (so you will no longer be using `http://localhost`)
* You also will now longer be using Port 4444 as heroku will dynamically decide what port number you will run on
* **environment** variables - Now we run into a dilemma because we are pushing our git repo to Heroko's git repo but we do not include `variables.env` because they are hidden in our `.gitignore` so how can we handle this?
  - Easy, Heroku has a spot on their settings when you log into Heroku where you can manually create your environment variables and values so this makes sure your super important environment variables will work and will remain safe

## Each host of MERN sites (for your production code) handles things slighly different
* So just read their documentation to figure out how you need to set things up

## Now - on with the Show!

### Create Heroku account and Login
* Create an account here: https://www.heroku.com/
* Login to that account
* Create a new app
* Give it a name

## Install the heroku CLI
* [instructions](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

`$ brew install heroku/brew/heroku`

* You may need to upgrade (if you have an older version of heroku)

`$ brew upgrade heroku`

### Troubleshooting tip
* If you are getting `Error: ENOENT: no such file or directory, open '~/.netrc'` error, delete the folder `$ rm -rf ~/.netrc` and create it again with `$ mkdir ~/.netrc`

## Login
`$ heroku login`

* Enter your heroku email and password
* Make sure you are in your app root folder

## git
* Time to start version control on your app and get `git` involved
* `$ brew install git`

`$ git init`

## Create your first Heroku app
* **note** This is for an existing app
* You could also create an app from scratch but the directions vary
* [Interested in creating app from scratch with herloku, Read more here](https://devcenter.heroku.com/articles/git)

`$ heroku create`

* That will give you something like this in the terminal:

![heroku create](https://i.imgur.com/DN7eZR7.png)

* Notice a git repo was created on heroku
* Notice they also give you a public URL which will be the URL for you site
  - You can also buy a domain and use that instead
  - You can also edit the domain they automatically give you just so that it sounds like something more like your app url

## Improve your heroku name
* In Heroku Dashboard > Settings > Edit the name
* Then you need to [update up your heroku git remote repo](https://devcenter.heroku.com/articles/renaming-apps#updating-git-remotes)
* Rename it `fivestarcologne` (you can name it whatever you want as long as someone else doesn't have the same name, since I already used `fivestarcologne` you can's use - first come first server :)  )

## We have a slight problem
* Type this to see the issue:

`$ git remote -v`

* You'll see something like:

```
heroku  https://git.heroku.com/lit-cove-25300.git (fetch)
heroku  https://git.heroku.com/lit-cove-25300.git (push)
origin  git@github.com:raggaman/118e-five-star-cologne.git (fetch)
origin  git@github.com:raggaman/118e-five-star-cologne.git (push)
```

* So even though you changed the name the original git repo heroku created for you has the same old name... let's fix that
* We'll remove our remote heroku git repo URL

`$ git remote rm heroku`

`$ heroku git:remote -a fivestarcologne`

* Replace `fivestarcologne` with the new name of the app, as specified in the rename command
* You then can see your new domain with:

`$ heroku domains`

* Which should output `fivestarcologne.herokuapp.com`
* So my new URL is `https://fivestarcologne.herokuapp.com/`
* Visit that URL and you'll see only a placeholder
* Let's change that now and show the world our app!

## Add and commit files to heroku
`$ git add -A`

`$ git commit -m 'initialize repo`

## Create conditional to do stuff differently if we are in production environment
* That checks if we are running in a production environment
    - We'll do 2 things:
        1. Use middleware to access to static files `client/build`
        2. Import node's `path` (and require it) and point to where our `index.html` file resides (inside the `build` folder)
            - path is necessary for sending down the file

`server.js`

* In our `client` folder (where our react app resides)
    - We have a `package.json` that has build scripts baked inside of it:

```
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // add this

// MORE CODE

// initialize app
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// MORE CODE
```

## The create react app build script

```
// MORE CODE

"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject"
  },

// MORE CODE
```

* Specifically `"build": "react-scripts build",`

## What happens when the `build script` is run?
* It will create a `build` folder inside our `client` folder
    - That `build` folder will contain our final `index.html` and that is what we want to return no matter what route we go to
    - So whatever route we go to we are only going to return one file
        + This is the basic concept on how SPA (Single Page Applications) work
    - We are sending down just the `index.html` file within the build folder
    - And we can access that using the `express.static` middleware
        + Which we pass the string `client` and `build` in order to access that
* We use node's `path` and `__dirname` to specify exactly where to get it from whether on a Mac OS, Windows OS or Linux OS

## Add a couple things to our root `package.json` file
### node engine
* We need to tell `heroku` about our **node engine**
* To do this you'll need to determine your node version

`$ node --version`

* That will output a version like... `v10.11.0`

`/package.json`

```
// MORE CODE

"engines": {
    "node": "v10.11.0"
},
"scripts": {

// MORE CODE
```

## We need to run some scripts
* A `start` script
    - `heroku` will run this for us `$ node server.js` (_they are not using nodemon_)
* Add a specific post build heroku script `$ npm install --prefix client` (that will install all the **client dependencies**) and we will also run the build script `$ npm run build` (that is in the `client` folder) and that will run after that `start` script

`/package.json`

```
// MORE CODE

"scripts": {
  "start": "node server.js",
  "precommit": "pretty-quick --staged",
  "server": "nodemon server.js",
  "client": "cd client && npm start",
  "dev": "concurrently --names \"server,client\" \"npm run server --silent\" \"npm run client --silent\"",
  "heroku-postbuild": "npm install --prefix client && npm run build --prefix client"
},

// MORE CODE
```

## Change URI to be what our Heroku URI is
* When you ran heroku create it shows you what your Heroku URI is
* It will be something like: `https://fivestarcologne.herokuapp.com/`
* Use that info to update your Apollo Client URI

`client/src/index.js`

* Change this:

```
// MORE CODE

// Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

* To this (swap my heroku URI with you heroku URI)

```
// MORE CODE

// Apollo client
const client = new ApolloClient({
  // uri: 'http://localhost:4444/graphql',
  uri: 'https://fivestarcologne.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

* I comment out dev graphql URL so I can easily switch back and forth between my development and production environments

## Environment Info
* Find all environment info

`$ env`

## Add Environment variables to Heroku (Show/Hide Config vars to see/hide)
* NODE_ENV
* PORT
* MONGO_URI
* SECRET
  - We add these so heroku knows about them (otherwise they'll be private and our app will break on heroku because we are not committing them with git (`*.env` is inside our `.gitignore`)
  - Heroku will know the PORT and NODE_ENV automatically so we don't have to put them

### Tip
* You could have a MONGO_URI for development and a different one for production

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add CSS`

## Push to github
`$ git push origin deployment`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add add-react feature`

![commit](https://i.imgur.com/a8cXTgy.png)

* That will take you to a page of all changes in that commit
    - Green is code added
    - Red is code removed
    - All other code has not been modified
* Review all your changes
* If all looks good hit the `back` button in the browser
* Create a PR
* And click `Merge pull request` button
* Click `Confirm merge` button
* Then click Delete branch (You will see the color purple and that `Pull request successfully merged and closed`)

![PR successful](https://i.imgur.com/ota3hx1.png)

* Click `Delete branch` button to delete the remote branch
    - You don't need it anymore
    - Get in the habit of `pruning` your branches so they don't grow uncontrollably

## Time to sync up
* Right now your master branch on your remote GitHub is different than your master branch locally
* Locally your master branch doesn't have the new feature `deployment` added
* To prove this checkout of your `deployment` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `deployment` are gone!
* View your app in the browser and it also shows now sign of your `deployment` feature!
* If you stop your server `ctrl` + `c`

## Check the status
`$ git status`

* You will see this:

```
On branch master
nothing to commit, working tree clean
```

## But this doesn't make sense?
* Your remote master branch and your local master branch are different

## Time to fetch
* You need to do a fetch

`$ git fetch`

## Compare local with remote
`$ git diff master origin/master`

* That will compare the local branch `master` with the github remote branch `origin/master`
* Now just press `spacebar` to navigate through all the changes
    - Red is removed
    - Green is added
    - No color is unchanged
* Press `q` to quit out of git `diff`

## Show local branches
`$ git branch`

* The asterisk is the currently selected branch
* Type `q` to exit out of list of branch pages

## Pull down remote origin master branch
`$ git pull origin master`

## Test your site now
`$ npm run dev`

* **Warning** Your site is not working!
  - Remember you changed your graphql to heroku's URL
  - Your last changes were to deploy and that is what we need to do

## Good housekeeping
* Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d add-react`

* That will let you know the branch was deleted with something like:

`Deleted branch add-react (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo

## You are ready to Deploy!
* Now we are ready to take our site and push it to Heroku
* Remember, we actually push our site to Herokus remote git repo and that in turn will run a build script that will create our app on their server

### Push the site to deploy

`$ git push heroku master`

## Summarize the Heroku build process
1. Press enter
2. First it creates the **runtime environment**
3. It recognized our `engines` that we specified
4. It runs `heroku-postbuild`
5. Will go into `client` folder and install necessary dependencies
6. Then it will run the `react-scripts` build script
7. It will create an optimized `build` folder (including our `index.html` file)
8. Then it will go through it's **compression** process
9. Then it will launch your app
10. It will give us the URL it is deployed to
11. `$ heroku open` will open browser and your heroku site inside it

## Troubleshoot
### Using yarn and npm can cause issues
* If you were using both `npm` and `yarn` you need to remove one of the `.lock` files
* I'll remove `yarn.lock` from git

`$ git rm yarn.lock`

* Add and commit again and try to deploy to `heroku` again
* If all goes well the build process starts and could take a bit of time (think approximately 5 minutes depending on your internet connection)

## Test site
* You should see site working as it did on the dev site

`https://fivestarcologne.herokuapp.com/`

* If you have errors use the network tab
* If it is red, there is an error

## Troubleshooting Heroku
### Heroku logs
* Will let you know what errors you received on the server

`$ heroku logs`

* If you run into problems fix them
* Add, commit and push to heroku
* Open your site in the browser
* Use heroku logs if your app isn't working
* Eventually you'll fix all the bugs and the site should function as expected
* Here is a fast way to see all server error logs:

`$ heroku logs --tail`

## Additional Resources
* Heroku isn't the only deploy option, there are many others. Here are a few:
  - [Deploy React app on Digital Ocean](https://medium.freecodecamp.org/i-built-this-now-what-how-to-deploy-a-react-app-on-a-digitalocean-droplet-662de0fe3f48)
  - [Various ways to deploy](https://codebrahma.com/deploy-react-application-depth-overview-various-options-deploy/)
  - [How to deploy react app with netlify](https://www.youtube.com/watch?v=lCcBEDPTk4o)
  - [Deploy React and Node on AWS](https://medium.com/@adhasmana/how-to-quickly-deploy-react-and-node-app-on-aws-80e5dfe7d86e)
  - [Automate deploy React and Node on AWS](https://medium.com/@adhasmana/how-to-deploy-react-and-node-app-on-aws-a-better-approach-5b22e2ed2da2)
  - [Super fast static web publishing with surge](https://surge.sh/)
  - [Deploy react with Zeit](https://zeit.co/docs/examples/create-react-app)
  - [Node path module](https://www.youtube.com/watch?v=j95Lwxvi9JY)
  - [Everything about package.json and node engines](https://docs.npmjs.com/files/package.json)

## Next - switching back to development

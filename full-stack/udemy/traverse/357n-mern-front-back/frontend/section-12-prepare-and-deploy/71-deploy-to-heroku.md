# Deploy To Heroku
`heroku login`

* Browser will open
* Click `Log In` button
* Enter credentials
* Cloce the window and you'll see the Terminal says you are logged in (and shows the email of your user)

## Create a heroku app
`$ heroku create`

* morning-temple-64488 (app name)
* https://morning-temple-64488.herokuapp.com/ (live URL)
* https://git.heroku.com/morning-temple-64488.git (Heroku git repo)
* You could name it but the name can not have already been used
* You can log onto Heroku dashboard and you'll see your app `morning-temple-64888`
* You use `git` to deploy to Heroku
* Make sure you (if you haven't yet) initialize a git repo with `npm git init`

### Add changes to staging
`$ git add .`

* That puts all files in a staging area

### Commit changes
`$ git commit -m 'Prepare for deployment`

* Because we have husky set up you'll see code was first formatted before uploading

![husky is working](https://i.imgur.com/iob1vbO.png)

* We now have all our commits in a local repo and it is ready to be pushed to our Heroku remote git Repo
* If you needed to manually add it you could go to Heroku dashboard, find your app and click `Deploy` tab and search for `Create a new Git Repo` and paste `$ heroku git:remote -a morning-temple-64488`

## Push to Heroku to deploy
`$ git push heroku master`

* It will run optimization and compression code
* It will put files on server
* Then it will run build script (discussed earlier - aka the "postbuild" script)
* Essentially it will compile React on the server
* You should see Build succeeded!
* Command + click to open the URL to see your live app

## Debugging
* If you get `Application error` (happens often) you need to fix it
* Add `$ heroku logs --tail`
* Comment out the code for now
* Now we get a mongoose/mongo error because our environment variables are not known on Heroku
    - Grab the variable name from `config/config.env` (or wherever your important environment variables are stored)

```
MONGO_URI=mongodb+srv://philadmin:OdlUgGh10TQNWNIO@devconnector-a2gjt.mongodb.net/dev?retryWrites=true&w=majority
```

* Use the Heroku CLI to set remote environment variables
    - You need to have all the environment variables you were using locally on Heroku and you can add them via the Dashboard or the Heroku CLI

## Add variables via Heroku CLI
### Set a variable
`$ heroku config:set GITHUB_USERNAME=joesmith`

### Read a variable
`$ heroku config:get GITHUB_USERNAME`

### Read all variables (show them all)
`$ heroku config`

### Remove a config variables
`$ heroku config:unset GITHUB_USERNAME`

## Add variables via Dashboard
![adding variables via dashboard](https://i.imgur.com/qCP97Y2.png)

* **note**You can not push to Heroku without making a change to the code (sometimes you need to make a silly meaningless change (like add a comment) to get this deploy to work) 

# Make sure to whitelist your URL for mongo
* If you get this error:

```
Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/
```

* To solve I just made available everywhere on whitelist

## View URL of deployed production site
* Click on URL in terminal after pushing to heroku
* Or Type `$ heroku open`

## Test in UI
* Make sure Register works (we are using same Database)
* Enter non-matching passwords to make sure Redux validation works
* On successful register we should get redirected to Dashboard (because we have no profile yet)
* Click the `Create Profile` button
* Create a profile and submit
* Click developers and you should see it added as a profile
* On developers page click `Profile` and you can see that single profile
* Edit the Profile and Save to update it
* Add an Experience on the Dashboard
* Enter Experience details
* Add Education on the Dashboard
* Enter the Education details
* Posts on main nav
    - Add a post
    - Like a post
    - Unlike a post
    - Delete a post

## Add a domain on heroku
* Click on Heroku dashboard 'domains and certificates'
* Click Add Domain
* Register a domain on namecheap.com
* Then point your [DNS to Heroku](https://devcenter.heroku.com/articles/custom-domains)
    - Add the DNS so that it redirects your domain to your Heroku application 

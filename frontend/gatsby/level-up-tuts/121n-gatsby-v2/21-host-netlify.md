# Host Netlify
## Great repo on Github
`$ git init`

## Add to staging
`$ git add .`

## Add commit
`$ git commit -m 'Initial commit`

## Use hub
* Install using `brew`

`$ hub create`

### The long way
* If you don't want to use `hub` then create a repo on Github
* Copy the URL to that repo
* Paste repo like this:

`$ git remote add origin PASTEREPOHERE`

## Check out `.gitignore`
* We are ignoring:

```
.cache
node_modules
yarn-error.log

# Build directory
/public
.DS_Store
```

## Push to repo
`$ git push origin master`

## Netlify
* Log into Netlify
* Click `New site from Git`
* Click Github
* Click `Authorize Netlify by Netlify`
* Choose your Github user
* Give netlify access to all your repos
* Click install
* You may have to enter your GH password again
* Type in your repo and hit enter
* Accept master as the branch to deploy
* netlify knows automatically that we are using a gatsby site so it knows to use the `gatsby build` command and it will publish the `public` directory
* Click `deploy` site
* View the site
* Set up a custom domain
    - Example:
        + Namecheap.com is where you leased the domain
        + Add custom DNS on netlify
        + It will give you the nameservers for netlify
        + Log in to namecheap.com and enter the custom DNS values and save
        + Give it 5 minutes to propagate and view custom domain in browser
* Verify HTTPS
    - Give it 10 minutes and verify it
* Secure with HTTPS

## Add correct headers
### Install it
`npm i gatsby-plugin-netlify`

## Add to plugins
* Needs to be at the very bottom of `gatsby-config.js`

`gatsby-config.js`

### Update site
* Add changes

`$ git add .`

* Commit changes

`$ git commit -m 'Adds netlify headers`

* Push changes to github

`$ git push origin master`

* Magic happens
* Once you push to Github, Netlify is listening for changes to that repo and when it happens, Netlify will run a fresh build and re-deploy your site!
* Refresh Deploy in Netlify and watch the build script run and make sure there are no errors

## Watch how cool headers on netlify are
* View site inside Chrome Dev Tools CDTs
* View the Network tab
* Refresh browser (cmd + r)
* Click All tab of Network tab
* Scroll to bottom of list
* Hover over Archive links and the pages will pre-load for a super fast web site experience




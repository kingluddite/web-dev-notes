# Deploy to Netlify
<!-- MarkdownTOC -->

- [Netlify](#netlify)
- [Netlify free alternatives](#netlify-free-alternatives)
- [Netlify works with Git and Github](#netlify-works-with-git-and-github)
    - [What is Continuous Deployment](#what-is-continuous-deployment)
- [Configuring Continuous Deployment on Netlify with Github](#configuring-continuous-deployment-on-netlify-with-github)
    - [Now we want to put the website on Github](#now-we-want-to-put-the-website-on-github)
    - [Putting both gatsby and sanity in one repo](#putting-both-gatsby-and-sanity-in-one-repo)
        - [Working locally on your machine](#working-locally-on-your-machine)
- [TROUBLESHOOTING - Where did you initialize git?](#troubleshooting---where-did-you-initialize-git)
- [Setting up your Remote GitHub repo](#setting-up-your-remote-github-repo)
    - [Create a remote GitHub repo](#create-a-remote-github-repo)
- [West Practice - On Netlify](#west-practice---on-netlify)
    - [Add your repo to Netlify](#add-your-repo-to-netlify)
- [Create a new site page on Netlify](#create-a-new-site-page-on-netlify)
    - [Warning! - This won't work yet](#warning---this-wont-work-yet)
- [Solution to Deploying our site successfully:](#solution-to-deploying-our-site-successfully)
- [Troubles with your Netlify deploy](#troubles-with-your-netlify-deploy)
- [What happens when Netlify deploys your site?](#what-happens-when-netlify-deploys-your-site)
    - [Our build will fail for a second time](#our-build-will-fail-for-a-second-time)
- [This deploy will fail again](#this-deploy-will-fail-again)
- [Add environment variables](#add-environment-variables)
    - [Under Environment variables](#under-environment-variables)
- [Comment out or remove all console.log\(\)](#comment-out-or-remove-all-consolelog)
    - [CORS issue](#cors-issue)
- [react-is can't resolve issue on build](#react-is-cant-resolve-issue-on-build)
    - [That fixed it!](#that-fixed-it)
- [Make a better sub domain name in Netlify](#make-a-better-sub-domain-name-in-netlify)
- [Now on the home page we get the CORS error page](#now-on-the-home-page-we-get-the-cors-error-page)
- [I kept getting a CORS error even after adding to CORS API list on Sanity](#i-kept-getting-a-cors-error-even-after-adding-to-cors-api-list-on-sanity)
- [Test the remote site](#test-the-remote-site)
- [All of our functions are automatically deployed](#all-of-our-functions-are-automatically-deployed)
- [Continuous deployment](#continuous-deployment)
- [What if you edit a pizza in Sanity?](#what-if-you-edit-a-pizza-in-sanity)
- [How do you get the images updating on the site?](#how-do-you-get-the-images-updating-on-the-site)
    - [Let's do that now](#lets-do-that-now)
- [Use the sanity CLI to add the hook we just copied from Netlify](#use-the-sanity-cli-to-add-the-hook-we-just-copied-from-netlify)
- [Now test it out](#now-test-it-out)

<!-- /MarkdownTOC -->

* **note** You can deploy gatsby sites anywhere

## Netlify
* Currently most popular way to host a Gatsby site
* Facilitates making your site fast to load
* Hosts your website
* Makes getting HTTPS super easy (click of button)
    - Uses LetsEncrypt behind the season
    - Auto renews (huge perk!)
* Does the build for you
    - This build can be triggered
        + When some data in sanity changes
        + When your git repo changes
* Also hosts serverless functions

## Netlify free alternatives
* gatsby cloud
* vercel

## Netlify works with Git and Github
* Your normal git workflow is adding, committing and pushing changes to Github
* You will set up `Continous Deployment` on Netlify

### What is Continuous Deployment
* You push your changes to Github, Netlify will listen for any changes and rebuild your site on Netlify
* Since Netlify is also hosting your site, this is very conventient because now whenever you push your site to Github it will update your live site

## Configuring Continuous Deployment on Netlify with Github
1. Log into Netlify (create a account if you haven't yet)
2. Click `New site from Git`
3. Connect to your Git Provider (I use GitHub)

### Now we want to put the website on Github
* We grouped both `gatsby` and `sanity` in same folder so we'll push them both up to Github
    - **note** You can also have separate repos for frontend (gatsby) and backend (sanity)

### Putting both gatsby and sanity in one repo
#### Working locally on your machine
* In their parent folder initialize git with `$ git init`
    - **IMPORTANT** You need to remove the `.git` files from inside gatsby (there is not one by default inside your sanity folder)
    - **note** I forgot to do this and ended up pushing a gatsby submodule folder up to GitHub (you know it is a submodule folder because the folder icon has an arrown on on)

`$ git init`

* Create a `.gitignore` and populate it as you see fit
* Git add and commit

## TROUBLESHOOTING - Where did you initialize git?
* I accidentilly created it inside my `gatsby` folder which is not what I wanted
    - Delete the `.git`
    - Go up one directory and `$ git init`
    - Create a `.gitignore` and populate it as you see fit in the root folder

## Setting up your Remote GitHub repo
* We are all set locally now we need to push our code to our remote GitHub repo

### Create a remote GitHub repo
* **tip** Using the `gh` CLI will save you time and you never have to leave the terminal

1. Name your repo
2. Make it Public or Private
3. Add the origin
4. Push the code to Github

## West Practice - On Netlify
* You have two choices when you connect to netlify

1. all code (DO NOT DO THIS! - Why let anyone have permission to all your code?)
2. just the one repo

### Add your repo to Netlify
1. Search for the single repo (if you can't find it click the link at the bottom "Configure the Netlify app on GitHub."
2. Point to your GitHub organization
3. Scroll down
4. Click under `Repository access` "Only select repositories"
5. Search for your repo
6. Find it
7. Click `Save`

## Create a new site page on Netlify
1. Branch to deploy: `main` (unless you want to deploy another branch)
2. The `build command` is: `$ npm run build`
3. The `Publish directory` is: `gatsby/public`
4. Then click `Deploy`

### Warning! - This won't work yet
* The deploy fails
* Why?
    - Because it will look in our github repo for our gatsby website
    - We need to tell it our gatsby site lives inside our `gatsby` directory
    - **note** This "extra" configuration is because we have both our gatsby and sanity in separate folders inside one git repo

## Solution to Deploying our site successfully:
* Use your common sense here. For our client site we named our gatsby folder `clientgatsby` and so the base directy would be `clientgatsby` not `gatsby`

1. In Netlify `Site Settings` > Click on `Build & Deploy` in the sidebar
2. Click on `Edit settings` button
3. Update the `Base directory` to: `gatsby`
4. `Publish directory` to `gatsby/public`
5. Click `Save`

## Troubles with your Netlify deploy
* Trigger deploy > Clear cache and deploy site (Under Netlify Deploys page for site)
* Use that option to deploy the site

## What happens when Netlify deploys your site?
* It runs what we did we when we ran `$ npm run build` but it runs it on it's own servers (remotely)

### Our build will fail for a second time
* Error - can't find `eslint-webpack-plugin`
* I need to install that as a dev dependency

`$ cd gatsby && npm i -D eslint-webpack-plugin`

* Add and commit to git and push to github
* As you push you should see another build occur
    - I overrode this and deployed by clearing cache

## This deploy will fail again

## Add environment variables
* Remember that we ignored `.env` so we need to manually add them to our Netlify site
    - Deploys > Deploy settings > Build & Deploy > Environment

### Under Environment variables
* Click `New Variable`
* One by one add your key value pairs from your .env file
* You do not need `GATSBY_HOT_LOADER` (only for development and no longer needed even in development)
* For live email use Postmark (West Practice)
    - Just plugin ethereal.email values if you don't have that setup yet
* What about the `GATSBY_SERVERLESS_BASE` environment variable?
    - We will make this a relative path:

![GATSBY_SERVERLESS_BASE rel path](https://i.imgur.com/SEgKYKC.png)

* This is fine because Netlify ALWAYS runs the site on a new domain / sub domain
* And add your `GATSBY_SANITY_GRAPHQL_ENDPOINT` and make sure that points to your Sanity server
* When finished - make sure you click `Save`

## Comment out or remove all console.log()
* VS CODE - Search for `console.log(`
* Comment all out except for err logs

### CORS issue
* You will get a CORS issue on your home page
* You need to allow the domain of your site in the Sanity Admin Dashboard for API
* **IMPORTANT CAVEAT** `*.netlify.app`
    - Will allow anyone running an app on netlify.app to access your API

## react-is can't resolve issue on build
* https://gitmemory.com/issue/gatsbyjs/gatsby/31902/860890770
    - no answer to question
* https://newbedev.com/javascript-can-t-resolve-react-is-in-vercel-path0-node-modules-styled-components-dist-code-example
    - Suggests intstalling styled-components
    - I had styled-components installed
    - I installed the latest `$ npm i styled-components`
    - Didn't work
* This seems to be the issue - https://github.com/styled-components/styled-components/issues/3513
* This is someone feeling my pain - https://answers.netlify.com/t/gatsby-builds-locally-but-fails-on-deploy/33302
* Looks like (even though the repo says react-is is not a dependency for styled-components the docs tell a different story - https://styled-components.com/docs/faqs - What do I need to do to migrate to v5?)

### That fixed it!
* Make sure you are in gatsby
* Install react-is@^16.8 `$ npm i react-is@^16.8`
    - [styled-components migrate to v5 faqs](https://styled-components.com/docs/faqs)
* Ran Netlify build one more time and it was successful

## Make a better sub domain name in Netlify
* **WARNING** I think this makes the CORS update take time so when you add the newly crafted subdomain on Netlify is seems to keep showing the CORS error even after adding the domain to the Sanity API CORS page
    - Checking the authentication box did nothing so uncheck it for security
* Site settings > Domain management > Domains
* Click on `Options` drop down > Edit site name
* Make it a friendly name
* Your subdomain is updated almost instantly
    - So instead of the crazy random named subdomain you can have
        + https://peazaa.netlify.app

## Now on the home page we get the CORS error page
* We just need to add our page to the Sanity API domain list

1. Login to sanity.io
2. Select your sanity project
3. Click on Settings
4. Click on API Settings
5. Copy your full subdomain URL
6. Click `+ Add CORS origin` button
7. Paste in copied URL (**IMPORTANT** remove slash at end)
8. You do not need to click `Allow credentials` checkbox (because we are not doing any authentication, we are just pulling data)
9. Click `Save` to add the Origin
10. Run the Netlify build again (clear cache build)
11. **favicon** shows building, success or fail in Netlify deploy

## I kept getting a CORS error even after adding to CORS API list on Sanity
* I made a silly mistake - Updated the wrong project in Sanity (API)
* Updated the correct one, not checking authentication and in a couple of minutes the CORS error was gone

## Test the remote site
* Click around everything should work

## All of our functions are automatically deployed
* Click on `Functions` in navbar
* You will see both `yo` and `placeOrder`
* If you have any console logs you can click on the function in Netlify and see the logs

## Continuous deployment
* If you make a change in local development
* Git add and commit
* That will trigger a change and will auto deploy a build
* It will rebuilt and redeploy our entire website

## What if you edit a pizza in Sanity?
* You won't see the new pizza immediately

## How do you get the images updating on the site?
You need to set up a webhook in Sanity so sanity will push every time you add new pizzas or slices

### Let's do that now
* In Netlify
    - Goto `Settings` > `Build and Deploy` > `Continuous deployment`
    - Scroll down to Build Hooks
    - Click `Add a Build Hook`
    - Name it (something like: Rebuild from Sanity)
    - Save it
    - Copy the URL it gives us
        + Every single time you hit this URL with a post request it will rebuild your website

## Use the sanity CLI to add the hook we just copied from Netlify
`$ sanity hook create`

* See the deploy and you should see a new deploy triggered
* Once it is finished building, you will see your modified pizza is updated on the size
* It will ask you the Hook name: Name it `netlify deploy` 
* Select dataset hook should apply to: Choose `production`
* Hook URL: Paste the URL you just copied from Netlify (the netlify hook)
* It should tell you `Hook created successfully`

## Now test it out
1. Log into Sanity Dashboard
2. Edit Pizzas (click Pizzas in sidebar)
3. Change the spelling on one of the pizzas
4. Click Publish
5. View Deploys tab of Netlify and you will see a new build has been triggered with "Deploy triggered by hook: Rebuild from Sanity"

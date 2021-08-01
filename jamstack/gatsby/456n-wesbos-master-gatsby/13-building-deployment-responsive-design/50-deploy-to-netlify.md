# Deploy to Netlify
* Netlify currently most popular way to host a Gatsby site
    - **note** You can deploy gatsby sites anywhere
    - Netlify facilitates making your site fast to load
    - Netlify hosts your website
    - Makes getting HTTPS super easy (click of button)
    - Netlify does the build for you
        + This build can be triggered
            * When some data in sanity changes
            * When your git repo changes
    - Netlify also host serverless functions

## New site from Git
1. Log into Netlify (create a account if you haven't)
2. Click `new site from Git`
3. Connect to your Git Provider (I use GitHub)
4. Now we want to put the website on Github
5. We grouped both gatsby and sanity in same folder so we'll push them both up to Github
    - You can also have separate repos for frontend (gatsby) and backend (sanity)

### Putting both gatsby and sanity in one repo
* In their parent folder initialize git

`$ git init`

* Create a `.gitignore` and populate it as you see fit
* Git add and commit

## IMPORTANT - Where did you initialize git?
* I accidentilly created it inside my `gatsby` folder which is not what I wanted
    - Delete the `.git`
    - Go up one directory and `$ git init`
    - Create a `.gitignore` and populate it as you see fit in the root folder

## Hook your site upto Github (create a new repo and push your code)
* Name it
* Public or Private
* Add the origin
* Push the code

## West Practice - On Netlify
* You have two choices when you connect to netlify
    - all code (DO NOT DO THIS! - Why let anyone have permission to all your code?)
    - just the one repo
    - Search for repo (if you can't find it click the link at the bottom "Configure the Netlify app on GitHub."
        * Point to your github org
        * Scroll down
        * Click under `Repository access` "Only select repositories"
        * Search for your repo
        * Find it
        * Click Save

## Create a new site page on Netlify
* Branch to deploy `main`
* The `build command` is `$ npm run build`
* The `Publish directory` is: `gatsby/public`
* Then click `Deploy`

### Warning! - This won't work yet
* The deploy fails
* Why?
    - Because it will look in our github repo for our gatsby website
    - We need to tell it our gatsby site lives inside our `gatsby` directory
    - **note** This "extra" configuration is because we have both our gatsby and sanity in separate folders inside one git repo

## Solution:
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
You need to set up a webhook in Sanity so sanity will push everytime you add new pizzas or slices

### Let's do that now
* In Netlify
    - Goto Settings > Build and Deploy > Continuous deployment
    - Scroll down to Build Hooks
    - Click Add a Build Hook
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

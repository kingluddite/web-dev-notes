# Deployment with Surge
One of the best `Static web publishing servers around`

[surge website](http://surge.sh/)

## Install surge CLI
`$ npm install -g surge`

Make sure you are inside your project directory

`$ npm run build` - to make sure you have the most recent build of your project

## Deploy to surge
`$ surge -p dist`

* `-p` which directory are you deploying to?

## Create your account
1. Enter **username** and **password**
2. Surge will send you an email, click to verify your email
3. Then it will freeze because it is waiting for you to hit `enter` so that you can deploy the URL it specifies in the terminal
4. Done!
 
### You just deployed your production level site to surge
* Browser to that URL to see your front end react app in production
    - `http://unequal-bears.surge.sh/#/`
* Super easy
* Use surge help section if you want to use a custom domain

## Deploy with Github pages
* You have a master branch
* Github makes special use of branch called `gh-pages`
* If you push all the content up to that branch, that site will be served on a URL equal to `https://<USERNAME>.github.io/<REPONAME>`
* Github Pages also supports custom domain names
* Make sure your Github.com account is not set to **Private**
* Initialize a repo with `$ git init`
* `$ git add .` and `$ git commit -m 'Initialize repo'`
* Use `$ hub create` or `$ git remote add origin <SSH or HTTPS .git repo URL>`
    - SSH will only work if you shared your public SSH key with Github
* Checkout the Github.com special branch
    - `$ git checkout -b gh-pages`
* Push this branch up to Github.com
    - But we only want to push our `dist` directory and not anything else
    - So we'll use this fancy command
    - `$ git subtree push --prefix dist origin gh-pages`
        + This says I know I have a full git repo here
        + I only want to push one folder called `dist`
        + and I want to push it to origin (_Github_)
        + And I want to push it to the branch called `gh-pages`
* View Github.com URL in browser and you'll see your project
    - `https://<USERNAME>.github.io/<REPONAME>`
    - [https://kingluddite.github.io/webpack-sample-deploy/#/](live on github)

## Make future deployments quick
* And enable us to deploy whenever we want to
* Good idea to add in an `npm` script to automatically deploy our project for us

`package.json`

```
"scripts": {
    "clean": "rimraf dist",
    "build": "NODE_ENV=production npm run clean && webpack",
    "serve": "webpack-dev-server",
    "deploy": "npm run build && git subtree push --prefix dist origin gh-pages"
  },
```

Then to deploy it is as easy as `$ npm run deploy`

## Deployment weth Amazon S3
* Like a big folder sitting on some server
* Perfect for static sites as no logic is running on it
* It just serves up folders and files
* Can cost money but should be free if you are not using a lot of services
* We will use AWS access keys, these are very secure sensative
* We will create them and then immediately delete them

### Install CLI for AWS S3
`$ npm install -g s3-website`

* Not usually good to install modules globally but in a case of a tool that we use for deployment it is not a dependency of our project so it should be ok to install as a global module
* This install will automatically create a deployment bucket on AWS and then automatically deploys our website to it
* We just have to make sure it has access to our AWS account using our API keys

### Sign up for an AWS account
* No charge but could be charged so be careful with API key
* Have to provide credit or debit card
* Phone call verification of your number
* Choose basic plan

#### View AWS control panel
Select `My Security Credentials`

![my security credentials](https://i.imgur.com/rENfDW3.png)

Expand `Access Keys`

![access keys](https://i.imgur.com/fQYllrx.png)

Press Create New Access Key
Click Show Access Key (this is very sensative stuff)

### NEVER EVER EVER EVER COMMIT THIS KEYS TO GIT
* If they wind up on Github, someone will find and use them and you will owe Amazon money

* Create new file in root of project called `.env`
* When we run that S3 website tool it will automatically look in `.env` to find our Access Keys (that we just generated)

`.env`

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Cut and paste your access key values into our `.env` file

## Create deployment bucket
`$ s3-website create my-webpack-deploy`

* It first creates the bucket for us after we run this command
* Now we need to deploy our applictation

## Deploy website
`$ s3-website deploy dist`

* That last part is the folder we want to deploy
* View the URL and you will see the site

`http://my-webpack-deploy.s3-website-us-east-1.amazonaws.com/#/`

## Each time we want to deploy
1. `$ npm run build`
2. `$ s3-website deploy dist`

You can also pay to assign a domain to this instead of using crazy long URL

# Lots of tutorials out there to secure your access keys
* Google `How do I keep AWS access keys safe`

## Clean up
* On AWS click delete to delete your keys
* Delete AWS deploy bucket (to make sure you don't get billed for it ever)
* Click `Services`
* Type `S3`
* Click on `Scalable Storage in Cloud`
* Select your bucket
* Click `Delete bucket`
* It will ask you to type in the name of your bucket you want to delete
* Type the name in
* Press delete




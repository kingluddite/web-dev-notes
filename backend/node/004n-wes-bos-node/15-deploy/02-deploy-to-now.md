# Deploying to Now
* Simple way to Deploy any kind of app
    - Docker
        + Because they host Docker you really can deploy any type of Application
    - Node.js
    - Static Websites

## They have a free play
* By far the easiest way to Deploy an app
* Feel free to name your app what you want in package.json

`package.json`

```
{
  "name": "store-test",
// more code
```

### Add stuff specific to now.sh
* We need to tell it where our environmental variables will be coming from

* Create new file and duplicate `variables.env` and rename to `variables.env.now`
    - Everything will stay the same but:
        + NODE_ENV=production
        + PORT=80


* `variables.env.now` are our environmental variables but now won't upload this file to the server but instead it will set them on the server for us and then when we actually deploy our NODE_ENV and DATABASE and MAIL_USER... they will all be available to us
* And `now` has a little tool that will do that for you if you just tell it where you environmental file is
* So add this to `package.json`

`package.json`

```
// more code
  "engines": {
    "node": ">= 7.6.0"
  },
  "now": {
    "dotenv": "variables.env.now"
  },
  "scripts": {
// more code
```

* Since we put `variables.env.now` in `.gitignore` it will not go on Github or whatever repo server you are using
* It also will NOT be deployed to `now.sh`
* That is very important because if you are using the `now.sh` free plan it will make your entire application public
    - But the important stuff we don't want public is our `environmental variables`


## Sign up for now
Install now globally `$ npm install now -g`

Test if you have now `$ now -v`

### run now
`$ now`

It will ask you if you want to deploy
type `y`

It takes like 3 minutes
We have sample data that preloads so as soon as we load we have a functional site with reviews users and stores

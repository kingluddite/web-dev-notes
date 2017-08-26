# Adding in a Heroku Build step
![heroku build diagram](https://i.imgur.com/QdlPqs7.png)

1. I will commit all of my files to Git
2. I will push those files to Heroku
    * Heroku will automatically install all my server dependencies
    * Just as it did before
3. NEW STUFF STARTS HERE
4. Heroku will try to automatically run a script `heroku-postbuild`
    * Inside of that script we can give Heroku additional instructions
    * On how to setup and start running our app
        - Hey Heroku you need to:
            + Install all of our client dependencies
                * ALL OF THEM - including development dependencies!
            + And then tell it that it needs to run this command
                * `$ npm run build`
                    - From within our `client` project directory
                    - That will start up the build process
                    - It will make all the production version of our assets
                    - And when the command finishes
                    - Then Heroku will continue on its way to start up our application

## How do we tell Heroku to install all client dependencies
* Including all the development modules as well
* Let's dig into the Heroku Documentation
    - [customizing the build process](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process)
    - "If your app has a build step that you’d like to run when you deploy, you can use a postinstall script in `package.json`:"

```
"scripts": {
  "start": "node index.js",
  "test": "mocha",
  "postinstall": "bower install && grunt build"
}
```

* So if you use `postinstall` inside scripts, Heroku will automatically run that after installing all the server side npm modules
* **Heroku-specific build steps**
    - Sometimes you may want to run scripts only before or after builds on Heroku
    - Or, you may need to build production assets after dependencies are installed (_This is what we need to do!_)

```
"scripts": {
  "heroku-prebuild": "echo This runs before Heroku installs your dependencies.",
  "heroku-postbuild": "echo This runs afterwards."
}
```

* So we will use the above scripts instead of the previous one because the previous scripts uses `postinstall` and that `postinstall` runs also if you run `$ npm install` on your own local machine
    - That would be bad because if some new developer clones your app and runs `npm install` to setup the server, you don't want them to also start automatically building the client side project as well
* And by using `heroku-postbuild`, we ensure that we are only running this build script on Heroku

## How we tell Heroku to install all client side dependencies
* [dev dependencies link](https://devcenter.heroku.com/articles/nodejs-support#devdependencies)
* If you would like to install devDependencies, you can disable production mode with this code:

`$ heroku config:set NPM_CONFIG_PRODUCTION=false`

* The line above says "set an environmental variable on our Heroku instance that says `NPM_CONFIG_PRODUCTION=false`
* This makes sure that any time you install any npm modules on Heroku you get both development and dependency modules
    - So that would also affect how our server side dependencies are installed as well because the above line sets a "global flag"
    - So we will do something similar but we want to make sure that it does not affect our server
    - We will make sure that it only affects the client side of our project

## Heroku doesn't care :(
* Heroku does care about the server root `package.json` file but it doesn't care about the client side `package.json` file

### Add the script
* That will be called after our server has installed all of its own dependencies
* 'heroku-postbuild' - This script will be called automatically after our server dependencies have been installed
    - We have to make sure we tell Heroku to install all npm modules both the development dependencies and the production dependencies as well

`package.json` (server)

```
// more code
"scripts": {
  "start": "node index.js",
  "server": "nodemon index.js",
  "client": "npm run start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
},
// more code
```

* We alter the way Heroku recommends in their documentation
* We tell Heroku to run `$ npm install` and `--prefix client` means run that command inside the `client` directory
* And we chain on `&&` another command `$ run build` to run our build command (also inside the `client` directory (we used `--prefix client`))

## Now we'll commit all our changes to Git
* And push our project to Heroku

`$ git add .`

`$ git commit -m 'Add billing and client side app`

`$ git push heroku master`

* You will see `Building dependencies`
* Running heroku-postbuild
* If you need to troubleshoot run `$ heroku logs`

## Test in browser
`$ heroku open`

* You should see your site is working
* Troubleshoot if it is not

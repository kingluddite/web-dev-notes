# Deployment Options
* Every time we are in the `client` folder and we run `$ npm run build`
    - That takes a snapshot of our code and makes a production ready folder filled with all our production ready files
    - It is a one time command that we use each time we want to deploy
    - You can build your project
    - But if you change stuff inside your `src` folder, you have to build your project again

## Heroku
* Any time we deploy to Heroku

1. Build your app
2. Then deploy it
3. Do this every time before deploying

## How we execute that build step
* This is kind of a big question
* By convention, traditionally we do not commit any of our built assets to Git
    - And for Heroku we are using a Git based deployment
        1. We use Git to commit our project
        2. Then push that git repo to Heroku
* But if we put our build stuff inside `.gitignore` how will we deploy to Heroku?

### Three options to deploy
![three options deploy](https://i.imgur.com/EFLhWkg.png)

* We have to build our project before we push off to Heroku

#### Option #1 (kind of violates convention)
1. Run the npm build command `$ npm run build`
    * At our Terminal
    * On our local machine
2. We commit that built project
3. Then we push that to Heroku

* A few small reasons not to do this
* It breaks convention
* `Create-react-app` makes it hard because it ignores in Git the `build` directory by default

#### Option #2 (slightly more complicated)
* Makes sure we don't have to commit those built files
* The entire build process is being executed on Heroku's servers
* We tell Heroku to take care of the entire build process

1. We commit all of our code
2. We do not build the project on our local laptop
3. We push it off to Heroku
4. Once our project is on Heroku
5. We tell Heroku to install all the dependencies for our client project
6. And then to run the command to build the client project
7. Then deploy the stuff and serve it

* Bad side to Option #2:
    - Not really bad but develop superstition comes in to play
    - Thinking you might have bad luck if you do it this way
    - When Heroku installs our dependencies, it has to install all of them
    - So you are installing a ton of dependencies that are only being used in the development environment
    - You are installing the dependencies for the development evironment on Heroku in the production environment and after you install them, they will never be used

#### Option #3 (use a lot at companies)
* We make use of a 3rd party server to build our app
* We take all of our files React and Express sides
* Commit all of it to git
* Then we Push it off to CI (`Continuous Integration`)
    - " A CI Server"
        + A Server that has the ability to run tests over your codebase
        + We can configure it to say after all test are done and successfully pass, then install all the client dependencies
        + Build the project
        + Commit it to a different branch (like a `deployment` branch) on Git
        + Then Automatically push that build off to Heroku

### If you want to try Option #3
[circleci link](https://circleci.com/)

## We will choose Option #2
 

# Add Apollo
## New branches
* From now on when we add feature requests we will create them in a new branch
* There are various ways to do this but one of the most common ways is to use the **Git Workflow**
* We will create branches for feature requests
* We will commit often and push our branch changes to our remote Github repo
* We will do PR (pull requests), check our code (normally another person will perform a code review)
* If all the code looks good you will merge the code into your github master branch
* Then you fetch and pull down the code to your local copy of git
* This process will be a rinse and repeat process as you develop your cologne app

### Create a new branch
`$ git checkout -b add-apollo`

* The `-b` flag creates a new branch and moves you into it
* All the changes we made since our last code push to master have left our master branch dirty but when we checkout and move into a new `add-apollo` branch our master branch is "clean" again and now our `add-apollo` branch is "dirty"

## We will install all our server dependencies in the root of our app
* We are developing a full stack app
* We will have two `package.json` files
    - One `package.json` in the root of our app
        + This will hold all server packages
        + This will hold all our linters and prettier packages
    - One `package.json` in the `client` of our app
        + This will hold all our react stuff
* npm packages have a cascade affect so if they are in the parent they will trickle down to child folders and if a child folder has a different package that package will be the one that is used
* Later on we will see an example of a parent npm package that collides with a child npm package and causes a problem (we'll see that when we start building our client side react part of this app)

## Install server packages

`$ npm i apollo-client apollo-cache-inmemory apollo-link-http apollo-link-error apollo-link`

## Why Apollo Boost?
* It saves your time
    - It used to take a long time to set up `Apollo` inside react app
    - Now it is just a simple import and involves setting up an Apollo Client
    - Here is an code sample of what that would look like (don't type this):

## React Apollo
* In addition we also need to set up a specific package for React called `React Apollo`
* This will give us access to the `Query` and `Mutation` components
    - [Query docs](https://www.apollographql.com/docs/react/essentials/queries.html)
    - Allows us to perform queries that is very similar to our surrounding React code
        + In the past it took a lot more code to perform a basic query within a given component
            1. Now you just write the query
            2. And include the query in your component

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add apollo`

## Push to github
`$ git push origin add-apollo`

## Next - Linters and prettier

## Additional Resources
* [What is the Git workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)

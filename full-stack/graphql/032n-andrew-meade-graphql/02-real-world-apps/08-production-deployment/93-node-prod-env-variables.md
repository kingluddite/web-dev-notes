# Node.js Production Environment Variables
* We want to take hard coded code out of our project and instead inject those values using environment variables
* This is not bulletproof but our codebase will be passed around a lot
    - We send it to Heroku
    - We send it to Github
    - We share with others to collaborate on this project
    - It is a **best practice** to keep sensitive information (like secrets) out of our code base and use `environment variables` instead
* It also makes it easier to changes those values because you can just change them in the config (instead of digging through your code to find all the places it is used)
* Use UPPER_CASE for your environment names (a common naming convention)

## Let's replace our secret with an environment variable
* Change this

`src/prisma.js`

```
// MORE CODE

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'donottellanyonethatthisismysecret',
  fragmentReplacements,
});

// MORE CODE
```

* To this

```
// MORE CODE

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
});

// MORE CODE
```

* We now need to add that secret into our config
* We also have to find any other places we used the secret in our code base
    - We also used it in the `prisma.yml` config file

`prisma/prisma.yml`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
secret: ${env:PRISMA_SECRET}
```

* And we need to update our config files
* We use a [secret generator](https://randomkeygen.com/) to come up with 2 random values for each environment
    - I use the CodeIgniter Encryption Keys (refresh the page for new values)
    - Select and the key is automatically copied to your clipboard

`config/dev.env`

```
PRISMA_ENDPOINT=http://localhost:4466
PRISMA_SECRET=FBx6inXejHiMX7W6KLvXQwxWqP7cYiQH
```

`config/prod.env`

```
PRISMA_ENDPOINT=https://kingluddite-blog-3736e1f779.herokuapp.com/kingluddite-blogging-app/prod
PRISMA_SECRET=z9tD9OI9G6eaI0fNriqLtXO1rKuat2zC
```

* **important** This is not the only place we have to set the prod secret environment variables
    - This file `prod.env` will help us with this:

`prisma.yml`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
secret: ${env:PRISMA_SECRET}
```

* But remember! `prod.env` is not getting set to Heroku (we hid it in our .gitignore)
* This means we have to also configure PRISMA_SECRET on Heroku with the same value (using the Heroku App Dashboard or the easier way we did it before using the Heroku CLI)

```
$ heroku config:set PRISMA_SECRET=z9tD9OI9G6eaI0fNriqLtXO1rKuat2zC
```

* Verify that you added your environment variable with:

`$ heroku config`

![verified both environment variables have been set on Heroku](https://i.imgur.com/477wHyo.png)

## Let's Test
* We'll start locally

1. Deploy to development
2. Run application in development (to make sure it still works)
3. Test in `localhost:4000` to make sure secret is still working
4. Deploy to production (check to make sure it still works)
    1. Shut down server
    2. Check git changes with `$ git status`
    3. Add and commit changes
    4. Push to heroku `$ git push heroku master`
5. Test to ensure that it is still working
    * Make sure that I can still communicate between my production Node.js instance and my production Prisma instance

## Deploy to development
`$ cd prisma && prisma deploy -e ../config/dev.env`

* No fields were updated so we will not see changes there
* But the `secret` did change so it will deploy

![changes deployed](https://i.imgur.com/woeyMQj.png)

## Run app in development
(in root of project) `$ cd ../ && npm run dev`

* This will start up our server on `localhost:4000`
* We want to test if our secret is working - so if we can pull some data from the Database we know the `secret` is still working for both Prisma and our `Node.js` app

`http://localhost:4000/`

* Should be running
* View all posts from the Database
* Remove a field to make sure you see changes

```
query {
  posts(orderBy: title_DESC) {
    id
    title
    createdAt
    updatedAt
  }
}
```

## If you are getting the @babel/polyfill error
* **Important!** You should upgrade with the changes I used
* But if you see it, see the [troubleshooting](../../00-troubleshooting.md) file at the root of notes for this GraphQL Prisma

## Push changes to Heroku
* Add and commit
* Push to Heroku `$ git push heroku master`
    - Heroku will install any new dependencies
    - It will run our code through babel
    - It will start the app
    - Typically the 2nd deployment is faster than first deployment

## Test to ensure that it is still working
* Deploy prisma project to production

`$ cd prisma && prisma deploy -e ../config/prod.env`

### Test it out
* You should see almost same info as we saw from the dev deployment

![prod deploy](https://i.imgur.com/E0cwiF0.png)

#### Test in Heroku Prisma
* Pull up your production instance of GraphQL Playground
* Click on Terminal URL on Heroku from the build process in the Terminal

![production GraphQL Playground](https://i.imgur.com/23NAAyp.png)

* `cmd` + click the URL in the Terminal to navigate quickly to that URL

#### https://alluring-everglades-63364.herokuapp.com/
* You should see GraphQL Playground
* Refresh
* We just want to communicate with the server to ensure that the secret is configured correctly

```
query {
  users {
    id
    name
    email
  }
}
```

* You should see the user

## Challenge - GOAL: Pull JWT secret out of code and into env var for dev and production (we don't want to use the Prisma secret, this is a new secret!)
1. Reference env vars in Node app
2. Add vars to config files to Heroku
3. Deploy
4. Test

* Replace the hard coded `secret` in `generateToken.js` with our environment variable (also fix in )
* Make sure it works locally
* Push to Heroku production and make sure it works
* Test by creating a new user and see if you see the user in the list of users on the Prisma GraphQL Playground

`src/utils/generateToken.js`

```
// MORE CODE

const generateToken = userId =>
  jwt.sign({ userId }, process.env.PRISMA_ENDPOINT, {
    expiresIn: '7 days',
  });

// MORE CODE
```

`src/utils/getUserId.js`

```
// MORE CODE

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  }

// MORE CODE
```

`config/dev.env`

```
PRISMA_ENDPOINT=http://localhost:4466
PRISMA_SECRET=FBx6inXejHiMX7W6KLvXQwxWqP7cYiQH
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2Wz8
```

`config/prod.env`

```
PRISMA_ENDPOINT=https://kingluddite-blog-3736e1f779.herokuapp.com/kingluddite-blogging-app/prod
PRISMA_SECRET=z9tD9OI9G6eaI0fNriqLtXO1rKuat2zC
JWT_SECRET=pj5uEjRvxrV62oQHxN0jPb23PpL1wjUU
```

* Add the new JWT_SECRET environment variable to your Heroku app

`$ heroku config:set JWT_SECRET=pj5uEjRvxrV62oQHxN0jPb23PpL1wjUU`

PRISMA_ENDPOINT=
* Verify that you added your environment variable with:

`$ heroku config:set https://kingluddite-blog-3736e1f779.herokuapp.com/kingluddite-blogging-app/prod --app prisma-dev-three-0619`

* You should see all 3:

```
JWT_SECRET:      pj5uEjRvxrV62oQHxN0jPb23PpL1wjUU
PRISMA_ENDPOINT: https://kingluddite-blog-3736e1f779.herokuapp.com/kingluddite-blogging-app/prod
PRISMA_SECRET:   z9tD9OI9G6eaI0fNriqLtXO1rKuat2zC
```

## Test locally
`$ cd ../ && npm run dev`

* Create a user and update a user to make sure both work the same
* Login and test the me query

## Test in production
* Deploy to production
* Save any changes, git add and commit and push to Heroku
* Test by creating and updating a user on the Heroku URL

## Houston we have a problem
* In the process of pulling values out into environment variables we broke something

`package.json`

```
// MORE CODE

    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },

// MORE CODE
```

* We broke the script `get-schema`
    - This looks in the `prisma.yml` file to figure out what it is supposed to do but that file doesn't contain hard coded values anymore
        + It contains environment variable references currently ARE NOT GETTING LOADED IN!
* Try it for yourself (root of project)

`$ npm run get-schema`

* And you'll get this error

```
⠋ [ "[WARNING] in prisma/prisma.yml: A valid environment variable to satisfy the declaration 'env:PRISMA_ENDPOINT' could not be found." ]
[ "[WARNING] in prisma/prisma.yml: A valid environment variable to satisfy the declaration 'env:PRISMA_SECRET' could not be found." ]
✖ No cluster set. Please set the "cluster" property in your prisma.yml
```

### Solution - easy fix
* Add `--dotenv config/dev.env`
* Like this

`package.json`

```
// MORE CODE

    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma --dotenv config/dev.env"
  },

// MORE CODE
```

* And it will work, we had no changes so the file will not be updated

## Remember to add/commit/push to heroku

## Congrats! Section complete
* We have our production Database up and running
* We have the production version of our Prisma project
* We have the production version of our Node.js app

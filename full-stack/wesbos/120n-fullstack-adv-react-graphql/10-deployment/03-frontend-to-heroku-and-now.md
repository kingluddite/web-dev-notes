# Deploying Frontend to Heroku and Now
* What we want to accomplish is have our code be smart and use our local yoga (developer) server when working locally and our remove (production) yoga server when in production

`frontend/config.js`

* You can find your production yoga endpoint by logging into your Heroku and in your yogo server dashboard > Settings > domains and certificates
* Make sure you update your variable names 'endpoint' for development and 'prodEndpoint' for production

```
// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint = `http://localhost:4444`;
export const prodEndpoint = `https://acme-yoga-prod.herokuapp.com/`;
export const perPage = 4;
```

* Change this line:

`frontend/lib/withData.js`

```
// MORE CODE

// config
import { endpoint, prodEndpoint } from '../config';

// MORE CODE

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,

// MORE CODE
```

## Now we need to add our heroku `frontend`
* Make sure you are in the root of your project (main folder)

`$ heroku apps:create acme-next-frontend-prod`

* This will create a new git repo for us

![acme next frontend prod](https://i.imgur.com/yoo490E.png)

* You will see on the left the frontend url
  - `https://acme-next-frontend-prod.herokuapp.com`
* On the right you will see the frontend heroku remote repo
  - `https://git.heroku.com/acme-next-frontend-prod.git`

## We need to add this to heroku for frontend 
* This is very similar to what we did for the heroku backend remote repo

`$ git remote add heroku-frontend https://git.heroku.com/acme-next-frontend-prod.git`

* Examine your git remote:

`$ git remote -v`

```
heroku-backend  https://git.heroku.com/acme-yoga-prod.git (fetch)
heroku-backend  https://git.heroku.com/acme-yoga-prod.git (push)
heroku-frontend https://acme-next-frontend-prod.herokuapp.com (fetch)
heroku-frontend https://acme-next-frontend-prod.herokuapp.com (push)
```

* Now we have our `backend` and `frontend`
* **note** remove the `heroku` repo

## Time to update our change in git
* Navigate to the app root folder
* Add `$ git add -A`
* Commit `$ git commit -m 'Add prod url'`

## Let's do our frontend subtree push

`$ git subtree push --prefix frontend heroku-frontend master`

### View Heroku
* Now you will see our next frontend

![next frontend](https://i.imgur.com/6yaiRTE.png)

### I will explain how Next.js works in production
* We have been running `$ npm run dev` and that will run on port `7777`

`frontend/package.json`

```
// MORE CODE

  "scripts": {
    "dev": "next -p 7777",

// MORE CODE
```

* But when we run `$ next start` it has to be built at that point
* In `frontend` we have a `next` folder
* But if we delete it and run `$ npm start` (in the frontend folder)
* We get an error that: 

```
Could not find a valid build in the '/Users/YOU/Documents/dev/mern-stack/120e-sick-fits/frontend/.next' directory! Try building your app with 'next build' before starting the server.
```

* So to fix this we must run `$ npm run build` first
* And that will create that `.next` folder for us
* And that is where the actual build of our app is getting dumped into
* Problem
    - You don't want to put that `.next` on a repo because it is just a bundled version (aka compiled version)
    - But because heroku uses git to push it, this puts us in a bit of a quandary (I don't want it to be part of my repo but I do want to push it to heroku)
    - Solution - We will add a little `hook` for heroku that will build this `.next` for us but on Heroku's server

## heroku-postbuild
`frontend/package.json`

```
// MORE CODE

    "heroku-postbuild": "next build"
  },
  "author": "",

// MORE CODE
```

* We have to modify our PORT command, heroku will pass us a port so we need to tell it which port to listen on

`frontend/package.json`

```
// MORE CODE

  "scripts": {
    "dev": "next -p 7777",
    "build": "next build",
    "start": "next start -p $PORT",
    "test": "NODE_ENV=test jest --watch",
    "heroku-postbuild": "next build"
  },

// MORE CODE
```

* Be inside your **root** folder of our app
* Add and commit changes if there are any

`$ git add -A`

`$ git commit -m 'postbuild`

## Now we run the frontend subtree push
`$ git subtree push --prefix frontend heroku-frontend master`

* We should see it runs the **build** command before it runs the **start** command
    -  `Running heroku-postbuild`
    -  `next build`

## Try it out in the browser
* But if you look at the (Chrome Development Tool Console) CDTC you will see an error that Access to fetch has been blocked
* We need to go Heroku's environment variables and update this:

```
FRONTEND_URL: http://localhost:7777
```

* To this

```
FRONTEND_URL: https://peh2-next-prod.herokuapp.com/
```

* If CORS gets you mad you can turn it off (but know that turning it off increases a security risk)

`backend/src/index.js`

```
// MORE CODE

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
```

* To this:

```
// MORE CODE

server.start(
  // {
  //   cors: {
  //     credentials: true,
  //     origin: process.env.FRONTEND_URL,
  //   },
  // },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);

// MORE CODE
```

* And you can also remove `fetchOptions` on the client side

`withData.js`

```
// MORE CODE

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        // fetchOptions: {
        //   credentials: 'include',
        // },
        headers,
      });
    },

// MORE CODE
```

* And doing that to both files will remove Cors errors

## But let's fix it properly!
* Comment both fragments back in

## Options for origin
`backend/src/index.js`

```
// MORE CODE

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },

// MORE CODE
```

* You have options for origin:
    - You can pass it one origin (we did this)
    - You can pass it an array of origins
    - You can also pass it a regex (ie - if you wanted it to be `*.heroku.com`)
* These are Express Cors options - look up documentation for more info

## Important! If you change environment variables on Heroku you need to reboot server side

![reboot heroku](https://i.imgur.com/g69txbI.png)

## If you are using Orders
* You will get an error and need to add orders to `User`

`schema.graphql`

```
// MORE CODE

type User implements Node {
  id: ID!
  name: String!
  email: String!
  permissions: [Permission!]!
  cart: [CartItem!]!
  orders: [OrderItem]
}
```

* Redeploy backend again after that change
* Make sure you are in `backend`

`$ npm run deploy`

## Make sure to do a browser refresh
* Cors errors should be gone
* Register

## Major Problem Fix
* You need to supply the PRISMA_ENDPOINT on Heroku
* It needs, needs, needs!!!! to have the Authorization code and the way you get this is you
* In prisma.io > log in > Services > acme-service-production
* Copy the HTTP Endpoint

![HTTP ENDPOINT for acme-service-produciton](https://i.imgur.com/ZgL2WMN.png)

* Paste the copied HTTP ENDPOINT into Heroku in `acme-yogo-prod`

![heroku PRISMA_ENDPOINT](https://i.imgur.com/LXBQUqJ.png)

## View the live site
* [live site](https://acme-next-frontend-prod.herokuapp.com)
* Sign In
* Create a User (register)
* The navbar should update
* The site is now live and read to be used

## With Zeit's Now (Optional)
* Remove frontend Port in `package.json`
* Zeit built `next.js` so you don't need the PORT
* Be in the frontend folder

`$ now`

* It will give you a URL - grab it and put it in the Heroku FRONTEND_URL environmental variable
* Restart Heroku servers
* `Now` knows to run the build command before you start it up
* **tip** Make sure you don't add the forward slash at the end of FRONTEND_URL!!!!


### Make note
* hardcoded to `prisma.yml` to a local dev server and this was wrong and caused a blinking effect
* needed to put dynamic value (variable) and then add and commit to git
* Then push to backend submodule

# React & Concurrently Setup
## Setup a client folder that is react
* Make sure you are in root of your current dev app we are building

`$ npx create-react-app client`

* Then `$ cd client`

## Run React
`$ npm start`

* React will start

## 2 for 1
* As it stands we'll have to run 1 command to run React
* We'll have to run another command to run our backend server
* That is totally fine to do but we'll make it slightly easier by running one command and running both (we can accomplish this with the npm package `concurrently`)

## Install concurrently
* We already did but if we didn't we would install it in the root of our server

`$ npm i concurrently`

### Add scripts
* We'll add a couple scripts in our root `package.json` to run concurrently

## babel-eslint error:
```
There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "babel-eslint": "10.1.0"

Don't try to install it manually: your package manager does it automatically.
However, a different version of babel-eslint was detected higher up in the tree:

  /Users/philiphowley/Documents/dev/mern-stack/udemy/traverse/357e-mern-fullstack/mern-traverse-my-app/node_modules/babel-eslint (version: 9.0.0) 

Manually installing incompatible versions is known to cause hard-to-debug issues.

If you would prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That will permanently disable this message but you might encounter other issues.

To fix the dependency tree, try following the steps below in the exact order:

  1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
  2. Delete node_modules in your project folder.
  3. Remove "babel-eslint" from dependencies and/or devDependencies in the package.json file in your project folder.
  4. Run npm install or yarn, depending on the package manager you use.

In most cases, this should be enough to fix the problem.
If this has not helped, there are a few other things you can try:

  5. If you used npm, install yarn (http://yarnpkg.com/) and repeat the above steps with it instead.
     This may help because npm has known issues with package hoisting which may get resolved in future versions.

  6. Check if /Users/philiphowley/Documents/dev/mern-stack/udemy/traverse/357e-mern-fullstack/mern-traverse-my-app/node_modules/babel-eslint is outside your project directory.
     For example, you might have accidentally installed something in your home folder.

  7. Try running npm ls babel-eslint in your project folder.
     This will tell you which other package (apart from the expected react-scripts) installed babel-eslint.

If nothing else helps, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That would permanently disable this preflight check in case you want to proceed anyway.

P.S. We know this message is long but please read the steps above :-) We hope you find them helpful!
```

## Add a script to run the client
`$ npm start`

* But we need to run it in the client folder so we need to add `--prefix client` (that will run it in the `client` folder)

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "node server",
    "dev": "nodemon server",
    "client": "npm start --prefix client"
  },

// MORE CODE
```

## Add a script called `dev`
* This will run both the client and the server
* We need to escape quotes so `"concurrently " npm run start" "npm run client""` becomes:

`"concurrently \"npm run server\" \"npm run client\""`

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "node server",
    "server": "nodemon server",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },


// MORE CODE
```

## Try it out
`$ npm run dev` (should run server and react)

* Then we get a eslint error

```
There might be a problem with the project dependency tree.
[1] It is likely not a bug in Create React App, but something you need to fix locally.
[1]
[1] The react-scripts package provided by Create React App requires a dependency:
[1]
[1]   "eslint": "^6.6.0"
[1]
[1] Don't try to install it manually: your package manager does it automatically.
[1] However, a different version of eslint was detected higher up in the tree:
[1]
[1]   /Users/philiphowley/Documents/dev/mern-stack/udemy/traverse/357e-mern-fullstack/mern-traverse-my-app/node_modules/eslint (version: 5.16.0)
[1]
[1] Manually installing incompatible versions is known to cause hard-to-debug issues.
[1]
[1] If you would prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
[1] That will permanently disable this message but you might encounter other issues.
[1]
[1] To fix the dependency tree, try following the steps below in the exact order:
[1]
[1]   1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
[1]   2. Delete node_modules in your project folder.
[1]   3. Remove "eslint" from dependencies and/or devDependencies in the package.json file in your project folder.
[1]   4. Run npm install or yarn, depending on the package manager you use.
[1]
[1] In most cases, this should be enough to fix the problem.
[1] If this has not helped, there are a few other things you can try:
[1]
[1]   5. If you used npm, install yarn (http://yarnpkg.com/) and repeat the above steps with it instead.
[1]      This may help because npm has known issues with package hoisting which may get resolved in future versions.
[1]
[1]   6. Check if /Users/philiphowley/Documents/dev/mern-stack/udemy/traverse/357e-mern-fullstack/mern-traverse-my-app/node_modules/eslint is outside your project directory.
[1]      For example, you might have accidentally installed something in your home folder.
[1]
[1]   7. Try running npm ls eslint in your project folder.
[1]      This will tell you which other package (apart from the expected react-scripts) installed eslint.
[1]
[1] If nothing else helps, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
[1] That would permanently disable this preflight check in case you want to proceed anyway.
[1]
[1] P.S. We know this message is long but please read the steps above :-) We hope you find them helpful!

```

* So I delete `package-lock.json`, `node_modules` and the line of `eslint` because it is older than the eslint version that create-react-app uses
* And I reinstall apps `$ npm i`

## Try to run both again with
`$ npm run dev`

## If Successful test
* React animation is running on `localhost:3000`
* Postman works at 'get all posts' request route

## Contrats you have a fullstack app

## Change into the React `client` directory
`$ cd client`

## Install client side dependencies
`$ npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment`

* `axios` to make HTTP requests
    - We could use the `fetch` api but we are going to be doing specific things with axios like creating global Headers (so axios is recommended here instead of fetch)
* `react-router-dom` - We need a client side router
* `redux` - global store of state
* `react-redux`
* `react-thunk` - middleware to allow us to make asynchronous requests in our actions
* `redux-dev-tools-extension` - a package to make working with redux-dev-tools easier
* `moment` - date/time library to format time
* `react-moment` - So we can use react within a component
`$ npm i axios`

## Delete the React git repo
* We don't want to be a submodule
    - Also delete the React `README.md`
    - Also delete the React `.gitignore`

`$ rm -rf .git README.md .gitignore`

## Change back to the root folder
`$ cd ..`

## We need to add a Proxy!
* Why?
    - Because when we need to make a request with `axios` like `axios.get('')`, I don't want to have to write the absolute path like `axios.get('http://localhost:5000/api/posts', auth, (req, res) => {}`
    - I want to just write paths like `axios.get('/api/posts', auth, (req, res) => {}`
* And in order to be able to do that we need to add a proxy
* And we'll do that and set our proxy to be `http://localhost:5000`
* We add that inside our `client/package.json`

`client/package.json`

```
// MORE CODE

  },
  "proxy": "http://localhost:5000"
}
```

## After adding the proxy and installing all our new client side dependencies run again
`$ npm run dev`




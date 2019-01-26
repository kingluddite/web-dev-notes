# Create React App
## PLEASE READ FIRST (WARNING): 
* When you use create react app, if you have `package.json` in the root, some of those packages can conflict with your create react app install and you may have to set some packages to older versions to match with create react app settings (_like: eslint-babel and eslint_)
* You need to make sure you upgrade to the latest version of node
* **note** Depending on if you installed node via the the node website or brew, it will be installed differently and could cause problems so be aware

## The next is VS Code specific
* Ignore if this is not your text editor

## frontend and backend
* We created a folder for each
* Now we need a way to visually know whether we are in the client or server folder

### Inside `frontend` folder
* Create `.vscode` folder
* Create `settings.json` inside the `.vscode` folder

`frontend/.vscode/settings.json`

* Yellow background

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeForeground": "#000",
    "titleBar.inactiveForeground": "#000000CC",
    "titleBar.activeBackground": "#FFC600",
    "titleBar.inactiveBackground": "#FFC600CC"
  }
}
```

### Inside `backend` folder
`backend/.vscode/settings.json`

* Pink background

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#FF2C70",
    "titleBar.inactiveBackground": "#FF2C70CC"
  }
}
```

## custom
* Make sure you set your VS Code title to `custom`
* By default it is `native`
* `cmd` + `,` search for `title` and change to `custom`

## Open terminal in 2 tabs
* One for `client`
* One for `server`

## Create new branch
`$ git checkout -b add-react`

* Nice error detection built-in

## Stop server
`ctrl` + `c`

## Did you install create react app yet?
* [create-react-app repo](https://github.com/facebook/create-react-app)

### Faster way (saves a step)
* Will download and install client react packages
* **note** npx comes with `npm 5.2+` and higher
* One of the benefits of `npx` is that you don't have to install global apps like `create-react-app` and this will go out and grab your repo and install it for you (big time saver)

`$ npx create-react-app client`

##### NEW (as of 8/8/2018) Create React App 2
* Migrate from create react app 1 to 2
1. Go to the root folder of the project
2. Open `package.json` file
3. Go under dependencies and locate `“react-scripts”`
4. Change the version to `2.0.3`
5. Install with `$ npm i`

`$ npm i`

### Good app organization
* We have a folder called `server` that holds all our server side stuff (`Node.js`, `Express`, `Mongoose`)
* We also have a folder called `client` that holds all our client side stuff (`React`)

### Start up React

`$ cd client && npm start`

## Conflicts up the tree
* Create react app has certain dependencies and you can run into conflicts if you have other `node_modules` in your project
  - In our app we have `node_modules` in 3 places
    + root, server and client
* To avoid conflicts make sure your root `package.json `looks like this:

```
$ npm i -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react react-testing-library eslint-plugin-prettier husky pretty-quick prettier
```

`/package.json`

```
{
  "name": "118e-five-star-cologne",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "precommit": "pretty-quick --staged",
    "server": "nodemon server/server.js",
    "client": "cd client && npm start",
    "dev": "concurrently --names \"server,client\" \"npm run server --silent\" \"npm run client --silent\""
  },
  "devDependencies": {
    "concurrently": "^4.0.1",
    "eslint-plugin-flowtype": "^2.50.3",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-jsx-a11y": "^6.1.1",
    "eslint-plugin-prettier": "^2.6.2",
    "husky": "^0.14.3",
    "nodemon": "^1.18.4",
    "prettier": "^1.14.2",
    "pretty-quick": "^1.6.0"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "apollo-server-express": "^2.1.0",
    "graphql-tools": "^4.0.0",
    "mongoose": "^5.2.10"
  }
}
```

## Run React again
`$ cd client && npm start`

* You will see your react app working with boilerplate css

#### `pretty-quick` and `husky`
* We already added and installed the precommit script to our `package.json` file in the root of our app
* This scripts is in your root `package.json` and it will run automatically whenever you push your commit to tell you if you code is good and clean and formatted properly, if not, you or your teammates won't be able to push to github which is a great way to ensure you code is written and structured well

```
// MORE CODE

"scripts": {
    "precommit": "pretty-quick --staged",

// MORE CODE
```

## Run husky with:
`$ npm run precommit`

* You will see if there are any bad formed pieces of code before you commit

## Add and Commit
* While in the root of your project, use git to add and commit

`$ git add -A`

`$ git commit -m 'add react'`

* If all goes well you will see this kind of message in the terminal

![husky message](https://i.imgur.com/rF5ezhd.png)

* Husky won't let you commit if your code is not formatted properly by prettier

## Run both the client and server in the same terminal
`$ npm run dev`

* Client (React) is running `localhost:3000`
* Server (Express) is running `localhost:4444`

## Additional Resources
* [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html)
* [The constructor is dead!](https://hackernoon.com/the-constructor-is-dead-long-live-the-constructor-c10871bea599)
* [more on husky](https://blog.vanila.io/pre-commit-git-hooks-with-husky-b2fce57d0ecd)
* [create react app 2](https://blog.bitsrc.io/introducing-create-react-app-version-2-0-6667aee5db17)

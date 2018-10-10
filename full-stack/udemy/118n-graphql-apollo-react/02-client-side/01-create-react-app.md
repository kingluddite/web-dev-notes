# Create React App
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

### Good app organization
* We have a folder called `server` that holds all our server side stuff (`Node.js`, `Express`, `Mongoose`)
* We also have a folder called `client` that holds all our client side stuff (`React`)

### Start up React

`$ cd client && npm start`

## Conflicts up the tree
* Create react app has certain dependencies and you can run into conflicts if you have other `node_modules` in your project
  - In our app we have `node_modules` in 3 places
    + root, server and client
* To avoid conflicts make sure your root package.json looks like this:

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

#### Add script for `pretty-quick` and `husky`
* Then add the precommit script to your `package.json` file:
* Both packages were already installed
* Put this in your root `package.json`

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

* Client (react) is running `localhost:3000`
* Server (Express) is running `localhost:4444`

## Additional Resources
* [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html)
* [The constructor is dead!](https://hackernoon.com/the-constructor-is-dead-long-live-the-constructor-c10871bea599)

## Maybe don't need the next eslint and prettier stuff
## Eslint and Prettier
* If you try to make changes to a component inside `client` you will see that we are not formatting our code properly
* We need to use prettier and eslint inside our `client`
* [great documentation on installing eslint and prettier inside vs-code](https://medium.com/technical-credit/using-prettier-with-vs-code-and-create-react-app-67c2449b9d08)
* Assumes your are using `Create React App`, `Yarn` and `Visual Studio Code`
* Please note that Create React App will not show any Prettier errors in the browser console or terminal output. The errors will only be shown in Visual Studio Code

### Install Prettier and the ESLint Plugin
`$ yarn add --dev --exact prettier`

`$ yarn add --dev eslint-plugin-prettier`

### Install the Prettier and ESLint VS Code Extensions
* [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Create ESLint Configuration file

`.eslintrc`

```
{
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### Create Prettier Configuration file

`.prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### Apply Prettier Formatting on Save (Optional)
* You most likely want to apply the Prettier formatting whenever you save your files

`"editor.formatOnSave": true`

### Prevent Prettier Violations from being Committed (Optional)
* Go up one directory (app root)

`$ cd ../`

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add react`

## Push to github
`$ git push origin add-react`

## Additional Resources
* [more on husky](https://blog.vanila.io/pre-commit-git-hooks-with-husky-b2fce57d0ecd)

# Create React App
## Stop server
`ctrl` + `c`

## Did you install create react app yet?
* [create-react-app repo](https://github.com/facebook/create-react-app)

`$ npm i -g create-react-app`


**note** You may get permissions error so just run it as `sudo`

`$ sudo npm i -g create-react-app`

* Enter your OS password to install app
* This is a global install and only needs to be done once on your computer
* Once `create-react-app` is installed you can easily create a working boilerplate of a react app

## Install react app
`$ create-react-app client`

`$ cd client`

`$ npm install`

### Faster way (saves a step)
* Will download and install client react packages
* **note** npx comes with `npm 5.2+` and higher
* One of the benefits of npx is that you don't have to install global apps like create-react-app and this will go out and grab your repo and install it for you (big time saver)

`$ npx create-react-app client`
`$ cd client`
`$ npm start`

* You will see your react app working with boilerplate css

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

#### Add script for `pretty-quick` and `husky`
* Then add the precommit script to your `package.json` file:
* Both packages were already installed

```
// MORE CODE

"scripts": {
    "precommit": "pretty-quick --staged",

// MORE CODE
```

## Add and Commit
* If all goes well you will see this kind of message in the terminal

![husky message](https://i.imgur.com/rF5ezhd.png)

* Husky won't let you commit if your code is not formatted properly by prettier

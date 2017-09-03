# Tools
* Tools to make Pug easier to work with

## pug-lint
### `pug-lint` for Atom
* language-pug (_syntax highlighting_)

`.pug-lintrc` [github](https://www.npmjs.com/package/pug-lint)

```
{
  "extends": "./node_modules/coding-standard/.pug-lintrc",
  "disallowIdLiterals": null
}
```

* You need to have `Node.js` installed
* Install `pug-lint` globally

`$ npm install -g pug-lint`

## Emmet and Pug work well together

#### Sublime Text 3
If you use SublimeLinter 3 with Sublime Text 3, you can install the SublimeLinter-pug-lint plugin using Package Control.

#### Atom
If you use Atom, you can install the `linter-pug` package.

#### VS Code
If you use `VS Code`, you can install the `vscode-puglint` extension.

* Atom Text Editor
To get pug and emmet to play nice open `config.json` and add

```
"file-types":
    pug: "source.jade"
```

Just like this:

![add pug to emmet](https://i.imgur.com/yI8EAKV.png)

### Emmet to the rescue
**! + [tab]**

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Document
body
```

**ul.dogs>li.dog.dog.$$*10**

```
ul.dogs
  li.dog.dog.01
  li.dog.dog.02
  li.dog.dog.03
  li.dog.dog.04
  li.dog.dog.05
  li.dog.dog.06
  li.dog.dog.07
  li.dog.dog.08
  li.dog.dog.09
  li.dog.dog.10
```

## Mongod troubleshoot
* Find what is running
`$ lsof -Pi | grep LISTEN`

* Kill the node process with extreme prejudice

`$ kill -9 $PID`

## Adding ESLint to this project
* Replace your `package.json` content with this content:

`package.json`

```json
{
  "name": "the-retail-apocalypse",
  "version": "0.0.0",
  "private": true,
  "engines": {
    "node": ">= 7.6.0"
  },
  "scripts": {
    "watch": "nodemon ./start.js --ignore public/",
    "start": "concurrently \"npm run watch\" \"npm run assets\" --names \"💻,📦\" --prefix name",
    "assets": "webpack -w --display-max-modules 0"
  },
  "browserslist": "last 2 versions",
  "dependencies": {
    "axios": "0.15.3",
    "body-parser": "1.17.1",
    "connect-flash": "0.1.1",
    "connect-mongo": "1.3.2",
    "cookie-parser": "1.4.3",
    "dompurify": "0.8.5",
    "dotenv": "4.0.0",
    "es6-promisify": "5.0.0",
    "express": "4.15.2",
    "express-session": "1.15.1",
    "express-validator": "3.1.2",
    "faker": "4.1.0",
    "forever": "0.15.3",
    "glob": "7.1.1",
    "html-to-text": "3.2.0",
    "jimp": "0.2.27",
    "juice": "4.0.2",
    "md5": "2.2.1",
    "moment": "2.17.1",
    "mongoose": "4.8.7",
    "mongoose-mongodb-errors": "0.0.2",
    "multer": "1.3.0",
    "nodemailer": "3.1.5",
    "passport": "0.3.2",
    "passport-local": "1.0.0",
    "passport-local-mongoose": "4.0.0",
    "pug": "2.0.0-beta6",
    "slugs": "0.1.3",
    "uuid": "3.0.1",
    "validator": "7.0.0"
  },
  "devDependencies": {
    "autoprefixer": "6.7.7",
    "babel-core": "6.24.0",
    "babel-loader": "6.4.0",
    "babel-preset-es2015": "6.24.0",
    "concurrently": "3.4.0",
    "css-loader": "0.27.3",
    "extract-text-webpack-plugin": "2.1.0",
    "node-sass": "^4.0.0",
    "nodemon": "1.11.0",
    "postcss-loader": "1.3.3",
    "sass-loader": "6.0.3",
    "webpack": "2.2.1",
    "eslint": "^4.4.1",
    "eslint-config-airbnb": "^15.1.0",
    "eslint-config-prettier": "^2.3.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^5.1.1",
    "eslint-plugin-prettier": "^2.1.2",
    "eslint-plugin-react": "^7.2.1",
    "prettier": "^1.5.3"
  }
}

```

## Run `$ yarn install`
* That will add all the necessary ESLint modules
* Add this `.eslintrc` file to the route of your site

`.eslintrc`

```
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "comma-dangle": ["error", "never"],
  }
}
```

## Install Sublime Text packages (Assuming you are using Sublime Text)
* Add the `SublimeLinter` package
* Add the `SublimeLinter-contrib-eslint` package
* Close all open files inside your text editor (Sublime Text)
* Shut down and Start up Sublime Text
* Open a JavaScript file and you should see that ESLint is working and gives you 

## That should do the trick
* If you still don't see it, you'll have to troubleshoot

## Install JSON Viewer Chrome Extension
Makes your JSON look pretty

![add JSON Viewer to Chrome](https://i.imgur.com/OCYbfQS.png)

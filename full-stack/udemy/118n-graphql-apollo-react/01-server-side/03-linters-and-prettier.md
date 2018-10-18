## Install Prettier and ESLint
* We need to prevent mistakes and cut down on writing bad code
* Linters help us with this
* We'll be using eslint and prettier as they work really well together
* If you are using eslint, prettier and VS Code together [watch this video](https://www.youtube.com/watch?v=YIvjKId9m2c) for a recommended install procedure
* I recommend using ESLint in all your projects

## Basic install
* We will use a bare minimum .eslintrc and prettier setup
* User the terminal to get to the root of your app

`$ cd ../`

* You should now be in the root of your project
* In the root of your project create `.eslintrc` and `.prettierrc`

`$ touch .eslintrc .prettierrc`

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

`.prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### Create a `package.json` in the root of your project
`$ npm init -y`

`package.json`

```
// MORE CODE
"devDependencies": {
   "eslint-plugin-prettier": "^2.6.2",
   "husky": "^0.14.3",
   "prettier": "^1.14.2",
   "pretty-quick": "^1.6.0"
 }
```

* **note** Depending on where you place `devDependencies` you may need a comma, here's where I placed it:

`package.json`

```
{
  "name": "118e-five-star-cologne",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
"devDependencies": {
   "eslint-plugin-prettier": "^2.6.2",
   "husky": "^0.14.3",
   "prettier": "^1.14.2",
   "pretty-quick": "^1.6.0"
 },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### Intall new packages with `npm`
* Since we manually added npm packages to our `package.json` we need to install them manually using:

`$ npm i` (short form of `$ npm install`)

### Tip for linters
* Sometimes you won't see your file update
* I suggest tabbing a line and then saving as that kick starts the linter into doing it's job

### Questions about `package.json`
* Where do we put them?
* You have a `backend` folder with all your backend stuff but outside of that is where all your backend packages will be stored in the `package.json`
* All the **React** packages will be stored in a `package.json` file residing inside the `client` folder

```
backend
    - backend stuff
client
    package.json (all react packages)
package.json
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add basic linters`

## Push to github
`$ git push origin add-apollo`


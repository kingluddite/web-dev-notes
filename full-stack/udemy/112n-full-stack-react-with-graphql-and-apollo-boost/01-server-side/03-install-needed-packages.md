# Install Needed Packages
* Node
    - This will also install NPM (Node Package Managers)
* [Git](https://git-scm.com/downloads)
    - Or install with [homebrew](https://brew.sh/)
        + Mac only
* Code Editor
    - [VS Code](https://code.visualstudio.com/download) is recommended
* [mLab](https://mlab.com/)(for mongo DB) - sign up
* [Heroku](https://signup.heroku.com) (for deployment) - Sign up
* Download React Developer Tool
    - Chrome browser
        + Window > Extensions > hamburger icon > open chrome webstore > search for [react dev tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US)

## Install Prettier and ESLint
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

### Add this to `package.json`
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

#### Intall new packages with `npm`
`$ npm install`

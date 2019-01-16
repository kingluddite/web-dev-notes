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
frontend
    package.json (all react packages)
package.json
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add basic linters'`

## Push to github
`$ git push origin master`

## Additional Resources
* [wes bos tutorial setting up vs code with eslint and prettier](https://www.youtube.com/watch?v=YIvjKId9m2c)

### Resources
* Configs for `eslint` and `prettier`
* You can use the above code for barebones eslint and prettier or you can use the more complete linter like ones by Wes Bos

* Add to `package.json`

```
// MORE CODE
"devDependencies": {
  "eslint": "^5.3.0",
  "eslint-config-airbnb": "^17.0.0",
  "eslint-plugin-import": "^2.13.0",
  "eslint-plugin-jsx-a11y": "^6.1.1",
  "eslint-plugin-react": "^7.10.0",
  "react-testing-library": "^4.1.7"
}
// MORE CODE
```

* Or install them with `npm`

`$ npm i -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react react-testing-library prettier eslint-plugin-prettier husky pretty-quick`

## You can have multiple `.eslintrc` files but they will cascade
* To start off put `.eslintrc` in the root of your app
* Once you add these you will have much more strict React rules
  - (One example of what you'll have to add) You'll need to add PropTypes

#### Wes Bos
`.eslintrc`

```
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "impliedStrict": true,
      "classes": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "jquery": true,
    "jest": true
  },
  "rules": {
    "no-debugger": 0,
    "no-alert": 0,
    "no-unused-vars": [
      1,
      {
        "argsIgnorePattern": "res|next|^err"
      }
    ],
    "prefer-const": [
      "error",
      {
        "destructuring": "all",
      }
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "no-unused-expressions": [
      2,
      {
        "allowTaggedTemplates": true
      }
    ],
    "no-param-reassign": [
      2,
      {
        "props": false
      }
    ],
    "no-console": 0,
    "import/prefer-default-export": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/display-name": 1,
    "react/no-array-index-key": 0,
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "react/no-unescaped-entities": 0,
    "jsx-a11y/accessible-emoji": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "radix": 0,
    "no-shadow": [
      2,
      {
        "hoist": "all",
        "allow": [
          "resolve",
          "reject",
          "done",
          "next",
          "err",
          "error"
        ]
      }
    ],
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 100,
      }
    ],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        "aspects": [
          "invalidHref"
        ]
      }
    ]
  },
  "plugins": [
    "prettier"
  ]
}
```

## Scott Tolinski
`.eslintrc.js`

```js
module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true
  },
  "settings": {
        "ecmascript": 6,
        "jsx": true
  },
  "parserOptions": {
      "ecmaVersion": 2017,
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "experimentalDecorators": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react",
  ],
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0,
  },
  "globals": {
      "test": true,
      "expect": true,
      "afterEach": true
  }
};
```

### add rules to `.eslintrc`
```
// MORE CODE

"extends": "airbnb",
"rules": {
  "react/jsx-filename-extension": 0
}

// MORE CODE
```

## Eslint disable one line
`// eslint-disable-line`

## Eslint more specific disable line
`// eslint-disable-line react/no-did-mount-set-state`

## Eslint turn off for entire page
`/* eslint react/no-did-mount-set-state: 0 */`

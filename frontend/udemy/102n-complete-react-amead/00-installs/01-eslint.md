# eslint
## Add eslint
* [This is a great article](https://medium.com/@eliotjunior/prettier-eslint-facebook-code-quality-the-auto-magical-react-styling-tutorial-19481acb10dd) to get React, eslint, prettier set up

`$ ./node_modules/.bin/eslint --init`

* That will ask you a bunch of questions to help create a file that looks like this:

`eslintrc.json`

```js

{   "globals": {
        "document": true,
        "window": true,
        "localStorage": true
    },
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "arrowFunctions": true,
        "binaryLiterals": false,
        "blockBindings": true,
        "classes": true,
        "defaultParams": true,
        "destructuring": true,
        "forOf": true,
        "generators": true,
        "modules": false,
        "objectLiteralComputedProperties": true,
        "objectLiteralDuplicateProperties": false,
        "objectLiteralShorthandMethods": true,
        "objectLiteralShorthandProperties": true,
        "octalLiterals": false,
        "regexUFlag": false,
        "regexYFlag": false,
        "restParams": true,
        "spread": true,
        "superInFunctions": true,
        "templateStrings": true,
        "unicodePointEscapes": true,
        "globalReturn": false
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prop-types": 0,
        "semi": ["error", "never"],
        "no-console": "off",
        "arrow-parens": [2, "as-needed", { "requireForBlockBody": false }],
        "max-len": ["error", 500],
        "no-param-reassign": "off",
        "no-undef": "off",
        "arrow-body-style": "off",
        "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
        "linebreak-style": "off",
        "newline-per-chained-call": "off",
        "prefer-stateless-function": [0, { "ignorePureComponents": true }],
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "no-unneeded-ternary": "off",
        "no-plusplus": "off",
        "react/jsx-no-bind": [0, {"allowBind": true}],
        "class-methods-use-this": ["error", { "exceptMethods": ["setToken", "getProfile", "getToken", "logout"] }] 
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
}
```

## lint-staged
* I had `prettier` doing this but it was generating lots of errors I couldn't fix without it reverting to the error
* I switched to pure `eslint --fix` and it now works

`package.json`

```json
// // MORE CODE
"scripts": {
  "serve": "live-server public/",
  "build": "webpack --watch",
  "lint": "eslint verbose --fix src/*.js",
  "pretest": "npm run lint",
  "dev-server": "webpack-dev-server",
  "precommit": "lint-staged",
  "eslint-check": "eslint --print-config .eslintrc.js | eslint-config-prettier-check"
},
"lint-staged": {
  "*.js": [
    "eslint --fix", "git add"
  ],
  "*.css": "stylelint",
  "*.scss": "stylelint --syntax=scss"
},
// // MORE CODE
```

## My eslint rules (variation of eslint setup)

`.eslintrc`

```json
{
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react"
  ],
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "es5",
      // "bracketSpacing": false,
      "jsxBracketSameLine": true,
    }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "comma-dangle": ["error", "only-multiline"],
    "no-underscore-dangle": [0],
    "semi": [2, "always"],
    "react/prop-types": 0,
    "react/jsx-boolean-value": 0,
    "no-console": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }],
    "consistent-return": 0,
    "array-callback-return": 0,
  },
  "plugins": [
    "flowtype",
    "react",
    "jsx-a11y",
    "import",
    "prettier"
  ],
  "settings": {
    "ecmascript": 7,
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "modulesDirectories": ["node_modules"]
      }
    }
  },
  "globals": {
    "__DEVELOPMENT__": true,
    "__CLIENT__": true,
    "__SERVER__": true,
    "__DISABLE_SSR__": true,
    "__DEVTOOLS__": true,
    "socket": true,
    "mixpanel": true,
    "Raven": true,
    "isCallback": true,
    "returnsPromise": true,
    "webpackIsomorphicTools": true
  }
}
```



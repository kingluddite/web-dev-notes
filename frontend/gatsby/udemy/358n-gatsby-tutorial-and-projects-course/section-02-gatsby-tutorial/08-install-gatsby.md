# Install gatsby
`$ npm i -g gatsby-cli`

1. CD directory
2. `$ gatsby new <PROJECT NAME> <STARTER> - default`
3. We will install the `Hello World Starter`

`$ gatsby new <NAME> https://github.com/gatsbyjs/gatsby-starter-hello-world`

## Commands
```
gatsby develop
gatsby build
gatsby serve
gatsby clean
```

* https://www.gatsbyjs.org/
* Click Docs
* Click Starter Library
* Search starters for 'hello world'
* Click and you'll see - https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-hello-world/
* Copy and paste the URL

`$ gatsby new gatsby-starter-hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world`

* Execute the line and you'll see 2 URLs

`$ cd gatsby-starter-hello-world`

## Run dev mode
`$ gatsby develop`

* You will see 2 links
    - One to GraphQL - http://localhost:8000/___graphql
    - One to the dev URL running the site - http://localhost:8000/

## folders
* `public` - holds our production ready app
* `src` - where we do our development
    - We'll setup
        + Our pages
        + Our components
        + Our queries

## deployment
* When we're ready we'll run `$ gatsby build`
    - This will create our production ready application in the `public` folder

## static
* Interesting folder
* We can put assets inside here
    - We could put our stylesheets and images inside here
    - Once we place them inside `static` they will be automatically available inside teh `public` folder
        + There is a problem with this because behind the scenes Gatsby is using webpack
            * And if you are just placing your assets inside the `static` folder **webpack** WILL NOT PROCESS THEM (and this will in turn make you lose all the benefits Gatsby gives you - example: image optimization)
            * **BEST PRACTICE** Even though you can place assets directly inside `static` and they will be immediately available inside the `public` folder the Gatsby team openly discourages this in their own documentation

## .prettierignore and .prettierrc
* This works with the prettier package that gatsby comes installed with

## gatsby-config.js
* Used to setup all our gatsby plugins

## package.json
* Is just a "manifest" file
    - Since gatsby is a node application
    - You can run the `format` command `$ npm run format` and it will format your code
    - **BETTER WAY** Install the Prettier Extension `Prettier - Code formatter`
        + Does same thing but you don't need to run the `format` command
            * And every time you paste or save your code will be formatted for you
            * `cmd` + `,` to open settings and search for "paste" and click checkbox (and also search for `Save` and check Format on Save)

![format on paste](https://i.imgur.com/cArY8Kz.png)

## single quotes for prettier
`.prettierrc`

## Add eslint to gatsby
* https://github.com/mongkuen/gatsby-plugin-eslint
* Follow the `npm` instructions

### Create .eslintrc file
`.eslintrc`

* Point out jsx rule fix - `https://stackoverflow.com/questions/43031126/jsx-not-allowed-in-files-with-extension-js-with-eslint-config-airbnb`

```
{
  "extends": ["airbnb", "prettier", "prettier/react"],
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
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "es5",
        // "bracketSpacing": false,
        "jsxBracketSameLine": true
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "comma-dangle": ["error", "only-multiline"],
    "react/no-danger": "off",
    "no-underscore-dangle": [0],
    "react/prop-types": 0,
    "react/jsx-boolean-value": 0,
    "no-console": 0,
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to"]
      }
    ],
    "consistent-return": 0,
    "array-callback-return": 0
  },
  "plugins": ["flowtype", "react", "jsx-a11y", "import", "prettier", "html"],
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

* Make sure to install these two packages:

`$ npm i eslint-plugin-html eslint-plugin-prettier eslint-loader -D`


## Our scripts
`package.json` scripts

```
// MORE CODE

"scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1"
  },
// MORE CODE
```

## `$ gatsby clean`
* Make sure to first stop Gatsby with `ctrl` + `c`
* If you remove an image, your code is working, and your app breaks
* It was working a second ago and it just broke
* This could be from a strange `caching` error
* Run `$ gatsby clean` to fix these strange errors

### What does `$ gatsby clean` do?
* It wipes `.cache` and `public` folders
* Then `$ gatsby develop` and hopefully you app is working again
* If it still doesn't work, you need to then troubleshoot (gatsby clean won't fix all your errors)

## Run our build app
`$ gatsby build`

* Run this to create your Gatsby production ready app

## Gatsby serve
`$ gatsby serve`

`http://localhost:9000`


{
  "arrowParens": "always",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}

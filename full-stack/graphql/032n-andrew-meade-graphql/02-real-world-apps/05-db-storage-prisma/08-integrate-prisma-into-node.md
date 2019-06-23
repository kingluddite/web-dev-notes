# Integrating Prisma into a Node.js Project
* Big Picture Goal
    - Allow our Node.js app to read and write to our postgres db
    - Currently Prisma can read/write to our postgress db
    - Now we need to figure out how to allow `Node.js` to interact with this API because once Node.js can read/write to this GraphQL API Node.js will be able to interact with the postgres db

## Moving folders
* Copy everything inside `graphql-basics` into `graphql-prisma`
    - Inside graphql-basic copy
        + node_modules
        + src/
        + .babelrc
        + package.json
        + package-lock.json
    - Paste them into `graphql-prisma`

![folder structure now](https://i.imgur.com/f5rnhRM.png)

## prisma-binding
* Gives us bindings for `Node.js`
* Gives a set of `Node.js` methods that we can use that we can use to interact with our Prisma GraphQL API
* [prisma-binding docs](https://github.com/prisma/prisma-binding)

### Review steps of how prisma-binding works
1. Configure your `Node.js` application to link to that endpoint

```
// Instantiate `Prisma` based on concrete service
const prisma = new Prisma({
  typeDefs: 'schemas/database.graphql',
  endpoint: 'https://us1.prisma.sh/demo/my-service/dev',
  secret: 'my-super-secret-secret'
})
```

2. Interact with the API

```
// Retrieve `name` of a specific user
prisma.query.user({ where: { id: 'abc' } }, '{ name }')

// Retrieve `id` and `name` of all users
prisma.query.users(null, '{ id name }')

// Create new user called `Sarah` and retrieve the `id`
prisma.mutation.createUser({ data: { name: 'Sarah' } }, '{ id }')

// Update name of a specific user and retrieve the `id`
prisma.mutation.updateUser({ where: { id: 'abc' }, data: { name: 'Sarah' } }, '{ id }')

// Delete a specific user and retrieve the `id`
prisma.mutation.deleteUser({ where: { id: 'abc' } }, '{ id }')
```

* We are using methods like `prisma.query.user()` to query a user and `prisma.mutation.createUser()` to interact with the Prisma GraphQL API
* Every time we do this from `Node.js` we are actually reading and writing to our db
* This `prisma-binding` library was created by people at Prisma and is a must have when working with Prisma and `Node.js`

## Install and set up prisma-binding
* Make sure you are in the `graphql-prisma` directory

`$ npm i prisma-binding`

### Create `src/prisma.js`
* This is where where we will store all the code required to actually connect our ``Node.js`` app to the Prisma GraphQL API

`src/prisma.js`

```
import { Prisma } from 'prisma-binding';
```

* We import a **named export** "Prisma" (Prisma is a constructor function we can use to create a connection to a Prisma endpoint)

## graphql-cli
* [documentation](https://github.com/graphql-cli/graphql-cli)
* A simple Command Line Interface
    - Gives us around a dozen commands for performing common tasks
        + One such common task is fetching the schema for a given API
            * We need to do that so we can provide it inside our Prisma configuration object
            * How can we do this? 
                + We will do it the same way GraphQL Playground does it (it somehow grabs that info and shows us via the tabs in GraphQL Playground) - we just need a way to do that from our GraphQL project itself and that's exactly what the graphql-cli enables us to do

`src/prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: '',
  endpoint: 'localhost:4466'
})
```

* The only command we care about is `graphql get-schema`
    - Download schema from endpoint
    - This will enable us to fetch the schema and save it as a file to our project

## Install graphql-cli
`$ npm i graphql-cli`

### 2 things we need to do
1. Add a single new file into our project `/.graphqlconfig`
    * This is just a little configuration file telling `get-schema` where:
        - It can find the schema it will be fetching
        - And where in the project it can be saving that file
2. Set up a single new script in `package.json`
    * The script will be very simple
    * We are just going to run the `get-schema` command

## .graphqlconfig
* Must live in the root of the project
    - This will be a JSON configuration file where we provide those 2 pieces of information
        1. Where does the schema live?
        2. Where should it be saved?

## VS Code Syntax and Format Tip
* You need to tell VS Code that this file needs to be treated as JSON as far as syntax highlighting and formatting
    - You can accomplish this via the **Command Palette**
        + keyboard shortcut: ⌘ + ⇧ + P
        + Search for "language" (Select "Change Language Mode")
        + Choose "JSON"

## Add eslint

### .eslintrc
* Add in root of project

`.eslintrc`

```
{
  "extends": [
    "airbnb",
    "prettier"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
     "ecmaVersion": 2018,
     "sourceType": "module",
     "ecmaFeatures": {
       "impliedStrict": true,
       "classes": true,
       "modules": true
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
    "no-await-in-loop": 0,
    "no-return-assign": [
      "error",
      "except-parens"
    ],
    "no-restricted-syntax": [
      2,
      "ForInStatement",
      "LabeledStatement",
      "WithStatement"
    ],
    "no-unused-vars": [
      1,
      {
        "ignoreSiblings": true,
        "argsIgnorePattern": "res|next|^err"
      }
    ],
    "prefer-const": [
      "error",
      {
        "destructuring": "all"
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
    "react/require-default-props": 0,
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
        "printWidth": 80
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

## Add eslint and prettier dev-dependencies

* Install the following:

`package.json`

```
// MORE CODE

  "devDependencies": {
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "eslint-config-with-prettier": "^6.0.0",
    "eslint-plugin-prettier": "^3.1.0",
    "nodemon": "^1.19.0"
  }
}
```

* If you want to install them

`$ npm i eslint-config-with-prettier eslint-plugin-prettier eslint -D`

`.graphqlconfig`

```
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "endpoints": {
          "default": "http://localhost:4466"
        }
      }
    }
  }
}
```

* We set up a root property called 'projects'
    - We only have one project but we are still required to set up the `projects` object
    - We find the name for that one project we have `prisma` (we could call it whatever we want but `prisma` seems to work nicely)
    - Then we define the actual configuration for that project
        + The `schemaPath` property (this will be the path where the file should be saved)
            * We currently don't have a place reserved for this
            * But what is common to create a `generated` folder inside `src` (this is where we will store generated code (like the file we are about to download))
                - **note** Lots of current GraphQL project use this structure
                - Provide the path from the root of our project
                    + It is common to name this file `prisma.graphql`
                    + `"schemaPath": "src/generated/prisma.graphql"` (this is where we will have the actual type definitions saved and this path is the same path we will use in a moment in .graphqlconfig)
        + We also have to specify the endpoint (in our case it is `localhost:4466`)
            * We also have to provide an `extensions` property
            * We can define several things inside `extensions`
                - We will define an `endpoints` property and inside that we'll define a default `endpoint`
    
```
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "endpoints": {
          "default": "http://localhost:4466"
        }
      }
    }
  }
}
```

* We need to use the actual URL to our endpoint which is:

`http://localhost:4466/`

* **note** You do have to specify the protocol (`http`)
    - When we go to production we will use `https`
* That's it! Our file is now configured

## generated folder
* Create this inside `src/generated`

## Update prisma.js
`src/prisma.js`

* Now we link to that file that was just saved

`typeDefs: 'src/generated/prisma.graphql'`


`src/prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'localhost:4466',
});
```

* Congrats! Everything is now configured
* The last step of the process is to set up our script in `package.json`

## package.json update
`package.json`

```
// MORE CODE

  "scripts": {
    "start": "nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1",
    "get-schema": "graphql get-schema -p prisma"
  },
// MORE CODE
```

* We have to provide the name of the project (we named our project 'prisma')
* We provide the project name via the `-p`

`"get-schema": "graphql get-schema -p prisma"`

## Run the new script
`$ clear`

* Followed by:

`$ npm run get-schema`

### When we run this it will:

1. Connect to that endpoint
2. It will fetch the schema
3. And it will store it in our application file `src/generated/prisma.graphql`

* **note** This generated file is much bigger than the `schema.graphql` file we created

#### Why is it so big?
Because everything we need for our GraphQL API to work lives inside this file

#### Will we ever make changes to this file?
* Never
* We make changes to this file
* The only time it changes is if we re-run that script `$ npm run get-schema` and re-fetch our schema
* If we were to the Prisma API (example: adding another Type into the mix or just adding a field onto one of these types, we would deploy using `$ prisma deploy`) and then we would fetch the updated schema running `$ npm run get-schema` again

## What did we accomplish?
* We have `prisma-binding` installed
* It has everything it needs to connect to the API

## Next
* Go through various examples of how we can now interact with the GraphQL API provided by Prisma right from inside of our `Node.js` file

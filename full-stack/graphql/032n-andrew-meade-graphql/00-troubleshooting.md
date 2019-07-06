# Troubleshooting Prisma

## If you can't access prod Prisma GraphQL Playground
* Make sure you set your secret as the environment variable on Heroku
    - Check that it is there with `$ heroku config`

## Search easily for words in your notes
`$ grep -nr 'Heroku CLI' .`

## DateTime error
"You are creating a required field but there are already nodes present that would violate that constraint.The fields will be pre-filled with the value `1970-01-01T00:00:00.000Z`."

* Fix wipe Database (if you are just testing)

`$ prisma reset && prisma deploy`

## Wondering why my datamodel.graphql file is actually generated as: datamodel.prisma?
* This was a small change that the Prisma team made a few months ago
* VS Code may have updated their syntax code coloring by now - check for yourself

* **note** Not sure why we do not see `default$default` db in pgAdmin

![user table in db](https://i.imgur.com/FzBdt8V.png)

* This has to do with your `docker-compose.yml` configuration file. You need to make sure that `schema: public` is removed

```
// MORE CODE

        databases:
          default:
            connector: postgres
            host: ec2-54-163-230-199.compute-1.amazonaws.com
            database: dai47unkm7qct2
            schema: public # REMOVE THIS LINE!!!!
            user: rygxsxbgcekbam
            password: 26ba370a37d77aa7d9238bdb3f00f3b1b5821ef8a47138f527408d0d28bd3984
            ssl: true
            rawAccess: true
            port: '5432'
            migrations: true
```

## Troubleshooting Prisma/Docker/GraphQL Playground
### Could not connect to server
* If you get this error `Could not connect to server at http://localhost:4466. Please check if your server is running.` make sure you run docker first
* If you get this error 
 
```
Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml`
```

## Couldn't connect to Docker daemon
* If you get this error: `ERROR: Couldn't connect to Docker daemon. You might need to start Docker for Mac.` Make sure you start Docker on your Mac (you should see the whale icon at the top of your Mac)
    - It will be orange when starting
    - Green when started

![how to view all rows in pgAdmin](https://i.imgur.com/3cZ6eoJ.png)

![view users](https://i.imgur.com/brkJXiN.png)

* How to view the docker container id `$ docker ps`

* How to view docker logs to find error `$ docker logs -f ENTER_DOCKER_CONTAINER_ID_HERE`

![view logs](https://i.imgur.com/ted4f1K.png)

```
// MORE CODE

        databases:
          default:
            connector: postgres
            host: ec2-54-163-230-199.compute-1.amazonaws.com
            database: dai47unkm7qct2
            schema: public
            user: rygxsxbgcekbam
            password: 26ba370a37d77aa7d9238bdb3f00f3b1b5821ef8a47138f527408d0d28bd3984
            ssl: true
            rawAccess: true
            port: '5432'
            migrations: true
```

* After troubleshooting run these two commands:

`$ docker-compose up -d` and `$ prisma deploy`

* Than visit: `http://localhost:4466/` and you will see GraphQL Playground

Terminal Output:
## Error: Cannot find module '../lib/cli'
* Terminal Output:

```
Error: Cannot find module '../lib/cli'
```

### Solution:
cd your_project_folder 
rm -rf node_modules 
npm install

* Description:
Possibly caused by copying and pasting the node_modules folder

## If you are getting the @babel/polyfill error
* You should upgrade with the changes I used
* But if you see:

```
@babel/polyfill is loaded more than once on this repo. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do not need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning
```

* Just change your import from:

`index.js`

```
import @babel/polyfill
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { fragmentReplacements, resolvers } from './resolvers/index';

// MORE CODE
```

* To

```
import @babel/polyfill/noConflict
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { fragmentReplacements, resolvers } from './resolvers/index';

// MORE CODE
```

## Error - " TypeError: Cannot read property 'bindings' of null"
* bug - with version 24 of jest

### Temp Solution - downgrade to Jest 23
`$ npm i jest@23.0`

* **note** Must use jest version 23 until this is fixed

## Getting jest on its own server to test suites to work
I still was getting lots of various errors. In order to get this working I had to do the following:

Was also getting node type SpreadProperty has been renamed to SpreadElement warning

I removed the following to do a clean install:

`$ rm -rf package-lock.json node_modules`

I was using jest 23 and I upgraded to jest 24

Made my `.babelrc` look like this:

```
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

These are my scripts in `package.json`

```
// more code  
"scripts": {
    "start": "node dist/index.js",
    "heroku-postbuild": "babel src --out-dir dist --copy-files",
    "dev": "env-cmd -f ./config/dev.env nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "env-cmd -f ./config/test.env jest --watch",
    "get-schema": "graphql get-schema -p prisma --dotenv config/dev.env"
  },
  "jest": {
    "globalSetup": "./tests/jest/globalSetup.js",
    "globalTeardown": "./tests/jest/globalTeardown.js"
  },
// more code
```

I ran `$ npm audit fix`

I installed `$ npm i @babel/plugin-proposal-object-rest-spread babel-jest @babel/preset-env jest@24.8.0 -D`

I ran `$ npm run test`

## Error "ReferenceError: regeneratorRuntime is not defined" in Jest:
`.babelrc`

```
{
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-runtime"]
    }
  },
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread"
  ]
}
```

`$ npm install --save-dev @babel/plugin-transform-runtime`

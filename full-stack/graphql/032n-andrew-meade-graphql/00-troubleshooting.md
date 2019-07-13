# Troubleshooting Prisma
## If you get a strange error after installing new modules
* Make sure to stop the server and restart it so that it is using the latest modules installed

## Checklist
* Make sure to start your Docker container (use alfred app)
* Is your `localhost:4000` GraphQL Playground running? `$ npm run dev`
* Is your pgAdmin open? (use alfred app)
* Do you need to see your Test Production docs? `localhost:4466`
  - Did you generate a token?
  `$ cd prisma && prisma token -e ../config/test.env`
    + Use if you get this error message "Your token is invalid. It might have expired or you might be using a token from a different project." 
* Are you running jest? `$ npm run test`

## Error - ECONNREFUSED
```
This graphql-yoga server is running
[Network error]: FetchError: request to http://localhost:4466/default/default failed, reason: connect ECONNREFUSED 127.0.0.1:4466
```

* Did you start your docker container?

## A valid SECRET can't be found
* Still having issues with this - had to hard code values in prisma.yml to get it to work in environments (TODO)
  - I than ran `$ prisma token` (in prisma folder)
  - Grabbed the token and used it in HTTP HEADERS as authorization token
    + I was then able to see the docs tab
* [Here is the solution](https://www.prisma.io/forum/t/a-valid-environment-to-satisfy-prisma-secret-could-not-be-found/6976)

## error "a-valid-environment-to-satisfy-prisma-secret-could-not-be-found"
When I try to generate Prisma token, it keeps giving me the following error, even though I have the PRISMA_SECRET configured in dev.env.:

```
A valid environment variable to satisfy the declaration    
'env:PRISMA_SECRET' could not be found.
```

### Solution:
* You will need to run `$ prisma token -e dev.env` so that Prisma CLI can read your env file and generate the correct token.
* Right now CLI is not reading that file as you are not referencing it. We auto reference file named .env but for any other filename you will need to pass the -e flag manually.

```
heroku config --app prisma-dev-three-0619
```

```
heroku config:set PRISMA_ENDPOINT=https://kingluddite-blog-3736e1f779.herokuapp.com/kingluddite-blogging-app/prod --app prisma-dev-three-0619
```

```
heroku config:set JWT_SECRET=pj5uEjRvxrV62oQHxN0jPb23PpL1wjUU --app prisma-dev-three-0619
```

```
heroku config:set PRISMA_SECRET=z9tD9OI9G6eaI0fNriqLtXO1rKuat2zC --app prisma-dev-three-0619
```

* Make sure you login to Heroku and Prisma

## I don't see docs/schema tabs :4466 
* Create auth token

`$ cd prisma && prisma token`

## Can't connect to prisma docs
```
 ▸    [WARNING] in /Users/philiphowley/Documents/dev/graphql-stuff/032e-graphql-prisma/prisma/prisma.yml: A
 ▸    valid environment variable to satisfy the declaration 'env:PRISMA_ENDPOINT' could not be found.

 ▸    [WARNING] in /Users/philiphowley/Documents/dev/graphql-stuff/032e-graphql-prisma/prisma/prisma.yml: A
 ▸    valid environment variable to satisfy the declaration 'env:PRISMA_SECRET' could not be found.

There is no secret set in the prisma.yml
```

### Solution
* You need to add your config folder with files with connection info

## list heroku apps

lists heroku apps `$ heroku apps`

```
$ heroku pg:killall --app prisma-dev-three-0619
```

To many connections

## May need to recreate another server connection
* If switching computers

## Tests don't show up
* Type `a` to run all tests

## Error 
* `GraphQL error: request to http://localhost:4466/default/test failed, reason: connect ECONNREFUSED 127.0.0.1:4466`

* Make sure you are running your app in docker

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

# Running the Client and the Server
* Kill the client `ctrl` + `c`
* Navigate back to the `server` directory `$ cd ../`

## How do we get the client and server to run together at the same time?
### Hard way
* Open a second terminal window
* `$ cd client`
* `$ npm start`
* Move to the other terminal window
* `$ npm run dev`

### Easy way
* We will make use of a little package called `concurrently`
* This will enable us to run two separate windows with a single command

### Two package.json files
* We now have two
    - One for all our backend assets for our server
    - One inside the `client` directory and it records all the dependencies of our front end app
        + And some of the different scripts it uses as well
* **important** To make sure we are working on the correct `package.json` file at any given time

### server package.json
* Make sure you are in the server `package.json` file

`package.json`

```
{
  "name": "server",
// more code
```

* Add a script

`package.json` (server)

```
// more code
 },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "client": "npm run start"
  },
// more code
```

* If we now ran `$ npm run client`, it would execute the command `$ npm run start` in the context of the `server` directory and that would just start up our Express server, which is NOT what we want
    - We want to start up our client server
    - So how do we run `$ npm run start` from within the `client` directory without being in the `client` directory
        + Here is the solution `"client": "npm run start --fix client`
            * This says run the command `npm run start` from within the `client directory`

## Combine two commands together by creating another command
`package.json` (server)

```
// more code
"scripts": {
  "start": "node index.js",
  "server": "nodemon index.js",
  "client": "npm run start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\""
},
// more code
```

* When we execute `concurrently` it will take both commands to the right of the word and execute both of them at the exact same time

## Escape!
* Why all the `\` (backslashes)?
    - To escape all the `"` double quote marks
    - **remember** JSON must use double quotes to be formatted properly

### Install `concurrently` as a npm module
* Make sure you are inside the `server` directory

`$ yarn add concurrently`

## Run both servers at same time
`$ npm run dev`

* In the terminal you will see the logs for both the client server and Express server shown
* Then browse to `localhost:5000/api/current_user` and you will see you are still logged in

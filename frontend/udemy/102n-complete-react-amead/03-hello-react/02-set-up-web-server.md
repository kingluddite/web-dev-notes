# Setup Web Server
* Have Chrome open
* Editor Open
* Terminal open

## Root project folder
`$ take indecision-app`

### public folder
* In root create `$ mkdir public`
    - This will hold all the assets we want to serve up
    - We're building a web app
        + So we'll use a single `index.html`
        + `$ touch public/index.html`

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Indecision App</title>
</head>
<body>
  <h1>Indecision App</h1>
</body>
</html>
```

## Serve up this stuff
* Serve up the public folder so we can view this in the browser

### Live Server
* Simple Development Web Server
* Will allow us to server up our public folder
* Comes with live reload (no browser refresh needed)
    - Later
        + More tools like:
            * **Express** for production
            * The **webpack dev server** for development

#### Why are we using Live Server?
* We use **Live Server** because it is super easy to install, use and get coding

#### Liver Server install
* Install globally
    - So we can access it from the command line
    - We already installed this

`$ yarn global add live-server`

* Gives us new command **live-server**
* Did live-server install correctly `$ live-server -v`
* Troubleshoot - sometimes yarn doesn't properly install modules globally
    - If this happens use npm with `$ npm install -g live-server`

### Run live-server
`$ live-server FOLDER` like this: `$ live-server public`

* That will run the server (opens browser window automatically)
* Change stuff inside your body tag of `index.html` and watch how the browser updates without a page refresh

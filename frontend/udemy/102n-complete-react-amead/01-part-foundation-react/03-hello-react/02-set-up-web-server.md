* Internal folder - 333e-indecision-app-02

# Setup Web Server
* Have Chrome open
* Editor Open
* Terminal open

## Root project folder
`$ take indecision-app`

## Make it obvious that we are working on the frontend
* Create a folder `.vscode`
  - Inside create `settings.json`

### .vscode/settings.json (Make sure this is a `.json` file!!!!!)
* This will add a nice yellow background to let you know you are working on the frontend

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeForeground": "#000",
    "titleBar.inactiveForeground": "#000000CC",
    "titleBar.activeBackground": "#FFC600",
    "titleBar.inactiveBackground": "#FFC600CC"
  }
}
```

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
* Serve up the `public` folder so we can view this in the browser

## Live Server
* Simple Development Web Server
* Will allow us to server up our `public` folder
* Comes with "live reload" (no browser refresh needed)
    - Later
        + More tools like:
            * **Express** for production
            * The **webpack dev server** for development

### Why are we using Live Server?
* We use **Live Server** because it is super easy to install, use and get coding

### Install live-server
* Install globally
    - So we can access it from the command line

`$ npm i -g live-server`

* Gives us new command **live-server**
* Did `live-server` install correctly?

`$ live-server -v`

#### Troubleshoot
* Sometimes `yarn` doesn't properly install modules globally
* If this happens use `npm` with `$ npm install -g live-server`

### Run live-server
* Now it is time to serve up our `public` directory:
  - It won't work if the `public` folder is not in the root of your react app folder

`$ live-server public`

* A browser window opens in `127.0.0.1:8080`
* signature - `live-server FOLDER`
    - That will run the server and open browser window automatically
    - Change stuff inside your body tag of `index.html` and watch how the browser updates **without a page refresh!!!!!**
* You may see a cached favicon from a previous project working on the same URL

## You should see this
![live-server working](https://i.imgur.com/OkSOFwL.png)


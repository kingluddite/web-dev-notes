# Introduction to Webpack Dev Server
* How does webpack fit into our overall architecture?
    - Currently we are running webpack manually
    - Getting tired running this build command every time

## How Webpack works in a server-based world
![how we are currently using webpack](https://i.imgur.com/kpIGdL3.png)

### Current Wepback workflow
1. We manually run webpack
2. Our files are being spit out to a single directory
3. We manually load `index.html` into the browser

### Let's improve our workflow
![better webpack workflow](https://i.imgur.com/AjCDFjD.png)

#### webpack-dev-server
* Another library
* The purpose of `webpack-dev-server` is to act as an intermediary between our browser and our webpack output
* We only have to start our server up one time
    - Once running `webpack-dev-server` will watch all our files and automatically rerun the build and reload our files anytime they change
    - It only updates the individual files that have changed, not everything
    - When we make changes we won't have to wait 10 minutes for a build, it will just be a fraction of a second
* Webpack will serve our `index.html` back to us so we won't have to open it up and refresh it
* Our browser will connect directly to `webpack-dev-server`
    - We don't have access to the 'guts' of this server
    - `webpack-dev-server` is only about developing a client-side web app single page app with zero server side logic
        + We don't get the opportunity to add any logic to `webpack-dev-server`

### So how can we:
* Access a Database?
* Deal with user authentication?
* Deal with web sockets?
* Or anything that usually gets handle by the server?

## How do we combine a traditional node server that also deals with database, auth, etc)?

![server and node](https://i.imgur.com/BXBJBek.png)

**note** There is a big difference between running a traditional server and webpack-dev-server



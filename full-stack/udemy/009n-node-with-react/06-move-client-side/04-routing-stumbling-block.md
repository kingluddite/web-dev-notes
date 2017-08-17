# Routing Stumbling block
* **note** We will tediously go through a simple example
    - The reason is very important to understanding how both servers work together

## Change root `.eslintrc` name to `off.eslintrc`
* That eslint is conflicting with create-react-app eslint

## Add link
* `Click here to sign in with google oauth`
* Not using React Router
* Simple `<a href="path">link</a>` link

`/client/src/App.js`

```
// more code
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello World</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="/auth/google">Sign In With Google</a>
      </div>
    );
  }
}
// more code
```

* We add a link with a relative route

## Test
* Start both servers (if not already)
* `$ npm run dev`

## Bad idea jeans!
* **remember** When you use a relative path the browser will default to thinking that link will link to a page with the same domain `localhost:3000`
    - But we want it to go to our server domain of `localhost:5000/google/auth`
    - Hover over the link and look at the bottom of the browser and you will see `localhost:3000/google/auth` which is NOT what we want

![relative path leads to wrong domain!](https://i.imgur.com/ArTXrKu.png)

## Manually specify the domain
`App.js`

```
// more code
 <a href="http://localhost:5000/auth/google">Sign In With Google</a>
// more code
```

### Test
* Hover over link now and you'll obviously see our correct `localhost:5000/auth/google` path
* Click the link (with Dev tools open on Network tab)
* We get kicked into the Google Auth flow
* And we eventually end back up on our server
* It works but it is not a good solution
    - Why?
    - Because this link will only work in our development environment on our local machine
    - When we deploy this app to Heroku, the link will no longer work
    - In other words, in the production environment, the link will not work the way we want it to
    - This is a HUGE stumbling block
    - We don't want to have to change every absolute link when we change the environment
        + Just think how much of a headache and waste of time that would be!

### What about adding keys and using that to determine URL for environment?
* That still would be too much work
* I want to keep my life as an OAuth developer as easy as possible
* I want to use relative links and when I click on that relative link, it will take me to the OAuth flow

### Solution
* Very simple fix to make the backend server and front end server work nicely together
* It is simple to implement
    - But how it works is pretty crazy - It does a ton of stuff
* Change link back to a relative path

`App.js`

```
// more code
<a href="http://localhost:5000/auth/google">Sign In With Google</a>
// more code
```

## Open `package.json` in the CLIENT! directory `client`

`package.json` (client)

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-scripts": "1.0.11"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

* Add this small piece of code

```
// more code
"proxy": {
  "/auth/google": {
    "target": "http://localhost:5000"
  }
},
// more code
```

* Which will make it look like this:

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": {
    "/auth/google": {
      "target": "http://localhost:5000"
    }
  },
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-scripts": "1.0.11"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

* Problem solved
    - The client and server will now work together nicely

### Test
* Kill the server
* Start it again `$ npm run dev`
    - Why did we have to restart the server?
    - Our front end stuff does have livereload but it does not automatically load the server when we change the `package.json` file
* Hover over the link and it still says `localhost:3000/auth/google`
    - I though we fixed this????
    - We did. Click the link
    - Wait. Now I get the Google redirect_uri_mismatch error! (we'll fix this)
    - But what is amazing is we got into our OAuth flow at all
        + This means that anything we do on the `client` server of our react app, can be easily forwarded along to our Express server

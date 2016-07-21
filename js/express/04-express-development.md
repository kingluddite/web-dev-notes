# Express Static Server in Development

## Where are our static files?
* JavaScript
* CSS
* Images
* Fonts

Static files are different than dynamic files because static files are sent to the client as is, without any changes that our templates can undergo

* Static files do not go through a rendering process like templates

## Setting up our static server

### `public` folder
Create a `public` folder inside the `src` directory

* We name it `public` because all files inside this folder will be publically accessible
* add the following folders inside our `public` folder
    - css
    - font-awesome
    - fonts
    - img
    - js

### app.use()
`use()` defines **[middleware](https://expressjs.com/en/guide/using-middleware.html)** for our application

* **middleware** is the logic that tells express how to handle a `request` inbetween the time a request is made by the `client` but before it arrives at a `route`. (hence the term 'middle')
    - Used to handle authentication (only some users can use some pages on a website)
    - Or to serve static files

* One of the few places where we will access the express module directly (in our case we are accessing the module instead of the `app` variable)
* First parameter is path to static directory

**app.js**

```js
var app = express();

app.use( express.static( __dirname + '/public' ) );
```

* Add `bootstrap.min.css` inside the `src/public/css` folder
* Start the server and browser to `http://localhost:3000/css/bootstrap.min.css` and you will see that css is being served

Add `/static` prefix

```js
app.use('/static', express.static( __dirname + '/public' ) );
```

Now when you want to view this css file, the **URL** would be

`http://localhost:3000/static/css/bootstrap.min.css`

* The previous URL will no longer work

`src/templates/partials/_head.pug`

```
head
        title Landing Page
        link(rel='stylesheet', href='/static/css/bootstrap.min.css')
```

`JavaScripts` at bottom so that we know DOM is loaded before we try to manipulate it

**note** `CSS` in head because everything in `HEAD` tag is already loaded before `BODY` content, we don't want `BODY` content to appear without our `CSS` styling it
>>>>>>> clean up Express notes


# Express Static Server in Development

## Where are our static files?
* JavaScript
* CSS
* Images
* Fonts

Static files are different than dynamic files because static files are sent to the client as is, without any changes that our templates can undergo
* Static files do not go through a rendering process like templates

## Setting up our static server

### public folder
Create a `public` folder inside the `src` directory
* We name it public because all files inside this folder will be publically accessible
* add the following folders inside our `public` folder
    - css
    - font-awesome
    - fonts
    - img
    - js
### app.use()
use() defines middleware for our application

* **middleware** is the logic that tells express how to handle a `request` inbetween the time a request is made by the `client` but before it arrives at a `route`. (hence the term 'middle')
    - used to handle authentication (only some users can use some pages on a website)
    - or to serve static files

* one of the few places where we will access the express module directly (in our case we are accessing the module instead of the `app` variable)
* first parameter is path to static directory

```js
app.use( express.static( __dirname + '/public' ) );
```

* add `bootstrap.min.css` inside the `src/public/css` folder
* start the server and browser to `http://localhost:3000/css/bootstrap.min.css` and you will see that css is being served

add `/static` prefix

```js
app.use('/static', express.static( __dirname + '/public' ) );
```

now when you want to view this css file, the URL would be

`http://localhost:3000/static/css/bootstrap.min.css`

* the previous URL will no longer work

`src/templates/partials/_head.jade`

```
head
        title Landing Page
        link(rel='stylesheet', href='/static/css/bootstrap.min.css')
```

scripts at bottom so that we know everything is loaded before we try to manipulate it

css in head because everything in head tag is already loaded before body content, we don't want body content to appear without our css styling it


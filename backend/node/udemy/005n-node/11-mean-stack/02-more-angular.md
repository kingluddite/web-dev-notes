# More AngularJs (Part 2)
* We'll create an simple Express app using Pug
* Start a new project

## Install express and pug
`$ npm i express pug -S`

## Add package.json
`$ npm init -y`

## Create our structure
`$ touch app.js`

`app.js`

```js
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req, res) {

  res.render('index');

});

app.listen(port);
```

`$ mkdir public views`

`$ touch views/index.pug`

`views/index.pug`

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title The MEAN stack
body
```

## Create client side JavaScript
`$ mkdir public/js`

`$ touch public/js/app.js`

## Using AngularJS 1
[link to site](https://angularjs.org/)

* Download and copy the CDN (Content Delivery Network)
    - I am going to go out and grab Angular from a different server
    - I will have my Application go out and grab it
    - This is helpful because it helps my node server
    - We have less people downloading and requesting this file from my server
    - They'll go out and download it from google
    - It also helps with the speed of the Application
        + CDNs are designed for this purpose
        + And if the user already used this link from visiting another Application, they user may already have it cached
            * We will use the uncompressed so we can read the code
                - This is aka as the **Developer Version** because it gives us better error messages in the browser
            * But in production we would use the minified version

### Adding Angular to our template
`index.pug`

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title The MEAN stack
  script(src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js")
body
  h1 The MEAN stack
```

### Reminder - Two Sides of the client server process
![browser and server](https://i.imgur.com/50SpZAD.png)

* JavaScript is running on both sides

![js running on client and server](https://i.imgur.com/uoJtuQK.png)

### Confusion is common
* When coding with Node on the server and when you write JavaScript on the server and the client, it is easy to get confused as to when you are coding on the client and when you are coding on the server because you are writing JavaScript everywhere
* **important** The JavaScript we are downloading in our `<script>` is not being downloaded or processed by Node in any way

### Take it for a test drive
`$ nodemon app.js`

* You should see `The MEAN stack` in the browser
* view `localhost:3000`
* View chrome network tab
    - You will see two things loaded
        1. `localhost`
        2. `angular.js`

## localhost:3000
* The HTTP request for the page `/` was processed by node
* The response was the HTML string
    - The browser then interpreted it and when it saw the script tag
    - Then the browser knew it needed to go out and download the angular JavaScript file (which is just a whole bunch of JavaScript code someone else wrote)
        + It is import to know that node did not touch the process of downloading Angular code



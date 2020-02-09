# Setting up a Web Server on your local machine
## We'll do 2 things
1. Create a Web Server
2. Figure out how we can make a web site

### Create a Web Server
* We'll set up a web server
* This will allow us to serve up a folder as a web site
    - And this will allow us to access all of those given files inside that folder in the browser
    - Then we can see our web site

### Make a web site
* If we're ever going to use JavaScript in the browser we need to learn about HTML
* HTML is the core build block of the web and it is impossible to make a website without using HTML

## Live Server
* We will install this on our machine and it will allow us to view our files in the browser
* When you installed `node` on your machine it also installed `npm` (node package manager)
    - `$ npm -v` to see that you do have `npm` and it will let you know the current version of `npm` you are running
    - My current version of `npm` is `6.13.6`
    - You just need npm v4 or greater

## What do we need npm for?
* To install other pieces of software
* We will install it globally with 

`$ npm install -g live-server`

### Make sure you installed live-server correctly
* After running above command, you should not see any errors
* Check the version

`$ live-server --version`

* My version is `live-server 1.2.1`
* Make sure you don't get a `command not found` error

## Step 2 Create a basic website
* Figure out how we can use HTML to create a basic website
* Create a `notes-app` folder that will hold our app
    - It will have HTML, CSS and JavaScript

### The HTML (HyperText Markup Language)
* Create a basic HTML page `index.html`
* This file defines what the user is going to see when they visit our web page

#### DOCTYPE (Document Type Definition)
* This is the first line of a HTML file that tells the browser we will be using HTML

`index.html`

```
<!DOCTYPE html>
```

* **note** Not everything we type in an HTML document will get shown to the user, `<!DOCTYPE html>` will not be seen by the end user
    - The browser reads the `<!DOCTYPE html>` but leaves it out when it tries to render the page

## Root `<html>` element
* This is the root of our document and everything else goes inside it
* You write the open and close `tag`

`index.html`

```
<!DOCTYPE html>
<html lang="en">

</body>
</html>
```

* The `tag` name (aka The `element` name)
* Notice how we `open` and `close` a tag `</html>` is a closing tag

## `<head>` tag
* We'll leave this blank
* The `<head>` allows us to further configure our HTML document

```
<!DOCTYPE html>
<html lang="en">
<head>

</head>
</html>
```

## The `<body>` tag
* What goes inside the `<body>` tag is the stuff shown to the user

#
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notes App</title>
</head>
<body>
  Stuff end user sees
</body>
</html>
```

## Let's run our server and see out app
* Be in the root of the server where you `notes-app` resides (You are not inside the `notes-app` folder, you are in the `notes-app` parent folder)

![notes-app](https://i.imgur.com/S4Kws9y.png)

`$ live-server notes-app`

* That will open a browser with `http://127.0.0.1:8080`
* You can manually copy and paste that URL into another browser to see the app in the browser
* It will not be exciting but you will see `Stuff end user sees` in the browser

### We accomplished 3 things here
1. We created an HTML document
2. We started our web server
3. We were able to view the document in the browser by typing in the correct URL
    * This URL will only work locally on your machine
    * If you shared this URL with other people not on your machine, they will not see what you see, they just get this page

![127.0.0.1 refused to connect](https://i.imgur.com/Lof1cYP.png)

* To have others anywhere on the web see your app, you'll need to deploy it live to a remote server like Heroku

## Live Reloading
* Auto Reload with live-server
* A benefit of using live reload is if you change the HTML content and save it will automatically refresh in the browser with your new changes
    - Try this for yourself
    - This feature is called "Live Reloading" and it comes from the `live-server` module itself

## Great HTML documentation
* [HTML docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [HTML element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

## Next - How we can load JavaScript into our HTML document
* Doing this will let us use JavaScript when a user clicks a button in our website

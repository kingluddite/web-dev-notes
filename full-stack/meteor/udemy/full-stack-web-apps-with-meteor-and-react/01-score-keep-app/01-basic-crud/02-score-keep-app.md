# Score Keep App
* [Live URL](http://score-keep-mead.herokuapp.com)
* [Github source code](https://github.com/andrewjmead/score-keep-meteor-course)

## Run Meteor
`$ meteor`

* Make sure you are inside your meteor project
* The terminal will let you know when meteor is running and when you can visit `http://localhost:3000` to view your app

![app is ready and running](https://i.imgur.com/BgyYzMK.png)

## Remove Boilerplate code
* We don't touch `.meteor` folder
    * Unless you know what you're doing

## Show the Server
1. Remove all code from `server/main.js`
2. Replace with `console.log('Log from /server/main.js');`
    - You will see this log output in the **Terminal**

![hello from server](https://i.imgur.com/8o0w0FX.png)

## Show the Client
3. Remove all code from `client/main.js`
4. Replace with `console.log('Log from /client/main.js');`
    - You will see this log output in the **console** tab of Chrome

![client says hello](https://i.imgur.com/v3zHspJ.png)

## Review and talk about why we need them
* `.gitignore`
* `package.json`

## [Danger Will Robinson!](https://www.youtube.com/watch?v=OWwOJlOI1nU)
* Most files right now are automatically loaded. This is dangerous
* Meteor recommends not adding anything to `client` or `server` folder

## Demonstrate dangers
1. Add `app.js` file to root
2. Type `console.log('Log from app.js);`
2. In **Terminal**, You will see `Log from app.js` on server even though we didn't put this file in our `server` folder
3. In Chrome **Console** we also have `Log from app.js`

### This is a problem! 
* Automatically loading file from all over your Application makes things hard to maintain
* If we create an `app` folder and drag and drop `app.js` inside it we'll get the same functionality

#### "A rose by any other name would smell as sweet" - WS
* Directory names in Meteor (_aka folder names_) are important
* The `client` and `server` directory names are important and have meaning in the Meteor ecosystem

## Eager Loading vs Lazy Loading
* `Eager loading` automatically loads files
* `Lazy loading` requires us to manually import files

## The `/imports` folder
`$ mkdir imports`

* All **lazy loading** files need to go inside `/imports`
* Any file inside `/imports` will not be automatically loaded into our Application
    - This means if you toss `app.js` inside `/imports` you won't see it in the browser or the **Terminal**
    - This is a good thing and this is what we want to do

## The `public` folder
* `$ mkdir public`
* **Meteor** will treat anything inside `/public` as a public asset you want available on your server
    - Example assets to add inside `/pubic` 
        + **favicon**
        + **images**
        + **fonts**
        + **svgs**
        + **zipped files**
        + **pdf**

### Try it out
1. `$ touch /public/help.html`
2. Type `Help me!` inside `help.html`
3. Browse to `http://localhost:3000/help.html`
    * You will see `Help me!`
    * This page is completely disconnected from rest of Meteor Application
    * We don't get logs or anything except for what we have in the file

* Same `eager loading` problems exist for CSS and HTML files causing unexpected behavior, this is an anti-pattern
* There are better ways to load our styles and our templates that we will address later

### What are Anti-patterns?
* Patterns in software development that is considered a bad programming practice
* As opposed to **design patterns** which are common approaches to common problems which have been formalized, and are generally considered a good development practice, `anti-patterns` are the opposite and are undesirable

## `client` directory
* Only available on the `client`
* We won't add anything to this directory except:
    - `main.css`
    - `main.html`
    - `main.js`

## `server` directory
* Only available on the `server` 
* We won't add any files inside this other than `main.js`
* If we do add files we will put them in the `imports` folder
    - And we will be **lazy loading** it using the `import` keyword

## View the source
* You will see:
    - The link to the stylesheet in the `head`
    - All the links to JavaScript in the body that make our Application work

## `client/main.html`
* Strange looking file, huh? More like a fragment of a traditional HTML file
* No DOCYTPE
* No HTML tag
* Meteor wants you to structure your HTML like this:

```html
<head>
  <title>Score Keep</title>
</head>

<body>
  <h1>Score Keep App</h1>
</body>
```





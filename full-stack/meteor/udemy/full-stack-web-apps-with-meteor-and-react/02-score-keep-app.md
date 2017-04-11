# Score Keep App

[Live URL](http://score-keep-mead.herokuapp.com)

[Github source code](https://github.com/andrewjmead/score-keep-meteor-course)

## Create Meteor app with specific version
`$ meteor --version` - Tells you what version of Meteor you are running

`$ meteor create --release 1.4.2.1 score-keep`

Also run `$ meteor npm install`

Run meteor with `$ meteor run --release 1.4.2.1`

## Remove Boilerplate code
* We don't touch `.meteor` folder, `.gitignore` or `package.json`
* Remove all code from `server/main.js` and replace with `console.log('Log from /server/main.js);`
    - You will see this log output in the **Terminal**
* Remove all code from `client/main.js` and replace with `console.log('Log from /client/main.js');`
    - You will see this log output in the **console** tab of Chrome

**note** Most files right now are automatically loaded. This is dangerous

Meteor recommends not adding anything to `client` or `server` folder

## Demonstrate dangers
Add `app.js` file to root and type `console.log('Log from app.js);`

In **Terminal**, You will see `Log from app.js` on server even though we didn't put this file in our `server` folder. We also have `Log from app.js` in `console` of Chrome. 

## This is a problem! 
Automatically loading file from all over your Application makes things so much harder to maintain

If we create an `app` folder and drag and drop `app.js` inside it we'll get the same functionality

**note** directory names in Meteor are super important

The `client` and `server` directory names are important and have meaning in the Meteor ecosystem

## Eager loading vs lazy loading
* `Eager loading` automatically loads files
* `Lazy loading` requires us to manually import files

## The `imports` folder
Create `/imports`

All **lazy loading** files need to go inside `/imports`

* Any file inside `/imports` will not be automatically loaded into our Application
    - This means if you toss `app.js` inside `/imports` you won't see it in the browser or the **Terminal**
    - This is what we want

## The `public` folder
Create `/public`

* Anything inside this folder, Meteor will treat as a public asset you want available on your server
    - I could add a favicon here or an image in here
    - Create `/public/help.html` and type `Help me!` inside it. Then browse to `http://localhost:3000/help.html` and you will see `Help me!`
        + This page is completely disconnected from rest of Meteor Application
            * We don't get logs or anything except for what we have in the file
    - `public` folder is great for anything you need publicly available like **fonts**, **svgs**

**note** Same `eager loading` problems exist for CSS and HTML files causing unexpected behavior, this is an anti-pattern

There are better ways to load our styles and our templates that we will address later

**Anti-patterns** are certain patterns in software development that is considered a bad programming practice

As opposed to **design patterns** which are common approaches to common problems which have been formalized, and are generally considered a good development practice, `anti-patterns` are the opposite and are undesirable

## `client` directory
Only available on the `client`

We won't add anything to this directory except for `main.css`, `main.html` and `main.js` even for the most complex apps

## `server` directory
Only available on the `server` 

We won't add any files inside this other than `main.js`. If we do add files we will put them in the `imports` folder and we will be lazy loading it using the `import` keyword

## `public`
We can toss anything in here we want public. Like `zips` we want users to download. Whatever public assets you need sit inside the public folder

## View the source
You will see the link to the stylesheet and in the body you will see all the links to JavaScript files to make our Application work

## `client/main.html`

You will see we do not have an official document

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





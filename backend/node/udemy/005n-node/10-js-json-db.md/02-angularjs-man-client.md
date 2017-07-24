# AngularJS: Managing the Client
* Node is written in C++
* Browsers are written in C++
    - Browsers also have JS engines embedded in them and give them access to extra features
    - What happens when the browser receives that stream of text?
    - How does the browser break that stream of text down?
    - And then how does it translate that HTML into something that's visible
    - That has to do with the `DOM`

## DOM
* The structure browsers use to store and manage web pages
* Stands for `Document Object Model`
* Browsers give the JavaScript Engine the ability to manipulate the DOM
* Common misunderstanding among developers
    - The DOM doesn't live inside the JavaScript Engine
    - The browser uses the DOM to render the webpage
    - And gives JavaScript access to the DOM, gives it features so that it can manipulate the DOM under the hood
    - When the DOM is changed, then the browser will automatically re-render (create/generate) the web page
        + This is the basis for modern web applications

## How does this work
![Browser and html](https://i.imgur.com/GzKzLWU.png)

* The browser is a program sitting on the clients computer
* It receives some HTML as a result of a HTTP request
* So the HTTP response body contains the HTML
* But now the browser needs to take this string and decide what to do with it
* But it doesn't use this string, instead it processes the string once and then it builds the DOM

![building the DOM](https://i.imgur.com/Unyf8f7.png)

* The browser takes that HTML and converts it into a hierarchy of objects

![hierarchy of objects](https://i.imgur.com/ZrudTq2.png)

* Those objects represent the various HTML elements
* And that becomes the **DOM tree**
* HTML is structured in a tree like fashion so this DOM tree translates well into a tree structure
* Also embedded in the Browser is the JavaScript Engine

![the javascript engine is also embedded](https://i.imgur.com/0dtJqC5.png)

* Chrome uses the V8 JavaScript Engine but other browsers have different JavaScript Engines

## `<script>`
* JavaScript sits inside the `<script>` tag and references a `.js` file
* The browser will pass the contents of that file to the engine and run it
    - So the browser will receive the JavaScript and execute it
    - This is happening inside the browser (we are not talking about NodeJS here)
    - If that JavaScript code contains extra features to manipulate the DOM then when that occurs, the browser will re-render the web page

## The Problem
* Different browser can have slighly different code to manipulate the DOM
* So if you are writing JavaScript code for the browser and you want it to work across many browsers and many **versions** of browsers you many have to write lots of different code to make it work the same in all of those browsers
* That starts to suck after awhile
* And if your Application gets really large, it will suck even more
    - JavaScript frameworks like AngularJS help us with that
    - They keep us from having to deal with code with each different kind of browser
    - They also help us structure our Applications and keep things manageable
    - At the end of the day all AngularJS is, is just a bunch of JavaScript code that someone else wrote



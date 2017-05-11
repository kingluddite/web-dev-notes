# Javascript Modules
What types of problems arise when we have a lot of JavaScript code?

![javascript code](https://i.imgur.com/qYsNQCu.png)

* `main.js`
* `util.js`
* `home.js`

Thousands of lines of code in this app

* You need to find the header and change how the navigation works
* Huge problem finding code
* Huge problem teaching new developers about your code
* To address this problem the idea of **JavaScript modules** was born

![javascript modules](https://i.imgur.com/XgIQXCk.png)

## What is a JavaScript module?
* A single JavaScript file that contains some small amount of code
* Instead of a few very large JavaScript files, we strive for many small JavaScript
    - The benefit is it is much more clear where code is located

## Problems with many small files in your app
![problems with lots of small files](https://i.imgur.com/dQF0WhN.png)

### Load Order
* If our code is spread out into a ton of modules we need to figure out the load order
* A good chance some files rely on code from other files
* We need to set up the proper load order and we need to ensure that every time our app runs, it has the same load order we set up

### Performance Hit
* Lots of files will lead to lots of HTTP hits
* More files we have, the slower load time for our page
* Especially true on mobile devices

![performance hit](https://i.imgur.com/e0bWlYK.png)

Here is a more responsible load of JavaScript code

![less performance hit](https://i.imgur.com/DmkEJwm.png)

## Webpack helps! - Core Purpose
The purpose of webpack is to take our gazillion JavaScript modules and merge them all into one big JavaScript file while also ensuring that each module is executed in the correct order

![input output diagram](https://i.imgur.com/TV8mBwr.png)

* Does CSS
* Turns ES6 code into ES5 code

That is cool but just a side effect of the real purpose of Webpack



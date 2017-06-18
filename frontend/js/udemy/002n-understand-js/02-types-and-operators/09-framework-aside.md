# Framework Aside
Framework and Library could mean two different things we'll discuss them as if they are the same thing

A grouping of JavaScript code that performs a task and is intended to be reusable

## Dig Deep
* Libraries like jQuery
* Frameworks like Angular
* How they use the concepts we learned in their code

## Default Values and Execution Context in Global Environment
`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Framework Aside 1</title>
</head>
<body>

 <script src="lib1.js"></script>
 <script src="lib2.js"></script>
 <script src="app.js"></script>
</body>
</html>
```

`app.js`

`console.log(libraryName);`

`lib1.js`

`var libraryName = 'Lib 1';`

`lib2.js`

`var libraryName = 'Lib 2';`

### What happens when the 3 JavaScript files are run
* The 3 script tags are not creating new execution contexts
* They are not separating code in any way
* They are just `stacking` the code on top of each other and then running all of the JavaScript as if it was inside a single file
    - Often in production JavaScript code you often combine and minify your code into one file
* Because of this it is important that these files don't collide with one another

### Run the code and view in browser
Output will be `Lib 2`

#### What just happened?
* The all run and are treated as global variables sitting inside the Global Execution Context and thus attached to the Window object in the case of the browser
* So in lib1.js `var libraryName = 'Lib 1';` ran
* And then lib2.js `var libraryName = 'Lib 2';` ran and replaced the first
* So when dealing with libraries or frameworks we have to be worried about collisions happening in our code

## How can we avoid collisions with other frameworks and libraries?
`lib2.js`

```
window.libraryName = window.libraryName || "Lib 2";
```

* We check to see if there is already a libraryName sitting in the Global Execution Context, sitting on the global variable `window`, it if is, I won't do anything, and if not, using the || operator, I'll set my default value to "Lib 2"

### Run the code again
* The output changes to `Lib 1`
* Because the first JavaScript file `lib1.js` this line is run:

`var libraryName = 'Lib 1';`

* That is put onto the window object

### Then in `lib2.js` we make sure we are not colliding with it
`window.libraryName = window.libraryName || "Lib 2";`

We check window.libraryName to see if something already exists with that name

* Lots of Libraries and Frameworks perform this check in their code
* This will call problems but it will be easier to troubleshoot because the entire library just one be there 

If you see code like this, recognize that it is checking the Global Namespace (the Gloabl Object) to see if something with that name is there so that it doesn't collide or override it

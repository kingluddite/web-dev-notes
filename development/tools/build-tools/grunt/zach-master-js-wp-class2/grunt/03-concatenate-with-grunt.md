# Concatenating with Grunt
## Concatenate with strings

`"string one" + "string two"`

## Concatenate with files
Take files and combine them into one file

* Helpful for performance
* Minimizing calls we make to the server

### [grunt-contrib-concat()](https://www.npmjs.com/package/grunt-contrib-concat)
* Code concatenates files
* Has hooks required for set up and configuration with grunt

### set up and configure grunt-contrib-concat()

#### Install as dependency to our project
`$ npm i -D grunt-contrib-concat`

**note** Check `package.json` to see your devDependencies for this project

```json
"devDependencies": {
    "grunt": "^1.0.1",
    "grunt-contrib-concat": "^1.0.1"
  },
```

### npm install
Install everything inside `package.json`

`$ npm install`

### [Usage examples](https://www.npmjs.com/package/grunt-contrib-concat#usage-examples)

### Best practices for application development

#### Folder Structure
Make two new folders inside the project root

`$ mkdir src dist`

* `src` are the files you edit
* `dist` are the files your task runners build

##### Tip
Think: "What are you giving me? And what do you want me to do with it when I'm done?"

Find a project that uses several JavaScript files. Grab them and place them inside our `src` folder. We will use grunt to concatenate them and put them into our `dist` folder.

### Our current folder struction
* dist/
* src/
  - js/
    + one.js
    + two.js
    + three.js
* node_modules/
* gruntfile.js
* package.js

### index.html
Your file currently has multiple `script` tags pointing to JavaScript files.

Example:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>VanillaPress</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>

  <section id="wrapper">

    <section id="editor" class="hidden">

      <h1>VanillaPress</h1>

      <nav id="edit" class="active">

        <form action="">
          <ul>
            <li>
              <label for="editTitle">Title</label>
              <input type="text" name="editTitle" id="editTitle" />
            </li>
            <li>
              <label for="editContent">Content</label>
              <textarea name="editContent" id="editContent"></textarea>
            </li>
            <li>
              <button id="editUpdateBtn" type="submit" value="Update" class="btn primary">Update</button>
            </li>
          </ul>
        </form>
      </nav>
      <!-- /#edit.active -->
    </section>
    <!-- /#editor.hidden -->

    <section id="view">

      <div class="container">

        <header class="page-header">
          <h1 id="siteName"><a href="#">VanillaPress</a></h1>
          <h2 id="siteDesription">A JS Front &amp; Back End</h2>
        </header>

        <nav id="mainNav">
          <ul>
          </ul>
        </nav>

        <div class="content">

          <div class="primary">
            <h2 id="pageTitle"></h2>
            <div id="pageContent">
            </div>
          </div>

          <div class="sidebar">
            <h3>Welcome!</h3>
            <p>
              This site is built using JavaScript and JSON.
            </p>
          </div>

        </div>

        <div class="footer">
          <p>Made with JavaScript &hearts;</p>
        </div>

      </div>


    </section>


  </section>
  <div id="editorToggle" class="hidden">
    <a href="#">
      <span class="arrow"></span>
      <label>Hide Editor</label>
    </a>
  </div>
  <!-- /#editorToggle.hidden -->
  <script src="js/data.js"></script>
  <script src="js/helpers.js"></script>
  <script src="js/model.js"></script>
  <script src="js/router.js"></script>
  <script src="js/view.js"></script>
  <script src="js/editor.js"></script>
  <script src="js/app.js"></script>

</body>

</html>
```

Each of these `script` tags will hit the server. We will remove them all and keep just one file called `bundle.js` and the path to it will be `dist/js/bundle.js`

The new `script` tag:

`<script src="dist/js/bundle.js"></script>`

## Load order is important
We need to list all our files. We could use some sort of glob pattern to just point to the `src/js` folder but that would load those files in a random order. We need to specify the order of our JavaScript files because if we don't, they could load in the wrong order and our code will break.

**note** There is a better Way
If we build our app using more modular JavaScript, we can avoid having to write out all these file names. But until we learn how to do that, we will do it the old fashioned way; writing filename by filename.

### `defaults` object
This will hold an array of all our JavaScript files

`gruntfile.js`

```js
module.exports = function( grunt ) {
  const defaults = {
    js: [
      'src/js/data.js',
      'src/js/helpers.js',
      'src/js/model.js',
      'src/js/router.js',
      'src/js/view.js',
      'src/js/editor.js',
      'src/js/app.js'
    ]
  };
// MORE CODE HERE
}
```

## Point to our `src` folder
Now that we have our JavaScript files stored in an array we can grab them using `defaults.js` (**note** this is not a file it is an object with a `js` property)

`gruntfile.js`

Look where we put `defaults.js` in the code below:

```js
// MORE CODE
grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [defaults.js],
        dest: ,
      },
    },
  });
// MORE CODE
```

### Spacing conventions
Grunt uses less spaces then WordPress javascript and it is good practice to find what the convention is for code formatting and stick to that. Your coding team will appreciate it.

## bundle.js
We update the previous code with where our concatenated code will go

`gruntfile.js`

```js
// MORE CODE
dist: {
        src: [defaults.js],
        dest: 'dist/js/bundle.js',
      }
// MORE CODE
```

## run the concat task
As soon as the grunt command is executed we want to run concat

`gruntfile.js`

```js
// MORE CODE
grunt.registerTask('default', ['concat']);

};
```

## Make sure you load `grunt-contrib-concat`

`gruntfile.js`

```js
// MORE CODE
grunt.loadNpmTasks('grunt-contrib-concat');
// MORE CODE
```

## Run Grunt
`$ grunt`

## View `dist/js/bundle.js`
Now all your files have been bundled into one file.

## Run server
[http-server](https://github.com/indexzero/http-server)

`$ http-server`

* globally install if you never used it.

`$ npm install http-server -g`

Browse to the location provided by `http-server`

* example: `127.0.0.1:8080`

![Terminal Output for http-server](https://i.imgur.com/Z5F0g9y.png)

# Gulp Streaming Build System
A build tool that leverages Node Streams. Helps us manage and run command line tools and services that we would want in our development project workflow.

## Getting Started with Gulp
* After Grunt, before Webpack
    - More people now are shifting to Webpack
    - Still a great tool and still used by thousands of sites so it is important to know about
* More `JavaScripty` configuration
* Leverages Node Streams
    - A feature of Node JavaScript running in a server environment. And they allow for streams of data to be manipulated and passed between different functions and methods
        + With Grunt we had to save files between tasks
        + With Gulp we stream the data though tasks only saving the file when we need to and not just because we need to manipulate the data we are working with.
* Lots of plugins and community use
    - Popular with large community behind it
        + Great for learning Gulp and easy to find answer to questions
    - Good chance it will be used on projects you work on

## Technical Side of Gulp
* Gulp managed and configured with `gulpfile.js`
* Gulp object with methods built in that we leverage in our configuration file
* Globs with `*` and `**`
* Chaining methods with `.pipe()`
    - Method that allows us to pass streams of data between different tasks and tools we configure

## Why people prefer Gulp over Grunt?
It has more "JavaScripty" configuration

## [gulp API docs](https://github.com/gulpjs/gulp/blob/master/docs/API.md)

* gulp.src
* gulp.dest
* gulp.task
* gulp.watch

**note** Above are built into the gulp object and do not need to be required like grunt methods

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>VanillaPress</title>
  <link rel="stylesheet" href="dist/css/style.css">
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
          <h1 id="siteName"><a href="#">VanillaPress 2</a></h1>
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
  <script src="src/js/data.js"></script>
  <script src="src/js/helpers.js"></script>
  <script src="src/js/model.js"></script>
  <script src="src/js/router.js"></script>
  <script src="src/js/view.js"></script>
  <script src="src/js/editor.js"></script>
  <script src="src/js/app.js"></script>

</body>

</html>
```


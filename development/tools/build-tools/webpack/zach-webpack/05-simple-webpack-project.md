# A Simple webpack Project

## Let's add sourcemaps

`webpack.config.js`

```
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-eval-source-map', // WE ADD THIS LINE FOR SOURCEMAPS
  // more code
```

## Update `index.html`

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
              <input type="text" name="editTitle" id="editTitle">
            </li>
            <li>
              <label for="editContent">Content</label>
              <textarea name="editContent" id="editContent"></textarea>
            </li>
            <li>
                <button id="editUpdateBtn" type="submit" value="Update" class="btn primary">Update
                </button>
            </li>
          </ul>
        </form>
      </nav>

    </section>
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
  <script src="dist/bundle.min.js"></script>
</body>
</html>
```

## What about CSS?
We are not bundling CSS so we just drop that into `dist/css` and it has been minfied for production manually

### Including our JavaScript and CSS

In `index.html`

#### Our CSS
We add this code to point to our minifed `dist/css/style.css`

`<link rel="stylesheet" href="dist/css/style.css">`

#### Our JavaScript
We add this code to point to our bundled JavaScript

`<script src="dist/bundle.min.js"></script>`

## Run webpack
`$ npm start`

## Open `index.html` in the browser
`$ open index.html`

You'll see it works in the browser

## [Working Repo](https://github.com/kingluddite/zach-webpack.git)

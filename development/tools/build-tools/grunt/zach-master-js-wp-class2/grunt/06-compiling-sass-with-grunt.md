# Compiling SASS with Grunt

## [grunt-contrib-sass](https://www.npmjs.com/package/grunt-contrib-sass)

## install
`$ npm i -D grunt-contrib-sass`

## Add task
```js
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
// ADD THIS LINE
grunt.loadNpmTasks('grunt-contrib-sass');
```

### Order
To build out a `gruntfile.js` use this order:

1. HTML
2. CSS
3. JAVASCRIPT

## SASS
Sample `sass` directory

* You will install bourbon and neat

* src/
    - sass/
        + bourban/ (don't create)
        + forms/
        + layout/
            * _layout.scss
            * _navigation.scss
            * _view.scss
        + mixins/
        + neat/ (don't create)
        + typography/
        + variables/
        + style.scss

## Sample `style.scss`

```scss
@import "bourbon/bourbon";
@import "neat/neat";
@import "mixins/mixins-master";
@import "variables/variables";

@import "typography/typography";
@import "layout/layout";
@import "forms/forms";
```

## Install bourbon
[Video how to use bourbon and neat](https://www.youtube.com/watch?v=8ItNE_DX6Cc)

Inside `src/sass/`

`$ sudo gem install bourbon`

### Create bourbon folder for your project
`$ bourbon install`

## Install neat
Inside `src/sass/`

### Create neat folder for your project

`$ sudo gem install neat`

## Forms
`src/sass/forms`

### [Grab SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor)
`$ npm install simplemde --save`

Grab simplemde css (`node_modules/simplemde/src/css/simplemde.css`) and copy and paste into `src/sass/forms/_wysiwyg.scss`

`src/sass/forms/forms.scss`

```scss
@import "wysiwyg";

#edit {
  label {
    padding: 10px 10px 0;
    display: block;
    color: $editor-light-link;
    font-weight: lighter;
  }
  input,
  button,
  textarea,
  .CodeMirror,
  iframe.wysiwyg {
    display: block;
    color: $editor-dark-link;
    font-size: 1.4rem;
    // font-weight: lighter;
    font-family: $editor-form-fonts;
    width: calc(100% - 20px);
    margin: 5px 10px 10px;
    padding: 10px;
    border: 1px $editor-border-color solid;
    &:focus {
      border-color: $editor-dark-link;
    }
    &:read-only {
      color: #ccc;
    }
  }
  textarea, .CodeMirror, .CodeMirror-scroll, iframe.wysiwyg  {
    min-height: 300px;
    max-height: 400px;
    font-size: 1.1rem;
    line-height: 1.8rem;
    padding: 5px;
  }
  iframe.wysiwyg {
    margin-left: 10px;
    width: 93%;
    padding: 0;
    /* margin: 0; */
    border: 1px #ccc solid;
  }
  #editUpdateBtn {
    background: $primary-btn-color;
    color: #fff;
    font-weight: lighter;
    position: relative;
  }
  #deletePost {
    margin-left: 10px;
    font-size: .8rem;
    a {
      color: $editor-light-link;
      &.hidden {
        display: none;
      }
    }
  }

}

.loader:before,
.loader:after,
.loader {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em #ffffff;
  }
  40% {
    box-shadow: 0 2.5em 0 0 #ffffff;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em #ffffff;
  }
  40% {
    box-shadow: 0 2.5em 0 0 #ffffff;
  }
}
```

`src/sass/layout/_navigation.scss`

```scss
#editor {

  ul {
    padding: 0;
    li {
      list-style-position: inside;
    }
  }

  nav {
    display: none;
    margin: -20px;
    background: #fff;
    color: $editor-dark-link;
    background-color: #fff;
    border-top: 1px solid $editor-border-color;
    border-bottom: 1px solid $editor-border-color;
    position: relative;

    &.active {
      display: block;
    }

    #addNew {
      position: absolute;
      top: 42px;
      right: 14px;
      a {
          text-decoration: none;
          padding: 0px 6px;
          display: block;
          background: $nav-link-color-hover;
          border-radius: 50%;
          font-size: 1rem;
          color: #fff;
          font-weight: bold;
          &:hover {

          }
          &.hidden {
            display: none;
          }
      }
    }

    h3 {
      padding: 20px;
      text-transform: capitalize;

      a {
        color: $editor-dark-link;
        // text-decoration: none;
        // background: $editor-background-color-hover;
        // border: $editor-border-color;
        // padding: 5px;
        // border-radius: 3px;
        &:hover {
          //background: $editor-background-color;
        }
      }
    }

    ul {
      padding: 0;
      margin: 0;

      li {
        list-style: none;

        &:first-child {
          border-top: 1px solid $editor-border-color;
        }

        > a {
          padding: 15px 20px;
          display: block;
          border-bottom: 1px solid $editor-border-color;
          color: $editor-dark-link;
          text-decoration: none;
          position: relative;
          &:hover {
            background: $editor-background-color-hover;
            color: $editor-hover-link;
            &:after {
              color: $editor-hover-link;
            }
          }
          &:after {
            content: ">";
            position: absolute;
            right: 20px;
            color: #a0a5aa;
          }
        }
      }
    }
  }
}

#view {

  #mainNav {
    margin: 10px;
    font-family: $view-header-secondary;
    margin: 40px 0 20px;    

    ul {
      padding:0;
      margin:0;
      text-align: center;
      li {
        display: inline-block;
        list-style: none;
        padding: 0 0 0 5px;
        margin: 0;
        font-size: 1.4rem;
        a {
          color: $nav-link-color;
          padding: 10px;
          text-decoration: none;
          &:hover {
            color: $nav-link-color-hover;
          }
        }
      }
    }
  }
  #menuIcon {
    display: none;
    background: #000;
    width: 100%;
    text-align: center;
    &:hover {
      background: #999;
    }
    a {
      width: 100%;
      display: inline-block;
      color: #fff;
      img {
        vertical-align: middle;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  #view {
    #MainNav {
      max-height: 0;
      overflow: hidden;
      float: none;
      text-align: center;
      width: 100%;
      @include transition(max-height 0.5s);
      &.menuOpen {
        max-height: 1000px;
        @include transition(max-height 0.5s);
      }
      ul {
        li {
          display: block;
          width: 100%;
          background: #000;
          border-top:1px solid #4d4d4d;
          &:hover {
            background: #999;
          }
          a {
            color: #fff;
            text-shadow: #848484 0px 1px 2px;
            padding: 10px 0;
            width: 100%;
          }
        }
      }
    }
    #menuIcon {
      display: inline-block;
    }
  }
}

#editorToggle {
  position: absolute;
  bottom: 5px;
  left: 25px;
  a {
    color: $primary-btn-color;
    .arrow {
      // width: 0;
      // height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid transparent;
      border-right: 8px solid $primary-btn-color;
      display: block;
      left: -25px;
      position: absolute;
    }
    &:hover label {
      cursor: pointer;
    }
  }
  &.hidden {
    a {
      background: $primary-btn-color;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      position: absolute;
      padding: 10px;
      bottom: 0px;
      left: -20px;
      .arrow {
        border-right: 5px solid transparent;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #fff;
        left: 40%;
        bottom: 5px;
      }
      label {
        display: none;
      }
    }
  }
}
```

`src/sass/layout/_view.scss`

```scss
#view {
  background: $view-background-color;
  padding: 40px 20px;

  &.inactive a {
    cursor: not-allowed;
  }
  .container {
    // padding: 20px;
    margin: 20px auto 0;
    max-width: 960px;
    //max-width: 1280px;

    .page-header {
      text-align: center;
    }

    .content {
      background: #fff;
      padding: 10px 20px;
      border: 1px #ddd solid;
      .primary {
        width: calc(100% - 20px);
        padding: 10px;
        #blogPosts {
          padding-top: 20px;
          article {
            margin: 10px 0 0;
            border-top: 1px#ededed solid;
            padding: 5px 0 10px;
            h3 {
              font-size: 1.2rem;
            }
            p {
              font-size: 1rem;
            }
          }
        }
      }
      .sidebar {

        width: calc(100% - 20px);
        padding: 10px;
      }
    }
  }
}
```

`src/sass/mixins/_mixins-master.scss`

Folder is empty

`src/sass/typography/_headings.scss`

```scss
#editor {
  h1 {
    margin: 1rem 0 2rem;
  }
  h1,h2,h3,h4,h5 {
    color: $header-color;
    font-weight: lighter;
  }
}
```

`src/sass/typography/_typography.scss`

```scss
@import "headings";
body {
  font-family: "Helvetica Neue", $editor-header-fonts;
}
#editor {
  font-family: $editor-header-fonts;
}

#view {
  body, p {
    font-family: $view-default-fonts;
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: $view-header-secondary;
    font-weight: normal;
  }
  .page-header h1 {
    font-family: $view-header-primary;
    font-size: 2.2rem;
    margin: 1rem 0 0;
    color: $view-header-color-dark;
    //text-shadow: 0px 1px 1px #222;
    a {
      text-decoration: none;
    }
  }
  .page-header h2 {
    color: $view-header-color-dark;
    font-size: 1.2rem;
    margin: .4rem 0 0;
    font-weight: lighter;
  }
  .primary p {
    font-size: 1.2rem;
    line-height: 2rem;
    color: #222;
  }
  .sidebar p {
    font-size: 1rem;
  }
  .footer p {
    font-size: .8rem;
    font-family: $view-header-secondary;
    text-align: center;
    font-weight: lighter;
  }
}
```

`src/sass/variables/_variables.scss`

```scss
// Colors
$editor-background-color: #eee;
$editor-background-color-hover: #f5f5f5;
$header-color: #555;
$editor-dark-link: #555;
$editor-light-link: #999;
$editor-hover-link: #23282d;
$editor-border-color: #eee;
$primary-btn-color: #0085ba;

$view-background-color: #ededed; // #3e7aa6; // #3087c8
$view-header-color-light: #ffffff; // #3087c8
$view-header-color-dark: #222; // #3087c8
$view-link-color: #0085ba;
$nav-link-color: #222;
$nav-link-color-hover: #0085ba;


// Fonts
$editor-header-fonts: "Open Sans",sans-serif;
$editor-form-fonts: "Helvetica Neue", $editor-header-fonts;
$view-default-fonts: "Helvetica Neue", $editor-header-fonts;
$view-header-primary: "Pacifico";
$view-header-secondary: "Montserrat";
```

## What do we need to tell Grunt about our SASS?
* All we need to tell grunt is where our main SASS file is (`style.scss`)
* We also need to tell grunt where to place our built Sass file

**note** Our main SASS file can be named anything but we are following the WordPress naming convention

```js
// MORE CODE
sass: {
      dist: {
        files: {
          'dist/css/style.css': 'src/sass/style.scss'
        }
      }
    },
// MORE CODE
```

* Above code would work but below code is better organized

`gruntfile.js`

```js
const defaults = {
  // ADD THIS LINE
  sass: 'src/sass/style.scss',
  js: [
    'src/js/data.js',
    'src/js/helpers.js',
    'src/js/model.js',
    'src/js/router.js',
    'src/js/view.js',
    'src/js/editor.js',
    'src/js/app.js'
  ],
  destinations: 'dist/js/bundle.js'
};
```

Then you can update the grunt config with:

```js
sass: {
      dist: {
        files: {
          'dist/css/style.css': defaults.sass
        }
      }
    },
```

## Register the SASS task

`gruntfile.js`

```js
// MORE CODE
grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass']);
// MORE CODE
```

* We can add SASS at the end as that makes the most sense

## Do I need to set up a linting system for CSS?
No. When you run grunt if you have CSS errors or SASS errors, the build will be aborted and you will be alerted with any errors.

## Run grunt
`$ grunt`

Inside `dist` is `css/style.css` and `css/style.css.map`. We also see `.sass-cache` which should be added to your `.gitignore`

## Add git to your project
`$ git init`

`$ touch .gitignore`

`.gitignore`

```
.sass-cache
node_modules
```

Add the link to your new concatenated css file

`index.html`

```html
<!-- MORE CODE -->
<link rel="stylesheet" href="dist/css/style.css">
<!-- MORE CODE -->
```

## View Page
You will see your app in the browser (after running `$ http-server`)

## Updating code
If you change the sass, you have to run `grunt` again. This is a bad workflow. We need to speed it up with `watching`


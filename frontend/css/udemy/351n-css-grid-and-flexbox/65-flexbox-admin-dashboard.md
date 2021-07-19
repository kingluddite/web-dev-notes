# Flexbox Admin Dashboard
* Use css-boilerplate
* Update package.json

## Troubleshooting
* Using SCSS and gulp turn auto save off as it causes issues
* inline comments cause error in nested sass
    - use `shift` + `alt` + `a` to add multi-line comments

```
{
  "name": "cards-flexbox-start",
  "version": "1.0.0",
  "description": "",
  "main": "gulpfile.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-eslint": "^10.1.0",
    "eslint": "^7.24.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-config-prettier": "^6.15.0",
    "eslint-config-wesbos": "^1.0.1",
    "eslint-plugin-html": "^6.1.2",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-react": "^7.23.2",
    "eslint-plugin-react-hooks": "^4.2.0",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^6.0.0",
    "gulp-sass": "^5.0.0",
    "live-server": "^1.2.1",
    "prettier": "^2.2.1",
    "stylelint": "^13.12.0",
    "stylelint-config-recess-order": "^2.3.0",
    "stylelint-prettier": "^1.2.0",
    "sass": "^1.35.1"
  }
}

```

## Run gulp
`$ gulp watch`

## Run live server too

## Gulp 5 update
* You will get this error

```
Error in plugin "gulp-sass"
Message:
    
gulp-sass 5 does not have a default Sass compiler; please set one yourself.
Both the `sass` and `node-sass` packages are permitted.
For example, in your gulpfile:

  var sass = require('gulp-sass')(require('sass'));
```

* Update `gulpfile.js`

```
// MORE CODE

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // NEW
// const sass = require('gulp-sass'); // OLD
// MORE CODE
```

## Add scss to stylelint
`stylelintrc.json`

```
// MORE CODE

{
  "extends": "stylelint-config-recess-order",
  "plugins": ["stylelint-prettier", "stylelint-scss"],
// MORE CODE
```

`$ npm i stylelint-scss`

* https://www.npmjs.com/package/stylelint-scss
* All rules from stylelint-scss need to be namespaced with scss

```
// MORE CODE

    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/selector-no-redundant-nesting-selector": true,
// MORE CODE
```

## Fix for stylelint error appearing
* f you do not use stylelint in javascript (css-in-js), change the stylelint.validate option in your .vscode/settings.json to exclude "javascript", "javascriptreact", "typescript" and "typescriptreact".
* docs - https://github.com/stylelint/vscode-stylelint/issues/135
`gulpfile.js`

```
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function css() {
  return gulp
    .src('scss/app.scss')
    .pipe(autoprefixer())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('css'));
}
function watchFiles() {
  gulp.watch('scss/*.scss', css);
  gulp.watch('index.html');
}

// tasks
gulp.task('css', css);
gulp.task('watch', gulp.parallel(watchFiles));

```

`app.scss`

```
@import 'variables';
@import 'mixins';

html {
  @include box-sizing(border-box);
  height: 100%;
}

*,
*:after,
*:before {
  @include box-sizing(inherit);
}

body {
  min-height: 100%;
  font-family: $mainFont;
}

img {
  max-width: 100%;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

i {
  margin: 0 1rem;
  font-size: 1.2rem;
}

.header {
  display: flex;

  .site-name {
    flex: 0 0 5rem;
    color: $white;
    background-color: $secondary;

    h1 {
      color: $white;
    }
    @include desktop {
      flex: 0 0 20rem;
    }

    .desktop {
      display: none;
      @include desktop {
        display: block;
      }
    }

    .mobile {
      @include desktop {
        display: none;
      }
    }
  }
}

.bar {
  display: flex;
  flex: 1;
  justify-content: space-between;
  background-color: $primary;

  .left-content {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    color: $white;

    .fa-arrow-right {
      display: none;
    }
  }

  .right-content {
    display: flex;

    .box {
      display: flex;
      align-items: center;
      padding: 0 1rem;

      &:hover {
        background-color: $secondary;
      }

      a {
        display: flex;
        align-items: center;
        color: $white;
        text-decoration: none;
      }

      span {
        padding: 0.5rem;
        margin-left: 0.5rem;
        background-color: $tertiary;
        border-radius: 50%;
      }
    }
  }
}

```

`_variables.scss`

```
// Fonts
$mainFont: 'Raleway', sans-serif;

// Media Queries
$phone: 480px;
$tablet: 768px;
$desktop: 1024px;

// Colors
$primary: #005b9f;
$secondary: #003f8c;
$tertiary: #009045;
$alternative: #ce6b00;
$gray: #eeeeee;
$darkGray: #373737;
$white: #ffffff;

```

`_mixins.scss`

```
/** Media Queries **/
@mixin phone {
  @media only screen and (min-width: #{$phone}) {
    @content;
  }
}

@mixin tablet {
  @media only screen and (min-width: #{$tablet}) {
    @content;
  }
}

@mixin desktop {
  @media only screen and (min-width: #{$desktop}) {
    @content;
  }
}

@mixin button($color) {
  display: block;
  padding: 0.5rem 1rem;
  color: $white;
  text-align: center;
  text-decoration: none;
  background-color: $color;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: darken($color, 10);
  }
}

@mixin box-sizing($box-model) {
  box-sizing: $box-model;
}
@mixin gradient($color1, $color2) {
  background: linear-gradient(to right, $color1 0%, $color2 100%);
}
```

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AdminFlex</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.0/css/all.css">
    <link rel="stylesheet" href="css/app.css">
</head>
<body>

<div class="app">
    <header class="header">
            <div class="site-name">
                <h1 class="desktop">AdminFlex</h1>
                <h1 class="mobile">AF</h1>
            </div>
            <div class="bar">
                <div class="left-content">
                    <i class="fas fa-arrow-left"></i>
                    <i class="fas fa-arrow-right"></i>
                </div>
                <div class="right-content">
                    <div class="messages box">
                            <a href="#">
                                <i class="fas fa-comment-alt"></i>
                                Messages
                                <span>20</span>
                            </a>
                    </div>  
                    <div class="messages box">
                            <a href="#">
                                <i class="fas fa-bell"></i>
                                Alerts
                                <span>10</span>
                            </a>
                    </div>  
                    <div class="sign-off box" >
                        <a href="#">Sign Off</a>
                    </div>
                </div>
            </div>
    </header>
    <main class="main-content">
        <aside class="sidebar">
                <div class="user">
                    <img src="img/user.svg">
                    <p>Welcome: <span>Admin</span></p>
                </div>
                <div class="search">
                    <input type="text" placeholder="Search...">
                </div>

                <div class="menu-admin">
                    <h2>Admin Menu</h2>
                    <ul class="menu">
                        <li>
                            <a href="#">
                                <i class="fas fa-address-book"></i>
                                Clients
                            </a>

                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-list"></i>
                                        View All
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-plus"></i>
                                        Add New
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-chart-line"></i>
                                Sales
                            </a>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-list"></i>
                                        View All
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-plus"></i>
                                        Add New
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-box"></i>
                                Products
                            </a>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-list"></i>
                                        View All
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-plus"></i>
                                        Add New
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-file-alt"></i>
                                Invoices
                            </a>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-list"></i>
                                        View All
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-plus"></i>
                                        Add New
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-calendar-alt"></i>
                                Calendar
                            </a>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-list"></i>
                                        View All
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-plus"></i>
                                        Add New
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fas fa-pencil-alt"></i>
                                Edit Profile
                            </a>
                        </li>
                    </ul>
                </div>
        </aside>
        <div class="content">
            <h2 class="heading">Add New Client</h2>

            <form class="new-client">

                <div class="field">
                    <label for="first-name">First Name</label>
                    <input type="text" id="first-name">
                </div>
                <div class="field">
                    <label for="last-name">Last Name</label>
                    <input type="text" id="last-name">
                </div>
                <div class="field">
                    <label for="company">Company</label>
                    <input type="text" id="company">
                </div>
                <div class="field">
                    <label for="address">Address</label>
                    <input type="text" id="address">
                </div>
                <div class="field expand">
                    <label for="other-notes">Additional Notes</label>
                    <textarea id="other-notes" ></textarea>
                </div>

                <div class="field expand">
                        <label>Membership:</label>
                        <div class="options">
                
                            <input type="radio" value="basico">
                            <label for="basico">Basic</label>
                        
                            <input type="radio"  value="premium">
                            <label for="premium">Premium</label>

                            <input type="radio" value="gold">
                            <label for="gold">Gold</label>
                        </div>
                </div>

                <div class="field submit expand">
                    <input type="submit" class="button" value="Add Client">
                </div>
            </form>
        </div>
    </main>
</div>

<script src="js/app.js" async></script>
</body>
</html>
```

## Style the sidebar
* Getting `Admin` on it's own line:

`app.scss`

```
// MORE CODE
.main-content {
  display: flex;
}

.sidebar {
  flex: 0 0 20rem;
  padding: 1rem 2rem 0 2rem;
  color: $white;
  background-color: $darkGray;

  .user {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: bold;

    img {
      max-width: 60px;
    }

    span {
      display: block;
      font-weight: normal;
    }
  }
}
```

```
// MORE CODE

 .user {
    display: flex;
    align-items: center;
    justify-content: space-around; /* looks better than space-between */
    font-weight: bold;

    img {
      max-width: 60px;
    }

    span {
      display: block;
      font-weight: normal;
    }
// MORE CODE
```

* You could use flexbox to do this but it would take 2 lines instead of 1 line

```
// MORE CODE

 p {
      display: flex;
      flex-direction: column;
    }

    span {
      font-weight: normal;
    }
// MORE CODE
```

## Styling the Search
`app.scss`

```
// MORE CODE
.search {
    margin-top: 1rem;

    input[type='text'] {
      width: 100%;
      height: 3rem;
      padding: 1rem;
      border: none;
      border-radius: 10px;
    }
  }
}
```

## Sidebar

```
// MORE CODE
.menu-admin {
  margin: 1rem;

  h2 {
    padding: 1rem;
    font-size: 1.2rem;
    text-align: center;
  }

  .menu {
    padding: 0;
    list-style: none;

    > li {
      padding: 0.5rem;

      &:hover {
        ul {
          display: block;
        }
      }

      ul {
        display: none;
        padding: 1rem;
        margin-top: 1rem;
        list-style: none;
        background-color: darken($darkGray, 20%);

        li {
          margin-bottom: 1rem;

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }

      a {
        padding: 0.5rem;
        color: $white;
        text-decoration: none;

        &:hover {
          padding-left: 2rem;
          background-color: $primary;
          transition: padding-left 0.3s ease, background-color 0.3s;
        }
      }
    }
  }
}
```

## How can we get the sidebar to go all the way down vertically?

```
// MORE CODE

body {
  min-height: 100%; /* cut this */
  font-family: $mainFont;
}
// MORE CODE
```

`app.scss`

```
@import 'variables';
@import 'mixins';

html {
  @include box-sizing(border-box);
  height: 100%;
}

*,
*:after,
*:before {
  @include box-sizing(inherit);
}

body {
  height: 100%; /* you need this for the side to be 100 vh */
  font-family: $mainFont;
}

img {
  max-width: 100%;
}

.no-menu.app {
  .sidebar {
    margin-left: -20rem;
  }
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

i {
  margin: 0 1rem;
  font-size: 1.2rem;
}

.header {
  display: flex;

  .site-name {
    flex: 0 0 5rem;

    padding-left: 1rem;
    background-color: $secondary;
    @include desktop {
      flex: 0 0 20rem;
    }

    h1 {
      color: $white;
    }

    .desktop {
      display: none;
      @include desktop {
        display: block;
      }
    }

    .mobile {
      @include desktop {
        display: none;
      }
    }
  }
}

.bar {
  display: flex;
  flex: 1;
  justify-content: space-between;
  background-color: $primary;

  .left-content {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    color: $white;

    .fa-arrow-right {
      display: none;
    }
  }

  .right-content {
    display: flex;

    .box {
      display: flex;
      align-items: center;
      padding: 0 1rem;

      &:hover {
        background-color: $secondary;
      }

      a {
        display: flex;
        align-items: center;
        color: $white;
        text-decoration: none;

        span {
          padding: 0.5rem;
          margin-left: 0.5rem;
          background-color: $tertiary;
          border-radius: 50%;
        }
      }
    }
  }
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  flex: 0 0 20rem;
  padding: 1rem 2rem 0 2rem;
  color: $white;
  background-color: $darkGray;
  transition: margin-left 0.3s ease-out;

  .user {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: bold;

    img {
      max-width: 60px;
    }

    span {
      display: block;
      font-weight: normal;
    }
  }

  .search {
    margin-top: 1rem;

    input[type='text'] {
      width: 100%;
      height: 3rem;
      padding: 1rem;
      border: none;
      border-radius: 10px;
    }
  }
}

.menu-admin {
  margin-top: 1rem;

  h2 {
    padding: 1rem;
    font-size: 1.2rem;
    text-align: center;
  }

  .menu {
    padding: 0;
    list-style: none;

    > li {
      padding: 0.5rem;

      &:hover {
        ul {
          display: block;
        }
      }

      ul {
        display: none;
        padding: 1rem;
        margin-top: 1rem;
        list-style: none;
        background-color: darken($darkGray, 20%);

        li {
          margin-bottom: 1rem;

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }

      a {
        padding: 0.5rem;
        color: $white;
        text-decoration: none;
        transition: padding-left 0.3s ease, background-color 0.3s ease-in-out;

        &:hover {
          padding-left: 2rem;
          background-color: $primary;
        }
      }
    }
  }
}

.content {
  flex: 1;
  padding: 1rem;
  background-color: $gray;

  h2 {
    text-align: center;
  }
}

.new-client {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .field {
    display: flex;
    flex: 0 0 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    margin-bottom: 1rem;
    @include tablet {
      flex: 0 0 50%;
    }

    &.expand {
      flex: 0 0 100%;
      justify-content: flex-start;
    }

    label {
      flex: 0 0 120px;
      padding-left: 1rem;
    }

    input[type='text'],
    textarea {
      flex: 1;
      padding: 0.5rem 1rem;
      border: none;
    }

    textarea {
      height: 10rem;
    }

    .options {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      @include tablet {
        flex: 0 0 40%;
      }

      label {
        flex: 1;
        padding-left: 0.5rem;
      }
    }

    &.submit {
      display: flex;
      justify-content: flex-end;

      .button {
        @include button($primary);
      }
    }
  }
}

```

## JavaScript
```
const arrows = document.querySelector('.left-content');

arrows.addEventListener('click', (e) => {
  // read the classes
  const menuClass = e.target.classList;
  console.log(menuClass);
  // select the containers
  const container = document.querySelector('.app');
  const leftArrow = document.querySelector('.fa-arrow-left');
  const rightArrow = document.querySelector('.fa-arrow-right');
  // hide or show the arrows, and then add/remove the no-menu

  if (menuClass.contains('fa-arrow-left')) {
    // clicked on the arrow
    // console.log('clicked on the arrow');
    container.classList.add('no-menu');
    // hide the current arrow
    e.target.style.display = 'none';
    // show the right arrow
    rightArrow.style.display = 'block';
  } else if (menuClass.contains('fa-arrow-right')) {
    container.classList.remove('no-menu');
    // console.log('clicked in another element');
    // hide the current arrow
    e.target.style.display = 'none';
    leftArrow.style.display = 'block';
  }
});
```

# NPM script
* Write compile Sass locally

`$ mkdir sass`

`$ touch sass/main.scss`

## Add some Sass
`main.scss`

```
*,
*::after,
*::before {
  margin: 0,
  padding: 0,
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  align-items: center;
  background: #2b292e;
  display: flex;
  color: #fafafa;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
  justify-content: center;
  min-height: 100vh;
}
```

## Need to add
* [Eslint, prettier, sass and stylelint](https://reactsensei.com/add-eslint-stylelint-prettier/)

## Let's try to add variable to rgba()
* You could not put a hex value in CSS but with Sass you can!

```
// variables
$color-primary: #55c57a;
$color-primary-light: #7ed56f;
$color-primary-dark: #28b485;

*,
*::after,
*::before {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

body {
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #2b292e;
  background-image:
    linear-gradient(
      to right bottom,
      rgba($color-primary-light, 0.8),
      rgba($color-primary-dark, 0.8)
    ),
    url(../img/hero.jpg);
  background-position: top;
  background-size: cover;
  color: #fafafa;
  font-family: "Lato", sans-serif;
}
```

## Npm scripts
* We need to tell our app to use Sass
* We do that by writing a script
* We write the scripts inside `package.json`

`package.json`

```
// MORE CODE

  "scripts": {
    "compile:sass": "node-sass sass/main.scss css/style.css"
  },

// MORE CODE
```

## Run it
`$ npm run compile:sass`

* Now it will create a `css` and all your Sass is now transpiled to CSS
* You don't need stylelint for the CSS folder as it is production code and stylelint is just for development

### Ignore folder for stylelint `.stylelintignore`
* Create `.stylelintignore` in the root of your project
* [stylelint docs](https://stylelint.io/user-guide/ignore-code)

`.stylelintignore`

```
/css
```

* Now all stylelint errors will be gone inside your production CSS folder

## HTML file
`index.html`

```
<!DOCTYPE html>
<!DOCTYPE html>
<html class="no-js" lang="en">
  
<head>
  <meta charset="UTF-8">
  <title>Natours</title>
  <link type="text/css" rel="stylesheet" href="css/style.css">

</head>
<body>
  <header class="header">
      <div class="header__logo-box"><img class="logo" src="img/logo-white.png" alt="Logo"></div>
     
      <div class="header__text-box">
        <h1 class="heading-primary">
          <span class="heading-primary--main">Outdoors</span>
          <span class="heading-primary--sub">is where life happens</span>
        </h1>
        <!-- /.heading__primary -->

        <a href="#" class="btn btn--white btn--animated">Discover Tours</a>
      </div>
      <!-- /.text__box -->
  </header>
       
</body>
</html>
```

`$ live-server .`

* You'll see your app is working and the compiled CSS (from Sass) is working!

## Autosave
* We have to run compile sass every time and this is a pain
* We can automate this process with:

`package.json`

```
// MORE CODE

  "scripts": {
    "compile:sass": "node-sass sass/main.scss css/style.css -w"
  },

// MORE CODE
```

* Now may changes in the Sass and they will automatically compile to CSS every change

## With sass watching you need to open a new terminal to type stuff
* If you close the sass watching terminal sass will no longer be running nor watching
* (On WIN just right click and open new command prompt)
* Stop terminal with `ctrl` + `c`


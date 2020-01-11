# Styling Login Page
* Grab images and put into `public/images` folder
    - `public/img`
        + bg.jpg
        + favicon.png
        + loader.gif

## Create `src/styles/components/_box-layout.scss`
* We add our class (className)

`LoginPage.js`

```
// MORE CODE
export const LoginPage = props => (
  <div className="box-layout">
    <button onClick={props.startLogin}>Login</button>
  </div>
);
// MORE CODE
```

## Connect the file by importing it like below:

`src/styles/styles.scss`

```
@import './base/theme';
@import './base/base';
@import './components/box-layout'; /* add this line */
```

* **remember** Our partial `scss` files need to start with an `_` (underscore) but the underscore and the extension are excluded when we are importing

`_box-layout.scss`

* **note** The browser only has access to what is in the `public` directory
  - When using `url()` we put the path in the webserver to the file we want to use
  - This is not a path that takes in the entire directory structure of our project because the following code runs in the browser and the browser only has access to what's in the `public` directory
    + So the `/` would bring us to the root of the web server (which would be the `public` folder) and then we use `/public/images/bg.jpg` and that will correctly point to our background image

`src/styles/components/_box-layout.scss`

```
.box-layout {
  background: url('/img/bg.jpg');
}
```

* **note** If you are logged in you will not see the background image
* Log out and you will see it

## Houston we have a problem
* We only see a very small bg image

## Viewport to the rescue
`_box-layout.scss`

```
.box-layout {
  background: url('/img/bg.jpg');
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
```

* `vh` ---> viewport height
* `vw` ---> viewport width
    - We do this to cover the entire viewport
* `background-size: cover` ----> makes sure our image always covers the container even when we resize the browser

## Let's style the login button
* We are using `bem` (box element modifier - [docs](http://getbem.com/introduction/))

`LoginPage.js`

```
// MORE CODE

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1>Expensify App</h1>
      <p>It's time to get your expenses under control.</p>
      <button onClick={startLogin}>Login</button>
    </div>
  </div>
);

// MORE CODE
```

`_box-layout.scss`

```

.box-layout {
  background: url('/images/bg.jpg');
  background-size: cover;
  height: 100vh;
  width: 100vw;

  &__box {
    background: fade-out(white, 0.15);
  }

// MORE CODE
```

* That fades the white box slightly (15% transparency)

## Center the box using Flexbox
`_box-layout.scss`

```
.box-layout {
  align-items: center; /* added /*
  background: url('/images/bg.jpg');
  background-size: cover;
  display: flex; /* added /*
  height: 100vh;
  justify-content: center; /* added /*
  width: 100vw;

  &__box {
    background: fade-out(white, 0.15);
  }
}

```

* We'll add a border radius to soften the corners
* Center the text in the box
* We'll give it a 25rem fixed width
* We'll add padding using our variables $l-size and $m-size

`_box-layout-scss`

```
.box-layout {
  align-items: center;
  background: url('/images/bg.jpg');
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  &__box {
    background: fade-out(white, 0.15);
    border-radius: 3px;
    padding: $l-size $m-size;
    text-align: center;
    width: 26rem;
  }

}

```

* Here is what it should look like at this point

![center LoginPage with styles](https://i.imgur.com/hOFWzaa.png)

## Style the title
* **Note** All text has a line-height and that line height makes sure there is a little spaces between your lines when you have text across multiple lines
* But with our title we know it is just 1 line so we set the height to `1` (this allows me to more evenly distribute the space above and below the `h1`)

`_box-layout.scss`

```
// MORE CODE
  &__box {
    background: fade-out(white, 0.15);
    border-radius: 3px;
    padding: $l-size $m-size;
    text-align: center;
    width: 26rem;
  }

  /* we add our title here */
  &__title {
    line-height: 1;
    margin: 0 0 $m-size 0;
  }
}
```

`LoginPage.js`

```
// MORE CODE

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify App</h1>
      <p>It's time to get your expenses under control.</p>
      <button onClick={startLogin}>Login</button>
    </div>
  </div>
);

// MORE CODE
```

## Change base bg color for our body
`src/styles/base/_base.scss`

```
// all fonts are base 10
html {
  font-size: 62.5%
}
body {
  background-color: $white;
  color: #333333; /* add this */
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
}

// MORE CODE
```

## Convert to variable
* We'll be using this dark grey color #333333 a lot so let's make it a variable

`_base.scss`

```
// MORE CODE

body {
  background-color: $white;
  color: $dark-grey;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
}

// MORE CODE
```

## Add the variable
`_theme.scss`

```
// Colors
$dark-grey: #333333;
$white: #ffffff;

// MORE CODE
```

![box with padding](https://i.imgur.com/0wlVnbP.png)

* We need more line-height

`_base.scss`

```
// MORE CODE

body {
  background-color: $white;
  color: $dark-grey;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
  line-height: 1.6; /* add this line */
}

// MORE CODE
```

* Now we have more spacing between our lines

![line-height added](https://i.imgur.com/cMzt0j4.png)

## Next - Focus on the Log In Button


# Architecture and Header styles
`src/styles/base/_base.scss`

```css
body {
  font-family: Helvetica, Arial, sans-serif;
}

h1 {
  font-size: 1rem;
}
```

* The font changes

## rem
* We set `h1` to 1rem and if we check the computed style we see `16px`

![font computed value](https://i.imgur.com/CzMEBc2.png)

### Make math easy
* The best way to use **rems** and make the math simple is to set the `html` font-size to `62.5%`
* Browsers by default have `16px` so if we set html to 62.5%

`16 * 0.625 = 10`

* We make the fonts base `10` so to figure out other rem values we just multiple the rem value by 10 and that will give us the pixel value
* So now my `h1` is only `10px` (1rem)
    - I want it to be `24px` computed value so I set it to `2.4rem`

```css
html {
  font-size: 62.5%
}
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
}

h1 {
  font-size: 2.4rem;
}
```

* I make the body `1.6rem` and everything on the page will start at `16px`
* This is a great way to start all your sites with font sizing
* We'll remove `h1` for now:

```css
html {
  font-size: 62.5%
}
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
}
```

* We'll create a `components` folder that will mirror their jsx components folder
* `$ mkdir src/styles/components`
* And create our first component to style our Header
    - `$ touch src/styles/components/_header.scss`

### import our new partial
`styles.scss`

```css
@import './base/base';
@import './components/header';
```

`_header.scss`

```
.header {}
```

* Add our class to our `Header` component
* I changed the `div` to be a `header` element to make it slightly more semantic

`src/components/Header.js`

```
import React from 'react';

const Header = props => (
  <header className="header">
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </header>
);

Header.defaultProps = {
  title: 'Indecison',
};

export default Header;
```

* Our styles show up in the browser (make sure server is running)
* But our styles are not pretty

## BEM (Block, Element, Modifier) Naming Convention
* Pro
    - Reduces nesting issue
    - Eliminates specificity issues

`_header.scss`

```css
.header {
  background: #20222b;
  color: #ffffff;
  margin-bottom: 4.8rem;
  padding: 1.6rem 0;

  &__title {
    font-size: 3.2rem;
    margin: 0;
  }

  &__subtitle {
    color: #a5afd7;
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0;
  }
}
```

`Header.js`

```
import React from 'react';

const Header = props => (
  <header className="header">
    <h1 className="header__title">{props.title}</h1>
    {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
  </header>
);

Header.defaultProps = {
  title: 'Indecision',
};

export default Header;
```

### What it should look like after our we added `scss`
![scss added](https://i.imgur.com/0z6YbOa.png)

* [Learn more about BEM](http://getbem.com/)

# Nesting Flexbox

**nesting-flexbox-index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Nesting Flexbox</title>
  <link rel="stylesheet" href="node_modules/normalize.css">
  <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/style-nested-flex.css">
</head>

<body>
  <div class="container">
    <div class="slider"><img src="img/placeholder.png" alt="slider placeholder"></div>
    <nav class="slider-nav">
      <ul>
        <li class="arrow"><a href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i></a></li>
        <li>
          <a href="">Add a CLI to Node Apps</a>
        </li>
        <li>
          <a href="">Spectacle</a>
        </li>
        <li>
          <a href="">Small Modules: Tales from a Developer</a>
        </li>
        <li>
          <a href="">The End</a>
        </li>
        <li class="arrow"><a href=""><i class="fa fa-arrow-right" aria-hidden="true"></i></a></li>
      </ul>
    </nav>
  </div>
  <!-- END .container -->
</body>

</html>
```

**style-nested-flex.css**

```css
/* Box-size border-box */

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: sans-serif;
  margin: 0;
  background-image: linear-gradient(260deg, #2376ae 0%, #c16ecf 100%);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
}

img {
  max-width: 100%;
}

a {
  color: white;
  text-decoration: none;
  font-size: 15px;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 5px;
}

a:hover {
  background: rgba(0, 0, 0, 0.4);
}

.slider-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

make this change

```css
.slider-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}
```

and that makes it look better

we have a little space left over so we now need to work with our flex item

add this

```css
/* our first flex item */

.slider-nav li {
  flex: 1;
}
```

and our page blows up

when we add a border we see the problem

```css
.slider-nav li {
  flex: 1;
  border: 1px solid red; // add this line
}
```

the li's are fine. our links are the problem

add this to fix our links

```css
.slider-nav a {
  display: block;
  width: 100%;
}
```

### work with the arrows
make them twice as small as the other nav items

```css
/* our first flex item */

.slider-nav li {
  flex: 2;
  border: 1px solid red;
}

.slider-nav .arrow {
  flex: 1;
}
```

center text horizontally

```css
.slider-nav li {
  flex: 2;
  border: 1px solid red;
  text-align: center; // add this line
}
```

now we want to align items vertically center

we add `align-items: center` to `.slider-nav ul` but that doesn't do a good job

![bad center alignment](https://i.imgur.com/uBXRD4F.png)

* if we used align-items: stretch (the default value) they would all expand to the height of the largest item

* we remove align-items: center from `.slider-nav ul`

and we make this change

```css
.slider-nav li {
  flex: 2;
  /* this is flex item -ish */
  border: 1px solid red;
  text-align: center;
  display: flex; /* ADD THIS LINE */
  /* this is flex container -ish */
}
.slider-nav a {
  flex-basis: 100%;
}
```

here is our final css

```css
/* Box-size border-box */

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: sans-serif;
  margin: 0;
  background-image: linear-gradient(260deg, #2376ae 0%, #c16ecf 100%);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
}

img {
  max-width: 100%;
}

a {
  color: white;
  text-decoration: none;
  font-size: 15px;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 5px;
}

a:hover {
  background: rgba(0, 0, 0, 0.4);
}


/* our flex container */

.slider-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}


/* our first flex item */

.slider-nav li {
  flex: 2;
  /* this is flex item -ish */
  text-align: center;
  display: flex;
  /* this is flex container -ish */
}

.slider-nav .arrow {
  flex: 1;
}

.slider-nav a {
  flex-basis: 100%;
  display: flex;
  align-items: center;
}


/* this is the flex item */

.slider-nav span {
  display: block;
  width: 100%;
}

.arrow a {
  font-size: 30px;
}
```

and we needed to add span elements inside our links to be able to nest and center vertically

```html
<nav class="slider-nav">
  <ul>
    <li class="arrow">
      <a href="#"><span><i class="fa fa-arrow-left" aria-hidden="true"></i></span></a>
    </li>
    <li>
      <a href="#"><span>Add a CLI to Node Apps</span></a>
    </li>
    <li>
      <a href="#"><span>Spectacle</span></a>
    </li>
    <li>
      <a href="#"><span>Small Modules: Tales from a Developer</span></a>
    </li>
    <li>
      <a href="#"><span>The End</span></a>
    </li>
    <li class="arrow"><a href=""><span><i class="fa fa-arrow-right" aria-hidden="true"></i></span></a>
  </ul>
</nav>
```

## Flexbox pricing grid

**scss/style.pricing-grid.scss**

```css
/* Box-size border-box */

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: sans-serif;
  margin: 0;
  background-image: linear-gradient(260deg, #2376ae 0%, #c16ecf 100%);
}

a {
  color: white;
}

.plan ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.plan ul li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.plan ul li:last-child {
  border-bottom: 0;
}

.plan a {
  text-decoration: none;
  background: #FEFF00;
  padding: 10px;
  color: black;
  border-radius: 4px;
}

.plan h2 {
  text-transform: uppercase;
  color: white;
  letter-spacing: 2px;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
}

.price {
  font-size: 50px;
  font-family: serif;
  margin: 10px 0;
}

.pricing-grid {
  max-width: 750px;
  margin: 0 auto;
  border: 1px solid red;
}
```

**index.pricing-grid.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Flex Pricing Grid</title>
</head>

<body>
  <!-- flex container -->
  <div class="pricing-grid">
    <div class="plan plan1">
      <h2>Cat</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam fuga beatae explicabo, corporis porro.</p>
      <ul class="features">
        <li>Meooooww</li>
        <li>Kitty Litter</li>
        <li>Scratch toys</li>
      </ul>
      <p class="price">free</p>
      <a href="#">🐱 Awesome!</a>
    </div>
    <!-- END plan1 -->
    <div class="plan plan2">
      <h2>Cat</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam fuga beatae explicabo, corporis porro. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam fuga beatae explicabo, corporis porro.</p>
      <ul class="features">
        <li>Meooooww</li>
        <li>Kitty Litter</li>
        <li>Scratch toys</li>
      </ul>
      <p class="price">free</p>
      <a href="#">🐶 Best Deal!</a>
    </div>
    <!-- END plan2 -->
    <div class="plan plan3">
      <h2>Cat</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam fuga beatae explicabo, corporis porro.</p>
      <ul class="features">
        <li>Meooooww</li>
        <li>Kitty Litter</li>
        <li>Scratch toys</li>
      </ul>
      <p class="price">free</p>
      <a href="#">🐠 Amazing!</a>
    </div>
    <!-- END plan3 -->
  </div>
  <!-- END pricing-grid -->
</body>

</html>
```

add this to make our page look better

```css
/* flex container */

.pricing-grid {
  max-width: 750px;
  margin: 0 auto;
  // border: 1px solid red; remove this line
  display: flex; // add this line
}
```

this will make each plan the same width

```css
.plan {
  flex: 1;
}
```

make our plans look more styled

```css
.plan {
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}
```

put call to action buttons all along the bottom

```css
.pricing-grid {
  max-width: 750px;
  margin: 0 auto;
  //
  display: flex;
  align-items: center; // add this line
}
```

how can we align all 3 buttons on bottom of plans?

* add a `cta` class to all the call to action buttons

```css
/* flex container */

.pricing-grid {
  max-width: 750px;
  margin: 0 auto;
  //
  display: flex;
  // align-items: center; // add this line
}

.plan {
  background: rgba(255, 255, 255, 0.2);
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  // 
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.plan > * {
  flex: 1 1 100%;
}

.plan .cta {
  align-self: flex-end;
}
```

add this is you want them to be centered horiz and vertically in pricing-grid

```css
.pricing-grid {
  max-width: 750px;
  margin: 0 auto;
  //
  display: flex;
  align-items: center; // add this line
}
```

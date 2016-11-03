# Flex and navs

**index-nav.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Flex nav</title>
  <link rel="stylesheet" href="node_modules/normalize.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class="container">
    <nav class="flex-nav">
      <ul>
        <li><a href="#">Item 01</a></li>
        <li><a href="#">Item 02</a></li>
        <li><a href="#">Item 03</a></li>
        <li><a href="#">Item 04</a></li>
        <li><a href="#">Item 05</a></li>
        <li><a href="#">Item 06</a></li>
        <li class="social"><a href="#"><i class="fa">fa fa-twitter</i></a></li>
        <li class="social"><a href="#"><i class="fa">fa fa-facebook</i></a></li>
        <li class="social"><a href="#"><i class="fa">fa fa-github</i></a></li>
        <li class="social"><a href="#"><i class="fa">fa fa-github</i></a></li>
      </ul>
    </nav>
  </div>
</body>

</html>
```

style.css

```css
/* flex container */

.flex-nav ul {
  border: 1px solid black;
  list-style: none;
  margin: 0;
  padding: 0;
}
```

add this line

```
.flex-nav ul {
  border: 1px solid black;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex; // add this line
}
```

now the items are horizontal

let's add font awesome

$ npm install font-awesome --save

note: this rule will overwrite font-awesome (so comment it out)

```css
*,
*:before,
*:after {
  // font-family: sans-serif;
  margin: 0;
  background-image: linear-gradient(260deg, #2376ae 0%, #c16ec 100%);
}
```

add this and they will spread out and cover the empty space on the right

```css
.flex-nav li {
  flex: 1;
}
```

we want the regular nav items to take 3X the amount of space as the social items

so make this change
```css
a {
  color: white;
  font-weight: 100;
  letter-spacing: 2px;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 0; // set left/right padding to 0
  display: inline-block;
  width: 100%;
  text-align: center;
  transition: all 0.5s;
}
```

```css
.flex-nav li {
  flex: 3;
}

.flex-nav .social {
  flex: 1;
}
```

Now it is looking nice

![nice looking nav](https://i.imgur.com/IK3DxzZ.png)

## mobile
we want them to wrap on smaller devices

* to wrap you need to add width
* so if you just do this, it won't work

```css
@media all and (max-width: 1000px) {
  flex-nav ul {
    flex-wrap: wrap;
  }
}
```

flex: grow shrink width

```css
/* flex container */

.flex-nav ul {
  border: 1px solid black;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.flex-nav li {
  flex: 3;
}

.flex-nav .social {
  flex: 1;
}

@media all and (max-width:1000px) {
  .flex-nav ul {
    flex-wrap: wrap;
  }
  .flex-nav li {
    flex: 1 1 50%;
  }
  .flex-nav .social {
    flex: 1 1 25%;
  }
}

@media all and (max-width:500px) {
  .flex-nav li {
    flex-basis: 100%;
  }
}
```

## Mobile Content Reordering with Flexbox

**nav-index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Flex nav</title>
  <link rel="stylesheet" href="node_modules/normalize.css">
  <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class="container">
    <header class="top">
      <a href="#" class="toggle-nav menu-icon">&#9776 Menu</a>
    </header>
    <nav class="flex-nav">
      <ul>
        <li><a href="#">Item 01</a></li>
        <li><a href="#">Item 02</a></li>
        <li><a href="#">Item 03</a></li>
        <li><a href="#">Item 04</a></li>
        <li><a href="#">Item 05</a></li>
        <li><a href="#">Item 06</a></li>
        <li class="social">
          <a href="#"><i class="fa fa-twitter"></i></a>
        </li>
        <li class="social">
          <a href="#"><i class="fa fa-facebook"></i></a>
        </li>
        <li class="social">
          <a href="#"><i class="fa fa-github"></i></a>
        </li>
        <li class="social">
          <a href="#"><i class="fa fa-instagram"></i></a>
        </li>
      </ul>
    </nav>
    <section class="hero">
      <img src="img/background.png" alt="abstract image" width="821" height="493">
    </section>
    <section class="details">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, placeat dolor assumenda! </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem labore, libero nisi amet distinctio omnis quo consequatur nostrum modi, dolore maiores veniam, alias necessitatibus repudiandae rerum.</p>
    </section>
    <section class="signup">
      <form action="" class="signup">
        <input type="text" placeholder="Your Name">
        <input type="email" placeholder="Email Address">
        <input type="submit" value="Sign Me Up!">
      </form>
    </section>
    <footer>
      <p>&copy; 2016</p>
    </footer>
  </div>
  <!-- END .container -->
  <script src="node_modules/jquery/dist/jquery.min.js"></script>
  <script>
  $(function() {
    $('.toggle-nav').on('click', function() {
      $('.flex-nav ul').toggleClass('open');
    });
  });
  </script>
</body>

</html>
```

**scss/style.scss**

```css
@import "general";
@import "navbar";

/* flex container */

.flex-nav ul {
  border: 1px solid black;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.flex-nav li {
  flex: 3;
}

.flex-nav .social {
  flex: 1;
}

@media all and (max-width:1000px) {
  .flex-nav ul {
    flex-wrap: wrap;
  }
  .flex-nav li {
    flex: 1 1 50%;
  }
  .flex-nav .social {
    flex: 1 1 25%;
  }
}

@media all and (max-width:500px) {
  .flex-nav li {
    flex-basis: 100%;
  }
}
```

**_general.scss**

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
  font-weight: 100;
  letter-spacing: 2px;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 5px; // set left/right padding to 0
  display: inline-block;
  width: 100%;
  text-align: center;
  transition: all 0.5s;
}

a:hover {
  background: rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
}

.toggle-nav {
  display: none;
}

img {
  width: 100%;
}

input {
  padding: 10px;
  border: 0;
}

section,
footer {
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px;
  color: white;
  font-weight: 100;
}
```

* check out the unicode for the navicon

**_navbar.scss**

```css
// Navicon Styling
.menu-icon {
  font-size: 3em;
  color: #4C0B2F;
  cursor: pointer;
  transition: all .5s ease;
  &:hover {
    color: #A21738;
  }
}
```

* good idea to always wrap your site in a wrapper/container
* helps when you want to work with flex-items because they only work if the parent container is set to `display: flex`

add this

```css
.container {
  display: flex;
}
```

and when you shrink to 500px, your site breaks
because flex-direction is by default `row`, just change it to column

with

```css
.container {
  display: flex;
  flex-direction: column;
}
```

And now your site looks better

## Now let's apply ordering

We want our nav to go to the top if we do this:

```css
.flex-nav {
  order: 1;
}
```

it won't go to top but instead, the bottom

we need to reorder all our flex-items to have a default order of something high like 9999

so do this

```css
@media all and (max-width:500px) {
  .flex-nav li {
    flex-basis: 100%;
  }
  // flex wrapper
  .container {
    display: flex;
    flex-direction: column;
  }
  // flex item
  .container > * {
    order: 9999;
  }
  .flex-nav {
    order: 1;
  }
}
```

and we want to show our navicon at 500px

```css
.toggle-nav {
  display: block;
}
.flex-nav ul {
  display: none
}
```

click navicon and view in chrome elements
you will see a class of `open` toggle on and off
* from our jquery

To get our order correct make this change to nav-index.html

```html
<div class="container">
  <header class="top">
    <h1>The Order of Flex</h1>
  </header>
  <nav class="flex-nav">
    <a href="#" class="toggle-nav menu-icon">&#9776 Menu</a>
    <ul>
```

We need the toggle to be inside the flex-nav

make this modification too

```css
header, // add this line
section,
footer {
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px;
  color: white;
  font-weight: 100;
}
```

make .top order of 2

```css
.top {
  order: 2;
}
.details {
  order: 3;
}
.signup {
  order: 4;
}
```

now use inspector to see the order of your elements. you will see it jump around because you reordered the dom using flex


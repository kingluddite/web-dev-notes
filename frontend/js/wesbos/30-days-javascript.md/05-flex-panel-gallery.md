# Flex Panel Gallery

## Start file

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flex Panels 💪</title>
  <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet" type="text/css">
</head>
<body>
  <style>
    html {
      box-sizing: border-box;
      background:#ffc600;
      font-family:'helvetica neue';
      font-size: 20px;
      font-weight: 200;
    }
    body {
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    .panels {
      min-height:100vh;
      overflow: hidden;
    }
    .panel {
      background:#6B0F9C;
      box-shadow:inset 0 0 0 5px rgba(255,255,255,0.1);
      color:white;
      text-align: center;
      align-items:center;
      /* Safari transitionend event.propertyName === flex */
      /* Chrome + FF transitionend event.propertyName === flex-grow */
      transition:
        font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        background 0.2s;
      font-size: 20px;
      background-size:cover;
      background-position:center;
    }
    .panel1 { background-image:url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500); }
    .panel2 { background-image:url(https://source.unsplash.com/1CD3fd8kHnE/1500x1500); }
    .panel3 { background-image:url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d); }
    .panel4 { background-image:url(https://source.unsplash.com/ITjiVXcwVng/1500x1500); }
    .panel5 { background-image:url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500); }

    /* Flex Children */
    .panel > * {
      margin:0;
      width: 100%;
      transition:transform 0.5s;
    }
    .panel p {
      text-transform: uppercase;
      font-family: 'Amatic SC', cursive;
      text-shadow:0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
      font-size: 2em;
    }
    .panel p:nth-child(2) {
      font-size: 4em;
    }
    .panel.open {
      font-size:40px;
    }
    .cta {
      color:white;
      text-decoration: none;
    }
  </style>


  <div class="panels">
    <div class="panel panel1">
      <p>Hey</p>
      <p>Let's</p>
      <p>Dance</p>
    </div>
    <div class="panel panel2">
      <p>Give</p>
      <p>Take</p>
      <p>Receive</p>
    </div>
    <div class="panel panel3">
      <p>Experience</p>
      <p>It</p>
      <p>Today</p>
    </div>
    <div class="panel panel4">
      <p>Give</p>
      <p>All</p>
      <p>You can</p>
    </div>
    <div class="panel panel5">
      <p>Life</p>
      <p>In</p>
      <p>Motion</p>
    </div>
  </div>

  <script>
  </script>



</body>
</html>
```

Panels are stacked horizontally on top of each other

## Adding some Flex

Add this

```css
.panels {
  min-height:100vh;
  overflow: hidden;
  display: flex; /* add this rule */
}
```

Panels now are vertically aligned to the left

## Spread out with Flex

Now we tell each panel to spread out and fill available space

At the bottom of the `.panel` rule add `flex: 1`

That will tell each panel to equally distribute each other across the browser

## Flex Items (aka Flex children)

`.panel > * `

Add a border to this rule and it will add it to all of our flex items

`border: 1px solid red;`

# Adding more rules to `.panel`

```
justify-content: center;
align-items: center;
display: flex;
```

That will center the text in each panel. Here is an example of when we are nesting flexbox

**note** An element in flexbox can be both a flex item as well as a flex container

## Columns vs Rows
We want our text to go from the default of `row` to `column`

Add this to `.panel`

`flex-direction: column`

Now we want to center all our text so that each takes up a third

Add this to `.panel > *`

`flex: 1 0 auto`

That takes each text and splits them in 3rds

Then add flex on each item with `display: flex`

That aligns the text to the left

But if we add:

```
justify-content: center;
align-items: center;
```

That will center all text nicely in each vertical panel

## Move the first and last word of each vertical off screen vertically
Add this rule below `.panel > *`

```
.panel > *:first-child { transform: translateY(-100%); }
.panel > *:last-child { transform: translateY(100%); }
```

We will use JavaScript to dynamically generate `.open-active` classes

Add this below the above code we just entered

```js
.panel.open-active > *:first-child { transform: translateY(0); }
.panel.open-active > *:last-child { transform: translateY(0); }
```

That will pull the text back in. Use the inspector and add the class `open-active` to any panel and watch the top and bottom text fade in for that panel

![open-active](https://i.imgur.com/2zkypHw.png)

Remove the red border

## Make the panel `transition` larger when it has `.open-active` class

```css
.panel.open {
      flex: 5; /* add this */
      font-size:40px;
}
```

Before we used a `flex: 1` and that means equally distribute the panels. This rule says if the `.panel` class also has an `.open` class then make that panel take up to 5 times more space then the others. Try it in the inspector by adding `.open` to the `.panel`

Like this:

![add open](https://i.imgur.com/Ea3yuZx.png)

And when you remove it it will transition back to its original size

These are the existing rules that help us transition the font-size, flex and background

```css
.panel {
    /* more code */
transition:
      font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
      flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
      background 0.2s;
    /* more code */
}
```

## Add our JavaScript
This will add and remove all our classes

Add this inside the `<script></script>` tags

```js
// grab a NodeList of all the .panels
const panels = document.querySelectorAll('.panels');

// toggle .open class on this panel
function toggleOpen() {
  this.classList.toggle('open');
}

// loop through each panel and add a click event listener
// that will call the toggleOpen function on click of panel
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
```

**note** Why `toggleOpen` and `not toggleOpen()`?

Because without the parenthesees it will wait until the click happens but with the parenthesees it will call the function on page load. We don't want to run the function we just want to give a reference of the function

Why is it not working? Use inspector to see for your self. Where is the `.open` class being generated when we click on the panel?

It is adding it to the `.panels` class instead of the `.panel` class. Make this change:

`const panels = document.querySelectorAll('.panel');`

And it will work

## Once `.open` is added then transition in top and bottom words

### transitionend

```js
// toggle .open class on this panel
    function toggleOpen() {
      console.log('hello from toggle open');
      this.classList.toggle('open');
    }

    function toggleActive(e) {
      console.log('hello from toggle active');
      console.log(e.propertyName);
      // this.classList.toggle('open-active');
    }

    // loop through each panel and add a click event listener
    // that will call the toggleOpen function on click of panel
    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```

View in browser and see how inspector updates when you click on panel

You will see that both flex and font-size are transitioning when the class of `.open` is added and removed

So you would think our function would be this:

```js
function toggleActive() {
      this.classList.toggle('open-active');
    }
```

But if we test we will see that multiple `transitionend` events are

```js
// toggle .open class on this panel
    function toggleOpen() {
      console.log('hello from toggle open');
      this.classList.toggle('open');
    }

    function toggleActive(e) {
      console.log('hello from toggle active');
      console.log(e.propertyName);
      // this.classList.toggle('open-active');
    }

    // loop through each panel and add a click event listener
    // that will call the toggleOpen function on click of panel
    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```

View in browser and see how inspector updates when you click on panel

You will see that both flex and font-size are transitioning when the class of `.open` is added and removed

### flex-grow
We only care about flex-grow so we do a check

```js
function toggleActive(e) {
      if(e.propertyName === 'flex-grow') {
        
      }
    }
```

But that would cause a problem in Safari because it refers to `flex` and not `flex-grow` so we need to use this code instead

```js
function toggleActive(e) {
      if(e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
      }
    }
```

Now with flex we have panels grow largest if one is open and less if more than one is open. All without using widths!


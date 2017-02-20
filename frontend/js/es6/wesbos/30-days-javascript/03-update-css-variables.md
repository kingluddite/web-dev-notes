# Update CSS Variables with JS

## Starting File

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Scoped CSS Variables and JS</title>
</head>
<body>
  <h2>Update CSS Variables with <span class='hl'>JS</span></h2>

  <div class="controls">
    <label for="spacing">Spacing:</label>
    <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">

    <label for="blur">Blur:</label>
    <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">

    <label for="base">Base Color</label>
    <input id="base" type="color" name="base" value="#ffc600">
  </div>

  <img src="https://source.unsplash.com/7bwQXzbF6KE/800x500">

  <style>

    /*
      misc styles, nothing to do with CSS variables
    */

    body {
      text-align: center;
    }

    body {
      background: #193549;
      color: white;
      font-family: 'helvetica neue', sans-serif;
      font-weight: 100;
      font-size: 50px;
    }

    .controls {
      margin-bottom: 50px;
    }

    input {
      width:100px;
    }
  </style>

  <script>
  </script>

</body>
</html>
```

We had variables in SASS so what's new?

Because now CSS variables can be updated with JavaScript

What?

When you update a variable in CSS, everywhere on the page that that page is referenced, will update itself
With Sass you define them at compile time and then it gets compiled and you can not change it

## 3 variables
1. Spacing
2. Blur
3. Base Color

## How do CSS Variables work
You declare them on some sort of element

We will declare it on `root` (the highest level that you can get)

* Very similar to declaring it on the `HTML` element

### Define variables in CSS

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}
```

**note** `--` is how you define variables in CSS

## How do we add JavaScript to update those CSS variables?

**note** `querySelector()` returns a **node list**

![node list](https://i.imgur.com/fgDa9gt.png)

It looks like an Array but it is **not** an array

### What is the difference between a `node list` and an `array`?
An array has many methods for dealing with an array (ie map, reduce)

![some methods Array has](https://i.imgur.com/jng3c54.png)

If you open the prototype for the nodelist (___proto_), we only have a couple methods

![node list methods](https://i.imgur.com/cdjWcyK.png)

**note** Sometimes you may need to convert your NodeList into an Array to access some of the Array methods

We will use the `forEach()` method to loop through our `NodeList` (it was recently added). So for this instance, we won't need to convert it to an array (_unless you are using an older browser that does not support the `forEach()` method of `NodeList`_)

## Output values in console
```js
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  console.log(this.value);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate))
```

Drag and watch console update with new values

## Add mousemove
```js
inputs.forEach(input => input.addEventListener('change', handleUpdate));
// Add this line
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

## What is the suffix of the variables we are working with
with range and blur we need a suffix of `px` so we use the data attribute `data-sizing=10px`

**data attributes** are new with HTML5 and you can make these up. Just prefix your attribute with `data-` + `your word` + your value (ie `data-sizing = "px"`)

## What is `this.dataset`
dataset is an Object that contains all the data attributes from that specific element

```js
function handleUpdate() {
  console.log(this.dataset);
}
```

You can add data-attributes like this:

```html
<input type="range" name="spacing" min="10" max="200" value="10" data-sizing="px" data-awesome="yes" data-forrealz="heck ya" />
```

And it will hold all those values

![multiple data-attributes](https://i.imgur.com/e5X2veW.png)

![dataset example](https://i.imgur.com/2ZUD9mC.png)

Any time you want to grab all the data-attributes you can use this.dataset and it will put them all inside an Object for you

## Appending suffixes

```js
function handleUpdate() {
// some have suffix or they have no suffix
   const suffix = this.dataset.sizing || '';
}
```

We need to add the `|| '';` at the end or we will append `undefined` at the end

```js
function handleUpdate() {
  // some have suffix or they have no suffix
  const suffix = this.dataset.sizing || '';
  console.log(suffix);
}
```

Now test and you'll see either a `px` in the console when you scroll over `Spacing` or `Blur` or nothing if you scroll over `Base Color` color sliders

Now we need to update a variable?

How do you select a variable?

We will select `:root` and set a property of `base`, `spacing` or `blur`

```js
function handleUpdate() {
  // some have suffix or they have no suffix
  const suffix = this.dataset.sizing || '';
  console.log(this.name);
}
```

If you hover over, you will see `spacing`, `blur` or `base` because the inputs each have a `name` attribute

```js
function handleUpdate() {
  // some have suffix or they have no suffix
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value);
}
```

We use backticks (` `) so we can insert a dynamic value, which let's us point the `--` to the currently rolled over `spacing`, `blur` or `base` and then setting that to the value

After we do that and test it still is not working. Why not?

![changing root variables](https://i.imgur.com/vv0UQ0b.png)

And that is the purpose of the suffix variable so we can append it like this:

```js
function handleUpdate() {
  // some have suffix or they have no suffix
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
```

![suffix working](https://i.imgur.com/EhDvNT5.png)

## Add attribute
![add attribute to html with console](https://i.imgur.com/z5259TP.png)

## Override --base CSS variable

![overide variable](https://i.imgur.com/2jHVXty.png)

The above rule because it is further down in the DOM tree, it wins out and the root `--base` color is overwritten

* Just like CSS cascade, the closer one wins out
* If you change the value using the color slider, it won't change because we updated it using a lower scope

## Finished

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Scoped CSS Variables and JS</title>
</head>
<body>
  <h2>Update CSS Variables with <span class='hl'>JS</span></h2>

  <div class="controls">
    <label for="spacing">Spacing:</label>
    <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">

    <label for="blur">Blur:</label>
    <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">

    <label for="base">Base Color</label>
    <input id="base" type="color" name="base" value="#ffc600">
  </div>

  <img src="https://source.unsplash.com/7bwQXzbF6KE/800x500">

  <style>
    :root {
      --base: #ffc600;
      --spacing: 10px;
      --blur: 10px;
    }

    img {
      padding: var(--spacing);
      background: var(--base);
      filter: blur(var(--blur));
    }

    .hl {
      color: var(--base);
    }

    /*
      misc styles, nothing to do with CSS variables
    */

    body {
      text-align: center;
    }

    body {
      background: #193549;
      color: white;
      font-family: 'helvetica neue', sans-serif;
      font-weight: 100;
      font-size: 50px;
    }

    .controls {
      margin-bottom: 50px;
    }

    input {
      width:100px;
    }
  </style>

  <script>
    const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
  </script>


</body>
</html>
```












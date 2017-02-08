# Spread exercise

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Spread Exercise</title>
<style>
body {
  min-height: 100vh;
  background: #ffc600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: #ffffff;
  text-shadow: 3px 3px 0 rgba(0,0,0,0.2);
}

</style>
</head>
<body>
<h2 class="jump">SPREADS!</h2>
<script>

</script>
</body>
</html>
```

We want to wrap each letter in a span tag

```js
const heading = document.querySelector('.jump');
sparanWrap(heading.textContent);

function sparanWrap(word) {
  console.log(word);
}
```

Output: `SPREADS!`

We don't want that, we want every single letter to be an individual item

```js
function sparanWrap(word) {
  console.log([... word]); // ["S", "P", "R", "E", "A", "D", "S", "!"]
}
```

Refractor to:

```js
const heading = document.querySelector('.jump');
const spans = sparanWrap(heading.textContent);
console.log(spans); // ["S", "P", "R", "E", "A", "D", "S", "!"]

function sparanWrap(word) {
  return [...word];
}
```

We took every single character out of the word and `spread` it

Now we need to wrap every single letter inside a `span`. This is a good use case for `.map()`

```js
const heading = document.querySelector('.jump');
const spans = sparanWrap(heading.textContent);
console.log(spans);

function sparanWrap(word) {
  return [...word].map(letter => `<span>${letter}</span>`);
}
```

Gives us

```
["<span>S</span>", "<span>P</span>", "<span>R</span>", "<span>E</span>", "<span>A</span>", "<span>D</span>", "<span>S</span>", "<span>!</span>"]
```

We now need to get rid of the commas so we add a `join('')`

```js
function sparanWrap(word) {
  return [...word].map(letter => `<span>${letter}</span>`).join('');
}
```

Now to attach to the DOM

```js
const heading = document.querySelector('.jump');
heading.innerHTML = sparanWrap(heading.textContent);

function sparanWrap(word) {
  return [...word].map(letter => `<span>${letter}</span>`).join('');
}
```

View in inspector

![spans all over](https://i.imgur.com/j4gizWQ.png)

Add santa hand on rollover

```css
.jump span {
  cursor:url('http://csscursor.info/source/santahand.png'), default;
}
```

Change color on hover

```css
.jump span:hover {
  color: black;
}
```

Add rollover to pop images out when rolled over

```css
.jump span:hover {
  transform: translateY(-20px);
}
```

Doesn't work because `span` is inline and you can not translateY on inline elements

```css
.jump span {
  display: inline-block;
  cursor:url('http://csscursor.info/source/santahand.png'), default;
}
```

Works but we want to add a nice transition

```css
.jump span {
  display: inline-block;
  transition: transform 0.3s;
  cursor:url('http://csscursor.info/source/santahand.png'), default;
}
```

Make the animation slightly faster

```css
.jump span {
  display: inline-block;
  transition: transform 0.2s;
  cursor:url('http://csscursor.info/source/santahand.png'), default;
}
```

Update the 3D effect

```css
.jump span:hover {
  transform: translateY(-20px) rotate(10deg) scale(2);
}
```

Roll over and look at the awesome text effect


# Swapping Variables with Destructuring

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Destructuring Stuff</title>
</head>
<body>
<script>
  let inRing = 'Hulk';
  let onSide = 'Andre the Giant';
</script>
</body>
</html>
```

Wrestling app where the two wrestlers swap places

The old way to do this:

```js
var tmp = inRing;
inRing = onSide;
onSide = tmp;
// then delete tmp variable
```

But that is hard to follow

With Destructuring we can just swap them

`  [inRing, onSide] = [onSide, inRing];`

This will create an Array of `onSide` and `inRing` and then immediately destructure them into the opposite variables (That is why we used `let` instead of `const`)

```js
let inRing = 'Hulk Hogan';
let onSide = 'Andre the Giant';

[inRing, onSide] = [onSide, inRing];
```

Let's `console.log()` before and after to see if it works

```js
let inRing = 'Hulk Hogan';
let onSide = 'Andre the Giant';
console.log(inRing, onSide); // Hulk Hogan Andre the Giant
[inRing, onSide] = [onSide, inRing];
console.log(inRing, onSide); // Andre the Giant Hulk Hogan
```

If you change from `let` to `const` you will get `TypeError:  Assignment to constant variable.`


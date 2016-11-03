# Flexbox Sizing

index-emoji.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Flexbox Tutorial</title>
  <link rel="stylesheet" href="node_modules/normalize.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class="container">
    <div class="box box1">one 😎</div>
    <div class="box box2">two 🍕</div>
    <div class="box box3">three 🍟</div>
    <div class="box box4">four 👍</div>
    <div class="box box5">five 👀</div>
    <div class="box box6">six 💩</div>
  </div>
</body>

</html>
```

css/style.css

each item will take up space to fill up row
```css
@import 'boxes';
.container {
  display: flex;
}

.box {
  flex: 1;
}
```

when there is space give box 4 tripple the amount of all the others

```css
@import 'boxes';
.container {
  display: flex;
}

.box {
  flex: 1;
}

.box4 {
  flex: 3;
}
```

* flex-grow
* flex-shrink
* flex-basis - natural size of box

```css
@import 'boxes';
.container {
  display: flex;
}

.box {
  flex-grow: 1;
}
```

so if you have both boxes as flex-basis: 400px, they box take up that space
but if one box also have flex-grow: 1, that box fills the remaining space of container

flex grow is how we deal with extra space
flex shrink is how we slim ourselves down when there is no space

```css
@import 'boxes';
.container {
  display: flex;
}

.box1 {
  flex-basis: 400px;
  flex-grow: 10;
  flex-shrink: 5;
}

.box2 {
  flex-basis: 400px;
  flex-grow: 1;
  flex-shrink: 1;
}
```

but you would right like this flex: grow, shrink, basis(single line)

```css
.box2 {
  flex: 400px, 1, 1;
}
```

## How flexbox flex-basis and wrapping work together
set flex-basis width or height and have items wrap and stretch automatically

if you have a flex-basis of 500px with 5 items
you won't have enough room
so flex-shrink kicks in

so you could put `flex-wrap: wrap` on in the container

if we bring back our 6 emojis
we will have extra space, so we can use flex-grow

```css
@import 'boxes';
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  border: 10px solid goldenrod;
}

.box {
  flex-grow: 1;
}

.box3 {
  flex-grow: 5;
}
```

stacking columns

```css
@import 'boxes';
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  border: 10px solid goldenrod;
}

.box {
  flex-basis: 250px;
  flex-grow: 1;
}

.box3 {
  flex-grow: 5;
}
```

autoprefix online
[link to site](https://autoprefixer.github.io/)

gulpfile.js (root)

```js
'use strict';
var gulp = require( 'gulp' );
var autoprefixer = require( 'gulp-autoprefixer' );

gulp.task( 'styles', function() {
  gulp.src( 'css/style.css' )
    .pipe( autoprefixer() )
    .pipe( gulp.dest( 'build' ) );
} );

gulp.task( 'watch', function() {
  gulp.watch( 'css/style.css', [ 'styles' ] );
} );
```

**package.json**

```js
{
  "name": "flexbox",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "normalize.css": "^4.2.0"
  },
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.1"
  }
}
```

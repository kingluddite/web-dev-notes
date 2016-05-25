# Compass Color Helpers

`_colors.scss`

```scss
$base: #4682B4;

.colors {
    li {
      background-color: $base;
    }
    li:nth-child(2) {
      background: adjust-lightness($base, 10%);
    }
    li:nth-child(3) {
      background: adjust-saturation($base, 30%);
    }
    li:nth-child(4) {
      @include background( linear-gradient($base, shade($base, 50%)) );
    }
    li:nth-child(5) {
      background: scale-saturation($base, 80%);
    }
    li:nth-child(6) {
      background: shade($base, 30%);
    }
    li:last-child {
      background: tint($base, 40%);
    }
}

.button {

}
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Compass Layout</title>
    <link rel="stylesheet" href="css/screen.css">
</head>
<body>
    <div class="container">
        <ul class="colors">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <a href="#" class="button">View More Colors</a>
    </div>
</body>
</html>
```

## [Creating Color Contrast](http://compass-style.org/reference/compass/utilities/color/contrast/)

```scss
$base: #4682B4;
$lighten: adjust-lightness($base, 10%);

.colors {
    li {
      background-color: $base;
    }
    li:nth-child(2) {
      background: adjust-lightness($base, 10%);
    }
    li:nth-child(3) {
      background: $lighten;
    }
    li:nth-child(4) {
      @include background( linear-gradient($base, shade($base, 50%)) );
    }
    li:nth-child(5) {
      background: scale-saturation($base, 80%);
    }
    li:nth-child(6) {
      background: shade($base, 30%);
    }
    li:last-child {
      background: tint($base, 40%);
    }
}

.button {
 @include contrasted($base);
 border: 2px solid shade($base, 25%);
 border-bottom-width: 5px;
 box-shadow: inset 0 1px $lighten;
 &:hover {
   @include contrasted(shade($base, 8%));
 }
}

/*
/////output///////
.button {
  background-color: #4682B4;
  color: #fff;
  border: 2px solid #356287;
  border-bottom-width: 5px;
  box-shadow: inset 0 1px #699bc4;
}
.button:hover {
  background-color: #4078a6;
  color: #fff;
}
 */
```

## [Compass URL Helpers](http://compass-style.org/reference/compass/helpers/urls/)

_page.scss

```scss
// INITIAL PAGE STYLES

$br: .5em;

* {
    @include box-sizing(border-box);
}
body {
    font: 1.1em/1.5 sans-serif;
    background: #f7f7f7;
}
.container {
    padding: 5% 5% 0;
}
.designs {
    @include horizontal-list;
    li {
        width: 24.7%;
        height: 350px;
        margin-left: .4%;
        background-repeat: no-repeat;
        background-size: 85%;
        background-position: center center;
    }
    li:first-child {
        border-radius: $br 0 0 $br;
        margin-left: 0;
    }
    li:last-child {
        border-radius: 0 $br $br 0;
    }
}
```

`index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Compass Layout</title>
    <link href="css/screen.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <ul class="designs">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</body>
</html>
```

screen.scss

```scss

// Compass Modules

@import "compass/reset";
@import "compass/css3";
@import "compass/typography";


// Partials

@import "page";
@import "url-helpers";
```

`_url-helpers.scss`

```scss
designs {
    li:first-child {
        background-color: #36add1;
        background-image: url('../img/money.png');
    }
}
```

image will break when working locally
to fix
uncomment this line in config.rb
```ruby
relative_assets = true
```

restart compass watch
view in browser and image will work again

to prevent image cache with new images a time stamp is added to images by compass

```css
background-image: url('../img/money.png?1464155815')
```

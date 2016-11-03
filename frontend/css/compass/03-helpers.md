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

## [Image Dimension Helpers](http://compass-style.org/reference/compass/helpers/image-dimensions/)

`image-width($image)`

`image-height($image)`

Compass can read the native width and height of any image in our images folder and then return them as width & height values in our `CSS`

```scss
.designs {
    li:first-child {
        background-color: #36add1;
        background-image: image-url('money.png');
        width: image-width('money.png') / 2;
        height: image-height('money.png') / 2;
        background-size: 100%;
    }
    li:nth-child(2) {
        background-color: #FFFFFF;
        background-image: image-url('money.png2');
        width: image-width('money.png2') / 2;
        height: image-height('money.png2') / 2;
        background-size: 100%;
    }
    li:nth-child(3) {
        background-color: #ff9100;
        background-image: image-url('money3.png');
        width: image-width('money3.png') / 2;
        height: image-height('money3.png') / 2;
        background-size: 100%;
    }
    li:last-child {
        background-color: #a183c9;
        background-image: image-url('money4.png');
        width: image-width('money4.png') / 2;
        height: image-height('money4.png') / 2;
        background-size: 100%;
    }
}
```

But we can make this better by creating a mixin that generates most of these values for us.

### Create a mixin
```
@mixin easy-image($img) {
  background-image: image-url($img);
  width: image-width($img) / 2;
  height: image-height($img) / 2;
}
```

we want high res images that are half their size

* grab 3 png images 

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
    </ul>
  </div>
</body>

</html>
```

`_page.scss`

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
    position: relative;
    margin-left: .4%;
    background-repeat: no-repeat;
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

`_url-helpers.scss`

```scss
// URL HELPERS
@mixin easy-image($img) {
  background-image: image-url($img);
  width: image-width($img) / 2;
  height: image-height($img) / 2;
}

// Images
.designs {
  li:first-child {
    background-color: #36add1;
    &:after {
      @include easy-image('money.png');
    }
  }
  li:nth-child(2) {
    background-color: #ff9100;
    &:after {
      @include easy-image('money.png');
    }
  }
  li:last-child {
    background-color: #a183c9;
    &:after {
      @include easy-image('money.png');
    }
  }
  li {
    width: 33.05%;
    height: 300px;
  }
  li:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-size: 100%;
  }
}
```

should look like this:

![finished look](https://i.imgur.com/SLrb8NP.png)

## [Compass Text Replace Utilities](http://compass-style.org/reference/compass/typography/text/replacement/)

image replacement - swap text for an image
* usually done by indenting the text off the page
  - and then using a background image to replace the text
  - commonly used for including logos or icons on pages

Mixin
`replace-text($img, [$x], [$y])`

`index.html`

```html
<!DOCTYPE html>
<html>

<head>
  <title>Soccermatters</title>
  <link href="css/screen.css" rel="stylesheet">
</head>

<body>
  <div class="container">
    <h1><span class="logo">Soccermatters</span> Playbook</h1>
    <ul class="designs">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</body>

</html>
```

[grab png](/2016/05/arsenal-football-club-embroidery-design-1331787468-2rmmxe2ix6in8p52g79yww.png) 

that will replace the text

`_url-helpers.png`

```scss
// Images
.logo {
  display: inline-block;
  margin-right: .2em;
  @include replace-text('a-logo.png');
  width: image-width('a-logo.png');
}
```

## [Compass Inline Data Helpers](http://compass-style.org/reference/compass/helpers/inline-data/)

`inline-image()` function

```scss
// Images
.logo {
  display: inline-block;
  margin-right: .2em;
  @include replace-text( inline-image('a-logo.png'));
  width: image-width('a-logo.png');
}
```

* embeds our image directly inside our stylesheet
* doesn't require a http server request hit but bloats css file with long string ([converts it to inline data](https://i.imgur.com/DL0USY8.png))

Best practice with inline - only embed images that are smaller than 1K

### [replace-text-with-dimensions($img)](http://compass-style.org/reference/compass/typography/text/replacement/#mixin-replace-text-with-dimensions)

[output code with inline](https://i.imgur.com/7FCcMWx.png)

```scss
// Images
.logo {
  display: inline-block;
  margin-right: .2em;
  @include replace-text-with-dimensions('a-logo.png', $inline: true);
}
```
* don't pass $inline: true, to not embed image



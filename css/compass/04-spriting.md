# Compass Spriting

## Github Repo
Grab the repo and experiment with sprites and compass.

[Github Repo Link](https://github.com/kingluddite/essential-compass-and-sprite-generation)

## What is a Sprite?
It is when we combine several images into one large image (aka `Sprite Sheet`).
* we use css positions to position each image on the sprite sheet to reveal the parts we need for certain areas in our design

### Pro
Helps site performance
* the browser has to download less images
    - less requests are made to the server

### Con
* Creating sprite sheet manually is tedious
* maintaining over time can be a huge pain

Compass makes creating and maintaining sprites sheets very simple

1. We drop our images in a folder
2. Compass creates our sprite sheet for us
    * figures out coordinates of each sprite
    * controls layout and spacing of each sprite
    * even outputs the css to display each sprite image

`index.html`

```html
<!DOCTYPE html>
<html>

<head>
  <title>SoccerMatters</title>
  <link href="css/screen.css" rel="stylesheet">
</head>

<body>
  <div class="container">
    <h1>Teams</h1>
    <ul class="social">
      <li><a href="#">Chelsea</a></li>
      <li><a href="#">Man U</a></li>
      <li><a href="#">FC Barcelona</a></li>
      <li><a href="#">Roma</a></li>
      <li><a href="#">Man City</a></li>
    </ul>
  </div>
</body>

</html>
```

`screen.scss`

```scss
@import "compass/reset";
@import "compass/css3";
@import "compass/utilities";
//
@import "page";
```

`_page.scss`

```scss
* {
    @include box-sizing(border-box);
}
body {
    font: 1.1em/1.5 sans-serif;
    background: #f7f7f7;
    text-align: center;
}
.container {
    padding: 15% 5% 0;
}
h1 {
    margin-bottom: 1.5em;
    font-size: 2.2em;
    color: #3983b7;
    font-weight: bold;
}
.social {
    @include horizontal-list(15px);
    display: inline-block;
}
```

create an `icons` directory inside your `img` directory
* must all be png files
* must import `compass/utilities` module
* grab icons that are `64px` x `64px`

## How do we tell Compass to import all our icons
With this line

`@import "icons/*.png";`

* remember our config.rb tells compass where our images are located
  - we told it that when we created our project and configured our config.rb at the beginning

`_sprites.scss`

```scss
@import "icons/*.png";

.social a {
  display: block;
  width: 64px;
  height: 64px;
}
```

Now compass will create a new sprite for us with all of our images

![sprite from compass](https://i.imgur.com/wAdWS5Q.png)

Here is what it looks like

![sprite](https://i.imgur.com/Cpd7Xqb.png)

* compass also gives sprite a cache buster (long random file name)
  - name changes any time we make updates to ensure the sprites are not cached

### Now we need to tell compass we need to include all the sprite images in our project

`@include all-icons-sprites;`
* include all the images inside the icons folder as sprites

Check out the output generated

```css
.icons-sprite, .icons-ars-icon, .icons-celtic, .icons-manu-icon, .icons-qpr, .icons-rangers {
  background-image: url('/img/icons-sa016a43e42.png');
  background-repeat: no-repeat;
}
.icons-ars-icon {
  background-position: 0 0;
}
.icons-celtic {
  background-position: 0 -32px;
}
.icons-manu-icon {
  background-position: 0 -64px;
}
.icons-qpr {
  background-position: 0 -96px;
}
.icons-rangers {
  background-position: 0 -128px;
}
.social a {
  display: block;
  width: 64px;
  height: 64px;
}

```


index.html fragment

```html
<body>
  <div class="container">
    <h1>Teams</h1>
    <ul class="social">
      <li><a href="#" class="icons-ars-icon">Arsenal</a></li>
      <li><a href="#" class="icons-manu-icon">Celtic</a></li>
      <li><a href="#" class="icons-manu-iconc">Man U</a></li>
      <li><a href="#" class="icons-qpr">QPR</a></li>
      <li><a href="#" class="icons-rangers">Rangers</a></li>
    </ul>
  </div>
</body>
```

**tip:** don't forget to uncomment relative paths or your sprites won't work

`config.rb`

change this:

```ruby
#relative_assets = true
# to this
relative_assets = true
```

**another tip:**

And if you don't stop compass watch and restart it, the change will never take place

This also hides text

`_sprites.scss`

```scss
$icons-spacing: 20px;
$icons-spacing: smart;
@import "icons/*.png";
@include all-icons-sprites;
.social a {
  display: block;
  width: 64px;
  height: 64px;
  @include hide-text;
}
```

## Hover states for sprites
To add a hover it is simple.
have black and white and color samples of your 64x64 icons
the black and white images will just be the normal name
the color will be the same name followed by `_hover`

![sprites with hover](https://i.imgur.com/El55Z4H.png)

## Compass for production

### Path

If our project is in the root, keep this. If it is in a folder, you need to put that folder name here.
`http_path = "/"`
or
`http_path = "/my-app"`
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
fonts_dir = "fonts"
javascripts_dir = "js"

Remember to `comment out` the following line in production
`relative_assets = true`

`http_images_path = http://kingluddite.com/images`
You can also provide the full absolute URL to the images directory
* very useful if you need to change your images to 
    - a subdomain
    - or a CDN
by just changes the path in the config.rb file

compass handles sprites differently so to change their paths you alter the
`http_generated_images_path = "http://my-assets.my-site.com/img"`

## How Sass gets compiled to css

As is, our css is way to spaced out and the file size is too large
we need to minify it

`config.rb`

### Compass Environment variable
`environment = :production`

**tip** remember to stop and restart compass because you altered the config file
    

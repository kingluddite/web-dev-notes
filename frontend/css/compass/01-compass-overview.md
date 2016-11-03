# Compass
* Library of Sass mixins and functions
* `.sass` or `.scss` style sheet
    - compiles to plain `CSS`

## Compass Library
* color
* layout
* typography
* images
* sprite sheets
* css3
    - don't need to write vender prefixes

## Before installing Compass
Here are some useful information for you to be aware of:

* Compass is a `Ruby gem`
* We need to make sure **ruby** is updated
* You have **Sass** installed

### Update Ruby
```
$ gem update --system
```

* Compass **requires** that Sass be installed on your machine

### Which Sass Version

Find out which version of sass you currently have installed

```
$ sass --version
```

### Install Compass Now

```
$ gem install compass
```

* If you didn't have **Sass** installed **Compass** will install it for you
* If have permissions error use `sudo` 
    - Enter your Mac password when it asks you

## Bug fix
![if compass won't load](https://i.imgur.com/OthZl5H.png)

[link to bug fix](http://stackoverflow.com/questions/32891965/error-while-executing-gem-errnoeperm-operation-not-permitted)

### Check if Compass is installed

```
$ compass --version
```

### Premium Ways to use compass
You don't need to pay money to use Compass but there are premium options available

* [compass.app](http://compass.kkbox.com/) 
* [scout](https://mhs.github.io/scout-app/)
* [codekit](https://incident57.com/codekit/)

### Create a Compass Project

```
$ compass create path/project-name
```

It will create a folder structure similar to this:

![compass project folder structure](https://i.imgur.com/PQU037H.png)

#### `screen.scss`
* This is the file that you write your main styles inside
* Add comment link provided to connect this pages output CSS to the HTML page

#### Quick Side Step - FAQ

##### How do I create compass inside an existing site? 
Easy, just create a `config.rb` file and paste the following inside it: 
(_make sure to make sure your folders structure matches this file's structure or it won't work_)

**config.rb**

This is how I like to set up my site structure using Compass
* I like my Sass folder to be called `scss` and my syntax style of sass to be `scss` instead of `sass`
* My images to be named `img`
* My JavaScript to be named `js`a
* But if you don't like this setup, feel free to use whatever structure you feel comfortable 

```ruby
project_type = :stand_alone
# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "scss"
css_dir = "css"
images_dir = "img"
fonts_dir = "fonts"
javascripts_dir = "js"
line_comments = false
preferred_syntax = :scss
output_style = :expanded
relative_assets = true
```

#### Next Steps
1. Create `HTML` page
2. Link CSS

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Compass</title>
    <link href="/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
</head>
<body>

</body>
</html>
```

**Notes**: 
* type attribute
    - no longer needed in `HTML5`
* Also remove media attribute to simplify exercise
* Update link path by removing `/` at beginning of path

#### After changes

*index.html*

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Compass</title>
    <link href="stylesheets/screen.css" rel="stylesheet" />
</head>
<body>

</body>
</html>
```

### Compass reset
* By default compass imports a global `reset`
    - Based on Eric Meyers reset (with minor adjustments)
        + Can preview reset output in `screen.css` as compass comes precompiled

### Sass watch
* [not this guy](http://image.oregonlive.com/home/olive-media/width960/img/oregonian/photo/2015/11/11/-8b3b3d4bdff831f9.JPG)

```
$ sass --watch scss:css
```

### Compass watch

* Make sure you are inside your compass project directory

```
$ compass watch
```

* Test by adding some `CSS` to `style.scss` and view the output in `style.css`

### Configure Compass Project
* You have a workflow and name your folders a certain way
* Compass let's you follow your own naming rules.

#### config.rb
This is the config file you change to follow your own structure naming guide

`config.rb`

Change this:

```ruby
# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"
```

To this:

```ruby
# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "js"
```

* make the necessary adjustments to your site:

**index.html**

```html
<link href="css/screen.css" rel="stylesheet" />
```

![new folder structure](https://i.imgur.com/xK2OjFc.png)

### What is http_path?
It currently is set to relative to the path of our project so we'll keep that as it is

**Note**: 
1. Any changes to config file
2. Stop
3. Rerun compass

* [ruby-based config](http://compass-style.org/help/documentation/configuration-reference/)
* [sass-based config](http://compass-style.org/help/documentation/sass-based-configuration-options/)

### Much todo about the CSS Reset

[reset utilities](http://compass-style.org/reference/compass/reset/utilities/)

If you want to modify your resets import the utilities into your project

**style.scss**

```scss
// Compass Modules
// old
//@import "compass/reset";
// new
@import "compass/reset/utilities" 
// Partials

@import "reset";
```

`sass/_reset.scss`

```css
// CSS Resets

@include reset-html5;

body,
p,
h1,
h2,
h3 {
    @include reset-box-model;
}

body {
    @include reset-font;
}

.main-content {
    @include nested-reset;
}
```

* Check out `CSS` for output.

Most of the time you'll just use global reset.

## Vendor Prefixes

### How to use

1. Import the compass [CSS3 module](http://compass-style.org/reference/compass/css3/)

```css
@import "compass/css3";
```

* we can also just import individual modules if we want (instead of whole module)

Add this to your `screen.scss`

```css
body {
    background: #1e5799; /* Old browsers */
    background: -moz-linear-gradient(top,  #1e5799 0%, #2989d8 50%, #207cca 51%, #7db9e8 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 ); /* IE6-9 */    
}
```

Replace with 

```css
body {
    @include background(linear-gradient(top, #1e5799, #207cca));
}
```

## [Compass Cross-Browser Support Configuration](http://compass-style.org/reference/compass/support/)
* IE9

### Box sizing
This changes

```css
// box-sizing
* {
    @include box-sizing(border-box);
}
```

to this

```css
* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
```

### Transform

```css
.box {
  @include rotate(7deg);
  @include transform(translateX(100px) rotate(7deg));
  @include single-transition(transform, 2s, ease-out, 1s);
}

.box:hover {
    @include translateX(200px);
}
```

converts to this
```css
.box {
  -moz-transform: rotate(7deg);
  -ms-transform: rotate(7deg);
  -webkit-transform: rotate(7deg);
  transform: rotate(7deg);
  -moz-transform: translateX(100px) rotate(7deg);
  -ms-transform: translateX(100px) rotate(7deg);
  -webkit-transform: translateX(100px) rotate(7deg);
  transform: translateX(100px) rotate(7deg);
  -moz-transition: -moz-transform 2s ease-out 1s;
  -o-transition: -o-transform 2s ease-out 1s;
  -webkit-transition: -webkit-transform 2s ease-out;
  -webkit-transition-delay: 1s;
  transition: transform 2s ease-out 1s;
}

.box:hover {
  -moz-transform: translateX(200px);
  -ms-transform: translateX(200px);
  -webkit-transform: translateX(200px);
  transform: translateX(200px);
}
```

Use variables to clean it up more

* should put them all in a global variables page

```css
// transforms

$default-transition-duration: 2s;
$default-transition-function: ease-out;
$default-transition-delay: 1s;

.box {
  @include rotate(7deg);
  @include transform(translateX(100px) rotate(7deg));
  @include single-transition(transform);
}
```

**Opera** recently switched to same rendering engine as Chrome

Omit vender prefixes

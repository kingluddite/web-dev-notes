# Using Lists and @each

[Learning Rep](ithub.com:kingluddite/learning-sass.git)

`index.html`

Have 4 social media icons in `img`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Sass Fun</title>
  </head>
  <body>
    <ul class="social-links clearfix">
      <li><a class="twitter" href="#">Twitter</a></li>
      <li><a class="facebook" href="#">Facebook</a></li>
      <li><a class="youtube" href="#">Youtube</a></li>
      <li><a class="linkedin" href="#">LinkedIn</a></li>
    </ul>
    <!-- /.social-links clearfix -->
  </body>
</html>
```

`scss/style.scss`

```
ul.social-links li {
  list-style: none a;
}
$icons: (twitter, facebook, youtube, linkedin);

@each $social in $icons {
  .#{$social} {
    background: url('../img/#{$social}.png') no-repeat;
  }
}
```

## The nth function
Can grab the nth item in a list

### How does `nth()` function work?
```
// nth(10px 20px 30px, 1) => 10px
// nth((Helvetica, Arial, sans-serif), 3) => sans-serif
```

#### Task with `nth()`
Have 4 paragraphs that each have a lighter shade of black

### The clearfix
Just use `overflow: auto`

```
@each $p in (
  one black,
  two black + 20,
  three black + 40,
  four black + 60
) {
  .#{nth($p,1)} {
    background: #{nth($p, 2)};
  }
}
```

* This will loop through each item in the list provided. Each item is on it's own line and seperated by a comma.
* Then we create a class for each item and the 1st value in each list will be the name of the class
    - Then the background property will a value of the second item in each list

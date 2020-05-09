# Mobile Considerations
## Use device simulation tool that Chrome has built in
![toggle device toolbar](https://i.imgur.com/1JRhxKe.png)

* We'll test with iPhone 7 (Choose from dropdown)
* Notice how it looks zoomed out
    - This is a sign that the site is not mobile optimized
    - It uses the Iphone default of 980px and then it takes that and tries to fit it into 375px
        + This is why it looks like it is zoomed out pretty far (3x zoomed out)

## We want to fix that
* We want to tell the device (iPhone 7 in our test case) that we want to use the devices actual width as the width for our content
* We want to change that 980 default to whatever the browser width is (375 for iPhone 7)
* We can accomplish this with a `viewport` tag

## Add the viewport to `index.html`
`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Indecision App 3</title>
</head>
<body>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>
</html>
```

`<meta name="viewport" content="width=device-width, initial-scale=1">`

* We add meta tag
* We give it the name `viewport`
* We use key/value pairs in `content`
* We use a comma separated list of key/value
* We will just set 2
  - width
    + This we set to `device-width`
    + This will override the 980 default on IOS devices
    + Most android devices it is approximately 800 pixels
  - initial-scale
    + We set this to `1`
    + When we set this up we tell the viewport to use the real devices width
* Adding these changes will give us (and you can test this in the devices button in Chrome) what we expect
* When we switch devices it goes off on what the width is of that device

## Viewport added
* Old app without **viewport** looks like this:

![no viewport](https://i.imgur.com/RPrE8CI.png)

* And this is what it will looklike with viewport

![with viewport](https://i.imgur.com/0Y4Wd32.png)

# Media Queries
* We'll reduce spacing on mobile
* We'll adjust form
  - On mobile screens
      * the input will take up the whole width
      * And below the input the button will take up the whole width

## Add Mobile Changes using `media queries`
### Stack input and button on mobile devices
* **note** @media is a CSS feature (not a Sass feature)

## We will experiment to show how this works
```
@media (max-width: 45rem) {
 // up and until 45rem follow the rules of this media query
 * {
    color: red;
 }
}
```

## View on phone device
* View in device viewport and see red text

## View on Desktop
* Toggle device viewport off and stretch browser and see red text disappear
* The text is changing at a **breakpoint**
* Flip on head and change `max-width` to `min-width`

### Change to `min-width: 45rem`
`_add-option.scss`

```
// MORE CODE

// Media queries
// up and until 45rem follow the rules of this media query
@media (min-width: 45rem) {
  * {
    color: red;
  }
}
```


* This says from 45rem to infinity, color will be red
* For devices less than 45rem, the styles will NOT be applied

### The Result
* Large (desktop) screens we have red
* Small (phone) screens we have white

#### flex-direction
* By default it is **row** (items stacked left-to-right)
* We can change it to column (stack items vertically --- what we want in this instance)

`_add-option.scss`

```
.add-option {

  &__error {
    color: $off-white;
    font-style: italic;
    margin: $m-size 0 0 0;
    padding: 0 $m-size;
  }

  &__form {
    display: flex;
    flex-direction: column;
    padding: $m-size;
    
    @media (max-width: 45rem) {
      flex-direction: row;
    }
  }

  &__input {
    background: $dark-blue;
    border: none;
    border-bottom: 0.3rem solid darken($dark-blue, 10%);
    color: $off-white;
    flex-grow: 1;
    margin-right: $s-size;
    padding: $s-size;
  }

}
```

* Now on large devices the button input and button will be side by side

![side by side](https://i.imgur.com/RadjcNb.png)

* On small devices they will be stacked

![stacked](https://i.imgur.com/54JJBDs.png)

* On small we need to:
    - Get rid of right margin
    - Add some spacing between the two

## Mobile first
* Common technique is to get it working on mobile first
    - Than handle larger devices

`_add-option.scss`

```
&__input {
    background: $dark-blue;
    border: none;
    border-bottom: 0.3rem solid darken($dark-blue, 10%);
    color: $off-white;
    flex-grow: 1;
    margin: 0 0 $s-size 0;

    @media (min-width: 45rem) {
      margin: 0 $s-size 0 0;
    }
    padding: $s-size;
  }
```

## Media query variable breakpoints
`_settings.scss`

```
// colors
$off-black: #20222b;
$off-white: #a5afd7;
$light-blue: #464b5e;
$blue: #3c4251;
$dark-blue: #333745;
$purple: #8357c5;

// Spacing
$s-size: 1.2rem;
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;

// Media Query Breakpoints
$desktop-breakpoint: 45rem;
```

`_add-option.scss`

```
// MORE CODE
  &__form {
    display: flex;
    flex-direction: column;
    padding: $m-size;
    
    @media (min-width: $desktop-breakpoint) {
      flex-direction: row;
    }
  }

  &__input {
    background: $dark-blue;
    border: none;
    border-bottom: 0.3rem solid darken($dark-blue, 10%);
    color: $off-white;
    flex-grow: 1;
    margin: 0 0 $s-size 0;

    @media (min-width: $desktop-breakpoint) {
      margin: 0 $s-size 0 0;
    }
    padding: $s-size;
  }
}
```

## Challenge
* Remove excess spacing between button and content
* Use `$m-size` for small screens and `$xl-size` for large screen
  - Mobile First! so all the regular styles are for small screens
  - Media Queries are for larger screens

### Solution
`_header.scss`

```
.header {
  background: $off-black;
  color: #ffffff;
  margin-bottom: $m-size;

  @media (min-width: $desktop-breakpoint) {
    margin-bottom: $xl-size;
  }
// MORE CODE
```

* and `_button.scss`

```
.button {
  background: $purple;
  border: none;
  border-bottom: 0.3rem solid darken($purple, 10%);
  color: white;
  font-weight: 500;
  padding: $s-size;

  &--large {
    background: $purple;
    border: none;
    border-bottom: 0.6rem solid darken($purple, 10%);
    color: white;
    font-size: $l-size;
    font-weight: bold;
    margin-bottom: $m-size;

    @media (min-width: $desktop-breakpoint) {
      margin-bottom: $xl-size;
    }
    padding: 2.4rem;
    width: 100%;
  }
// MORE CODE
```

* It will look this on desktop devices:

![desktop devices](https://i.imgur.com/fmbKIPy.png)

* And look like this on phones

![phone devices](https://i.imgur.com/WTcA3Gq.png)

### End of Part 1 - Fundamentals of React



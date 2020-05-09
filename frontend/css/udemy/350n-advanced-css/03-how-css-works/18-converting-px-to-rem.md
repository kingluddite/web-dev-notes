# Converting px to rem
* How and why we use `rem` unites in our project
    - We want an easy way to convert all our settings with one easy setting
* A great workflow for converting px to rem

## The root font size
* Is set in the HTML

`src/assets/scss/base/_base.scss`

```
// MORE CODE

html {
  font-size: 10px;
}

// MORE CODE
```

* Now we know 1rem === 10px
* Since 10px is the root font size than 1rem is 10px
* Now all we have to do is divide all the px units by 10 and we'll get our rem
* This is a common technique
* Ideally you start by doing this right at the beginning of the project
* For responsive design using rem measurement is a best practice

## We could do this also with em
* But that would be a lot of work
* em depend not only on root font size but on the font size of parent element (and with that you have to do lots of math/calculations an it becomes very difficult to match)
* Set everything to rem as I believe it is the best/least painful solution

## Go through the rest of our px measurements and divide by 10
* Just change all `scss` `px` to `rem` by /10 and putting the measurement in rem

## Run your app
`$ npm run dev`

* It should all look the same except for our button font size
* If we still want the button font to be 16px we just give it a font-size of 1.6rem

`_button.scss`

```
// MORE CODE

.btn:link,
.btn:visited {
  // Box
  display: inline-block;
  position: relative;
  padding: 1.5rem 4rem;

  // animations
  transition: all 0.2s;

  // Border
  border-radius: 10rem;

  // Text
  font-size: 1.6rem;
  text-decoration: none;
  text-transform: uppercase;
}

// MORE CODE
```

## Now let's show the benefit of this change
* Inspect the code and change the font-size of `html` tag
* You'll see it is set to the `10px` we initially set

![font-size of body](https://i.imgur.com/i0cps9U.png)

* Manually make the `10px` smaller in chrome inspector tool
* Now make it larger
* See how the entire website changes based on that one "global" setting
* Amazing!

## Woops, there was 30px padding on body
* We convert that to rems so 3rem;

`_base.scss`

```
// MORE CODE

body {
  -webkit-font-smoothing: antialiased;
  padding: 3rem;
  color: $color-text;
  font-family: $font-family--primary;
  text-rendering: optimizeLegibility;
}

// MORE CODE
```

* Now squish your browser to it's most narrow width (to simulate a mobile device)
* Change the `html` to 5px and then click on the body tag in the Elements tab of the Chrome console
    - In the `Styles` tab of the Chrome inspector you should see the 2nd column is the box model diagram and note how the padding has been automatically changed from 30px to 15px

![look at how the padding automatically changes because root font-size changed](https://i.imgur.com/P1HzQrH.png)

## Media Queries
* Setting our font-size to rems will making writing media queries so much easier

## Improve our font-size
* It is a very bad practice to set a font-size to px
* We set our body font-size to 10px

`_base.scss`

* html should not be set to `10px`

```
// MORE CODE

html {
  font-size: 10px;
}

// MORE CODE
```

* If we change this to px we override the browser font-size setting that the end user can manually change (and this is a major accessibility issue)
* Many people with site impairment issues (like elderly people) they manually change the default font size of their browser
* If we change the font-size to 10px then we remove the ability for these people to change the default font size manually

## Better to set `html` to a % font-size
* This will translate to the font-size given by the browser
* The default font-size of the browser is 16px (this is the absolute default)
    - And we will count on this to be the default
    - Many super old outdated browser might have used a different default font size for the browser but we will ignore them in our computation

`_base.scss`

* If we change the font-size to `100%` would me the default font-size would be 16px if the user doesn't change anything and if the user changes the default font-size to 18px than the root font-size would be 18px, if they change to 20px then the root font-size would be 20px... and so on
* But we don't want 16px here because that messes up our easy math, we want 10px, so to get the best of both worlds we set the font-size to 62.5%
    - 10/16 = 62.5

```
// MORE CODE

html {
  font-size: 100%;
}

// MORE CODE
```
 
## Change it to 62.5%
`_base.scss`

```
// MORE CODE

html {
  font-size: 62.5%;
}

// MORE CODE
```

## Do the math
* .625 * 16 = 10px (that is what we want)
* But if end user changes user settings to 20px than
    - .625 * 20 = 12.5px (root font size)
* If end user changes user settings browser default to 22px than
    - .625 * 22 = 13.75px (root font size)

## That is our full font size technique
* We allow the end user to zoom in and zoom out in the browser
* This technique is widely used in the CSS developer community because it is so simple and yet so powerful

### Caveat
* rem is not supported below IE9
* Keep this is mind because if you have to develop a site for really old browsers that use IE9 than you CANNOT use rem (if you do your site will simply not work at all)

## Let's use the power of inheritance
* Whenever we can use inheritance we should use it instead of using something like the universal selector `*`

### Moving `box-sizing`
* We cut it from the universal selector `*`

`_base.scss`

```
// MORE CODE

// Reset CSS
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  // Global Clearfixing
  @if $grid-type == 'float' {
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}

// MORE CODE
```

* And put it on the body

`_base.scss`

```
// MORE CODE

body {
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box; /* add this line */
  padding: 3rem;
  color: $color-text;
  font-family: $font-family--primary;
  text-rendering: optimizeLegibility;
}

// MORE CODE
```

* And then we do this:

`_base.scss`

```
// MORE CODE

* {
  box-sizing: inherit; /* add this line */
  margin: 0;
  padding: 0;
  // Global Clearfixing
  @if $grid-type == 'float' {
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}

// MORE CODE
```

* We can use the inherit keyword to enforce inheritance (and that's what we are doing in the above code fragment)
    - The `box-sizing` property by itself is not `inherited`
    - But by setting the `box-sizing` property on each and every element on the entire page to `inherit` it will automatically inherit here whatever we put on the body `box-sizing` property value (we set it to `border-box` so it is inherited everywhere)
* BEST PRACTICE - recommended by the CSS community because it makes it slightly easier to change the box-sizing in plugins and other components where we might want to use a different property value for box-sizing
    - It doesn't make a huge difference but it is a slighly better practice

## Let's improve on our universal selector to include `*::after` and `::before` psuedo elements

`_base.scss`

* Before we made this change only the real elements get these rule changes applied
* But after this change all real and psuedo elements will also get the changes applied

```
/* Reset CSS */
*,
*::after,
*::before {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
  // Global Clearfixing
  @if $grid-type == 'float' {
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}

// MORE CODE
```

### Note if we didn't make the above change than this code:
`_button.scss`

* If we put a width, height, padding or a border than it wouldn't have behaved the way we expected because of the box-sizing of border-box because we didn't include `::after` in our universal selector in our global reset

```
// MORE CODE

.btn::after {
  content: '';
  display: inline-block;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.4s;
  border-radius: 10rem;
}

// MORE CODE
```


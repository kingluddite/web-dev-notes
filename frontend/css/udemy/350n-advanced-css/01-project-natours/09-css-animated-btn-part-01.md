# Building a Complex Animated Button - Part 1
* What pseudo-elements and pseudo-classes are
* How and why to use `::after`  pseudo-element
* How to create a creative hover animation effect using the transition property

`index.html`

```
// MORE CODE
        <a href="#" class="btn btn-white">Discover Tours</a>
      </div>
      <!-- /.text__box -->
  </header>

<script src="/assets/js/bundle.js"></script>
</body>
</html>
```

## Style button
* **tip** `a` is inline and if we want to give it padding/margin ALWAYS use `display: inline-block`

### Center button
* inline-block elements are treated as inline so we can treat it like text

`_header.scss`

```
// MORE CODE

.text__box {

  // MORE CODE

  text-align: center;
}

// MORE CODE
```

## Animate button on hover and click
`_button.scss`

```
// MORE CODE

.btn:link,
.btn:visited {
  display: inline-block;
  padding: 15px 40px;
  text-decoration: none;
  text-transform: uppercase;
}

.btn:hover {
  transform: translateY(-3px);
}

.btn:active {
  transform: translateY(-1px);
}

// MORE CODE
```

* the `transform` movements are relative to the initial button state `btn:link`
* We have a slight movement Up (so we use `translateY` with a negative value)
* Hover and click to see the `:hover` and `:active` effects

### Now animate those movements
* Make the button round with `border-radius`

```
// MORE CODE

.btn:link,
.btn:visited {
  display: inline-block;
  padding: 15px 40px;
  border-radius: 100px; // add this
  text-decoration: none;
  text-transform: uppercase;
}

// MORE CODE
```

## There are 2 types of animations
1. Use the `transition` property (easy one)
2. The more complex one is the method that we used (this is where we specified the steps of the animations with the keyframes @ rule)

### Let's do #1 with `transition` (shorthand version of transition)
* What properties do we want to animate, let's animate all of them with `all`
* What is the duration of the animation? Let's say 2 seconds (.2s)

```
// MORE CODE

.btn:link,
.btn:visited {
  // Box
  display: inline-block;
  padding: 15px 40px;

  // animations
  transition: all 0.2s; // update this line

  // Border
  border-radius: 100px;

  // Text
  text-decoration: none;
  text-transform: uppercase;
}

// MORE CODE
```

* Note: transition animations causes confusion but just remember to put the `transition` property on the **initial state** and the transform on the parts you want to animate
* Test and see the button animate

## Add dropshadow
* `box-shadow` has lots of properties
    - first is offset in x direction
        + We don't want any so we use `0`
    - second value is offset in y direction
        + We want some so we'll use `10px`
    - third value is blur
    - forth value is color (we use rgba for transparent colors)

```
// MORE CODE

.btn:hover {

  // MORE CODE

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

// MORE CODE
```

* We click and we want less blur and less up

```
// MORE CODE

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); // add this line
}

// MORE CODE
```

## psuedo elements
* Allow us to style certain parts of elements

### after psuedo element
* Acts like a virtual element right after the element we are selecting
* We can then style that element

#### The trick
* Create a button that looks exactly like the button we are working on but we put this clone behind the button
* And we hover off the button then this hidden psuedo element goes back behind the button

##### How do we get an after psuedo element to appear on the page?
* We need to specify it's `content` property
* **IMPORTANT** THIS IS REQUIRED
    - It can even be an empty string `content: ''`
* We need to specify it's `display` property and it must match the element it is copying
    - Since our button is has `display: inline-block` so should this element

`_buttons.scss`

* We set the width and height to 100% because this element is like a child of the original button and we will match the height and with of the after element we are cloning

```
// MORE CODE
.btn::after {
  content: '';
  display: inline-block;
  width: 100%;
  height: 100%;
}


.btn-white {
  background-color: #fff;
  color: #777;
}
```

* The buttons are in same level
* We need to put our after behind
* We do this with `position: absolute` and `z-index`

```
// MORE CODE

.btn:link,
.btn:visited {
  // Box
  display: inline-block;
  position: relative;
  padding: 15px 40px;

  // MORE CODE
}

 // MORE CODE

.btn::after {
  content: '';
  display: inline-block;
  position: absolute; /* add */
  z-index: -1; /* add */
  top: 0; /* add */
  left: 0; /* add */
  width: 100%;
  height: 100%;
  border-radius: 100px;
}

.btn-white {
  background-color: #fff;
  color: #777;
}

.btn-white::after {
  background-color: #fff;
}

// MORE CODE
```

* Now we can't see the button
* We want to see it when we hover

```
.btn-white::after {
  background-color: #fff;
}

.btn:hover::after {

}
```

* Above looks strange but it just is adding our element after we hover over a button

## Animate our hidden button
* We will `scale` it which means when it grows

```
.btn:hover::after {
  transform: scale(1.5);
}
```

* Hover over the button and watch the hidden button grow to twice the original size
* We add the transition property on the initial state (which is the `.btn::after`)
* We need to fade the hidden element out so we'll set it's opacity to `0`

```
.btn::after {

  // MORE CODE

  transition: all 0.4s;

  // MORE CODE

}

// MORE CODE

.btn:hover::after {
  transform: scale(1.5);
  opacity: 0;
}
```

* It works but let's scale in X and Y like this

```
// MORE CODE

.btn:hover::after {
  transform: scaleX(1.4) scaleY(2);
  opacity: 0;
}

// MORE CODE
```

## Scroll button from bottom

### Add the animation
`_header.scss`

```
// MORE CODE
@keyframes moveFromBottom {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
}
```

Add a class

`index.html`

* We only want this button to have this animation
* We just add a class to the button we want to animate

```
// MORE CODE
        <a href="#" class="btn btn-white btn-animated
">Discover Tours</a>
      </div>
      <!-- /.text__box -->
  </header>
       
<script src="/dist/bundle.js"></script>
</body>
</html>
```

`_buttons.scss`

```
// MORE CODE

.btn-animated {
  // anim name, anim duration, anim timing func, anim delay
  animation: moveFromBottom 0.5s ease-out 0.75s;
  animation-fill-mode: backwards;
}

// MORE CODE
```

* We add a delay

## Houston we have a problem
* The animation was visible before the animation happened
* We could put the initial states on the button (that would be highly impracticable)

### A better way with animation-fill-mode
* We'll set this to backwards
    - What does this property do?
    - It will automatically apply the styles of the 0% before the animation starts

```
// MORE CODE

.btn-animated {
  animation: moveFromBottom 0.5s ease-out 0.75s;
  animation-fill-mode: backwards;
}

// MORE CODE
```

* Now the button is animated the way we want!

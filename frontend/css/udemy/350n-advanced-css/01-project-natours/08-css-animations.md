# CSS animations
```
@keyframes moveInLeft {
  0% {
  }
  
  80% {
  }

  100% {
  }
}

```

* We use @keyframes and give it a descriptive name (base on its motion)
* They you start at 0% and end with 100%
* You can have other stuff happen between the start and end

## opacity
* We want it to be see through so we start at opacity `0`
* Then we fade fully in and set opacity to `1`

```
@keyframes moveInLeft {
  0% {
    opacity: 0
  }
  
  80% {
  }

  100% {
    opacity: 1
  }
}
```

## Best practice
* For the browser it is best to only ever animate 2 different properties
    - opacity
    - transform (we can do A WHOLE LOT OF STUFF WITH THIS!)
* The browsers are optimized for these 2 properties

## Transform to animate from left to right
* transform: transformX()

![X direction](https://i.imgur.com/xLTjssj.png)

* trasform: transformY()

![Y direction](https://i.imgur.com/TLErl5E.png)

### transformX()
- negative value means you are going from left to right
- positive value means you are going from right to left

## translate(0)
The object will look exactly as it does where the object is now

## Basic animation
* We'll animate 100px from the left to the right

```
@keyframes moveInLeft {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }

  /* 80% {
   } */

  100% {
    transform: translate(0);
    opacity: 1;
  }
}
```

## Apply animation
For an animation to work there are only two properties we need to specify

1. animation-name (the name you gave it (moveInLeft))
2. animation-duration (the time the animation will take (3s ---> 3 seconds))

```
// MORE CODE

.heading__primary--main {
  display: block;

  /* animation */
  animation-name: moveInLeft;
  animation-duration: 3s;

  /* styles */
  font-size: 60px;
  font-weight: 400;
  letter-spacing: 35px;
}

// MORE CODE
```

* View it and watch your `OUTDOORS` heading animate from left to right for 3 seconds

## Animate it slightly back
```
// MORE CODE
.heading__primary--main {
  // MORE CODE

  /* animation */
  animation-name: moveInLeft;
  animation-duration: 1s;

  // MORE CODE
}

// MORE CODE

@keyframes moveInLeft {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }

  80% {
    transform: translateX(10px);
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
}
```

* Now it moves left to right, moves left, stops in 1 second

## Some other animation properties
* `animation-delay`: wait time to start animation
* `animation-iteration-count`: how many times the animation will occur
* `animation-timing-function`: how a CSS animation should progress over the duration of each cycle
    - [docs](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)
    - examples
        + ease-in
        + ease-out

```
// MORE CODE

.heading__primary--main {
  display: block;

  /* animation */
  animation-name: moveInLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  /* animation-delay: 3s; */

  /* animation-iteration-count: 3; */

  /* styles */
  font-size: 60px;
  font-weight: 400;
  letter-spacing: 35px;
}

// MORE CODE
```

## Animate moveInRight
```
.heading__primary--sub {
  display: block;

  /* animation */
  animation-name: moveInRight;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  /* styles */
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 18px;
}

@keyframes moveInRight {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }

  80% {
    transform: translateX(-10px);
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
}
```

## Shortcut
```
.heading__primary--sub {
  display: block;

  animation: moveInRight 1s ease-out;

  /* styles */
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 18px;
}
```

* This saves time as you don't have to type out all the animation properties
* Our headings are animating in 2 different directions

## Beware of and Prevent animation glitch
* At the end of the animation you may see a slight move

```
.heading__primary {
  backface-visibility: hidden; // fix by adding this
  color: #fff;
  text-transform: uppercase;
}
```

* backface-visibility: determines if the backpart of an element is visible or hidden for the user
    - If we had an element and rotated it 180 degrees
        + If we did it would be logical that we would see the backpart of that element
            * But if we use backface-visibility the back part can be hidden
            * **note** No one really knows why the shaking is happen but this fix makes it not as shaky

## Let's go crazy with rotations in our animation
```
@keyframes moveInLeft {
  0% {
    transform: translateX(-100px) rotate(-50deg);
    opacity: 0;
  }

  60% {
    transform: rotate(120deg);
  }

  80% {
    transform: translateX(10px);
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
}
```

* Now we have crazy rotating animations!

### Let's make animation to appear when we hover over logo


To animate an element, you need to know about the animation **properties** and the `@keyframes` rule. 

##The animation properties
Control how the animation should behave

##The @keyframes rule
Controls what happens during that animation 

## There are 8 animation properties in total

* `animation-name`
    - Sets the **name** of the animation, which is later used by `@keyframes` to tell CSS which rules go with which animations
* `animation-duration`
    - Sets the length of time for the animation
    - `@keyframes` is how to specify exactly what happens within the animation over the duration. This is done by giving CSS properties for specific **"frames"** during the animation, with percentages ranging from `0%` to `100%`. If you compare this to a movie, the CSS properties for 0% is how the element displays in the opening scene. The CSS properties for 100% is how the element appears at the end, right before the credits roll. Then CSS applies the magic to transition the element over the given duration to act out the scene. 
    `
     example to illustrate the usage of @keyframes` and the animate properties:

```css
#anim {
  animation-name: colorful;
  animation-duration: 3s;
}
@keyframes colorful {
  0% {
   background-color: blue;
  }
  100% {
    background-color: yellow;
  }
}
```

For '#anim`, the code snippet above sets the **animation-name** to `colorful` and sets the **animation-duration** to `3 seconds`. Then the `@keyframes` rule _links to the animation properties with the name colorful_. It sets the color to blue at the beginning of the animation `(0%)` which will transition to yellow by the end of the animation `(100%)`. 

**note** You aren't limited to only beginning-end transitions, you can set properties for the element for any percentage between 0% and 100%.

```html
<style>
  div{
    height:40px;
    width: 70%;
    background:black;
    margin: 50 auto;
    border-radius: 5px;
  }

  #rect {
    animation-name: rainbow;
    animation-duration: 4s;
    
  }
  
  @keyframes rainbow {
    0% {
      background-color: blue;
    }
    50% {
      background-color: green;
    }
    100% {
      background-color: yellow;
    }
  }
  
</style>
<div id="rect"></div>
```

## change height of button on hover
```
<style>
  img:hover {
    animation-name: width;
    animation-duration: 500ms;
  }
  @keyframes width {
    100% {
      width: 40px;
    }
  }
</style>
<img src="https://bit.ly/smallgooglelogo" alt="Google's Logo" />
```

change color of button on hover
```
 
<style>
  button {
    border-radius: 5px;
    color: white;
    background-color: #0F5897;
    padding: 5px 10px 8px 10px;
  }
  button:hover {
    animation-name: background-color;
    animation-duration: 500ms;
  }
  @keyframes background-color {
    100% {
          background-color: #4791d0;
    }
  }
  
  
</style>
<button>Register</button>

```

## animation-fill-mode
This can be done by setting the animation-fill-mode property to forwards. The animation-fill-mode specifies the style applied to an element when the animation has finished. You can set it like so:

`animation-fill-mode: forwards;`

```
<style>
  button {
    border-radius: 5px;
    color: white;
    background-color: #0F5897;
    padding: 5px 10px 8px 10px;
  }
  button:hover {
    animation-name: background-color;
    animation-duration: 500ms;
    animation-fill-mode: forwards;
    
  }
  @keyframes background-color {
    100% {
      background-color: #4791d0;
    }
  }
</style>
<button>Register</button>
```

## Create Movement Using CSS Animation
When elements have a specified position, such as fixed or relative, the CSS offset properties right, left, top, and bottom can be used in animation rules to create movement.

```css
@keyframes rainbow {
  0% {
    background-color: blue;
    top: 0px;
  }
  50% {
    background-color: green;
    top: 50px;
  }
  100% {
    background-color: yellow;
    top: 0px;
  }
}
```

### Horizontal motion
Add a horizontal motion to the div animation. Using the left offset property, add to the @keyframes rule so rainbow starts at 0 pixels at 0%, moves to 25 pixels at 50%, and ends at -25 pixels at 100%.

```html
<style>
  div{
    height:40px;
    width: 70%;
    background:black;
    margin: 50 auto;
    border-radius: 5px;
    position: relative;
  }

#rect {
  animation-name: rainbow;
  animation-duration: 4s;
}

@keyframes rainbow {
  0% {
    background-color: blue;
    top: 0px;
    left: 0px;
    
  }
  50% {
    background-color: green;
    top: 50px;
    left: 25px;
    
  }
  100% {
    background-color: yellow;
    top: 0px;
    left: -25px;
    
  }
}
</style>

<div id="rect"></div>
```

Target the element with the id of ball and add the opacity property set to 0.1 at 50% so the element fades as it moves to the right.

```html
<style>

  #ball {
    width: 70px;
    height: 70px;
    margin: 50 auto;
    position: fixed;
    left:20%;
    border-radius: 50%;
    background: linear-gradient(
      35deg,
      #ccffff,
      #ffcccc
    );
  animation-name: fade;
  animation-duration: 3s;
  }

  @keyframes fade {
    50% {
      left:60%;
      opacity: 0.1;
      
    }
  }

</style>

<div id="ball"></div>
```

## To infinity and beyond
make the animation run continuously by setting that value to infinite.

`animation-iteration-count: infinit;`

```html
<style>

  #ball {
    width: 100px;
    height: 100px;
    margin: 50 auto;
    position: relative;
    border-radius: 50%;
    background: linear-gradient(
      35deg,
      #ccffff,
      #ffcccc
    );
    animation-name: bounce;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  @keyframes bounce{
    0% {
      top:0px;
    }
    50% {
      top:249px;
      width: 130px;
      height: 70px;
    }
    100% {
      top:0px;
    }
  }
</style>
<div id="ball"></div>
```

## infinite Beating heart
```html
<style>
  .back {
    position:fixed;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background:white;
    animation-name: backdiv;
    animation-duration: 1s; 
    animation-iteration-count: infinite;
  }

  .heart {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: pink;
    height: 50px;
    width: 50px;
    transform: rotate(-45deg);
    animation-name: beat;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  .heart:after {
    background-color: pink;
    content: "";
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0px;
    left: 25px;
  }
  .heart:before {
    background-color: pink;
    content: "";
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
    top: -25px;
    left: 0px;
  }

  @keyframes backdiv {
    50% {
      background:#ffe6f2;
    }
  }

  @keyframes beat {
    0% {
      transform: scale(1) rotate(-45deg);
    }
    50% {
      transform: scale(.6) rotate(-45deg);
    }
  }

</style>
<div class="back"></div>
<div class="heart"></div>
```

## Animate Elements at Variable Rates
You can change the @keyframes rule for one of the elements so the stars twinkle at different rates

```
<style>
  .stars {
    background-color: white;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    animation-iteration-count: infinite;
  }

  .star-1 {
    margin-top: 15%; 
    margin-left: 60%;
    animation-duration: 1s;
    animation-name: twinkle-1;
  }

  .star-2 {
    margin-top: 25%;
    margin-left: 25%;
    animation-duration: 1s;
    animation-name: twinkle-2;
  }

  @keyframes twinkle-1 {
    50% {
      transform: scale(.5);
      opacity: 0.5;
    }
  }

  @keyframes twinkle-2 {
    20% {
      transform: scale(.5);
      opacity: 0.5;
    }
  }

  #back {
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(black,#000099,#66c2ff, #ffcccc, #ffeee6);
  }
</style>

<div id="back"></div>
<div class="star-1 stars"></div>
<div class="star-2 stars"></div>
```

## Animate Multiple Elements at Variable Rates
In the animation running in the code editor, there are three "stars" in the sky that twinkle at the same rate on a continuous loop. To make them twinkle at different rates, you can set the animation-duration property to different values for each element.

```html
<style>
  .stars {
    background-color: white;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    animation-iteration-count: infinite;
  }

  .star-1 {
    margin-top: 15%; 
    margin-left: 60%;
    animation-duration: 1s;
    animation-name: twinkle;
  }

  .star-2 {
    margin-top: 25%;
    margin-left: 25%;
    animation-duration: .9s;
    animation-name: twinkle;
  }

  .star-3 {
    margin-top: 10%;
    margin-left: 50%;
    animation-duration: 1.1s;
    animation-name: twinkle;
  }

  @keyframes twinkle {
    20% {
      transform: scale(.5);
      opacity: 0.5;
    }
  }

  #back {
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(black,#000099,#66c2ff, #ffcccc, #ffeee6);
  }
</style>

<div id="back"></div>
<div class="star-1 stars"></div>
<div class="star-2 stars"></div>
<div class="star-3 stars"></div>
```

## Change Animation Timing with Keywords
In CSS animations, the `animation-timing-function` property controls how quickly an animated element changes over the duration of the animation. If the animation is a car moving from point A to point B in a given time (your animation-duration), the `animation-timing-function` says how the car accelerates and decelerates over the course of the drive.

There are a number of predefined keywords available for popular options. For example, the default value is `linear`, which applies a constant animation speed throughout. Other options include `ease-out`, which is quick in the beginning then slows down, or `ease-in`, which is slow in the beginning, then speeds up at the end.

```html
<style>

  .balls{
    border-radius: 50%;
    background: linear-gradient(
    35deg,
    #ccffff,
    #ffcccc
      );
    position: fixed;  
    width: 50px;
    height: 50px;
    margin-top: 50px;
    animation-name: bounce;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  #ball1 { 
    left:27%;
    animation-timing-function: linear;
    
  }
  #ball2 { 
    left:56%;
    animation-timing-function: ease-out;
  }

@keyframes bounce{
  0% {
    top:0px;
  } 
  100% {
    top:249px;
  }
} 

</style>

<div class="balls" id="ball1"></div>
<div class="balls" id="ball2"></div>
```

## Bezier Curves
CSS offers an option other than keywords that provides even finer control over how the animation plays out, through the use of Bezier curves

In CSS animations, Bezier curves are used with the **cubic-bezier** function. The shape of the curve represents how the animation plays out. The curve lives on a **1x1 coordinate system**. The `X-axis` of this coordinate system is the **duration of the animation** (_think of it as a time scale_), and the `Y-axis` is the **change in the animation**.

### The cubic-bezier function
Consists of 4 main points that sit on this **1x1 grid**: `p0`, `p1`, `p2`, and `p3`. 

* `p0` and `p3` are set for you
    - They are the beginning and end points which are always located respectively at the origin `(0, 0)` and `(1, 1)`. 
* You set the `x` and `y` values for the other two points
    - Where you place them in the grid dictates the shape of the curve for the animation to follow. 
    - This is done in CSS by declaring the `x` and `y` values of the `p1` and `p2` "**anchor**" points in the form: `(x1, y1, x2, y2)`.
    - 

### Example of a Bezier curve in CSS code:

`animation-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);`

In the example above, the x and y values are equivalent for each point (x1 = 0.25 = y1 and x2 = 0.75 = y2), which if you remember from geometry class, results in a line that extends from the origin to point (1, 1). This animation is a linear change of an element during the length of an animation, and is the same as using the linear keyword. In other words, it changes at a constant speed.

```html
<style>

  .balls{
    border-radius: 50%;
    background: linear-gradient(
    35deg,
    #ccffff,
    #ffcccc
      );
    position: fixed;  
    width: 50px;
    height: 50px;
    margin-top: 50px;
    animation-name: bounce;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  #ball1 { 
    left:27%;
    animation-timing-function: cubic-bezier(0.25, 0.25, 0.75, 0.75);
  }
  #ball2 { 
    left:56%;
    animation-timing-function: ease-out;
  }

@keyframes bounce{
  0% {
    top:0px;
  } 
  100% {
    top:249px;
  }
} 

</style>

<div class="balls" id="ball1"></div>
<div class="balls" id="ball2"></div>
```

## Use a Bezier Curve to Move a Graphic
example of a Bezier curve using values to mimic the ease-out style:

`animation-timing-function: cubic-bezier(0, 0, 0.58, 1);`

Remember that all cubic-bezier functions start with **p0** at `(0, 0)` and end with **p3** at `(1, 1)`. In this example, the curve moves faster through the `Y-axis` (starts at 0, goes to p1 y value of 0, then goes to p2 y value of 1) then it moves through the `X-axis` (0 to start, then 0 for p1, up to 0.58 for p2). As a result, the change in the animated element progresses faster than the time of the animation for that segment. Towards the end of the curve, the relationship between the change in `x` and `y` values **reverses** - the `y` value moves from 1 to 1 (no change), and the x values move from 0.58 to 1, making the animation changes progress slower compared to the animation duration.

```html
<style>
  .balls{
    border-radius: 50%;
    position: fixed;  
    width: 50px;
    height: 50px;
    margin-top: 50px;
    animation-name: bounce;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  #red {
    background:red;
    left:27%;
    animation-timing-function: cubic-bezier(0,0,0.58,1);
  }
  #blue {
    background:blue;
    left:56%;
    animation-timing-function: ease-out;
  }
  @keyframes bounce{
    0% {
      top:0px;
    }
    100% {
      top:249px;
    }
  }
</style>
<div class="balls" id= "red"></div>
<div class="balls" id= "blue"></div>
```

## More Natural Motion Using a Bezier Curve
replicate the movement of a ball being juggled

`cubic-bezier(0.3, 0.4, 0.5, 1.6);`

Notice that the value of y2 is larger than 1. Although the cubic Bezier curve is mapped on an 1 by 1 coordinate system, and it can only accept x values from 0 to 1, the y value can be set to numbers larger than one. This results in a bouncing movement that is ideal for simulating the juggling ball.

linear and ease-out can't replicate jugging realistically, only a bezier curve can do this

```html
<style>
  .balls {
    border-radius: 50%;
    top:249px;
    position: fixed;  
    width: 50px;
    height: 50px;
    top: 60%;
    animation-name: jump;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  #red {
    background:red;
    left:25%;
    animation-timing-function: linear;
  }
  #blue {
    background:blue;
    left:50%;
    animation-timing-function: ease-out;
  }
  #green {
    background:green;
    left:75%;
    animation-timing-function: cubic-bezier(0.311, 0.441, .444, 1.649); 
  }

  @keyframes jump {
    50% {
      top:10%;
    }
  }
</style>
<div class="balls" id="red"></div>
<div class="balls" id="blue"></div>
<div class="balls" id="green"></div>
```


**note** The `animation-timing-function` automatically loops at every keyframe when the `animation-iteration-count` is set to **infinite**



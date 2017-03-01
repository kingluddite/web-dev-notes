# Make Larger
```
<style>
  .ball { 
    width: 40px;
    height: 40px;
    margin: 50 auto;
    position: fixed;
    background: linear-gradient(
    35deg,
    #ccffff,
    #ffcccc
  );       
    border-radius: 50%;
  }
  #ball1 {
    left:20%;
  }
  #ball2 {
    left:65%;
    transform: scale(2);
    
  }


</style>

<div class="ball" id= "ball1"></div>
<div class="ball" id= "ball2"></div>
```

## Grow on hover
The transform property has a variety of functions that lets you scale, move, rotate, skew, etc., your elements. When used with pseudo-classes such as :hover that specify a certain state of an element, the transform property can easily add interactivity to your elements.

Add a CSS rule for the hover state of the div and use the transform property to scale the div element to 1.1 times its original size when a user hovers over it.

```

<style>
  div { 
    width: 70%;
    height: 100px;
    margin:  50px auto;
    background: linear-gradient(
      53deg,
      #ccfffc,
      #ffcccf
    );
  }
  div:hover {
    transform: scale(1.1);
  }
  
  
</style>

<div></div>
```

##skewX and skewY
Skew the element with the id of bottom by 24 degrees along the X-axis by using the transform property.

Skew the element with the id of top -10 degrees along the Y-axis by using the transform property.

**note** `rotate()` works the same way that `skewX()` and `skewY()`

```
<style>
  div { 
    width: 70%;
    height: 100px;
    margin:  50px auto;
  }
  #top {
    background-color: red;
    transform: skewY(-10deg);
    
    
  }
  #bottom {
    background-color: blue;
    transform: skewX(24deg);
  }
</style>

<div id="top"></div>
<div id="bottom"></div>
```

# Event Propagation
Deals with the three event phases:

1. Capturing
2. Target
3. Bubbling

`event.eventPhase`;

Whenever we have an event in JavaScript we have access to the `eventPhase` property

`eventPhase` gives us access to 1 of 3 values

1 = Meaning we are in the Capturing Phase
2 = Meaning we are at the Target Phase (or the level of the object that actually had the event occur)
3 = Meaning we are in the Bubbling Phase
0 = Meaning there is NO event currently occuring

![DOM tree using DOM event flow](https://i.imgur.com/HyPzwnO.png)

All the red stuff is part of the capturing phase (1) (everything on the way to the dark purple TD)
The purple TD is the target phase (2).
The green is the bubbling phase (3) (bubbles back up to the top of the document (window))

We really don't see this happening, it is happening behind the scenes and is pretty much instantaneous

But if we attach event listeners to events above in the DOM where an event occurs it is possible for them to listen in at the capture and/or bubbling phase

## Eample that explains propagation bubbling, target and capture

```js
var containers = document.getElementsByClassName( 'container' )

for ( var i = 0, max = containers.length; i < max; i++ ) {
  // containers[i].addEventListener( 'click', displayEventPhase, false );
  // containers[i].addEventListener( 'click', displayEventPhase, true );
}

function displayEventPhase( e ) {

  var phase = e.eventPhase;

  if ( 1 === phase ) {
    phase = 'Capturing';
  } else if ( 2 === phase ) {
    phase = 'At Target';
  } else if ( 3 === phase ) {
    phase = 'Bubbling';
  }

  console.log( 'Box: ' + this.id + ' - ' + phase );

}
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>DOM Events</title>
  <link rel="stylesheet" href="style-propagation.css">
</head>

<body>
  <h1>DOM events with JavaScript and Propagation</h1>
  <div class="content">
    <div id="1" class="container">
      1
      <div id="2" class="container">
        2
        <div id="3" class="container">
          3
        </div>
        <!-- /#3.container -->
      </div>
      <!-- /#2.container -->
    </div>
    <!-- /#1.container -->
  </div>
  <!-- /.content -->
  <script src="app.js"></script>
</body>

</html>
```

**style.css**

```css
body {
    background: #efefef;
    text-align: center;
}

h1 {
    font-size: 200%;
    font-family: sans-serif;
}

.content {
    background: #fff;
    border: 1px #ddd solid;
    padding: 20px;
    margin: 20px auto;
    max-width: 60%;
}

.container {
    background: #fff;
    border: 1px #ccc solid;
    padding: 10px;
    width: 80%;
    margin: 10px auto;
    text-align: center;
}

.container:hover {
    border-color: #222;
    cursor: pointer;
    background: rgba( 0, 0, 0, .2);
}
```

* View in the browser and you will see that when you click on and element that is the target
* But if you click on 1 you will just see target, but if you click on 3 you will see target and then 2 bubbling because bubbling is the default behavior, the element is clicked and then it bubbles up to the parent of the document (window)

```js
for ( var i = 0, max = containers.length; i < max; i++ ) {
  // containers[i].addEventListener( 'click', displayEventPhase, false );
  containers[i].addEventListener( 'click', displayEventPhase, true );
}
```

But if you do this and change the 3rd parameter from false to true, you are no longer using bubbling and now you are using capturing (happens before the target is selected)

You and also use both with:

```js
for ( var i = 0, max = containers.length; i < max; i++ ) {
  containers[i].addEventListener( 'click', displayEventPhase, false );
  containers[i].addEventListener( 'click', displayEventPhase, true );
}
```

### What is the difference between `e.target` and `this.id`?

```js
var containers = document.getElementsByClassName( 'container' )

for ( var i = 0, max = containers.length; i < max; i++ ) {
  containers[i].addEventListener( 'click', displayEventPhase, true );
  // containers[i].addEventListener( 'click', displayEventPhase, false );
}

function displayEventPhase( e ) {

  var phase = e.eventPhase;

  if ( 1 === phase ) {
    phase = 'Capturing';
  } else if ( 2 === phase ) {
    phase = 'At Target';
  } else if ( 3 === phase ) {
    phase = 'Bubbling';
  }

  console.log( 'Box: ' + this.id + ' - ' + phase );
  // console.log( 'Box: ' + e.target.id + ' - ' + phase );
  if ( e.target.id === this.id ) {
    console.log( 'We\'re here!!!' );
  }

}
```

So `this` will be the listener on the element
`e.target` will be what was clicked

## Stop Propagation

`event.stopPropagation();`

Stops propagation from happening completely.

```js
var containers = document.getElementsByClassName( 'container' )

for ( var i = 0, max = containers.length; i < max; i++ ) {

  containers[i].addEventListener( 'click', displayEventPhase, false );
}

function displayEventPhase( e ) {

  var phase = e.eventPhase;

  e.stopPropagation( );

  if ( 1 === phase ) {
    phase = 'Capturing';
  } else if ( 2 === phase ) {
    phase = 'At Target';
  } else if ( 3 === phase ) {
    phase = 'Bubbling';
  }

  console.log( 'Box: ' + this.id + ' - ' + phase );

}
```

So if we use this:

`containers[i].addEventListener( 'click', displayEventPhase, false );`

It does not bubble up after the target (propagation has been stopped)

or if we use this:

`containers[i].addEventListener( 'click', displayEventPhase, true );`

It does not precede (capture) before on the way to the target because we stopped propagation.

Why would I use this?
If you have multiple event listeners on something and you do not want the parents to be notified.

### Event Propagation Review
* 3 Event Phases: Capturing, Target, Bubbling
* Event listeners have a `useCapture` parameter
  - if you use removeEventListeners, the `useCapture` parameter value must be identical
* `event.target` vs `this`
  - `this` refers to what ever element is currently being triggered during the caputure event or bubbling phase
  - `event.target` is always going to refer to the element on which the event happens.
  - **note** when you get to the Target Phase, `event.target` and `this` will be equal
* Can stop propagation with `event.stopPropagation()`
  - if you are using this during the Capturing Phase it means that only the top level parent will be notified and nothing below it
  - if you use it during the Bubbling Phase it means that only the target element is notified and then nothing above it receives that notification









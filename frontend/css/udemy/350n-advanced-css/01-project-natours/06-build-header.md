# Build the header

`index.html`

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet">

        <link rel="stylesheet" href="css/icon-font.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="shortcut icon" type="image/png" href="img/favicon.png">
        
        <title>Natours | Exciting tours for adventurous people</title>
    </head>
    <body>
        
        
    </body>
</html>
```

`style.css`

```
/*
COLORS:

Light green: #7ed56f
Medium green: #55c57a
Dark green: #28b485

*/
```

## reset needed?
* Browsers are getting better and better so a reset is no longer needed
* Just use a universal reset

```
* {
  margin: 0;
  padding: 0;
  /* box-sizing: alters the box-model so that the borders and paddings to
    the total width or total height that is specified for a box */
  box-sizing: border-box; 
}
```

## Set font for overall website
* fonts don't go in universal selector `*`
* They go in body because they usually rely on inheritance
* `body` is the parent of all child elements on page so they all will `inherit` the font properties
    - It is more efficient and a better practice that using the `*` universal selector

#
`styles.css`

```
// MORE CODE

body {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
}

// MORE CODE
```

* We can use Lato and `font-weight` because we included it in the html

`index.html`

```
// MORE CODE

  <!-- fonts -->
  <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet">

// MORE CODE
```

## line-height: 1.7
* Means it is 1.7 times bigger than the predefined line-height

## vh - Viewport Height
```
// MORE CODE

.header {
  height: 95vh;
}

// MORE CODE
```

* This makes it 95% of viewport height (we could use 100% but prefer to use "almost" 100%)

## background-size: cover
* Whatever the width of the viewport or the element, always try to fit the element inside of the box

```
// MORE CODE

.header {
  background-image: url(../img/hero.jpg);
  background-position: top;
  background-size: cover;
  height: 95vh;
}


// MORE CODE
```

* View and you'll see the cover resizes the image as you adjust the height and width of the viewport
* You see white on bottom as we are only using 95vh of viewport
* `background-position: top` will keep the image at the top as you adjust it
    - try it with `background-position: bottom` and `background-position: center` to see how it behaves differently

## Add a gradient
* To do this you must use `background-image`
* You want the image on top so that comes last
* Put the gradient (we'll use linear-gradient with light color first followed by dark color)

```
// MORE CODE

.header {
  background-image: linear-gradient(to right, #7ed56f, #28b485), url(../img/hero.jpg);

// MORE CODE
```

* We can specify
    - to right
    - to left
    - to top
    - to bottom
* We can specify multiple directions
    - to right bottom

## Add opacity
* If you use VS code the color picker makes this easy

```
// MORE CODE

body {
  color: #777;
  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  padding: 30px; /* give our page some padding */
}

.header {
    /* we switch to rgba for opacity */
  background-image: linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.8),
      rgba(40, 80, 131, 0.8)
    ),
    url(../img/hero.jpg);
  background-position: top;
  background-size: cover;
  height: 95vh;
}
// MORE CODE
```

* `padding` is not inherited

## clip-path
* Modern part of CSS
* Specify a polygon of which the image/element will be visible
    - top left specify x and y (0 0)
    - Then we want to move 100% in x direction and no y (100% 0)
    - Then we want to move 100% x and 200px y (100% 200px)
    - Then we want to move 0 x and 100% y (0 100%)

```
// MORE CODE

.header {
  background-image:

    linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.8),
      rgba(40, 80, 131, 0.8)
    ),
    url(../img/hero.jpg);
  background-position: top;
  background-size: cover;
  clip-path: polygon(0 0, 100% 0, 100% 200px, 0 100%);
  height: 95vh;
}

// MORE CODE
```

* Use client console to make a triangle

## Cool tool to make lots of shapes easily
* [link to clippy](https://bennettfeely.com/clippy/)
* Choose a shape and it give you the code

```
// MORE CODE

.header {
  background-image:

    linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.8),
      rgba(40, 80, 131, 0.8)
    ),
    url(../img/hero.jpg);
  background-position: top;
  background-size: cover;
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75vh 100%, 0% 100%);
  height: 95vh;
}

// MORE CODE
```


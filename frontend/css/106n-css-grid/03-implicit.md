# Undertanding
* Implicit Grid
* Implicit Tracks
* Explicit Tracks
* Explicit Grid

* Using them all together to make a flexible, fluid looking web site

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>CSS Grid Implicit vs Explicit Grid Tracks!</title>
</head>

<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
  </div>

  <style>
    .container {
      display: grid;
    }
  </style>
</body>

</html>
```

* Use Dev tools
* Open inspector > Layout
    - Select div.container and make it black
    - Check all boxes under grid display settings

## Let's make a 2x2 grid 
![2x2 grid](https://i.imgur.com/9KY1x4L.png)

```
// MORE CODE
  <style>
    .container {
      display: grid;
      grid-gap: 20px;
    grid-template-columns: 200px 400px;
    }
  </style>
</body>

</html>
```

* Now we have a grid with 2 cols and 2 rows

![2 x 2](https://i.imgur.com/Yodz6qK.png)
* This is the difference between the explicit and the implicit
    - We explicitly defined what the columns will be
    - We have not defined what the rows will be
        + If you don't create them they are called **implicit** (The browser decided what it should do with the extra div tags and here it wraps it and then it will create a row)
        + In firefox they show solid lines as explicit
        + And dotted lines as implicit
![implicit vs explicit](https://i.imgur.com/9FqYB9Y.png)

* And if we add a row

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px;
  grid-template-rows: 200px 400px;
}
```

![rows and cols](https://i.imgur.com/hPW4VSr.png)

* The rows are bigger because we defined that
* The lines are solid and dashed because they are explicitly defined
* faded means explicitly defined
* solid line at end is where explicit ends

## How to style implicit rows?
```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px;
  grid-template-rows: 50px 400px;
  grid-auto-rows: 500px;
}
```

* Now all implicit rows will have a height of 500px

* Bug
    - You can't add multiple value to firefox dev tools for implicit values

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px;
  grid-template-rows: 50px 400px;
  grid-auto-rows: 500px 100px; // this causes an error)
}
```

* To see the error select `div container` in inspector and click rules tab to see `grid-auto-rows` is crossed out
    - works in chrome
    - should work and should be fixed soon

## grid-auto-columns
* We can add them

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px;
  grid-template-rows: 50px 400px;
  grid-auto-rows: 500px 100px;
    grid-auto-columns: 100px;
}
```

* But how do you add extra columns when they wrap into rows?
* grid-auto-flow will help us work with this
    - instead of automatically giving us rows it will automatically give us more columns

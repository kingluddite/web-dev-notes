# Using minmax() for responsive grids
* Using minmax() and auto-fit and auto-fill will replace much of your media queries

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>Using minmax() for Responsive Grids!</title>
</head>

<body>
  <div class="container">
    <div class="item item1">Item 01</div>
    <div class="item item2">Bonjour!</div>
    <div class="item item3">Item 03</div>
    <div class="item item4">Item 04</div>
  </div>

  <style>
    .container {
      display: grid;
      grid-gap: 20px;
      border: 10px solid var(--yellow);
      grid-template-columns: repeat(auto-fit, 150px);
    }
  </style>
</body>

</html>
```

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: repeat(auto-fit, 100px);
}
```

* This makes the content spill out

![content spill](https://i.imgur.com/3FFRKZr.png)

* We don't want to figure out how wide our columns should be
* They should figure it out on their own

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
```

* Shrink the browser and when they won't fit they wrap around until they are one stacked column
* This is great because we can avoid having to tell it the number of columns we want and it will just use the min and max to decide how to show content

## auto-fit
* You most likely will use this more
* It will not give extra space and just use all the available space

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
```

## fit
```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  /* grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); */
    grid-template-columns: auto 150px 150px 150px;
}
```

* That works but sometimes it grows to big
* You can clamp the width of that item using `fit-content()`
* Not used often (edge case)

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  /* grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); */
    grid-template-columns: fit-content(100px) 150px 150px 150px;
}
```

# Grid Repeat Function
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>CSS Grid repeat Function!</title>
</head>

<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
    <div class="item">8</div>
    <div class="item">9</div>
    <div class="item">10</div>
    <div class="item">11</div>
    <div class="item">12</div>
    <div class="item">13</div>
    <div class="item">14</div>
    <div class="item">15</div>
  </div>

  <style>
    .container {
      display: grid;
      grid-gap: 20px;
    }
  </style>
</body>

</html>
```

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
```

* Typing 1fr four times is not fun
* Do this instead

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
}
```

* Same output but easier to type

## Alternate frs
```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr 3fr);
}
```

* You could also do this:

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 100px repeat(2, 1fr auto);
}
```

* Add 30 div tags

```
<div class="container">
  .item.item${$}*30
</div>
```

* Using emmet above
* Sample output

```
div class="container">
    <div class="item item1">1</div>
    <div class="item item2">2</div>
    <div class="item item3">3</div>
```

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
```

* We'll style one item with a width

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}

.item4 {
  background-color: red;
  color: white;
  width: 500px;
}
```

* Now all items in that column are 500px wide

## How does this work
* The browser takes care of item4 first and then because we are using fr, it the fill the left over free space
* If that cell had content that was long the other items in that column would equal it its width

## Spanning
* We can explicitly tell specific items to be a specific with
* By default content or setting width of item effects all items in that column
    - This is often not the desired effect
    - Spanning lets us alter just one item's width

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}

.item4 {
  background-color: red;
  color: white;
  grid-column: span 2;
}
```

* grid-items naturally fill in spaces one after another
* spanning tells an item to take up multiple spots in a grid

![spanning](https://i.imgur.com/8uXzwrq.png)

## Watch out for "deadspace"
```css
.item4 {
  background-color: red;
  color: white;
  grid-column: span 3;
}
```

![deadspace](https://i.imgur.com/NcIy3FF.png)

* If the browser comes to a place in the grid where it needs 3 spaces and it only has 2 spaces it then goes to the next line

```css
.item4 {
  background-color: red;
  color: white;
  grid-column: span 2;
  grid-row: span 2;
}
```

![span row and column](https://i.imgur.com/79pUV3z.png)

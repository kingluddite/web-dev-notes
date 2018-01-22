# Sizing Tracks
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>Sizing Tracks in CSS Grid!</title>
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

### What if we used % instead of px
```css
.container {
  display: grid;
  grid-gap: 20px;
    grid-template-columns: 25% 25% 25% 25%;
}
```

* But we get horizontal scroll? Why?
    - This is because we also have a gap of 20px and that make us 60px over (20x3)
    - % can be used but a better unit is the `fr` unit

## Fractional Unit
```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: 200px 200px;
}
```

* Can we equally distribute these columns?
* `fr` units (fractional units) represent the amount of space layout out after all the columns are layout out

## Watch this!
* I have 2 columns and I will add a 3rd column with the `fr` measurement and it will work magic

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: 200px 200px 1fr;
}
```

![fr units](https://i.imgur.com/08k0awV.png)

* If I do this:

![2 equal columns](https://i.imgur.com/R21Ltji.png)

* Now two columns will split the remaining space and be equal height and width

* If I want the middle column to take up twice the amount of free space

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: 200px 2fr 1fr;
}
```

![twice free space](https://i.imgur.com/46gZMP1.png)

## 4 equal columns
* No pixels at all

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
```

![4 equal columns](https://i.imgur.com/AqFxbIu.png)

## The `auto` keyword
```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: auto 1fr;
}
```

* That first column will be the width of the most wide item
* Make the first item have a number of `1000` as its content and watch how auto grows

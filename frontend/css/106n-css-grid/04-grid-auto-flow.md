# Grid auto flow
* You won't be using this all the time
* This lets you define whether implicit rows or columns are added
* Use this if you ever want to create a horizontally scrolling elements

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>CSS grid-auto-flow Explained!</title>
</head>

<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
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

* This gives us 1 row and 2 columns

## What happens if we add a 3rd columns?
* It wraps and gives us an implicitly defined row

![wrapped implicit row](https://i.imgur.com/p1V3REU.png)

```css
.container {
  display: grid;
  grid-gap: 20px;
    grid-template-columns: 400px 200px;
      grid-auto-flow: column;
}
```

* if we set grid-auto-flow to `row` nothing would change but setting it to `column` we see the 3rd column doesn't wrap but now we add on an implicit column
* all extra columns you add will create a horizontal scroll

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 400px 200px;
  grid-auto-flow: column;
  grid-auto-columns: 200px;
}
```

* Now all columns we add will have a width of 200px

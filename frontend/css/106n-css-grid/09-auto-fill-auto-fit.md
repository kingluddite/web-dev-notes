# auto-fill and auto-fit
* You will use this a lot

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>auto-fit and auto-fill!</title>
</head>

<body>
  <div class="container">
    <div class="item item1">Item 01</div>
    <div class="item item2">Item 02</div>
    <div class="item item3">Item 03</div>
    <div class="item item4">Item 04</div>
    <div class="item item5">Item 05</div>
    <div class="item item6">Item 06</div>
    <div class="item item7">Item 07</div>
    <div class="item item8">Item 08</div>
    <div class="item item9">Item 09</div>
    <div class="item item10">Item 10</div>
    <div class="item item11">Item 11</div>
    <div class="item item12">Item 12</div>
    <div class="item item13">Item 13</div>
    <div class="item item14">Item 14</div>
    <div class="item item15">Item 15</div>
    <div class="item item16">Item 16</div>
    <div class="item item17">Item 17</div>
    <div class="item item18">Item 18</div>
    <div class="item item19">Item 19</div>
    <div class="item item20">Item 20</div>
  </div>

  <style>
    .container {
      display: grid;
      grid-gap: 20px;
      border: 10px solid var(--yellow);
    }
  </style>
</body>

</html>
```

## auto-fill
`grid-template-columns: repeat(auto-fill, 100px);`

* You don't specify columns
* You tell the browser to figure it out
* See how much content you have and see how many can actually fit
* as you change the browser with, the items auto resize on different lines
* Great if you want to take last item in a row and put at the end

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: repeat(auto-fill, 150px);
}
.item4 {
  grid-column-end: -1;
}
```

## auto-fit
* Looks like the same thing

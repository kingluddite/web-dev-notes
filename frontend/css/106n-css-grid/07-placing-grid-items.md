# Placing Grid Items
`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>Placing Grid Items!</title>
</head>

<body>
  <div class="container">
    <div class="item item1">1</div>
    <div class="item item2">2</div>
    <div class="item item3">3</div>
    <div class="item item4">4</div>
    <div class="item item5">5</div>
    <div class="item item6">6</div>
    <div class="item item7">7</div>
    <div class="item item8">8</div>
    <div class="item item8">💩</div>
    <div class="item item9">9</div>
    <div class="item item10">10</div>
    <div class="item item11">11</div>
    <div class="item item12">12</div>
    <div class="item item13">13</div>
    <div class="item item14">14</div>
    <div class="item item15">15</div>
    <div class="item item16">16</div>
    <div class="item item17">17</div>
    <div class="item item18">18</div>
    <div class="item item19">19</div>
    <div class="item item20">20</div>
    <div class="item item21">21</div>
    <div class="item item22">22</div>
    <div class="item item23">23</div>
    <div class="item item24">24</div>
    <div class="item item25">25</div>
    <div class="item item26">26</div>
    <div class="item item27">27</div>
    <div class="item item28">28</div>
    <div class="item item29">29</div>
    <div class="item item30">30</div>
  </div>

  <style>
    .container {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: repeat(5, 1fr);
    }
  </style>
</body>

</html>
```

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}

.car {
  grid-column: span 2;
    background: #BADA55;
}
```

* Tell it when to start and when to end

```css
.car {
  background: #BADA55;
  grid-column-start: 2;
  grid-column-end: 5;
}
```

* If you look at rules and you are using a shorthand css rule you can use the developer tools to expand and see what is under:

`grid-column: span 2;`

![shorthand rules expanded](https://i.imgur.com/orWcnzR.png)

### Other shorthand
* `grid-column: 2 / 5;`
    - start at 1 and span 2
        + `grid-column: 1 / span 2;`
* This is great because it is very flexible

## Width 100%
* No matter how long it is, even if you don't know how many tracks you can use:

```css
.car {
  grid-column: 1 / -1; 
  background: #BADA55;
}
```

![full with span](https://i.imgur.com/iiRJAKu.png)

* Column and row

```css
.car {
  grid-column: 1 / -4; 
  grid-row: 3 / span 3;
  background: #BADA55;
}
```

![row and col](https://i.imgur.com/BX99ZxX.png)


## Make Item 5 double span 2 cols and rows
* span a column and a row
```css
.item5 {
  grid-column: span 2;
  grid-row: span 2;
}
```
![span row and col](https://i.imgur.com/xMSjgxR.png)

```css
    /* Make Item 8 two rows high */
    .item8 {
      grid-row: span 2;
    }

    /* Make Item 15 span the entire grid width */
    .item15 {
      grid-column: 1 / -1;
    }
    /* Make item 18 span 4 widths, but end at 9 */
    /* https://i.imgur.com/GuT7xyV.png */
    .item18 {
      grid-column: span 4 / 9;
    }
    /* Make item 20 start at row 4 and go for 3 */
    /* https://i.imgur.com/vTnnatx.png */
    .item20 {
      grid-row: 4 / span 3;
    }
```


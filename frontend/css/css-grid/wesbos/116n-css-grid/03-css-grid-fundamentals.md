# What is a grid?
* You have a grid

![grid](https://i.imgur.com/PJ08SNF.png)

* Imagine if you could place HTML elements like a div or p anywhere on that grid
* Define your rows and columns

![sample grid layout](https://i.imgur.com/UAYtI6p.png)

* You can expand content on multiple rows and columns
* You take an element and decide how many rows and columns it will take up (css grid calls these **tracks**)
    - Pro
        + You can do this without floats and positioning

## Create this
* A container with 10 items with a class of `item` and sequential content names
    - We'll use emmet

`.container>.item{$}*10` + `tab`

* Will output:

```
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
</div>
```

## Container vs Items
* Similar to flexbox
* Tell the container it will be a grid

```
.container {
  display: grid;
  grid-template-columns: 100px auto 100px 100px;
  grid-gap: 20px;
}
```

* That will create 3 columns, 100px wide each
* After 3 columns the content will rotate

![3 cols](https://i.imgur.com/vwdQL46.png)

## Stretch some columns, shrink others
```
.container {
  display: grid;
  grid-template-columns: 200px 500px 50px;
  grid-gap: 20px;
}
```

![stretch](https://i.imgur.com/UlU3UGa.png)

* Can use rem and `auto`

```
.container {
  display: grid;
  grid-template-columns: 200px auto 500px 50px;
  grid-gap: 20px;
}
```

* That will have one column fill the available screen real estate

### repeat()
* Saves you typing
* Tell it how many times you want to repeat

```
.container {
  display: grid;
  grid-template-columns: repeat(8, 100px); 
  grid-gap: 20px;
}
```

* Will repeat 8 times and then go to next row

## Only use rows
```
.container {
  display: grid;
  grid-template-rows: 200px 100px 400px;
  grid-gap: 20px;
}
```

* The first 3 rows are 200px, 100px and 400px, the others are all rows of the same size (the other rows are using "the implicit grid")

## Rows and columns
```
.container {
  display: grid;
  grid-template-rows: 200px 100px 400px;
  grid-template-columns: 200px 500px;
  /* grid-template-columns: repeat(8, 100px);  */
  grid-gap: 20px;
}
```


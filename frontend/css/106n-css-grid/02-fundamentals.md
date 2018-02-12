# CSS Grid Fundamentals
![grid pic](https://i.imgur.com/uaj1yg3.png)

* Have rows and columns
* like a checkboard but the sizes can vary
* some columns are larger than others
* you can put content in any of those grids

## Idea behind CSS grid
![paint grid with content](https://i.imgur.com/EkW3jq2.png)

* Take element and place in grid covering multiple columns or rows

### Tracks
* columns and rows are collectively knows as `tracks`

#### Pro
* Now we don't need positioning top/right/bottom/left absolute
* To learn soon:
    - implicit grid vs explicit grid

## Our first CSS grid
`.container>.item{$}*10`

* Emmet to this:

```html
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

* css grid container
    - css grid items
    - when you make a container display:grid all of its children are now grid items
    - That will make each item 100px and the total width is 300px and then the items will wrap

![grid-template-columns](https://i.imgur.com/RZEPYvu.png)

```css
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
}
```

## Grid gap
```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-gap: 20px;
}
```

![grid gap](https://i.imgur.com/u06qBqc.png)

## vary the column width
```
.container {
  display: grid;
  grid-template-columns: 200px 500px 50px;
  grid-gap: 20px;
}
```

![column width varies](https://i.imgur.com/8FYH4T5.png)

## Units of measure
* Can use rem also
* But % will change with grids and we'll learn about that later

## Auto column
```css
.container {
  display: grid;
  grid-template-columns: 200px auto 500px 50px;
  grid-gap: 20px;
}
```

![auto column](https://i.imgur.com/2YztpO0.png)

* Now the auto column will stretch to fill up the available screen (responsive)
* This makes the fixed sidebar so easy in css grid

![fixed sidebar](https://i.imgur.com/6BsxU1U.png)

## repeat()
* Saves you typing time

```css
.container {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-gap: 20px;
}
```

![repeat function](https://i.imgur.com/1COd8Q4.png)

## Rows
```css
.container {
  display: grid;
  grid-template-rows: 200px 100px 400px;
  grid-gap: 20px;
}
```

* now we have no columns
* The first 3 rows are 200, 100, 400
* The rest are all the other columns

## Add two columns to our rows
```css
.container {
  display: grid;
  grid-template-columns: 200px 500px;
  grid-template-rows: 200px 100px 400px;
  grid-gap: 20px;
}
```

* Now we have a 200px and 500px column
* The implicit grid is when they size themselves

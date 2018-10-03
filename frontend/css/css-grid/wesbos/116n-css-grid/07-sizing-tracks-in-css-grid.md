# Sizing Tracks
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 25% 25% 25% 25%;
}
```

* We get the dreaded horizontal scroll

## Why the horizontal scroll?
* 4 25% + the grid-gap
* That will make us 60px over and that is why we are scrolling
* **tip** Don't use percentages for css-grid

## fr unit
* "fractional" unit

```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: 200px 200px;
}
```

![bad grid](https://i.imgur.com/BlIP9tc.png)

* We see a lot of empty space
* We are not using our grid because we defined our grid in pixels
* **fr** will help with this and they will fill up the amount of space left after all the elements are laid out

```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: 200px 200px 1fr;
}
```

* That fills up the columns of the page
* We still have a row gap of empty space

### fill the space with mutiple implicit values
```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: 200px 1fr 2fr;
}
```

* That are not measurements like px, they just take up the space in relation to what is left
* **tip** A better name for them would be to call them `free space` units

### So if you want 4 equal columns
```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
```

### Add 4 equal rows
```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
}
```

* Nothing happens
* Why?
    - By default the height of a grid (very similar to `display-block-element`) is however high the contents are
    - But the default width of a grid is however wide the actual viewport is that we have
    - To make fr work in rows you need to define an explict height
    - **tip** Primarily use `fr` units and `rems`

## The width is determined by the longs content

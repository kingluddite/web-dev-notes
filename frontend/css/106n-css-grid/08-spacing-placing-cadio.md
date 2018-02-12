# Spanning and Placing Cardio
**tip** `cmd` + `option` + `i` toggles firefox dev tools

## 10 columns alternating widths
* Make the grid 10 columns wide, every other taking up twice the free space

```css
.container {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(5, 1fr 2fr);
  }
```

* We want 10 columns so the repeat() function will save us time rather than writing them all out
* Alternate rows 1fr, 2fr and 5columns for each will generate 10 columns with alternating widths

## 10 rows 50px heights
* Make the grid have 10 explicit rows, 50px high each */
grid-template-rows: repeat(10, 50px);

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr 2fr);
  grid-template-rows: repeat(10, 50px);
}
```

* This you will only see in the dev tools
* Make sure you check div.container checkbox in Overlay grid

## With Item 1, start at col 3 and go until 5
```css
.item1 {
  grid-column: 3 / 5;
}
```

![col start stop](https://i.imgur.com/e2ZDPCS.png)

## With Item 2, start at col 5 and go until the end
```css
.item2 {
  grid-column: 5 / -1;
}
```

![col start til end](https://i.imgur.com/9EKJIp9.png)



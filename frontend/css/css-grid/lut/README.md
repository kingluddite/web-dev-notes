# Instructions
* Go into start folder
* run `$ sasswatch` for that folder (converts sass to css)
* make sure you run `$ npm start` to run server and point to html file of existing lecture you want to learn

```
.container {
  display: grid;
  grid: 100px / repeat(2, 1fr 3fr);
  grid-gap: 10px;
  > div {
    background: #373142;
    color: #FFF;
    text-align: center;
    line-height: 100px;
    &:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 4;
    }
  }
}
```

## span the full length of the line would be:

```
.container {
  display: grid;
  grid: 100px / repeat(2, 1fr 3fr);
  grid-gap: 10px;
  > div {
    background: #373142;
    color: #FFF;
    text-align: center;
    line-height: 100px;
    &:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: -1;
    }
  }
}
```

## shorthand for doing exact same thing (start at first item and end at last item)

```
.container {
  display: grid;
  grid: 100px / repeat(2, 1fr 3fr);
  grid-gap: 10px;
  > div {
    background: #373142;
    color: #FFF;
    text-align: center;
    line-height: 100px;
    &:nth-child(1) {
      grid-column: 1 / -1;
    }
  }
}
```

# start grid 1 at 3rd spot til the end and add another grid (item2) and start it at the 1st row

```
.container {
  display: grid;
  grid: 100px / repeat(2, 1fr 3fr);
  grid-gap: 10px;
  > div {
    background: #373142;
    color: #FFF;
    text-align: center;
    line-height: 100px;
    &:nth-child(1) {
      grid-column: 3 / -1;
    }
    &:nth-child(2) {
      grid-column: 1 / 3;
      grid-row: 1;
    }
  }
}
```

* reduces the amount of time we need to use position absolute
* we can position things where we want but also put them in the proper place structurally

```
.container {
  display: grid;
  grid: 100px / repeat(2, 1fr 3fr);
  grid-gap: 10px;
  > div {
    background: #373142;
    color: #FFF;
    text-align: center;
    line-height: 100px;
    &:nth-child(1) {
      grid-column: 3 / -1;
    }
    &:nth-child(2) {
      grid-column: 1 / 3;
      grid-row: 1 / 4;
    }
  }
}
```

* tell how many rows you want to span

```
.container {
  display: grid;
  grid: 100px / repeat(2, 1fr 3fr);
  grid-gap: 10px;
  > div {
    background: #373142;
    color: #FFF;
    text-align: center;
    line-height: 100px;
    &:nth-child(1) {
      grid-column: 3 / -1;
    }
    &:nth-child(2) {
      grid-column: 1 / 3;
      grid-row: 1 / span 4;
    }
  }
}
```



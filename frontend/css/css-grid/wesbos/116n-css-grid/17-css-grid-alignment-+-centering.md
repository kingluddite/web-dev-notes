# CSS grid alignment and centering
* justify items
* align-items

* justify-content
* align-content

* align-self
* justify-self

## Notes to remember
* The `justify-` is along the row axis
* The `align-` is along the column axis

### Great resource
* [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

## justify-items and align-items
* **note** The item is only as wide as it needs to be

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
  justify-items: center;
}

.itm {
  background: white;
  color: black;
}
```

* **note** The default of `justify-items` is **stretch**
* There is also `start` and `end`

## align-items (works with row)
* Need to give our rows a height

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(5, 100px);
  justify-items: end; 
  align-items: center;
}

.itm {
  background: white;
  color: black;
}
```

* You also have `start`, `end`, `stretch`,

## Shortcut
* Align in center for both row and column
* Saves you typing both

```
place-items: center center;
```

* But browser might not understand this
* Make sure your autoprefixr will change your place-items into justify-items: center and align-items: center
* Firefox inspector will show you what really is output when use use place-items

![place items](https://i.imgur.com/VAff9hq.png)

## Justify content and align content
```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  /* justify-items: end;  */
  /* align-items: center; */
  place-items: center center;
}

.itm {
  background: white;
  color: black;
}
```

* We have too much extra space on right
    - start, end, center, stretch, space-around
    - space-around
        + Takes each of our items and takes extra space and puts it inbetween our items

```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  /* justify-items: end;  */
  /* align-items: center; */
  place-items: stretch stretch;
  justify-content: space-around;
}

.itm {
  background: white;
  color: black;
}
```

* But that gives you space on the left and right too
* A better option is `space-between` which does not have a space on far left and right

```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  /* justify-items: end;  */
  /* align-items: center; */
  place-items: stretch stretch;
  justify-content: space-between;
}

.itm {
  background: white;
  color: black;
}
```



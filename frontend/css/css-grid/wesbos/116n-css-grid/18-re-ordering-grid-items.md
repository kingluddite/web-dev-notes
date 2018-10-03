# Re-ordering Grid Itemsk
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
}
.logo {
  grid-column: span 2;
}

.nav {
  grid-column: span 8;
}

.content {
  grid-column: 1 / -1;
}
```

## How to reorder stuff
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
}

.logo {
  grid-column: span 2;
  order: 2
}

.nav {
  grid-column: span 8;
  order: 1;
}

.content {
  grid-column: 1 / -1;
  order: 3;
}
```

* This will mess up your select and accessibility
* The screen reader will read this in the wrong order
* Be careful with reordering as your site will be inaccessible
* And you can't select text

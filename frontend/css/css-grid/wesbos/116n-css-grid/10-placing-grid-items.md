# Placing Grid Items
* **note** If you use shorthand rules you can use firefox inspector to find out the long version of the rules

![long version of ff css rules](https://i.imgur.com/o6Kfc7d.png)

```
.dirt {
  background: var(--white);
  grid-column-start: 2;
  grid-column-end: 5;
}
```

* Shorthand

```
.dirt {
  background: var(--white);
  grid-column: 2 / 5;
}
```

* You may have to refresh browser to get updated values
* So it's flexible
* You can tell it where to start and stop

## How to start at first track and end at last track
* This is good to use kind of similar to a width: 100%

```
.dirt {
  background: var(--white);
  grid-column: 1 / -1;
}
```

* Same with rows

```
.dirt {
  background: var(--white);
  grid-column: 1 / -1;
  grid-row: 2 / span 7;
}
```

## take up full row
* You need to use both grid-template-columns and grid-template-rows

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.dirt {
  background: var(--white);
  grid-row: 1 / -1;
}
```

* **note** you are only taking up explicit rows and columns with the above



# minmax for responsive grids
* You will probably with css-grid use:
    - autofit
    - autofill
    - minmax
* This will replace many of your media queries
* It is responsive by nature

![how wide?](# auto-fit and auto-fill
```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: repeat(auto-fill, 150px);
}
```

## What does auto-fill do?
* See how much content is in each one
* Then figure out how many you could possibly fit in that
* Resize your browser and it will adjust to fit

## What does auto-fit do?
* auto-fit is best able to be seen if you only have 4 items. You will see the cells continue after the 4th item
* But with auto-fit, the grid stops after the 4th item

### How is auto-fill useful?
* You can have 3 items and then push the 4th item all the way to the right
* Make sure the container has `grid-template-columns` set to repeat(auto-fill, 100px) and then iter4 set to `grid-column-end: -1`

![item on end](https://i.imgur.com/GINqmYS.png)

* We don't want to figure out how wide our columns should be
* They should just figure them out based on the device

```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: repeat(auto-fill, 150px);
}
```

* Move the browser and watch the items responsively stack (that is with auto-fill)
* But something you will be using more often is `auto-fit` MAGIC!
    - This spreads your items out to fill the device screen
    - Stacks on smaller screens

```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  /* grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); */
  grid-template-columns: auto 150px 150px 150px;
}
```

* That works but col 1 is too long
* This will work better:

### fit-content
```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: fit-content(150px) 150px 150px 150px;
}
```

# Grid Auto Flow
* Won't be used much
* Unless you want to create a horizontally scrolling page

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px;
}
```

* We have 2 columns

## What happens if we add a 3rd column?
* That 3 column will got to an implicit row

### grid-auto-flow
* Default value is `row`
* But we can change it to column

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px;
  grid-auto-flow: column; /* add this */
}
```

* Now we have an implicit column
* If you added 20 `.item`s you would get all implicit columns added
    - flexbox you can change direction of items
    - There is no direction in css-grid

# Grid auto flow dense block fitting
* This will fill in gaps in your layout automatically

* Every 6th cell make them blue
* And span each cell 6 columns

```
.container {
  display: grid;
  grid-gap:20px;
  grid-template-columns: repeat(10, 1fr);
}

.item:nth-child(6n) {
  background: cornflowerblue;
  grid-column: span 6;
}
```

## Explain all the open space
* Our cells will take 6 columns so when the browser gets to a spot, if there isn't 6 spots it will start on the next line

![taking up 6 spots](https://i.imgur.com/BmET61F.png)

* Not good
    - This creates gaps in our layout
    - But we can use `grid-auto-flow: dense` to fill in the gaps

```
.container {
  display: grid;
  grid-gap:20px;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-flow: dense; /* add this line */
}

.item:nth-child(6n) {
  background: cornflowerblue;
  grid-column: span 6;
}
```

```
.container {
  display: grid;
  grid-gap:20px;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-flow: dense;
}

.item:nth-child(6n) {
  background: cornflowerblue;
  grid-column: span 6;
}

.item:nth-child(8n) {
  background: tomato;
  grid-column: span 2;
}
.item:nth-child(9n) {
  grid-row: span 2;
}
.item18 {
  background: greenyellow !important;
  grid-column-end: -1 !important;
}
```


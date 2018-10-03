# Spanning and placing cardio
```
<style>
  .container {
    display: grid;
    grid-gap: 20px;
    /* Make the grid 10 columns wide, every other taking up twice the free space */
    grid-template-columns: repeat(5, 1fr 2fr);
    /* Make the grid have 10 explicit rows, 50px high each */
    grid-template-rows: repeat(10, 50px)
  }

  /* With Item 1, start at col 3 and go until 5 */
  .item1 {
    grid-column: 3 / 5;
  }
  /* With Item 2, start at col 5 and go until the end */
  .item2 {
    grid-column: 5 / -1;
  }
  /* Make Item 5 double span 2 cols and rows */
  .item5 {
    grid-column: span 2;
    grid-row: span 2;

  }
  /* Make Item 8 two rows high */
  .item8 {
    grid-row: span 2;
  }
  /* Make Item 15 span the entire grid width */
  .item15 {
    grid-column: 1 / -1;
  }
  /* Make item 18 span 4 widths, but end 9 */
  .item18 {
    grid-column: span 4 / 9;
  }
  /* Make item 20 start at row 4 and go for 3 */
  .item20 {
    grid-row: 4 / span 3;
  }
</style>
```


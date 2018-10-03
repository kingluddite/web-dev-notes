# Naming Lines in CSS grid
* Take `.item3` div and make it in the middle and cover the entire row

## But we can name these lines rather than use numbers
* Use `[]` you define your columns

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: [site-left] 1fr [content-start] 500px [content-end] 1fr [site-right];
  grid-template-rows: [content-top] repeat(10, auto) [content-bottom];
}

.item3 {
  background: slateblue;
  grid-column: content-start;
  grid-row: content-top / content-bottom;
}
```

### You can assign multiple values
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 
  [sidebar-start site-left] 1fr [content-start] 500px [content-end] 1fr [site-right];
  grid-template-rows: [content-top] repeat(10, auto) [content-bottom];
}

.item3 {
  background: slateblue;
  grid-column: content-start;
  grid-row: content-top / content-bottom;
}
```



# Product Template CSS
`layout.css`

```
// MORE CODE
.small {
  width: 100px;
}

/* make two columns for single page */
.single-product {
  width: 90vw;
  max-width: 1170px;
  margin: 3rem auto;
}

@media screen and (min-width: 768px) {
  .single-product {
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 2rem;
  }
}
```

* Now you have 2 columns on 768 or greater single product pages


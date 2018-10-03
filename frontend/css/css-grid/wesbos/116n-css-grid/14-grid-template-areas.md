# Grid Template Areas
`areas-START.html`

* You can give template names to your grid

```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  /* grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); */
  grid-template-columns: fit-content(150px) 150px 150px 150px;
}
```

* Firefox tools
* Check div.container
* You will see your template areas names in the firefox browser
    - no commas
    - It can all be done on one line
    - You should put each one on it's only line to give you a nice visual of the layout

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 500px 1fr;
  grid-template-rows: 150px 150px 100px;
  grid-template-areas:
    "sidebar-1 content sidebar-2"
    "sidebar-1 content sidebar-2";
    "footer footer footer"
}
```

You can leave an empty space using a `.`

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 500px 1fr;
  grid-template-rows: 150px 150px 100px;
  grid-template-areas:
    "sidebar-1 content sidebar-2"
    "sidebar-1 content sidebar-2"
    "footer    footer  footer";
}
```

* Use tabs to line them up

## Place our footer inside the .footer

```

.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 500px 1fr;
  grid-template-rows: 150px 150px 100px;
  grid-template-areas:
    "sidebar-1 content sidebar-2"
    "sidebar-1 content sidebar-2"
    "footer footer footer";
  }

  .footer {
    grid-area: footer;
  }
}

```

### Define it better
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 500px 1fr;
  grid-template-rows: 150px 150px 100px;
  grid-template-areas:
    "sidebar-1 content sidebar-2"
    "sidebar-1 content sidebar-2"
    "footer footer footer";
  }

  .footer {
    grid-area: footer;
  }

  .item1 {
    grid-area: sidebar-1;
  }

  .item2 {
    grid-area: content;
  }

  item3 {
    grid-area: content;
  }
}
```

## Redefine media query
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 500px 1fr;
  grid-template-rows: 150px 150px 100px;
  grid-template-areas:
    "sidebar-1 content sidebar-2"
    "sidebar-1 content sidebar-2"
    "footer footer footer";
  }

  .footer {
    grid-area: footer;
  }

  .item1 {
    grid-area: sidebar-1;
  }

  .item2 {
    grid-area: content;
  }

  item3 {
    grid-area: content;
  }
}
```

# area-line-names-START.html
* Make a grid without defining any rows or columns

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
  "⚽️ ⚽️ ⚽️ ⚽️ 🏀 🏀 🏀 🏀"
  "⚽️ ⚽️ ⚽️ ⚽️ 🏀 🏀 🏀 🏀"
  "⚽️ ⚽️ ⚽️ ⚽️ 🏀 🏀 🏀 🏀"
  "⚽️ ⚽️ ⚽️ ⚽️ 🏀 🏀 🏀 🏀"
}

.item3 {
  grid-column: 🏀-start / ⚽️-end;
  grid-row-end: 🏀-end;
}
```

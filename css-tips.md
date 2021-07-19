# CSS Tips
## Google fonts
* Make sure you include font weights if you use them
  - See I am using 400 700 and 900 so I can use: `h1 { font-weight: 700; }`

```
<link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet" />
```

## Stylelint
* stylelint - https://github.com/stylelint/vscode-stylelint
    - Use with css-boilerplate repo
    - https://github.com/kingluddite/my-css-boilerplate
    - Fix with command pallete and stylelint fix (will automatically fix all stylint rules (that are fixaxable - you will still have to manually fix other changes))

## Center web
```
// MORE CODE

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
// MORE CODE
```

## Questions for CSS Boilerplate
* https://github.com/kingluddite/my-css-boilerplate/blob/main/assets/css/styles.css

### CSS Reset
* Do we still need a reset?
  - If yes?
    + Is it normalize.css
    + Or is it Eric Meyers.css

### Border Box
* We should include Paul Irish box sizing

### CSS Variables
```
--main-font-family
--main-font-size: 1.6
--dark-color
--light-color
--gray-color
--padding

/* breakpoints */
  --phone-breakpoint: 480px;
  --tablet-breakpoint: 768px;
  --desktop-breakpoint: 1000px;
}
```

### How will we size fonts by default?
```
h1 {
    font-size: 2.8rem;
}
h2 {
    font-size: 2.6rem;
}
h3 {
    font-size: 2.4rem;
}
p {
    font-size: 1.2rem;  
    line-height: 2rem;
}
```

### What will max-width be of page?
```
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```



## Center a container
* Easiest way to center a container is

```
.container {
    margin: 0 auto;
}
```

## Paul Irish Box Sizing
* [docs](https://www.paulirish.com/2012/box-sizing-border-box-ftw/)

```
// MORE CODE

/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
// MORE CODE
```

## History of the box model
* [doc 1](https://en.wikipedia.org/wiki/CSS_box_model#Background)
* [doc 2](https://www.jefftk.com/p/the-revenge-of-the-ie-box-model)

### Prefixes are dead for box sizing
* [caniuse](https://caniuse.com/css3-boxsizing)

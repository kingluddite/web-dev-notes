# Flexbox Ordering
Move DOM elements without moving them in your DOM

```css
.container {
  display: flex;
}

.box {
  flex: 1;
}
```

`flex: 1`
* evenly distrbutes boxes across page

## Order

```css
.container {
  display: flex;
}

.box {
  flex: 1;
}

.box3 {
  order: 2;
}

.box7 {
  order: 8;
}
```

* default is 0
* for responsive design so you can order items any way you want
* you can also use negative numbers
* works like z-index, no units
* caveat - selecting will be in the natural order

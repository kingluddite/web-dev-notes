# Centering with Align Items

main axis row - left to right
main axis col - top to bottom

more concerned about cross axis

why doesn't this center my items!

```css
@import 'boxes';
.container {
  display: flex;
  border: 10px solid mistyrose;
  align-items: center;
}
```

the reason is you are missing height
so add this


```css
@import 'boxes';
.container {
  display: flex;
  border: 10px solid mistyrose;
  align-items: center;
  height: 100vh;
}
```

by default the align-items is set to `stretch`
all values:
* stretch
* center
* flex-start
* flex-end
* baseline

### baseline
no matter what the text size of each item, they will all be aligned

```css
@import 'boxes';
.container {
  display: flex;
  border: 10px solid mistyrose;
  height: 100vh;
  align-items: baseline;
}

.box1 {
  font-size: 30px;
}

.box3 {
  font-size: 150px;
}

.box4 {
  font-size: 200px;
}
```

![aligned text with baseline](https://i.imgur.com/11nXJrR.png)

if you switch to flex-direction: column
* will start on left
* align down the left

## Vertically center multiple rows of content or align them within your flex container

how do I deal with all the extra space?
how do I divvy it up?

## justify-content: space-between
* takes all open white (on main axis) space in container and divvies it up


## align-content: space-between - takes space on cross axist top to bottom
* default value `stretch`
    - others
        + flex-start
        + flex-end
        + space-between
        + space-around
        + center

```css
@import 'boxes';
.container {
  display: flex;
  border: 10px solid mistyrose;
  height: 100vh;
  flex-wrap: wrap;
  align-content: center;
}

.box {
  width: 33.333%
}
```

how to center 10?
`justify-content: center; // add to .container`

* now it's centered horizontally and vertically

## Override align-items property on individual flex items for custom alignment
align items from top to bottom

```css
@import 'boxes';
.container {
  display: flex;
  border: 10px solid mistyrose;
  height: 100vh;
  align-items: stretch;
}

.box {
  width: 33.333%
}
```

```css
@import 'boxes';
.container {
  display: flex;
  border: 10px solid mistyrose;
  height: 100vh;
  align-items: flex-start;
}

.box {
  width: 33.333%
}

.box2 {
  padding-bottom: 200px;
}

.box6 {
  padding-bottom: 0;
  align-self: flex-end;
}
```

* align-self
    - center
    - flex-start
    - flex-end
    - baseline
    - stretch

# Flexbox vs css grid
* Grid can do everything that Flexbox can do
* Conn of CSS grid
    - You can't css transition anything whereas you can with flexbox
* Pro of CSS rid
    - Much more consistent across all the browsers

# Axis flipping
* Flipping from column to row and vice-versa

`axis-flipping-START.html`

```js
function flip(e) {
  const flipper = document.querySelector('.flipper');
  flipper.classList.toggle('flip');
}
```

* We have a button that when clicked toggles a class

```css
.flipper {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}

.flipper.flip {
  grid-template-columns: 1fr;
}
```

* You can not do row reverse or column reverse in CSS Grid but you can in Flexbox

## controls-on-right
```css
.track {
  background: white;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  grid-template-columns: 1fr;
  display: grid;
  grid-auto-flow: column;
}
```

## flex-on-item-START
* Prefer flexbox on this

### Done with flexbox
```css
.controls {
  margin: 200px 0;
  display: flex;
  align-items: center;
}

.scrubber {
  background: #BADA55;
  height: 10px;
  min-width: 100px;
  border-radius: 10px;
  flex: 1;
}
```

### Done with css grid
```
.controls {
  margin: 200px 0;
  /* display: flex; */
  display: grid;
  grid-template-columns: auto auto auto 1fr auto auto;
  align-items: center;
}

.scrubber {
  background: #BADA55;
  height: 10px;
  min-width: 100px;
  border-radius: 10px;
  /* flex: 1; */
}
```

* Not very flexible because if you delete a button it messes layout up
* flexbox offers a nice value by being able to apply the flex directly to the element

## Perfectly centered
### In flexbox
```css
.hero {
  height: 200px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
```

### In CSS Grid
```css
.hero {
  height: 200px;
  background: rgba(255, 255, 255, 0.2);
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  display: grid;
  justify-items: center;
  align-content: center;
}
```

## Self Control
* Align something in all 4 corners
* Only possible in CSS Grid

```css
.corners {
  display: grid;
  height: 200px;
  width: 200px;
  border: 10px solid var(--yellow);
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}


.corner:nth-child(1),
.corner:nth-child(2) {}

.corner:nth-child(1),
.corner:nth-child(3) {}
```

* Use shorthand

```css
.corners {
  display: grid;
  height: 200px;
  width: 200px;
  border: 10px solid var(--yellow);
  /* grid-template-columns: 1fr 1fr; */
  /* grid-template-rows: 1fr 1fr; */
  grid-template: 1fr 1fr / 1fr 1fr;
}


.corner:nth-child(1),
.corner:nth-child(2) {}

.corner:nth-child(1),
.corner:nth-child(3) {}
```

### All 4 corners
```css
.corners {
  display: grid;
  height: 200px;
  width: 200px;
  border: 10px solid var(--yellow);
  /* grid-template-columns: 1fr 1fr; */
  /* grid-template-rows: 1fr 1fr; */
  grid-template: 1fr 1fr / 1fr 1fr;
  align-items: end;
  justify-items: end;
}


.corner:nth-child(1),
.corner:nth-child(2) {
  align-self: start;
}

.corner:nth-child(1),
.corner:nth-child(3) {
  justify-self: start;
}
```

## Stacked Layout
* Only possible in flexbox
* A con of CSS grid is your columns are rigid meaning you can't have columns that are different sizes

```css
.stacked {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.stacked>* {
  width: 30%;
  margin-bottom: 20px;
}
```

* Con of flexbox
```css
.stacked {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}

.stacked>* {
  width: 30%;
  margin-bottom: 20px;
}
```

* There is no concept of gap (may be coming soon?)

## If you do know how many columns you have but don't know how much space each will be taking up this is a good use case for that:

```css
.known {
  margin: 100px 0;
  display: grid;
  grid-template-columns: repeat(5, auto);
  justify-content: center;
  grid-gap: 20px;
}
```

## Unknown number of items start
* You want them to take up as much room as you want but you don't know how many items there will be

```css
.unknown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 20px;
}
```

## Variable widths each row
* Flexbox is better use case for this

```
.flex-container {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
}

.flex-container>* {
  margin: 10px;
  flex: 1;
}
```




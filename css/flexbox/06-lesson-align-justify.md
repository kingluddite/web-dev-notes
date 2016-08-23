# Flexbox Alignment

[guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
Centering with Justify Content

How are items aligned on the main axis
the main axis by default is left to right
and cross axis is top to bottom
* width vs natural with of elements
* space-between and space-around
    - space-around also takes into consideration the left and right spacing

```css
.container {
  display: flex;
  /*justify-content: flex-start;*/
  /*justify-content: flex-end;*/
  /*justify-content: center;*/
  /*justify-content: space-between;*/
  justify-content: space-around;
  border: 10px solid mistyrose;
}
```

## Direction Column

```css
.container {
  display: flex;
  /*justify-content: flex-start;*/
  /*justify-content: flex-end;*/
  /*justify-content: center;*/
  /*justify-content: space-between;*/
  justify-content: space-around;
  border: 10px solid mistyrose;
  flex-direction: column;
  min-height: 100vh;
}
```

we don't see spacing but if we change font size and make is smaller

```css
.box {
  color: white;
  font-size: 10px;
  text-align: center;
  text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}
```

now we get spacing
justify-content: center - space column vertically centered
flex-start and flex-end top and bottom respectively
justify-content: space-between and space-around

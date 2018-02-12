# Grid Alignment & Centering
* Flexbox made alignment and centering easy
* CSS-grid makes it easy too

## 6 properties to help align in css grid
* justify-items
* align-items

* justify-content
* align-content

* align-self
* justify-self

### tips
* justify ones are on the X axis (row axis)
* align items are along the Y axis (column axis)
* **note** unlike flexbox the axis do not switch
* [cheat sheet](https://css-tricks.com/snippets/css/complete-guide-grid/)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>CSS Grid Alignment + Centering!</title>
</head>

<body>
  <div class="container">
    <div class="itm itm1">1</div>
    <div class="itm itm2">2</div>
    <div class="itm itm3">3</div>
    <div class="itm itm4">4</div>
    <div class="itm itm5">5</div>
    <div class="itm itm6">6</div>
    <div class="itm itm7">7</div>
    <div class="itm itm8">8</div>
    <div class="itm itm9">9</div>
    <div class="itm itm10">10</div>
    <div class="itm itm11">11</div>
    <div class="itm itm12">12</div>
    <div class="itm itm13">13</div>
    <div class="itm itm14">14</div>
    <div class="itm itm15">15</div>
    <div class="itm itm16">16</div>
    <div class="itm itm17">17</div>
    <div class="itm itm18">18</div>
    <div class="itm itm19">19</div>
    <div class="itm itm20">20</div>
    <div class="itm itm21">21</div>
    <div class="itm itm22">22</div>
    <div class="itm itm23">23</div>
    <div class="itm itm24">24</div>
    <div class="itm itm25">25</div>
    <div class="itm itm26">26</div>
    <div class="itm itm27">27</div>
    <div class="itm itm28">28</div>
    <div class="itm itm29">29</div>
    <div class="itm itm30">30</div>
    <div class="itm itm31">31</div>
    <div class="itm itm32">32</div>
    <div class="itm itm33">33</div>
    <div class="itm itm34">34</div>
    <div class="itm itm35">35</div>
    <div class="itm itm36">36</div>
    <div class="itm itm37">37</div>
    <div class="itm itm38">38</div>
    <div class="itm itm39">39</div>
    <div class="itm itm40">40</div>
  </div>

  <style>
    /*
      justify-items:
      align-items:

      justify-content:
      align-content:

      align-self:
      justify-self:

      justify-* is row axis
      align-* is column axis
    */

    .container {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: repeat(10, 1fr);
    }
  </style>
</body>

</html>
```

* Changed class names to `itm` from `item` to avoid conflicts in existing css and isolate CSS to experiment

## stretch
```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
  justify-items: stretch;
}
```

## center
```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
  justify-items: center;
}
```

* item will only be as large as it needs to be

```html
<div class="itm itm33">33</div>
<div class="itm itm34">This is a lot longer conent in this cell</div>
<div class="itm itm35">35</div>
```

![content fill](https://i.imgur.com/s56fI7o.png)

`justify-items: start;`

`justify-items: end`

## now align items
* along the y axis

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(5, 100px);
  justify-items: end;
  align-items: start;
}
```

* need to give rows a height to see this in action
* Can use align-items: start, end or center and `stretch` and it will align the content accordingly

## Perfectly center stuff
```
justify-items: center;
align-items: center;
```

### shorcut for above
* less typing

`place-items: center center`

* Be careful with place-items and ensure that your auto-prefixer will convert it into justify and align properties

## jusfify content
```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  /* justify-items: center; */
  /* align-items: center; */
  place-items: center center;
}
```

* What do we do with the extra white space on right?
    - That is what justify content and align content answer

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  /* justify-items: center; */
  /* align-items: center; */
  place-items: center center;
    justify-content: space-around;
}
```

* Space-between does same but 86s the left and right (almost always what you want when you want to perfectly align your values)

```css
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--yellow);
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  /* justify-items: center; */
  /* align-items: center; */
  place-items: stretch stretch;
    justify-content: space-between;
}
```

## align-self and justify-self
* allows us to overwrite on a case-by-case business

```
.container {
  display: grid;
  grid-gap: 20px;
  height: 500px;
  border: 10px solid var(--yellow);
  grid-template-columns: repeat(5, 100px);
  /* justify-items: center; */
  /* align-items: center; */
  place-items: stretch stretch;
    justify-content: space-between;
  align-content: end;
}

.itm {
  background: white;
}

.itm5 {
  justify-self: center;
}
```

* So we overwrote grid in that one column





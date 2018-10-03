# Sizing Grid Items
* Use emmet to create a grid
    - 30 items, class of `item` numbers increase by 1 for each item class

`.item.item${$}*30`

* Will give you this output

```
<div class="item item1">1</div>
<div class="item item2">2</div>
<div class="item item3">3</div>
<div class="item item4">4</div>
<div class="item item5">5</div>
<div class="item item6">6</div>
<div class="item item7">7</div>
<div class="item item8">8</div>
<div class="item item9">9</div>
<div class="item item10">10</div>
<div class="item item11">11</div>
<div class="item item12">12</div>
<div class="item item13">13</div>
<div class="item item14">14</div>
<div class="item item15">15</div>
<div class="item item16">16</div>
<div class="item item17">17</div>
<div class="item item18">18</div>
<div class="item item19">19</div>
<div class="item item20">20</div>
<div class="item item21">21</div>
<div class="item item22">22</div>
<div class="item item23">23</div>
<div class="item item24">24</div>
<div class="item item25">25</div>
<div class="item item26">26</div>
<div class="item item27">27</div>
<div class="item item28">28</div>
<div class="item item29">29</div>
<div class="item item30">30</div>
```

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}

.item3 {
  color: red;
  width: 300px;
}
```

* That will change width for all items in that column
* Conversely if I remove the width from that item and make the content in that cell longer, the cell with will expand but so will the entire column it is in

## But I want just that cell to be a different with
* Use `span` (it is called spanning)

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}

.item3 {
  color: red;
  grid-column: span 3;
}
```

![spanning](https://i.imgur.com/g0XGBmA.png)

* If you span longer then there is available cells it will go down to the next line and leave empty implicit cells in its wake

![too much span](https://i.imgur.com/aw1lfIA.png)

* Also span rows

```
.item3 {
  color: red;
  grid-column: span 3;
  grid-row: span 3;
}
```

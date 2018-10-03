# auto-fit and auto-fill
```
.container {
  display: grid;
  grid-gap: 20px;
  border: 10px solid var(--green);
  grid-template-columns: repeat(auto-fill, 150px);
}
```

## What does auto-fill do?
* See how much content is in each one
* Then figure out how many you could possibly fit in that
* Resize your browser and it will adjust to fit

## What does auto-fit do?
* auto-fit is best able to be seen if you only have 4 items. You will see the cells continue after the 4th item
* But with auto-fit, the grid stops after the 4th item

### How is auto-fill useful?
* You can have 3 items and then push the 4th item all the way to the right
* Make sure the container has `grid-template-columns` set to repeat(auto-fill, 100px) and then iter4 set to `grid-column-end: -1`

![item on end](https://i.imgur.com/97DKRBc.png)

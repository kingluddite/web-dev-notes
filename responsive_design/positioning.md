#Positioning

## Parent container relative value
```
.main-header {
    position: relative;
}
```

A child element with `bottom: 20px` will move up from the bottom (of the parent element) 20px

* can move it also with left or right too
* 

```
.main-logo {
    width: 150px;
    top: 20px;
    left: 20px;
  }
  .main-nav {
    bottom: 32px;
    left: 200px;
  }
```

**BAD from above**
* gives us horizontal scrollbar
* large white space on right
**Fix**
```
.main-header {
    padding: 15px;
    min-height: 100px;
    overflow: hidden;
  }
```
* gets rid of white gap and scrollbar

## Absolute Position
if no element has relative, the browser will suffice

```
.main-header {
    position: relative;
  }
  .main-logo,
  .main-nav {
    position: absolute;
  }
```

### Can use negative position values

### Collapse Bug with Positioning
No Clearfix solution
So?
Make sure there is always a height for the containing element

## Make columns with positioning
* normally we would not use positioning to lay out comments

```
.content-row {
    position: relative;
  }
  .col {
    width: 30%;
    position: absolute;
  }
  .primary-content {
    width: 40%;
    left: 30%;
  }
  .secondary-content {
    right: 0;
  }
```
**Problem**
Need to give containing element `height` of 100% otherwise the content-row will collapse

## Fixed Positioning
common is a fixed header
```
.main-header {
    position: fixed;
    width: 100%;
    top: 0;
  }
```

* when you scroll up the z-index is messed up (common problem)
**Fix** - give main-header a z-index of 999
```
.main-header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
  }
```
**note:** elements positioned absolutely have a higher z-index then elements positioned fixed

what if we wanted our header fixed to the bottom of our page?
```
.main-header {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 999;
  }
```

## Absolute Centering of icon
```
.icon {
  background-color: #39add1;
  margin-top: 34px;
  height: 180px;
  border-radius: 5px;
  position: relative;
}
.icon::after {
  content: "";
  display: block;
  width: 150px;
  height: 90px;
  background: url('../img/icon.png') no-repeat;
  background-size: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```
* Must include `margin: auto`
* must zero-out TRBL box model of positioning properties


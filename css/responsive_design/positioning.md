# Positioning

## Parent container relative value
```
.main-header {
    position: relative;
}
```

A child element with `bottom: 20px` will move up from the bottom (_of the parent element_) 20px

* You can also move it with `left` or `right` 

```css
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

## BAD IDEA
* Gives us horizontal scrollbar
* Large white space on right

## GOOD IDEA
* Gets rid of white gap and scrollbar

```css
.main-header {
    padding: 15px;
    min-height: 100px;
    overflow: hidden;
  }
```


## Absolute Position
If no element has relative position, the browser will suffice

```css
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

#### So what. Who cares?
Make sure there is always a height for the containing element

## Make columns with positioning
Normally we would not use positioning to lay out columns

```css
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

## BAD IDEA
Need to give containing element `height` of 100% otherwise the content-row will collapse

## Fixed Positioning
Common is a fixed header

```css
.main-header {
    position: fixed;
    width: 100%;
    top: 0;
  }
```

* When you scroll up the `z-index` is messed up (_common problem_)

## GOOD IDEA
Give main-header a `z-index` of 999

```css
.main-header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
  }
```

**note:** Elements positioned absolutely have a higher `z-index` then elements positioned fixed

## What if we wanted our header fixed to the bottom of our page?

```css
.main-header {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 999;
  }
```

## Absolute Centering of icon

```css
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
* Must zero-out TRBL box model of positioning properties


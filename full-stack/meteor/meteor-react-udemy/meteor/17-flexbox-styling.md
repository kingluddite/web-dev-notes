# Flexbox Styling

![mockup](https://i.imgur.com/jqLzamV.png)

Left is where we are and the right image is where we want to be

* We want each EmployeeDetail to be the same with
* We want them to tile to
* We could use Bootstrap classes
    - But Flexbox might prove more useful

## What is Flexbox
* A new CSS construct
* Allows us to do responsive layouts in the browser much more easy

## How do we use Flexbox
* We will turn a single element into a Flexbox container
    - This means it will more intelligently place elements inside of it
    - We need to add CSS when working with Flexbox
        + Where do we put our CSS file?

Create `client/style/style.css`

`style.css`

* We will use `.employee-list` because it contains all of our other employee details and this is the element we will turn into a Flexbox element
    - We are choosing this because it contains our list of items and we can style it nicely and wrap the list nicely inside of our browser window

```css
.employee-list {
  display: flex;
}
```

* Above is what turns our `.employee-list` into a flexbox container

View it in the browser and see what Flexbox did to our layout.
We don't need to refresh or include the style.css as Meteor takes care of that for us

By default Flexbox takes all containing elements and puts them all on a single line

## Next Improvement
Stop our images from being one long infinite row

```css
.employee-list {
  display: flex;
  flex-wrap: wrap;
}
```

Now they wrap.

## Next Improvement
Make the space inbetween cards more consistent

```css
.employee-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
```

## Next Improvement
Make each card the same width

```css
.employee-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.thumbnail {
  width: 300px;
}
```

Now every card is of equal width

**note** Flexbox translates to mobile displays very easily

If we make our browser smaller, you will see the cards wrap very nicely






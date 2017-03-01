# Responsive Web Design
Responsive Web Design is an approach to designing web content that responds to the constraints of different devices. The page structure and CSS rules should be flexible to accommodate these differences.

## mobile-first approach

# Create a Media Query
Add a media query, so that the p tag has a font-size of 10px when the device's height is less than or equal to 800px.

```css
  @media (max-height: 800px) {
    p {
      font-size: 10px;
    }
  }
```

## Make an Image Responsive
Making images responsive with CSS is actually very simple. Instead of applying an absolute width to an element:

`img { width: 720px; }`

You can use:

```css
img {
  max-width: 100%;
  display: block;
  height: auto;
}
```

The `max-width` property of 100% scales the image to fit the width of its container, but the image won't stretch wider than its original width. Setting the display property to block changes the image from an inline element (its default), to a block element on its own line. The height property of auto keeps the original aspect ratio of the image.

## Use a Retina Image for Higher Resolution Displays
The simplest way to make your images appear "retina" (and optimize them for retina displays) is to define their width and height values as only half of what the original file is.

## Make Typography Responsive
Instead of using em or px to size text, you can use viewport units for responsive typography. Viewport units, like percentages, are relative units, but they are based off different items. Viewport units are relative to the viewport dimensions (width or height) of a device, and percentages are relative to the size of the parent container element.

The four different viewport units are:

* `vw`: 10vw would be 10% of the viewport's width
* `vh`: 3vh would be 3% of the viewport's height
* `vmin`: 70vmin would be 70% of the viewport's smaller dimension (height vs. width)
* `vmax`: 100vmax would be 100% of the viewport's bigger dimension (height vs. width).

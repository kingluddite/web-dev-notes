# Tips for Testing Responsive Images
## Dragging browser shows different images
* But lots of times you are guessing
* To eliminate guesswork and know which image you are looking at at which breakpoint
    - Create a counterpart for every image in your folder that ends in -i
        + chose `i` to stand for **information**
        + The `-i` version of the image has a transparent black overlay and over the text we see the dimensions of the image
        + So any time you need to see an image change the filename to -i

![example of -i](https://i.imgur.com/ro0xF41.png)

## Simulating and testing different pixel densities
* As a developer we need to be able to test all of our images but if we don't have a high dpi monitor we will never be able to test for those images
* Do we just have to hope they work?
* How do you test high dpi images in a non-high-dpi monitor?
    - Also if you have high dpi monitor and you want to test the non-high-dpi images

### Chrome browser to the rescue
* View - Inspect
* Click Toggle Device Toolbar
* Click Responsive
* Make sure you add `-i` to your images
* Click the vertical 3 dots in Chrome ([screenshot](https://i.imgur.com/E17ert8.png))

* When you are done testing, remove the `-i` on all images

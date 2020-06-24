# Review: Basic Principles of Responsive Design and Layout Types
1. Fluid Grids and Layouts
    * To allow content to easily adapt to the current viewport width used to browse the website
    * Uses `%` rather than `px` for all layout-related lengths
        - (and especially widths)
2. Flexible/Responsive Images
    * Images behave differently than text content, and so we need to ensure that they also adapt nicely to the current viewport
    * Images do not scale automatically as you change the viewport
    * Usually we make images flexible by defining their dimensions in `%` (rather than fixed units like `px`)
    * Images usually make up the biggest part of our webpage size (in terms of megabytes)
        - We should optimize images for different widths
3. Media Queries
    * To change styles on certain viewport widths (breakpoints), allowing us to create different versions of our website for different widths
    * We can create different versions of our website on different devices

## Different Layouts
* Float Layouts
* Flexbox
* CSS Grid

### Float Layouts
* For a long time we just created float layouts where boxes would float next to each other
    - The alternatives are still not supported by all browsers
    - Most people still have to use float layouts

### Flexbox
* Offers a great way to layout elements in a one-dimensional row

### CSS Grid
* Perfect for creating the overall layout of a page in a fully-fledged two-dimensional grid

### As of 2020 are cssgrids and flexbox production ready?
* Yes
    - You can check their browser support today on `caniuse.com` - according to the data, they are production-ready as of today, and you only need to provide a fallback for old browsers if you suspect your users might use them, but that fallback can come in the form of graceful degradation rather than the main course 

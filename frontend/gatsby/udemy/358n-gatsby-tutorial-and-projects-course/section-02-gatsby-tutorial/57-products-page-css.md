# Products page CSS
`products.module.css`

```
.page {
  width: 90vw;
  max-width: 1170px;
  margin: 0 auto;
  text-transform: capitalize;
}

.page span {
  margin-left: 2rem;
  color: grey;
}

.page article {
  margin: 2rem 0;
}

@media screen and (min-width: 768px) {
  .page {
    display: grid;

    /* two column layout starting from 768px */
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
}

@media screen and (min-width: 992px) {
  .page {
    /* display: grid; WE DON'T NEED THIS BECAUSE WE ALREADY HAVE IT ON SMALL SCREEN */

    /* three  column layout starting from 992px */
    grid-template-columns: 1fr 1fr 1fr;

    /* column-gap: 2rem; WE DON'T NEED THIS BECAUSE WE ALREADY HAVE IT ON SMALL SCREEN */
  }
}
```

* Now we have 1 column for small 2 columns for medium 3 columns for large

## Houston we have a problem! - Image heights are different on medium and large
* We could just target the images
    - But in gatsby the images are wrapped with `gatsby-image-wrapper` and the actual image will be within
        + Then the images are using:
            * position: absolute
            * object-fit: cover
            * object-position: center center
        + So technically everything is set up where we could change the heights and then the images won't be distorted
        + **NOTE** But we need to control the `gatsby-image-wrapper` not the image
            + You are not going to be setting the image is already set to position of absolute

### How do we target the `gatsby-image-wrapper`?
* We need to target the `div` where that `gatsby-image-wrapper` class resides 

`products.module.css`

* notes
    - Images are same height
    - Images are not distorted!
        + This is because they are using the `object-fit` and set to **cover**
    - But to make this possible we MUST target the parent `div` with the class of `gatsby-image-wrapper`

```
// MORE CODE

.page div {
  height: 15rem;
}

@media screen and (min-width: 768px) {

// MORE CODE
```

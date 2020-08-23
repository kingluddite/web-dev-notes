# maxwidth-parameter
* One of the many fields that fluid field has
    - Common misconception is that this parameter is responsible for the max-width of the image (IT IS NOT)
    - Only the parent container controls the width of the fluid image
    - `maxWidth` is set up by default to be `100`
        + It controls what kind of images are generated when we are setting up responsive image using `gatsby-image`
            * The images that fluid generates are:
                + 400w
                + 800w
                + 1200w
                + 1600w
                + (then the original size of the image)
            * Why are these sizes generated?
                - Because the `max-width` currently is 800 (which is the default)
            * So if you change maxWidth it just changes what images are created for fluid

```
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import img from '../images/large-image.jpg';

const getImages = graphql`
  {
    fixed: file(relativePath: { eq: "dog-one.jpg" }) {
      childImageSharp {
        fixed(width: 200, grayscale: true) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    fluid: file(relativePath: { eq: "large-image.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    example: file(relativePath: { eq: "large-image.jpg" }) {
      childImageSharp {
        # default 800
        fluid(maxWidth: 100) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`;

const Images = () => {
  const data = useStaticQuery(getImages);
  console.log(data);
  return (
    <section className="images">
      <article className="single-image">
        <h3>basic image</h3>
        <img src={img} alt="text" width="100%" />
        <h2>Content</h2>
      </article>
      <article className="single-image">
        <h3>fixed image/blure</h3>
        <Image fixed={data.fixed.childImageSharp.fixed} />
        <h2>Content</h2>
      </article>
      <article className="single-image">
        <h3>fluid image/svg</h3>
        <Image fluid={data.fluid.childImageSharp.fluid} />
        <h2>Content</h2>
        <div className="small">
          <Image fluid={data.fluid.childImageSharp.fluid} />
          <h2>Content</h2>
        </div>
        <Image fluid={data.example.childImageSharp.fluid} />
      </article>
    </section>
  );
};

export default Images;
```

* You will see the max-width is `100` for the image we just added
    - **note** The size of the image did not change
    - But the quality of the image did change (because I generated smalled images) - so now we are stretching the image out
* **note** The sizes that were generated

```
// MORE CODE

<source type="image/webp" srcset="/static/96a5b843cac0d1330bb4c91b888dbdd3/0050b/large-image.webp 25w,
/static/96a5b843cac0d1330bb4c91b888dbdd3/f6b6d/large-image.webp 50w,
/static/96a5b843cac0d1330bb4c91b888dbdd3/d1f52/large-image.webp 100w,
/static/96a5b843cac0d1330bb4c91b888dbdd3/e7487/large-image.webp 150w,
/static/96a5b843cac0d1330bb4c91b888dbdd3/61e93/large-image.webp 200w,
/static/96a5b843cac0d1330bb4c91b888dbdd3/19d53/large-image.webp 1904w" sizes="(max-width: 100px) 100vw, 100px">

// MORE CODE
```

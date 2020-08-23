# gatsby-image optimization
* We now know how to render images using `gatsby-image`

## Question
* Why would I go through all that hassle if I could just import and render using standard `img` HTML tags

### Problems
* Use the “blur-up” technique or a ”traced placeholder” SVG to show a preview of the image while it loads
* Resize large images to the size needed by your design
    - View gatsby site `http://localhost:8000/images`
    - Open console
    - Network tab
    - Click on `Img` tab
    - File refresh
    - large image just imported into our file is 4.2MB
    - But the one being transformed using `gatsby-image` is 270B

## Test
* Change Network > Online to > Slow 3G and see for yourself, large image is so slow loading but the webp is super fast

* Generate multiple smaller images so smartphones and tablets don’t download desktop-sized images
    - Inspect element to see for fixed images gatsby generates multiple images with different densities (basically resolutions) using the `picture` element
    * For fluid images, even more cool, it we also have different sizes
        - Also using `picture` element but with different sizes
        - This makes sure we never force a giant image to a smaller screen
            + We provide multiple options to the browser and the browser can pick whichever image size makes the most sense
+ Efficiently lazy load images to speed initial page load and save bandwidth
    * [https://www.johnsmilga.com/](https://www.johnsmilga.com/)
        - Make small
        - 3 vertical dots
        - Click the undock into separate window button
        - Refresh
        - Scroll and watch as images are downloaded only when we scroll to them
        - Put dock back (bottom)
+ Hold the image position so your page doesn’t jump while images load
    * Change to add content like this:

`Images.js`

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
      </article>
    </section>
  );
};

export default Images;
```

* The top image "jumps" but the others keep their size

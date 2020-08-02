# Render gatsby-image
`Images.js`

```
import React from 'react';
// import { graphql } from 'gatsby';
// import Image from 'gatsby-image';
import img from '../images/large-image.jpg';

// const getImages = graphql`
//   {
//     fixed: file(relativePath: { eq: "dog-one.jpg" }) {
//       childImageSharp {
//         fixed(width: 300, height: 400) {
//           src
//         }
//       }
//     }
//     fluid: file(relativePath: { eq: "large-image.jpg" }) {
//       childImageSharp {
//         fluid {
//           src
//         }
//       }
//     }
//   }
// `;

const Images = () => {
  return (
    <section className="images">
      <article className="single-image">
        <h3>basic image</h3>
        <img src={img} alt="text" />
      </article>
      <article className="single-image">
        <h3>fixed image/blure</h3>
      </article>
      <article className="single-image">
        <h3>fluid image/svg</h3>
      </article>
    </section>
  );
};

export default Images;

```

* large image doesn't fit in container
* Add `<img src={img} alt="text" width="100%" />` and it fits
    - This is a basic react app image import

## Troubleshooting
* If you get a strange error where you know the code should be working - first try a page refresh

```
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
// import Image from 'gatsby-image';
import img from '../images/large-image.jpg';

const getImages = graphql`
  {
    fixed: file(relativePath: { eq: "dog-one.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 400) {
          src
        }
      }
    }
    fluid: file(relativePath: { eq: "large-image.jpg" }) {
      childImageSharp {
        fluid {
          src
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
      </article>
      <article className="single-image">
        <h3>fixed image/blure</h3>
      </article>
      <article className="single-image">
        <h3>fluid image/svg</h3>
      </article>
    </section>
  );
};

export default Images;
```

* The console log will show both fixed and fluid image

## Houston we have a problem
```
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import img from '../images/large-image.jpg';

const getImages = graphql`
  {
    fixed: file(relativePath: { eq: "dog-one.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 400) {
          src
        }
      }
    }
    fluid: file(relativePath: { eq: "large-image.jpg" }) {
      childImageSharp {
        fluid {
          src
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
      </article>
      <article className="single-image">
        <h3>fixed image/blure</h3>
        <Image fixed={data.fixed.childImageSharp.fixed} />
      </article>
      <article className="single-image">
        <h3>fluid image/svg</h3>
      </article>
    </section>
  );
};

export default Images;

```

* But we get an error and this is because we didn't pass in our Fragment
* Replace `src` with `...`

```
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import img from '../images/large-image.jpg';

const getImages = graphql`
  {
    fixed: file(relativePath: { eq: "dog-one.jpg" }) {
      childImageSharp {
        fixed(width: 300, height: 400) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    fluid: file(relativePath: { eq: "large-image.jpg" }) {
      childImageSharp {
        fluid {
          src
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
      </article>
      <article className="single-image">
        <h3>fixed image/blure</h3>
        <Image fixed={data.fixed.childImageSharp.fixed} />
      </article>
      <article className="single-image">
        <h3>fluid image/svg</h3>
      </article>
    </section>
  );
};

export default Images;
```

* Now the error is gone
* **note** If you don't supply width it will default to 400

## grayscale option
```
// MORE CODE

const getImages = graphql`
  {
    fixed: file(relativePath: { eq: "dog-one.jpg" }) {
      childImageSharp {
        fixed(width: 200, grayscale: true) {
          ...GatsbyImageSharpFixed
        }
      }
    }
// MORE CODE
```

* And it is small and gray!

## GatsbyImageSharpFluidLimitPresentationSize Fragment
## Warning
* You may have problems with this fragment if so use these instead:
    - `GatsbyImageSharpFluid` - blur effect
    - `GatsbyImageSharpFluid_tracedSVG` - svg effect 

#
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
      </article>
      <article className="single-image">
        <h3>fixed image/blure</h3>
        <Image fixed={data.fixed.childImageSharp.fixed} />
      </article>
      <article className="single-image">
        <h3>fluid image/svg</h3>
        <Image fluid={data.fluid.childImageSharp.fluid} />
      </article>
    </section>
  );
};

export default Images;

```

* Now all 3 images are working

## Effects
* Refesh (hard to see because we are on localhost but we can slow down)

### Slow down
* Network > Online > Fast 3G

* then you will what is happening as we do it in "slow motion"
* "blur" effect for small middle image
* svg effect for last image

## VERY IMPORTANT RULE! - Fluid Image rule
* When it comes to a fluid image only the parent container is responsible for the width of the image

```
<article className="single-image">
        <h3>fluid image/svg</h3>
        <Image fluid={data.fluid.childImageSharp.fluid} />
        <div className="small">
          <Image fluid={data.fluid.childImageSharp.fluid} />
        </div>
      </article>
```

* and the css

`layout.css`

```
// MORE CODE

.small {
  width: 100px;
}
```

![large and small width depending on parent](https://i.imgur.com/pc0ux5D.png)

* This is why the responsive image will always fit into our column (because the parent container is the column and depending on the width of the column it will be the width of the image)

# gatsby-image overview
* very extensive docs

## Demo
* [demo](https://using-gatsby-image.gatsbyjs.org/)
    - Loads the optimal size of image for each device size and screen resolution
    - Holds the image position while loading so your page doesn’t jump around as images load
    - Uses the “blur-up” effect i.e. it loads a tiny version of the image to show while the full image is loading
    - Alternatively provides a “traced placeholder” SVG of the image.
    - Lazy loads images which reduces bandwidth and speeds the initial load time
    - Uses WebP images if browser supports the format
* Large unoptimized images will slow down your website
* You could do all the optimizations yourself but why not let gatsby do it for you and save you time

## How gatsby image works
`import Img from 'gatsby-image'`

* Then we take that Img component and pass it two props
    - fixed prop
    - fluid prop
        + pass this if you want the image to be responsive

`<Img fixed={data.file.childImageSharp.fixed}` />

* Pass in the prop value as data from our GraphQL query

```
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => (
  <div>
    <h1>Hello gatsby-image</h1>
    <Img fixed={data.file.childImageSharp.fixed} />
  </div>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "blog/avatars/kyle-mathews.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
```

* They use `file(relativePath: { eq: "path to image file here"})`
    - And since we installed our plugins we have access to `childImageSharp` field
        + **note** We only have access to those fields if we install those plugins
            * Inside the field we have another option
                - fixed
                    + options (even if you omit these you'll still get your image)
                        * width
                        * height
                            - `...GatsbyImageSharpFixed` (this is called a Fragment)
                                + for fluid and fixed they'll need more than one field, since this would eventually become annoying to list them all (five or six fields)
                                + The gatsbyteam provides this to make life easier
                - fluid
            * **note** You can not mix and match fluid and fix (one or the other only!)

# gatsby-transformer-sharp fragments
* GatsbyImageSharpFixed
* GatsbyImageSharpFixed_noBase64
* GatsbyImageSharpFixed_tracedSVG
* GatsbyImageSharpFixed_withWebp
* GatsbyImageSharpFixed_withWebp_noBase64
* GatsbyImageSharpFixed_withWebp_tracedSVG
* GatsbyImageSharpFluid
* GatsbyImageSharpFluid_noBase64
* GatsbyImageSharpFluid_tracedSVG
* GatsbyImageSharpFluid_withWebp
* GatsbyImageSharpFluid_withWebp_noBase64
* GatsbyImageSharpFluid_withWebp_tracedSVG
* GatsbyImageSharpFluidLimitPresentationSize

* **note** above is fixed and fluid and we can not mix and match
* **note** contentful has its own fragments

## Sandbox
* We can't test fragments in the sandbox
    - To get around this we'll pass "dummy" values
    - But in our actual app we'll use the fragments

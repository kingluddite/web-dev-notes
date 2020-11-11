## Everything to do with the Banner
* We have an `index.js` file in side the `Banner` directory so that we can easily point to one path and grab all the other components

`components/Banner/index.js`

```
import React from 'react'
import styled from 'styled-components'
import About from './About'
import Instagram from './Instagram'
import Recent from './Recent'
import BannerCategories from './BannerCategories'
const Banner = () => {
  return <Wrapper>Banner Component</Wrapper>
}

// MORE CODE
```

## Show all the sections
`Banner/index.js`

```
// MORE CODE

const Banner = () => {
  return (
    <Wrapper>
      <About />
      <Instagram />
      <Recent />
      <BannerCategories />
    </Wrapper>
  )
}

// MORE CODE
```

* And you'll see placeholders for each

## The Title component
`Banner/Title.js`

```
// MORE CODE

const Title = ({ title }) => {
  return (
    <Wrapper>
      <h4>{title}</h4>
      <div className="line"></div>
    </Wrapper>
  )
}

// MORE CODE
```

### Render our title prop
`Banner/About.js`

```
// MORE CODE

const About = () => {
  return (
    <Wrapper>
      <Title title="about me" />
    </Wrapper>
  )
}

// MORE CODE
```

* And that will render the title with a line through it

## Name your queries
* You have a history but if you don't name them it will be hard to reuse old ones

![bad naming of queries](https://i.imgur.com/aDiq4cd.png)

## Get the banner image
* Use GraphQL

```
query GetBannerImage {
  banner: file(relativePath:{eq: "banner-about.jpeg"}) {
    childImageSharp {
      fluid {
        src
      }
    }
  }
}
```

## Copy our export code
```
export const query = graphql`
  {
    banner: file(relativePath: {eq: "banner-about.jpeg"}) {
      childImageSharp {
        fluid {
          src
        }
      }
    }
  }
`
```

## Paste int our About component
* We put this query above our component

```
// MORE CODE

export const query = graphql`
  {
    banner: file(relativePath: { eq: "banner-about.jpeg" }) {
      childImageSharp {
        fluid {
          src
        }
      }
    }
  }
`

const About = () => {

// MORE CODE
```

## Remove the `export`
* Replace src with the fragment
* **NOTE** We want to use the `fixed` instead of `fluid` fragment

```
// MORE CODE

const query = graphql`
  {
    banner: file(relativePath: { eq: "banner-about.jpeg" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const About = () => {

// MORE CODE
```

## Let's make the dimensions of this image be 100x100
```
// MORE CODE

const query = graphql`
  {
    banner: file(relativePath: { eq: "banner-about.jpeg" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

// MORE CODE
```

## Now how do we access this query?
* We need to use `useStaticQuery`
* This is because we are not passing down this data as a prop but directly dropping it into a component
* Here's how we grab the query
* We'll use the `banner` alias to grab it (look at the GraphQL)
* But it may be better to alias it as `person` because it is a pic of a person

```
// MORE CODE

const query = graphql`
  {
    person: file(relativePath: { eq: "banner-about.jpeg" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const About = () => {
  const data = useStaticQuery(query)

  return (
    <Wrapper>
      <Title title="about me" />
      <Image fixed={data.person.childImageSharp.fixed} />
    </Wrapper>
  )
}

// MORE CODE
```

## And let's add styles to make our person image rounded
```
// MORE CODE

  return (
    <Wrapper>
      <Title title="about me" />
      <Image fixed={data.person.childImageSharp.fixed} className="img" />
    </Wrapper>
  )
}

// MORE CODE
```

## Add some filler latin text and social media icons
```
// MORE CODE

    <Wrapper>
      <Title title="about me" />
      <Image fixed={data.person.childImageSharp.fixed} className="img" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
        pariatur!
      </p>
      <SocialLinks styleClass="banner-icons" />
    </Wrapper>

// MORE CODE
```

![app banner so far](https://i.imgur.com/EurHPEr.png)

## How can we get Instagram images in our Gatsby site?
* Just add a plugin
* **tip** Search for `source instagram`
* [docs for instagram plugin](https://www.gatsbyjs.com/plugins/gatsby-source-instagram/?=source%20instagram)

## Install it
`$ npm install --save gatsby-source-instagram`

## Add it
`gatsby-config.js`

```
// MORE CODE

    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `gatsbyjs`,
      },
    },

// MORE CODE
```

## Set up our query in GraphQL
* You will see `allIntaNode` (after installing plugin)

```
// MORE CODE

query GetInstaGram {
  allInstaNode {
    nodes {
      localFile {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
    totalCount
  }
}

// MORE CODE
```

* the totalCount is 12 but we'll limit it to just 6

```
// MORE CODE

query GetInstaGram {
  allInstaNode(limit: 6) {
    nodes {
      localFile {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
    totalCount
  }
}

// MORE CODE
```

* We can remove totalCount from our query as we don't need it

## Add it to our Banner/Instagram
* We remove `export` since it is not page

#
```
// MORE CODE

const query = graphql`
  {
    instagram: allInstaNode(limit: 6) {
      nodes {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const Instagram = () => {
  const data = useStaticQuery(query)
  const {
    instagram: { nodes },
  } = data

  return (
    <Wrapper>
      <Title title="instagram" />
      <div className="images">
        {nodes.map((item, index) => {
          const {
            localFile: {
              childImageSharp: { fluid },
            },
          } = item
          return <Image fluid={fluid} key={index} />
        })}
      </div>
    </Wrapper>
  )
}

// MORE CODE
```

* And that will give us the 6 latest posts from instagram

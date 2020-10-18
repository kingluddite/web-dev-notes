# Hero Image query
* GraphQL
    - use `file`
        + relativePath eq "hero-img.png"
        + childImageSharp
            * fluid (we want to use the gatsby transformations)
                - src

```
query MyQuery {
  file(relativePath: {eq: "hero-img.png"}) {
    id
    childImageSharp {
      fluid {
        src
      }
    }
  }
}
```

* Play to see if you get the image info
* We use src because we can't use fragments for images in GraphQL

## Put the code in gatsby
* We use `StaticQuery` in GraphQL Code Explorer
    - But we just copy the GraphQL with code inside backticks

`Code Exporter`

```
// MORE CODE

graphql`
    {
      file(relativePath: {eq: "hero-img.png"}) {
        id
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `
// MORE CODE
```

`Hero.js`

```
import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import SocialLinks from "../constants/socialLinks"

const query = graphql`
  {
    file(relativePath: { eq: "hero-img.png" }) {
      id
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const Hero = () => {
  // const data = useStaticQuery(query)
  // console.log(data)
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(query)
  return (
    <header className="here">
      <div className="section-center hero-center">
        <article className="hero-info">
          <div>
            <div className="underline"></div>
            <h1>My name</h1>
            <h4>bla bla bla</h4>
            <Link to="contact" className="btn">
              contact me
            </Link>
            <SocialLinks />
          </div>
        </article>
        <Image fluid={fluid} className="hero-img" />
      </div>
    </header>
  )
}

export default Hero
```

* Social icons are same as navbar links - modular because used multiple places

`constants/socialLinks.js`

```
import React from "react"
import {
  FaFacebookSquare,
  FaLinkedin,
  FaDribbbleSquare,
  FaBehanceSquare,
  FaTwitterSquare,
} from "react-icons/fa"

const data = [
  {
    id: 1,
    icon: <FaFacebookSquare className="social-icon"></FaFacebookSquare>,
    url: "https://www.twitter.com",
  },
  {
    id: 2,
    icon: <FaLinkedin className="social-icon"></FaLinkedin>,
    url: "https://www.twitter.com",
  },
  {
    id: 3,
    icon: <FaDribbbleSquare className="social-icon"></FaDribbbleSquare>,
    url: "https://www.twitter.com",
  },
  {
    id: 4,
    icon: <FaBehanceSquare className="social-icon"></FaBehanceSquare>,
    url: "https://www.twitter.com",
  },
  {
    id: 5,
    icon: <FaTwitterSquare className="social-icon"></FaTwitterSquare>,
    url: "https://www.twitter.com",
  },
]
const links = data.map(link => {
  return (
    <li key={link.id}>
      <a href={link.url} className="social-link">
        {link.icon}
      </a>
    </li>
  )
})

export default ({ styleClass }) => {
  return (
    <ul className={`social-links ${styleClass ? styleClass : ""}`}>{links}</ul>
  )
}
```


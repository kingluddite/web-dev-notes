# About page intro
* All the data for this page will be stored in Strapi
* For a client you should add the Navbar in the Headless CMS (ie Strapi)

## About page content Type and data
## We'll use Strapi and click on `Create a new single type`
* Make all required
    - title
    - info
    - image
    - stack add media, single image, add choose add component required
* finish
* save

### Add Roles and Permissions
* Click pencil edit icon
* Then just click `find` (it is a single page so we don't need `findone`)
* Click Save

# About
* Add data for single About
    - title: about
    - info: hipster
    - image: pexel
    - stack: html, css
* Save

## Check if permissions are working
`localhost:1337/about` and you'll see your json object

## We need to tell gatsby-config about our single content type
* This is different then the other content-types
* [you can verify single-types in gatsby-config here](https://www.gatsbyjs.com/plugins/gatsby-source-strapi/?=gatsby-source-strapi)

`gatsby-config.js`

```
// MORE CODE

{
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        //   contentTypes : `jobs`, `projects`, `blogs`,
        //   singleType : `about`
        //  ONLY ADD TO ARRAY IF YOU HAVE DATA IN STRAPI !!!!
        contentTypes: [`jobs`, `projects`, `blogs`],
        // singleTypes: [],
        singleTypes: [`about`],
      },
    },
// MORE CODE
```

* Restart Gatsby
    - And you will now see in `allStrapiAbout` GraphQL

## GraphQL
* Great this query

```
query MyQuery {
  allStrapiAbout {
    nodes {
      title
      info
      image {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      stack {
        id
        title
      }
    }
  }
}
```

* Use the code exporter
* Use `Page query` (since this is a page)
* Copy GraphQL with variable and put in `pages/about.js`

```
import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Title from "../components/Title"
import Image from "gatsby-image"
// ...GatsbyImageSharpFluid
const About = () => {
  return <h2>about page</h2>
}

export const query = graphql`
  {
    allStrapiAbout {
      nodes {
        title
        info
        image {
          childImageSharp {
            fluid {
              src
            }
          }
        }
        stack {
          id
          title
        }
      }
    }
  }
`
```

* Don't forget to replace `src` with `...GatsbyImageSharpFluid` fragment

```
// MORE CODE

        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
// MORE CODE
```

## Test it
* We know we have access to `data` in the properties so we'll log it out to see our data structure

`pages/about.js`

```
// MORE CODE

const About = ({ data }) => {
  console.log(data)
  return <h2>about page</h2>
}
// MORE CODE
```

* View `http://localhost:8000/about/`

![here is the output from our log](https://i.imgur.com/aM8QGyQ.png)

## Give an alias
* This will truncate `allStrapiAbout` to just `about`

```
// MORE CODE

export const query = graphql`
  {
    about: allStrapiAbout {
      nodes {
        title
// MORE CODE
```

* And now you'll see this from your console log

![we see about alias](https://i.imgur.com/lqEyWWB.png)

* **note** Our nodes is an array of 1 item
    - Let's log out to verify this:

```
// MORE CODE

const About = ({
  data: {
    about: { nodes },
  },
}) => {
  console.log(nodes)
  return <h2>about page</h2>
}
// MORE CODE
```

* View the console and you'll verify our nodes is an array of one item

`[{...}]`

* All the stuff we want is coming from `nodes` but since it is an array we access it via:

`nodes[0]`

`pages/about.js`

```
import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Title from "../components/Title"
import Image from "gatsby-image"

const About = ({
  data: {
    about: { nodes },
  },
}) => {
  const { title, stack, image, info } = nodes[0]

  return (
    <Layout>
      <section className="about-page">
        <div className="section-center about-center">
          {image && (
            <Image fluid={image.childImageSharp.fluid} className="about-img" />
          )}
          <article className="about-text">
            <Title title={title} />
            <p>{info}</p>
            <div className="about-stack">
              {stack.map(item => {
                return <span key={item.id}>{item.title}</span>
              })}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    about: allStrapiAbout {
      nodes {
        title
        info
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        stack {
          id
          title
        }
      }
    }
  }
`

export default About
```



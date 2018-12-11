# React Spring
* We need to get access to the location of the current page into the layout
* Check to see if the home page is the current page we are on
    - If it is the billboard image will be super tall
    - If not homepage, billboard bg image will be considerably smaller

## Examine Layout in RDT and see what props are pagged
* Click on `third-post` to be on that page
* Only children are passed to it
* **tip** Use target icon in RDT and click on page
    - Scroll to `Layout`
        + Only `prop` is **children**
    - Click on `Layout`'s parent `postLayout` and view the `props`
        + There are lots of props
            * data
            * location (might be something we are interested in)
                - Inside of location is the `pathname`
* So we just need to _pass_ our **location** information into `Layout`
* We will want to do the same thing from the `HomePage`
    - The parent of `Layout` is `IndexPage` and that is where `location.pathname` is and we can pass that into `Layout`

`src/pages/index.js`

```
// MORE CODE

import React from 'react'
import { Link } from 'gatsby' // remove this as it is not used

import Layout from '../components/layout'
import Image from '../components/image'
import Listing from '../components/listing'

const IndexPage = ({location}) => (
  <Layout location={location}>
    <Listing />
  </Layout>
)

export default IndexPage

// MORE CODE
```

## Gatsby V2 layout system has changed!
* **Note** In previous layout system in Gatsby there was an automatic passing of `props` because the layout system was totally different
* But in V2 you need to specifically pass location to `Layout`

## Pass `location` to postLayout also
`postLayout`

```
import React, { Component } from 'react'
import { graphql } from 'gatsby'

// custom components
import Layout from './layout'

class postLayout extends Component {
  render () {
    const { location } = this.props;
    const { markdownRemark } = this.props.data

    return (
      <Layout location={location}>

// MORE CODE
```

* We destructure `location` as it is a React best practice (eslint should warn you to do this)
* This is class based component so observe the difference between passing props via a stateless functional component and a class based component

### Also pass `location` to `About`
`src/pages/about.js`

```
// MORE CODE

import React from 'react'

// custom components
import Layout from '../components/layout'

const About = ({ location }) => (
  <Layout location={location}>
    <h1>About Us</h1>
    <p>
      <div>
        Ipsum qui porro dolore eaque odit Dolorem alias assumenda delectus unde
        assumenda Nemo error assumenda totam et fugit nisi exercitationem
        debitis Quae omnis ad sequi saepe pariatur. Eum voluptatem sapiente.
      </div>
    </p>
  </Layout>
)

export default About

// MORE CODE
```

* Now inside `Layout` we also have access to the **location** prop

`layout.js`

```
// MORE CODE

const Layout = ({ children, location }) => (
  <StaticQuery

// MORE CODE
```

## Test it out with RDT
* View all pages and examine `Layout` and make sure `location` is passed as a prop to all pages
* Also expand location to see `pathname` and see the value points to the current page URL path

## Only show image on home page
* We'll use a conditional expression to make this possible

`layout.js`

```
// MORE CODE

        <Header siteTitle={data.site.siteMetadata.title} />
        {location.pathname === '/' && (
          <Img fluid={data.file.childImageSharp.fluid} />
        )}
        <MainLayout>

// MORE CODE
```

* View homepage and you see the bg image
* View any other page and you will not see the bg image

## Using React Spring library
* Great React animation library
* We'll add this to our layout page

```
// MORE CODE

import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Spring } from 'react-spring'

// MORE CODE
```

* React Spring will give us a component that will enable us to animate between 2 values

## Make our first animation
* Animate from a height of 100 to 200

`layout.js`

```
// MORE CODE

        <Spring from={{ height: 100 }} to={{ height: 200 }}>
          {/* add our render prop inside here */}
        </Spring>
        {location.pathname === '/' && (
          <Img fluid={data.file.childImageSharp.fluid} />
        )}
        <MainLayout>

// MORE CODE
```

## We have a render prop
```
// MORE CODE

        <Spring from={{ height: 100 }} to={{ height: 200 }}>
          {styles => (
            <div style={{ overflow: 'hidden', ...styles }}>
              <Img fluid={data.file.childImageSharp.fluid} />
            </div>
          )}
        </Spring>
        {/* {location.pathname === '/' && ( */}
        {/* )} */}

// MORE CODE
```

* This is a children render prop so we have access to `styles`
    - Inside we'll have a `div`
    - And we'll animate the height by setting a `style` attribute and set it to `styles` which will animate our element as it changes from `100` to `200` and we'll give it an overflow of hidden
    - We use **spread** operate to spread the values of **height**
    - We add the `overflow: 'hidden'`
    - We wrap Spring's render prop around `Img`
    - We comment out our conditional logic temporarily

## Test in browser
* Every page we see
* Con of Gatsby V2 every time the page change the `Layout` will mount and unmount
    - That is why Gatsby is treating this animation as fresh every new page
    - This will cause problems for us
    - This prevents us from using React Spring features like animate height auto
    - And we can't stop the animation from animating every page load
    - So we need to resort to trickory and modify the from and to value depending on the page we are on

### Add a ternary operator
* If we are on the home page we want the height to be 100 and animate to 200
* And if we are not on the home page we want the initial height to be 200

```
// MORE CODE

       <Spring
         from={{ height: location.pathname === '/' ? 100 : 200 }}
         to={{ height: location.pathname === '/' ? 200 : 100 }}
       >
         {styles => (
           <div style={{ overflow: 'hidden', ...styles }}>
             <Img fluid={data.file.childImageSharp.fluid} />
           </div>
         )}
       </Spring>
       <MainLayout>


// MORE CODE
```

## Subtle style improvement
* Remove margin bottom

```
// MORE CODE

const HeaderWrapper = styled.div`
  background: #524763;
  img {
    margin-bottom: 0;
  }
`

// MORE CODE
```

`layout.js`

Add top, bottom margin

```
// MORE CODE

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`

// MORE CODE
```



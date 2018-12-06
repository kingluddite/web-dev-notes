# Styled Components
* Open browser and search for `gatsby plugins`
* You will see a listing for this URL `https://www.gatsbyjs.org/plugins/`
* Click on it and search for `styled-components`
* Click on `gatsby-plugin-styled-components`
    - [link to gatsby-plugin-styled-components](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/?=styled-components)
    - Read the install instructions on that page
    - It includes these plugins
        + gatsby-plugin-styled-components
        + styled-components
        + babel-plugin-styled-components
    - After installin all of them with (in root of your site):

```
$ npm install --save gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

* After install the above you will get perfectly working server side generated CSS code that's inline so that you don't have to have new style sheets being loaded, reducing HTTP requests making the CSS loading in general lightening fast

## Go to Gatsby plugin page `gatsby-config.js`
`gatsby-config.js`

```
// MORE CODE

  plugins: [
    'gatsby-plugin-react-helmet',

// MORE CODE
```

## Restart server
* You can not start using styled components in the site

`layout.js`

```
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

// custom components
import Header from './header'
import Archive from './archive'

// styles
import './layout.css'

const MainLayout = styled.main`
  max-width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4fr 1fr;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <MainLayout>
          <div>{children}</div>
          <Archive />
        </MainLayout>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
```












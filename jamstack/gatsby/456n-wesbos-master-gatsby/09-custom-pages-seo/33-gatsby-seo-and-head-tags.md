# Gatsby SEO and Head Tags
* **note** Wes spills his coffee right at the beginning of this video

## What is the highest lever we can get?
* Layout.js
    - There is no HTML tags
    - There is body tag
    - All of that stuff gets added by gatsby

```
// MORE CODE

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  // console.log(props);
  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteBorderStyles>
        <ContentStyles>
          <Nav />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyles>
    </>
  );
}

// MORE CODE
```

## So how to you stick stuff in the `<head>` when you need to?
* We use `React Helmet` to do this
* This allows us to stick tags into React Helmet and it will transport wherever you put them into our documents head
    - This is useful for:
        + HTML tags
        + HTML attributes
        + SEO stuff
        + opengraph meta tags

## Let's use React Helmet in a page
* Then we'll make it reusable
* **note** You can stick a `Helmet` anywhere in your component and then put tags inside it

`Slicemaster.js`

```
// MORE CODE

import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';

export default function SingleSlicemasterPage({ data: { slicemaster } }) {

// MORE CODE
```

* Add a title to a single pizza page

`templates/Pizza.js`

* You will see a title on our page
  - View the page source in the browser and you will see the `title` html tag
    + **note** This is referred to as a "side effect"
      * What is a side effect?
        - When JavaScript reaches outside of the component and updates something outside of itself
        - If ever the title tags overlap, the one that comes later will take precedent

```
// MORE CODE

import { Helmet } from 'react-helmet';

const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <PizzaGrid>
      <Helmet>
        <title>{pizza.name}</title>


// MORE CODE
```

## A better way it to modular SEO
* Create a modular component with good SEO defaults

## A change
* We won't import Helmet (we'll remove that and the code we just added)
* We'll need to install a new plugin
  - When you get into server rendering (aka pre-building) there is a plugin that is needed to make the SEO module we are going to create to work while server rendering (very important for our SEO!)

`gatsby-config.js`

* Add a plugin
  - Make sure you install it `$ npm i gatsby-plugin-react-helmet`
    + **note** order of plugins doesn't matter
    + Adding this plugin makes sure our server's server render has access to all helmet stuff
      * **note** Helmet imported now as a named export (recent change)
        - so `import { Helmet } from react-helmet`

```
// MORE CODE

export default {
  siteMetadata: {
    title: `Pizza Slices`,
    siteURL: `http://example.com`,
    description: `Really good za`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,

// MORE CODE
```

### Page back to the way it was before
```
// MORE CODE

import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <PizzaGrid>
      <Img fluid={pizza.image.asset.fluid} />

// MORE CODE
```

## Create our Seo component
`components/SEO.js`

```
import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO() {
  <Helmet>

   </Helmet>
}
```

### What tags do we need?
* **Accessibility Tip**
  - Specify the language of your site `<html lang="en" />`

```
<Helmet titleTemplate={`%s - My Pizza`}>
```

* Above - Any time we specify a title tag it will automatically append "- My Pizza" On every page
  - An improvement is we can query the data from our siteMetadata and plug it in (so this will work on any site)

## How do we query data into a component when we are not at a page level?
* We use a `useStatic` query
  - Add a twitter handle

`gatsby-config.js`

```
// MORE CODE

export default {
  siteMetadata: {
    title: `Pizza Slices`,
    siteURL: `http://example.com`,
    description: `Really good za`,
    twitter: '@example',
  },

// MORE CODE
```

`SEO.js`

```
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);

  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
    </Helmet>
  );
}

SEO.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.object,
};
```

## Test it out that our HTML is working
* Restart gatsby
* We don't want to put the SEO comonent inside our page
  - That would be mixing up markup with metadata
  - Instead well use fragments and put it as a simpling to our single page

`Pizza.js`

```
// MORE CODE

import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <>
      <SEO />
      <PizzaGrid>

// MORE CODE
```

* View a single pizza page in browser
  - View source code in Chrome Dev Tools
  - You will see the `<html lang="en">` was added
  - You also can see what attributes were added by helmet with:
    + `<html lang="en" data-react-helmet="lang">`

`SEO.js`

```
// MORE CODE

  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>

// MORE CODE
```

* Pass it into our Pizza page
  - Test page and the title is now dynamically added to our title

```
// MORE CODE

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <>
      <SEO title={pizza.name} />

// MORE CODE
```

## Add a favicon
* **Wes Tip** Says `svg` favicon is not supported in most browsers now

`SEO.js`

* This is pulling the favicon from the `static` folder

```
// MORE CODE

  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Helmet>
  );

// MORE CODE
```

* **note** The SVG favicon was created with Sketch (sketch.com)
* Refresh the page to see the new favicon
* You'll see a better looking favicon is served
  - By default gatsby looks in static folder for `favicon.ico` (browsers do that in general)
    + **TIP** You should always put favicon.ico in the static folder as a very basic backup

### Adding a backup `.ico` favicon too
`SEO.js`

```
// MORE CODE

  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
    </Helmet>
  );
}

// MORE CODE
```

## Add metatags
* **Wes added these but they are not needed** The viewport and utf-8 are already there and don't need to be added

```
// MORE CODE

  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="description" content={site.siteMetadata.description} />
    </Helmet>
  );

// MORE CODE
```

## Adding opengraph
* What is open graph?
  - Open Graph is a specification for facebook, twitter, pinterest
    + Any site that wants to consume your website info
* `{location && <meta property="og:url" content={location.href} />}`
  - **FOLLOW UP** Wes has comments about location and ways to use it that I didn't totally follow 

`<meta property="og:image" content={image || '/logo.svg'} />`

  * (above - we either pass in a custom image for the open graph image, or we default to the logo - we can do this because the logo is in our static folder we can reference it with an absolute path)

```
 // MORE CODE

     <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
       <html lang="en" />
       <title>{title}</title>
       {/* Fav Icons */}
       <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
       <link rel="alternate icon" href="/favicon.ico" />
       {/* meta tags */}
       <meta name="description" content={site.siteMetadata.description} />
       {/* Open Graph */}
       {location && <meta property="og:url" content={location.href} />}
       <meta property="og:image" content={image || '/logo.svg'} />
       <meta property="og:title" content={title} key="ogtitle" />
       <meta property="og:site_name" content={site.siteMetadata.title} key="ogsitename" />
       <meta property="og:description" content={description} key="ogdesc" />
       {children}
     </Helmet>

// MORE CODE
```

* **FOLLOW UP** We pass `{children}` because if you wanted to put another tag in the SEO component, you wouldn't be able to do that
  - So to fix that we take any children that are passed to the `SEO` component and we just put them at the bottom
    + That allows us to open and close our `SEO` tag
* So later on I could do this to override the title

```
export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <>
      {/* <SEO title={pizza.name} /> */}
      <SEO title={pizza.name}>
        <title>Override your title!</title>
      </SEO>
```

## Update site with SEO component
* Start with pages

`Pizza.js`
  
* **SUPER COOL!** The `?` will make sure the image exists or won't show it
  - If you didn't do this and delete the image you would get an error
    + `image={pizza.image?.asset?.fluid?.src}`
      * It makes sure pizza.image exists before it grabs pizza.image.asset
      * And it will make sure pizza.image.asset exists before it grabs pizza.image.asset.fluid
    + This is called "nested chaining" in ES7
      * https://kiranvj.com/blog/blog/optional-chaining-in-es7-and-support-in-react-js/
      * Previously you would have to check if all of these things existed
      * Gatsby is set up to convert those `?` to into a long drawn out `if` statement

```
// MORE CODE

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />

// MORE CODE
```

* Add SEO component to:
  - pizzas.js

```
// MORE CODE

  return (
    <>
      <SEO title={pageContext.topping ? `Pizzas With ${pageContext.topping}` : `All Pizzas`} />

// MORE CODE
```

* Different title when on all pizzas versus a topping page

## slicemasters.js page
```
// MORE CODE

export default function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;

  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />

// MORE CODE
```

## orders.js page
```
// MORE CODE

;
import SEO from '../components/SEO';

export default function OrdersPage() {
  return (
    <>
      <SEO title="Order a Pizza!" />
      <p>Orders Page</p>
    </>
  );
}
// MORE CODE
```

* Beers page

```
// MORE CODE

export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <SEO title={`Beers! We have ${beers.nodes.length} in stock`} />

// MORE CODE
```

## Single slicemaster template page
```
// MORE CODE

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  console.log({ slicemaster });
  return (
    <>
      <SEO title={slicemaster.name} image={slicemaster?.image?.asset?.src} />

// MORE CODE
```

* **note** This SEO component can be placed anywhere at page level or component level and you can mix and match them as well

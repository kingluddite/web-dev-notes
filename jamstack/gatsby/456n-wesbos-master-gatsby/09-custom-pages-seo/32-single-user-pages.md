# Single User pages
<!-- MarkdownTOC -->

- [Single Slicemaster page](#single-slicemaster-page)
- [Testing](#testing)
- [Create query for that person](#create-query-for-that-person)
- [show the data of the slicemaster](#show-the-data-of-the-slicemaster)
- [Finished slicemaster page](#finished-slicemaster-page)

<!-- /MarkdownTOC -->

* **note** Wes switches to `person` but I used `slicemaster` as that follows his previous naming convention
* `cool to have` - like next "file based routing"
* We will need to create a new component for the single slicemaster
* In `gatsby-node.js`
    - query all the data
    - loop over them
    - create the page

## Single Slicemaster page
`templates/Slicemaster.js`

```js
// MORE CODE

import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
// import Img from 'gatsby-image';
import styled from 'styled-components';

export default function SingleSlicemasterPage({ data }) {
  return (
    <>
      <h2>Yo Slicemaster</h2>
    </>
  );
}

SingleSlicemasterPage.propTypes = {
  data: PropTypes.object.isRequired,
}
// MORE CODE
```

* Fix link on `slicemasters.js` page

```js
// MORE CODE

          <SliceMasterStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>

// MORE CODE
```

* And in `gatsby-node.js` we create the single pages from the `Slicemaster.js` template we just created

```js
// MORE CODE

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          name
          slug {
            current
          }
          _id
        }
        totalCount
      }
    }
  `);
  // 2. TODO: turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      // What is the URL for this new page??
      component: path.resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      // This data is passed to the template when we create it
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current,
      },
    });
  });

// MORE CODE
```

## Testing
* On Slicemasters page click on any slicemaster and you will be taken to `Yo Slicemaster` text
* View a 404 and you'll see all the slicemaster single pages were created

## Create query for that person
`src/templates/Slicemaster.js`

```js
// MORE CODE
SingleSlicemasterPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query ($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
```

## show the data of the slicemaster
* Log data first

```js
// MORE CODE

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  console.log({ slicemaster });
  return (
    <>
      <h2>Yo Slicemaster {slicemaster.name}</h2>
      <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
    </>
  );
}

// MORE CODE
```

## Finished slicemaster page
```js
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  console.log({ slicemaster });
  return (
    <div className="center">
      <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
      <h2>
        <span className="mark">{slicemaster.name}</span>
      </h2>
      <p>{slicemaster.description}</p>
    </div>
  );
}

SingleSlicemasterPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query ($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
```


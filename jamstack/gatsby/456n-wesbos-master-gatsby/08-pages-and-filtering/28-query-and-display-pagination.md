# Query and Display Pagination
1. query the data
2. loop over it
3. display it

## GraphQL Playground
```
query MyQuery {
  allSanityPerson {
    totalCount
    nodes {
      name
      id
      slug {
        current
      }
      description
      image {
        asset {
          fluid(maxWidth: 410) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
}
```

* And pull data into our page
`src/pages/slicemasters.js`

```
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

export default function SlicemastersPage({ data }) {
  // console.log(data);
  const slicemasters = data.slicemasters.nodes;

  return (
    <>
      <p>Slicemasters Page</p>
    </>
  );
}

SlicemastersPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
```

## Style it with a grid
* **suggestion**
    - Since we are using this grid all over the place
        + Make a reasonable grid component
        + Pass in a css variable
        + Or use a css variable that overwrites the number of columns you want

```
// MORE CODE

import styled from 'styled-components';

const SlicemasterGridStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  console.log(slicemasters);

  return (
    <>
      <SlicemasterGridStyles>
        {slicemasters.map((person) => (
          <div>
            <Link to={`/slicemasters/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </div>
        ))}
      </SlicemasterGridStyles>
    </>
  );
}

// MORE CODE
```

## Test and the grid is working
* We are keeping the fragments (ghost tags) because we'll be putting our pagination there in a bit

## Style the individual person
* **note** Styling images is different in gatsby-image
    - You don't just grab the `img`
        + Because it is wrapped in a `div` and has all that extra stuff, you grab the image using `.gatsby-image-wrapper`
            * This is the class that gatsby puts on the image (when you use gatsby-image)

```
// MORE CODE

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }
`;

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  console.log(slicemasters);

  return (
    <>
      <SlicemasterGridStyles>
        {slicemasters.map((person) => (
          <SliceMasterStyles>
            <Link to={`/slicemasters/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SliceMasterStyles>
        ))}
      </SlicemasterGridStyles>
    </>
  );
}

// MORE CODE
```

* **cool** If you have any images that are not cropped correctly you can go into the invidual images in sanity and use the crop tool to put a circle around the area you want to be the center (like someone's face) - this is possible because of the "hot spot: true" setting in Sanity

`slicemasters.js`

```
import { graphql, Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlicemasterGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    position: relative;
    z-index: 2;
    margin-bottom: -2rem;
    font-size: 4rem;
    text-align: center;
    transform: rotate(-2deg);
  }

  .description {
    position: relative;
    z-index: 2;
    margin: 2rem;
    margin-top: -6rem;
    padding: 1rem;
    background: var(--yellow);
    text-align: center;
    transform: rotate(1deg);
  }
`;

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  console.log(slicemasters);

  return (
    <>
      <SlicemasterGridStyles>
        {slicemasters.map((person) => (
          <SliceMasterStyles key={person.id}>
            <Link to={`/slicemasters/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SliceMasterStyles>
        ))}
      </SlicemasterGridStyles>
    </>
  );
}

SlicemastersPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
```

* And I updated some style order on beers.js

```
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const SingleBeerStyles = styled.div`
  padding: 2rem;
  border: 1px solid var(--grey);
  text-align: center;

  img {
    display: grid;
    align-items: center;

    /* object-fit: cover; /* zoom up and crop image */
    object-fit: contain; /* regardless of the width and height of image it will always fit image inside */
    width: 100%;
    height: 200px;

    font-size: 10px;
  }
`;

export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <h2 className="center">We have {beers.nodes.length} beers available. Dine in only!</h2>
      <BeerGridStyles>
        {beers.nodes.map((beer) => {
          // console.log(beer);
          const rating = Math.round(beer.rating.average);

          return (
            <SingleBeerStyles key={beer.id}>
              <h3>{beer.name}</h3>
              <img src={beer.image} alt={beer.name} />
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {'‚≠êÔ∏è'.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>{'‚≠êÔ∏è'.repeat(5 - rating)}</span>
                <span> ({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

BeersPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        image
        price
        rating {
          average
          reviews
        }
        name
        id
      }
    }
  }
`;
```


## Next Paginate data

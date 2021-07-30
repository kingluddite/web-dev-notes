# Querying, Displaying, and Styling the Beers Page
## Steps
1. Query the data
2. Loop over the data and display it
3. Style the data

* Rinse and repeat over and over again in gatsby land

## navigate to our beers page
* http://localhost:8000/beers

* **caution** If you don't export, you won't have access
    - So this is bad:

```
// MORE CODE

BeersPage.propTypes = {
  data: PropTypes.object,
};

const query = graphql`

// MORE CODE
```

* And this is good:

```
// MORE CODE

BeersPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`

// MORE CODE
```

* Code with prop-types

```
import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

export default function BeersPage({ data }) {
  console.log(data);
  return (
    <>
      <p>Beers Page</p>
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

* That will give you `allBeer` with all the beers

## Lightbulb moment
* I accidentilly used edges instead of nodes and wondered what the difference is
    - plugin documentation that they often query "edges" first

### Using edges
```
{
  allDataJson {
    edges {
      node {
        title
      }
    }
  }
}
```

### vs using nodes
```
{
  allDataJson {
    nodes {
      title
    }
  }
}
```

* What is the difference between edges and nodes?
    - `edges` allow you to go from one node to another
    - For instance if you want to have a link "next post" on your blog post page, fetching `nodes` only wont allow you to do that, whereas `edges` will give you `nextNode` and `previousNode`
    - `edges` is used for cursor based pagination which is faster

## Prettier fix
* When you map if you only have 1 line prettier will convert to an implicit return and if you don't want that use multiple lines

```
// MORE CODE

{beers.nodes.map(beer => {
return <p>yo</p>
})}

// MORE CODE
```

* automatically transforms into:

```
// MORE CODE

{beers.nodes.map((beer) => (
  <p>yo</p>
))}

// MORE CODE
```

* To circumvent that prettier behavior add a log and some code

## Show all our beer names
```
// MORE CODE

export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <h2 className="center">We have {beers.nodes.length} beers available. Dine in only!</h2>
      <div>
        {beers.nodes.map((beer) => {
          console.log(beer);
          return (
            <div id={beer.id}>
              <h3>{beer.name}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}

// MORE CODE
```

![all beer names displayed](https://i.imgur.com/kRsLOkl.png)

## Note: These images are not using gatsby image
* What if we wanted to use gatsby image with these images?
    - In gatsby node, you would have to:
        + Download the images
        + Then further source those images into Gatsby
        + But the images we are using is sized and ready
* I forget `image` so I just add it in the GraphQL

```
// MORE CODE

        {beers.nodes.map((beer) => {
          console.log(beer);
          return (
            <div id={beer.id}>
              <h3>{beer.name}</h3>
              <img src={beer.image} alt={beer.name} />
              {beer.price}
            </div>
          );
        })}

// MORE CODE
```

* Showing ratings
    - We'll round it to get a round number
    - We'll use an emoji and the `repeat()` method to generate a star emoji for every rating

## Problem with beer images appearing
* Lots of 404s
* This was on the slack - https://app.slack.com/client/T0B6Z0ZL1/C01AHHRCTU2/thread/C01AHHRCTU2-1603573838.397100

## Problem with API data in beers

`gatsby-node.js`

```
// MORE CODE

export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <h2 className="center">We have {beers.nodes.length} beers available. Dine in only!</h2>
      <div>
        {beers.nodes.map((beer) => {
          console.log(beer);
          const rating = Math.round(beer.rating.average);

          return (
            <div id={beer.id}>
              <h3>{beer.name}</h3>
              <img src={beer.image} alt={beer.name} />
              {beer.price}
              <p>{'‚≠êÔ∏è'.repeat(rating)}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

// MORE CODE
```


* I used help from slack - https://app.slack.com/client/T0B6Z0ZL1/C01AHHRCTU2/thread/C01AHHRCTU2-1615404390.054600
* Added this to only show beers with names:

`gatsby-node.js`

```
// MORE CODE

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  // 1. fetch a list of beers
  const res = await fetch(`https://api.sampleapis.com/beers/ale`);
  const beers = await res.json();
  // 2. Loop through beers
  for (const beer of beers) {
    // make sure the api has beer names
    if (!beer.name) return;

    const nodeMeta = {

// MORE CODE
```

* Than all the ratings were showing up!

## Making rating show
* We have the rating
* And we need to show the others (5 - rating)

```
// MORE CODE

              <p>{'⭐️'.repeat(rating)}</p>
              <p>{'⭐️'.repeat(5 - rating)}</p>
            </div>

// MORE CODE
```

* And we need to style the stars
    - And we make it accessible with the title attribute
```
// MORE CODE

          return (
            <div id={beer.id}>
              <h3>{beer.name}</h3>
              <img src={beer.image} alt={beer.name} />
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {'⭐️'.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>{'⭐️'.repeat(5 - rating)}</span>
              </p>
            </div>
          );
        })}

// MORE CODE
```

* Add the reviews

```
// MORE CODE

<span style={{ filter: `grayscale(100%)` }}>{'‚≠êÔ∏è'.repeat(5 - rating)}</span>
<span> ({beer.rating.reviews})</span>

// MORE CODE
```

## Style it with grid
```
// MORE CODE

import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
            <div key={beer.id}>
              <h3>{beer.name}</h3>
              <img src={beer.image} alt={beer.name} />
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {'‚≠êÔ∏è'.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>{'‚≠êÔ∏è'.repeat(5 - rating)}</span>
                <span> ({beer.rating.reviews})</span>
              </p>
            </div>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

// MORE CODE
```

## Now we'll style the singular beer
```
// MORE CODE

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;

  img {
    width: 100%;
    height: 200px;

    /* object-fit: cover; /* zoom up and crop image */
    object-fit: contain; /* regardless of the width and height of image it will always fit image inside */
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

// MORE CODE
```

* Styling for missing images (doens't fix this in Chrome)
    - Looks good in Firefox

```
// MORE CODE

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;

  img {
    display: grid;
    align-items: center;
    width: 100%;
    height: 200px;
    font-size: 10px;

    /* object-fit: cover; /* zoom up and crop image */
    object-fit: contain; /* regardless of the width and height of image it will always fit image inside */
  }
`;

// MORE CODE
```

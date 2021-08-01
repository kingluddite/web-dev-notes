# Display Home page data
* VS Code tip
    - adding gql
    - question - why are we not using these with gatsby and GraphQL?
        + https://www.gatsbyjs.com/plugins/gatsby-plugin-graphql-loader/
        + Wes says we don't need a GraphQL library because it is just a string at the end of the day

## We get an error and here is the way around it
### West Practice

`const gql = String.raw`

`useLatestData.js`

* Now we get formatting for GraphQL and syntax highlighting too!

```
import { useEffect, useState } from 'react';

const gql = String.raw;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [slicemasters, setSlicemasters] = useState();
  // fetch the data from the GraphQL endpoint
  useEffect(function () {
    console.log('FETCHING DATA');
    // when the component loads (aka mounts), fetch the data
    fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`

// MORE CODE
```

## This is super cool
* If you ever need syntax highlighting without importing a library just use this
    - `const css = String.raw`

## Alter our queries to grab all that we need
* **note** `lqip` - low quality image placeholder
* **note** we use `_id` and not `id` because we are querying Sanity directly

`useLatestData.js`

```
import { useEffect, useState } from 'react';

const gql = String.raw;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [slicemasters, setSlicemasters] = useState();
  // fetch the data from the GraphQL endpoint
  useEffect(function () {
    console.log('FETCHING DATA');
    // when the component loads (aka mounts), fetch the data
    fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
              hotSlices {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('Wooops!');
        console.log(err);
      });
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}
```

## View browser and we have an error
* StoreSettings of undefined
    - To avoid this error use the GraphQL Playground first

### We'll use a catch to troubleshoot better
`useLatestData.js`

```
// MORE CODE
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('Wooops!');
        console.log(err);
      });
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}
```

* Console didn't help
* But the network shows us when you look at the fetch
    - The error "cannot query field assets on type Image"
* After you fix the bad GraphQL, you will see a fetch request of 200 success in Network tab of CDTs
* **FOLLOW UP** How is Wes seeing the data coming in the FF console? 05:39 of video #47
    - I use the Network of Fetch response to see the string of data in the client

![our data in CDT](https://i.imgur.com/CByE6WY.png)

## Fragments to the rescue
* We typed the same thing twice DRY alert!
* We can use a fragment to save us time

```
import { useEffect, useState } from 'react';

const gql = String.raw;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [slicemasters, setSlicemasters] = useState();
  // fetch the data from the GraphQL endpoint
  useEffect(function () {
    console.log('FETCHING DATA');
    // when the component loads (aka mounts), fetch the data
    fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          fragment deets {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
          }
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ...deets
              }
              hotSlices {
                ...deets
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('Wooops!');
        console.log(err);
      });
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}
```

* But when we use network CDT we see it expected "on"
* So our syntax needs to be `fragment deets on StoreSettings`
* That didn't work
* Can't use fragments like this but can make them a template string

### But this works
* Using a template string
    - **tip** Use curly braces so you can format
    - Then remove your curly braces after formatted

```
// MORE CODE

const deets = gql`
  {
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
  }
`;

// MORE CODE
```

* Look no curly braces!

```
// MORE CODE

const deets = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

// MORE CODE
```

* That works (but not worth the effort)
* We can also remove the gql since it isn't GraphQL but just a string so:

```
// MORE CODE

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

// MORE CODE
```

## We'll loop over data and display it
`index.js`

```
// MORE CODE

import useLatestData from '../utils/useLatestData';
import ItemGrid from '../styles/ItemGrid';

// MORE CODE

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>No one is working right now</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

CurrentlySlicing.propTypes = {
  slicemasters: PropTypes.array,
};

function HotSlices({ hotSlices }) {
  return (
    <div>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

// MORE CODE
```

## Make a new style component called ItemGrid
`styles/ItemGrid.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { ItemsGrid } from './Grids';

export default function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      <p>Yo!</p>
      <p>Yo!</p>
      <p>Yo!</p>
      <p>Yo!</p>
    </ItemsGrid>
  );
}

ItemGrid.propTypes = {
  items: PropTypes.array,
};
```

## Test in browser
* Make sure the Yo!s show up in UI

`ItemGrid.js`

* The images appear but they are large and load slow
* This is the downside of not having our images go through gatsby
    - **AWESOME** But Sanity has image resizing just via the URL!

```
import React from 'react';
import PropTypes from 'prop-types';
import { ItemsGrid, ItemStyles } from './Grids';

export default function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      {items.map((item) => (
        <ItemStyles>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img src={`${item.image.asset.url}`} alt={item.name} />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}

ItemGrid.propTypes = {
  items: PropTypes.array,
};
```

## Sanity image resizing via URL!
```
          <img src={`${item.image.asset.url}?w=500&h=400&fit=crop`} alt={item.name} />

```

## To maintain aspect ratio we do this
```
          <img width="500" height={400} src={`${item.image.asset.url}?w=500&h=400&fit=crop`} alt={item.name} />

```

## Now we'll show the `lqip` while images are loading
```
// MORE CODE

          <img
            width="500"
            height={400}
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            style={{ background: `url(${item.image.asset.metadata.lqip})` }}
          />

// MORE CODE
```

* Using cover

```
// MORE CODE

          <img
            width="500"
            height={400}
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />

// MORE CODE
```

* Titles and more

```
// MORE CODE

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>No one is working right now</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

CurrentlySlicing.propTypes = {
  slicemasters: PropTypes.array,
};

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}

// MORE CODE
```

## Global tilt style
`styles/GlobalStyles.js`

```
// MORE CODE
  .tilt {
    position: relative;
    display: inline-block;
    transform: rotate(-2deg);
  }

`;

export default GlobalStyles;
```

## VS code tip
* Find where you used it
* Hold down <kbd>opt</kbd> on the style component and it will tell you where you wrote it

### Fix small margin issue
`Nav.js`

```
// MORE CODE

const NavStyles = styled.nav`
  /* margin-bottom: 3rem; */

// MORE CODE
```



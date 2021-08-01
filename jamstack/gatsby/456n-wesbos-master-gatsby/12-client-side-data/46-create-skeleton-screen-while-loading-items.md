# Create skeleton screen while loading items
* This is client side data

## We'll need to use several grids
* **West Practice**
    - When using several grids stick them in their own grids file

`styles/Grids.js`

```
import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;
```

`pages/index.js`

```
import React from 'react';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>CurrentlySlicing</p>
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <p>HotSlices</p>
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();

    return (
      <div className="center">
        <h1>The best pizza downdown!</h1>
        <p>Open 11am to 11pm every day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    );
  }
```

## Deal with the items being loaded Grid
* **note** Use rems for grid gap

`src/components/LoadingGrid.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { ItemsGrid } from '../styles/Grids';

export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      <p>Loading</p>
      <p>Loading</p>
      <p>Loading</p>
      <p>Loading</p>
    </ItemsGrid>
  );
}

LoadingGrid.propTypes = {
  count: PropTypes.number,
};
```

## Load in our grid to both components
```
import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <LoadingGrid />
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <LoadingGrid />
    </div>
  );
}

// MORE CODE
```

* View in browser

![four columns with grid](https://i.imgur.com/JYXWE6W.png)

## pass in our prop count of 4 for each component
```
// MORE CODE

function CurrentlySlicing() {
  return (
    <div>
      <LoadingGrid count={4} />
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <LoadingGrid count={4} />
    </div>
  );
}

// MORE CODE
```

## Let's work with arrays
* We'll make an array of 4 empty spots
* And the length of that array will be how ever many are passed in
* **note** the second argument of Array.from(n1, n2)
    - n2 is a map function
    - You could just tag a .map at the end but why when it is built into Array.from()
    - We don't care about the first argument of our map (so we use an underscore `_`)
    - We care about `map()` functions 2nd argument which is `index`
    - We use `( )` for an implicit return
`LoadingGrid.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { ItemsGrid } from '../styles/Grids';

export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <p>Loading...</p>
      ))}
    </ItemsGrid>
  );
}

LoadingGrid.propTypes = {
  count: PropTypes.number,
};
```

* There is no visual difference
* But if you change the number of loading items and you will see how it is more flexible
* **note** If you provide a width and height for images (even if the src is not loaded yet is should maintain that aspect ratio)

`LoadingGrid.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { ItemsGrid } from '../styles/Grids';

export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <div>
          <p className="mark">Loading...</p>
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            className="loading"
            alt="Loading"
            width="500"
            height="400"
          />
        </div>
      ))}
    </ItemsGrid>
  );
}

LoadingGrid.propTypes = {
  count: PropTypes.number,
};
```

* What is the long blank image?
    - Generated from - https://png-pixel.com/
    - The image we use is a blank image with a ratio of 5 pixels high and 4 pixels wide
    - This helps us to maintain the ratio even though the images didn't load
    - The images are a bit tall (we'll fix that with CSS)
    - We'll add a loading animation too

## SingleGrid item styles
* We first just make sure our styles our connectected/working

`Grids.js`

```
// MORE CODE
export const ItemStyles = styled.div`
  background: #ff0000;
`;
```

* Consume the styles

```
import React from 'react';
import PropTypes from 'prop-types';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={i}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            className="loading"
            alt="Loading"
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}

LoadingGrid.propTypes = {
  count: PropTypes.number,
};
```

## **West Practice** - `font-size: 0`
* Sometimes an image has "ghost space"
* If you put two inline elements beside each other
    - They you have this spacing between them
    - It is not margin or padding (it is just a natural space that CSS gives you)
        + And the size of that space is determined by the font-size
        + So if you run into weird issues try `font-size: 0`

```
// MORE CODE

export const ItemStyles = styled.div`
  position: relative;
  text-align: center;

  img {
    height: auto;
    border: 1px solid #ff0000;
    font-size: 0;
  }
`;
```

## Cool gradient bg
```
// MORE CODE

  img.loading {
    --shine: var(--white);
    --background: var(--grey);
    background-image: linear-gradient(90deg, var(--background) 0px, var(--shine) 40px, var(--background) 80px);
  }

// MORE CODE
```

* mine

```
// MORE CODE

/* Single Grid Item (for home page) */
export const ItemStyles = styled.div`
  @keyframes shine {
    from {
      background-position: 200%;
    }

    to {
      background-position: -40px;
    }
  }

  position: relative;
  text-align: center;

  img {
    height: auto;
    font-size: 0;
  }

  p {
    position: absolute;
    left: 0;
    width: 100%;
    transform: rotate(-2deg) translateY(-50%);
  }

  .mark {
    display: inline;
  }

  img.loading {
    --shine: var(--white);
    --background: var(--grey);
    background-image: linear-gradient(90deg, var(--background) 0px, var(--shine) 40px, var(--background) 80px);
    background-size: 500px;
    animation: shine 1s infinite linear;
  }

// MORE CODE
```

## Now conditionally show these items while we are in a loading state
`pages/index.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>No one is working right now</p>}
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
    </div>
  );
}

HotSlices.propTypes = {
  hotSlices: PropTypes.array,
};

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The best pizza downdown!</h1>
      <p>Open 11am to 11pm every day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
```

* In Sanity if you delete all the slicers and the pizzas in the backend you'll see the No one is working or no pizzas in the case

## Next - Loop through the slicers and pizzas and display them

# Make website responsive
## Touchups
* Center footer copyright

`Footer.js`

```
// MORE CODE

    <footer className="center">
      <p>&copy; Pizza {new Date().getFullYear()}</p>
    </footer>

// MORE CODE
```

## unique key errors
`LoadingGrid.js`

* I used `i` (index) but this could be duplicated

```
// MORE CODE

    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={i}>

// MORE CODE
```

* Better to to this:

```
// MORE CODE

    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={`loading-${i}`}>

// MORE CODE
```

## ItemGrid also has the same issue
* If you use `item.id` as unqiue key you will see it is not there
* But `_id` is

`ItemGrid.js`

```
// MORE CODE

export default function ItemGrid({ items }) {
  console.log(items);

// MORE CODE
```

* And so we use this:

```
// MORE CODE

export default function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      {items.map((item) => (
        <ItemStyles key={item._id}>

// MORE CODE
```

* Remove logs
    - FETCHING DATA

* ToppingsFilter.js
    - Toppings filter
    - console.log(toppingsWithCounts);
* Pagination.js
    - console.log(skip)

```
// MORE CODE

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          key={`page-${i}`}

// MORE CODE
```
* slicemasters.js
    - Remember when you are getting the data in gatsby it is just `id`
    - But in Sanity it is `_id` 

```
// MORE CODE

      <SlicemasterGridStyles>
        {slicemasters.map((person) => (
          <SliceMasterStyles key={person.id}>

// MORE CODE
```

## Center logo
* **FOLLOW UP** I didn't see an issue with this in Chrome
* Wes added:
    * In the logo li tag a `text-align: center`
    * In the child `a` tag a `display: block`
    * ???
    * Issue in Firefox, not in Safari
    * He said someone would send a PR
    * He just added in LogoStyles div a font-size: 6px;

### Mobile button
* Grab the vertical bars to squeeze the page more narrow
* Or pull the page wider
* You will see 800 mark we need to make the font smaller

`Nav.js`

* **West Practice** PRO of styled components is you can put your media queries directly inside your selector
    - stylelint
        + @media comes before rule

```
// MORE CODE

  a {
    font-size: 3rem;
    text-decoration: none;

    @media (max-width: 800px) {
      font-size: 2rem;
    }

// MORE CODE
```

* Also removed `skip` as it is not used

```
// MORE CODE

// skip was destructured here but we did not use it so we removed it
export default function Pagination({ pageSize, totalCount, currentPage, base }) {

// MORE CODE
```

* When the device gets smaller (600px) place logo on top an icons below it
* **note** I removed skip from prop types:

```
// MORE CODE

Pagination.propTypes = {
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  base: PropTypes.string,
  // skip: PropTypes.number remove
};

// MORE CODE
```

`slicemasters.js`

```
// MORE CODE

      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip} // REMOVE THIS
        base="/slicemasters"
      />

// MORE CODE
```

`Nav.js`

```
// MORE CODE

          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li className="logo-item">
          <Link to="/">
            <Logo />
          </Link>

// MORE CODE
```

* And style it (will appear at 600px device size)

```
// MORE CODE

const NavStyles = styled.nav`
  /* margin-bottom: 3rem; */

  @media (max-width: 600px) {
    --columns: 4;

    ul {
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
    }

    .logo-item { /* add this rule - will show red under logo */
      background-color: #ff0000;
    }
  }

  .logo {
    transform: translateY(-25%);
  }

// MORE CODE
```

* Now on that size the logo will take up the full row
* It will be the first in `order` and start and 1 and end at -1

## Follow up
* stylelint
  - Had @media before rule and this broke the responsive in this last nav instruction
  - @media needs to come after rule because we are using css variables and if the @media comes first it will not work
* I altered the order to this:

`.stylelintrc`

```
// MORE CODE

  "rules": {
    "order/order": [
      ["dollar-variables", "custom-properties", "declarations", "rules", "at-rules"],
      { "severity": "warning" }
    ],

// MORE CODE
```

## Fix long titles
`Grids.js`

* ItemStyles

```
// MORE CODE

  p {
    position: absolute;
    left: 0;
    margin: 0;
    width: 100%;
    transform: rotate(-2deg) translateY(-10px);
  }

// MORE CODE
```

## Home page grid resonsive issues
* **note** 320px is smallest a phone will go
* Below will make the columns go from 2 to 1 columns

```
// MORE CODE

export const HomePageGrid = styled.div`
  --columns: 2;
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));
  gap: 2rem;

  @media (max-width: 800px) {
    --columns: 1;
  }
`;

// MORE CODE
```

* Font is too large on small devices
* Let's use clamp to avoid a media query (Cool!)

`ItemStyles` (Grids.js)

```
// MORE CODE

  p {
    position: absolute;
    left: 0;
    width: 100%;
    margin: 0;
    font-size: 2rem; /* fallback for browsers that don't speak css clamp() */
    font-size: clamp(12px, 5vw, 20px); /* add this ! */
    transform: rotate(-2deg) translateY(-10px);
  }

// MORE CODE
```

## Toppings font size
* A little smaller on all that long list of pizzas

`ToppingsFilter.js`

```
// MORE CODE

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center; /* helps vertically align counts */
    padding: 5px;
    border-radius: 2px;
    background: var(--grey);
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem); /* add! */

// MORE CODE
```

`OrderStyles.js`

* Comment this in:

```
// MORE CODE

    &menu (max-width: 900px) {
      fieldset.menu,
      fieldset.order {
        grid-column: span 2;
      }
    }
  }

// MORE CODE
```

## Pagination
* Remove previous and next words on phones

`Pagination.js`

```
// MORE CODE

>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; <span className="word">Prev</span>
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          key={`page-${i}`}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        <span className="word">Next</span> &#8594;{' '}
      </Link>
    </PaginationStyles>

// MORE CODE
```

* But since we are hiding the word `previous` and `next` we need to make them accessible and we do that with the `title` attribute

```
// MORE CODE

    <PaginationStyles>
      <Link title="Previous Page" disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; <span className="word">Prev</span>
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          key={`page-${i}`}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link title="Next Page" disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        <span className="word">Next</span> &#8594;{' '}
      </Link>
    </PaginationStyles>

// MORE CODE
```

* Add our class that will hide the word on 800px or less

```
// MORE CODE

    @media (max-width: 800px) {
      .word {
        display: none;
      }
    }
  `;

  return (
    <PaginationStyles>

// MORE CODE
```

## My error
* I nested PaginationStyle inside my Pagination component and I got a long warning about not doing this so I just moved it outside the component

`Pagination.js` (finished page)

```
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  margin: 2rem 0;
  border: 1px solid var(--grey);
  border-radius: 5px;
  text-align: center;

  & > * {
    flex: 1;
    padding: 1rem;
    border-right: 1px solid var(--grey);
    text-decoration: none;

    &[aria-current],
    &.current {
      color: var(--red);
    }

    &[disabled] {
      color: var(--grey);
      pointer-events: none;
    }
  }

  @media (max-width: 800px) {
    .word {
      display: none;
    }

    font-size: 1.4rem;
  }
`;

export default function Pagination({ pageSize, totalCount, currentPage, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  // console.log({ currentPage, nextPage, prevPage });
  // did we reach last page?
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  console.clear();
  // console.log({ hasPrevPage, hasNextPage });

  return (
    <PaginationStyles>
      <Link title="Previous Page" disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; <span className="word">Prev</span>
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          key={`page-${i}`}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link title="Next Page" disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        <span className="word">Next</span> &#8594;{' '}
      </Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  base: PropTypes.string,
};
```

## Chrome vs Firefox
* **FOLLOW UP** The red striped border doesn't work like it does on Firefox

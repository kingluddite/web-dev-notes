# Create reusable pagination component
<!-- MarkdownTOC -->

- [New component](#new-component)
- [Import this component into our slicemasters page](#import-this-component-into-our-slicemasters-page)
- [Fast refresh](#fast-refresh)
- [Unicode for arrows](#unicode-for-arrows)
  - [Left arrow](#left-arrow)
  - [Right arrow](#right-arrow)
  - [Troubleshooting pagination](#troubleshooting-pagination)
- [We can now navigate back and forth with this added:](#we-can-now-navigate-back-and-forth-with-this-added)
- [Array.from\(\)](#arrayfrom)
- [Troubleshoot](#troubleshoot)
- [Quick fix](#quick-fix)
  - [Make this change from this:](#make-this-change-from-this)
  - [To this:](#to-this)
- [But that causes a problem](#but-that-causes-a-problem)
  - [So we'll change it to get page size from our environment variable instead](#so-well-change-it-to-get-page-size-from-our-environment-variable-instead)
  - [How to fix the issue](#how-to-fix-the-issue)
- [Disabling behind last page or first page](#disabling-behind-last-page-or-first-page)
- [**cool!** CSS `pointer-events`](#cool-css-pointer-events)
- [Test it out](#test-it-out)
- [Next](#next)

<!-- /MarkdownTOC -->

* We'll make a general use pagination component
* Anytime you use pagination, you'll use this

## New component
`src/components/Pagination.js`

```js
import React from 'react';

export default function Pagination() {
  return (
    <div>
      <p>Pagination!</p>
    </div>
  );
}
```

## Import this component into our slicemasters page
`slicemasters.js`
* **remember** Make sure to import the Pagination component

```js
// MORE CODE

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  console.log(slicemasters);

  return (
    <>
      <Pagination />

// MORE CODE
```

## Fast refresh
* we no longer need that environment variable as it works now
* So Wes' comments are no longer pertinent

## Unicode for arrows
* Pick one:

### Left arrow
* `&#8592;`
* `&#x2190;`
* `&ShortLeftArrow;`

### Right arrow
* `&#8594;`
* `&#x2192;`
* `&rightArrow;`

### Troubleshooting pagination
`gatsby-node.js`

* Make sure this is correct

```js
// MORE CODE

  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      // What is the URL for this new page??
      path: `slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template when we create it
      context: {
        skip: i * pageSize, // how many people should we skip? (if we are querying 4 slicemasters but we are on page 2, we need to tell it give me 4 but skip the first 4)
        currentPage: i + 1,
        pageSize,
      },
    });

// MORE CODE
```

* And I log out the numbers and click prevPage link to make sure it is working as expected

```js
// MORE CODE

export default function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  console.log({ currentPage, nextPage, prevPage });
  return (
    <div>
      <Link to={`${base}/${prevPage}`}>&#x2B05; Prev</Link>
    </div>
  );
}

// MORE CODE
```

* There is an error when it goes to page 0 (we'll fix this)

## We can now navigate back and forth with this added:
```js
// MORE CODE

    <div>
      <Link to={`${base}/${prevPage}`}>&#8592; Prev</Link>
      <Link to={`${base}/${nextPage}`}>Next &#8594; </Link>
    </div>

// MORE CODE
```

* We want to check for page 0 and last page
    - This won't work yet
    - Putting disabled on a (or Link) doesn't do anything
        + They only work on buttons
        + But we will make them work
* We should show or hide the navigation too as an option
    - Not the best option because it moves the navigation and makes it less user friendly
    - Better to disable the buttons on click

```js
// MORE CODE

  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  console.log({ hasPrevPage, hasNextPage });
  return (
    <div>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; Prev
      </Link>
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next &#8594;{' '}
      </Link>
    </div>
  );
}

// MORE CODE
```

## Array.from()
* Array.from() also accepts a second argument which is a map function
* So both ways work

```
// MORE CODE

  return (
    <div>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link to={`${base}/${i + 1}`}>{i + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next &#8594;{' '}
      </Link>
    </div>
  );
}

// MORE CODE
```

## Troubleshoot
* Our totalCount was wrong and had to fix this in slicemasters.js
* We were pointing it to `slicemasters.totalCount` and needed to go one level higher

```js
// MORE CODE

      <Pagination
        pageSize={pageContext.pageSize}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />

// MORE CODE
```

## Quick fix
* We want when we click on 1 of pages to go to `/slicemasters` not `/slicemasters/1`

### Make this change from this:

```js
// MORE CODE

      {Array.from({ length: totalPages }).map((_, i) => (
        <Link to={`${base}/${i + 1}`}>{i + 1}</Link>
      ))}

// MORE CODE
```

### To this:
```js
// MORE CODE

      {Array.from({ length: totalPages }).map((_, i) => (
       <Link to={`${base}/${i > 0 ? i + 1 : ''}`}>{i + 1}</Link>
      ))}

// MORE CODE
```

## But that causes a problem
* Because when we go to slicemasters, totalPages doesn't equal anything
    - This is because our pageSize gets passed in via pageContext

```js
// MORE CODE

      <Pagination
        pageSize={pageContext.pageSize}

// MORE CODE
```

* But when you got to page `/slicemasters` that page is not being generated by `gatsby-node.js` that page is generated by simply bring in the `pages` folder in gatsby

### So we'll change it to get page size from our environment variable instead
```js
// MORE CODE

      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />

// MORE CODE
```

* Warning if you forget to parseInt the environment variable you'll get this error:

```
Warning: Failed prop type: Invalid prop `pageSize` of type `string` supplied to `Pagination`, expected `number`.
```

* Get rid of key error in Pagination

```js
// MORE CODE

      {Array.from({ length: totalPages }).map((_, i) => (
        <Link key={i} to={`${base}/${i > 0 ? i + 1 : ''}`}>
          {i + 1}
        </Link>
      ))}

// MORE CODE
```

* The Pagination is functional and now we'll style it

`Pagination.js`

```js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

export default function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  // console.log({ currentPage, nextPage, prevPage });
  // did we reach last page?
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  // console.log({ hasPrevPage, hasNextPage });

  const PaginationStyles = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-items: center;
    border: 1px solid var(--grey);
    margin: 2rem 0;
    border-radius: 5px;
    text-align: center;

    & > * {
      padding: 1rem;
      flex: 1;
      border-right: 1px solid var(--grey);
      text-decoration: none;

      &[aria-current],
      &.current { /* don't forget the preceding & */
        color: var(--red);
      }
    }
  `;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link key={i} to={`${base}/${i > 0 ? i + 1 : ''}`}>
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next &#8594;{' '}
      </Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  skip: PropTypes.number,
  base: PropTypes.string,
};

```

* All good, you click on page and that page is highlighted in pagination
* But is removed when you click on slicemasters page
* This is strange in gatsby because of "trailing slash"

### How to fix the issue
```js
// MORE CODE

<Link className={currentPage === 1 && i === 0 ? 'current' : ''} key={i} to={`${base}/${i > 0 ? i + 1 : ''}`}>
  {i + 1}

// MORE CODE
```

* **solved!** Now the page 1 is highlighted when you click on 1 or slicemasters link

## Disabling behind last page or first page
* We need to add styles 

```js
// MORE CODE

      &[aria-current],
      &.current {
        color: var(--red);
      }

      &[disabled] {
        pointer-events: none;
        color: var(--grey);
      }
    }
  `;

  return (
    <PaginationStyles>

// MORE CODE
```

## **cool!** CSS `pointer-events`
* https://caniuse.com/?search=pointer-events
* Available in most modern browsers
* What are `point-events`?
    - This CSS property, when set to "none" allows elements to not receive hover/click events, instead the event will occur on anything behind it

## Test it out
* On page 1 prev is greyed out
* On page 6 next it greyed out
* On slicemasters page 1 is greyed out

## Next
* When you click on the slicemaster pic you will see them and their bio




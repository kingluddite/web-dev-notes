# Banner categories
## GraphQL
```
query GetAllCategories {
  allMdx {
    distinct(field: frontmatter___category)
  }
}

```

## Code Exporter
* Copy the code and paste into Categories

`components/Categories.js`

* We remove the export because this is not a page
* We need to import `graphql` and `useStaticQuery` from **gatsby**

```
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'

const query = graphql`
  {
    allMdx {
      distinct(field: frontmatter___category)
    }
  }
`

const Categories = () => {
  const {
    allMdx: { distinct },
  } = useStaticQuery(query)
  return (
    <ul className="categories">
      {distinct.map((category, index) => {
        return (
          <li key={index}>
            <Link to={`/${category}`} className="category">
              {category}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Categories
```

## Now we need to render Categories
* So we move to `BannerCategories.js`

```
import React from 'react'
import styled from 'styled-components'
import Categories from '../Categories'
import Title from './Title'

const BannerCategories = () => {
  return (
    <Wrapper>
      <Title title="categories" />
      <Categories />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .category {
    font-size: 1rem;
    color: var(--clr-grey-5);
    text-transform: capitalize;
    display: block;
    padding: 0.5rem 0 0.5rem 1rem;
    letter-spacing: var(--spacing);
    transition: var(--transition);
    border-radius: var(--radius);
  }
  .category:hover {
    background: var(--clr-grey-10);
  }
`
export default BannerCategories
```

* Our Banner is complete

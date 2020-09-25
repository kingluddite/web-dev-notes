# Jobs Query
```
query MyQuery {
  allStrapiJobs(sort: {fields: strapiId, order: DESC}) {
    nodes {
      date
      company
      position
      desc {
        id
        name
      }
      strapiId
    }
  }
}

```

* Then in code exporter just grab the variable and GraphQL
    - Page query
    - Just grab GraphQL in variable

```
// MORE CODE

const query = graphql`
  {
    allStrapiJobs(sort: {fields: strapiId, order: DESC}) {
      nodes {
        date
        company
        position
        desc {
          id
          name
        }
        strapiId
      }
    }
  }
`
// MORE CODE
```

`components/Jobs`

```
import React from "react"
import Title from "./Title"
import { FaAngleDoubleRight } from "react-icons/fa"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"

const query = graphql`
  {
    allStrapiJobs(sort: { fields: strapiId, order: DESC }) {
      nodes {
        date
        company
        position
        desc {
          id
          name
        }
        strapiId
      }
    }
  }
`

const Jobs = () => {
  return <h2>jobs component</h2>
}

export default Jobs
```



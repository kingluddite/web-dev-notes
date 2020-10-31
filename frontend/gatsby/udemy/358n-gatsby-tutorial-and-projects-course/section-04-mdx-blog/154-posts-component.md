# Posts component
* We'll destructor our data and load in our Posts component
* The Posts component is a "dummy" component
    - It just takes in the data and renders it

## Destructure posts
* We look for nodes and give it an alias of posts

```
// MORE CODE

const IndexPage = ({data}) => {
  const {allMdx: {nodes: posts}} = data;

  return (
    <Layout>
      <Hero showPerson />
    </Layout>
  )
}

// MORE CODE
```

### Bring in posts component
* And pass two props

```
// MORE CODE

import Posts from '../components/Posts'
// import { graphql } from 'gatsby'
// import SEO from '../components/SEO'

const IndexPage = ({data}) => {
  const {allMdx: {nodes: posts}} = data;

  return (
    <Layout>
      <Hero showPerson />
      <Posts posts={posts} title="recently published" />
    </Layout>
  )
}

// MORE CODE
```

## index.js
* Inside the Posts folder we use our `index.js` file to make referencing files easier

`Posts/index.js`

```
import React from 'react'
import Post from './Post'
import Banner from '../Banner'
const Posts = ({ posts, title }) => {
  return (
    <section className="posts">
      <h3 className="posts-title">{title}</h3>
      <div className="posts-center">
        {/* posts column */}
        <article>
          {posts.map(post => {
            return <Post key={post.id} {...post} />
          })}
        </article>
        {/* banner column */}
        <article>
          <Banner />
        </article>
      </div>
    </section>
  )
}

export default Posts
```


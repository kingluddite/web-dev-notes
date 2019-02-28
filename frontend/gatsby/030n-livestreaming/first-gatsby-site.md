# First Gatsby Site

`$ gatsby new first-gatsby-site`

## View site in browser
`$ gatsby develop`

## folder structure
### `gatsby-config.js`

* Where you set things up in gatsby
* `sitemetadata`
    - Put things like:
        + site `title`
        + could put your menu links
* `plugins`
    - By default starter gives us
        + React Helmet (lets us control the HTML meta tags, twitter share tags, title tags)
        + Add a manifest and offline plugin for offline support
            * Gives you progressive web app 100% score in lighthouse

### `src` folder
* `pages`
    - `pages/index.js` (homepage)
    - `{ Link }` from `gatsby`
        + Takes place of anchor link when you are linking locally
            * When you are linking between pages we can preload the code that is going to be shown and makes sure we don't reload the browser so it feels instant

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: `Code Store`,
    description: `We have lots of code`,
    author: `@kingludd`,
    rank: `rockstar`,
  },

// MORE CODE
```

* Modify your config to look like above
* If you check out playground you won't see it:

`http://localhost:8000/___graphql`

```
{
  site {
    siteMetadata {
      title
    }
  }
}
```

* The Docs help in playground
* Click Query > site (click siteSiteMetadataInputObject_2)
    - Shows you what you have access to
    - Since you changed the config you need to stop and re start gatsby with:
        + ctrl + c (stop gatsby)
        + `$ gatsby develop` (re-run gatsby)
* **tip** Think about writing GraphQL is like writing a JavaScript object but without putting values in it
* **tip** `cmd` + `click` **siteMetadata** in GraphQL playground and it will take you to that spot in the docs
* Make sure to refresh playground after stopping and starting Gatsby to see new field of `rank`

```
{
  site {
    siteMetadata {
      title
      rank
    }
  }
}
```

* Will give you this data output:

```
// MORE CODE

{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "Code Store",
        "rank": "rockstar"
      }
    }
  }
}
// MORE CODE
```

* Now we can show this data somewhere

## Add GraphQL query to our index.js page
`pages/index.js`

```
import React from 'react'
import { Link, graphql } from 'gatsby'; // this line was updated by VS Code!

// MORE CODE

export default IndexPage
export const query=graphql

// MORE CODE
```

* **tip** VS Code will auto import graphql at top of file!

## Now we'll add a tagged template literal
* Effectively what we are saying is the text that we are about to create is tagged by this GraphQL helper

`pages/index.js`

```
// MORE CODE

export const query=graphql`

`
```

* And then you copy the GraphQL query you wrote and tested in Playground and paste it into your backtick

```
// MORE CODE

export const query=graphql`
{
  site {
    siteMetadata {
      title
      rank
    }
  }
}
`
```

* What happens when you export this GraphQL query is we are going to run that and then give it back to your React component as a prop
    - And it will come in as a `data` prop
* **note** Every React component gets one data argument called `props`
    - So we can either:
        + Get **props** then do `props.data`
        + Or we can destructure

## We will destructure to get `data`

```
// MORE CODE

import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>

// MORE CODE
```

* And this is how we will get the data we want

```
// MORE CODE

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>I like coding</h1>
    <p>{data.site.siteMetadata.rank}</p>

// MORE CODE
```

* Not that our GraphQL `data` is the whole query and to get the data we want we follow the object down like:

```
// MORE CODE

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        rank
      }
    }
  }
`
```

* So to "follow the object down" we `data.site.siteMetadata.rank`

## View your homepage
* You will see that you output `rockstar`

## What is Layout?
* The cool thing about React is that you have the ability to do component based architecture which means that your components are reusable and composible
* So a Layout is a way to create a kind of "site wrapper"
    - So our Layout has:
        + Header (the purple bar)
        + Div with a max-width
            * We center a div on the page `margin: 0 auto`
            * We give it a max-width of 960 so the content doesn't overflow
            * And we put all the contents of the layout inside our `<main>` that is inside the `div`
        + main content holds `children` (children is the actual content of the pages)
        + Footer

### Then checkout the Index page
* Everything inside the `<Layout>` tags React has a special handler called `children`
* So anything that goes in the layout we can display anywhere we want inside `<Layout>` using `children`

### Benefits of Layout
* Helps us define our website once
* The Header main footer can be defined in one place and then reused in all of the pages throughout the site

## Add a footer
`components/footer.js`

```
import React from 'react'

const Footer = () => <footer>© {new Date().getFullYear()}</footer>

export default Footer
```

* This is a stateless functional component
* We have an implicit return because we are not using any logic

### Import footer and use an instance of the component in `index.js`

`index.js`

```
// MORE CODE

          <main>{children}</main>
          <Footer />
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
```

* We will use CSS modules and style our footer

`components/footer.module.css`

```
.footer {
  max-width: 960px;
  margin: 20px auto;
  color: red;
}
```

`components/footer.js`

```
import React from 'react'
import styles from './footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>© {new Date().getFullYear()}</footer>
)

export default Footer
```

* What is happening with css modules
* We have a `.footer` inside `footer.module.css`
* What CSS modules does is it imports that file and then turns it into a JavaScript object where all of the class names match
* Then you can use it as styles and then what is done under the hood is we make sure that things don't collide
    - example of collision:
        + A `title` in the footer and a `title` in the blog post

### Open page in dev tools to see how css modules names the class
`<footer class="footer-module--footer--2r2aa">© 2019</footer>`

* This makes the name unique so it will not collide with other class names
* This allows you to write simple class names without worrying about them colliding with other simple class names later on
    - gone are the days of `title1`, `title2`, `title3`

## Responsive footer
* Font color will be blue on small screens
* Font color will be red on larger screens (> 600px)

`footer.module.css`

```
.footer {
  max-width: 960px;
  margin: 20px auto;
  color: red;
}

@media(min-width: 600px) {
  .footer {
  color: blue
  }
}
```

## Pros and Cons of Styled components (one of the CSS and JS solutions)
* Pros
    - One Config file
    - My breakpoints are 450px and 750px and 1200px
    - My site colors are this
    - The upside to this is that it is defined in one place and it is reusable
* Cons
    - You then have to import that config file everywhere and reference it and this means it will get a little more complicated to track what is happening in the CSS
    - You wouldn't be able to use a JavaScript config file in our example because you would need to define variables and you would have to import those variable files into each CSS file and it can get a little out of control

## With CSS modules
* Pros
    - It is very declarative
    - We know exactly where it is
* Cons
    - After you've written 50 components, if all 50 components have a min-with: 50px breakpoint and you decide that needs to change you need to change it in all 50 files

## Gatsby and Netlify
* Gatsby will generate static assets
* Netlify is a free great way to host static assets

## Deploy Gatsby to Netlify
* need a github and netlify account (free)
* git add and commit locally
* hub create to create remote origin on github
* push it to github
* create a new site on netlify, use github and authorize and deploy with default settings (it really is that simple)

## Add a blog
* Need to add our first plugin

`$ yarn add gatsby-source-filesystem gatsby-transformer-remark`

* gatsby-transformer-remark
    - This is what transforms markdown into HTML for us

## Plugin options
* Every gatsby config option has a shorthand
* If you need to provide options than you will have a resolve property 

`gatsby-config.js`

```
// MORE CODE

    {
      resolve: `gatsby-source-filesystem`,
      options: {name: `blog`, path: `${__dirname}/src/posts/`}
    }
    `gatsby-transformer-sharp`,

// MORE CODE
```

* `__dirname`
    - Whatever folder gatsby-config is in, `__dirname` references that
    - we decide where we want to put our blog posts inside so we just name the folder what we want, I'll name it `posts`
    - **note** Make sure to add a trailing slash!

## Now add gatsby-transformer-remark

```
// MORE CODE

    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `blog`, path: `${__dirname}/src/posts/` },
    },
    `gatsby-transformer-remark`,

// MORE CODE
```

* Create a blog post
* Create a posts folder `src/posts`

## Frontmatter in markdown
* frontmatter is in a format called yaml (yet another markup language)
* no quotes needed
* 3 hyphens

`src/posts/post-1.md`

```
---
title: This is my first post
----
```

* Above is how you define your meta data for your post in frontmatter
* Stuff that is not the content but relevant to the post
* Save
* Restart gatsby

## Check graphql
```
{
    file
}
```

* Cmd click file and it will take you to that in the docs
* relative path

```
{
  file(relativePath: )
}
```

Click on `relativePath` in Docs and you'll see the arguments we can use
* note: strings are ALWAYS double quotes in GraphQL!!!

## Query allFile
* This will let us know what is in there
* This will show what it is seeing as path
* This is returning `null`

```
{
  file(relativePath: {eq: "src/posts/post-1.md"}) {
    absolutePath
  }
}
```

* **tip** command + `/` comments out lines in GraphQL playground
* Comment out entire query but leave first and last lines uncommented

```
{
#   file(relativePath: {eq: "src/posts/post-1.md"}) {
#     absolutePath
  allFile{
    edges {
      node {
        relativePath
      }
    }
  }
  }
```

* If you use prettier it removes comments in GraphQL playground
* cmd + click to see allFile

## Some Graph Theory
* When you are looking at data in a graph they refer to a specific entity as a node (like the `page` or `file` are considered `nodes`)
    - the connections between those nodes are considered `edges`
* allFile > edges > node > relativePath

## The reason is in our config we already told it the relative path was `src/posts/post-1.md` and `__dirname` is pointing to that folder so this is what we need for the correct path in our query

```
{
  file(relativePath: {eq: "post-1.md"}) {
    absolutePath
  }
}
```

* Will give you this output

```
{
  "data": {
    "file": {
      "absolutePath": "/Users/philiphowley/Documents/dev/gatsby-stuff/livestreaming/fun-gatsby-site/src/posts/post-1.md"
    }
  }
}
```

* Now we want to get the actual markdown out
    - To do this we'll use `childMardownRemark`
    - Click on it in docs to see what we have access to

```
{
  file(relativePath: {eq: "post-1.md"}) {
    childMarkdownRemark {
      html
      frontmatter {
        title
      }
    }
  }
}

```

* Outputs

```
{
  "data": {
    "file": {
      "childMarkdownRemark": {
        "html": "<h1>This is my first blog post!</h1>\n<ul>\n<li>It is cool</li>\n<li>It is fun</li>\n<li>It is neat</li>\n<li>It is groovy</li>\n</ul>",
        "frontmatter": {
          "title": "My first blog post!"
        }
      }
    }
  }
}
```

## Create our template
`src/templates/post.js`

```
import React from 'react';
import { graphql } from 'gatsby';

const Post = ({data}) => (
  <div>
    <h1></h1>
    <div>
    </div>
  </div>
)

export default Post;
export const query=graphql`
query($filename: String){
  file(relativePath: {eq: $filename}) {
    childMarkdownRemark {
      html
      frontmatter {
        title
      }
    }
  }
}
`;
```

* Test our our dynamic GraphQL query in GraphQL playground

```
query($filename: String){
  file(relativePath: {eq: $filename}) {
    childMarkdownRemark {
      html
      frontmatter {
        title
      }
    }
  }
}
```

And update the query variables

```
{
  "filename": "post-1.md"
}
```

* And you can test and see that it works

`templates/post.js`

```
import React from 'react'
import { graphql } from 'gatsby'

const Post = ({ data }) => (
  <div>
    <h1>{data.file.childMarkdownRemark.frontmatter.title}</h1>
   <div dangerouslySetInnerHTML={{__html:data.file.childMarkdownRemark.html}}>
  </div>
)

export default Post
export const query = graphql`
query($filename: String){
  file(relativePath: {eq: $filename}) {
    childMarkdownRemark {
      html
      frontmatter {
        title
      }
    }
  }
}
`
```

* html is special
    - React doesn't like plain HTML
    - We have to break the React rules and use `dangerouslySetInnerHTML`


## Now that we have this template we can use it to dynamically load content
* gatsby-node.js
    - Now we will write some node code

`gatsby-node.js`

```
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(``)
}
```

* Now in Playground

```
{
  allFile {
    edges {
      node {
        relativePath
        name
      }
    }
  }
}
```

* Name will give us the name of our file
* And we can use `name` for the `slug` of our pages

* output

```
{
  "data": {
    "allFile": {
      "edges": [
        {
          "node": {
            "relativePath": "gatsby-icon.png",
            "name": "gatsby-icon"
          }
        },
        {
          "node": {
            "relativePath": "gatsby-astronaut.png",
            "name": "gatsby-astronaut"
          }
        },
        {
          "node": {
            "relativePath": "post-1.md",
            "name": "post-1"
          }
        }
      ]
    }
  }
}
```

* Copy our GraphQL from playground and put inside our node backticks

```
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
  allFile {
    edges {
      node {
        relativePath
        name
      }
    }
  }
}
    `)
}
```

* What that is giving us is now we are going to have an object in results
* and have our pages and that will be stored in `result.data` (just like it is in the other places where we run those queries)

## Better to rename filename as relativePath
`src/templates/post.js`

```
import React from 'react'
import { graphql } from 'gatsby'

const Post = ({ data }) => (
  <div>
    <h1>{data.file.childMarkdownRemark.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{__html:data.file.childMarkdownRemark.html}}></div>
  </div>
)

export default Post
export const query = graphql`
query($relativePath : String){
  file(relativePath: {eq: $relativePath}) {
    childMarkdownRemark {
      html
      frontmatter {
        title
      }
    }
  }
}
`
```

`gatsby-node.js`

```
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allFile {
        edges {
          node {
            relativePath
            name
          }
        }
      }
    }
  `)
  result.data.allFile.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.name,
      component: require.resolve('./src/templates/post.js'),
      context: { relativePath: node.relativePath },
    })
  })
}

```

* This should generate a post from our template for us (create a new page dynamically!)
* Re-run gatsby!

## Visit new post!
`http://localhost:8000/post-1`

![first blog](https://i.imgur.com/CnNna96.png)

* Add another post
* name it post-2.md
* Alter the content slightly
* Visit `http://localhost:8000/post-2`
* Now all blog posts can be created without any changes

## Style blog post
`templates/post.js`

```
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Post = ({ data }) => (
  <Layout>
    <h1>{data.file.childMarkdownRemark.frontmatter.title}</h1>
    <div
      dangerouslySetInnerHTML={{ __html: data.file.childMarkdownRemark.html }}
    />
  </Layout>
)

export default Post
export const query = graphql`
  query($relativePath: String) {
    file(relativePath: { eq: $relativePath }) {
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
  }
`
```

* Preference - keep components where the styles live
* That way your pages and templates don't have styles in them they just import components

## Add dynamic links on home page of new blog posts
`index.js`

```
import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>I like coding</h1>
    <p>{data.site.siteMetadata.rank}</p>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
export const query = graphql`
  {
    site {
      siteMetadata {
        title
        rank
      }
    }
    allFile {
      edges {
        node {
          relativePath
          name
        }
      }
    }
  }
`
```

* When you test GraphQL use full query so you know it works

## Problems
I had images that were also being found but they had null as frontmatter so my code broke
I added this to my index (filter for .md files) and my code works

```
import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>I like coding</h1>
    <p>{data.site.siteMetadata.rank}</p>
    <p>Welcome to your new Gatsby site.</p>
    <ul>
      {data.allFile.edges.map(({ node }) => (
        <li key={node.name}>
          <Link to={node.name}>
            {node.childMarkdownRemark.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
export const query = graphql`
  {
    site {
      siteMetadata {
        title
        rank
      }
    }
    allFile(filter: { ext: { eq: ".md" } }) {
      edges {
        node {
          relativePath
          name
          childMarkdownRemark {
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`
```






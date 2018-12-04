# Context in Page Queries
* Our data is coming in via:

`data.markdownRemark.html`
`data.markdownRemark.frontmatter.title`
`data.markdownRemark.frontmatter.date`
`data.markdownRemark.frontmatter.slug`

`postLayout.js`

```
// MORE CODE

class postLayout extends Component {
  render () {
    const { markdownRemark } = this.props.data

    return (
      <Layout>
        <h2>{markdownRemark.frontmatter.title}</h2>
      </Layout>
    )
  }
}

// MORE CODE
```

* Browse to `http://localhost:8000/post/first-post`
    - We still see `The Third Post`
    - We'll fix this using the **context**

## Working with the `context`
* If you are using to working in GraphQL already you might have an idea how to do this
* This solution is a bit Gatsby-esque and in some ways it is very GraphQL
* We can pass tell our query what arguments it can accept
    - We define arguments with a `$` like `$slug`
    - And we also want to tell it what **type** it is (it is a String)
        + If we also have an exclamation point at the end like `String!` that slug needs to be a String and is required

```
export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`

// MORE CODE
```

* What the above code does for us is it gives us access to the `$slug` in our arguments we use in our GraphQL like:

```
// MORE CODE

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: "/third-post" } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`

// MORE CODE
```

* Now we can use that `$slug`

```
// MORE CODE

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`
```

* Click on the archive links and you'll see that the links are working and the correct title is used on each page

## Note on difference between Apollo and Gatsby with the above example:
* In Apollo you would have to physically pass in the `$slug`
* Gatsby is its own system with a little bit of **magic**
    - We set the context and in it we set the slug to be grabbed from node.frontmatter.slug and that will automatically pass it in as long as we have a parameter that's looking with the same name
        + If you used a different name like `path` or something it would not work
        + So in `gatsby-node.js` we use `slug` and that matches with `$slug` in `postLayout.js`

## Now we'll output the `html`
* dangerouslySetInnerHTML (we use all the time and just lets you know there are some security issues here and in this particular instance there is none)
    - We set `dangerouslySetInnerHTML` to an object and inside we have a property of __html and we set it to the value of our query html `markdownRemark.html`

`postLayout.js`

```
// MORE CODE

class postLayout extends Component {
  render () {
    const { markdownRemark } = this.props.data

    return (
      <Layout>
        <h2>{markdownRemark.frontmatter.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </Layout>
    )
  }
}

// MORE CODE
```

* View the page in the browser
* We now have our HTML showing 

## Intro to GraphQL
* One of core elements for working in Gatsby
* GraphQL is alterative to REST
    - Instead of using a fetch to an API endpoint we just use a Query

## Test GraphQL
`http://localhost:8000/___graphql`

* Great way of testing your GraphQL queries before you run them in your app
    - You want to make sure that the data is what you are expecting before you write any code
    - Good workflow is:
        1. Write test query
        2. Test it out
        3. If it doesn't work fix it
        4. When it works, paste GraphQL into your app code

### Working with GraphQL
* Clear out GraphQL comments
* All GraphQL is inside `{}`
    - Good practice to name your queries
    - We need to play around with data and Gatsby gives us some things to play around with
    - GraphQL is self documenting

```
{
    site {

    }
}
```

* Hover over `site` and you will see it becomes a hyperlink
* Click and you will see the documentation

```
{
  site {
    siteMetadata {
      title
    }
  }
}
```

* Click play and you will see your title

## Where does the data come from?
`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
// MORE CODE
```

* Update the title, save and watch the app update in real time
    - We will use the same technique to pull data from blogposts, markdown files... lots of various sources

## How do I make a GraphQL query?
* Just ask for the things available, click play and the output will show the result of that query
    - We may say give me all markdown posts
        + They may return an array
            * We may want the title from one or all of the posts in that array

## Can I update the `gatsby-config.js` with new properties and will it update
* Add this:

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'My Porfolio',
    description:
      'This is a sentence that describes my portfolio',
  },
// MORE CODE
```

### Update your GraphQL
```
{
  site {
    siteMetadata {
      title
      description
    }
  }
}
```

* Click play

## Houston we have a problem
* We will not see our change to our local API in `gatsby-config.js` until we stop and re-start gatsby in development mode

`ctrl` + `c` and then `$ gatsby develop`

* Refresh GraphQL sandbox in browser
* Click play again
* It works and shows us our newly added `description` property

## Next - How do we get our GraphQL sandbox output into our React component?
* GraphQL Static Queries

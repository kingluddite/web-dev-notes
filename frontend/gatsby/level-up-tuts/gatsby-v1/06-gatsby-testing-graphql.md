# Testing Graphql
* wrote our post in markdown
* and put our path in top of frontmatter

## How can we have an index page?
* Currently we just arrive at our blog post by manually typing it into the address bar
* There needs to be a better way

## Challenge
* find the post and iterate over it

## graphql debugger `http://localhost:8000/___graphql`
* Gives you an editor to write queries

```
{
  allMarkdownRemark(limit: 1000) {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```

* Will get an error "can't query fields on type MarkdownRemark"

```
{
  allMarkdownRemark(limit: 10) {
    edges {
      node {
        frontmatter {
          title
        }
      }
    }
  }
}
```

If we add another post
change the info

and run the query it will show two blog posts
prettier to make it nice
history to go back in time

## add the path
```
{
  allMarkdownRemark(limit: 1000) {
    edges {
      node {
        frontmatter {
          title
          path
        }
      }
    }
  }
}
```

## change from 1000 to 10
* limits how many posts you see

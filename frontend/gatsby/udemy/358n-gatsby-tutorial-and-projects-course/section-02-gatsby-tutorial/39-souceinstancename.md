# sourceInstanceName
* The importance of the `name` property when setting up the `gatsby-source-filesystem`

## create a new folder
`src/posts`

* Create two files inside `posts`
    - post.txt
    - post-2.txt

## million dollar question
* Are you sourcing those files if you have this setup?
    - No

`gatsby-config.js`

```
// MORE CODE

 {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
// MORE CODE
```

* How could we access all files?
    - We could omit `images` in the path and just point to `src`
    - Technically this is a correct solution to the question
        + But this would give us too many files
        + And if you needed to just get a single image you would need to do a ton of filtering to get it
    - A better solution - setting up another instance of our `gatsby-source-filesystem`

### Test it out
* Update file

`gatsby-config.js`

```
// MORE CODE

 {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
     {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
// MORE CODE
```

* **IMPORTANT** Restart server

## Set up in Explorer
* allFile
    - Will show all files (7)
* Show only posts
    - Need to set up a filter
    - Use `sourceInstanceName` eq to `posts`

`allFile`

* Will give you 7 files

```
query MyQuery {
  allFile {
    nodes {
      absolutePath
      size
    }
  }
}
```

* Just our new files

```
query MyQuery {
  allFile(filter: {sourceInstanceName: {eq: "posts"}}) {
    nodes {
      absolutePath
      size
    }
  }
}
```

* Will only show you our empty text files

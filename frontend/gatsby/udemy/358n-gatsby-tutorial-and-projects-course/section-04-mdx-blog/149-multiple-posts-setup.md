# Multiple Posts setup
## Since we need to access a new folder we need to add a new filesystem to gatsby-config

## Multiple Posts

1. Setup Posts Folder (can be named whatever you want)
    * The name of the file doesn't matter as gatsby will creating posts for all mdx files inside `posts` folder
2. Add New filesystem Instance to gatsby-config

```js
 // MORE CODE
{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    // MORE CODE
```

4. Create a Brand New Folder For Post
   Won't Query Name - setup is up to you
5. Add mdx file
6. DOUBLE CHECK PATHS (../../ - gotcha)
7. Run `$ gatsby clean` - just to be on the safe side
    * This helps prevent any lame `cache` error
8. Separate Images Folder
    * This helps keep paths short to images for that post
9. FrontMatter (space gotcha - title: first post)
    * This comes first (AND THEN IMPORTS!)
10. Imports after FrontMatter

## Now let's build our posts
* Move link to bottom

### Create new post
* New folder `10-post-number-ten`
    - New `images` folder
    - New `index.mdx` file
* We need to change the path because it is now `../../components/Complete`
* We don't need `section` as we'll build that in our template
* All the posts have a link back to all posts

### Clean
`$ gatsby clean && gatsby develop`

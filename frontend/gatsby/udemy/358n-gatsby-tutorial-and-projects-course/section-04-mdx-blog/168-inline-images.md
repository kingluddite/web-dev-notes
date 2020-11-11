# MDX - Inline Images
* To add an image in markdown

```
![alt text](image.jpg)
```

* Let's add an inline image to our post

## post 10
```
// MORE CODE
<LikeButton />

![nice image](./images/js-3.png)

<Link to="/posts" className="btn center-btn">
  all posts
</Link>
```

* We need to regenerate this page by running gatsby again (this page hasn't been programmatically created yet)

`$ gatsby clean && gatsby develop`

* If you try to view the image it will be broken in the page
* **tip** putting images write next to the post makes it very easy to path to

## Why can't we see inline images with MDX?
* When working with MDX and inline images we need to do more stuff to see the inline image

### Read the gatsby plugin MDX
* This plugin docs changes a lot so keep reading it for updates
* [docs for gatsby plugin MDX](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=mdx)

#### Scroll to Gatsby remark plugins
* [docs](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=mdx#gatsby-remark-plugins)
* It enables the use of remark plugins for processing MDX content

`gatsby-config.js`

* We'll need to install `gatsby-remark-images`

`$ npm install gatsby-remark-images gatsby-plugin-sharp`

```
// MORE CODE

module.exports = {
  plugins: [
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
  ],
}
// MORE CODE
```

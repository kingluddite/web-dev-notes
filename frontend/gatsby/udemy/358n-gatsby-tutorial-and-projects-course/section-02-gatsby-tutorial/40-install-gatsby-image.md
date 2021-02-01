# Install gatsby-image
* [plugin in docs](https://www.gatsbyjs.org/packages/gatsby-image/?=gatsby-image)

## Install gatsby-image
* We need to install 3 things

`$ npm i gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp`

* `gatsby-image` will provide a component where we'll pass the data we get back from the query (ie the image we want optimized) and then we'll have our optimizations
    - But behind the scenes
        + `gatsby-transformer-sharp` and `gatsby-plugin-sharp` will do all the hard work
            * `gatsby-transformer-sharp` does the most work
* We don't need to include gatsby-image inside our config but we will need to add the other two like this:

`gatsby-config.js`

```
// MORE CODE

  plugins: [
    'gatsby-plugin-eslint',
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

// MORE CODE
```



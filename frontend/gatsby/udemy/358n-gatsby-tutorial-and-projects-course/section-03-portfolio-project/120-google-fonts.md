# Including Google Fonts in a Gatsby project
* We could add them in the main CSS

`css/main.css`

```
/*
===============
Fonts
===============
*/
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto:400,700&display=swap");
```

* We could add them in the `head` part of our document
    - Using `helmet`

## Problems of loading google fonts
* If we add in head or in main.css and have a slow connection we could have problems loading our fonts

### Solution `gatsby-plugin-prefectch-google-fonts`
* Add a plugin 
* [docs](https://www.gatsbyjs.com/plugins/gatsby-plugin-prefetch-google-fonts/?=gatsby-plugin-pre)
* Install

`$ npm install --save gatsby-plugin-prefetch-google-fonts`

* It saved a big load by pre-fetching google fonts
* After installing setup the config

`gatsby-config.js`

```
// MORE CODE
{
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`400`, `700`],
          },
          {
            family: `Open Sans`,
          },
        ],
      },
    },
  ],
}
```

## Comment out
`main.css`

```
/*
===============
Fonts
===============
*/
/* @import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto:400,700&display=swap"); */
// MORE CODE
```

## Restart gatsby
`ctrl` + `c`

`$ gatsby develop`

* Now I am prefetching my fonts instead of waiting for them to load

## Benefit
* This will be a better UX for users who have a slower connection

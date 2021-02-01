https://github.com/gatsbyjs/gatsby/issues/27607

Remove google prefetch

It [appears this plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-prefetch-google-fonts/) is deprecated (doesn't say on gatsby plugin site but people are saying it is deprecated online)

solution
* install gatsby-plugin-preload-fonts
* why do we need to prefetch fonts (there is a split second time when the site loads and the fonts come up - so it creates a design hinderence for a split second (i think this is what caused the glitch in the fonts large and then small when page loads))

Use this plugin - https://www.gatsbyjs.com/plugins/gatsby-plugin-preload-fonts/ for gatsby and this is better as it works with google fonts, adobe fonts...

1. add to packagon.json

```
{
  "scripts": {
    "preload-fonts": "gatsby-preload-fonts"
  }
}
```

remove google fetch plugin and add gatsby-plugin-preload-fonts to gatsby-config.js

Then you need to start up gatsby dev server and then run `$ npm run preload-fonts` in a separte window

if you have no routes you don't need to do this
it will go through typekit/google fonts... and scrape which fonts you are using and write into the cache what to preload

* Added this to Global Styles styled-components

```
*
=============== 
Google Fonts
===============
*/
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

/*
=============== 
Global Styles
===============
*/
```
* Now when you run gatsby develop and run `$ npm run preload-fonts` in a separte window you'll see our two fonts added to the cache

 

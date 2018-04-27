# Add Plugins and Using Sass

## Plugins
* Mainly
    - help out with static generation
    - bringing in of data
* Search all the plugins
    - [link](https://www.gatsbyjs.org/plugins/)

### Sass plugin
* Stop server, ctrl + c
* Install it
* `$ npm install gatsby-plugin-sass`

### Add the plugin to the config file
`gatsby-config.js`

```js
module.exports = {
  siteMetadata: {
    title: `My Blog2`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`
  ],
}
```

* Inside `layout/index.js` rename line:
`import './index.css'` to `import './index.scss'`
* Rename file in `layouts/` to `index.scss`

## Start server again
`$ gatsby develop`

* If we didn't restart the server we would get an error
* So any time you add a plugin, you must restart the server for the changes to take effect

## Test if sass is working
`index.scss`

```
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
/* add the code below */
body {
  margin: 0;
  background-color: black;
  p {
    color: white;
  }
}
// MORE CODE
```

* You will see the bg is black and the font color is white


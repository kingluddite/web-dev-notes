# MDX Wrapper Intro
* We'll wrap our whole gastby implementation inside the MDX wrapper and this will enable us to more cool things

## Intercept html elements
* We'll intercept our html and depending on the props we pass we'll return a React component
* We can have one blockquote but if we pass 4 different props we can have 4 different styles

![4 different block quotes](https://i.imgur.com/bNGfOW4.png)

* **note** This is fairly complex to accomplish

## New Concept - How do we wrap our whole Gatsby project?
* We are not talking about the page
* We are not talking about the component
* We are talking about our entire Gatsby application

### How it works in Gatsby
* We have 2 APIs

1. Gatsby Browser API
2. Gatsby SSR API (this is for the server side rendering)

* Currently our gatsby browser is just loading in external CSS

### MDX Wrapper

1. Gatsby wrapRootElement
   [Wrap Root Element ] : https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
2. MDX
   [MDX Reference] : https://mdxjs.com/getting-started
3. Gatsby/MDX Reference
   [ Elements Reference] : https://www.gatsbyjs.org/docs/mdx/customizing-components/

`wrapRootElement` * allow a plugin to wrap the root element

* **note** There is an equivalent hook in Gatsby's SSR API (it is recommended to use both APIs together)
* **important** We will use this function to wrap our whole application (and we'll do that using our MDX Provider)
    - In the docs of Gatsby they use Redux, but we'll use MDX
    - Since it is a node file we'll use `exports`

## Root MDX
    - They are using `node` require syntax, we'll use ES6 imports

* Must name the files
    - `gatsby-browser.js`
    - `gatsby-ssr.js`
* Must be placed in root of project
* We'll alter the docs code to not use `react-redux` but instead wrap with `@mdx-js/react`

`gatsby-browser.js`

```
import './src/css/main.css'

import React from 'react'
import { MDXProvider } from '@mdx-js/react'

export const wrapRootElement = ({ element }) => {
  return <MDXProvider>{element}</MDXProvider>
}
```

* And we need to do the same thing in `gatsby-ssr.js`
* But because we are working with the MDXProvider the key thing is we'll have an object which we'll set as a prop on that MDXProvider and this is where we'll do most of our job
    - We'll set up all of our logic in the `components` prop

## We need to paste our code in `gatsby-browser.js` into `gatsby-ssr.js` but everytime we change to we have to copy and paste from one to the other file?
* It there an easier way?
* Yes!
    - **BETTER WAY** Let's set up a separate file where I would just have my function and also the object and then just import the function in both files
        + We'll do that by creating our separate file called `root-mdx.js` in the root of our app

## root-mdx.js
### wrapRootElement is an important name!
* It is important to name `wrapRootElement` as your variable in both `gatsby-browser.js` and `gatsby-ssr.js`

`root-mdx.js`

```
import React from 'react'
import { MDXProvider } from '@mdx-js/react'

const components = {}

export const wrapMDX = ({ element }) => {
  return <MDXProvider components={components}>{elements}</MDXProvider>
}
```

* And then both `gatsby-browser.js` and `gatsby-ssr.js` will be:

```
import { wrapMDX } from './root-mdx'

export const wrapRootElement = wrapMDX
```

* Stop and restart gatsby

## MDX Example
`pages/post.mdx`

### Goal: send a h3 to MDX and return a span with text

![spans are returned from 2 h3's](https://i.imgur.com/SdpQmPI.png)

### BE CAREFUL
* Because every h3 in your entire app it will return spans!

### - SIDE TIP Find out what gatsby is running
`npx gatsby info --clipboard`

### More resources MDX Wrapper

1. Gatsby wrapRootElement
   [Wrap Root Element ] : https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
2. MDX
   [MDX Reference] : https://mdxjs.com/getting-started
3. Gatsby/MDX Reference
   [ Elements Reference] : https://www.gatsbyjs.org/docs/mdx/customizing-components/




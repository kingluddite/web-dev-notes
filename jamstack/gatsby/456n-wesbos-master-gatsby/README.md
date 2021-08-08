# Review Wes Bos Course
LAST GraphQL Playground on 17 (halfway)
## General Good to knows
* Know difference between Common JS and ES Modules and we are using ES Modules (note the `esm` package and in your scripts of package.json)
  - The docs show `module.exports` (which is Common JS syntax)
  - Node.js has added the ability to use ES Modules
  - It is beneficial to just use one and since everything else is ES modules
* Common JS syntax

```js
module.exports = {
  // common js syntax
}
```

* ES Modules (Node has added ability to use these instead)

```js
export default {
  // ES modules
}
```
* You can't name start functions with numbers (JavaScript rule) so no function 404 for the 404 page use something like `NotFound`
* the `.gitkeep` files are just there so git doesn't autodelete the directory because git deletes empty directories by default
* The difference between `declarative` and `imperative`
  - Using the Link is declarative (_we declare how it works_)
  - Using the Programming link is `imperative` (_You write the code to say what happens_)
* Anytime in React that you put a value into an input YOU MUST ALSO supply an `onChange` handler
* We are using `normalize.css` as our reset
* We are using styled components for our css
  - How we use these GlobalStyles?
      + We stick them in a variable and export them
      + Then we inject them into our `Layout`
      + `styled-components` automatically vendor prefixes your code, so you don't need to do it manually
      + [This option](https://styled-components.com/docs/tooling#better-debugging) enhances the attached CSS class name on each component with richer output to help identify your components in the DOM without React DevTools
      + It also allows you to see the component's `displayName` in React DevTools
        * For example, consider writing a `styled component` that renders a button element, called `MyButton`. It will normally show up in DevTools as `styled.button`, but with the `displayName` option enabled, it has the name you gave it: `MyButton`
      + By default, the displayName of a component will be prefixed with the filename in order to make the component name as unique as possible
      + If components (like our `style components`) are not rendering out any DOM, they are "side effects"
* We put our variables on the `:root` (global) so they are available anywhere I want in the application
* `webp` (_format that works in chrome, firefox (not safari) - it works in some browsers but not all and fall back to other versions if the browser doesn't support_)

## How To a Gatsby Website using Sanity as a Headless CMS Instructions
* We'll have a **root folder** that holds both `sanity` and `gatsby` folders
  - `.git` is inside the root folder that will be the git for both sanity and gatsby

### Gatsby Stuff
* The idea behind Gatsby - At build time (_when we build our website before we deploy it to the internet_) Gatsby goes and grabs all the data it needs in order to run
    - It goes to sanity and grabs all the data/relationships
    - It takes all this data and sticks it (not inside a Database because as soon as its done it disappears) but in its memory and it allows us to query that data via GraphQL queries 
* After installing your gatsby site, you need to `$ rm -rf .git` and just use the root app Git (At one point you need to `$ git init` in the root and make sure to create a `.gitignore`)
* Two ways to use plugins in Gatsby
* Install the gatsby cli globally `$ npm i gatsby-cli -g`
* You start gatsby with `$ npm start` inside gatsby folder
  - This will run both your Gatsby website server on `http://localhost:8000`
  - And it will also run the GraphiQL server on `http://localhost:8000/___graphql`
  - Clean gatsby with `$ gatsby clean`
  - Build Gatsby for production is `$ npm run build`
* Stop Gatsby with <kbd>ctrl</kbd> + <kbd>c</kbd>
* If you change your `.env` you must restart gatsby
* Gatsby's GraphQL GUI is called GraphiQL
* We "surface" the data from our Sanity into our GraphiQL explorer using `gatsby-config.js`
* Gatsby comes with some standard GraphQL queries
    - allDirectory
    - allFile
    - allSite
    - **note** are not very useful for developers (_more for lower level plugin developers_)
* Gatsby allows you to import anything including `images` and `CSS` and Gatsby knows not to render that out to JavaScript but it knows to render it out to CSS or a compressed image or whatever it needs to
* Gatsby does a ton with images - to try and list all it does would be time consuming - the best thing to do is look at the [gatsby-images page](https://www.gatsbyjs.com/plugins/gatsby-plugin-image)
  - cachebusting
* How we use a Local Font and it's advantages [is worth reading](https://www.gatsbyjs.com/docs/recipes/styling-css/#adding-a-local-font)
* The `pages` folder is gatsby special - put your pages in the pages folder
  - Two types of pages
    + file system routing (files in pages folder)
      * no html files but JavaScript that is exported and rendered to the page
      * All of your Gatsby files (with the exception of a couple) are just ECMA script modules (meaning that you can export things from them)
      * Gatsby is assuming that the main export (aka the default export)_from a page will be what is rendered when someone visits that page
* The `static` folder does NOT go through gatsby and if you put stuff in there know that it will no be optimized
  - A good thing to put in the `static` folder is your favicon
* Is a framework for building modern websites
  - packed with all you need: build, routing, data mgt
  - Uses React under the hood
* gatsby is part of the jam stack, runs at build time, is super fast and gets A grade for seo and optimization right out of the box
* If you go to a page that doesn't exist Gatsby by default will render out a 404 page
* If you are building a site with serverless functions you need to have a `netlify.toml` in the root pointing to where your serverless functions are located

`netlify.toml`

```
[build]
  functions = "functions/"
```

#### Style current page in Gatsby is easy
```css
// MORE CODE

  &[aria-current='page'] {
      color: var(--red);
    }
// MORE CODE
```

* And this is what it targets in the HTML

```html
<a href="/" aria-current="page" class="">Hot Now</a>
```

#### How we use Layout
* We save ourselves typing by adding our Layout component in every page without having to add it explicitly to every page
  - Instead we use a special wrap function in our `gatsby-browser.js` (client) and `gatsby-browser.js` (server)

`gatsby-browser.js`

* Cool to use backticks for all your strings

```js
import React from 'react';
import Layout from './src/components/Layout';

import './src/styles/red.css';

export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}
```

### Special Gatsby files
* **note** Any changes to these files you need to (currently) stop and start gatsby

* gatsby-browser.js
* gatsby-config.js
* gatsby-node.js
* gatsby-ssr.js

#### gatsby-config.js
* What does `watchmode` do?
  - It rebuilds when you are in development and make a change to your sanity CMS
it will automatically be updated inside of your Gatsby (you don't have to rebuild the entire thing this gives you a real time editing experience when you are in development mode (which is fantastic!)
* You need to generate a token in Sanity and added it as an environment variable in your `gatsby-source-sanity` plugin

#### gatsby-browser.js
* Specific Gatsby file that allows us to hook into different APIs of Gatsby if we need to
* By default Gatsby won't wrap pages in a component but if we want to we can hook into the `wrapPageElement` Hook and Gatsby will automatically do that for us so we don't have to do it for every page
* [wrapPageElement docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement)
* gatsby-browser.js only run in the browser

`gatsby-browser.js`

```js
const React = require('react');

export function wrapPageElement({ element, props }) {
  return <div>Yo</div>;
}
```

## Sourcing Sanity Data GraphQL intro
### Summary
* You have a sanity GraphiQL API and a Gatsby GraphQL API and they need to work together - specifically the GraphiQL API has to consume the Sanity GraphQL API This is a confusing part to a Headless CMS working with Gatsby so let me give a real world example of how this works

1. I already created by schema in Sanity for the About Us page and I wanted to add an image field
2. I open the `aboutUs.js` schema and added the image but I did not see any `image` in my GraphiQL playground. That is to say, I opened up the `sanityAboutUs` field in Gatsby's GraphiQL and saw `heading` field I created earlier but no `image` field. Gatsby did not see the Sanity GraphQL API. (note: I added the `gatsby-image` plugin to Gatsby and still did not see it). In order to actually see it in the Gatsby GraphiQL I had to deploy the sanity GraphQL by running (inside the `sanity` folder `$ sanity graphql deploy production`)
3. I still won't see that in Gatsby's GraphiQL until I stop Gatsby (inside the `gatsby` folder) and then starting it again with `$ npm start` (inside `gatsby` folder)
4. It is finally at that point that the Gatsby GraphiQL API can see and pull inside it the Sanity GraphQL API

### Sanity Stuff
* [Sanity web site](https://www.sanity.io)
* Know your Sanity version `$ sanity --version`
* Globally install Sanity on your local machine `$ npm i -g @sanity/cli`
* Create a new Sanity project `$ sanity init`
  - Use `npm` and so remove `.yarn`
* You start sanity with `$ npm start` inside the `sanity` folder
  - That will fire up a `localhost` server that will give us "sanity studio"
  - `Sanity` is the API we interact with
  - `Sanity Studio` is the UI we log into to to CRUD all of our data
* Work with Sanity's GraphQL Playground to work with your Sanity data use `$ sanity graphql list`
* If you make changes to your Sanity backend and you don't see the changes in your GraphQL Playground (_looking at the SCHEMA sidebar_) you need to redeploy your GraphQL API for Sanity with `$ sanity graphql deploy production`
* By default Sanity will surface tokens that start with `GATSBY_anything_you_type` to your front end
    - But SANITY WILL NOT surface any tokens that do not start with `GATSBY_`
    - This is because tokens that are sensitive and in the browser should not be in the browser (aka surfaced)

#### Sanity Studio
* This is a remote Sanity site where you update your Headless CMS
* In the Sanity dashboard click on your project and you will see the URL listed under STUDIO and it will look something like: `https://THISISSOMESANITYORG.sanity.studio/desk`
* The local machine URL of this studio will be `http://localhost:3333`
* You work locally and update your sanity UI and then sync it up with the remote Sanity using `$ sanity deploy`
* For Sanity to work with React we need to import some stuff

### Add a CORS Origin
* You have to do this if you are accessing it straight from the browser
* **note** We DO NOT NEED to do this for `localhost:8000`
  - Why?
    + Because the browser will not be talking directly to sanity.io (it actually will be happening at build time on the node server
    + And because of that CORS does not apply)

#### What is CORS?
* Cross Origin Resource Sharing (cross domain)
    - We use this when we pull images live from Sanity
    - [live home page](https://gatsby.pizza/) home page images are loading but are not immediately available on page load, and that is because they are pulled in real time from Sanity (_and not done at build time - so that will use CORS and we'll cover that later_)

## Sanity Troubleshooting
* Update sanity `$ sanity update`
* Did you start sanity inside the sanity folder with `$ npm start`?
* Session issues? Try `$ sanity logout` and `$ sanity login`
* Sanity version - `$ sanity -v`
* If you have multiple Sanity projects it is easy to mix them so make sure you know your are working in the correct Sanity project

## West Practices
* Everything must "go through" gatsby
* Don't capitalize gatsby pages
* Capitalize components

## Gatsby troubleshooting
* What's the gatsby version? `$ gatsby -v`

## Gatsby Follow up
* Do we need to still import react?
* VS code Wes <kbd>ctrl</kbd> + <kbd>e</kbd> Emmet expand because <kbd>tab</kbd> is problematic - did you have to do this?

## CSS
### Follow up:
* Subgrid

## Sanity
### Sanity GraphQL Endpoint
* In sanity folder

`$ sanity graphql list`

* Click on URL and it will open a GraphQL Playground to work with your Sanity Data

## Install the sanity cli globally
`$ npm i @sanity/cli -g`

## Sanity GraphQL changes
* If you made changes to your Sanity backend and you don't see the changes in your GraphQL Playground (looking at the SCHEMA sidebar) you need to redeploy your GraphQL API for Sanity
* **note** Make sure you are inside your sanity folder

`$ sanity graphql deploy production`

## Sanity Studio
* This is the remote site where you add pizzas and slicers
* If you click on your project in sanity you will see the URL listed under STUDIO and it will look like: `https://thepeezzaguypeh.sanity.studio/desk`
* The local machine URL of this studio will be `http://localhost:3333`

### If you local Sanity Studio looks different than your remote Sanity Studio...
* This means you made changes to your local Sanity Studio but did not deploy them to the remote Sanity Studio
* You can easily sync them up by deploying to sanity using the sanity CLI

`$ sanity deploy`

* You should see after it builds the terminal will tell you the URL where the studio was deployed (just refresh the open page and you will see your remote Sanity Studio is updated )

## Sanity Troubleshooting
* Update sanity `$ sanity update`
* Did you start sanity inside the sanity folder with `$ npm start`?
* Session issues? Try `$ sanity logout` and `$ sanity login`
* Sanity version - `$ sanity -v`

## Stylelint
### Warnings
#### Comments break your page
* toggle comment breaks code, you must manually add `/* comment */`
* By default it adds `//` which breaks the page

#### No auto correct
* But css property order rule violations are set to warning so they won't break your page

#### Misc
* 1 empty line above comments

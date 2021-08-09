# Review Wes Bos Course
<!-- MarkdownTOC -->

- [Follow up Questions for Team](#follow-up-questions-for-team)
- [General Good to knows](#general-good-to-knows)
- [How To a Gatsby Website using Sanity as a Headless CMS Instructions](#how-to-a-gatsby-website-using-sanity-as-a-headless-cms-instructions)
  - [Gatsby Stuff](#gatsby-stuff)
    - [Style current page in Gatsby is easy](#style-current-page-in-gatsby-is-easy)
    - [How we use Layout](#how-we-use-layout)
  - [Special Gatsby files](#special-gatsby-files)
    - [gatsby-config.js](#gatsby-configjs)
    - [gatsby-browser.js](#gatsby-browserjs)
    - [gatsby-node.js](#gatsby-nodejs)
- [GraphQL](#graphql)
  - [GraphQL rules](#graphql-rules)
    - [Page Queries](#page-queries)
    - [Static Queries](#static-queries)
- [Sourcing Sanity Data GraphQL intro](#sourcing-sanity-data-graphql-intro)
  - [Summary](#summary)
  - [Sanity Stuff](#sanity-stuff)
    - [Sanity Studio](#sanity-studio)
  - [Add a CORS Origin](#add-a-cors-origin)
    - [What is CORS?](#what-is-cors)
- [Sanity Troubleshooting](#sanity-troubleshooting)
- [West Practices](#west-practices)

<!-- /MarkdownTOC -->

## Follow up Questions for Team
* Do we need to import React into Gatsby?
```
import React from 'react'
```

* Do you have problems with emmet tab and have you added the expand e keyboard shortcut like Wes has for VS code?
* VS code Wes <kbd>ctrl</kbd> + <kbd>e</kbd> Emmet expand because <kbd>tab</kbd> is problematic - did you have to do this?
* CSS Subgrid
* All our rules for base fonts (CSS)
* Should we use Prop Types?
* Setting base font stack on html (discuss benefits)
* Clamp with CSS
* VS Code - ES7 React/Readux/GraphQL snippets
* Wes different .env environments
* The red striped border doesn’t work like it does on Firefox
* edges vs nodes in GraphQL, What's the difference?
* Missing images on beers API
* How is Wes seeing the data coming in the FF console? 05:39 of video #47
* Using a `forEach` would return another scope and **IMPORTANT** you can't return from an inner scope of an outer scope
        - So to avoid this we'll use a `for of` loop
* [Link to Formik](https://formik.org/)

`gatsby-config.js`

* My file is `.env.development`
* But in production it would be `.env.production`

```js
import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// MORE CODE
```

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
* You can destructure data two levels deep (_or more but always put readability over efficient looking code_)
    - example:

```
// MORE CODE

export default function SinglePizzaPage({ data: { pizza } }) {

// MORE CODE
```

* Currently CSS Subgrid [only works in Firefox](https://caniuse.com/?search=subgrid)
* **note** `lqip` - low quality image placeholder
* In CSS Grid you can use `gap` instead of `grid-row` or `column-row` (_The older version was grid-column-gap and grid-row-gap_)
    - You can also use `gap` for **flexbox**
    - You can use a backup for browsers that down't support subgrid

```
// MORE CODE

/* Take your row sizing not from the pizzaStyles div, but from the PizzaGridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: auto auto 1fr;
  }
  grid-template-rows: subgrid;
  grid-row: span 3;
  grid-gap: 1rem;

// MORE CODE
```

* The dreaded `null` error - If you are loading images (or any asset) from sanity or any Headless CMS and one of the images or assets is missing you will get a `TypeError` pointing to a `null` value
* When you are doing an API your validation should always be done server side before it goes in any type of database
* Always validate on client and server
* **note** Whenever you see `[Object Object]` it means that means that your object was turned to a string without properly being stringified
* The `.gitkeep` files are just there so git doesn't autodelete the directory because git deletes empty directories by default
* **accessibility tip** If we don’t tell sight impaired users what we are removing they will just hear “muliplication sign!” (because we use the html encoded &times;)
* 
* **SUPER COOL!** The `?` will make sure the image exists or won’t show it `image={pizza.image?.asset?.fluid?.src}`
    - It makes sure pizza.image exists before it grabs pizza.image.asset and it will make sure pizza.image.asset exists before it grabs `pizza.image.asset.fluid`
      + This is called [optional chaining](https://kiranvj.com/blog/blog/optional-chaining-in-es7-and-support-in-react-js/) in ES7
      + Previously you would have to check if all of these things existed
      + Gatsby is set up to convert those `?` to into a long drawn out `if` statement 
* What is the CSS `point-events` property?
    - When set to "none" allows elements to not receive hover/click events, instead the event will occur on anything behind it
* If we want to run several Promises concurrently we use await Promise.all(ARRAY_OF_PROMISES)
  - They can be run at the same time (We call that concurrently in JavaScript)
  - If we want to run them concurrently we use `await` inside an `async` function
  - The benefit of doing it this way is it makes your build faster
* The difference between `declarative` and `imperative`
  - Using the Link is declarative (_we declare how it works_)
  - Using the Programming link is `imperative` (_You write the code to say what happens_)
* Anytime in React that you put a value into an input YOU MUST ALSO supply an `onChange` handler
* Anytime you map over something you must give the individual item a unique key so the react virtual dom can keep track of it and update it quickly (_React specific to deal with making sure the React Virtual DOM runs as efficiently as possible_)
* We are using `normalize.css` as our reset
* You can use a `for of` loop or a `forEach` loop (both loop through arrays)
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
* We use `forEach()` array method when we are not changing the data but just going off an doing some work with the data
* Currently fetch is a browser API but you can use it with node if you use the [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) npm module
* What is context?
  - If you need to pass some data from this `createPage()` method to the actual template
  - You can do that via `context`
    + The old deprecated property was `pathContext` and now we use `pageContext`

## How To a Gatsby Website using Sanity as a Headless CMS Instructions
* We'll have a **root folder** that holds both `sanity` and `gatsby` folders
  - `.git` is inside the root folder that will be the git for both sanity and gatsby

### Gatsby Stuff
* Use `react-helmet` to stick meta into the HTML `<head>`
* The idea behind Gatsby - At build time (_when we build our website before we deploy it to the internet_) Gatsby goes and grabs all the data it needs in order to run
    - It goes to sanity and grabs all the data/relationships
    - It takes all this data and sticks it (not inside a Database because as soon as its done it disappears) but in its memory and it allows us to query that data via GraphQL queries
* How cool is the `repeat()` JavaScript method?!
* How cool is `Array.from()`?!
* `GATSBY_HOT_LOADER=fast-refresh` (_no longer needed in .env_)
* **Warning!** Data from environment variables come in as a string (_not a number!_)
* Gatsby deals with pagination differently because it is all pre-generated at build time
    - So we need to know at build time how many pages there are
* To "surface" an environmental variable in Gatsby you must preface it with:
`GATSBY_`
    - You only surface environment variables that are prefaces with `GATSBY_`
* Styling images is different in `gatsby-image`
  - You don’t just grab the `img` because it is wrapped in a div and has all that extra stuff, you grab the image using `.gatsby-image-wrapper` (which is a class that Gatsby puts on the image)
    + **note** This is the same with the new replacement for `gatsby-image` which is `gatsby-image-plugin`
* After installing your gatsby site, you need to `$ rm -rf .git` and just use the root app Git (At one point you need to `$ git init` in the root and make sure to create a `.gitignore`)
* Two ways to use plugins in Gatsby
* When you create nodes you have to create nodeMeta
  - And inside the nodeMeta you need to create a unique `id`
* Install the gatsby cli globally `$ npm i gatsby-cli -g`
* You start gatsby with `$ npm start` inside gatsby folder
  - This will run both your Gatsby website server on `http://localhost:8000`
  - And it will also run the GraphiQL server on `http://localhost:8000/___graphql`
  - Clean gatsby with `$ gatsby clean`
  - Build Gatsby for production is `$ npm run build`
* Stop Gatsby with <kbd>ctrl</kbd> + <kbd>c</kbd>
* **Troubleshooting tip** If you go to a 404 page in development (_you will all the pages that were created - great way to troubleshoot if a page was created or if the path is correct_)
  - This "extra debugging" information will not be available in production
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
  - Also Read my notes on `19-gatsby-images.md`
  - cachebusting
  - `fixed` and `fluid` have been removed from the new gatsby-image-plugin
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
* We gain access to our data in our Gatsby React component through `props`
  - **note** A bit of "Gatsby magic" - as Gatsby will recognize that you have exported a GraphQL component from the page and Gatsby will run it behind the scenes and stick it into the props data object
* Loading data in Gatsby and how it is unique
  - In other apps you build you usually have to strategize around data loading
    + Not with Gatsby and other "JAM Stack frameworks" because there is never a loading state in Gatsby because it is all prebuilt. Before any page ever renders, the data will always be there
      * Similar to SSR because it also happens at build time rather render time
    + This means you never need "Loading Spinner" in Gatsby because the data is always there
    + The page will never be rendered until the data is there
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

#### gatsby-node.js
* [docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/)
* Code in the file gatsby-node.js is run once in the process of building your site
* You can use its APIs to create pages dynamically, add data into GraphQL, or respond to events during the build lifecycle
* We will use the `createPages()` to build pages dyamically like the indivual slicers pages and pizzas single pages
* There is no difference between writing a plugin for gatsby and just writing it inside your `gatsby-node.js`

## GraphQL
* Pros
  - You can query multiple data sets because there is only one endpoint and you can "pluck" anything you want off this data
      + REST API pulls everything and doesn't give you the option of hand picking what you need
  - Nested data types
  - We can use Regular Expressions with GraphQL
* **note** filtering in GraphQL is not uniform so you just have to figure it out per tool you use
* **tip** Using GraphQL Playground will save you time!
    - Use that first than when getting the data you expect
    - Copy and paste it into your page query
* Lots of GraphQL APIs you have to explicitly type out all of the fields but Gatsby makes it easier
* Make sure you export your GraphQL queries `export const query = graphql`

### GraphQL rules
* How do we get API data into our Gatsby GraphQL API?
  - Inside our `gatsby-node.js` we use [sourceNodes](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes)
* The GraphQL query has access to all of our pageContext variables directly
* Must use double quotes
* Working with regex in GraphQL
    - You can't interpolate values into a regex
    - You also can't create a string in JavaScript and pass it in either
    - In a GraphQL template string and there is no way to interpolate a variable into an input (in our case a regex)
      + The solution is to create a regex in `gatsby-node.js`
* You can’t say “give me everything” you have to be specific with what you want
  - Fragments can help you with DRY violating GraphQL queries
  - Fragments are possible in Gatsy GraphQL queries but setting them up is tedious and may lead to less readable code - IMHO I would not use GraphQL fragments
* You don’t need parentheses unless you are filtering
* There are two types of queries in Gatsby
  - Page Queries
  - Static Queries

#### Page Queries
* Can be dynamic with variables
* Can only be run on a top level page
    - If you want to have variables in your query, it HAS TO HAPPEN AT A PAGE LEVEL (limitation of gatsby)
* You specify a page query by exporting a query from the page and Gatsby is smart enough to recognize that it is a query and it will go and get that data and when we run the build command Gatsby will pass the page query data into our page component
* **note** Make sure to auto-import GraphQL with `import { graphql } from 'gatsby';`

#### Static Queries
* Can not be dynamic, no variables can be passed in
  - **repeat** Static Queries are queries that DO NOT TAKE variables
  - If you need the query to be dynamic, then you must do the query at a page level and then pass the data down (prop drilling in React parlance)
* Can be run anywhere
* **Gatsby Rule**If you want to query data anywhere else outside of a `page` (_like inside a component_) you MUST use a `Static Query`
* If it is just a Static Query that has no variables passed into it you can run that wherever you want using a React Hook
* `useStaticQuery` is a hook that comes from the `gatsby` module
* `graphql` comes from `gatsby` module

```
// MORE CODE

import {graphql, useStaticQuery} from 'gatsby';

// MORE CODE
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
* `“hot spot: true”` setting in Sanity is sooo cool!
* **note** we use `_id` and not `id` because we are querying Sanity directly
* Load sample data into sanity with `sanity dataset import ./sample-data/all-sample-data.gz production` and if you run again you can replace the data with the `--replace` option `$ sanity dataset import ./sample-data/all-sample-data.gz production --replace`
* [export sanity data is easy](https://www.sanity.io/blog/5-cool-things-you-can-do-with-the-sanity-cli#9875197cf349)
  - `$ sanity dataset export production`
  - [Stuff you can do with gzip files](https://coderwall.com/p/l8byfq/using-gzip-in-os-x)
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
* PRO of styled components is you can put your media queries directly inside your selector
* If you ever need syntax highlighting without importing a library just use this
        - `const gql = String.raw`
        - `const css = String.raw`
* When using several grids stick them in their own grids file
* Use `rems` for grid gap
* `font-size: 0`
    - Sometimes an image has “ghost space”
    - They you have this spacing between them
    - It is not margin or padding (it is just a natural space that CSS gives you)
    - And the size of that space is determined by the font-size\
    - So if you run into weird issues try `font-size: 0`
* Disable on loading - Do it on fieldsets and you won’t be able to type in fields while loading
* Intl.NumberFormat
    - Is built into both the browser and Node.js
    - And it is built in for formatting currency (which is great!)
* [Sample APIs](https://sampleapis.com/)
* When debugging Promises chances are you forgot to `await` it
    - You could also destructure the error property

```js
// MORE CODE

const { data, error } = graphql(…code here…`)

// MORE CODE
```

* Troubleshooting Gatsby
    - Stop gatsby and restart
    - Comment out offending code
    - Log out the problem
* `$r` in Chrome Dev tools gives us the currently selected component in React Dev Tools
    - example: `$r.props.pizza.toppings.map(topping => topping.name)`
* How to tell if the error you see is yours or internal Gatsby?
    - If the actual error is coming from one of your components (_versus some junk inside of gatsby_) many times if you don't know what the error means, stop Gatsy restart it, also use `$ gatsby clean` and remove `package-lock.json` and `node_modules` and reinstall with `$ npm i`
* Use React Dev Tools Chrome Extension
* Wes just likes to destructure one level deep
* Keep your Gatsby pages as "thin" as possible
* Anytime you have a grid of items and then a singular item you should almost always make both a separate item for the grid and the item
    - But you can group them together if they are thin and once they grow too large export them
    - Feel free to keep components in same file if they are thin but once they are used more than once, put them in their own file to improve the modularity of your codebase
* Give it a "hot supper refresh" :) 
* Use React Dev Tools to see that you can go to that single page and get all the props and you will see `pathContext` with the slug
* Name your page components as it helps with React Dev Tools
* Name your GraphQL queries as it helps with GraphiQL history
* Use aliasing in GraphQL as it makes your code more readable
* Don't capitalize gatsby pages
* Capitalize components
* <kbd>cmd</kbd> + <kbd>k</kbd> (clear) terminal
* Auto import in VS Code
* Code coloring VS Code sanity (backend pink) and gatsby (frontend yellow)
* one global button? Some people like to create reusable buttons over and over again, but Wes likes to use a regular button and style it the same way for the entire application
* Never end your URLs with a forward slash because it’s always easy to add them on yourself
* If you don't know where the email will go use `example.com` domain
* Put the template query inside the component not inside `gatsby-node.js`
        - Why?
        - Because all your pages have to work like our query it seems to make sense to tightly couple the query with the template page
        - That way if you need to modify the page you can easily modify the query without having to jump back into your `gatsby-node.js`
* Another benefit of doing the query directly inside of your template is when you hit save the data for that page will immediately update
    - If you wrote your entire query in `gatsby-node.js` you'd have to kill your entire process and start it again
    - And if you have a large site, that can take minutes and makes building the site frustrating
* Test environment variables are working by logging them (but be careful logging environment variables on server logs)
* Logging out two things and giving them names by wrapping them inside an object
    - This is not helpful `console.log(toppings, pizza)`
        + Assuming toppings and pizza are `arrays`
        + But this is very helpful `console.log({toppings, pizza})`
            * Nothing special here but ES6 when the name of the object is the same name as the property
* Clear your console before hot reloading

```js
console.clear();
console.log({ toppings, pizza });
```

* VS Code Tips
    - Double click and hit `cmd` + `d` and then type with multiple cursors
    - Use the `console.log()` to avoid the implicit return from prettier
    - Copy Line Up/Down
        + On Windows: Shift + Alt + Up/Down
        + On Mac: Shift + Option + Up/Down
    - **tip** If the VS Code import shortcut is giving you require instead of import it is because VS Code does not see any evidence of ES Modules (like import/export and so it assume Common JS)
    - hover over it and hold option down and click it and it will open that component

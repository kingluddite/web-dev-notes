# Gatsby cheatsheet
## Clean and run develop
`$ gatsby clean && gatsby develop`

## Test
* After your site is running
* Go to a 404 route and you'll see that the categories are loaded
* (making sure you have no errors)

## I had an error in my node code
* My result was querying `allMdx` and I need to query `categories`
* This is because in our node code we used `categories` as an alias

`gatsby-node.js`

```
// MORE CODE

      categories: allMdx {
        distinct(field: frontmatter___category)
      }

// MORE CODE
```

## So I need to fix my code to be this to create the right pages
* From this:

```
// MORE CODE

  // create category pages programatically
  result.data.allMdx.nodes.forEach(category => {
    createPage({
      path: `/${category}`,
 
// MORE CODE
```

* To this (update `allMdx` to `categories`):

```
// MORE CODE

  // create category pages programatically
  result.data.categories.nodes.forEach(category => {
    createPage({
      path: `/${category}`,
 
// MORE CODE
```

## Try again
* Clean and run develop

`$ gatsby clean && gatsby develop`

## Yet another error
* We used `distinct` in our query so we need to use that to loop through with forEach
* From this:

```
// MORE CODE

  // create category pages programatically
  result.data.categories.nodes.forEach(category => {

// MORE CODE
```

* To this (change `nodes` for `distinct`):

```
// MORE CODE

  // create category pages programatically
  result.data.categories.distinct.forEach(category => {

// MORE CODE
```

## Try again - third time is a charm :)
* Clean and run develop

`$ gatsby clean && gatsby develop`

## Go to a 404
* You should see your new category pages generated
* Click on any of the category pages and you'll see `Categories Template` because that is coming from this template page

`src/templates/category-template.js`

```
import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'

const CategoryTemplate = () => {
  return <h2>categories template</h2>
}

export default CategoryTemplate
```



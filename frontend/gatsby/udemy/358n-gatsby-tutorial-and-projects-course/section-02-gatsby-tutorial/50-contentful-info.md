# Contentful
* Offer free tier
* They do host your data

## Contenful Interface
* Delete the sample space as you don't need it
* The free tier
    - 2 environments
    - 1 role
    - 2 Locales
    - 24 content types
    - 5000 records
* Delete spaces
* Choose Explore content modeling
* Wait a minute
* Click Get Started
* Click Add a space
* Choose free space
* Create an empty space
* Name it
* Confirm and create space

## About the dashboard
* Content model (structure for data)
* Content (option of adding that data)

## Building Products
![images](https://i.imgur.com/j0wqCW8.png)

* And Image
* A Title
* A price
* More details that links to a page with more info for that product

## Content Type
* It depends on your app what kind of data will will be setting up

### What will be our structure
* Title
* Price
* Info/Description
* Some kind of image
* Slug (we'll use to navigate around our project)

### Name Content Type
* product
    - It will also give us an `Api Indentifier` (and that's how we'll be able to find it in our project)

### Add fields
* After Content Type is created, add your fields
    - Think of fields as properties you would be adding to a JavaScript object

### Make images required
* If even one image is missing your whole app will blow up
* **IMPORTANT** Make your images required
* The reason images blow up Gatsby is Gatsby won't be able to find that image

## MAKE SURE TO CLICK `SAVE` to save your content model

## Content

## Connect to Contentful
* [plugin for contentful](https://www.gatsbyjs.org/packages/gatsby-source-contentful/?=contentful)

### Install
`$ npm install --save gatsby-source-contentful`

* Add object to `gatsby-config.js`

```
// MORE CODE

{
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `your_space_id`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
// MORE CODE
```

## Add API key
* `Settings` > `API keys` > `Add API key`
* Name it (required)
* **note** Don't confuse with Content Preview API - access token
    - You only need `Space ID` and `Content Delivery API - access token`
* **note** You can use any of the generated API keys to have access to the data
* Plug in the Space ID and the Content Delivery API - access token inside the plugin option in `gatsby-config.js`
* Make sure you save!

## dotenv
`$ npm i dotenv`

* Create `.env.development`

```
CONTENTFUL_ACCESS_TOKEN=Dp8TngGeJXm1ElHMAtx1y1jL7vJjSOs7cUc6PRYddVB
```

* Add this to the top of `gatsby-config.js`

```
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
// MORE CODE
```

## Run app
`$ gatsby develop`

* You should see in feedback from `$ gatsby develop`

```
// MORE CODE

Starting to fetch data from Contentful
info Fetching default locale
info default locale is: en-US
info contentTypes fetched 1
info Updated entries 3
info Deleted entries 0
info Updated assets 3
info Deleted assets 0
Fetch Contentful data: 489.895ms
// MORE CODE
```

* This means you have access to the Contentful data
* You will see 3 entries which is how many products we created
* 3 assets (3 images)

## Source files for john smilga
* Use other keys
* Scroll to All Projects
    - Filter by Gatsby

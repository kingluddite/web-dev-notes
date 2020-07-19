# siteMetadata
## Create siteMetadata
* **note** The name is important!!! must be `siteMetadata`

`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Learn Gatsby',
    description: 'bla bla bla description',
    author: '@johndoe',
    data: ['item 1', 'item 2'],
    person: { name: 'jane', age: 100 },
  },
  plugins: ['gatsby-plugin-eslint', `gatsby-plugin-styled-components`],
};
```

* **note** Any changes to gatsby-config.js YOU MUST RESTART THE SERVER
* Search for `config API` to see [gatsby config API](https://www.gatsbyjs.org/docs/gatsby-config/) 

### Configuration options
* Options available to set within `gatsby-config.js` include:

* siteMetadata (object)
* plugins (array)
* pathPrefix (string)
* polyfill (boolean)
* mapping (object)
* proxy (object)
* developMiddleware (function)`

## Show you if you use something not allowed in the gatsby-config API
`gatsby-config.js`

```
module.exports = {
  siteMetadata: {
    title: 'Learn Gatsby',
    description: 'bla bla bla description',
    author: '@johndoe',
    data: ['item 1', 'item 2'],
    person: { name: 'jane', age: 100 },
  },
  data: ['item 1', 'item 2'],
  plugins: ['gatsby-plugin-eslint', `gatsby-plugin-styled-components`],
};
```

### Houston we have a problem
* Because we used a structure the gatsby config does not allow we get an error

```
 ERROR #10122  CONFIG

The site's gatsby-config.js failed validation:

"data" is not allowed

not finished open and validate gatsby-configs - 0.047s
```

That is because we use this `data`:

```
person: { name: 'jane', age: 100 },
  },
  data: ['item 1', 'item 2'],
```

* **IMPORTANT** When creating `gatby-config.js` it must match EXACTLY what we have in the list

## But inside the `siteMetadata` object I can set up whatever properties I want
* But when you set up the main properties in the object YOU MUST FOLLOW THE RULES

## A change to gatsby-config
* Means we must restart server
* Now we can access siteMetadata and we can access it using GraphQL

## First GraphQL query
* **note** If you made a change to gatsby-config.js you must restart the server and refresh GraphiQL!
* **tip** Auto Complete keyboard shortcut is `ctrl` + `space`

```
{
  site {
    siteMetadata {
      title
      data
      author
      person {
        name
        age
      }
    }
  }
}
```

* You type the high level item than add curly braces
* Keep drilling down to the data you want
* Only pick what you want

## The response
* Will reside inside `data`
* Within the `data` object everything matches how we set up the data query

```
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "Learn Gatsby",
        "data": [
          "item 1",
          "item 2"
        ],
        "author": "@johndoe",
        "person": {
          "name": "jane",
          "age": 100
        }
      }
    }
  }
}
```

* **tip** For `person` we get default squiggly lines and if we just run it, we'll get all it's properties (name and age)

## Render data in UI

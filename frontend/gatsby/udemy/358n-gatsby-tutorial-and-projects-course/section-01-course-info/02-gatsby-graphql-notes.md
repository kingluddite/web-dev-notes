# Gatsby GraphQL notes
* However, there's an alternative to GraphiQL, and that's the GraphQL Playground by Prisma
* It allows you to interact with all the data, schemas added by additional Gatsby plugins
* GraphQL Playground uses components of GraphiQL under the hood but is essentially a more powerful GraphQL IDE that enables better development workflows
* The GraphQL Playground also adds additional features like:
    - Interactive, multi-column schema documentation
    - Multiple Tabs just like you'd have in an IDE
    - Customizable HTTP headers
    - Query history

## To use the GraphQL Playground in your Gatsby project, edit the develop script in the package.json file:

`package.json`

```
// MORE CODE

"develop": "GATSBY_GRAPHQL_IDE=playground gatsby develop",

// MORE CODE
```

## If you're on Windows
* Then the script should look like this and also install the cross-env package:

`package.json`

```
// MORE CODE

"develop": "cross-env GATSBY_GRAPHQL_IDE=playground gatsby develop"

// MORE CODE
```

* Once you've modified the script, you can then run yarn develop to run the site in development mode and also launch the new GraphQL Playground.

## Fragments in Gatsby

[frag example](https://github.com/cryic/fragment-blog-example/tree/master/src/data)

https://medium.com/flatiron-labs/using-graphql-fragments-across-multiple-templates-in-gatsbyjs-7731a2d28bbd

https://www.gatsbyjs.com/docs/using-graphql-fragments/

https://medium.com/@whatjackhasmade/organise-gatsby-queries-with-graphql-fragments-3936c370b1ee

https://www.robinwieruch.de/gatsby-graphql

https://medium.com/swlh/using-gatsby-image-with-contentful-e4f243f37ee8

https://www.gatsbycentral.com/reusable-graphql-queries-in-gatsby

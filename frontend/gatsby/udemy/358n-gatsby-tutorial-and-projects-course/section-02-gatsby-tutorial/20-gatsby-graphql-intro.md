# Gatsby and GraphQL Intro
* Loading data into React Components
* http://localhost:8000/___graphql
* http://localhost:8000

## What is GraphiQL - a sandbox for your GraphQL queries
* [gatsby data layer tutorial](https://www.gatsbyjs.org/tutorial/part-four/)
* Tip open sandbox in a new big window

## Gatsby DataLayer in a Nutshell
* Various types of data
    - APIs
    - Headless CMS
    - JSON
    - Markdown
    - SiteMetaData
    - Lots more
* To access that data we'll use GraphQL
    - GraphQL is just a syntax on how to access that data
    - We can test and create our queries in the GraphiQL IDE (sandbox)
    - When we are ready to display or render our data we can use `<StaticQuery>` or `PageQuery` data

## StaticQuery
* Can be used in any component (including the Page component)
    - But we can only use `PageQuery` component in our Page components

## What makes PageQuery so special?
* It can also accept variables

## GraphiQL Interface
* **tip** `ctrl` + `enter` shortcut to run query
* Clean it up - `shift` + `ctrl` + `p`
* You only see in explorer plugins you installed (Great!)

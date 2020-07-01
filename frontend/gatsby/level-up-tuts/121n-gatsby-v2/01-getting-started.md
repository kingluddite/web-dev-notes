# Getting Started With Gatsby

## Needs
* Install React Developer Tools
* Node (latest version)

# Install Gatsby

`$ npm i -g gatsby-cli`

* That will install your basic Gatsby framework

## Create gatsby project
`$ gatsby new my-react-portfolio.com`

`$ cd my-react-portfolio.com`

## Run development gatsby site
`$ gatsby develop`

## View your site
* Your site is ready at `http://localhost:8000/`
* We start with 2 pages
* zero load time between pages

### Why so fast?
* One of the benefits of using React
    - Our site doesn't need to make an additional request to render a new page
    - We are in development
    - Refresh page and view in Network tab of Chrome dev tools
        + Look at bottom of Chrome dev tools Network tab and you will see **DOMContentLoaded: 670 ms | 1.02 s (that is a very fast load time!)

## View GraphQL
`http://localhost:8000/___graphql`



# Front End Intro
## Project Overview
![project overview](https://i.imgur.com/WEJJYEk.png)

* We send test queries from the client using graphiql to the Server which is runnning Node.js and Express JS and using the GraphQL server to go out to mongoDB to retreive the data we need, return it to the server, that will determine which data to send back to the browser which has graphiql inside it (client (browser))
* All the right hand side of the equation is working

## We want to swap out using our test tool graphiql with a react front end
* This will let us use a web site on the client to make queries to our node.js express server and reach out to our mongodb
* And retrieve data so we can show it to our end user on the browser

## We will swap out Graphiql with React on the front end
* But graphQL is not JavaScript
* That will be a problem because out of the box it is not understood by React (or any other JavaScript framework on the front end)

### We will use Apollo
* This will help us bind graphQL to our application
* Apollo is a graphQL client
* This will enable us to make graphQL queries to our server
* Here is a full diagram of what we are doing now

![full stack app](https://i.imgur.com/RodCDyj.png)

* We will have our react app
* We will have a couple of different components
* We'll have a book list component (render a list of different books)
* We'll have an add book component (it will add new books)
    - both of the above components will be making queries to the server
        + book list will query to get a list of different books
        + add book will query to add a new book (aka make a mutation)

## how will this work?
* We will bind queries to our components
    - We will do this by using our Apollo clients
    - Apollo will help us create a query and then bind that query to a component so that when that component renders in a browser, automatically behind the scenes, apollo is handing that query to the server and returning any information so that we can show it inside the component
    - This works really well with react
    - When the graphql server receives that query, it will go to mLab to get that data and return it back to us

## Next - We will use create react app to create our react front end quickly and painlessly

# Sick Fits Intro
![pieces of app](https://i.imgur.com/OSkvSP1.png)

## Frontend
* We will use `React.js`
* `Next.js`
    - Framework that enables us to do server rendering of our react app
    - Routing is great
    - Server side rendering is great
    - Tooling built in
        + Does all webpack and bundling for us
* Styling
    - Done with **Styled Components**
* React-Apollo
    - An adapter for the apollo client

### Manage Data on Frontend
* Apollo Client
    - This replaces the need to use react `state` or **redux**
    - Helps us perform Mutations
        + Mutate: CRU (Create, Read, Update)
            * Any time we are changing data using GraphQL
    - Query: Allows us to fetch data from our GraphQL backend using queries
    - Caching: First time is slow then every additonal time loading that page is super fast
        + After first visit stored in cache and then next we go back to that item it is loaded instantaneously
        + There is no secondary cache that we need to manage (like with Redux)
        + We can manage our Local State with it
            * Example: Is cart open or closed?
            * Data not stored in DB but stored locally in the browser
    - Error and Loading UI states
        + We can errors provided if something goes wrong
* **note** Apollo Client replaces the need for Redux + data fetching/catching libraries

## Backend
### Intro to Prisma
* We will be using MySQL (you could easily use Postgres)
* But we'll be using **Prisma**
    - Takes an empty DB
    - And it provides and interface layer on top of your DB for all your common CRUD operations
    - We will define would our data looks like
    - It will ingest that and it will provide us with a set of APIs that enable us to do all the CRUD operations on top of it
    - We do this through creating our schema
    - We can use GraphQL to establish relationships between our data
        + We'll have items and users
        + User will have items and user will have orders
        + Items will be in the cart
        + There will be all types of relationships 
        + Prisma can be self-hosted or as-a-service
        + Prisma doesn't not provide an additional logic layer
            * It is just a set of GraphQL Create Read Update and Delete APIs on top of it
            * How do you introduce any type of logic before you save the DB
                - For example:
                    + Resize an image before we put it up
                    + Send an email as soon as order has been created
                    + Rate limiting
                    + If you want to do anything before it actually gets put into the data then we'll need another layer on top of that that will take care of handling all of the logic
                        * And that is what GraphqL Yoga is for
        + GraphQL Yoga
            * Will sit on top of Prisma (Or it will sit in front of Prisma) and it will kind of "proxy" all of the requests
            * We will implement all of our Query and Mutation resolvers
                - If someone on the frontend requests to add an item before we can put them into the Prisma DB we need to we'll need to do some data massaging
                    + This means:
                        * Any custom server side logic
                        * Charging credit cards
                            - You can't charge a credit card in a DB but you can't do that just client side because it needs to happen on the server side
                            - Before it gets into Prisma we make sure we charge the credit card on the Yoga server
                            - GraphQL is just an Express server that sits in front of Prisma
                            - Sending Email
                            - Performing JWT Authentication
                            - Checking Permissions

## Server vs Client Routing

![big picture diagram](https://i.imgur.com/1VU9o8T.png)

### Server side routing
* The traditional
* We define the routes on the server
* Involves the cloud
* Network latency is involved
* Gets to be an expensive process of many HTTP Requests to the Server and Responses from the server

### Client side routing
* The first time we load this we need to call the server to send the client side code
    - We tell the server "I want this app"
    - The server responds with HTML
    - Then our client side JavaScript will start rendering the client side app
    - Every page change from then on we'll handle with client side JavaScript
        + This means we can avoid using the round trip to the server (no HTTP requests) in order to re-render the page
        + Instead we'll use the HTML5 history API (this is available by browsers)
            * This allows us to watch for URL changes run some JavaScript code when the URL does change
            * It also says don't go off to the server as I've code it covered here on the client when the URL changes
            * This make it possible to do something based on the URL change right inside the client side JavaScript
                - What are we going to do?
                    + Maybe we'll just render a new component to the screen
                    + Mabye we leave the header in place and just re-render part of the app?
                    + Regardless this process removes the server from the equation and doing everything client side means our app will run a whole lot faster
* We define the routes inside JavaScript so we can dynamically change what gets shown in the UX
* HTML5 history API available by browsers
    - Allows us to watch for URL changes
    - And run JavaScript when URL does change
    - Also enables us to do it on the client and not go to the Server
    - Runs a ton faster

## React Router
* Do Something?
* We call routes in React Router
    - URLs and a set of components to render when the URL is hit
        + Find the matching component
        + Render with JavaScript function call
        + This gives us ability to create a SPA (Single Page App) where we just swap out components depending which "page" we are on

#### Made popular by
* Angular
* View
* Meteor
* React
* Backbone
* Ember

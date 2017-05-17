# Deployment of Servers
![deploy servers diagram](https://i.imgur.com/iveC3pf.png)

* Highly intelligent server
* May connect to a Database
* May handle authentication
* May make internal requests to other servers that are running

## Two ways to structure deployment with intelligent server
### One Way - Put together two separate addresses
![two addresses diagram](https://i.imgur.com/eNJia42.png)

* http://www.app.com
    - Use visits this URL they will get back the build application
    - The app gets sent back to the user's browser
    - It will be booted up inside the browser
    - Then the JavaScript application we just wrote can make some API requests to the outside server that we're maintaining
    - Think of it as having a static application but it also has the ability to make a request to an outside API
    - This is how many very large applications work (apps that server thousands or millions of different users)
    - The reason is performance gains out of separation of static assets and more dynamic assets

### The Other Way -  
![other architecture diagram](https://i.imgur.com/lp7vCUw.png)

* We'll have a single server that is responsible for both serving up our application assets and also may handle API handling logic
    - examples:
        + Allowing user to sign up for an application
        + Create a todo that gets stored in a Database
* The `node` server will be responsible for both serving up the Application and also some business logic
* This is more common for smaller Applications because deployment is significantly easier as well because there is only one server we have to worry about

### Let's focus on second type of architecture
* We want our node server to be 100% in charge of our Application
* This can be a problem with webpack
    - The problem is we were saying webpack was the center of our universe
    - Now we are saying `node` will be the center of our application
    - To address this problem we need to put together a `compatibility layer` so that webpack and node can work together well

### In the past
* Whenever we opened up our Application we just opened up our `index.html` file directly
* It was easy
* And it was on our hard disk

### Now
* When we visit our `node` server we expect the node server to somehow reach over to webpack and serve up our Application bundle both in a development environment and a production environment

## Next
Figuring out how to make node and webpack play nice with each other


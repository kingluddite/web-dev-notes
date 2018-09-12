# Intro
* Apollo client lets use graphql APIs
* build a blog using a graphql API
* we will do that on client side using graphql client
    - won't spent time on API or server
* we will just be consuming a graphql api

## What is grapqhl?
* It is just a specification for an API
* It defines here's how it should it should look and work
* You have other libraries (like Apollo or Relay to implement how it should work)
* Graphql was created by Facebook
* Apollo was created by people at Meteor

## Difference between Apollo API and standard REST API
### REST API
* In a typical REST API you hit a specific URL and that URL gives you back a specific set of data
    - To get a different set of data you have to hit a different URL
    - You can have query parameters to change some of these things
    - The flexibility is only as good as the API

### graphQL
* You only have one endpoint attached to one URL API
* Instead of different APIs to get different data we send what is called a "graphql query" over that same URL to get different sets of data back
* Syntax kind of looks like JavaScript syntax without commas
* easy to work with
* Typed
* Self documenting
* Easy to use to get all the data you want back

##What is Apollo?
* GraphQL is just a specification on how graphql should work
* To actually use graphql or attach to a graphql API we need something like Apollo which is a graphql client
    - There are other graphql clients
        + small ones and a large one made by facebook called Relay
        + Apollo seems to be the favorite
        + Apollo updates constantly
* Apollo accepts the URL endpoint for your API and allows you to query that endpoint and get data back
    - It takes care of caching
    - It takes care of optimistic UI
    - You can do subscriptions
    - Works with all of the major libraries

## Next - Get bare bones graphql server running
* We will use [GraphCMS](https://graphcms.com/)
*  

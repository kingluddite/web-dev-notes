# GraphQL intro

## What is GraphQL
* Stands for Graph Query Language
* Created by Facebook in 2012
* Created to fix a problem caused by working with a `REST API`
    - They had difficulties getting very specific information from their DB using a REST API

### Demo the problem
* To work with REST APIs you need to create a route

`facebook.com/user/1234`

* Now you create a route and now you need to associate that route with a [HTTP verb](https://www.restapitutorial.com/lessons/httpmethods.html)
* This verb specifies how you want to react with a specific resource
* In this case we want to get a user's information
    - So in this case we would use the `HTTP` verb `GET`
    - No problem but what if we want to get all the friends from a given user
    - In order to get the friends we would have to change the route

`facebook.com/user/1234/friends`

* So now we have two routes but since they are from same path they are called `nested routes`
* This is not a problem

## But what if we want even further specific information? 
* Like we want the friends of a user's friends

`facebook.com/user/1234/friends/friends`

* We have to add another nested routed
* We have to make more requests
* This is where Facebook developers ran into problems
    - The limitation of using a REST API
    - We have to build out long nested paths
    - We have to build out the functionality for each path and associate each with a HTTP verb
* All these requests are an "expensive" operation

## Let's fix this problem with GraphQL
* Create a function and decide what info we want to get from it

### Benefits of GraphQL
* In terms of functions
    - We can request the exact data we want
    - And we only have to make one request
    - **Built-in System Types**
        + Like Java (Also a typed language)
        + This means you have to declare the type of data you are working with
        + This offer a huge benefit because with typed languages everything is much more predictable
        + If you make a mistake writing that type, you'll get an error
    - **Built-in Developer Tools**
        + REST APIs tools you have to use 3rd party tools
            * Like **Postman**
            * Or use **CURL** in your terminal to make sure requests and responses were working properly
        + GraphQL has a built in tool that makes 3rd party tools unnecessary  
    - **No Versioning needed**
        + With REST APIs this was common
        + `facebook.com/v1/user/friends/friends`
        + `facebook.com/v2/user/friends/friends`
        + This means if you wanted to update your API and didn't version it people using it for their app, their app could break
        + GraphQL can be versionless
    - **Flexible**
        + GraphQL is flexible since it works with many different languages

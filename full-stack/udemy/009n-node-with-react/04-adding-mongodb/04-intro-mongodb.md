# Intro `MongoDB`
* We will create a new user every time a user signs up with OAuth

![mdb in flow](https://i.imgur.com/Iq02L6r.png)

1. We have a React app inside the browser
2. Our React app communicates with our Express API via HTTP requests that contain little snippets of JSON data
3. Express/Node API will interact with `mongoose.js` Library

## What is mongoose?
* it is an optional Library that's sole purpose is to make our lives easier when working with `MongoDB`
    - It wraps up a lot of very common operations that you would have to code by hand in Mongo if you didn't use mongoose

## How does Mongo internally store information?
![visual look at how mongo stores data](https://i.imgur.com/e4xdCIE.png)

* `MongoDB` internally stores records into different collections
* Every different collection that sits inside any Database can have many different records (aka `Documents`)
* Every record is a little pice of JSON
    - Every record is a collection of key/value pairs

## `MongoDB` is `scheme-e-less`
* Inside of one Collection every single record can have it's own distinct properties
* This is id direct contrast to SQL Databases like MySQL (relational Databases)
    - Every single record in a table in relational Databases must have the exact same properties

## What mongoose is doing for us?
![mongoose helps us](https://i.imgur.com/KK4TFX8.png)

* Above the dots is from the `mongoose` world
* We make use in mongoose of a Model class
    - And this Model class represents and entire `MongoDB` collection
    - We use this Model class to access a single collection in `MongoDB`
    - The model class has a bunch of methods attached to it that are designed to work with an entire Collection
        - Methods like
            + Create a new record
            + Or Searching all records inside our Collection...
            + All this is done using a Model class
    - mongoose also gives us access to `Model Instances`

### What are Model Instances?
* They are JavaScript objects that represent a single object aka a single record sitting inside a Collection
* So in practice we end up with one Model class representing one Collection inside of `MongoDB` and we end of with many **instances** each representing one of the records sitting inside our `MongoDB` Collection  

# Closing Prisma to the Outside World
* We just working on putting Node.js in between our client and Prisma

![node in the middle](https://i.imgur.com/0UOI5QI.png)

* This architecture will be useful because it will allow us to authenticate and validate requests before we are actually reading and writing from the Database
    - So we can use the Node.js server to check if someone has the permissions to read and write data before the operation is performed

## Houston we have a problem!
* The problem with our current setup is that this is not enforcible because the client can just directly communicate with Prisma
* We can right now go to `localhost:4466` and mess with the Database until the cows come home
    - There is no need to go through our Node.js GraphQL API

## Solution - Cut off the Prisma channel for the client
![cut off prisma channel](https://i.imgur.com/9XI7k4c.png)

### How can we do this?
* We set up a Prisma secret
    - It really is nothing more than a password
    - You need that password in order to communicate with Prisma

### Where do we set that secret up?
* We will set that up on our Node.js backend and the Prisma backend so when Prisma asks "What's the secret?", Node.js will be able to respond with the secret

![prisma secret](https://i.imgur.com/oXsXKdh.png)

* We won't give anyone else this information so any client out there won't know the secret and won't be able to communicate directly with Prisma, that client will be forced to go through Node.js

![client doesn't know jack](https://i.imgur.com/ttbcMtc.png)

* But now any client in the world can interact with our Node.js API and we have no problem with that because we will authenticate and validate those requests before we ever touch the Database
* This is the strategy we will use to "lock down" our data

## Implement our security strategy
* We will modify 2 files
    - on the Prisma side of things
        + prisma/prisma.yml
            * We will configure a secret here
    - on the Node.js side of things
        + prisma.js
            * And to make sure our connection from Node.js still works we will add the same secret onto the options object we pass into our constructor for prisma binding

`prisma.yml`

```
endpoint: http://localhost:4466
datamodel: datamodel.prisma
secret: donottellanyonethatthisismysecret
```

* **tip** Better to use a password generator in production

## Save and redeploy Prisma
`$ cd prisma && prisma deploy`

* Once we run this we will have completely "locked down" prisma and anyone that wants to communicate with it will need to provide our secret

## Test to make sure Prisma is locked down
`$ cd ../ && npm start`

### Now try to get data from Prisma (localhost:4000)
* Let's grab all posts

```
query {
  posts {
    id
    title
    published
    body
    author {
      id
      name
    }
  }
}
```

* You will get this error:

```
{
  "data": null,
  "errors": [
    {
      "message": "Your token is invalid. It might have expired or you might be using a token from a different project.",
      "locations": [],
      "path": [
        "posts"
      ],
      "code": 3015,
      "requestId": "local:cjxfeqheq0bu00759snfz63eh"
    }
  ]
}
```

* Now also try to connect directly to Prisma (localhost:4466)

```
query {
  users {
    id
    name
    email
  }
}
```

* You will see a similar "token is invalid" error

## Fix this
* We want to still communicate with Prisma but on our terms - via Node.js
* We can accomplish this by providing that same secret in Node.js

`src/prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'donottellanyonethatthisismysecret',
});

// MORE CODE
```

* Now we are going to be able to communicate with Prisma via Node.js

## Test
### localhost:4466 (this should still fail)
* It does

### Now try Node.js (localhost:4000) ---> This should now work!
* It does!
* Excellent. We now have a way to force all communication to go through Node.js
    - This will aid greatly when dealing with authentication and validation
    - We want to force all requests to "pass through" Node.js
* Now given our current setup it is impossible to use `localhost:4466`
    - But we still may want to interact with Prisma for development reasons
        + We add a new model or some new fields and we want to explore them over in the Prisma API before we try an integrate them into Node.js
        + We can still interact with localhost:4466 securely by providing an authorization token
            * We can do this by setting up an HTTP header
            * In GraphQL Playground there is a HTTP HEADERS section and this is nothing more than JSON
                - We provide an object with key/value pairs
                    + We have the "header name" and the "header value"
                    + We can set up an Authorization Bearer token to get all this set up securely

## Authorization Bearer token syntax

```
{
    "Authorization":"Bearer ENTER_TOKEN_HERE"
}
```

* This Authorization Bearer token is not our secret
* It is something we can generate using Prisma cli command

## Generate an Authorization Bearer token using Prisma
1. Shut down server
2. `$ cd prisma && prisma token`

* This will generate an authorization token that we can use for standard HTTP requests
    - It is something that we can put inside of a header allowing us to authenticate that we do have access to the Prisma API

![generate authorization token](https://i.imgur.com/ciB2T87.png)

* This is where you put the authorization token in GraphQL Playground

![authorization token in GraphQL Playground](https://i.imgur.com/8ytIoXQ.png)

* **important** There needs to be a space between the word "Bearer" and your token

```
{
  "Authorizaton":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTYxNzY4Nzg4LCJleHAiOjE1NjIzNzM1ODh9.PJVXTmAGXMFqrL3YkPiuYMDV31eBXxUQK2Y-ya3ozqA"
}
```

* After entering this in localhost:4466 GraphQL Playground we can now securely access the Prisma API from Node.js

## We are secure
* At this point Prisma is secure
* No one who doesn't have access to Prisma can access it
* We have forced all requests to go through Node.js

## Next
* Diving into Authentication

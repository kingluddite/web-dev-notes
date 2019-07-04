# Exploring the Production Prisma Instance
* Click on Prisma Cloud Service
    - It takes a bit to load
    - Click Reload to load page faster
* You can **see the Types**
    - User
    - Post
    - Comment
* Initially they are empty because we haven't created any yet
* There is a **metrics page**
    - Gives us info about our server and how things are working
    - Keep track of the server health
* We have **Deployment history**
    - Click on to see the details of that deployment
* We also have access to GraphQL Playground
    - That loads a GraphQL Playground instance for our Production Service
    - This is a great feature of Prisma Cloud
    - It also automatically injects the Authorization header via the URL
        + You can also see it has been added down below in the **HTTP HEADERS**
        + We can securely make requests
    - This will read/write to our Production Database

## Query Production
* For all users for their id name

```
query {
  users {
    id
    name
  }
}

```

* No names yet
* Add a new tab and add `createUsers` mutation
* **note** All Queries, Mutations and Subscriptions match up exactly with what we saw at localhost:4466

```
mutation {
  createUser(data: {
    name: "George",
    email: "george@president.com",
    password:"123password"
  }) {
    id
    name
    email
  }
}
```

* View users query and you will see new user
* We just successfully written and read from our production Database

## View Production data in pgAdmin
* Right click pgAdmin schemas and refresh
* You will see your Production Database show up
    - Mine is called kingluddite-blogging

![new schema production Database](https://i.imgur.com/I6Vo1Ep.png)

* You will see all tables
* You will see the User table has the user we just created inside it 

![new user in pgAdmin](https://i.imgur.com/mCwV85p.png)

## Why is our password in plain text?
* Because we didn't go through our node app that has the encryption code inside it

## View data in Prisma Cloud
![new Prisma Dashboard for Database](https://i.imgur.com/zgdwfuN.png)

* You can edit the Database from Prisma Cloud

## Next
* We need to figure out how to host our Node.js app

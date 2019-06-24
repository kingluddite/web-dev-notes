# Modeling a Review System with Prisma: Set Up
* Goal: Create a new Prisma project and model the data for a different application
* You will model what is needed for a review website
    - book review or computer review or movie review website

## Time saver - install on VS Code the `Duplicate Action`
* With the `Duplicate Action` plugin installed on VS Code, right click `prisma folder` and select **Duplicate file or directory**

![duplicate folder](https://i.imgur.com/r1Bviz5.png)

* Rename the duplicate folder `prisma-review-website`

## Working inside prisma-review-website
* Delete `docker-compose.yml`
    - Why?
    - You only need a single **docker** container to deploy multiple applications
    - So there is no need to create a new separate docker container to get another project up and running
        + This is good news which means we do not need to create a separate Database and also means we don't have to create new Database connection details

## What do we need to do to configure this as a new project
* Just make a change to the endpoint value in `prisma.yml`

`prisma.yml`

```
endpoint: http://localhost:4466
datamodel: datamodel.prisma
```

* We will be adding something onto the end of the **endpoint**
* **note** When you deploy a prisma project if you just have a URL like this it ends up determining 2 things:

1. Setting the **service name** to default
2. And it sets the **stage name** to default

* **note** This is exactly why we see default$default in pgAdmin
    - It is the default `service` and the default `stage` because none were provided in our prisma.yml file

## Now we'll customize our prisma.yml
```
endpoint: http://localhost:4466/default/default
datamodel: datamodel.prisma
```

* But we can change the endpoint to anything we like

### Examples
* Maybe we have a `dev` stage

```
endpoint: http://localhost:4466/default/default
datamodel: datamodel.prisma
```

* Maybe we have a test stage

```
endpoint: http://localhost:4466/default/test
datamodel: datamodel.prisma
```

* Separate data stores we can actually use

## We will create a new service
* Think of `service` like a new project
* We will call it **reviews** for the `service`
* And for the **stage** will stick with `default`

`prisma.yml`

```
endpoint: http://localhost:4466/reviews/default
datamodel: datamodel.prisma
```

* With this change when we deploy again, it will create an entirely new space to store the prisma reviews data and this will not conflict with our privious blog data
* Think of reviews as the project name
* Think of default as the stage name
* Both names can be whatever you like but if you don't pick any `default` is used for both

## datamodel.prisma
* Just a duplicate of the datamodel we had before
* Remove Comment and Post type - they will not be part of our new app
* We will have users but for now only have an `id` field

`datamodel.prisma`

```
type User {
  id: ID! @id
}
```

* Most apps will have users
* Users will still have id's
* This is our very basic starter boilerplate

## How do we deploy this new project?
* Back out of current project

`$ cd ..`

* Change into the new project

`$ cd prisma-review-website`

* Deploy the new project

`$ prisma deploy`

* You will see the new type and field created for User in the Terminal

```
Changes:

  User (Type)
  + Created type `User`
  + Created field `id` of type `ID!`
```

* You will see the new endpoint live:

```
our Prisma endpoint is live:

  HTTP:  http://localhost:4466/reviews
```

## View pgAdmin
* You will see the new schema `reviews$default`

![new reviews schema pgadmin](https://i.imgur.com/2WeL3PY.png)

* And we have completely separate tables inside the same Database

![user table in reviews Schema](https://i.imgur.com/ItF4PU6.png)

## GraphQL Playground
* Before we used this URL endpoint
    - http://localhost:4466/
    - But we could also use this endpoint
        + http://localhost:4466/default/default
        + View the DOCS and you'll see users, posts and comments
    - But our new URL endpoint is:
        + http://localhost:4466/reviews/default
        + View the DOCS and you'll just see users

### Challenge
* Create 3 types
    - Book
        + id! @id
        + title!
        + author!
        + isbn!
    - User
        + id! @id
        + username! @unique
    - Review
        + id! @id
        + text
        + rating! INT

#### Relationships
![diagram of relationships for reviews](https://i.imgur.com/PNAo34Z.png)

* There will be a relationship between book and review
* Book will have a reviews field which links to all the reviews made for that book
* Review will have a book field which links to the book being review
* There will be a relation between the Book type and the User type
    - A review will have an author property that points to the user that left the review
    - Every user has a collection of reviews on the reviews field
        + So If I have 16 reviews I can find them all there

##### Challenge
* Goal: Model a review website using prisma

1. Define Book, User, and Review with their scalar fields
2. Configure the relationships between the types
    * Deleting a book should delete its reviews
    * Deleting a user should delete its reviews
3. Deploy the application
4. Test your work from the Prisma Playground
    * Create a book
    * Create two users
    * Have each user leave a review for the book
    * Delete a user and ensure that the review is deleted too
    * Delete the book and ensure that the other review goes away

### Solution
1. Define Book, User, and Review with their scalar fields

```
type Book {
  id: ID! @id
  title: String!
  author: String!
  isbn: String!
  reviews: [Review!]!
}

type User {
  id: ID! @id
  username: String! @unique
  reviews: [Review!]! 
}

type Review {
  id: ID! @id
  text: String
  rating: Int!
  book: Book!
  author: User!
}
```

2. Configure the relationships between the types
    * Deleting a book should delete its reviews
    * Deleting a user should delete its reviews

```
type Book {
  id: ID! @id
  title: String!
  author: String!
  isbn: String!
  reviews: [Review!]! @relation(name: "ReviewToBook", onDelete: CASCADE)
}

type User {
  id: ID! @id
  username: String! @unique
  reviews: [Review!]! @relation(name: "ReviewToUser", onDelete: CASCADE)
}

type Review {
  id: ID! @id
  text: String
  rating: Int!
  book: Book! @relation(name: "ReviewToBook", onDelete: SET_NULL)
  author: User! @relation(name: "ReviewToUser", onDelete: SET_NULL)
}
```

* If we delete a review, I don't want to remove the book and we don't want to remove the author

3. Deploy the application

* Inside the `prisma` folder

`$ prisma deploy`

4. Test your work from the Prisma Playground
    * Create a book

```
mutation {
  createBook(
    data: {
      title: "The Old Man and the See",
      author: "Hemingway",
      isbn:"111323423344444",
    }
  ) {
    id
    title
    author
    isbn
    reviews {
      id
      text
      rating
    }
  }
```

* Create two users

```
mutation {
  createUser(data: {
    username: "WakeupGuy"
  }) {
    id
    username
  }
}
```

* Have each user leave a review for the book

```
mutation {
  createReview(data: {
    rating: 1,
    book:{
      connect: {
        id: "cjx9np84n0e4j0759l8n6ck5q"
      }
    },
    author: {
      connect: {
        id: "cjx9nn4670e2m0759ctnuqc4x"
      }
    }
  }) {
    id
    rating
    text
    author {
      id
      username
    }
  }
}
```

* Run a query to see everything you created

```
query {
  books {
    id
    title
    author
    isbn
    reviews {
      id
      text
      rating
      author {
        id
        username
      }
    }
  }
}
```

* Delete a user and ensure that the review is deleted too

```
mutation {
  deleteUser(where:{
    id: "cjx9nn4670e2m0759ctnuqc4x"
  }) {
    id
    username
  }
}
```

* Use your books query to see the review was deleted (both the user and that user's reviews were correctly deleted)

```
mutation {
  deleteBook(where: {
    id: "cjx9np84n0e4j0759l8n6ck5q"
  }) {
    id
    title
  }
}
```

* Check to see if all reviews were removed

```
query {
  reviews {
    id
    text
    rating
    author {
      id
      username
    }
    book {
      id
      title
      author
      isbn
    }
  }
}
```

* Looks like the review were removed

```
{
  "data": {
    "reviews": []
  }
}
```

* Delete the book and ensure that the other review goes away



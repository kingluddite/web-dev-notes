# Intro to GraphQL
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## What is GraphQL?
* Spin up a server for GraphQL to work with data
* A way to fetch that data from the client

### GraphQL is agnostic to a language
* Your server can implement GraphQL in any language it wants
* The frontend - the thing that consumes your graphql, the browser, arduino, microcontroller, anything that needs to consume the data could interface with a GraphQL interface

### GraphQL is a spec
* Anytime you learn an API you need to know how it works
* What tokens do I need to pass this API
* Do I need a GET request or POST request
* If I'm creating an item is it a POST or a PUT
* If I'm deleting an item is a POST request or a DELETE request
* It gets confusing to have to relearn an API across each one

#### Random API
`https://api.github.com/users/hadley`

* Lots of different pieces of info
* What if I only want the `url` from that API, all the other data is useless to me
* GraphQL can replace REST
* Or you could create a GraphQL server to sit in front of a REST API to proxy the data inbetween it

### How will we implement GraphQL?
* On the frontend we will use Apollo
* On the backend with a library called Prisma and another library called GraphQL Yoga

#### Sample GraphQL GUI
`https://us1.prisma.sh/wesbos/sick-fits/dev`

* GraphQL is a single endpoint that you hit
* This is different than a REST API that has many different URLs that you would hit
* To grab data from multiple URLs you would have to make multiple requests

##### GraphQL only sends data you request
* You have one endpoint in GraphQL
* You tell it what data you want
* GraphQL sends you a data object with only the data you request

#### Test it out
* In the sample endpoint we will query for all the items `id` and `title`

```
query {
  items {
    id
    title
  }
}
```

* Returned data:

```
{
  "data": {
    "items": [
      {
        "id": "cjfilqeb401ns0b39u85i60jx",
        "title": "Nudie Jeans Belt"
      },
      {
        "id": "cjhm9w3zekfz30b6244wzjdrz",
        "title": "Nudie Belt"
      },
      {
        "id": "cjhm9x66nkg630b62fv96j00i",
        "title": "Vapormax"
      },
      {
        "id": "cjhma65hnki710b621ttdhwbt",
        "title": "Black Hole"
      }
    ]
  }
}
```

* This is useful and easy to request data and interpret that data
    - You write in a "very similar syntax to json" for your GraphQL query
    - The data is returned in that json format with the values of the properties you requested

## Multiple queries in one query
```
query {
  items {
    id
    title
  }
  users {
    name
  }
}
```

* And the returned data looks like:

```
{
  "data": {
    "items": [
      {
        "id": "cjfilqeb401ns0b39u85i60jx",
        "title": "Nudie Jeans Belt"
      },
      {
        "id": "cjhm9w3zekfz30b6244wzjdrz",
        "title": "Nudie Belt"
      },
      {
        "id": "cjhm9x66nkg630b62fv96j00i",
        "title": "Vapormax"
      },
      {
        "id": "cjhma65hnki710b621ttdhwbt",
        "title": "Black Hole"
      }
    ],
    "users": [
      {
        "name": "Manny"
      },
      {
        "name": "Mo"
      },
      {
        "name": "Jack"
      },
    ]
  }
}
```

* Here is visual evidence of the benefits of GraphQL
* One request pulls in the minimum data you request

## GraphQL is self documenting
* As you create your GraphQL API it will create the documentation for you

## GraphQL is typed
* When you define your data you have to specify what type of data it will be
* [GraphQL typed documentation](https://graphql.org/learn/schema/)

### Benefit of typed language
* When you make your programming language strictly typed you get the benefit of tools being able to analyze your code and provide to you a bunch of documentation
* This is how our GraphQL GUI can give us a dropdown of what types we can choose to request in our GraphQL query
    - As opposed to JavaScript "weakly typed" language

#### Schema tab
* In GraphQL GUI will list all queries and mutations
* Click to expand Schema tab
    - Shows you want you have available
        + Queries
            * cartItems
            * orders
            * users
            * items
            * orderItems
            * cartItem
            * order
            * user
            * item
            * orderItem
        + Mutations
            * All the CUD (create, update, delete) actions on your data

### data relations
* Get the users associated with items

```
query {
  items {
    id
    title
    user {
      name
      id
    }
  }
}
```

* Data output

```
{
  "data": {
    "items": [
      {
        "id": "cjfilqeb401ns0b39u85i123",
        "title": "car",
        "user": {
          "name": "Manny",
          "id": "cjf4ekjrnydd40916xpyq1234"
        }
      },
      {
        "id": "cjhm9w3zekfz30b6244wzj545",
        "title": "tie",
        "user": {
          "name": "Moe",
          "id": "cjf4ekjrnydd40916xpyq45fdj"
        }
      }
    ]
  }
}
```

* Grabbing even more data
    - A user also has orders and a cart

```
query {
  items {
    title
    user {
      name
      id
      cart {
        quantity
        item {
          title
          user {
            name
          }
        }
      }
    }
  }
}
```

## Filtering data
* GraphQL doesn't do it by itself
* But a tool like Prisma has these built in but they are specific to Prisma
* GraphQL is just a way to vocalize what you want and that gets passed to your server and your server implements these things called `resolvers`

### What are resolvers?
* They answer the question "how and where do I get this data from"
* And then that is where you end up using your MongoDB or MySQL and that is where you handle all the filtering and sorting
* GraphQL doesn't replace these different database things it is just a standard to request a specific data

#### Search items where `title` contains the text `hole`
```
query {
  items(where: {
    title_contains:"belt"
  }) {
    title
  }
}
```

* Use must use double quotes `""` or it will error in GraphQL queries
* date output

```
{
  "data": {
    "items": [
      {
        "title": "Black hole",
        "description": "bla bla bla about ties"
      },
      {
        "title": "hole in one",
        "description": "golf stuff"
      }
    ]
  }
}
```

### Change of mindset if you are coming from REST
* We now just have one API endpoint
* It is all in the queries and mutations in how we push and data to that API

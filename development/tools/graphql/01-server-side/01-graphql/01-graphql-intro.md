# Intro to GraphQL

## What is GraphQL?
![client server](https://i.imgur.com/xr5WXxT.png)
* A query language
* more flexible & efficient approach than REST

### RESTful Approach
* If we sold books and author
![RESTful diagram](https://i.imgur.com/e7u2OJL.png)

* Endpoint for getting a particular book
    - domain.com/books/:id
        + would bring back data like title, genre, reviews, authorid
* Endpoint for getting the author info of that book
    - domain.com/authors/:id
        + would bring back name, age, biography, bookIds

* It gets inefficient when we need to make 3 or 4 requests for different books

## But with graphql we make just one request and we get all the info we need
* query to get book data and its author data (and the other books)

```
{
    book(id: 123) {
        title
        genre
        reviews
        author {
            name
            bio
            books {
                name
            }
        }
    }
}
```

* only one HTTP request instead of many
* You can refine your search to only get what you need

## REST API Endpoints
![rest api](https://i.imgur.com/FP4d1d5.png)

* We use React on front end and make requests to different Endpoints to get different data like:
    - Get all books
        + domain.com/books
    - Get a single book
        + domain.com/book/:id
    - Get all authors
        + domain.com/authors
    - Get a single author
        + domain.com/authors/:id

But with graphql we put all our points on a "graph"

![walking the graph](https://i.imgur.com/wSOBeFT.png)

walking to the data

![graphql walking](https://i.imgur.com/anLgwnZ.png)

* we will get a response back from this data query

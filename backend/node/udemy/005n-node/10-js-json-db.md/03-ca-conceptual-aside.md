# Conceptual Aside
## NoSQL and Documents

## NoSQL
* A variety of technologies that are alternatives to tables and SQL
* One of those types is a **document** database
* MongoDB is one of those

## What if this is what we stored in the Database?
```js
[
    {
        id: 1,
        firstName: 'John',
        lastName: 'doe',
        address: '111 Elm St.'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'doe',
        address: '111 Elm St.'
    }
]
```

* We used to be worried about repeating data because it cost a lot
* It is cheapar now so we can tolerate repeating data
* We want the ability to quickly add fields to our tables
* Not that easy with MySQL
* Fairly simple and straightforward with NoSQL

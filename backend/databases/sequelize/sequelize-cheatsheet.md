# Sequelize

## CRUD
```
CRUD Operation  => HTTP Verb  => SQL Keywor => Sequalize Method

CREATE => POST => INSERT INTO => .create()

READ => GET => SELECT what FROM where => .findAll() || .findOne()

UPDATE => PUT => UPDATE what Where => .update()
DELETE => DELETE => DELETE WHERE => .destroy()
```

## JOINS
```
SELECT * FROM authors INNER JOIN books ON authors.id = books.authorId
```

### In Sequalize:
1. Describe table relationship, `.hasMany()`, `.belongsTo()`
2. Optionally use include `property` in `query` object
3. Sequelize is an ORM => Object Relational Mapping

#### In Sequelize, what is a Model?
* A Model is Schema, but also a point of interaction for a given TABLE;

#### MySQL vs. SQL
* MySQL => Relational Database implementation, (eg, MariaDB, Postgres)
* SQL => Structured Query Language
* NoSQL => Document based database

## SQL Joins
![sql joins diagram](https://i.imgur.com/IRtjFBE.png)

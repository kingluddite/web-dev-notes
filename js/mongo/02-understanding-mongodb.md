# Understanding MongoDB

[NoSQL DB's Explained](https://www.mongodb.com/nosql-explained)

[SQL to MongoDB Mapping Chart](https://docs.mongodb.com/manual/reference/sql-comparison/)

## Collections
### How to see data models in MongoDB terms
* Users _(authors)_
    - name
    - signupDate
    - email address
* Posts _(organized blog post content)_
    - title
    - description
    - body
    - author
        + _(special field)_ because it stores a reference to a user from the user collection

## Way to think about collections
* If you are from a relational database background
    - Think of collections like tables
        + Each document would be a row _(record)_
        + But with Mongo is each row might not have all columns _(fields)_

In a relational DB you have to define a schema which sets each column with a specified type
* It is tedious to manage data that is not there
    - **Example**: A blog post without a description
         + In a RDBMS (_relational DB management system_) you have to store `null` for that column
         + But in MongoDB, you don't have to do that and can just leave the field empty 

## Mongo Blog
[github repo](https://github.com/hdngr/treehouse-mongo-basics)

* Clone the above directory

## Load our data model into mongo using `seed.js`
* Move the `seed.js` close to your mongo shell on your file system
    - because you will load the seed file with a relative path to wherever you run the shell from
* Run `mongod` (mongo daemon)
* In another terminal window, run `mongo`
    - type `ls()` to show what's inside
* Load `seed.js` into mongo with `load(./seed.js')`

The load command is relative to the `pwd` (present working directory) of where you launch the mongo shell from.

## Quitting Mongo
* But if you quit with `quit()` mongo
* And moved 2 directories up `cd ../../`
* Type `pwd` to see where you are
* Then type Mongo
* Then you need to use `load('./Documents/dev/mongo-basics')`

## Review the seed.js comments
Lots of goodies in there to see how to create and manipulate data using good ole JavaScript

## Useful queries

### How many users? 
`> db.users.count()`

### How many posts? 
`> db.posts.count()`

### Show all users
`> db.users.find()`

### Find an individual user
`> db.users.find()[1]`
* Search the collection like it is an array

`ISODate()` format: human readable which is nice

## Keyboard Shortcut: Clear Mongo Shell

```
> cls
```

### Find all posts
`> db.posts.find()`

### Find only 2 posts
`> db.posts.find().limit(2)`
* It only returns 2 documents

Mongo 
  Pro - It has a nice chaining syntax

## Show The title of a post

```
> var post = db.posts.find()[1];
> post.title
```

returns `I love the holidays`

**author** field is a reference field

`post.author` _(will give you and ObjectId)_
* This is called a **reference field** because it references documents in another `collection` _(users)_

#### How can I use the reference field to find out the user mentioned in the posts collection?

```
> var id = post.author
> db.users.find(id)
```

**Outputs** _(Yours might be different because users were generated randomly)_

```
{ "_id" : ObjectId("5796d13c25b1e970624513b9"), "name" : { "first" : "Bill", "last" : "Noor" }, "signupDate" : ISODate("2016-07-26T02:55:56.428Z") }
```

The Mongo Shell is great for management and data exploration. However, almost every functional programming language has a library to access Mongo directly.

## Managing Collections
* db.getCollectionNames()
* db.posts.count()
* use mongoBasics
* db.posts.getIndexes()

```
[
    {
        "v" : 1,
        "key" : {
            "_id" : 1
        },
        "name" : "_id_",
        "ns" : "mongoBasics.posts"
    }
]
```

## Indexes
There is one index and it is on the **_id** key
* Mongo automatically created this index to facilitate quick lookups by a documents **_id**

If we create our own indexes we can boost our performance in a major way

With our blog we may want to create an index on post title, since people may search posts by their title

[createIndex documenation](https://docs.mongodb.com/v3.0/reference/method/db.collection.createIndex/#db.collection.createIndex)

## Create an index

Create an index and and index the documents in ascending order

```
> db.posts.createIndex({title: 1})
```

Or index documents in descending order

```
> db.posts.createIndex({title: -1})
```

or pass a second parameter if you want to add options

```
> db.posts.createIndex({title: -1})
```

### Compound Queries
Only really matters when you are dealing with multiple index fields to perform a lookup

[index direction matters](http://stackoverflow.com/questions/10329104/why-does-direction-of-index-matter-in-mongodb)

`db.posts.getIndexes()` to see your new index

## Delete index

```
> db.posts.dropIndex('title_-1')
```

If you drop to drop the `_id_` index, you will get an error because **mongo** uses that index internally

## Mongo Hacker is cool
[link to Mongo Hacker](https://github.com/TylerBrock/mongo-hacker)

### Install mongo hacker globally
This is just a quick way to make the screens inside Mongo look cooler

```
$ npm install -g mongo-hacker
```

## Run mongod and mongo

* Use the DB you want to use
* When you do your queries, you'll now see some nice syntax highlighting

## RoboMongo is cool

[link to RoboMongo](https://robomongo.org/)

## Query Collections

`db.posts.findOne()`
* returns 1 document

## query parameters
db.posts.findOne({})
db.posts.find({})

## query projections
db.posts.find({},{})
* Projections are an object where the keys are fields to return and the values are booleans of whether they should be returned

## So...
Don't return the body
And don't return the description

```
> db.posts.find({}, {body: false, description: false})
```

We only want the title field

```
> db.posts.find({}, {title: true});
```

* Is returns the tiltle (and it includes the _id field because you usually want to use it or see it)

But if you want to not see it

```
> db.posts.find({}, {title: true, _id: false});
```

Search for a specific title

```
> db.posts.find({title: "How to workout"},{title: true, _id: false} )
```

* Mongo looks for exact matches. If it doesn't find it, it returns 0 documents

## Query Operator
Search for one specific title OR another specific title

```
> db.posts.find({$or: [{title: "Parenting 101"}, {title: "My Awesome Recipe!"}]},{body: false, description: false})
```

## Updating Data
* You need an _id to update

db.users.find({}, {_id: true})

![output](https://i.imgur.com/f2PHwsV.png)

db.posts.find({author:ObjectId("5796d13c25b1e970624513ba")})
* Some authors **_id** may not work if they don't have posts, keep checking until you find a match

```
> db.posts.update({ author:ObjectId("5796d13c25b1e970624513ba" ) }, { $set: { tags: ['shiny', 'new', 'fun'], title: "Look at me! I'm Updated!" }})
```

Outputs

```
Updated 1 existing record(s) in 2ms
WriteResult({
  "nMatched": 1,
  "nUpserted": 0,
  "nModified": 1
})
```

### What is upserted?
If a document is not found with your query, a document will be created with your update parameters

[More mongo update modifiers](https://docs.mongodb.org/v3.0/reference/operator/update/)

## Aggregation
way to sort filter and return results for optimal performance and ease of use for other developers on your team

db.posts.find({}, {title: true})
db.posts.find({}, {title: true}).limit(2)
Object.keys(db.posts.find()[0])

## Output

```
[
  "_id",
  "title",
  "description",
  "body",
  "author"
]
```

* `documents` don't have to have all fields

## Advanced Query
I'd like to get the names of all the keys in a MongoDB collection.

```
mr = db.runCommand({
  "mapreduce" : "posts",
  "map" : function() {
    for (var key in this) { emit(key, null); }
  },
  "reduce" : function(key, stuff) { return null; }, 
  "out": "posts" + "_keys"
})
```

```
db[mr.result].distinct("_id")
```

**Output**

```
[
  "_id",
  "author",
  "body",
  "description",
  "tags",
  "title"
]
```

## Return posts in alphabetical order

```
> db.posts.find({}, {title: true}).sort({title: 1})
```

Decending order

```
> db.posts.find({}, {title: true}).sort({title: -1})
```

## Paginate results

Page 1 Results - db.posts.find({}, {title: true}).limit(2)
Page 2 Results - db.posts.find({}, {title: true}).limit(2).skip(2)
Page 3 Results - db.posts.find({}, {title: true}).limit(2).skip(4)

### Pagination Formula
Pagination formula: limit = number of records on each page, skip = number of records on each page * page number - 1

So, with 5 results per page:
page 1: limit = 5, skip = 0
page 2: limit = 5, skip = 5
page 3: limit = 5, skip = 10
etc...

You can use pagination with sorting too

Page 2 Results - db.posts.find({}, {title: true}).limit(2).skip(2).sort({title: -1})

## Language Drivers
Allow you to work with a given technology directly in the language of your application
Better ways to build applications than using the mongo shell

[list of language drivers for mongo](https://docs.mongodb.com/ecosystem/drivers/)

### Mongoose
Most well known framework for mongo

* clients
* libraries
* plugins
* binding

## Sharding
* All data is stored on one server
* But as data grows you need to store data across multiple machines
    - This is called Sharding
    - aka `horizontally scaling`
You also want multiple servers to be able to read and write data

Mongodb has a big advantage with this over relational databases
* Mongodb can spread read and write operations across as many machines as it needs to

* Mongodb can store portions of its datasets across as many different instances as it wants
* RDBMS can store data on as many databases as they want however each DB contains an entire copy of the dataset (which means they can only write to one of them)

## Master Slave architecture
One DB, the master excepts all write operations
The master is a big powerful DB, it then spreads the results of it's write Operations to the slaves (usually smaller machines) 

Hardware is always getting more and more powerful
But it is not happening always at a rate that certain applications need it to

From a performance standpoint this is why many applications choose mongo

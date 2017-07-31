# [MongoDB](https://www.mongodb.com/collateral/mongodb-3-2-whats-new?jmp=search&utm_source=google&utm_campaign=Americas-US-Brand-Alpha&utm_keyword=mongodb&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=101973226603&utm_matchtype=e&gclid=CjwKEAjw8da8BRDssvyH8uPEgnoSJABJmwYohk-GDN3gQ3kiH7ZlRSgLV9l3B7Uou1gVCWF-4vF9ABoCT77w_wcB) Introduction

[NBA & Mongo](https://thecodebarbarian.wordpress.com/2014/02/14/crunching-30-years-of-nba-data-with-mongodb-aggregation/)

### Mongo Errors and Troubleshooting them
* `Unable to lock file: /data/db/mongod.lock`
  - `$ sudo rm /data/db/mongod.lock`
* `Address already in use for socket: 0.0.0.0:27017`
  - `$ pgreg mongo`
  - `$ kill PID` (_you will get PID when you use previous line_)

* A DB to store persistant data for Applications

## NoSQL database
* acronym stands for `Not Only SQL`

### Comparison of NoSQL DBs and regular DBs

#### Regular DBs
* Store information in tables and have a schema
* Have a standard, mostly unified language that they are named for
    - SQL -----> Structured Query Language
    
NoSQL DBs store information in a multitude of formats and are generally less tied to schema controls

## Why should you use Mongo?
* Quick to get started _(no schema)_
* Easy to change and maintain _(without a schema to migrate)_
* Query language easy to use because it is a syntactically simple query language
    - Looks similar to a functional programming language than a query language
* Rapidly and widely adopted _(many developers are using it!)_

**note** Mongo is NOT a relational DB

## Documents
* Core of Mongo's data model
* Documents are unique records
* Very similar to JSON objects

Example

```js
{
  _id: 23423489234234,
  firstName: "Jerry",
  lastName: "Seinfeld"
}
```

* Every document has an **_id** field and that makes them uniquely identifiable
* Mongo will create and take care of this field when you create new documents
* The **_id** is a special type called **ObjectId()**
* All other fields can store any type of value
    - Numbers
    - Dates
    - Arrays
    - Objects
    - References to other documents

```js
{
  _id: 23423489234234,
  name: { firstName: 'Jerry', lastName: 'Seinfeld' },
  dob: ISO("1970-10-31T00:00:00Z"),
  roles: ['user', 'admin']
}
```

### Timestamps
[documentation](https://docs.mongodb.com/manual/reference/bson-types/#timestamps)

## Installing Mongo

Best way to install Mongo on a Mac

```
$ brew update
```

```
$ brew doctor
```

```
$ brew upgrade
```

```
$ brew install mongodb
```

### Check if Mongo is installed

```
$ which mongod
```

Output should be something like `/usr/local/bin/mongod`

You could also install it directly from the MongoDB website.

## Adding your DB
Whether you installed Mongo with homebrew or by downloading from MongoDB site, you need to add the `data/db` directory to your machine

### the -p parameter
Make the entire path, if it doesn't exist already 

```
$ mkdir -p /data/db
```

If you get permissions error

```
$ sudo mkdir -p /data/db
```

Enter your password

If you already installed with homebrew, the following command should work

## Run Mongo

```
$ mongod
```

Mongo should boot up and be running

### Permissions problems
If you run into these you need to make sure the data directory is readable and writable

```
$ sudo chmod 777 /data/db
```

## Close Mongo
`ctrl` + `c` twice

## MongoDaemon
Is an Application and the data itself is stored in its own directory (the `data/db`)

## Mongo is running, now what?
We need to open another terminal window to access mongo via the shell.

In new tab type:

```
$ mongo
```

* mongod (_mongodaemon_) - runs the mongo database
* mongo - runs the mongo shell 
  - Just an access point to the DB so we can control it

## Show all current DBs

```
> show dbs
```

### The local DB
Used by the mongo instance itself and handles internal process for mongo

### Create DB

```
> use mongoNeedFood
```

**Output**: `switched to db mongoBasics`

It means we are now inside the `mongoBasics` mongo DB

**note** If you run `show dbs` you won't see our new DB because it is empty.

### Let's add data

`> db.post.insert`

![sample mongodb](https://i.imgur.com/4t0TbkR.png)

* When we are inside **mongodb**, we only have to type `db` to represent our current database (we type `use` to switch to the current DB)
* We get insert feedback with number of documents inserted
* `post` is a collection
* Once our DB has content, it will then show up when we run `> show dbs`

### Show all collections

```
> show collections
```

### Show all documents in a collection

```
> db.post.find()
```


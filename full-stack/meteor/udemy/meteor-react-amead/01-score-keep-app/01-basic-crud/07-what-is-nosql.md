# What is NoSQL?

![NoSQL vs MySQL diagram](https://i.imgur.com/qBbSFys.png)

## Similarities
* MySQL, PostgreSQL and MongoDB are all databases
* They each request a database server to be started up
* You have to connect to it to issue commands to Create, Read, Update or Delete (_CRUD_)

That is where things are similar between NoSQL and Relational Databases

## Differences
* How the data is stored is drastically different
* SQL databases have a "predefined" table with various columns and all the records have a value for that column
    - Collection of data called **table**
    - individual item is called **Row/Record**
    - `name` column for this Record
* NoSQL is way different
    - We work with a "collection" of documents (aka Collection)
    - Individual record referred to as a **Document**
    - `name` field for this Document

### Gotchas
#### Trouble Shooting MongoDb and Meteor
If you get this error that says meteor is running but you don't see any instance of meteor running, you most likely had a bad shutdown and it is still running

![another meteor is running error](https://i.imgur.com/T0BUoxj.png)

Meteor runs on port 3000 so we look for anything that is running on port 3000

`$ sudo lsof -i :3000`

That will return the PID of that program on port 3000

![PID returned](https://i.imgur.com/dgl7G4y.png)

Kill it with `$ sudo kill -9 3981

That should do the trick.

You can also try to find all mongo instances running with:

`$ ps -A | grep mongo`

And then kill the PID return with `$ sudo kill -9 PID` (PID is the number returned from `$ ps -A | grep mongo`)

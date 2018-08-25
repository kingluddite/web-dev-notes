# MongoDB shell
* You don't need a GUI app to see your data
* With `mongod` running in another tab open another terminal

`$ mongo`

## list all dbs
`$ show dbs`

## Use a db
`$ use they_came_before_me`

## Show collections
`$ show collections`

## Show documents inside collection
`$ db.genealogies.find()`

## mongo hacker
* Make your mongo shell prettier with `mongo-hacker`
* [mongo-hacker repo](https://github.com/TylerBrock/mongo-hacker)

`$ npm i -g mongo-hacker`

* Will make it look like:

![mongo-hacker](https://i.imgur.com/R2rfL25.png)

## Exit out of mongo shell
`$ exit`

## Remove all records
`$ db.users.remove({})`

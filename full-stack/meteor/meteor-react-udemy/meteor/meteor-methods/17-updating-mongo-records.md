# Updating Mongo Records
Where is the best place in our application should we implement the increment of our counter?

Above the redirect statement

```
res.writeHead(307, { 'Location': link.url });
res.end();
```

Can we just do this?

```
link.clicks += 1;
res.writeHead(307, { 'Location': link.url });
res.end();
```

If we just update the increment with `links.clicks += 1`, it doesn't get saved to the database

## Collection.update()
There is an update method for collections so we will use `Links.update()`

`Links.update()`

### Mongo Modifiers
To update a record in a collection we need to use a system called Mongo Modifiers. Mongo Modifiers is a convention on how to updated records saved on a MongoDB database. Mongo Modifiers are JavaScript objects that describe a precise operation to take on a record that we are updating. Check out the [Meteor documenation](http://docs.meteor.com/). Search for Mongo Modifer and you'll [find this](https://docs.meteor.com/api/collections.html#Mongo-Collection-update):

`Links.update(link, { $inc: { clicks: 1 }});`

**note** We do not need to do a Meteor Method to update this record because we are already on the server

We only use Meteor Methods when the client is trying to update some records

### Test in browser
Open a short url in a new tab several times and you'll see each time, **Clicks** gets updated

* If I share this links with any of my friends I would see this link updated with all of the times it was clicked on 



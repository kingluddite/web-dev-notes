# Publications With Cursors!
**note** By default all data that is in our **MongoDB database** is shared with everyone who connects to our application

We need to make sure that anyone who connects to our application does not have immediate access to all the records that are stored in our database

## Two Reasons for this
1. We want to make sure our `clients` (_anyone who is connecting from the browser_), is not loading up 5000 records (_Because that would be a performance nightmare_)
2. We want to make sure that users are not having access to data that they should not have access to

## Removing autopublish
By default meteor makes all this data available to anyone who is connected to our application

We can disable this by running a command line inside of our project directory

`$ meteor remove autopublish`

### What is the autopublish package?
It is a `default` **Meteor** created **package** that automatically publishes all the data in our database to anyone who connects to our application

By removing `autopublish`, clients no longer get access to the 5000 records in our collection

## Setting up a Publication and a Subscription
This will make sure users are only getting the subset of data that they might care about

### Where is a good place to set up our publication?
`server/main.js`

**note** Our `server` defines **publications** while our `client` defines **subscriptions**

By defining a **publication** on our `server side` we're saying '_here is data that is available to all you clients. If you ask for it, I will send it to you_'

**note** I removed the `console.log(numberRecords)` that we used to test the number of records in our collection

We will add our **publication** underneath our `seeding` statement (_under the `if` block_)

```
Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if (!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name, email, phone,
        avatar: image.avatar()
      });
    });
  }

  Meteor.publish('employees', function() {
    return Employees.find({});
  })
});
```

**note** `Employees.find({})` - does not return all our records, it returns a `Cursor` (_which is kind of like a bookmark of sorts_)

### Another way to think of Cursors
It's kind of like an object that's sitting around and saying '_hey, if you want I can go and find these records but until you tell me to go and do it, I'm not going to do any work whatsoever_'

So `Employees.find({})` does not actually execute a query to our database. It is just kind of a bookmark. It says, "_hey if you want me to I can go and find all the records that exist_"

By returning a `Cursor` here we are giving **subscriptions** the ability to go and find some subset of our collection

### Limiting records to client side
No, we don't want to find all the records in our database like this:

```
Meteor.publish('employees', function() {
    return Employees.find({});
});
```

We just want to find a subset of our collection, we will use `limit` and pass a second argument like this:

```
Meteor.publish('employees', function() {
    return Employees.find({}, { limit: 20 });
  });
```

* In anyone tries to gain access to this publication, only send back the first 20 records to anyone that is asking

### Future challenge
Right now, our publication will only return the first 20 records always but soon we will add a 'more' button and we need a way to pull down the next 20 records every time someone clicks the 'more' button

### Next
We will render our out data using React

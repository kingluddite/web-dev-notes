# Reading server console logs

`server/main.js`

We supposedly just inserted 5000 user profiles. Let's verify that happened

## Add a console.log
`console.log(numberRecords);`

```
Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  console.log(numberRecords);
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
});
```

Save and make sure **Meteor** is running. You should see 5000 records inside the terminal

![5000 records](https://i.imgur.com/qw7W58q.png)

**note** If you put `console.log()` lines inside of your server code,  you will see those `console.log()` statements appear in your Terminal and not in the client console (_where you probably thought they would be_)

## Great!
Now that we have our data organized we are going to switch to the **React** side of things and start **consuming** these records



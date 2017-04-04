# Reading server console logs

`server/main.js`

## Verify and validate!
We supposedly just inserted 5000 user profiles. Let's verify that actually happened

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

## What? No data?
Save and make sure **Meteor** is running. You should **NOT** see 5000 records inside the terminal

The reason is that we will only run our faker data insert when our Meteor app first starts up (_That's when the check happens_)

Stop Meteor and run it again. After it starts up, you should see 5000 records. You won't see it running in the console because that is the client and you are running this code on the server. You check for console.log() that are written server side inside your terminal. If you look at your terminal, you will see 5000 and that lets you know you now have 5000 Employee records

![5000 records](https://i.imgur.com/qw7W58q.png)

**note** If you put `console.log()` lines inside of your server code,  you will see those `console.log()` statements appear in your Terminal and not in the client console (_where you probably thought they would be_)

## Great!
Now that we have our data organized we are going to switch to the **React** side of things and start **consuming** these records



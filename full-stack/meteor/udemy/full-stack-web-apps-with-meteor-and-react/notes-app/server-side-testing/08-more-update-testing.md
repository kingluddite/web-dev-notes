# More Update Testing
## Houston we have a problem
Anyone can update a note as long as they have an 'id' and they are authenticated

* You will have bugs in your code but you want to write a test case that proves you fixed the bug

```
it('should not update note if user was not creator', function() {
      const title = 'Updated Title';

       Meteor.server.method_handlers['notes.update'].apply({
         userId: 'testId'
       }, [
         noteOne._id,
         { title }
       ]);

       const note = Notes.findOne(noteOne._id);

       expect(note).toInclude(noteOne);
    });
```

* We get an error
![our error](https://i.imgur.com/8KpkLd9.png)

* We used the code from another test and modified it slightly to save us having to type it from scratch
* We add in a bogus `userId` and we expect to see our `note` to include `noteMatch` but since they don't match we get an error
* We don't want someone who's userId doesn't match the user who is logged in to be able to update a note and this test checks to make sure they do match
* So this error let's us know that we have a bug in our code and that currently users that are logged in can update any note they want so we need to go into `notes.js` to fix this bug (and if we are successful our test will pass)

`notes.js`

```
// more code
'notes.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Notes.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
```

And now our test passes because we make sure to check that our `update()` has the `_id` and that the `userId` has a value of the currently logged in user `this.userId`

![test passes](https://i.imgur.com/SuKfrZy.png)

### Exercise
* Check if we are authenticated
* Check if there is no `id` we throw an error
* Copy and paste [this code](https://i.imgur.com/URDfENE.png) as a starting point

<details>
  <summary>Solution</summary>
```
it('should not update note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne.userId]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

![All tests should be passing](https://i.imgur.com/vknGRot.png)
```
</details>

**note**
* `insert` has two tests
* `remove` has three tests
* `update` has five

You will find that `insert` is the easiest to test for where `update` will be the one you write the most tests for because it is the most complex

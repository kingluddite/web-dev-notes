# More Update Testing
## Houston we have a problem
Anyone can update a note as long as they have an `_id` and they are authenticated

* You will have bugs in your code but you want to write a test case that proves you fixed the bug

```
/* eslint-env mocha */
it('should not update note if user was not creator', function() {
      const title = 'Updated Title';

       Meteor.server.method_handlers['notes.update'].apply({
         userId: 'loggedInByNotCreatorId'
       }, [
         noteOne._id,
         { title }
       ]);

       const note = Notes.findOne(noteOne._id);

       expect(note).toInclude(noteOne);
    });
```

## Oh no! We get an error.

![our error](https://i.imgur.com/8KpkLd9.png)

#### Productivity tip
* We used the code from another test and modified it slightly to save us having to type it from scratch (_productivity tip_)

### what is `toInclude()`
* Asserts that a given value is included (_or "contained"_) within another
* The actual value may be an array, object, or a string
* The comparator function, if given, should compare two objects and return false if they are not equal
* The default is to use **isEqual**

### What we need to test for
* We would expect that if a user tries to update a record he does not own, that the record would not change so we need to test that the record did not change
* So we should check that our document is exactly what is in `noteOne` object. There should be a match. If we alter that document with a successful update, then this is bad and we should get a failed test
* If the document stays the same even after an update, then we pass the test and this is good
* The error shows that our new document (_because we updated it_) does not match our original document and that is the fail
* So we have to go into our **Meteor Method** and make sure `userId` is set to `this.userId` (_the logged in user_), this means the owner of the document is the one updating the document (_we have to add this and so we create an object and stick this inside of our already `_id` property_)

`notes.js`

```
// more code
Notes.update(
      {
        _id,
        userId: this.userId,
      }, {
        $set: {
// more code
```

## What happened?
* We add in a `userId` but this Id is suppossed to represent a logged in user who is not the creator of the note we are updating, and we expect to see our `note` to include `noteMatch` but since they don't match we get an error
* We don't want someone who's `userId` doesn't match the **user who is logged in** to be able to update a note and this test checks to make sure they do match

### We have found a bug in our code
* This is unlike our `notes.remove` where `userId` and `noteId` had to match
* So this error let's us know that we have a bug in our code and that currently users that are logged in can update any note they want so we need to go into `notes.js` to fix this bug (_and if we are successful our test will pass_)

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
We want to write tests to:

* Test that we throw an error if we are not authenticated when we update
* Test that if there is no noteId we throw an error when we update

#### Hint
Super similar to how we did it when we inserted notes

<details>
  <summary>Solution</summary>
```
/* eslint-env mocha */
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

```

</details>
![All tests should be passing](https://i.imgur.com/vknGRot.png)

**note**
* `insert` has two tests
* `remove` has three tests
* `update` has five

You will find that `insert` is the easiest to test for where `update` will be the one you write the most tests for because it is the most complex

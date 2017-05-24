# Testing Note Updating

Normally it is good to use TDD (_Test Driven Development_) where you write your tests before you write your code

But we really don't have a firm grasp on the `update` Meteor Method yet, so let's code and analyze how we coded it

`notes.js`

```
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
  }
```

* `notes.update` takes two arguments `_id` and `updates`
* We check to make sure the user is logged in
* We make sure there is an `_id` and we make **title** and **body** accept Strings but they are both optional
* `...updates` is great because this is the `spread operator` and it will spread all of the other fields that are getting updated (**title** and/or **body**)
    - But if a malicious user tries to add other fields, `SimpleSchema` will block them because those other fields were not defined inside our schema

And we need to add our `Notes.update()` call

`notes.js`

```
// more code

Meteor.methods({
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

    Notes.update(_id, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
```

* `...updates`, we are using the **spread operator** `...` again to take all the values passed and update them
* We know that `...updates` has no malicious data because **SimpleSchema** will reject any fields not inside the Schema we defined

### Using variables inside our test file
We will create a variable and still our note dummy document inside it and then we'll just pass that to our Collection's `insert` method

```
const noteOne = {
  _id: 'testNoteId1',
  title: 'My Title',
  body: 'My body for note',
  updatedAt: 0,
  userId: 'testUserId1'
}

beforeEach(function() {
  Notes.remove({});
  Notes.insert(noteOne);
});
```

### Refactor using our new variables

`notes.test.js`

```
// more code

if (Meteor.isServer) {
  describe('notes', function() {

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    }

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
    });

    // more code

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    it('should not remove note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne.userId]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });
  });
}
```

## More Flexible Code!
* Now our code is more flexible setup
* We can change our seed data without worrying about breaking our test cases and having to spend the time refactoring them
* Test and you should see it works as it did before

## Tests for update
`notes.test.js`

```
/* eslint-env mocha */
it('should update note', function () {
      const title = 'Updated Title';

       Meteor.server.method_handlers['notes.update'].apply({
         userId: noteOne.userId
       }, [
         noteOne._id,
         { title }
       ]);

       const note = Notes.findOne(noteOne._id);

       expect(note.updatedAt).toBeGreaterThan(0);
       expect(note).toInclude({
         title,
         body: noteOne.body
       });
      });
```

## Analysis of what we just did
* We have a dummy new title
* We use our special **Meteor Method** to call the `notes.update` **Meteor Method** and we pass it a logged in `userId`
* We point to the `_id` of the test note we are updating
* And we pass our new title to be the entry for this test document
* We then query to to find that one note
* We make sure that it has a `updatedAt` value greater than `0`
* And it has our new `title` and a body inside that matched the one in our dummy data object `body` property

## Exercise
We want to make sure we get an error if someone adds fields not in our Notes Collection

* It should throw error if extra updates (_make up a field and value_)
    - Expect some function to throw
        + Call `notes.update` with extra updates

<details>
  <summary>Solution</summary>
```
/* eslint-env mocha */
it('should throw error if extra updates provided', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { title, name: 'Bad Data' }
        ]);
      }).toThrow();
    });
```

![Server test passes for extra updates](https://i.imgur.com/CswE8Gi.png)

</details>

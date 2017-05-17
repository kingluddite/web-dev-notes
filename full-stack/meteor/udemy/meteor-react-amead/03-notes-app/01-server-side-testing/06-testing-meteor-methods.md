# Testing Meteor Methods

Create inside `imports/api` `notes.js` and `notes.test.js`

`notes.js`

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Notes = new Mongo.Collection('Notes');

Meteor.methods({
  /* eslint func-names: ["error", "as-needed"] */
  'Notes.insert': function () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: new Date().getTime(),
    });
  },
});

export default Notes;
```

### Let's use `moment` instead

`notes.js`

```
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf() // new Date().getTime()
    });
  }
});
```

## Meteor.server.method_handlers
### `.apply()`
Vanilla JavaScript feature where you can call a function specifying your own `this` context

`notes.test.js`

```
/* eslint-disable */
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function() {
    it('should insert new note', function() {
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId  });

      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert note if not authenticated', function() {
      expect(() => {
          Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });
  });
}
```

* We are using `expect`'s `toThrow()` method which checks if an error was thrown
* To see what just happened jump into the test mongo db

`> mongo meteor --port 3001`

`> db.notes.find()`

## Seed data
We should have one set of seed data and that seed data should be reset for every test case

## Separate Test Database
* When you run Meteor in test mode it is running a separate database
* So when we delete our seed data we are not affecting our development data

## Remove a note test case
`notes.test.js`

```
// more code
if (Meteor.isServer) {
  describe('notes', function() {

    beforeEach(function() {
      Notes.remove({});
      Notes.insert({
        _id: 'testNoteId1',
        title: 'My Test Title',
        body: 'My Test Body',
        updatedAt: 0,
        userId: 'testUserId1'
      });
    });

    it('should insert new notes', function() {
     // more code
    });

    it('should not insert notes if not authenticated', function() {
      // more code
    });

    it('should remove presenation', function() {
      Meteor.server.method_handlers['presentations.remove'].apply({ userId: 'testUserId1' }, ['testNoteId1']);
        expect(PresentationsCollection.findOne({ _id: 'testNoteId1' })).toNotExist();
      });
    });
};
```

### `beforeEach()`
* Here we delete a document from our collection and then insert 1 record
* This happens everytime we run test

## Exercise
* Fill in the code for the Meteor Method `notes.remove`
* Check for userId, else throw an error
* You'll need SimpleSchema to validate
    - `_id` string with length greater than 1
* `Notes.remove()` to remove the note

<details>
  <summary>Solution</summary>
`notes.js`

```
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf // new Date().getTime()
    });
  },
  'notes.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id
    });

    return Notes.remove({ _id, userId: this.userId });
  }
});

```

![pass should remove note](https://i.imgur.com/r931Qxv.png)

This line is important `return Notes.remove({ _id, userId: this.userId });`

* You want to make sure you check for the `userId` otherwise an authenticated user could delete notes created by other users

</details>

## Fail the test
Update `notes.test.js`

```
// more code
it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1' }, ['testNoteId4']);

      expect(Notes.findOne({ _id: 'testNoteId1' })).toNotExist();
    });
 });
}
```

And we'll get this error: `Error: Expected { _id: 'testNoteId1', body: 'My body for note', title: 'My Title', updatedAt: 0, userId: 'testUserId1' } to not exist`

#### Review of what we just did
1. Before our test runs we delete all data from our test `Notes` Collection
2. Then we insert a dummy record with this data:

```
_id: 'testPresentationId1',
title: 'My Test Title',
body: 'My Test Body',
updatedAt: 0,
userId: 'testUserId1'
```

3. Then our test calls the `presentations.remove` Meteor Method
4. Here we pass it a valid user id (because our Meteor Method checks for its existence)
5. But we also pass it a bogus Presentation `id`, which should trigger an error when we try to query **Mongo** for that `id`
6. If we entered a bogus userId instead, we'll also get an error

### More analysis of what we just did
* We are expecting our current document in the database to be removed with this test
* If we can't remove it, our test fails
* So that is why the error says we expected the record to not exist but it does because we couldn't find it to delete it
* Think about this for a few moments to let the concept sink in

Try both scenarios out and then switch it back to pass the test

#### Take aways
* We just built a successful test to make sure we can delete notes
* We also make sure that we pass a valid `userId` before we delete any document which means only logged in users can delete documents

## Don't remove notes if not logged in
```
// more code
it('should not remove note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, ['testNoteId1']);
      }).toThrow();
    });
// more code
```

### Analysis of what we just tested
* We don't pass any `userId` which means our code should generate an error so our test here is making sure an error is thrown
    - if an error is thrown --> <u>we pass the test</u>
    - if an error is not thrown --> <u>we failed the test</u>

By passing we are assured that our we can not delete any notes if we are not logged in

![new test passes](https://i.imgur.com/IKaocCA.png)

## What if `_id` doesn't exist or is not valid
```
it('should not remove note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1' });
      }).toThrow();
    });
```

### Analysis of what we just tested for
* We just write a simple assertion that just passes a valid userID and no `note` id
* So if a logged in user tries to delete a note without a valid id or any id, we should throw an error
* If we throw an error --> we pass the test
* If we do not throw an error --> we fail the test


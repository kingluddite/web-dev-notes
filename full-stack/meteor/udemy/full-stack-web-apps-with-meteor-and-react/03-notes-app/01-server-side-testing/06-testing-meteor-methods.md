# Testing Meteor Methods

Create inside `imports/api` `notes.js` and `notes.test.js`

`notes.js`

```
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

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
      updatedAt: new Date().getTime()
    });
  }
});
```

### Let's use `moment` instead

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
`.apply()` - vanilla JavaScript feature where you can call a function specifying your own `this` context

`notes.test.js`

```
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

* To see what just happened jump into the test mongo db

`> mongo meteor --port 3001`

`> db.notes.find()`

## Seed data
We should have one set of seed data and that seed data should be reset for every test case

**note** When you run Meteor in test mode it is running a separate database. So when we delete our seed data we are not affecting our development data

## Remove a note test case
`notes.test.js`

```
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function() {

    beforeEach(function() {
      Notes.remove({});
      Notes.insert({
        _id: 'testNoteId1',
        title: 'My Title',
        body: 'My body for note',
        updatedAt: 0,
        userId: 'testUserId1'
      });
    });

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

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1' }, ['testNoteId1']);

      expect(Notes.findOne({ _id: 'testNoteId1' })).toNotExist();
    });
  });
}
```

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

![pass should remove note](https://i.imgur.com/r931Qxv.png)
```
</details>

This line is important `return Notes.remove({ _id, userId: this.userId });`

* You want to make sure you check for the `userId` otherwise an authenticated user could delete notes created by other users

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

* Switch it back to pass the test

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

![new test passes](https://i.imgur.com/IKaocCA.png)

## What if `_id` doesn't exist or is not valid
```
it('should not remove note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1' });
      }).toThrow();
    });
```


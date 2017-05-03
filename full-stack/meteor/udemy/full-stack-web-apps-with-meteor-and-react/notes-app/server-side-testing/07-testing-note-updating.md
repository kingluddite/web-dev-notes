# Testing Note Updating

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
* We make sure there is an `_id` and we make title and body accept Strings but they are both optional
* `...updates` is great because this is the spread operator and it will spread all of the other fields that are getting updated (**title** and/or **body**) but if a malicious user tries to add other fields, SimpleSchema will block them because those other fields were not defined inside our schema

And we need to add our `Notes.update()` call

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
  },
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

* `...updates`, we are using the spread operator again to take all the values passed and update them
* We know that `...updates` has no malicious data because SimpleSchema will reject any fields not inside the Schema we defined

### Using variables inside our test file
`notes.js`

```
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

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

* Now our code is more flexible setup
* We can change our seed data without worrying about breaking our test cases and having to spend the time refactoring them
* Test and you should see it works as it did before

## Tests for update
`notes.test.js`

```
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
    });
```

## Exercise
We want to make sure we get an error if someone adds fields not in our Notes Collection

* It should throw error if extra updates (_make up a field and value_)
    - Expect some function to throw
        + Call notes.update with extra updates

<details>
  <summary>Solution</summary>
```
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

![Server test passes for extra updates](https://i.imgur.com/CswE8Gi.png)
```
</details>

## Final `notes.test.js`

```
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

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
    
  });
}
```

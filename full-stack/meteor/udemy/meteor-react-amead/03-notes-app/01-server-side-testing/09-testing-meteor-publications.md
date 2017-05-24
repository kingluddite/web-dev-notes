# Testing Meteor Publications
Make sure that users can securely access the notes that they created

* publications can only be created on the server so we should check first

`notes.js`

```
if (Meteor.isServer) {
  Meteor.publish('notes', function() {
    
  });
}
```

* We use an ES5 function because we need access to the `this` keyword
    - That is where the `userId` is stored
* We `return` whatever we want the subscriber to get

```
if (Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({ userId: this.userId })
  });
}
```

So our **publication** is set up, now we can write some test cases

`notes.test.js`

* We create a new seed object
    - It will have a different `_id` and `userId`
    - We'll also change `title` and `body`

```
const presentationTwo = {
  _id: 'testPresentationId2',
  title: 'Test Title 2',
  body: 'Test Body 2',
  updatedAt: 0,
  userId: 'testUserId2'
}
```

### Good idea to streamline your dummy data
```
const presentationOne = {
  _id: 'testPresentationId1',
  title: 'Test Title 1',
  body: 'Test Body 1',
  updatedAt: 0,
  userId: 'testUserId1'
};

const presentationTwo = {
  _id: 'testPresentationId2',
  title: 'Test Title 2',
  body: 'Test Body 2',
  updatedAt: 0,
  userId: 'testUserId2'
}
```

We want to make sure this gets added to the Database so we add this line:

```
beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });
```

## Test out publication
* We put this data into action but testing out the publication
* With **Meteor Methods** we use `Meteor.server.method_handlers['notes.update']` and pay attention to the `['notes.update']` we used, but with publications we don't have any special characters (_like a dot `.`_)so we can use use `Meteor.server.publish_handlers['notes']` and we can condense that down to just:

`Meteor.server.publish_handlers.notes`

* This is pointing to the function we defined here:

![publish function for notes](https://i.imgur.com/m5q7EOT.png)

```
it('should return a users notes', function() {
       const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
       const notes = res.fetch();

       expect(notes.length).toBe(1);
       expect(notes[0]).toEqual(noteOne);
    });
```

### That test should now pass

* `Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });` returns a **Cursor** ---> So we need to use `fetch()`
    - We create another variable because the line was getting too long
* We check that the `length === 1`
    - Our test record is only `1` so if the publication is correct the length will be `1`
* We make sure that the first item in the array (_there is only one_) is === `noteOne`

## Exercise
Now on the other side of things we want to test that when a user provides a `userId` of a user who has no notes, we want to make sure we get no notes back (_length === 0_)

<details>
  <summary>Solution</summary>
```
it('should return zero notes for user that has none', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testId' });
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });
```

* We get our array (_and not a Cursor_)
* We use random `userId` (_'testId'_) which is a user that has no notes
* We check to make sure that the length of the **notes** is `0` because if it is not `0` than we know our code is wrong and people are seeing notes that are not theirs
</details>

## Testing our tests
![remove the userId](https://i.imgur.com/d7hevDp.png)

If you delete the `userID` (_see above screenshot_) you will see two tests fail

* The first error shows us the first user was able to access notes created by the second user
* And the second test case shows us a user without any notes was able to access notes that was not theirs


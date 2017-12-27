# Testing PATCH /todos:id
* To test we need to update our seed data to have fields we will be testing

`server.test.js`

```js
const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123
  },
];
```

## Challenge
```
describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    // grab it of 1st item
    // match patch request
    // provide proper url with proper id inside of it
    // use send to send some data as the request body
    // update the text, set it equal to whatever you want
    // set completed equal to true
    // once you send that off you can make your assertions
    // make one assertion using the basic system, assert you get a 200 back
    // make one custom assertion, this will verify that the response body has
    // a text property equal to the test you sent in
    // verify that completed is true
    // and you verify that completed at is a number
    // Use .toBeA method inside expect to get that done
  });

  it('should clear completedAt when todo is not completed', (done) => {
    // similar to above test but go in a different direction
    // grab id of 2nd todo item
    // update text to something different
    // set completed to false
    // make assertions
    // expect 200
    // and response body should represent those changes
    // text is changed to whatever you pick
    // check that completed is false
    // check that completedAt is null
    // use .toNotExist
  });
})
```

* When complete run `npm test` to make sure your tests pass

## Solution:
```
describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    // grab id of 1st item
    const hexId = todos[0]._id.toHexString();
    // create some new text to represent updated text
    const text = 'This is new updated text';
    request(app)
      // match patch request
      // provide proper url with proper id inside of it
      .patch(`/todos/${hexId}`)
      // set completed to true and text to new text value
      // to simulate a record updated
      .send({
        completed: true,
        text,
      })
      // 200 means all went well
      .expect(200)
      .expect(res => {
        // assert that text is new text
        expect(res.body.todo.text).toBe(text);
        // assert completed is true
        expect(res.body.todo.completed).toBe(true);
        // assert completed is true
        // UPDATE HERE BECAUSE JEST API is different
        // toBeA('number') no longer works!
        expect(typeof res.body.todo.completedAt).toEqual('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', done => {
    // grab id of 2nd item
    // this item has completed and completedAt
    const hexId = todos[1]._id.toHexString();
    // slight change to our updated text
    const text = 'This is new updated text!!!';
    request(app)
      // match patch request
      // provide proper url with proper id inside of it
      .patch(`/todos/${hexId}`)
      .send({
        // set completed to false and text to new text
        completed: false,
        text,
      })
      // all went well
      .expect(200)
      .expect(res => {
        // assert text is the new text
        expect(res.body.todo.text).toBe(text);
        // assert completed is false
        expect(res.body.todo.completed).toBe(false);
        // assert completed at is null
        // UPDATE AS JEST has different API
        // toNotExist() no longer works !
        expect(res.body.todo.completedAt).toBeNull();
      })
      .end(done);
  });
});
```

* Add commit

`$ git commit -am 'Add tests for PATCH /todos/:id'`

`$ git push origin master`

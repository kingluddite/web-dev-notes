# Testing DELETE users/me/token
`server.test.js`

```js
describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', done => {});
});
```

* We need to use some seed data
* In `seed.js`, our first user has a token array
    - We can grab this
    - use it as our `x-auth` token
    - then afterwards, we can make sure db was updated and that the tokens array has a length of 0

### Challenge
* Make a DELETE request to /users/me/token
* set x-auth equal to token
* assertions
*   get a 200 back
*   make an async .end call to make an async assertion
*       find user in db, verify that token array has length of 0
*       run the test suite from terminal
*       test should pass

```js
describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', done => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(err => done(err));
      });
  });
});
```

* It should pass the test
* Change toBe(0) to toBe(1) and the test will fail


## Git
`$ git status`

* show differences with `$ git diff`

`$ git commit -am 'Add tests for DELETE /users/me/token`

## Next - integrate todos with users

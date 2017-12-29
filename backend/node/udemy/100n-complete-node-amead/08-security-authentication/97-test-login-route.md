# Test Login Route
* One test will verify that when one valid email password sent we get an x-auth token back
* Second test will make sure if login credentials don't match you get a 400

```
User.findOne({email})
      .then(user => {
        expect(user).toBeTruthy();
        expect(user.password).not.toBe(password);
        done();
      })
      .catch(err => done(err));
```

* Why do we need that last catch?
* We forgot to add it earlier
* The test case would still fail if none of the assertions fail, yes
* It looks for a catch case to call done, never happens and the test will time out
* This will not give you a useful error message
* But by adding the catch at the end you'll get the exact error message depending on which assertion failed and why it failed

```
/users/login', () => {
 it('should login user and return auth token', done => {
   request(app)
     .post('/users/login')
     .send({
       email: users[1].email,
       password: users[1].password,
     })
     .expect(200)
     .expect(res => {
       expect(res.headers['x-auth']).toBeTruthy();
     })
     .end((err, res) => {
       if (err) {
         return done(err);
       }

       User.findById(users[1]._id)
         .then(user => {
           expect(user.toObject().tokens[0]).toMatchObject({
             access: 'auth',
             token: res.headers['x-auth'],
           });
           done();
         })
         .catch(e => done(e));
     });
 });
```

## Challenge
```
it('should reject invalid login', done => {
  // challenge
  // similar to previous test
  // pass an invalid password instead of a valid password
  // assertions
  //  400
  //  x-auth token should not exist
  //  user.token.length === 0 because no token should have been created
  //  copy the contents of previous test and paste below and tweek
});
```

### Final Test code for login
```js
describe('POST /users/login', () => {
  it('should login user and return auth token', done => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password,
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.toObject().tokens[0]).toMatchObject({
              access: 'auth',
              token: res.headers['x-auth'],
            });
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should reject invalid login', done => {
    // challenge
    // similar to previous test
    // pass an invalid password instead of a valid password
    // assertions
    //  400
    //  x-auth token should not exist
    //  user.token.length === 0 because no token should have been created
    //  copy the contents of previous test and paste below and tweek
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: 'bad-password',
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});
```

* Run tests
* Should pass all 18

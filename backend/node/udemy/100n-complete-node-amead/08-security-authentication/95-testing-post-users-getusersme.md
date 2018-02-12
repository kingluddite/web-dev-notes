# Testing Post /users GET /users/me
```js
describe('GET /users/me', () => {
  it('should return if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email + '1').toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {});
});
```

* It is an async test so we add `done` argument inside our callback function
* First test we want to make sure we get a user back if we pass the authentication test
* The second test should generate a 401 (authentication error) if not authenticated
    - This makes sure that random user data is not sent back to someone who doesn't have access to it
* request(app) - we make a request to the app using super test
* it is a GET request
* No special URL parameters needed /users/me
* Set a header
    - never did this before
    - .set(HEADERNAME, HEADER_VALUE)
    - set('x-auth', )

```
const users = [
  {
    _id: userOneId,
    email: 'luke@starwars.com',
    password: 'jediknight',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, 'abc123')
          .toString(),
      },
    ],
```

 * we need the token value inside the first user
 users[0].tokens[0].token

## We have our header set
* Time to make our assertions
    - We expect a 200 status code
    - We expect some things about the body that comes back (id and email)
        + res.body._id === users[0]._id.toHexString()
        + res.body.email === users[0].email
* Finally, we pass `done`
** **note** our second test fails because we don't call the `done` function and it just times out

## Challenge
* make call to /users/me route
* same GET request
* don't provide x-auth token
* expect you get 401 status
* expect body === empty object
    - should be empty object if user is not authenticated
* at end call `done`
* **note** when comparing empty object to another object you have to use toEqual not toBe

### Solution
```js
describe('GET /users/me', () => {
  it('should return if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
```

* Test and 13 tests should pass

### Tests for the signup route

#### Skipping tests
Sometimes tests break and you don't want the to run until you are ready to work with them

```js
describe('POST /users', () => {
  it('should create a user', done => {
    
    });

  it.skip('it should return validation errors if request invalid', done => {});

  it.skip('should not create user if email is in use', () => {});
});
```

### add test to make sure we create a user
```js
it('should create a user', done => {
  const email = 'john@john.com';

  request(app)
    .post('/users')
    .send({ email, password })
    .expect(200)
    .expect(res => {
      // update to toExist() to toBeTruthy()
      expect(res.headers['x-auth']).toBeTruthy();
      // update to toExist() to toBeTruthy()
      expect(res.body._id).toBeTruthy();
      // emails match
      expect(res.body.email).toBe(email);
    })
    .end(err => {
      if (err) {
        return done(err);
      }
      
      // find by user email
      User.findOne({ email }).then(user => {
        // update to toExist() to toBeTruthy()
        expect(user).toBeTruthy();
        // update from toNotBe() to not.toBe()
        expect(user.password).not.toBe(password);
        done();
      });
    });
});
```

* We can go further
* Instead of passing in done, we can pass in one of our custom functions
* If there is no errors in assertions above:
* We query to find an email match then we get a Promise and we can make assertions about the Document stored in the db
  - Expect that the user exists
  - expect that the password does not equal the password above (if it did, it means it wasn't hashed)
  - Then we finishe with calling `done`

### Run it
`$ npm test`

### Challenge
* Complete other two tests

#### Solution
```js
describe('POST /users', () => {
  it('should create a user', done => {
    const email = 'john@john.com';
    const password = 'sithlord';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({ email }).then(user => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        });
      });
  });

  it('it should return validation errors if request invalid', done => {
    // send an invalid email and invalid password
    request(app)
      .post('/users')
      .send({ email: 'bad-email', password: 'bad-password' })
      .expect(400)
      .end(done);
  });

  it('should not create user if email is in use', done => {
    // dupe email

    const password = 'sithlord';

    request(app)
      .post('/users')
      .send({ email: users[0].email, password })
      .expect(400)
      .end(done);
  });
});
```

### Git
`$ git add .`

`$ git commit -m 'Add tests for GET /users/me and POST /users'`

`$ git push origin master`

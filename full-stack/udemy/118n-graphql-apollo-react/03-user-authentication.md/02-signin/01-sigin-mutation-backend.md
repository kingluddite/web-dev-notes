# Signin Mutation on the Backend
`schema.js`

## Create new branch
`$ git checkout -b signin`

* Add our `signinUser` schema

```
// MORE CODE

type Mutation {
  addGenealogy(firstName: String!, lastName: String!, dateOfBirth: String, description: String, username: String  ): Genealogy

  signinUser(username: String!, password: String!): Token
  signupUser(username: String!, email: String!, password: String!): Token

// MORE CODE
```

## Add to resolvers.js to the Mutation object
`resolvers.js`

```
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // add this code

// MORE CODE

signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      // check to make sure password matches with user
      // that is found
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      // all good? return token
      return { token: createToken(user, process.env.SECRET, '1hr') };
    },

// MORE CODE
```

* Require `bcrypt`
* Try to find a `user` using the `username`
    - Not found... throw an error
* Compare `password` provided with user `password`
    - Not the same... throw an error
* If both checks pass then everything is copacetic so create a token with the user using the `secret` and for `1 hour`

## We don't have a form, how can we test this?
* No problem, just use graphql
* First check graphql docs to make sure you see the `signinUser` mutation
    - Refresh graphql

`http://localhost:4444/graphql`

![we see signinUser](https://i.imgur.com/yM6NGB7.png)

* Create a `signinUser` mutation in graphql

![using graphiql for signinUser](https://i.imgur.com/KzNqGFu.png)

```
mutation($username: String!, $password: String!) {
  signinUser(username: $username, password: $password) {
    token
  }
}
```

* query variables

```
{
  "username": "bob",
  "password": "a12345"
}
```

* Run by hitting play button
* Will return a token
* Change user and you'll get error "user not found"
* Put in wrong password and you will get error "invalid password"

## Caution
* If you don't use **await** with `bcrypt` you will never get an error for signing in

```
// MORE CODE
const isValidPassword = await bcrypt.compare(password, user.password);
// MORE CODE
```

## Next - Signin mutation client

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add signin mutation backend`

## Push to github
`$ git push origin signin`

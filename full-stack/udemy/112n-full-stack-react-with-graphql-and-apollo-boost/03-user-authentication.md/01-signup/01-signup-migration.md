# Create Signup Mutation
* **Note** When working with session, you may have to refresh the browser to get rid of the error

## Add new type of `Token`

`schema.js`

```
// MORE CODE

type Query {
    getAllGenealogies: [Genealogy]
  }

  type Token {
    token: String!
  }

// MORE CODE
```

## Add a new mutation `signupUser`

`schema.js`

```
// MORE CODE

type Mutation {
    addGenealogy(firstName: String!, lastName: String!, dateOfBirth: String, description: String, username: String  ): Genealogy

    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
```

### We need `jsonwebtoken` package

`resolvers.js`

```
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {

// MORE CODE
```

## Add our mutation
* Add a secret to our hidden variables

`variables.env`

```
// MORE CODE
SECRET=sdfkj0easdfadfj;lkjelkj93j3
// MORE CODE
```

`resolvers.js`

* Make sure you are adding this inside Mutation
* You should start the follow code right after `addGenealogy` Mutation
* Make sure there is a comma at the end of `AddGenealogy` Mutation

```
// MORE CODE

Mutation: {

// MORE CODE
signupUser: async (root, { username, email, password }, { User }) => {
      // check if user already exists
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      // user doesn't exist, create one
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },
  },
};

```

* Will expire in 1 hour
* We pull our secret from our `variables.env`

## Test in browser
* Make sure you are running your app from the `server` folder if you are in the `client` folder you need to change to the parent directory:

`$ cd ../`
`$ npm run dev`

* It should have no errors
* You need to open graphql app

`http://localhost:4444/graphiql`

* Open Docs
    - You now will see `signupUser` (Under mutations)

## Write some GraphQL inside graphiql

```
mutation {
  signupUser(username: "Phil", email: "me@you.com", password: "a12345") {
    token
  }
}
```

* We return the `token`
* Click play button
* You should see something like this (your `token`)

```
{
  "data": {
    "signupUser": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBoaWwiLCJlbWFpbCI6Im1lQHlvdS5jb20iLCJpYXQiOjE1MzQ3MjA2MTEsImV4cCI6MTUzNDcyNDIxMX0.B_BcJvfgbqu9RmML85c2075IZy0xATBuOrsR9SIP0HA"
```

## Check your remote mongodb (or local mongodb if that is what you are using)
* You will see the user was added

### local mongodb instructions
* This is only if you are working with mongo locally

```
$ mongo
$ show dbs
$ use they_came_before_me
$ show collections
$ db.users.find()
```

* You will see user is added

![one user added](https://i.imgur.com/ZLSrWR0.png)

## Run again (hit play)
* Will get this error `"User already exists",`



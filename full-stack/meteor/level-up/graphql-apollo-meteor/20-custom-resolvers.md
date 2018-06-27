# Custom Resolvers
* Let's fix email and log out our `user` object

`users/resolvers.js`

```
export default {
  Query: {
    user(obj, args, { user }) {
      console.log(user);
      return user || {};
    },
  },
};
```

* Update `register-api.js` and refresh browser and you will see something resembling this in your server terminal

```
{ _id: 'erKBgwmDLL6JGzAc3',
   createdAt: 2018-06-26T02:41:45.380Z,
   services:
    { password:
       { bcrypt: '$2b$10$Dap8ln5HehYWn1fDSfCcyueetKkOoUe3agpFoSwZ3azhhXuVfBsMy' },
     resume: { loginTokens: [Array] } },
   emails: [ { address: 'jdoe@joe.com', verified: false } ] }
```

* This is the user object that resides in your mongodb

`users/resolvers.js`

```
export default {
  Query: {
    user(obj, args, { user }) {
      console.log(user);
      return user || {};
    },
  },
  User: {
    email: user => {
      return user.emails[0].address;
    },
  },
};
```

* Click graphiql play button

```
{
  "data": {
    "resolutions": [
      {
        "_id": "7kf8AZFCM4XYwJ7Fy",
        "name": "jump rope more"
      }
    ],
    "user": {
      "_id": "erKBgwmDLL6JGzAc3",
      "email": "jdoe@joe.com"
    }
  }
}
```

* We now get the email
* We didn't like the shape the data came in so we remapped it into a shape we liked
* This is an example of the great versatility graphql gives us

# Log Out route DELETE users/me/token
* Just need to remove token from tokens array

`user.js`

```js
UserSchema.methods.removeToken = function(token) {
  // we have an array of tokens
  // we want to remove any object from the array
  // that has a token property equal to the value that we passed in
  // $pull - mongodb operator
  // $pull lets you remove items from an array that match certain criteriaa
  const user = this;

  return user.update({
    $pull: {
      tokens: {
        token,
      },
    },
  });
};
```

`server.js`

```js
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});
```

* Wipe Todo App db
* `$ node server/server.js`
* Open Postman
* Make a user with email and password
* Send user
* check for 200 status
* Check for x-auth token
* Check db and make sure x-auth was saved inside it

## Make new Postman request
* DELETE {{url}}/users/me/token
* copy the token and paste it into the value of the x-auth key (header)
* You should get a 200 back
* (in robomongo) You should still have your user but nothing inside the token array
* If you try to do it again you'll get 401 unauthorized
* because the token no longer exists
* and you have to be logged in, in order to make this request
* save this delete to the Todo App postman collection

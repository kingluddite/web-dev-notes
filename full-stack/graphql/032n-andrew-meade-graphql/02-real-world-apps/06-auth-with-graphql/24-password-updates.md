# Password Updates
* Allow users to update their passwords

## schema.graphql
* We need to update the arguments that update accepts

```
updateUser(data: UpdateUserInput!): User!
```


* And look at UpdateUserInput

```
input UpdateUserInput {
  name: String
  email: String
}
```

* We will now also add on `password` as an optional String

```
input UpdateUserInput {
  name: String
  email: String
  password: String
}
```


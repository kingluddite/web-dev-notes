# Create a mutation
* Queries will be useful for us from returning data from our database

## Add new `type` to our `schema.js`
* It will be a function that will need parameters passed to it which will be all the fields that the Genealogy needs to be created, it will also take the type required

`schema.js`

```
// MORE CODE

  type Mutation {
    addGenealogy(firstName: String!, lastName: String!, dateOfBirth: String, living: String, description: String, username: String  ): Genealogy
  }
`;
```

`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllGenealogies: () => {},
  },

  Mutation: {
    addGenealogy: async (
      root,
      { firstName, lastName, dateOfBirth, description, username },
      { Genealogy }
    ) => {
      const newGenealogy = await new Genealogy({
        firstName,
        lastName,
        dateOfBirth,
        description,
        username,
      }).save();
      return newGenealogy;
    },
  },
};

```

## Test it
* View `http://localhost:4444/graphiql`
* You will see a Root type of mutation has been added
* Click on it and you will see the fields inside the `addGenealogy` mutation with all of our parameters included

## Add a new Genealogy on the fly using graphiql
```
mutation {
  addGenealogy(firstName: "Phil", lastName: "Hawley") {
    firstName,
    lastName
  }
}
```

* We don't return an object but the fields from the object
* After enter the above, hit the play button
* and you will see this output:

```
{
  "data": {
    "addGenealogy": {
      "firstName": "Phil",
      "lastName": "Hawley"
    }
  }
}
```

* Check your mongo databse for the collection info
* When you insert a new document in mongodb it will automatically add a field named `_id`

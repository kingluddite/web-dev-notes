# Create a mutation
* Queries will be useful for us for **returning data from our database**

## Add new `type` to our `schema.js`
* It will be a function that will need parameters passed to it which will be all the fields that the `Cologne` needs to be created
* It will also take the type required

`schema.js`

```
// MORE CODE

  type Query {
    getAllColognes: [Cologne]
  }
  
  // add below code
  type Mutation {
   addCologne(scentName: String!, scentPrice: Int, description: String, username: String): Cologne
  }

`;
```

`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllColognes: () => {},
  },

  Mutation: {
    addCologne: async (
      root,
      { scentName, scentPrice, description, username },
      { Cologne }
    ) => {
      const newCologne = await new Cologne({
        scentName,
        scentPrice,
        description,
        username
      }).save();

      return newCologne;
    }
  }
};
```

## Test it
* View `http://localhost:4444/graphql`
* You will see a Root type of mutation has been added
* Click on it and you will see the fields inside the `addCologne` mutation with all of our parameters included

## Add a new Cologne on the fly using graphql
```
mutation {
  addCologne(scentName: "ess mayake", scentPrice: 100) {
    scentName
    scentPrice
  }
}
```

* We don't return an object but the fields from the object
* After enter the above, hit the play button
* and you will see this output:

```
{
  "data": {
    "addCologne": {
      "scentName": "ess mayake",
      "scentPrice": 100
    }
  }
}
```

* Check your mongoDB database for the collection info
* When you insert a new document in mongoDB it will automatically add a field named `_id`

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add a mutation`

## Push to github
`$ git push origin add-apollo`

## Additional Resources
* [What is Root query again?](https://graphql.org/learn/execution/)
* [What are promises](https://www.youtube.com/watch?v=2d7s3spWAzo)
* [wes boss talks async await](https://www.youtube.com/watch?v=9YkUCxvaLEk)

# Add refetch to `addGenealogy` Mutation
* When we add a `genealogy` and click on `profile` page it is not refreshed on it
* **note** When refetching queries remember to add any variables if there are any
* You will see that `GET_USER_GENEALOGIES` has a username variable

`UserGenealogies.js`

```
// MORE CODE

const UserGenealogies = ({ username }) => (
  <Query query={GET_USER_GENEALOGIES} variables={{ username }}>

  // MORE CODE
```

`AddGenealogy.js`

```
// MORE CODE

<Mutation
      mutation={ADD_GENEALOGY}
      variables={{ firstName, lastName, description, username }}
      refetchQueries={() => [
        {
          query: GET_USER_GENEALOGIES,
          variables: { username },
        },
      ]}

// MORE CODE
```

## Test
* Add a new genealogy
* Go to profile page and it will show fresh data

# Delete with optimistic UI
* We need to add optimistic UI to get our documents to be instantly deleted without a page refresh
* As a variation to how we did this before we will do the optimistic UI inline (_instead of creating a separate function_)

`UserCologne.js`

```
// MORE CODE

<Mutation
  mutation={DELETE_USER_COLOGNE}
  variables={{ _id: cologne._id }}
  update={(cache, data) => {
    console.log(cache, data);
  }}
>

// MORE CODE
```

## Test it out
* Delete a cologne
* You will see in console `InMemoryCache`
    - Expand and examine `ROOT_QUERY` (inside `data`)
    - It will show you all queries we performed in the cached values that apollo saved for it
    - We will work with `getUserColognes` as well as the `deleteUserCologne` off of the `data` object
    - We will remove the cologne from the `getUserColognes` array 

## Add the optimistic UI
`Usercologne` 

```
// MORE CODE

<Mutation
  mutation={DELETE_USER_COLOGNE}
  variables={{ _id: cologne._id }}
  update={(cache, { data: { deleteUserCologne } }) => {
    // console.log(cache, data);
    const { getUserColognes } = cache.readQuery({
      query: GET_USER_COLOGNES,
      variables: { username },
    });

    cache.writeQuery({
      query: GET_USER_COLOGNES,
      variables: { username },
      data: {
        getUserColognes: getUserColognes.filter(
          cologne => cologne._id !== deleteUserCologne._id
        ),
      },
    });
  }}
>
  {deleteUserCologne => {
    return (
      <button
        className="delete-button"
        onClick={() => this.handleDelete(deleteUserCologne)}
      >
        X
      </button>
    );
  }}
</Mutation>

// MORE CODE
```

## We have access to `attrs` parameter
* We sometimes need to set it equal to an empty object to avoid errors
* It will give us information as to whether it is in the process of deleting (_whether that mutation is still running and it has a loading property_)

`UserColognes.js`

```
// MORE CODE

  {(deleteUserCologne, attrs = {}) => {
    return (
      <button
        className="delete-button"
        onClick={() => this.handleDelete(deleteUserCologne)}
      >
        {attrs.loading ? 'deleting...' : 'X'}
      </button>
    );
  }}
</Mutation>


// MORE CODE
```

## Test
* Now when you delete an item you will briefly see red `deleting...` text

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add delete with optimisitc UI`

## Push to github
`$ git push origin delete-user-colognes`

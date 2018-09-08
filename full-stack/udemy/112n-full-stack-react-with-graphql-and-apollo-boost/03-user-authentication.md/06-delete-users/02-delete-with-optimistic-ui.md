# Delete with optimistic UI
* We need to add optimistic UI to get our documents to be instantly deleted without a page refresh
* As a variation to how we did this before we will do the optimistic UI inline (instead of creating a separate function)

`UserGenealogy.js`

```
// MORE CODE

<Mutation
  mutation={DELETE_USER_GENEALOGY}
  variables={{ _id: genealogy._id }}
  update={(cache, data) => {
    console.log(cache, data);
  }}
>

// MORE CODE
```

## Test it out
* Delete a genealogy
* You will see in console `InMemoryCache`
    - Expand and examine ROOT_QUERY
    - It will show you all queries we performed in the cached values that apollo saved for it
    - We will work with getUserGenealogies as well as the deleteUserGenealogy off of the `data` object
    - We will remove the genealogy from the getUserGenealogies array 

## Final code
`UserGenealogy` 

```
// MORE CODE

<Mutation
                mutation={DELETE_USER_GENEALOGY}
                variables={{ _id: genealogy._id }}
                update={(cache, { data: { deleteUserGenealogy } }) => {
                  // console.log(cache, data);
                  const { getUserGenealogies } = cache.readQuery({
                    query: GET_USER_GENEALOGIES,
                    variables: { username },
                  });

                  cache.writeQuery({
                    query: GET_USER_GENEALOGIES,
                    variables: { username },
                    data: {
                      getUserGenealogies: getUserGenealogies.filter(
                        genealogy => genealogy._id !== deleteUserGenealogy._id
                      ),
                    },
                  });
                }}
              >
                {deleteUserGenealogy => {
                  return (
                    <p
                      className="delete-button"
                      onClick={() => handleDelete(deleteUserGenealogy)}
                    >
                      X
                    </p>
                  );
                }}
              </Mutation>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default UserGenealogies;
```

## We have access to `attrs` parameter
* We sometimes need to set it equal to an empty object to avoid errors
* It will give us information as to whether it is in the process of deleting (whether that mutation is still running and it has a loading property)

`UserGenealogy.js`

```
// MORE CODE

{(deleteUserGenealogy, attrs = {}) => (
                  <p
                    className="delete-button"
                    onClick={() => handleDelete(deleteUserGenealogy)}
                  >
                    {attrs.loading ? 'deleting...' : 'X'}
                  </p>
                )}
              </Mutation>

// MORE CODE
```

## Test
* Now when you delete an item you will briefly see red `deleting...` text

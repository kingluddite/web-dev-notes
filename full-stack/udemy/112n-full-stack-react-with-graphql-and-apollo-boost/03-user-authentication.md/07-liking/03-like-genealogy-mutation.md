# Like Genealogy Mutation
* When we click on Like button we want that Genealogy added to our favorites array
* We'll need to pass the `_id` in the parent page (GenealogyPage) and pass it to the `LikeGenealogy` component

`GenealogyPage.js`

```
// MORE CODE

<Query query={GET_GENEALOGY} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return (
          <div className="App">
            <h2>
              {data.getGenealogy.firstName} {data.getGenealogy.lastName}
            </h2>
            <p>
              Created Date:
              {data.getGenealogy.createdDate}
            </p>
            <p>Description: {data.getGenealogy.description}</p>
            <p>Date of Birth: {data.getGenealogy.dateOfBirth}</p>
            <p>Likes: {data.getGenealogy.likes}</p>
            <p>Created By: {data.getGenealogy.username}</p>
            <LikeGenealogy _id={_id} />
          </div>
        );
      }}
    </Query>

// MORE CODE
```


`LikeGenealogy.js`

* Now use `_id` in the variables
* And we need username

```
// MORE CODE

render() {
    const { username } = this.state;
    const { _id } = this.props; // add this

    <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
      return username && <button>Like</button>;
    </Mutation>;
  }

  // MORE CODE
```

## Add render props and necessary imports

```
// MORE CODE

import { Mutation } from 'react-apollo';

// queries
import { LIKE_GENEALOGY } from '../../queries';

// MORE CODE

<Mutation mutation={LIKE_GENEALOGY} variables={{ _id }}>
    {() => {
      return username && <button>Like</button>;
    }}
  </Mutation>;

  // MORE CODE
```

## Add to our type Mutation `likeGenealgoy`
* It will take 2 variables and return a Genealogy

`schema.js`

```
// MORE CODE

type Mutation {
  addGenealogy(firstName: String!, lastName: String!, description: String, username: String): Genealogy
  deleteUserGenealogy(_id: ID): Genealogy
  likeGenealogy(_id: ID!, username: String!): Genealogy

// MORE CODE
```

## declare the likeGenealogy inside the mutation object of our resolvers file
* We will use both models Genealogy and User
* But we are only returning our recipe
* Use mongoose's `findOneAndUpdate()`
    - First argument will use `_id`
    - Second argument will be how we will update it
        + increment likes by 1
* We also have to update the User model
    - Find a user in the db by their username
    - Then we'll update their favorites array by adding the `_id` of the genealogy that they just liked
    - `$addToSet` is how we can add item to an array

`resolvers.js`

```
// MORE CODE

likeGenealogy: async (root, { _id, username }, { Genealogy, User }) => {
    const genealogy = await Genealogy.findOneAndUpdate(
      { _id },
      { $inc: { likes: 1 } }
    );
    const user = await User.findOneAndUpdate(
      { username },
      { $addToSet: { favorites: _id } }
    );
    return genealogy;
  },

// MORE CODE
```

* We return the genealogy we are liking

## Add a variable for our mutation
`queries/index.js`

```
// MORE CODE

export const LIKE_GENEALOGY = gql`
  mutation($_id: ID!, $username: String!) {
    likeGenealogy(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

// MORE CODE
```

## Go to LikeGenealogy and work with that function
* Add likeGenealogy to our arguments
* Add click event that likes genealogy when we click on it
* Provide a function that will be called when we click on the like `handleLike` (We need to make this an arrow function because we are passing in the function (if we did not the function would be called as soon as the component loads) )

```
// MORE CODE

<Mutation mutation={LIKE_GENEALOGY} variables={{ _id, username }}>
      {(likeGenealogy) => {
        return username && <button onClick={() => this.handleLike(likeGenealogy)}>Like</button>;
      }}
    </Mutation>;

// MORE CODE
```

* We change the curly braces with parentheses so that everything is automatically returned (so we can omit the word `return`)

```
// MORE CODE

<Mutation mutation={LIKE_GENEALOGY} variables={{ _id, username }}>
    {(likeGenealogy) => (
      return username && <button onClick={() => this.handleLike(likeGenealogy)}>Like</button>;
    )}
  </Mutation>;

// MORE CODE
```

## Add our event handler
`LikeGenealogy.js`

```
// MORE CODE

handleLike = (likeGenealogy) => {
    // pass control of likeGenealogy to handleLike
    likeGenealogy().then(({ data }) => {
      console.log(data);
      
    })
  }

  render() {

// MORE CODE
```

## Error - need to add a return
* To return our mutation

`LikeGenealogy.js`

```
// MORE CODE

render() {
    const { username } = this.state;
    const { _id } = this.props;

    return (
      <Mutation mutation={LIKE_GENEALOGY} variables={{ _id, username }}>
        {likeGenealogy =>
          username && (
            <button onClick={() => this.handleLike(likeGenealogy)}>Like</button>
          )
        }
      </Mutation>
    );
  }

// MORE CODE
```

## Test in browser
1. Log in
2. Click on single page
3. Click Like
4. You will see `likeGenealogy` is called with `likes: 1`
5. Like count is not updated
5. Refresh page - Like count is updated to 1



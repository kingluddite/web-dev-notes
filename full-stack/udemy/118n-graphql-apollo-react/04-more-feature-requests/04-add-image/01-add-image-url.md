# Adds imageUrl field on cologne model and imageUrl input in Addcologne

## Feature branch
`$ git checkout -b image`
* Make sure you blow up your MongoDB collections so we can start fresh
    - This is an important step because we are changing the structure of our models that mongo is based on
* We want to offer the ability to upload images

`models/Cologne.js`

```
// MORE CODE

imageUrl: {
  type: String,
  required: true,
},
description: {
  type: String,
},

// MORE CODE
```

## Add new fields to our schema

`schema.js`

```
// MORE CODE

exports.typeDefs = gql`
  scalar ObjectID
  type Cologne {
    _id: ObjectID
    scentName: String!
    scentBrand: String!
    scentPrice: Int
    imageUrl: String!
    description: String
    createdDate: String
    likes: Int
    username: String
  }

// MORE CODE
```

* We also need to make some modifications to our mutations
    - Add fields to our `addCologne` mutation

`schema.js`

```
// MORE CODE
type Mutation {
  addCologne(
    scentName: String!
    scentBrand: String!
    scentPrice: Int
    imageUrl: String!
    description: String
    username: String
  ): Cologne

  updateUserCologne(
    _id: ObjectID!
    scentName: String!
    scentBrand: String!
    scentPrice: Int
    imageUrl: String!
    description: String
  ): Cologne

// MORE CODE
```

## Update our resolvers file

`resolvers.js`

```
// MORE CODE

Mutation: {
  addCologne: async (
    root,
    { scentName, scentBrand, scentPrice, imageUrl, description, username },
    { Cologne }
  ) => {
    const newCologne = await new Cologne({
      scentName,
      scentBrand,
      scentPrice,
      imageUrl,
      description,
      username
    }).save();

    return newCologne;
  },

  updateUserCologne: async (
    root,
    { _id, scentName, scentBrand, scentPrice, imageUrl, description },
    { Cologne }
  ) => {
    const updatedCologne = await Cologne.findOneAndUpdate(
      { _id },
      { $set: { scentName, scentBrand, scentPrice, imageUrl, description } },
      { new: true }
    );
    return updatedCologne;
  },

// MORE CODE
```

## Update our queries

`queries/index.js`

```
// MORE CODE

// Cologne Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentBrand: String!
    $scentPrice: Int
    $imageUrl: String!
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentBrand: $scentBrand
      scentPrice: $scentPrice
      imageUrl: $imageUrl
      description: $description
      username: $username
    ) {
      _id
      scentName
      scentBrand
      scentPrice
      imageUrl
      description
      username
    }
  }
`;

export const UPDATE_USER_COLOGNE = gql`
  mutation(
    $_id: ObjectID!
    $scentName: String!
    $scentBrand: String!
    $scentPrice: Int
    $imageUrl: String!
    $description: String
  ) {
    updateUserCologne(
      _id: $_id
      scentName: $scentName
      scentBrand: $scentBrand
      scentPrice: $scentPrice
      imageUrl: $imageUrl
      description: $description
    ) {
      _id
      scentName
      scentBrand
      scentPrice
      imageUrl
      description
    }
  }
`;

// MORE CODE
```

`fragments.js`

```
// MORE CODE

export const cologneFragments = {
  cologne: gql`
    fragment CompleteCologne on Cologne {
      _id
      scentName
      scentBrand
      scentPrice
      imageUrl
      description
      createdDate
      likes
      username
    }
  `,

// MORE CODE
```

## Add `inputs` and `dropdown` to our UI

`AddCologne.js`

```
// MORE CODE

const initialState = {
  scentName: '',
  scentBrand: '',
  scentPrice: 0,
  imageUrl: '',
  description: '',
  username: '',

};

class AddCologne extends Component {

  // MORE CODE

  validateForm = () => {
    const {
      scentName,
      scentBrand,
      scentPrice,
      imageUrl,
      description,
    } = this.state;
    const isInvalid =
      !scentName ||
      !scentBrand ||
      !scentPrice ||
      !imageUrl ||
      !description;
    return isInvalid;
  };

  render() {
    const {
      scentName,
      scentBrand,
      scentPrice,
      imageUrl,
      description,
      username,
    } = this.state;

   <Mutation
     mutation={ADD_COLOGNE}
     variables={{
       scentName,
       scentBrand,
       scentPrice,
       imageUrl
       description,
       username,
     }}
     refetchQueries={() => [
       {
         query: GET_USER_COLOGNES,
         variables: { username },
       },
     ]}
     update={this.updateCache}
   >
     {(addCologne, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <div className="App">
              <h2 className="App">Add Cologne</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addCologne)}
              >

                // MORE CODE
                <label htmlFor="imageUrl">
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Cologne Image"
                    onChange={this.handleChange}
                    value={imageUrl}
                  />
                <span class="hide">Image URL</span>
                </label>

                // MORE CODE

                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

// MORE CODE
```

## Test it out
* Log in
* Create a cologne

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add imageUrl`

## Push to github
`$ git push origin image`

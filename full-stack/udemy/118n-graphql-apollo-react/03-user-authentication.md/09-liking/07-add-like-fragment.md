# Add like fragment
* We'll create a new fragment for `like` and `unlike` genealogy

`fragments.js`

```
import { gql } from 'apollo-boost';

export const genealogyFragments = {
  genealogy: gql`
    fragment CompleteGenealogy on Recipe {
      _id
      firstName
      lastName
      createdDate
      description
      likes
      username
    }
  `,
  like: gql`
    fragment LikeGenealogy on Genealogy {
      _id
      likes
    }
  `,
};
```

## Use fragments on like and unlike and genealogy

`queries/index.js`

```
// MORE CODE

export const GET_ALL_GENEALOGIES = gql`
  query {
    getAllSongs {
      ...CompleteGenealogy
    }
  }
  ${genealogyFragments.genealogy}
`;

export const GET_GENEALOGIES = gql`
  query($_id: ObjectID!) {
    getGenealogy(_id: $_id) {
      ...CompleteGenealogy
    }
  }
  ${songFragments.genealogy}
`;

// MORE CODE

export const LIKE_GENEALOGY = gql`
  mutation($_id: ID!, $username: String!) {
    likeGenealogy(_id: $_id, username: $username) {
      ...LikeGenealogy
    }
  }
  ${genealogyFragments.like}
`;

export const UNLIKE_GENEALOGY = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeGenealogy(_id: $_id, username: $username) {
      ...LikeGenealogy
    }
  }
  ${genealogyFragments.like}
`;

// Genealogy Mutations

// MORE CODE
```

## Test in browser
* Add a `genealogy`
* `Like` and `unlike` the `genealogy`
* It should work just as it did before

## Next - Deploy to heroku

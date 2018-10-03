# Use Fragments to Clean up Queries
* We have a lot of repeated fields in our queries file
* We can make our code more DRY and cut down on code repetition by using something called a **code fragment**

`queries/fragment.js`

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
};
```

* To use fragments you will need to import `gql` from `apollo-boost`
* All of our fragments will be created in an object that we will export
* We'll grab all the fields that are on the `genealogy` type

## Now use that fragments chunk of code
* Add it right BEFORE the final back tic of the query you want to insert the fragment
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
export const ADD_GENEALOGY = gql`
  mutation($title: String!, $category: String!, $username: String) {
    addGenealogy(title: $title, category: $category, username: $username) {
      ...CompleteGenealogy
    }
  }
  ${genealogyFragments.genealogy}
`;

// User Mutations

// MORE CODE
```

## Test in browser
* Add a `genealogy`
* `Like` and `unlike` the `genealogy`
* It should work just as it did before

## Next - Deploy to heroku

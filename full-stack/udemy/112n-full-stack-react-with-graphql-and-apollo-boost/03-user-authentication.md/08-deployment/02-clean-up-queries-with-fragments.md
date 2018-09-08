# Use Fragments to Clean up Queries
* We have a lot of repeated fields in our queries file
* We can make our code more DRY and cut down on code repitition by using something called a **code fragment**

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
* We'll grab all the fields that are on the genealogy type

## Now use that fragments chunk of code
* Add it right BEFORE the final back tic of the query you want to insert the fragment
* We'll create a new fragment for like and unlike genealogy

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

## Use fragments on like and unlike
```
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
      ${genealogyFragments.like}
    }
  }
  ${genealogyFragments.like}
`;

// User Mutations

// MORE CODE
```

## Test in browser
* Add a genealogy
* Like and unlike the genealogy
* It should work just as it did before

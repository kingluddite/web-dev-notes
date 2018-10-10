# Use Fragments to Clean up Queries
* We have a lot of repeated fields in our queries file
* We can make our code more DRY and cut down on code repetition by using something called a **code fragment**

## Prep
* I want my `getAllColognes` and getCologne to have access to same fields so I update them to look like:

`queries/index.js`

```
import { gql } from 'apollo-boost';

// Cologne Queries
export const GET_ALL_COLOGNES = gql`
  query {
    getAllColognes {
      _id
      scentName
      scentBrand
      scentPrice
      createdDated
      description
      likes
      username
    }
  }
`;

export const GET_COLOGNE = gql`
  query($_id: ObjectID!) {
    getCologne(_id: $_id) {
      _id
      scentName
      scentBrand
      scentPrice
      createdDate
      description
      likes
      username
    }
  }
`;

// MORE CODE

// Cologne Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentBrand: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentBrand: $scentBrand
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      _id
      scentName
      scentBrand
      scentPrice
      description
      createdDate
      likes
    }
  }
`;

// MORE CODE
```

* Now this is an example to show you how to use fragments to clean up your code
* Since both my queries have the same fields now I can use a fragment to make my code more DRY and reusable

## Create file for all fragments
* To use fragments you will need to import `gql` from `apollo-boost`

`queries/fragment.js`

```
import { gql } from 'apollo-boost';

export const cologneFragments = {
  cologne: gql`
    fragment CompleteCologne on Cologne {
      _id
      scentName
      scentBrand
      scentPrice
      createdDated
      description
      likes
      username
    }
  `,
};
```

* All of our fragments will be created in an object that we will export
* We'll grab all the fields that are on the `Cologne` type

## Now use that fragments chunk of code
* Add it right BEFORE the final back tic of the query you want to insert the fragment

```
export const ADD_COLOGNE = gql`
  mutation($title: String!, $category: String!, $username: String) {
    addGenealogy(title: $title, category: $category, username: $username) {
      ...CompleteGenealogy
    }
  }
  ${genealogyFragments.genealogy}
`;
```

## Test in browser
* Add a `cologne` in your app
* It should work just as it did before

## Next - Deploy to heroku

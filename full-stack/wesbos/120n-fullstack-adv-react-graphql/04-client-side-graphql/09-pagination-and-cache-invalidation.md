# Pagination and Cache Invalidation
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

* We need to make our Pagination work to update our Items and keep it in sync with our Pagination navigation

## Backend
* We need to modify our `items` Query
    - where
    - orderBy
    - skip
    - first
        + first and skip will say "I want to skip the first 4 items but I want to bring back 4 items in total so that will give us 5 through 8"
* Modify our schema

`schema.graphql`

```
// MORE CODE
type Query {
  items: [Item]!
  item(where: ItemWhereUniqueInput!): Item
  itemsConnection(where: ItemWhereInput): ItemConnection!
}

// MORE CODE
```

* And make it look like this:

```
// MORE CODE

type Query {
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, first: Int): [Item]!
  item(where: ItemWhereUniqueInput!): Item
  itemsConnection(where: ItemWhereInput): ItemConnection!
}

// MORE CODE
```

## Now we need to modify our GraphQL query on the frontend
`Items.js`

```
// MORE CODE

// config
import { perPage } from '../config';

// custom components
import Item from './Item';
import Pagination from './Pagination';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      title
      description
      price
      image
      largeImage
      price
    }
  }
`;

// MORE CODE
```

### Add variables to Query
`Items.js`

```
// MORE CODE

<Query query={ALL_ITEMS_QUERY} variables={{ skip: 2, first: 4 }}>

// MORE CODE
```

* Now we get 4 items on our home page
* Change `first` to `2` and you will only see `2`
* Change `skip` to `0` and you'll see your first items
* Keep `skip` at `0` and change `first` to `1`
    - Increment `skip` by `1` and it goes to the next image
    - Increment `skip` by `1` and it goes to the next image

`skip` and `first` are the knobs we will be turning to discover what we want to show

## Use dynamic values for Pagination
### What will we use for the value of `skip`?
* `page` * `perPage` - `perPage`
* (page 1) 1 * 4 - 4 (skip: 0)
* (page 2) 2 * 4 - 4 (skip: 4)
* (page 3) 3 * 4 - 4 (skip: 8)

### What will we use for the value of `first`?
* We will use our config `perPage`

```
// MORE CODE

render() {
  const { page } = this.props;
  return (
    <Center>
      <Pagination page={page} />
      <Query query={ALL_ITEMS_QUERY} variables={{ skip: page * perPage - perPage, first: perPage }}>

// MORE CODE
```

* But we can leave out `first: perPage` because we set it as the default value here:

```
// MORE CODE

query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {

// MORE CODE
```

```
// MORE CODE

render() {
  const { page } = this.props;
  return (
    <Center>
      <Pagination page={page} />
      <Query query={ALL_ITEMS_QUERY} variables={{ skip: page * perPage - perPage }}>

// MORE CODE
```

## Test in browser
* First time using it there is a slight delay
* Each time after that they are cached and faster
* In production with `prefetch` they will be lightning fast

## Houston we have a problem
* Add one more item
* Go to home page
* The added item is not there
* Why?
    - Because the home page was already fetched once
        + Now page 1 is out of date
            * And that means page 2 is out of date...
                - This is a huge problem
                - We need to use something called `cache-invalidation`
                    + We need to delete page1, page2 and page3 pieces of the cache because they are now all out of date
                - But if we just added an item at the end but page 1 and 2 would be fine but page 3 would need to be invalidated
                - If you are on page 1 and you delete an item then you need to invalidate page 1,2 and 3
                - Bottom line is if you add or delete an item you will create a ripple effect that will need some part of the cache, depending on where you add or delete, to be invalidated
    - One solution is to make your query manually hit the networks

`Items.js`

```
// MORE CODE

<Query query={ALL_ITEMS_QUERY} variables={{ skip: page * perPage - perPage }} fetchPolicy="network-only">

// MORE CODE
```

* That solves the problem but we don't use our cache and our site gets way slow and what's the point if we can't use the speed benefit of the Apollo cache

## Another possible solution - refetchQueries
* We go to the parent container and pass down `refetchQueries` as a prop to the child component
    - `refetchQueries` will allow us to pass an array of queries that need to refresh themselves based on the server
        + Problem
            * Which ones do we tell it?
            * We can just tell it to refresh all of the `All_ITEMS_QUERY`
                - We have to pass it the `$skip` and the `$first` values and if that is the case how do you know how many pages there are and that involves a lot of calculations that could involve hundreds of pages if you have hundreds of pages loaded into the cache
* This makes refetch queries not a good solution for this case either

## Another possible solution - delete the cache
* Delete all the items from the cache
    - Unfortunately there is currently no way to delete partial items from the cache
    - No way to set a time limit on the cache items (something like "after two minutes refetch them from")
    - The developers at Apollo are aware of this but it isn't a bug but rather a conundrum
* There is a solution to delete all of the cache
    - But that isn't a good solution
        + Because we could have items in our cart
        + Or if we are signed in
        + Or there was orders that we views
        + All would go away if we deleted the cache
* Apollo is working on a way to blow up part of the cache (future)
* We will fix this later

## GIT 13
1. Check Status
2. Add to staging
3. Commit with useful commit message
4. Push Branch to Origin
5. Create PR on Origin
6. Code Review on Origin
7. Merge to master branch on Origin (or reject and don't merge)
8. Locally check out of feature branch and into master branch
9. Fetch locally
10. Git Diff to see changes
11. Pull Locally
12. Run and test code
13. Delete local branch

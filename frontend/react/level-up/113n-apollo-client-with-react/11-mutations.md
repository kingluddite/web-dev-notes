# Mutations
* Queries is just grabbing the data
* Mutating the data is doing something with the data

## We are using an open API
* In a real world situation you might be working with closed APIs
* Where we need to use authentication
* So for the purposed of practice we are just going to use an open API
* But remember to add authentication to your real word app

## Set our api to OPEN
* We can do this in the GraphCMS Dashboard
* Settings > Public API Permissions > Set to Open
    - It will automatically save after you change it
    - We just made our API able to be read and written to
    - Not very secure!

## Naming queries
```
query namedQuery {
  posts {
    id
    title
    body
  }
  post(where: {id: "cjlvb9xtmjng80940rrulhz73"}) {
    id
    title
    body
  }
}
```

* That was for queries
* For mutations we'll name our mutations with `mutation`
* We also have to add a type but this time it is not a query type it is a mutation type

```
mutatation addPost {

}
```

* When you type inside that mutation you will see a dropdown with choices appear
* This is GraphCMS helping us with mutations
* This is cool but also dangerous because you will see in the drop `deleteManyPosts` and this gives people the ability to delete all your posts

```
mutation {
  createPost(data)
}
```

* Hover over `data` in API Explorer inside GraphCMS and you will see a type of PostCreateInput!
    - An input is a special type in GraphQL that define what fields can be in this object
    - If you click on that `PostCreateInput!` it will show:
        + status: Status
            * This is GraphCMS own custom thing type (click and you'll see DRAFT, PUBLISHED, ARCHIVED)
        + title: String
        + body: String

```
mutation {
  createPost (data: {
    status: PUBLISHED
    title: "Mutation added"
    body:"We added our first record using a mutation"
  })
}
```

* But we still get errors because we need to add `subfields`
* But just like a query we need to have a set of brackets and tell GraphQL what it needs to return
* We want to return a post so we will tell it to return a `title`, `body` and `id`

```
mutation {
  createPost (data: {
    status: PUBLISHED
    title: "Mutation added"
    body:"We added our first record using a mutation"
  }) {
    title
    body
    id
  }
} 
```

* We need to give our mutation a name (currently it is <Unnamed>)

```
mutation addPost {
  createPost (data: {
    status: PUBLISHED
    title: "Mutation added"
    body:"We added our first record using a mutation"
  }) {
    title
    body
    id
  }
} 
```

* CLick Play to execute GraphQL mutation
* The cool thing about this is we can see a 3rd item in our GraphCMS content

## Very cool
* We just used an API to add to our DB without writing anything to the DB itself

## Next
* We'll take our mutation inside our app and we will use GraphQL through Apollo to write these queries and submit to a DB (or more accurately submit a mutation to an API)
* We will add a form to get a mutation working on our site and adding stuff through the GraphQL API to our GraphCMS DB



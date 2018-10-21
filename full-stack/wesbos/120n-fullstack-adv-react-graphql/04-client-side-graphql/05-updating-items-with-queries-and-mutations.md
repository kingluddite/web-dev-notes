# Updating Items with Queries and Mutations
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## We will get into the U of CRUD
* Update

### We need to first update our backend interface
#### We need to do two things:
1. We'll need a query for a single item
    - This will enable us to click on an `Edit` button and pull the existing info about that item
2. We'll need to write a Mutation to handle the updating of the item
    - It will be similar to how CreateItem works

## Add our update schema
`schema.graphql`

```
// MORE CODE

updateItem(id: ID!, title: String, description: String, price: Int): Item!

// MORE CODE
```

* We only have ID as a required argument
    - We don't know what if anything the user will update so we leave off the requirements
    - But we do require an item be returned after we update
* We did not add `image` and `largeImage` but you can use that as a TODO when we finish with this app

### Query for 1 item
* We need to find an item where they have unique input
* We get this from the generated GraphQL

`prisma.graphql`

![single item GraphQL](https://i.imgur.com/qvCp8Wv.png)

```
// MORE CODE

type Query {
  items: [Item]!
  item(where: ItemWhereUniqueInput!): Item
}

// MORE CODE
```

* **note** `!` when call that a **bang**
* We do not require that an Item is returned becuase we could do a Query and get nothing back because nothing was found via the `where`
* We don't require it because if nothing is found we will get an error and we want to avoid that error 

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

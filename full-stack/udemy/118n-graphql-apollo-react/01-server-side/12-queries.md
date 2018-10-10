# Create First Query
* When we added a document using a mutation a new `_id` field was created so we need to add that to our schema

`schema.js`

```
exports.typeDefs = `
  type Cologne {
    _id: ID,
    scentName: String!
    scentPrice: Int
    createdDate: String
    description: String
    likes: Int
    username: String
  }

  type User {
    _id: ID,
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Cologne]
  }

// MORE CODE
```

* We add `ID` as the type
* We don't need a `!` as it will automatically be added

1. `http://localhost:4444/graphql`
2. Open Documentation Explorer
3. Click on `Mutation`
4. In the Schema click on `Cologne`
5. You now see our new field of `_id: ID`

## Check your Query
`schema.js`

```
// MORE CODE

type Query {
  getAllColognes: [Cologne]
}

// MORE CODE
```

## Open your resolvers
* You will see this:

`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllColognes: () => {},
  },

// MORE CODE
```

* Make these modifications
  - We are using `async` - `await`
  - We will use the mongoose API to search the `colognes` collection for all the colognes and return them and we will store all colognes inside `getAllColognes`

`resolvers.js`

```
exports.resolvers = {
  Query: {
    getAllColognes: async (root, args, { Cologne }) => {
      const allColognes = await Cologne.find();
      return allColognes;
    },
  },

  // MORE CODE
```

* shortcut is:

```
exports.resolvers = {
  Query: {
    getAllColognes: async (root, args, { Cologne }) => {
      return await Cologne.find();
    },
  },
```

`http://localhost:4444/graphql`

```
{
  getAllColognes {
    scentName
    scentPrice
    likes
  }
}
```

* Click `play` button
* You will see output from that query
* You could add a field like:

```
{
  getAllColognes {
    scentName
    scentPrice
    likes
    createdDate
  }
}
```

* And that will output `createdDate`
* This is a way to see what data you are getting

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add query`

## Push to github
`$ git push origin add-apollo`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add-apollo feature`

![commit](https://i.imgur.com/a8cXTgy.png)

* That will take you to a page of all changes in that commit
    - Green is code added
    - Red is code removed
    - All other code has not been modified
* Review all your changes
* If all looks good hit the `back` button in the browser
* Create a PR
* And click `Merge pull request` button
* Click `Confirm merge` button
* Then click Delete branch (You will see the color purple and that `Pull request successfully merged and closed`)

![PR successful](https://i.imgur.com/ota3hx1.png)

* Click `Delete branch` button to delete the remote branch
    - You don't need it anymore
    - Get in the habit of `pruning` your branches so they don't grow uncontrollably

## Time to sync up
* Right now your master branch on your remote GitHub is different than your master branch locally
* Locally your master branch doesn't have the new feature `add-apollo` added
* To prove this checkout of your `add-apollo` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `add-apollo` are gone!
* View your app in the browser and it also shows now sign of your `add-apollo` feature!
* If you stop your server `ctrl` + `c`

## Check the status
`$ git status`

* You will see this:

```
On branch master
nothing to commit, working tree clean
```

## But this doesn't make sense?
* Your remote master branch and your local master branch are different

## Time to fetch
* You need to do a fetch

`$ git fetch`

## Compare local with remote
`$ git diff master origin/master`

* That will compare the local branch `master` with the github remote branch `origin/master`
* Now just press `spacebar` to navigate through all the changes
    - Red is removed
    - Green is added
    - No color is unchanged
* Press `q` to quit out of git `diff`

## Show local branches
`$ git branch`

* The asterisk is the currently selected branch
* Type `q` to exit out of list of branch pages

## Pull down remote origin master branch
`$ git pull origin master`

## Test your site now
`$ npm run dev`

* You now see that our `add-apollo` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d add-apollo`

* That will let you know the branch was deleted with something like:

`Deleted branch add-apollo (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo

# Add a new field - Homework/Lab
* After adding some colognes you decide you are missing a field you need and that is `brand`
* We want to add this to our form but that means we need to restructure our model, schema and resolvers
* This also gives a great introduction to the Git Workflow with creating new feature requests

## Here's how I would go about it:

## Start with the Model
* Make this modification

## Create a Feature Branch
### Never work in the master branch when using Git!
* You are about to create a new feature so you need to create a new feature branch
* **tip** The name of the feature branch should reflect what you are building

`$ git checkout -b scentBrand`

`Cologne.js`

```
// MORE CODE

const CologneSchema = new Schema({
  scentName: {
    type: String,
    required: true,
  },
  scentBrand: {
    type: String,
    required: true,
  },
  scentPrice: {
    type: Number,
  },

// MORE CODE
```

* That's it
* **Business Rule Added** I decided I want this field to be required as all Colognes have a brand
* **note** Just remember to check:
    - You added the necessary comma

## Update `schema.js`

`schema.js`

```
// MORE CODE

  type Cologne {
    _id: ObjectID
    scentName: String!
    scentBrand: String!
    scentPrice: Int
    createdDate: String
    description: String
    likes: Int
    username: String
  }

  // MORE CODE

  type Mutation {
    addCologne(
      scentName: String!
      scentBrand: String!
      scentPrice: Int
      description: String
      username: String
    ): Cologne

   // MORE CODE
  }
`;
```

* We add `scentBrand: String!` twice
* Remember our field is required so we add the GraphQL `!`
* We had to add it to our Cologne type because we need our GraphQL schema to match up to our mongoose schema
* We need to also add this new field to our `addCologne` mutation

## Update resolvers
* This is where we actually communicate with mongodb and update our database

`resolvers.js`

```
// MORE CODE

Mutation: {
  addCologne: async (
    root,
    { scentName, scentBrand, scentPrice, description, username },
    { Cologne }
  ) => {
    const newCologne = await new Cologne({
      scentName,
      scentBrand,
      scentPrice,
      description,
      username,
    }).save();

    return newCologne;
  },

// MORE CODE
```

* We added the necessary new field `scentBrand`

## Update our query
`client/src/queries/index.js`

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
      likes
      createdDate
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

// User Queries

// MORE CODE
```

* Above we add all the necessary fields to add this to all our GraphQL queries using cologne

## Update our AddCologne form
`AddCologne.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// GraphQL
import { Mutation } from 'react-apollo';
import { ADD_COLOGNE, GET_ALL_COLOGNES } from '../../queries';

const initialState = {
  scentName: '',
  scentBrand: '',
  scentPrice: 0,
  description: '',
  username: '',
};

class AddCologne extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  componentDidMount = () => {
    this.setState({
      username: this.props.session.getCurrentUser.username,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, addCologne) => {
    event.preventDefault();
    addCologne().then(({ data }) => {
      this.clearState();
      this.props.history.push('/');
    });
  };

  updateCache = (cache, { data: { addCologne } }) => {
    // read the query
    const { getAllColognes } = cache.readQuery({
      query: GET_ALL_COLOGNES,
    });

    // write to the query
    cache.writeQuery({
      query: GET_ALL_COLOGNES,
      data: {
        getAllColognes: [addCologne, ...getAllColognes],
      },
    });
  };

  render() {
    const {
      scentName,
      scentBrand,
      scentPrice,
      description,
      username,
    } = this.state;

    return (
      <div className="App">
        <h2 className="App">Add Cologne</h2>
        <Mutation
          mutation={ADD_COLOGNE}
          variables={{
            scentName,
            scentBrand,
            scentPrice,
            description,
            username,
          }}
          update={this.updateCache}
        >
          {(addCologne, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            // console.log(data);

            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addCologne)}
              >
                <label htmlFor="scentName">Scent Name</label>
                <input
                  type="text"
                  id="scentName"
                  name="scentName"
                  placeholder="Scent Name"
                  onChange={this.handleChange}
                  value={scentName}
                />
                <label htmlFor="scentBrand">Scent Brand</label>
                <input
                  type="text"
                  id="scentBrand"
                  name="scentBrand"
                  placeholder="Scent Brand"
                  onChange={this.handleChange}
                  value={scentBrand}
                />
                <label htmlFor="scentPrice">Scent Price</label>
                <input
                  type="text"
                  id="scentPrice"
                  name="scentPrice"
                  placeholder="Scent Price"
                  onChange={this.handleChange}
                  value={scentPrice}
                />
                <label htmlFor="description">Scent Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Scent Description"
                  onChange={this.handleChange}
                  value={description}
                />
                <button className="button-primary">Add Cologne</button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(AddCologne);
```

* I updated all places I needed to add `scentBrand`
* I removed most of the commented out logs as they were taking up too much space

## Update Single Page
* We need to show this new field on our single page

`ColognePage.js`

```
// MORE CODE

class ColognePage extends Component {
  render() {
    const { match } = this.props;
    const { _id } = match.params;

    return (
      <Query query={GET_COLOGNE} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          const {
            scentName,
            scentBrand,
            scentPrice,
            createdDate,
            likes,
            description,
            username,
          } = data.getCologne;

        return (
          <div className="App">
            <h2>Scent Name: {scentName}</h2>
            <p>
              <strong>Created Date: </strong>
              {createdDate}
            </p>
            <p>
              <strong>Scent Brand: </strong>
              {scentBrand}
            </p>
            <p>
              <strong>Scent Price: </strong>
              {scentPrice}
            </p>
            <p>
              <strong>Description: </strong>
              {description}
            </p>
            <p>
              <strong>Likes: </strong>
              {likes}
            </p>
            <p>
              <strong>Created By: </strong>
              {username}
            </p>
            <button>Like</button>
          </div>
        );
      }}
    </Query>
  );
}
}

export default withRouter(ColognePage);
```

## Test it out
* Let's take it for a test drive and see if our changes are working
* Start server `$ npm run dev`
* Sign out
* Log in
* Try to add a new cologne

### I get an error
* In the console after I add a cologne I get this error message `Error: GraphQL error: Cologne validation failed: scentBrand: Path `scentBrand` is required`
* That is my new field, I thought I added it everywhere needed but I guess I missed a place
* I found that I forgot to save one file (silly mistake) but I still had an error
* Using the network tab, I saw the error was coming from `getAllColognes`

![scentBrand error](https://i.imgur.com/VrFhEGR.png)

* And this led me to my mistake
* I just added a required field `scentBrand` and that means all my records need to have a `scentBrand` but after seeing this result I see I have to arrays that are returning `null`
* And my error message is `Cannot return null for non-nullable field Cologne.scentBrand`
* So the long story short here is my data before this change was structured differently, I had 2 colognes without a `scentBrand` field
* To fix this I just have to manually delete both these documents
* After deleting them both on mLab and refreshing my app in the browser, the Error goes away
* I am on the home page, click a link and taking to the single page where I see my newly added `scentBrand` value

## I can now do a PR
* PR === Pull Request
* Let's assume we were building this app as a team and I was the project manager
* I would tell all team members to **fork** the repo and this would make a copy of my app and fork that copy to the team members github account
* Their account would be origin on github and my forked acount would be `upstream`
* The team member would need to add `upstream` to their remote git with:

`$ git remote add upstream MYGITHUBREPOURL`

* You as team member would want to add, commit and push your branch to origin (your forked copy of my app repo)

`$ git push origin scentBrand`

* Then you would log into your github account and perform a PR (Pull Request)
* That would send an email to me letting me know you submitted a PR for Code Review
* I as Project Manager would accept the changes and them merge that branch into the master branch
* If I requested changes to the code I would email the team member and tell them to make the suggested fixes and resubmit a PR

## But let's keep this simple
* Just add and commit the changes

`$ git add -A`

`$ git commit -m 'add auth feature`

### Push the branch to origin
`$ git push origin auth`

### Compare and Pull Request
* This is a really cool feature
* Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add auth feature`

![commit](https://i.imgur.com/a8cXTgy.png)

* That will take you to a page of all changes in that commit
    - Green is code added
    - Red is code removed
    - All other code has not been modified
* Review all your changes
* If all looks good hit the back button in the browser
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
* Locally your master branch doesn't have the new feature `auth` added
* To prove this checkout of your `auth` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `auth` are gone!
* View your app in the browser and it also shows now sign of your auth feature!
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

## Pull down remote origin master branch
`$ git pull origin master`

## Test your site now
`$ npm run dev`

* You now see that our `auth` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d auth`

* That will let you know the branch was deleted with something like:

`Deleted branch auth (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists

## Congrats
* Our local repo is perfectly in sync with our remote Github repo

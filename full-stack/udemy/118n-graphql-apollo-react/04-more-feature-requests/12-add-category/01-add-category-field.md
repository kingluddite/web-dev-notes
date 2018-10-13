# Add new field (review)

## Feature branch
`$ git checkout -b category`

* Let's also add a category to our cologne
    - Floral
    - Oriental
    - Woody 
    - Fresh

`models/Cologne.js`

```
// MORE CODE

imageUrl: {
  type: String,
  required: true,
},
category: {
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
    createdDate: String
    description: String
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
      category: String!
      description: String
      username: String
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
    { scentName, scentBrand, scentPrice, imageUrl, category, description, username },
    { Cologne }
  ) => {
    const newCologne = await new Cologne({
      scentName,
      scentBrand,
      scentPrice,
      imageUrl,
      category,
      description,
      username
    }).save();

    return newCologne;
  },


// MORE CODE
```

## Update our queries

`queries/index.js`

```
// MORE CODE

/* cologne Mutations */

// Cologne Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentBrand: String!
    $scentPrice: Int
    $imageUrl: String!
    $category: String!
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentBrand: $scentBrand
      scentPrice: $scentPrice
      imageUrl: $imageUrl
      category: $category
      description: $description
      username: $username
    ) {
      _id
      scentName
      scentBrand
      scentPrice
      imageUrl
      category
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
    $category: String!
    $description: String
  ) {
    updateUserCologne(
      _id: $_id
      scentName: $scentName
      scentBrand: $scentBrand
      scentPrice: $scentPrice
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      _id
      scentName
      scentBrand
      scentPrice
      imageUrl
      category
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
      category
      description
      likes
      createdDate
      username
    }
  `,

// MORE CODE
```

## Add `inputs` and `dropdown` to our UI

`AddCologne.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// GraphQL
import { Mutation } from 'react-apollo';
import {
  ADD_COLOGNE,
  GET_ALL_COLOGNES,
  GET_USER_COLOGNES,
} from '../../queries';

// Auth
import withAuth from '../withAuth';

// custom components
import Error from '../Error';

const initialState = {
  scentName: '',
  scentBrand: '',
  scentPrice: 0,
  description: '',
  username: '',
};

class AddCologne extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  componentDidMount = () => {
    const { session } = this.props;
    this.setState({
      username: session.getCurrentUser.username,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, addCologne) => {
    const { history } = this.props;
    event.preventDefault();
    addCologne().then(({ data }) => {
      // console.log(data);
      this.clearState();
      history.push('/');
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

  validateForm = () => {
    const {
      scentName,
      scentBrand,
      scentPrice,
      imageUrl,
      category,
      description,
    } = this.state;
    const isInvalid =
      !scentName ||
      !scentBrand ||
      !scentPrice ||
      !imageUrl ||
      !category ||
      !description;
    return isInvalid;
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
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addCologne)}
              >
                <label htmlFor="scentName">
                  <input
                    type="text"
                    id="scentName"
                    name="scentName"
                    placeholder="Scent Name"
                    onChange={this.handleChange}
                    value={scentName}
                  />
                  <span className="hide">Scent Name</span>
                </label>
                <label htmlFor="scentBrand">
                  <input
                    type="text"
                    id="scentBrand"
                    name="scentBrand"
                    placeholder="Scent Brand"
                    onChange={this.handleChange}
                    value={scentBrand}
                  />
                  <span className="hide">Scent Brand</span>
                </label>
                <label htmlFor="scentPrice">
                  <input
                    type="text"
                    id="scentPrice"
                    name="scentPrice"
                    placeholder="Scent Price"
                    onChange={this.handleChange}
                    value={scentPrice}
                  />
                  <span className="hide">Scent Price</span>
                </label>
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
                <label htmlFor="category">
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Floral">Floral</option>
                  <option value="Oriental">Oriental</option>
                  <option value="Woody">Woody</option>
                  <option value="Fresh">Fresh</option>
                  <option value="Not Selected">Not Selected</option>
                </select>
                <span class="hide">Category of Cologne</span>
                </label>
                <label htmlFor="description">
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Scent Description"
                    onChange={this.handleChange}
                    value={description}
                  >
                    <span className="hide">Description</span>
                  </textarea>
                </label>
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Add Cologne
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddCologne)
);
```

## On Your Own
* Also update the EditModalCologne form with the category

## Test it out
* Log in
* Create a cologne
* Make sure the category was added when you created a cologne

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add category feature`

### Push the branch to origin
`$ git push origin category`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add category feature`

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
* Locally your master branch doesn't have the new feature `category` added
* To prove this checkout of your `category` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `category` are gone!
* View your app in the browser and it also shows now sign of your `category` feature!
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

* You now see that our `category` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d category`

* That will let you know the branch was deleted with something like:

`Deleted branch category (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo

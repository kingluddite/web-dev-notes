# Update UserCologne Mutation on client

## Update schema

`schema.js`

* **note** Remember to say what type is returned `Cologne` in the case of `updateUserCologne`

```
// MORE CODE

type Mutation {
  addCologne(
    scentName: String!
    scentBrand: String!
    scentPrice: Int
    description: String
    username: String
  ): Cologne

  updateUserCologne(
    _id: ObjectID!
    scentName: String!
    scentBrand: String!
    scentPrice: Int
    description: String
  ): Cologne

// MORE CODE
```

## Update resolvers

`resolvers.js`

* **note** when we use `$set`, we are not setting `_id`

```
// MORE CODE

updateUserCologne: async (
 root, { _id, scentName, scentBrand, scentPrice, description }, { Cologne }
) => {
  const updatedCologne = await Cologne.findOneAndUpdate(
    { _id },
    { $set: { scentName, scentBrand, scentPrice, description } },
    { new: true }
  );
  return updatedCologne
},

deleteUserCologne: async (root, { _id }, { Cologne }) => {


// MORE CODE
```

## Test in GraphQL GUI
```
mutation(
  $_id: ObjectID!
  $scentName: String!
  $scentBrand: String!
  $scentPrice: Int
  $description: String
) {
  updateUserCologne(
    _id: $_id
    scentName: $scentName
    scentBrand: $scentBrand
    scentPrice: $scentPrice
    description: $description
  ) {
    _id
    scentName
    scentBrand
    scentPrice
    description
  }
}
```

## Pass required variables
```
{
  "_id": "5bbd9d9a44244e309d5ed76e",
  "scentName": "two",
  "scentBrand": "two"
}
```

## View the test output
```
{
  "data": {
    "updateUserCologne": {
      "_id": "5bbd9d9a44244e309d5ed76e",
      "scentName": "two",
      "scentBrand": "two",
      "scentPrice": null,
      "description": null
    }
  }
}
```

## Create variable in `Cologne` queries
`queries/index.js`

```
// MORE CODE

export const UPDATE_USER_COLOGNE = gql`
  
`;

// MORE CODE
```

* Copy your GUI GraphQL code and paste into your client side GraphQL query

`queries/index.js`

```
// MORE CODE

export const UPDATE_USER_COLOGNE = gql`
  mutation(
    $_id: ObjectID!
    $scentName: String!
    $scentBrand: String!
    $scentPrice: Int
    $description: String
  ) {
    updateUserCologne(
      _id: $_id
      scentName: $scentName
      scentBrand: $scentBrand
      scentPrice: $scentPrice
      description: $description
    ) {
      _id
      scentName
      scentBrand
      scentPrice
      description
    }
  }
`;

// MORE CODE
```

## Create handleSubmit and pass it down to EditCologneModal
`UserColognes.js`

```
// MORE CODE

class UserColognes extends Component {
 // MORE CODE

  handleSubmit = (event, updateUserCologne) => {
    event.preventDefault();
    updateUserCologne().then(({ data }) => {
      this.closeModal();
    });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>

       // MORE CODE

          return (
            <ul>
              {modal && (
                <EditCologneModal
                  handleChange={this.handleChange}
                  closeModal={this.closeModal}
                  cologne={this.state}
                  handleSubmit={this.handleSubmit}
                />
              )}

// MORE CODE
```

* We add the `handleSubmit` function in our `class`
* We add an event that when the form is submitted with pass it the `handleSubmit` function which will give us access to it via **props** in the `EditCologneModal` component (that we pass down our `handleSubmit` function to)

## Import Mutation component and surround `EditCologneModal` with it
* We import Mutation from react-apollo
* We import our client side GraphQL `UPDATE_USER_COLOGNE` query
* We destructure `handleSubmit` from our `this.props` because we passed this function down through the `EditCologneModel` using the `handleSubmit` attribute

`EditCologneModal.js`

```
import React, { Component } from 'react';

// GraphQL
import { Mutation } from 'react-apollo';
import { UPDATE_USER_COLOGNE } from '../../queries';

export class EditCologneModal extends Component {
  render() {
    const { handleChange, closeModal, cologne, handleSubmit } = this.props;

    return (
      <Mutation
        mutation={UPDATE_USER_COLOGNE}
        variables={{
          _id: cologne._id,
          scentName: cologne.scentName,
          scentBrand: cologne.scentBrand,
          scentPrice: cologne.scentPrice,
          description: cologne.description,
        }}
      >
        {updateUserCologne => (
          <div className="modal modal-open">
            <div className="modal-inner">
              <div className="modal-content">
                <form
                  className="modal-content-inner"
                  onSubmit={event => handleSubmit(event, updateUserCologne)}
                >
                  <label htmlFor="scentName">Scent Name</label>
                  <input
                    type="text"
                    name="scentName"
                    onChange={handleChange}
                    value={cologne.scentName}
                  />
                  <label htmlFor="scentBrand">Scent Brand</label>
                  <input
                    type="text"
                    name="scentBrand"
                    onChange={handleChange}
                    value={cologne.scentBrand}
                  />
                  <label htmlFor="scentPrice">Scent Price</label>
                  <input
                    type="text"
                    name="scentPrice"
                    onChange={handleChange}
                    value={cologne.scentPrice}
                  />
                  {/* <label htmlFor="description">Add Description</label> */}
                  {/* <textarea */}
                  {/*   name="description" */}
                  {/*   onChange={handleChange} */}
                  {/*   value={cologne.description} */}
                  {/* /> */}
                  <hr />
                  <div className="modal-buttons">
                    <button className="button-primary">Update</button>
                    <button onClick={closeModal}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EditCologneModal;
```

* We have null values in our description textarea so we temporarily comment it out and add a todo to deal with this issue later

## Test
* Click `update` button
* Make a change to one of the form fields
* The `modal` will close and the `cologne` document is updated
* Check the home page and it is updated to
* Search for the new name and you will find it
* Go to the single page of the document and it is updated too

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add update feature`

### Push the branch to origin
`$ git push origin update`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add update feature`

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
* Locally your master branch doesn't have the new feature `update` added
* To prove this checkout of your `update` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `update` are gone!
* View your app in the browser and it also shows now sign of your `update` feature!
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

* You now see that our `update` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d update`

* That will let you know the branch was deleted with something like:

`Deleted branch update (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo

## Next - Time To Deploy to Production!

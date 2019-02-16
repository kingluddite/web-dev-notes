# Populate EditCologne fields in modal
* When we open the modal it is empty
* We need to pre-populate it with the current data so the user can update it
* We will replace `onClick` event handler to **show modal** with one to load `Cologne`
* Notice how we have access to `Cologne`

`UserColognes.js`

```
  // MORE CODE

  class UserColognes extends Component {

    // MORE CODE

    loadCologne = cologne => {
      console.log(cologne);
      this.setState({ modal: true });
    };

    // MORE CODE

    render() {
      // MORE CODE
      return (
        <Query query={GET_USER_COLOGNES} variables={{ username }}>

          // MORE CODE

                      {(deleteUserCologne, attrs = {}) => {
                        return (
                          <Fragment>
                            <button
                              type="button"
                              className="button-primary"
                              onClick={() => this.loadCologne(cologne)}
                            >
                              Update
                            </button>

```

* We pass in `cologne` to `loadCologne()`
* When `update` button **clicked** we log to see what `cologne` holds
    - And it holds only `scentName`
* We also show the `modal`
* We can see we have access to the `cologne` we need

## We need more values from GraphQL!
* We need to get more values and we can get that by updating the `GET_USER_COLOGNES` in our `UserColognes` component

`UserColognes.js`

```
// MORE CODE

<Query query={GET_USER_COLOGNES} variables={{ username }}>

// MORE CODE
```

## Add needed fields
`queries/index.js`

* Before

```
// MORE CODE

export const GET_USER_COLOGNES = gql`
  query($username: String!) {
    getUserColognes(username: $username) {
      _id
      scentName
      likes
    }
  }
`;

// MORE CODE
```

* After

```
// MORE CODE

export const GET_USER_COLOGNES = gql`
  query($username: String!) {
    getUserColognes(username: $username) {
      _id
      scentName
      scentBrand
      description
      likes
    }
  }
`;

// MORE CODE
```

## Test for Success
* Click `update` button again and now we have all the fields we need

## Update our `loadCologne` function
* We will set the `state` to everything in our `Cologne` object (_all the fields we need_)
* We comment out the log as we don't need it now
* And then we will also set `modal` to **true**

`UserColognes.js`

```
// MORE CODE

loadCologne = cologne => {
   // console.log(cologne);
   this.setState(...cologne, { modal: true });
 };

// MORE CODE
```

* **important** - Above is a big mistake and one that will drive you bonkers if you miss it
* This is what I should have typed:

```
// MORE CODE

loadCologne = cologne => {
   // console.log(cologne);
   this.setState({ ...cologne, modal: true });
 };

// MORE CODE
```

* See if you can spot the difference on your own...

### What was the difference?
* When you use `setState()` there is an object passed to it `setState({})`
* So I in the first block of code did not have cologne inside the object
* But in the second block of code I properly included the `cologne` object using the ES6 spread operator to take everything in the cologne object and also pass in `modal: true`
* OK... back to our code

### Don't forget we need the `_id`
* Add `_id` to state
* When updating a document we need it's unique `_id`

`UserColognes.js`

```
// MORE CODE

class UserColognes extends Component {
  state = {
    _id: '',
    scentName: '',
    scentBrand: '',
    description: '',
    modal: false,
  };

// MORE CODE
```

* We will need an `_id` for the `mutation` we will be executing in the future 

## Pass all our `state` values down to our modal
`UserColognes`

```
// MORE CODE

return (
  <ul>
    {modal && (
      <EditCologneModal
        handleChange={this.handleChange}
        closeModal={this.closeModal}
        cologne={this.state}
      />
    )}
    <h3>Your Colognes</h3>

// MORE CODE
```

## Add the values to the EditCologneModal.js
`EditCologneModal.js`

```
import React, { Component } from 'react';

export class EditCologneModal extends Component {
  render() {
    const { handleChange, closeModal, cologne } = this.props;

    return (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form className="modal-content-inner">
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
              <label htmlFor="description">Add Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={cologne.description}
              />
              <hr />
              <div className="modal-buttons">
                <button className="button-primary">Update</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCologneModal;
```

## Test
* Click update and the fields populate with the current data

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Populate cologne edit modal`

## Push to github
`$ git push origin update`

## Next - Update Mutation Client

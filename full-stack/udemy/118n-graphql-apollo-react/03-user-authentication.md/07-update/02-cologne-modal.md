# Create Cologne model window
* When you want to edit a `Cologne` you will click the update button
* And a modal will appear with all fields filled with content but all fields can be edited

## Add some modal CSS
* Add this at the bottom of your `App.css`

`App.css`

```css
/* MORE CSS */

/* Modal */
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  visibility: hidden;
  backface-visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}

.modal.modal-open {
  visibility: visible;
  backface-visibility: visible;
  opacity: 1;
  z-index: 1;
}

.modal-inner {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  max-width: 35em;
  padding: 1em 1.5em;
  position: relative;
  margin: 2em;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
}

.modal-content-inner {
  padding-top: 1em;
  margin-bottom: 0;
}

.modal-content-inner input {
  width: 500px;
}

.modal-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.modal-buttons button {
  margin-left: 1em;
}

.modal-buttons button:first-child {
  margin-left: 0;
}
```
## Create our model

`EditCologneModal.js`

* **note** In **jsx** we use `htmlFor` instead of `for` (for same reason as we do with `className`)
* It will be a SFC
* Remove `value` **prop** for each
* Change `this.handleChange` to `handleChange`
* We will pass down `handleChange` as a prop
* Add `update` and `cancel` buttons in **modal**

```
import React from 'react';

const EditCologneModal = ({ handleChange }) => {
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
            />
            <label htmlFor="scentBrand">Scent Brand</label>
            <input type="text" name="scentBrand" onChange={handleChange} />
            <label htmlFor="scentPrice">Scent Price</label>
            <input type="text" name="scentPrice" onChange={handleChange} />
            <label htmlFor="description">Add Description</label>
            <textarea name="description" onChange={handleChange} />
            <hr />
            <div className="modal-buttons">
              <button type="submit" className="button-primary">
                Update
              </button>
              <button>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCologneModal;
```

* We copy `handleChange` from `AddCologne` and paste it into `UserColognes`
* Then we pass it down as props for `EditCologneModal.js`

`UserColognes.js`

```
// MORE CODE

// custom components
import EditCologneModal from '../Cologne/EditCologneModal';

class UserColognes extends Component {

  // MORE CODE

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { username } = this.props;

    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <ul>
              <EditCologneModal handleChange={this.handleChange} />
              <h3>Your Colognes</h3>

// MORE CODE
```

## Test
* View profile and you'll see the modal and all it's form fields
* Open **React Dev Tools**
* Search for `UserColognes` and you will see that there is no `state`
* We need to add state

## Add state to UserColognes
`UserColognes.js`

```
// MORE CODE

class UserColognes extends Component {
  state = {
    scentName: '',
    scentBrand: '',
    description: '',
  };


// MORE CODE
```

## Test with React Dev Tools
* Use `react dev tools` again and see how `state` is updated for the fields in `UserColognes` when the text fields are typed into

## Add close modal - (Will show or hide modal)
* We add a `boolean` state for `modal`
* Use **logic** to say if the modal exists, show it, otherwise hide it
* Define `closeModal` event handler that just sets modal to `false`
* We pass down `closeModal` as props to `EditCologneModal`
* Add `onClick` handler to our **cancel** button

`UserColognes.js`

```
// MORE CODE

class UserColognes extends Component {
  state = {
    scentName: '',
    scentBrand: '',
    description: '',
    modal: false,
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  // MORE CODE

  render() {
    const { username } = this.props;
    const { modal } = this.state; // add this
    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
       // MORE CODE

          return (
            <ul>
              {modal && (
                <EditCologneModal
                  handleChange={this.handleChange}
                  closeModal={this.closeModal}
                />
              )}
              <h3>Your Colognes</h3>

// MORE CODE
```

## Destructure `closeModal`

`EditRecipeModal.js`

```
import React from 'react';

const EditCologneModal = ({ handleChange, closeModal }) => {
  return (
    // MORE CODE
            <hr />
            <div className="modal-buttons">
              // MORE CODE
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCologneModal;

```

## Test
* We now can't see our modal

## Open modal

`UserColognes.js`

* We'll use an inline function to set **modal** `state` to **true**

```
// MORE CODE

{(deleteUserCologne, attrs = {}) => (
<Fragment>
  <button
    className="button-primary"
    onClick={() => this.setState({ modal: true })}
  >
    Update
  </button>

// MORE CODE
```

* When the user clicks the `update` button we want to set the state of `modal` to **true** (_this will show the modal_)
* And our `closeModal` function will set the modal state to `false` (_this will hide our modal_)

## Test
* Click any `update` button in `/profile` and modal shows
* Click `Cancel` button and modal hides
  - But you get a **warning** 'Form submission canceled because the form is not connected'

## Here is `EditCologneModal` as a Class Based Component
* I'm going to convert my SFV to CBC (copy and paste the below code)

`EditCologneModal.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class EditCologneModal extends Component {
  render() {
    const { handleChange, closeModal } = this.props;

    return (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form className="modal-content-inner">
              <label htmlFor="scentName">Scent Name</label>
              <input type="text" name="scentName" onChange={handleChange} />
              <label htmlFor="scentBrand">Scent Brand</label>
              <input type="text" name="scentBrand" onChange={handleChange} />
              <label htmlFor="scentPrice">Scent Price</label>
              <input type="text" name="scentPrice" onChange={handleChange} />
              <label htmlFor="description">Add Description</label>
              <textarea name="description" onChange={handleChange} />
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

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add update button`

## Push to github
`$ git push origin update`

## Next - Populate cologne field

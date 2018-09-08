# Create Genealogy model window
* When you want to edit a genealogy you will click the update button and a modal will appear with all fields filled with content but all fields can be edited

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

## Make AddGenealogy more accessible
* Let's add label html tags

`AddGenealogy.js`

```
<form
                className="form"
                onSubmit={event => this.handleSubmit(event, addGenealogy)}
              >
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={firstName}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  value={lastName}
                />
                <label htmlFor="imageUrl">Genealogy Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Genealogy Image"
                  onChange={this.handleChange}
                  value={imageUrl}
                />
                <label htmlFor="category">Category of Genealogy</label>
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Family">Family</option>
                  <option value="Church">Church</option>
                  <option value="Ethnic">Ethnic</option>
                  <option value="Historic">Historic</option>
                  <option value="Miscellany">Miscellany</option>
                </select>
                <label htmlFor="description">Add Description</label>
                <CKEditor
                  name="description"
                  content={description}
                  events={{ change: this.handleEditorChange }}
                />
                {/*  <label htmlFor="description">Add Description</label>
                    <textarea
                  name="description"
                  placeholder="Add Description"
                  onChange={this.handleChange}
                  value={description}
                /> */}
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
```

* Remove `value` `prop` for each
* Change `this.handleChange` to `handleChange`
* We will pass down `handleChange` as a prop
* Add update and cancel buttons in modal

`EditRecipeModal.js`

```
import React from 'react';

const EditRecipeModal = ({ handleChange }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-inner">
        <div className="modal-content">
          <form className="modal-content-inner">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" onChange={handleChange} />
            <label htmlFor="imageUrl">Genealogy Image URL</label>
            <input type="text" name="imageUrl" onChange={handleChange} />
            <label htmlFor="category">Category of Genealogy</label>
            <select name="category" onChange={handleChange}>
              <option value="Family">Family</option>
              <option value="Church">Church</option>
              <option value="Ethnic">Ethnic</option>
              <option value="Historic">Historic</option>
              <option value="Miscellany">Miscellany</option>
            </select>
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
```

* We copy `handleChange` from `AddGenealogy` and paste it into UserGenealogies
* Then we pass it down as props for EditRecipeModal.js

```
// MORE CODE

handleChange = event => {
  const { name, value } = event.target;
  // console.log(name, ':', value);
  this.setState({ [name]: value });
};

render() {
 // MORE CODE

        return (
          <ul>
            <EditRecipeModal handleChange={this.handleChange} />

// MORE CODE
```

## Test
* View profile and you'll see the modal and all it's form fields
* Use react dev tools and there is no state in UserGenealogies

## Add state
`UserGenealogies.js`

```
// MORE CODE

class UserGenealogies extends Component {
  state = {
    firstName: '',
    lastName: '',
    imageUrl: '',
    category: '',
    description: '',
  };

// MORE CODE
```

## Test with React Dev Tools
* Use `react dev tools` and see how state is updated for the fields in `UserGenealogies` when they are typed into

## Add close modal
* Will show or hide modal
* We add a boolean state for `modal`
* Use logic to say if the modal exist, show it, otherwise hide it
* Define `closeModal` event handler that just sets modal to false
* We pass down closeModal as props to `EditGenealogyModal`
* Add onClick handler to our cancel button

`UserGenealogies.js`

```
// MORE CODE

class UserGenealogies extends Component {
  state = {
    firstName: '',
    lastName: '',
    imageUrl: '',
    category: '',
    description: '',
    modal: false,
  };

  // MORE CODE

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({ [name]: value });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state; // add this
    return (
      <Query query={GET_USER_GENEALOGIES} variables={{ username }}>
      
      // MORE CODE

          return (
            <ul>
              {modal && (
                <EditRecipeModal
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                />
              )}

// MORE CODE
```

`EditRecipeModal.js`

```
import React from 'react';

const EditRecipeModal = ({ handleChange, closeModal }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-inner">
        <div className="modal-content">
          <form className="modal-content-inner">
           
           // MORE CODE

            <hr />
            <div className="modal-buttons">
              <button type="submit" className="button-primary">
                Update
              </button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeModal;
```

## Test
* We now can't see our modal

## Open modal
* We'll use an inline function to set modal state to true

`UserGenealogies.js`

```
// MORE CODE

{(deleteUserGenealogy, attrs = {}) => (
                    <Fragment>
                      <button
                        className="button-primary"
                        onClick={() => this.setState({ modal: true })}
                      >
                        Update
                      </button>

// MORE CODE
```

## Test
* Click any update button in `/profile` and modal shows
* Click `Cancel` button and modal hides








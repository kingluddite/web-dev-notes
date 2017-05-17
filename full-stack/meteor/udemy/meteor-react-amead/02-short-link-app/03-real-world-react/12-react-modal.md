# Creating Modals with React-Modal
Currently, we have a form on the page but we want to place our form inside a Modal and it will be triggered by a button

## [react-modal](https://github.com/reactjs/react-modal)
This is a third party react Component

* Bootstrap and Foundation have Modals built into their Libraries
    - React could cause some problems with these but their are a ton of solutions
    - [React Dropdown](http://fraserxu.me/react-dropdown/)

## Install react-modal
`$ yarn add react-modal`
    
### Read the documentation. It is awesome
```
<Modal
  isOpen={bool}
  onAfterOpen={afterOpenFn}
  onRequestClose={requestCloseFn}
  closeTimeoutMS={n}
  style={customStyle}
  contentLabel="Modal"
>
  <h1>Modal Content</h1>
  <p>Etc.</p>
</Modal>
```

* We provide `props` and then type our html elements
* It's that simple

## Move `AddLink`
`Link`

```
import React from 'react';
import Header from './Header';
import LinksList from './LinksList';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
      return (
        <div>
          <Header title="Your Links" />
          {/* add this line */}
          <LinksListFilters />
          <AddLink />
          <LinksList />
        </div>
      );
}
```

## Add imports
```
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal'; // add this line
// more code
```

Change this in `AddLink`

```
// more code
render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={this.onChange.bind(this)}
          />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
};
```

And Change it to include our new Modal

```
render() {
    return (
      <div>
        <Modal>
          <p>Add Link</p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button>Add Link</button>
          </form>
        </Modal>
      </div>
    );
  }
};

export default Header;
```

* We will get errors because we are missing two required `props`

## Alter Modal to include required `props`
`<Modal isOpen={true} contentLabel="Add link">`

* We set the Modal to be open by default - we will make this dynamic using `state`
* `contentLabel` is used for accessibility on screenreaders
* View in browser and you'll see our content and [a really ugly modal](https://i.imgur.com/plUXVPc.png)

## Add Modal `state`
`AddLink`

```
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      isOpen: false
    };
  }
```

And we set our Modal to the current `state` value of `isOpen`

`<Modal isOpen={this.state.isOpen} contentLabel="Add link">`

* This will close our Modal by default on page load

## Add button to open/close Modal on click
* Make sure to set `url` to an empty string in `state` on close modal

`Header`

```
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal'; // add this line

class Header extends Component {
  constructor(props) {
    super(props);

    // add modalIsOpen to state
    this.state = {
      url: '',
      modalIsOpen: false
    };

    // we can also bind like this
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '' });
        }
      });
    }
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  // set state on modal open
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
  // set state on modal close and clear out url
  closeModal() {
    this.setState({modalIsOpen: false, url: ''});
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>+ Add Link</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add link"
        >
          <p>Add Link</p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button>Add Link</button>
          </form>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
};

export default Header;
```

## Close modal when we submit the `AddLink` form
```
// more code
onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '', modalIsOpen: false });
        }
      });
    }
  }
// more code
```

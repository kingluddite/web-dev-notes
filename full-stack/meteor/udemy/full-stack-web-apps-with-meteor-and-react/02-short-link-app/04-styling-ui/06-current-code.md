# Current Code
* We made a lot of changes so this is what the files should look like
* Use as reference if you have errors

`AddLink`

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
      modalIsOpen: false,
      error: ''
    };

    // we can also bind like this
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.closeModal();
      } else {
        this.setState({ error: err.reason });
      }
    });
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
    this.setState({
      modalIsOpen: false,
      url: '',
      error: ''
    });
  }

  render() {
    return (
      <div>
        <button className="button" onClick={this.openModal}>+ Add Link</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.closeModal}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view__modal"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button className="button">Add Link</button>
            <button type="button" className="button button--default" onClick={this.closeModal.bind}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
};

export default Header;
```

`Signup`

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    if (password.length < 9 ) {
      return this.setState({ error: 'Password must be more than 8 characters long.'});
    }

    Accounts.createUser({email, password}, (err) => {
       if (err) {
          this.setState({error: err.reason});
       } else {
          this.setState({error: ''});
       }
    });
  }

  render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
};

export default Signup;
```

`Login`

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);


    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      // console.log('Login callback', err);
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Have an account?</Link>
        </div>
      </div>
    );
  }
};

export default Login;
```

`Not Found`

```
import React from 'react';
import { Link } from 'react-router';

export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>Hmmm, we're unable to find that page</p>
          <Link to="/" className="button button--link">HEAD HOME</Link>
        </div>
      </div>
    );
};
```

`LinksListItem.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

class LinksListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }), 1000);
    }).on('error', () =>{
      alert('Unable to copy. Please manually copy the link.');
    });
  }
  componentWillUnmount() {
     this.clipboard.destroy();
  }
  renderStats() {
    const { lastVisitedAt, visitedCount } = this.props;
    const visitSubjectVerbAgreement = visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if (typeof lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(lastVisitedAt).fromNow()})`;
    }
    return <p>{visitedCount} {visitSubjectVerbAgreement} - {visitedMessage}</p>
  }

  render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <p>{this.props.visible.toString()}</p>
         {this.renderStats()}
         <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
           Visit
         </a>
         <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
           {this.state.justCopied ? 'Copied' : 'Copy'}
         </button>
         <button className="button button--pill" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
         }}>
           {this.props.visible ? 'Hide' : 'Unhide'}
         </button>
       </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}

export default LinksListItem;
```

`_variables`

```
// Colors
$brand-primary: #5b4681; // better than just 'purple' what if we change the color?
$grey: #dddddd;
$white: #ffffff;

// Spacing
$space: 1.4rem;

// Font sizes
$base-font-size: 1.6rem;

// Form inputs
$input-border: $grey;
$input-spacing: 1rem;

// Boxed view
$boxed-view-overlay-bg: $grey;
$boxed-view-bg: $white;

// Links
$link-color: #000000;

// Button
$button-bg: $brand-primary;
$button-color: $white;
$button-pill-color: $brand-primary;
$button-default-bg: #f9f9f9;
$button-default-color: #777777;
$button-default-border-color: $grey;
```

`_button.scss`

```
.button {
  font-size: $base-font-size;
  padding: $input-spacing;
  cursor: pointer;
  line-height: 1.2;
  margin-bottom: $space;
  text-transform: uppercase;
  color: #ffffff;
  border: 0;
  background-color: $button-bg;
}

.button--default {
  background-color: $button-default-bg;
  color: $button-default-color;
  border: 1px solid $button-default-border-color;
}

// button modifier
.button--link {
  display: inline-block;
  text-decoration: none;
}

.button--pill {
  background-color: transparent;
  border: 1px solid $button-pill-color;
  color: $button-pill-color;
  padding: 0.3rem 0.8rem;
}
```

`_boxed-view.scss`

```
.boxed-view {
  align-items: center;
  background: $boxed-view-overlay-bg;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

// take up entire space of viewport
.boxed-view__modal {
  background: fade-out($boxed-view-overlay-bg, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.boxed-view__box {
  background-color: $boxed-view-bg;
  padding: 2.4rem;
  text-align: center;
  width: 24rem;
}

.boxed-view__form {
  display: flex;
  flex-direction: column;
}
```

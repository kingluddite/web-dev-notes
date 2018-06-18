## React Inputs

`ContactsList.js`

```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.contacts.map((contact) => {
              return <Contact contact={contact} key={contact.id} />
          })}
        </ul>
        <input type="text" />
      </div>

    )
  }
}

export default ContactsList;
```

view in browser and you'll see a very basic input box

but you can't change it
if you were using a normal input in html, you could change it
if you use the `defaultValue` property you will be able to change it

`<input type="text" defualtValue="check this out" />`

to make this work in the React world, we are going to use `state` and handle all changes with an onChange event

```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  constructor() {
    super();
    this.state = {
      search: 'Level Up'
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.contacts.map((contact) => {
              return <Contact contact={contact} key={contact.id} />
          })}
        </ul>
          <input type="text" value={this.state.search} />
      </div>
    )
  }
}

export default ContactsList;
```

view in browser and you'll see `Level Up` just like before and we can't change it. But now we are ready to bind an event to it.

### Make events work

every time you try and change the input field, `yo` appears in console. Our `onChange` event is working

### How can we make the value update?

#### Use console to see event
update this method with:

```js
updateSearch(event) {
    console.log(event);
  }
```

Now you'll see in console target and value

```js
updateSearch(event) {
    console.log(event.target.value);
  }
```

now you will see 'Level Up' + whatever letter you type appear in the console

```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  constructor() {
    super();
    this.state = {
      search: 'Level Up'
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.contacts.map((contact) => {
              return <Contact contact={contact} key={contact.id} />
          })}
        </ul>
          <input type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
      </div>
    )
  }
}

export default ContactsList;
```

now you will type in input and it will replace the 'Level Up' with whatever you type

What if you want to limit the number of characters typed into the text input to only 20? Do this

```js
updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
  }
```
## Building a Search filter

create variables to make your code look cleaner

```js
render() {
    let filterContacts = this.props.contacts;
    return (
      <div>
        <ul>
          {filterContacts.map((contact) => {
              return <Contact contact={contact} key={contact.id} />
          })}
        </ul>
          <input type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
      </div>
    )
  }
}

export default ContactsList;
```

So now we want to filter the names in our list by what the person types in the input box

```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
  }

  render() {
    let filterContacts = this.props.contacts.filter(
      (contact) => {
        return contact.name.indexOf(this.state.search) !== -1;
      }
    );
    return (
      <div>
        <ul>
          {filterContacts.map((contact) => {
              return <Contact contact={contact} key={contact.id} />
          })}
        </ul>
          <input type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
      </div>
    )
  }
}

export default ContactsList;
```

so now type `p` in the input box and you will only see names in your contacts `p`

### case sensative
If you type uppercase T you only get one name but if you change the method to this:

```js
let filterContacts = this.props.contacts.filter(
      (contact) => {
        return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
```

now you will get 3 names with T (case insensative)

put input on top of UL

```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
  }

  render() {
    let filterContacts = this.props.contacts.filter(
      (contact) => {
        return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <div>
        <input type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
          />
        <ul>
          {filterContacts.map((contact) => {
              return <Contact contact={contact} key={contact.id} />
          })}
        </ul>
      </div>
    )
  }
}

export default ContactsList;
```

## Using Forms
video #15

passing props into our constructor and super()

```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      contacts: props.contacts
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
  }

  render() {
    let filterContacts = this.state.contacts.filter(
      (contact) => {
        return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <div>
        <input type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
          />
        <ul>
          {filterContacts.map((contact) => {
              return <Contact contact={contact} key={contact.id} />
          })}
        </ul>
      </div>
    )
  }
}

export default ContactsList;
```
you should never modify state without using `this.setState`

before
`contacts: this.state.contacts.push({id: id, name: name, phone: phone});`

after (ES6 makes it easier to assign values to objects)

`contacts: this.state.contacts.push({id, name, phone});`

**problem**
this:
`contacts: this.state.contacts.push({id, name, phone});`

`push` is directly modifying the original array

if we use `contact` it is not actually modifying the array, it is creating a new array, with these items and it returns a new array that we assign to contacts

returns a number and we are trying to modify state without setState
and contacts was getting set to a number value
and a number value doesn't have the method 'filter'

## Adding values to state with form

```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      contacts: props.contacts
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
  }

  addContact(event) {
    event.preventDefault();
    let name = this.refs.name.value;
    let phone = this.refs.phone.value;
    let id = Math.floor((Math.random() * 100) + 1);
    // console.log(name.value);
    this.setState({
      contacts: this.state.contacts.concat({id, name, phone})
    });
    // empty form
    this.refs.name.value = '';
    this.refs.phone.value = '';
  }

  render() {
    let filterContacts = this.state.contacts.filter(
      (contact) => {
        return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <div>
        <input type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
          />
        <form onSubmit={this.addContact.bind(this)}>
          <input type="text" ref="name" />
          <input type="text" ref="phone" />
          <button type="submit">Add New Contact</button>
        </form>
        <ul>
          {filterContacts.map((contact) => {
              return <Contact contact={contact} key={contact.id} />
          })}
        </ul>
      </div>
    )
  }
}

export default ContactsList;
```

## Functional Stateless Components
(video #16)

aka `Pure` aka `dumb components`

we have Contact component that has JSX but it doesn't really need it. we can convert it to a functional stateless component

## converted to Functional Stateless component

```js
import React, from 'react';
import {render} from 'react-dom';

const Contact = ({contact}) =>
  <li>
    {contact.name} {contact.phone}
  </li>

export default Contact;
```

## pass in more than one prop

```js
import React from 'react';
import {render} from 'react-dom';

const Contact = ({contact, item}) =>
  <li>
    {contact.name} {contact.phone} {item}
  </li>

export default Contact;
```

and update this in ContactsList

```js
<ul>
          {filterContacts.map((contact) => {
              return <Contact contact={contact} item="hello" key={contact.id} />
          })}
        </ul>
```
Meteor + React
https://www.youtube.com/watch?v=B_HJCmoSvmc&list=PLJ0yN6AIWGkOM6OFCkjZf-Vy4WYn1r04f



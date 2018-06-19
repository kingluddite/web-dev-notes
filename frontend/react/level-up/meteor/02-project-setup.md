#React Project Setup

package.json

```js
{
  "name": "react-for-everyone",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^5.8.*",
    "babel-loader": "^5.3.*",
    "webpack": "^1.12.*",
    "webpack-dev-server": "^1.10.*"
  },
  "dependencies": {
    "react": "0.13.*"
  }
}
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>React For Everyone</title>
</head>
<body>
 <div id="app"></div>
 <!-- /#app -->
 <script src="app.js"></script>

</body>
</html>
```

webpack.config.js

```js
module.exports = {
  entry: [
    './src/App.js'
  ],
  output: {
    path: __dirname,
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  }
};
```

## run our basic web server

type this to run web server

`$ node_modules/.bin/webpack-dev-server`

localhost:8080 - app loads, blank white page

we currently have no js/app.js content but if you go to

localhost:8080/app.js you will see a bunch of code that is some very basic web pack stuff

## Update code video (#7.5)
we are updating to react 15

### Now using ES2015 (aka ES6)!

updated `package.json`

```js
{
  "name": "react-for-everyone",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.7.*",
    "babel-loader": "^6.2.*",
    "babel-preset-es2015": "^6.6.*",
    "babel-preset-react": "^6.5.*",
    "webpack": "^1.12.*",
    "webpack-dev-server": "^1.14.*"
  },
  "dependencies": {
    "react": "^15.0.0",
    "react-dom": "^15.0.0"
  }
}
```

updated `webpack.config.js`

```js
module.exports = {
  entry: './src/App.js',
  output: {
    path: __dirname,
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
```
running webpack
install globally
npm install webpack-dev-server -g
webpack-dev-server --progress --inline --hot

## App.js

```js
import React from 'react';
import {render} from 'react-dom';
// import ContactsList from './ContactsList';

let contacts = [{
  id: 1,
  name: 'Scott',
  phone: '555 333 5555'
}, {
  id: 2,
  name: 'Courtney',
  phone: '555 111 5555'
}, {
  id: 3,
  name: 'Tim',
  phone: '111 333 5555'
}, {
  id: 4,
  name: 'Phil',
  phone: '222 333 4444'
}]

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Contacts List</h1>
      </div>
    )
  }
}

render(<App contacts={contacts} />, document.getElementById('app'));
```

view in browser and you should see `Contact List`

## (video 10) exporting & importing a child Component

**note** `./FolderName`
This means "in the same folder"

`src/components/ContactsList.js`

note that we need to export this component at the end or else it will not be available

```js
import React from 'react';
import {render} from 'react-dom';

class ContactsList extends React.Component {
  render() {
    return (
      <ul>
        <li>Phil 111 222 3333</li>
      </ul>
    )
  }
}

export default ContactsList;
```

`src/App.js`

```js
import React from 'react';
import {render} from 'react-dom';
import ContactsList from './components/ContactsList';let contacts =

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Contacts List</h1>
        <ContactsList />
      </div>
    )
  }
}

render(<App contacts={contacts} />, document.getElementById('app'));
```

![output](https://i.imgur.com/cGJigTd.png)

## (video #11) Passing Data into our Components

```js
import React from 'react';
import {render} from 'react-dom';
import ContactsList from './components/ContactsList';

let contacts = {
  name: 'Scott',
  phone: '555 333 5555'
}

class App extends React.Component {
  render() {
    // console.log(this.props.contacts);
    return (
      <div>
        <h1>Contacts List</h1>
        <ContactsList contacts={this.props.contacts}/>
      </div>
    )
  }
}

render(<App contacts={contacts} />, document.getElementById('app'));
```

`src/components/ContactsList.js`

```js
import React from 'react';
import {render} from 'react-dom';

class ContactsList extends React.Component {
  render() {
    return (
      <ul>
        <li>{this.props.contacts.name}</li>
      </ul>
    )
  }
}

export default ContactsList;
```

review

we have some props

```js
let contacts = {
  name: 'Scott',
  phone: '555 333 5555'
}
```

in App.js we pass them down to our <App contacts={contacts} />

Inside our app class we pass our props into our <ContactsList contacts={this.props.contacts} />

inside our ContactsList component we use the props with `{this.props.contacts.name}`

## Iterate over data with JSX (video #12)

we change this

```js
let contacts = {
  name: 'Scott',
  phone: '555 333 5555'
}
```

to this:

```js
let contacts = [{
  id: 1,
  name: 'Scott',
  phone: '555 333 5555'
}, {
  id: 2,
  name: 'Courtney',
  phone: '555 111 5555'
}, {
  id: 3,
  name: 'Tim',
  phone: '111 333 5555'
}, {
  id: 4,
  name: 'Phil',
  phone: '222 333 4444'
}]
```

when we turn our object into an array of objects it breaks
why?
it is looking for a single contact in object
it will not find a name property on an array of objects
so we will need to iterate over this list

## ContactList
```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.contacts.map((contact) => {
            return <Contact contact={contact} />
        })}
      </ul>
    )
  }
}

export default ContactsList;
```

## Contact.js
```js
import React from 'react';
import {render} from 'react-dom';

class Contact extends React.Component {
  render() {
    return (
      <li>
        {this.props.contact.name} {this.props.contact.phone}
      </li>
    )
  }
}

export default Contact;
```

now we use the map() function to itereate through the `contacts` array of objects and spit out each contact in the Contact module

we have a warning because we need a unique key, add a unique id to each object in our array of objects

so inside ContactsList, we reference the key inside our <Contact contact={contact} key={contact.id} />

```js
import React from 'react';
import {render} from 'react-dom';
import Contact from './Contact';

class ContactsList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.contacts.map((contact) => {
            return <Contact contact={contact} key={contact.id} />
        })}
      </ul>
    )
  }
}

export default ContactsList;
```
refresh the browser and we now see all our objects iterated through


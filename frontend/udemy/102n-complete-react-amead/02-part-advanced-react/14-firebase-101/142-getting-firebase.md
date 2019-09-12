# Getting Firebase
* [URL](https://firebase.google.com/?gclid=Cj0KCQiAtJbTBRDkARIsAIA0a5OhbrMFVZnrFosYIUGGsyHIxr5r71xxD8YEt6hp3wJ9lAUE7DVRkJQaAlH0EALw_wcB)
* Login (gmail account - owned by google)
* Click go to console
* Click add project
* Click web app
* Click Develop > Database > Get started
* Click rules tab

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

* Publish
* Ignore warning and click 'Overview'
* Click add Firebase to your web app

## Install Firebase
`$ yarn add firebase`

`src/firebase/firebase.js`

* This is how we connect the database

`import * as firebase from 'firebase`

* We take all the named exports from firebase and create an alias called `firebase`

#### This is like us doing:
`import * as expensesActions from '../actions/expenses';`

* Now you'll have access to all sorts of things
    - addExpenses.addExpense
    - or
    - addExpenses.removeExpense

`firebase/firebase.js`

```js
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDYG7aalHm2evdm0-bqfV_XXXXXXXX',
  authDomain: 'expensify.firebaseapp.com',
  databaseURL: 'https://expensify.firebaseio.com',
  projectId: 'expensify-1111',
  storageBucket: 'expensify.appspot.com',
  messagingSenderId: '447434791111',
};

firebase.initializeApp(config);

firebase.database().ref().set({
  name: 'John Wayne',
});
```

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';
import './firebase/firebase'; // add this line
// // MORE CODE
```

* Run dev server

`$ yarn run dev-server`

* View page in browser
* Then view database in firebase

![your database is connected](https://i.imgur.com/Q0IgE1P.png)



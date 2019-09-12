# New Feature Workflow
* We'll make changes to an existing component
* We'll go through process of making sure those changes work
* Test those changes
* Deploy those changes
* This is how you build out a feature

## ExpenseListItem Component
* Open this file and it's companion test file
* We will output a human readable date

### Boot up dev server
`$ yarn run dev-server` (one terminal tab)
    
* So we can view our app

### Troubleshoot
* Because of HOC was getting an error so added this in .eslintrc to turn that error off

`.eslintrc`

```
// MORE CODE
"no-console": 0,
"import/no-named-as-default": 0,
// MORE CODE
```

* Code should run in browser

## Run test (in other terminal window)
`$ yarn test --watch`

* Hit `a` to run tests again
* 55 tests passed

```
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {amount}
      -
      {moment(createdAt).format('MMMM Do, YYYY')}
    </p>
  </div>
);

export default ExpenseListItem;
```

* We import `moment`
* We pass `createdAt` into moment and use moment display documentation to output a nice human friendly date
* We need to create a new snapshot with `u`

## numeral js
* Library to make working with currency easy
* [link to numeraljs.com](http://numeraljs.com/)

### install numeral js
`$ yarn add numeral`

```
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {numeral(amount / 100).format('$0,0.00')}
      -
      {moment(createdAt).format('MMMM Do, YYYY')}
    </p>
  </div>
);

export default ExpenseListItem;
```

* Press `u` to generate new snapshots

## Take app for test drive
* Make sure it is working
* You can customize it for your local (france.. european currency... just read docs for numeraljs)
* View app in browser
* Create a new expense
    - d (description)
    - 1133.1 (should be .10 after format)
    - Will give you `$1,133.10-January 29th, 2018`
    - It is working!

### make commit
* Check status to see what you changed
* `$ ga -A`
* `$ gc -m 'Setup formatting for amount and createAt'`
* `$ gpush`
* `$ gph`
    - If not logged in to heroku
        + enter email (used in heroku)
        + enter heroku password
* `$ gph`
* `$ heroku create` - If you don't have git on heroku 
    - check with `$ git remote -v`

### Test on live site
* Open with `$ heroku open`
* Make sure no errors
* Use heroku logs if errors or app doesn't load in browser
* If it loads make sure the app is working just like it works on local dev environment





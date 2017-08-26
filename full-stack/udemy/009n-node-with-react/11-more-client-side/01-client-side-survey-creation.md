# Client Side Survey Creation
* We could stay on the server to make sure when user clicks on button it gives some feedback to our server
* Or we could work on the front end Component for creating a new survey

## Let's work on the client side UI to create a new survey
![our create survey mockups](https://i.imgur.com/XdzFeNx.png)

* Create a survey will be a two-stage process
* user visits /survey/new
    - We'll show the user a form to fill out
    - User fills out
    - User clicks `next` button
* User sees form with all their inputs
* They review
* They like - they click `submit`
* The don't like - they click `back`

## Create new survey button
* We'll add this to our home logged in page

![create survey button](https://i.imgur.com/fPeLd7s.png)

### Create a new Dashboard Component
`Dashboard.js`

```
import React from 'react';

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;
```

* Make sure to import Dashboard into App.js
* Add this code

`import Dashboard from './Dashboard';`

* The `React Router` is correct and points to `/surveys`

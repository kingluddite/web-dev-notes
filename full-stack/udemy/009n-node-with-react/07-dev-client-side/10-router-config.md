# Router Configuration
* Caution - `BrowserRouter` expects only 1 child
* This would cause an error

```
return (
  <div>
    <BrowserRouter>
        <div></div>
        <div></div>
    </BrowserRouter>
  </div>;
  );
```

* `path="/"`
    - Means the root route of the Application
    - So if someone goes to our domain of `ourdomain.com` they will come to the root route of `/`
    - We never specify the domain name in here

`App.js`

```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" component={Landing} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```

## Test
* Browser at `localhost:3000` should show `Landing`
* It works
* But we do have some warnings in the dev toolbar

![missing components](https://i.imgur.com/a3YtmYc.png)

* This is just letting us know we created variables but didn't use them

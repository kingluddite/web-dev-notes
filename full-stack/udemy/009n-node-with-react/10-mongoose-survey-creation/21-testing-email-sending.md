# Testing Email Sending
`surveyRoutes.js`

```js
// more code
    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};
```

## How do we test this out?
* I don't want to set up forms in react until I know the backend works
* We could use a REST client like Postman to use any arbitrary endpoint on any given server
    - We won't use Postman or any other REST client
    - Why?
    - Doing oAuth flow through any REST client is a major pain

### Not using Postman
* We need to make sure we have direct access to the axios module inside browser from our React Library
* We'll then use the axios module to make a POST request to our backend server from our `React` app manually
* **remember** Any time we make a request from the `React` side of our app over to our backend server, cookies are included and so we will pass all the login checks
    - So we are essentially created a fake rest client on the client side of our app inside the browser and we'll pass all the authentication checks with no problems

### Import axios into our client side app
`client/src/index.js`

```js
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios'; // add this
window.axios = axios; // add this
// more code
```

* Above is just temp test code
* Test in browser
    - Refresh browser
    - Open Chrome dev tool Console
    - Type `axios` and you should see the axios library pop out

![axios library](https://i.imgur.com/wvtqW5b.png)

* Now we can use `axios.post` and use all the cookies that are provided at localhost:3000
* If we manually type the routes in the console we should be able to test all the email logic

![add in console](https://i.imgur.com/swAD6BJ.png)

`const survey = { title: 'my title', subject: 'my subject', recipients: 'biffhappy35@gmail.com', body: 'here is the body of the email' };`

### Use axios to send this to our backend server
`axios.post('/api/surveys', survey);`

* Enter that into the Chrome console
* You'll see that our request is pending
* Because we are not properly responding to our request yet

![network tab pending](https://i.imgur.com/nREHvVS.png)

**remember**

```js
// more code
    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};
```

* We are sending our Mailer but we never terminate the request and send back a response
* But if you check your email and look for your `Promotions` tab

![we have an email](https://i.imgur.com/4v2vOkZ.png)

![the email](https://i.imgur.com/dgojUyP.png)

## Clean up
* Remove axios from our Window scope and remove these lines

`client/src/index.js`

```js
import axios from 'axios';
window.axios = axios;
```

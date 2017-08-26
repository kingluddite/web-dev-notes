# Feedback for User Feedback
## Houston we have a problem
* In development all works well but we have `yes` and `no` links that link to `localhost:3000`
    - When we move to production, this will obviously be a problem
    - Let's fix this
        + Send the user to an appropriate domain based on whether we are in production or development
        + Before we just used relative paths and that worked on dev and prod
        + But this HTML will be rendered inside of a user's email inbox
            * In an email inbox we can't rely on relative links
                - `/surveys` in a user's email will send a user to `/surveys` on their current domain (which might be gmail or msm or yahoo...)

## Two ways to do this
1. Add a key to our config file inside the dev.js and prod.js files and say "here is the domain we should use"
    * This is the more elegant solution
    * This is the solution we'll use
2. Or we can just specify the domain directly inside our survey template file

`/config/dev.js`

```
// more code
  redirectDomain: 'http://localhost:3000'
};
```

`/config/prod.js`

```
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN
};
```

* Add the root domain of your heroku app to the heroku dashboard Config Vars

### Update our survey template
`surveyTemplate.js`

```js
const keys = require('./../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input</h3>
           <p>Please answer the following question:</p>
           <p>${survey.body}</p>
           <div>
            <a href="${keys.redirectDomain}">Yes</a>
           </div>
           <div>
            <a href="${keys.redirectDomain}">No</a>
           </div>
        </div>
      </body>
    </html>
  `;
};
```

## Fix the flow
* Currently, the user clicks a link and they are taking our site
* This is strange and we need to add a Thank you Page
* Better user experience

## New Route
* We could add this route in React or our Backend
* Let's add it to our backend since we are here now

`surveyRoutes.js`

```
// more code
const Survey = mongoose.model('Survey');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });
// more code
```

## Update our survey template links
`surveyTemplate.js`

```js
const keys = require('./../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input</h3>
           <p>Please answer the following question:</p>
           <p>${survey.body}</p>
           <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
           </div>
           <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
           </div>
        </div>
      </body>
    </html>
  `;
};
```

* **note** I didn't use backtick but just double quotes
    - We are inside backticks already so I don't need to nest backticks
* Now when the user clicks the link, they'll be taking to our site and we just say thanks

## Test it out
* Use Chrome to resend survey
* `const survey = { title: 'my title', subject: 'my subject', recipients: 'biffhappy35@gmail.com', body: 'here is the body of the email' };`
* And then send the survey
* `axios.post('/api/surveys', survey);`
* Check your email and click `yes` or `no`
* You will be taken to a lame thank you page

![lame thank you](https://i.imgur.com/0cbGDcT.png)

* We should make this a React page and not part of our API and just send them to a thank you page

## Use React Route instead
* Remove the backend route (comment it out)

```
module.exports = app => {
  // app.get('/api/surveys/thanks', (req, res) => {
  //   res.send('Thanks for voting!');
  // });
```

* Create a new Component named `SurveyThanks.js`

```
import React from 'react';

const SurveyThanks = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Emaily</h1>
      <p>Thanks for your Feedback!</p>
    </div>
  );
};

export default SurveyThanks
```

* Add the route to our email template `surveyTemplate.js`

```
const keys = require('./../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input</h3>
           <p>Please answer the following question:</p>
           <p>${survey.body}</p>
           <div>
            <a href="${keys.redirectDomain}/surveys/thanks">Yes</a>
           </div>
           <div>
            <a href="${keys.redirectDomain}/surveys/thanks">No</a>
           </div>
        </div>
      </body>
    </html>
  `;
};
```

* Update App.js by importing the new Component

```
// more code
import Header from './Header';
import Landing from './Landing';
import SurveyThanks from './SurveyThanks'; // add this line
```

* Update `React Router` with the new route

`App.js`

```
// more code
<BrowserRouter>
  <div>
    <Header />
    <Route exact path="/" component={Landing} />
    <Route exact path="/surveys" component={Dashboard} />
    <Route path="/surveys/new" component={SurveyNew} />
    <Route path="/surveys/thanks" component={SurveyThanks} />
  </div>
</BrowserRouter>
// more code
```


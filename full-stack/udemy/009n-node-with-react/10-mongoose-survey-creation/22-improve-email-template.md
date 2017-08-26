# Improve our Email Template
* Update our email template

`surveyTemplate.js`

```js
module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input</h3>
           <p>Please answer the following question:</p>
           <p>${survey.body}</p>
           <div>
            <a href="http://localhost:3000">Yes</a>
           </div>
           <div>
            <a href="http://localhost:3000">No</a>
           </div>
        </div>
      </body>
    </html>
  `;
};
```

## Test again
* Add axios back to our client index.js

`index.js`

```js
// more code
import App from './components/App';
import reducers from './reducers';
// Development only axios helpers
import axios from 'axios';
window.axios = axios;
// more code
```

* Use up arrow in Chrome console to bring up our test axios

`const survey = { title: 'my title', subject: 'my subject', recipients: 'biffhappy35@gmail.com', body: 'here is the body of the email' };`

* And

`axios.post('/api/surveys', survey);`

* And now we should get this in our email!

![test email](https://i.imgur.com/UBVyDg0.png)

* Inspect that `Yes` link and look at all the code SendGrid used to rewrite our link with its own clickTracking

![sendgrid rewrites link](https://i.imgur.com/K2FK9rC.png)

* SendGrid uses this to id our users
* We can not id our users via this email
* The link is crazy but when we click on it, SendGrid intercepts, takes the data it needs then continues us on our way to the original route

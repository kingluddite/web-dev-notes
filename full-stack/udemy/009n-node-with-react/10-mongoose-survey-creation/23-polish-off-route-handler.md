# Polish off the route handler
![survey flow diagram](https://i.imgur.com/fR79LKi.png)

* We created a new survey instance inside our route handler (done!)
* Attempt to create and send email (done!)
* Email send successfully?
    - Add in error checking code
* Save survey to Database
    - Subtract one credit from user when survey sent to user
* Survey handler complete

## Let's save our survey to our Database
* **note** `mailer.send()` is an async function
* We marked `send()` as async already

`Mailer.js`

```js
// more code
async send() {
    // more code
}
// // more codes
```

* We also need to mark our route handler as async as well because it also will contain asynchronous code

* Update this code:

`surveyRoutes.js`

```js
// more code
module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    // more code
  }
// more code
    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};
```

* With this code (adding `async`)
* And put `await` before `mailer.send()`

```js
// more code
module.exports = app => { // update the next line by adding `async`
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // more code
  }
// more code
    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send(); // add `await` before this line
  });
};
```

* Woops - We forgot to add `await` to our `send()` method

`Mailer.js`

* Update this code:

```js
// more code
async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = this.sgApi.API(request); // update this line with await
    return response;
  }
// more code
```

* With this code:

```js
// more code
async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request); // update this line with await
    return response;
  }
// more code
```

* Now when we call `mailer.send()`

`surveyRoutes.js`

```
// more code
// Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send(); // we call mailer.send() here
  });
};
```

* `send()` will be executed and the overall request handler is just paused (kind of but not really)
* The request is created (Mailer.js)

![request is created](https://i.imgur.com/DlwbzXu.png)

* The request is sent out (Mailer.js)

![request sent out](https://i.imgur.com/v1S805B.png)

* Then this send function pauses as well (Mailer.js)

```js
// more code
async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = this.sgApi.API(request);
    return response;
  }
// more code
```

* After we get a response back:

![we get a response back](https://i.imgur.com/V7RWiEH.png)

* Control then flows back to the route handler (surveyRoutes.js)
    - And then we progess pass this line:
        + `await mailer.send();`
        + We can stack async-await functions as we did in this case

### Saving the survey
* It is also an async operation so:

`surveyRoutes.js`

```js
// more code
    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
    await survey.save(); // add this line
  });
};
```

### Subtract credits and save user
`surveyRoutes.js`

```js
// more code
    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
    await survey.save();
    req.user.credits -= 1; // add this line
    const user = await req.user.save(); // add this line
  });
};
```

* **remember** Whenever we save the user on our request object we can expect the user `req.user` to be **stale**
    - So from this point on through our request handler we will use the `user` Model that is returned from the `save()` opertation

## Send back the updated `user` Model
`surveyRoutes.js`

```js
// more code
    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user); // add this line
  });
};
```

* **remember** Whenever a user pays us some money we send back the User Model with the updated number of credits
    - We do that so that Header inside our app will automatically update
    - so by sending back the user here as well, we can make use we catch the updated User Model inside of our authReducer and get the Header number of credits to update as well

## We need to add error handling here
* We will use a status code of 422 (unprocessable entity)
    - Translation = "Something is wrong with the data you sent us"

`surveyRoutes.js`

```js
// more code
    try {
      // Great place to send an email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
```

### Test it out
* Check terminal for any errors
* Both servers should be running so we now need to check the client side, no browser refresh need
    - Just type this in the Chrome console
    - `axios.post('/api/surveys', survey);` and press enter
    - You should see in the Network tab you get back a status of 200

![status 200](https://i.imgur.com/EAqX8qC.png)

* Click on that request (survey)
* Click on `Preview` tab
* You should see you get back the logged in user with the correct credits (1 was subtracted)

![1 less credit](https://i.imgur.com/tX5ilvx.png)

* Check your email and it should be in your inbox
* Now check `mLab` to see if our new survey is inside our Database

![survey in Database](https://i.imgur.com/6ViUUL9.png)

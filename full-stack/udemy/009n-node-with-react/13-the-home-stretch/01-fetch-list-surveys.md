# Fetching A List of Surveys
* When user goes to Dashboard Component we show them a list of surveys

![Dashboard mockup with list of surveys](https://i.imgur.com/Orc2usP.png)

* We need to go to backend API to get all surveys that current user has created

![API routes diagram](https://i.imgur.com/FyDLQAX.png)

* Current user is available on the `req.user`
* Every user will have `_user` (**Survey.js**)
    - This will contain the `id` of the user who created the survey
    - So `_user === _id` will get all surveys of the current user

`surveyRoutes.js`

```js
app.get('/api/surveys', (req, res) => {
    Survey.find({ _user: req.user.id });
  });
```

* We are reaching out to our Database
* We need to use async-await

```js
app.get('/api/surveys', async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id });
});
```

* If someone access this route, they need to be logged in
* Let's use our logged in middleware

```js
app.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id });
});
```

* Send a response back to whoever made the request and says "Here is your list of surveys"

```js
app.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id });

  res.send(surveys);
});
```

* We need to tell Mongo we don't also need the big list of recipients for every survey (it could be huge)

### Whitelisting Model Fields
* Tell mongoose not to return documents
* [mongoose homepage link](http://mongoosejs.com/)
    - [Click read the Documentation](http://mongoosejs.com/docs/guide.html)
    - mongoose has two different parts
        + the guide (nice articles)
        + raw documentation (Click on [API docs](http://mongoosejs.com/docs/api.html))

#### [Query#select](http://mongoosejs.com/docs/api.html#query_Query-select)
* Specifies which document fields to include or exclude (also known as the query "projection")
* On the `Query` class there is an instance called `select` (Query#select)
* This returns a query object
    - `Survey.find({ _user: req.user.id });`
        + Now we can chain on as many aspects of the query that we want

```js
const surveys = await Survey.find({ _user: req.user.id })
  .select();
```

* Exclude fields with:

```js
// exclude c and d, include other fields
query.select('-c -d');
```

* They show you the string method on how to do it or the object method
* This is confusing
* They should just have used one way to make the documentation as clear as possible
    - We will use the object syntax as it is a little more obvious as to what is going on
        + 1 means include this property
        + 0 means exclue this property
        + 1 and 0 are shorthand for `true` and `false`
        + We will use true and false instead of 1 and 0 as it is way more clear

`surveyRoutes.js`

```js
// more code
app.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false
  });

  res.send(surveys);
});
// more code
```

## Testing Endpoints
* Chrome console
* Network tab
* Toggle open closed with `esc` key
* `> axios`
    - We make sure we have access to `axios`
* `> axios.get('/api/surveys')`
* Hit `esc` key and you will see `surveys` request
    - Status is 200 (ok!)
* Click `surveys` request
* Click Preview tab
    - You will see a list of all the surveys the logged in user sent out

## Next - Wire up the front end

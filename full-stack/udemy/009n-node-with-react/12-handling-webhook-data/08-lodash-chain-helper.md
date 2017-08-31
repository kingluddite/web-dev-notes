# Lodash Chain helper
* Chain is a very advanced lodash topic
* [js fun sandbox](https://stephengrider.github.io/JSPlaygrounds/)

```
const arr = [100000,2,3];

_.chain(arr)
  .map(num => num * 2)
  .map(num => num / 10)
  .map(num => num + 'hi there')
  .sort()
  .value()
```

* `.value()` returns the newly processed array

`surveyRoutes.js`

```js
// more code
app.post('/api/surveys/webhooks', (req, res) => {
  // just extract the surveyId and choice from path
  const p = new Path('/api/surveys/:surveyId/:choice');

  const events = _.chain(req.body)
    // map over list of events
    .map(({ url, email }) => {
      // extract just the route of the URL
      // match will be an object or null if there is no match
      const match = p.test(new URL(url).pathname);
      // if we find a match
      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    })
    // remove all elements in the array that are undefined
    .compact()
    // remove any duplicates
    .uniqBy('email', 'surveyId')
    .value();

  console.log(events);

  res.send({});
});
// more code
};
```





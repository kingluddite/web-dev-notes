# Working With Time
## Let's experiment with the `Date` object

`server/main.js`

```
Meteor.startup(() => {
  let now = new Date();
  console.log(now);

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});
```

### Output
![Date object output](https://i.imgur.com/5hya3Ve.png)

#### Problems
* Not user friendly
* Not customizable

We used `new Date().getTime()` to get the timestamp but if we wanted something like printing `Jan 6th, 2017` it is very cumbersome. [Here is a tutorial](https://www.sitepoint.com/beginners-guide-to-javascript-date-and-time/) if you want to jump down that rabbit hole

## Moment
Moment is the library you should use when working with time

* [Moment on npm](https://www.npmjs.com/package/moment)
* [Moment Documentation](https://momentjs.com/docs/)
    - Super complex documentation

Check out the downloads of Moment [8,769,688 downloads in the last month]

## Install Moment
`$ npm i -S moment`

## Import Moment
```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import  moment from 'moment'; // add this line
// more code
```

## Using Moment
```
Meteor.startup(() => {
  let now = new Date();
  console.log(now);

  // Jan 6th, 2017
  let momentNow = moment();
  console.log(momentNow.format()); // 2017-04-22T20:43:24-07:00
// more code
```

* This date is also not user friendly but it is easily customizable
* Check out the `format()` documentation [here](https://momentjs.com/docs/#/displaying/format/)
* `console.log(momentNow.format('MMM Do, YYYY'));`
    - will render **Apr 22nd, 2017**

### Exercise
Use moment to output `1:15pm`

<details>
  <summary>Solution</summary>
```
let momentNow = moment();
console.log(momentNow.format('h:mma'));
```
</details>

## Initialize Moment with data from our Database
How do you tell Moment to use a specific Moment?

You pass Moment a timestamp

```
let momentNow = moment(0);
console.log(momentNow.format()); // 1969-12-31T16:00:00-08:00
```

**note** The Epoch is `January 1st, 1970`

### What is the Epoch
"Linux is following the tradition set by Unix of counting time in seconds since its official "birthday," -- called "epoch" in computing terms -- which is Jan. 1, 1970." - [source](https://unix.stackexchange.com/questions/26205/why-does-unix-time-start-at-1970-01-01)

If the Epoch is Jan. 1st, 1970, why am I get 12-31-1969? - Because the value that you print is local to your timezone. Our timestamps are time zone independent but when you display them you want to display them to the user in their specific time zone

### We want to know the time since our last link was clicked
#### Time from now
[Time from now documentation](https://momentjs.com/docs/#/displaying/fromnow/)

```
let momentNow = moment(0);
console.log(momentNow.fromNow()); // 47 years ago
```

### Rendering time to our Component
`LinksListItem`

```
// more code
renderStats() {
    return <p>{this.props.visitedCount} - {this.props.lastVisitedAt}</p>
  }

  render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <p>{this.props.visible.toString()}</p>
         {this.renderStats()}
// more code
```

## Moment inside `renderStats()`
```
// more code
renderStats() {
    const { lastVisitedAt, visitedCount } = this.props;
    const visitSubjectVerbAgreement = visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if (typeof lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(lastVisitedAt).fromNow()})`;
    }
    return <p>{visitedCount} {visitSubjectVerbAgreement} - {visitedMessage}</p>
  }
// more code
```

## Test
You should see similar results to:

1[moment looking good](https://i.imgur.com/ZWnwaGz.png)

## Clean up `server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import { Links } from './../imports/api/links';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});
```

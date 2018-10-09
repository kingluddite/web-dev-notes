# Make our date pretty
* But let's format our dates and time with vanilla JavaScript

`UserInfo.js`

```
// MORE CODE

https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-noconst 

formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>

// MORE CODE
```

* That will make the date look like: `Join Date: 9/4/2018 at 12:25:23 PM`

## Using Moment
* Pulling the date you will get a string in milliseconds
* You need to convert that to a date and format it using Moment.js

`UserInfo.js`

```
 // MORE CODE

import moment from 'moment';

 // MORE CODE

  render() {
    const {
      username,
      email,
      joinDate,
      favorites,
    } = this.props.session.getCurrentUser;

    return (
      <div>

      // MORE CODE

        <p>Join Date: {moment(joinDate, 'x').format('MMMM MM, YYYY')}</p>
        {/* <p>Join Date: {this.formatDate(joinDate)}</p> */}

        // MORE CODE

        </ul>
      </div>
    );
  }
}

export default UserInfo;
```

* Moment JS output the date like this:

```
Join Date: September 09, 2018
```

## Next - Add User Colognes

## Additional Resources
* Moment JS or `date fns` are other ways of formatting dates/times
* * [Reference](https://stackoverflow.com/questions/35184003/moment-js-convert-milliseconds-into-date-and-time)
* [Article on both](https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-nodejs-applications-116d1a709c43)

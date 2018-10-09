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

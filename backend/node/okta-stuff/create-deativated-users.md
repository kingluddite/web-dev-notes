# Create deactivated users in Okta
ICS had a client that have 9000 users that they needed imported into Okta from a `.csv` file but they needed each user to have a end user status of "Deactivated". It seems simple enough task but unless you understand how Okta works, it won't be that simple.

## How do I create a user in Okta?
* You can create users in Okta manually inside the Okta dashboard. Doing that 9000 times obviously would not be the best solution. You could have all the users in a .csv file and import them all into Okta and create 9000 uses rather quickly but all those users would first be created with a user status of 'STAGED'.

* **Note** Only users with a user status of 

## Okta End User Status
End user account states are a very important (and often misunderstood) topic in Okta. [This is a great reference](https://help.okta.com/en/prod/Content/Topics/Directory/end-user-states.htm) to all of the different end user statuses.

## Okta End User account states
* Staged
* Pending user action
* Active
* Password Reset
* Locked out
* Suspended
* Deactivated

To best understand user status in the world of Okta this diagram does a great job of explaining it

![Okta User Status Diagram](https://i.imgur.com/D0d0Ehv.png)

([diagram reference](https://developer.okta.com/docs/reference/api/users/#user-status))



* Log into your Okta tenant
* Create an API key

## Requirements for this project
* You must have `Node.js` installed for this to work

## Here is the csv file
`user.csv`


* [diagram reference](https://developer.okta.com/docs/reference/api/users/#user-status)

* To create users in Okta you'll need:
    - firstName
    - lastName
    - email
    - login

```
firstName,lastName,email,login
mr,pink,mrpink@example.com,mrpink@example.com
mr,brown,mrbrown@example.com,mrbrown@example.com
```

### Okta node sdk
* Create a `.env` to hold info you want to hide from your GitHub repo

`.env`
```
OKTA_URL=https://dev-123456.oktapreview.com/
OKTA_TOKEN=00S4YSjNLVlv2Q9h-4gFvGUrGbZbA42kDm3ErYFUJe
```

## Install dependencies
`$ npm install @okta/okta-skd-nodejs csv-parser`

### Include your dependencies in your app
`create-deactivated-users.js`

```
require('dotenv').config();
const okta = require('@okta/okta-sdk-nodejs');
const csv = require('csv-parser');

// MORE CODE
```

### Include modules built-into node 
* (you won't need to install these but you do need to include them)

`create-deactivated-users.js`

```
// MORE CODE

const fs = require('fs');
const os = require('os');
const path = require('path');

// MORE CODE
```

## Create your client
* Will use your Okta API token you just created and put in your environment variables config file

```
// MORE CODE

const client = new okta.Client({
  orgUrl: process.env.OKTA_URL,
  token: process.env.OKTA_TOKEN,
});

// MORE CODE
```

## Do the work
* Read the csv file
* Grab each "row" of data (a user from the csv)
* Create a new user from that row and use the okta node sdk to create a user (the Okta node sdk uses the Okta API in the background)
* After the user is created deactivate them

```
// MORE CODE

fs
  .createReadStream('output-without-id.csv')
  .pipe(csv())
  .on('data', row => {
    const newUser = {
      profile: row,
    };
    client
      .createUser(newUser)
      .then(user => {
        console.log('Created user', user);
        user.deactivate().then(() => console.log('user deactivated'));
      })
      .catch(e => {
        console.log(e);
      });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// MORE CODE
```

### And here is the file in its entirety
`create-deactivated-users.js`

```
require('dotenv').config();
const okta = require('@okta/okta-sdk-nodejs');
const csv = require('csv-parser');

const fs = require('fs');
const os = require('os');
const path = require('path');

const client = new okta.Client({
  orgUrl: process.env.OKTA_URL,
  token: process.env.OKTA_TOKEN,
});

fs
  .createReadStream('output-without-id.csv')
  .pipe(csv())
  .on('data', row => {
    const newUser = {
      profile: row,
    };
    client
      .createUser(newUser)
      .then(user => {
        console.log('Created user', user);
        user.deactivate().then(() => console.log('user deactivated'));
      })
      .catch(e => {
        console.log(e);
      });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

```

## Test it out
* Navigate to the directory on your machine that holds your project
* Open Okta and see if you can find users `mrpink@example.com` and `mrbrown@example.com` (names taken form [The Usual Suspects](https://en.wikipedia.org/wiki/Reservoir_Dogs))
    - You will see they are not there

### Run app
`$ npm create-deactivated-users.js`

* Check for same users you didn't see before and now not only will they be inside Okta but their status will also be `Deactivated`

# Resources
* [Okta API User Collection](https://developer.okta.com/docs/reference/api/users/#create-user-without-credentials)
* [Okta SDK Node documentation](https://github.com/okta/okta-sdk-nodejs)
* [Reading and Writing from CSV](https://stackabuse.com/reading-and-writing-csv-files-with-node-js/)
* [Great tool for working with Users in Okta](https://ironcovesolutions.com/blog/how-to-be-an-okta-rockstar)

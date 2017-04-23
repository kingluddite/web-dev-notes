# Method Validation
* We need to validate the URL
* We did this before
    - We'll create a new schema
    - We'll set up our validate() call passing in any data that comes from the client
        + If all is good, we do nothing
        + If bad, we throw a Meteor Error
* [node-simple-schema documenation](https://github.com/aldeed/node-simple-schema)

`users.js`

```
// more code
  try {
    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({
      email
    });
  } catch (e) {
    throw new Meteor.Error(400, e.message);
  }
// more code
```

<details>
  <summary>Solution</summary>
```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    // check if the user is not logged in
    if (!this.userId) {
      // throw Meteor error
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        url: {
          type: String,
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({
        url
      });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    Links.insert({
      url,
      userId: this.userId
    });
  }
});
```

![error bad url](https://i.imgur.com/AbrJICk.png)

The errorClass **reason** is `"Url must be a valid URL"`

This is not a user friendly error notification. Sounds strange

We could use a custom error message like:

```
onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      // console.log('Login callback', err);
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }
```

But we can change the reason of the error object because it is taking the property name **url** and it's trying to create a human readable version by Add a capital letter and tags on a generic message `Url must be a valid URL`

## The label property
* We can change `Url` to anything we like via the **label** property
* `label` can be added on to anything inside of Simpl Schema

```
try {
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({
        url
      });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }
```

![label doing its work](https://i.imgur.com/m1k445p.png)
</details>

## Fix issue with SimpleSchema
Currently, we have to wrap SimpleSchema in a `try catch` block to rethrow a generic error as a Meteor error. We are doing it in the links.js file. We're doing it in the users.js file and it is something we'll have to do in our other methods

### Tell SimpleSchema to throw a Meteor error by default
We will create a new folder `imports/startup`

[Documentation](https://github.com/aldeed/node-simple-schema#customize-the-error-that-is-thrown)

* Has some startup scripts
* Will enable us to configure SimpleSchema so that when it does get used on the `client` and the `server` it has some modified behavior (we will modify the error it throws)
* Adding this code will help remove all `try catch` blocks polluting our beautiful code

`imports/startup/simple-schema-configuration.js`

```
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
```

**tip** Good pattern to use in all your Applications

* All you client Applications can use simpl-schema
* All of them can have this configuration file

```
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(() {
  
});
```

* We pass `defineValidationErrorTransform()` our function and that function gets executed every time SimpleSchema creates an error and it allows us to change that error

```
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform((e) => {
  return new Meteor.Error(400, e.message);
});
```

* We take the default error and replace it with our Meteor error
* We do not use throw as it will be done internally by SimpleSchema
* We use `400` as our static code because all of this code will be related to data that is not of the format we expect
* We pull the reason off of the error (we pass in `e.message` as that reason)
* Before we remove our try catch blocks, we will need to import `simple-schema-configuration.js` into `client/main.js` and `server/main.js`
  - Why on both the client and the server?
    + Because our Meteor Methods run on both so we need this file on both

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes';
// add this line
import './../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

`server/main.js`

```
import { Meteor } from 'meteor/meteor';

import './../imports/api/users';
import './../imports/api/links';
// add this line
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

});

```

`links.js`

We can now remove the `try/catch` blocks

Change this:

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    // check if the user is not logged in
    if (!this.userId) {
      // throw Meteor error
      throw new Meteor.Error('not-authorized');
    }
    
    // we will be removing this try/catch block
    try {
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({
        url
      });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    Links.insert({
      url,
      userId: this.userId
    });
  }
});
```

To this:

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    // check if the user is not logged in
    if (!this.userId) {
      // throw Meteor error
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({
      url
    });

    Links.insert({
      url,
      userId: this.userId
    });
  }
});
```

We can also remove the `try/catch` block in `users.js`

```
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({
    email
  });

  return true;
});
```

### Now test
1. Log in
2. Add a bogus URL

You should see this in your console (same as before but now we're not using try/catch to generate Meteor errors)

![same error with config](https://i.imgur.com/JcyJynb.png)

And if you try to sign up a new user and enter a bogus email with a password of more than 8 characters we still get the same error notification on the screen if though we changed how this message shows up

## Review
* We validated proper URLs are entered into our Database
* All data coming in is going to be appropriate

**note** Let's remove all our links from MongoDB

`$ meteor mongo`

`> db.links.remove({})`



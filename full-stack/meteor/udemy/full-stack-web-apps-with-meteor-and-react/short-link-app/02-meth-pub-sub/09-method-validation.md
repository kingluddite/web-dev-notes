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




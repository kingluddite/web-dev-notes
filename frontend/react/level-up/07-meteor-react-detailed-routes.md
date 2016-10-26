# React Meteor Parameter Based Routes

// find one resolution
// we remove fetch() because that returns a cursor
// findOne() finds one and returns an object

```js
import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ResolutionDetail extends TrackerReact(Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        resolutions: Meteor.subscribe('userResolutions')
      }
    }
  }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  resolution() {
    // find all resolutions
    return Resolutions.findOne(this.props.id);
  }
  render() {
    console.log(this.resolution());
    return (
      <div>
        <h1>Res</h1>
      </div>
    )
  }
}
```

we can't get to the page right now so we need to grab a resolution id from meteor toys and paste it directly into our URL

`http://localhost:3000/resolutions/bR8AJvqpwRrQKDvx9`

and you will see Res on page.


## Did you know
old way in JS
`<a href={"/resolutions/" + this.props.resolution._id}>
          {this.props.resolution.text}
        </a>`

new way in ES6
`<a href={``/resolutions/${this.props.resolution._id}``}>
          {this.props.resolution.text}
        </a>`

this is `String Interpolation` syntax in ES6 (in the markdown example above we are escaping the backticks but there should just be one backtick when there are two and you would see that when you preview the markdown in the browser)

`ResolutionSingle.js`

```js
import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

  toggleChecked() {
    // console.log(this);
    Meteor.call('toggleResolution', this.props.resolution);
  }

  deleteResolution () {
    Meteor.call('deleteResolution', this.props.resolution);
  }
  render() {
    const resolutionClass = this.props.resolution.complete ? 'checked' : '';
    const status = this.props.resolution.complete ? <span className="completed">Completed</span> : '';

    return (
      <li className={resolutionClass}>
        <input type="checkbox"
          readOnly={true}
          checked={status}
          onClick={this.toggleChecked.bind(this)} />
        <a href={`/resolutions/${this.props.resolution._id}`}>
          {this.props.resolution.text}
        </a>
        {status}
        <button className="btn-cancel" onClick={this.deleteResolution.bind(this)}>&times;</button>
      </li>
    )
  }
}
```
Now our code works and you see the path when you hover over each of our resolutions with something like `resolutions/IDOFRESOLUTION`

But our links need to be styled better

## Public and Private Settings
[video #17](https://www.youtube.com/watch?v=WoMCc0SDoXg&list=PL6klK99EwGXj6IED7wO8V9nJJIj4_vpDh&index=17)

Settings file where you can set things like you API keys
info you need to access via on the client side or on the server side

## settings.json
[meteor chef tutorial](http://info.meteor.com/blog/the-meteor-chef-making-use-of-settings-json)

add to root of your application

`settings.json`

```json
{
  "public": {
    "test": "Hello"
  },
  "private": {
    "ptest": "Hello Private"
  }
}
```

**important safety tip**

do not commit this file to your git repo if you have API keys or sensitive information inside it

view in browser
inspect with:

`> Meteor.settings.public.test`

you will get undefined

stop and restart meteor with:
`$ meteor --settings settings.json`

some people use a `dev-settings.json` file
some people have multiple files for production and development

say you have a test API key you want to run on an ecommerce site
a stripe ecommerce site
you want you test API to do test purchases but only on your dev server
with 2 different settings files you could have your development settings loaded one way and when you move to production you could load up your production settings file

meteor update to Meteor 1.4.2

Now when you type in the console you get 'Hello'

![output of console](https://i.imgur.com/2BReaF5.png)

But if we try to access the private key in settings.js, we can'- [ ]
![private rejected](https://i.imgur.com/ru08IcV.png)

private variables are not available on the client

now add this inside `server/publish.js`

```js
Resolutions = new Mongo.Collection( 'resolutions' );

console.log(Meteor.settings.private.ptest);

Meteor.publish( 'allResolutions', function ( ) {
	// return Resolutions.find({complete: false});
	return Resolutions.find( );
});

Meteor.publish( 'userResolutions', function ( ) {
	return Resolutions.find({ user: this.userId });
});
```

and then you will see this in your terminal (shows your server)

![private feedback from server](https://i.imgur.com/uDC9iau.png)

## Check Your Variables for security
[video #18](https://www.youtube.com/watch?v=11sXvTsIv8Y&index=18&list=PL6klK99EwGXj6IED7wO8V9nJJIj4_vpDh)

package is called `check`

add it to `.packages`

What is check?
allows us to check our code before it gets allowed to run on the server

we always want to know what is coming into our meteor methods
and what comes into our methods is exactly what we would expect

check(what variable is, what it should be)
example: `check(resolution, String)`

`server/methods.js`

```js
Meteor.methods({
  addResolution(resolution) {
    check(resolution, String);
    if(!Meteor.userId()) {
      throw new Meteor.Error('not authorized');
    }

    Resolutions.insert({
      text: resolution,
      complete: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },
  toggleResolution(resolution) {
    if(Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not authorized');
    }
    Resolutions.update(resolution._id, {
      $set: { complete: !resolution.complete}
    });
  },
  deleteResolution(resolution) {
    if(Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not authorized');
    }
    Resolutions.remove(resolution._id);
  }
});
```

Now, with the `check` added, if we try to access a method from the client with: (using chrome dev inspector tool)

![wrong type error](https://i.imgur.com/2w6UuDK.png)

we see it won't let us because our check said it wants a string and we passed it a number
But if you pass it a string it will insert the resolution

so now by running check on all your methods you can prevent anyone from inserting anything into those methods that they shouldn't

final code for `server/methods.js`

```js
Meteor.methods({
  addResolution(resolution) {
    check(resolution, String);
    if(!Meteor.userId()) {
      throw new Meteor.Error('not authorized');
    }

    Resolutions.insert({
      text: resolution,
      complete: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },
  toggleResolution(resolution) {
    check(resolution, Object);
    if(Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not authorized');
    }
    Resolutions.update(resolution._id, {
      $set: { complete: !resolution.complete}
    });
  },
  deleteResolution(resolution) {
    check(resolution, Object);
    if(Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not authorized');
    }
    Resolutions.remove(resolution._id);
  }
});
```
### Alternative solution to checking data types passed to methods
a package called `collections2`

that involves the `simple schema package`
allows you to define schemas
and in those schemas you can say things like:
* text is supposed to be a string
* this is supposed to be a boolean
* and then that package will check your variables for you and make sure that when they are submitted they are the correct type

use one or the other solution 
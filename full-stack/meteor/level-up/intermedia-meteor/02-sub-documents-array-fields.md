
# Sub document & array fields
[video #9](https://www.youtube.com/watch?v=ooSJ13vHUrw&index=10&list=PLLnpHn493BHFYZUSK62aVycgcAouqBt7V)

rename `collections/recipes.js` to:

`collections/Recipes.js`

add `meteortoys:allthings` to packages

add `$meteor npm install --save bcrypt`

## add sub documents
`collections/Recipes.js`
```js
Recipes = new Mongo.Collection( 'recipes' );

Recipes.allow({
  insert: function(userId, doc) {
    return !!Meteor.userId;
  }
});

Ingredient = new SimpleSchema({
  name: {
    type: String
  },
  amount: {
    type: String
  }
});

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  desc: {
    type: String,
    label: 'Description',
  },
  ingredients: {
    type: [Ingredient]
  },
  author: {
    type: String,
    label: 'Author',
    autoValue: function ( ) {
      return this.userId;
    },
    autoform: {
      type: 'hidden'
    }
  },
  createdAt: {
    type: Date,
    label: 'Created At',
    autoValue: function ( ) {
      return new Date( );
    },
    autoform: {
      type: 'hidden'
    }
  },
});

Recipes.attachSchema( RecipeSchema );
```

## add boolean type

```js
Recipes = new Mongo.Collection( 'recipes' );

Recipes.allow({
  insert: function(userId, doc) {
    return !!Meteor.userId;
  }
});

Ingredient = new SimpleSchema({
  name: {
    type: String
  },
  amount: {
    type: String
  }
});

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  desc: {
    type: String,
    label: 'Description',
  },
  ingredients: {
    type: [Ingredient]
  },
  inMenu: {
    type: Boolean,
    defaultValue: false,
    autoform: {
      type: 'hidden'
    }
  },
  author: {
    type: String,
    label: 'Author',
    autoValue: function ( ) {
      return this.userId;
    },
    autoform: {
      type: 'hidden'
    }
  },
  createdAt: {
    type: Date,
    label: 'Created At',
    autoValue: function ( ) {
      return new Date( );
    },
    autoform: {
      type: 'hidden'
    }
  },
});

Recipes.attachSchema( RecipeSchema );
```

we added a in menu true/false value, it is hidden and doesn't have a default value

## private and public setting
storing api keys
not committing to sit
add google analytics to your project

`settings.json`

```js
{
  "hello": "i'm in private"
}
```

don't commit to repo
private keys, values you don't want other people to have
or to be available to front end of app

how do we tell meteor to use that config file

stop our meteor app

`$ meteor --settings settings.json`

that will start up our meteor app while using that settings file

`server/init.js`

```js
Meteor.startup( function ( ) {
  console.log(Meteor.settings.hello);
});
```

![meteor server talking](https://i.imgur.com/PX4Zr93.png)

now you will see `i'm in private`

but can we access it on our client?

`client/recipes/recipes.js`

```js
console.log(Meteor.settings.hello);
```

open the chrome console and you will see `undefined`

sometimes you need public and private settings

like google analytics or packages

### google analytics
delete client and server tests for settings.json

`settings.json`

```json
{
  "public": {
    "ga": {
      "account": "UA-8913203-1"
    }
  },
  "private": {
    "stripe": {
      "apiPrivate": "223322222"
    }
  }
}
```

`client/recipes.js`

```js
console.log(Meteor.settings.public.ga.account);
```

add the google analytics package

`datariot:ganalytics`

update `lib/routes.js`

```js
FlowRouter.route('/', {
  name: 'home',
  action( ) {
    GAnalytics.pageview();
    BlazeLayout.render( 'HomeLayout' );
  }
});

FlowRouter.route('/recipe-book', {
  name: 'recipe-book',
  action( ) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Recipes' });
  }
});
```

now when you go to any page, it will register it as a pageview in google analytics



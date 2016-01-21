# User Accounts

To fix error:

Add user accounts password

```
$ meteor add accounts-password
```

Add AccountsTemplates code

```js
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configure({
    // Behaviour
    confirmPassword: false,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Passwod"
      },
    },
});
```


##Add Signin Button

header.html

```html
<ul class="nav navbar-nav navbar-right">
        <li><a href="#"><i class="fa fa-fw fa-pencil-square-o"></i> Compose a Tweet</a></li>
        <li>{{> atNavButton}}</li>
      </ul>
      </div>
```

### Customize the Sign In

```js
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
  },
  {
    _id: 'name',
    type: 'text',
    displayName: "Name",
    required: true
  }
]);
```

Fix for error on routing
* Add this package

```
$ meteor add useraccounts:iron-routing
```

## Update Git

collections/tweets.js

```
Tweets = new Mongo.Collection('tweets');
```

### Security improvement
* remove autopublish insecure

```
$ meteor remove autopublish insecure
```

Add moment for better formatting of time

```
meteor add momentjs:moment
```

Add collection hooks

```
meteor add matb33:collection-hooks
```

Meteor add collections-helpers

```
meteor add dburles:collection-helpers
```

Now that we removed insecure we need to explicity tell meteor that a client can now insert something into a collection

Chrome Dev Toolbar
* if you type `Tweets` in console you will get a Collection back wrapped by a collectionHooks
* `Tweets.find()`  returns a Mongo cursor (actually a mini mongo cursor)

![console Tweets](https://i.imgur.com/YFWqqUh.png)

Tweets.find().fetch returns an empty array [] because we have no data.

## Insert a Tweet
* console

```
Tweets.insert({text: "My first tweet."});
```

But if you try to get that data you will not see it because we do not have a pub/sub set up (publish/subscription)

![no data even though we inserted it](https://i.imgur.com/aNHjCSA.png)

Tweets.find().fetch() --- nothing back

## Mongol
See your data live

```
$ meteor add msavin:mongol
```

Hot key: `ctrl` + `m`

Check to see if we are getting data from our subscription

![subscription in console](https://i.imgur.com/Jp2Fbfo.png)

Checking web sockets in console
Chrome console > Network > WS > click on web socket > switch from Headers (default) to Frames
* you will see all the communication happening back and forth

* `Green` color is us sending to the server
* `White` color is server coming back with information
![web sockets](https://i.imgur.com/8q9dNAH.png)

Show pub sub
## Publication
server/publication.js

```js
Meteor.publish('myTweets', function() {
  return Tweets.find();
});
```

## Subscription

lib/router.js

```js
Router.map(function() {
  this.route('tweetStream', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('myTweets');
    }
  });
  this.route('notifications', {path: '/notifications'});
  this.route('profile', {path: '/profile'});
});
```


client/tweet-stream.js

```html
<template name="tweetStream">

  <div id="stream" class="container">
    <div class="row">
      <div class="col-md-4 col-lg-3">
        <div id="profile-panel" class="panel panel-default">
          <div class="media panel-body">

            <!-- profile photo -->
            <a class="pull-left" href="#">
              <img class="media-object" src="https://pbs.twimg.com/profile_images/484387570214645761/BFPL5V4G_bigger.jpeg" alt="...">
            </a>

            <!-- profile information -->
            <div class="media-body">
              <span class="username"><strong>amanda saffer</strong></span> <br>
              <span class="handle">@12pixels</span>
            </div>

            <!-- profile stats -->
            <table id="profile-stats" class="table">
              <tr class="head">
                <td><strong>Tweets</strong></td>
                <td><strong>Following</strong></td>
                <td><strong>Followers</strong></td>
              </tr>
              <tr class="numbers">
                <td>500</td>
                <td>240</td>
                <td>1,600</td>
              </tr>
            </table>
          </div>

          <!-- compose a tweet -->
          <div class="panel-footer">
            <input type="text" class="form-control" placeholder="Compose new Tweet...">
          </div>
        </div>

        <!-- trending topics -->
        <div id="trending" class="panel panel-default">
          <div class="panel-body">
            <h4>Trending Topics</h4>
          </div>
          <ul class="list-group">
            <a href="#" class="list-group-item">#food</a>
            <a href="#" class="list-group-item">#meteorclub</a>
            <a href="#" class="list-group-item">#loremipsumdolor</a>
            <a href="#" class="list-group-item">#dracodormiens</a>
            <a href="#" class="list-group-item">#atmospherejs</a>
          </ul>
        </div>
      </div>

      <div class="col-md-8 col-lg-6">
        <ul id="tweet-stream" class="list-group">
          <li class="list-group-item">
            <h4 class="list-group-item-heading">Tweets</h4>
          </li>


          <!-- unit (delete extras for loop) -->
          <li class="list-group-item tweet">

            <!-- display name, @username, and time ago -->
            <h5 class="tweet-author">Ned Stark <span class="author-info"><a href="#">@nedstark &middot; 18m</a></span></h5>

            <!-- the post content -->
            <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione facere expedita mollitia draco dormiens. #yum #food</p>

            <span class="expand"><a href="#">Expand</a></span>

            <!-- post interactions -->
            <div class="tweet-options pull-right">
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-reply"></i> Reply</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-retweet"></i> Retweet</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-star"></i> Favorite</button>
            </div>
          </li>

          <!-- unit -->
          <li class="list-group-item tweet">
            <h5 class="tweet-author">Barney Rubble <span class="author-info"><a href="#">@barneyrubble &middot; 16m</a></span></h5>
            <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates minus rem vero quidem eligendi consectetur harum quod ratione debitis. </p>

            <span class="expand"><a href="#">Expand</a></span>

            <div class="tweet-options pull-right">
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-reply"></i> Reply</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-retweet"></i> Retweet</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-star"></i> Favorite</button>
            </div>
          </li>

          <!-- unit -->
          <li class="list-group-item tweet">
            <h5 class="tweet-author">Dana Scully <span class="author-info"><a href="#">@scully &middot; 25m</a></span></h5>
            <p class="list-group-item-text">Dolor sit amet, consectetur adipisicing elit. Voluptates minus rem vero quidem eligendi consectetur harum quod rati.</p>

            <span class="expand"><a href="#">Expand</a></span>

            <div class="tweet-options pull-right">
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-reply"></i> Reply</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-retweet"></i> Retweet</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-star"></i> Favorite</button>
            </div>
          </li>

          <!-- unit -->
          <li class="list-group-item tweet">
            <h5 class="tweet-author">Buffy Summers <span class="author-info"><a href="#">@nedstark &middot; 26m</a></span></h5>
            <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione facere expedita mollitia draco dormiens. #yum #food</p>

            <span class="expand"><a href="#">Expand</a></span>

            <div class="tweet-options pull-right">
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-reply"></i> Reply</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-retweet"></i> Retweet</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-star"></i> Favorite</button>
            </div>
          </li>

          <!-- load more tweets -->
          <li class="list-group-item load-more">
            <a href="#">Load more tweets</a>
          </li>
        </ul>
      </div>



      <!-- who to follow -->
      <!-- responsive works if tweet stream is long enough, but otherwise it hangs.
      can fix with javascript but i dunno if you wanna go through that much trouble. -->

      <div id="who-to-follow" class="col-md-8 col-md-offset-4 col-lg-3 col-lg-offset-0">
        <div class="panel panel-default">

          <div class="panel-body">
            <h4>Who to follow</h4>
          </div>

          <ul class="list-group">
            <a href="#" class="list-group-item"><strong>Josh Owens</strong> @joshowens</a>
            <a href="#" class="list-group-item"><strong>Sacha Greif</strong> @sachagreif</a>
            <a href="#" class="list-group-item"><strong>Tom Coleman</strong> @tmeasday</a>
          </ul>

          <div class="panel-footer short">
            <p>Find <a href="#">people you know</a>?</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

```

client/tweet-stream.js

```js
Template.tweetStream.helpers({
  tweets: function () {
    return Tweets.find();
  }
});
```

Add a Handlebars `each` statement to our template
* Handlebars [link](http://handlebarsjs.com/)

client/tweet-stream.html

```html
<template name="tweetStream">

  <div id="stream" class="container">
    <div class="row">
      <div class="col-md-4 col-lg-3">
        <div id="profile-panel" class="panel panel-default">
          <div class="media panel-body">

            <!-- profile photo -->
            <a class="pull-left" href="#">
              <img class="media-object" src="https://pbs.twimg.com/profile_images/484387570214645761/BFPL5V4G_bigger.jpeg" alt="...">
            </a>

            <!-- profile information -->
            <div class="media-body">
              <span class="username"><strong>amanda saffer</strong></span> <br>
              <span class="handle">@12pixels</span>
            </div>

            <!-- profile stats -->
            <table id="profile-stats" class="table">
              <tr class="head">
                <td><strong>Tweets</strong></td>
                <td><strong>Following</strong></td>
                <td><strong>Followers</strong></td>
              </tr>
              <tr class="numbers">
                <td>500</td>
                <td>240</td>
                <td>1,600</td>
              </tr>
            </table>
          </div>

          <!-- compose a tweet -->
          <div class="panel-footer">
            <input type="text" class="form-control" placeholder="Compose new Tweet...">
          </div>
        </div>

        <!-- trending topics -->
        <div id="trending" class="panel panel-default">
          <div class="panel-body">
            <h4>Trending Topics</h4>
          </div>
          <ul class="list-group">
            <a href="#" class="list-group-item">#food</a>
            <a href="#" class="list-group-item">#meteorclub</a>
            <a href="#" class="list-group-item">#loremipsumdolor</a>
            <a href="#" class="list-group-item">#dracodormiens</a>
            <a href="#" class="list-group-item">#atmospherejs</a>
          </ul>
        </div>
      </div>

      <div class="col-md-8 col-lg-6">
        <ul id="tweet-stream" class="list-group">
          <li class="list-group-item">
            <h4 class="list-group-item-heading">Tweets</h4>
          </li>


          {{#each tweets}}
          <!-- unit (delete extras for loop) -->
          <li class="list-group-item tweet">

            <!-- display name, @username, and time ago -->
            <h5 class="tweet-author">Ned Stark <span class="author-info"><a href="#">@nedstark &middot; 18m</a></span></h5>

            <!-- the post content -->
            <p class="list-group-item-text">{{text}}</p>

            <span class="expand"><a href="#">Expand</a></span>

            <!-- post interactions -->
            <div class="tweet-options pull-right">
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-reply"></i> Reply</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-retweet"></i> Retweet</button>
              <button type="button" class="btn btn-default btn-xs"><i class="fa fa-star"></i> Favorite</button>
            </div>
          </li>
          {{/each}}

          <!-- load more tweets -->
          <li class="list-group-item load-more">
            <a href="#">Load more tweets</a>
          </li>
        </ul>
      </div>

      <!-- who to follow -->
      <!-- responsive works if tweet stream is long enough, but otherwise it hangs.
      can fix with javascript but i dunno if you wanna go through that much trouble. -->

      <div id="who-to-follow" class="col-md-8 col-md-offset-4 col-lg-3 col-lg-offset-0">
        <div class="panel panel-default">

          <div class="panel-body">
            <h4>Who to follow</h4>
          </div>

          <ul class="list-group">
            <a href="#" class="list-group-item"><strong>Josh Owens</strong> @joshowens</a>
            <a href="#" class="list-group-item"><strong>Sacha Greif</strong> @sachagreif</a>
            <a href="#" class="list-group-item"><strong>Tom Coleman</strong> @tmeasday</a>
          </ul>

          <div class="panel-footer short">
            <p>Find <a href="#">people you know</a>?</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

```

View the page and you will now see your tweet stored in the tweets collection

## Collection hooks
before we insert into a collection, let's grab some data and use it to put into the collection document

collections/tweets.js
* just above allow statement

```
Tweets.before.insert(function(userId, doc) {
  doc.tweetedAt = new Date();
  doc.userId = userId;
});
```

So now if you add this in the Chrome console:

```
Tweets.insert({text: "My second tweet", userId: "a1234"});
```

View Mongol and you will see timestamp prepended into collection doc and even though we inserted a fake userId, the correct userId was inserted into the collection document.

## Delete document using Mongol
* Simple. Open Mongol, select tweet and click remove. Chrome will notify you of the deletion.

## Robomongo
Great way to see collection info
If you look, you will see that the correct data type of `date` was put into our collection document.

![robomongo screenshot](https://i.imgur.com/5mSjqa6.png)

**Note:** check out SimpleSchema

If you sign out you will see the tweets are gone in mongol
Create a different user
You will see all 3 tweets but in Mongol you will see (if you create a tweet as the other user) that two different userIds are used for each tweet. You will also only see the other user's (who you are currently logged in as) user data.

## Adding helpers

```
Tweets.helpers({
  user: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
  fullName: function() {
    if (this.user() && this.user().profile) {
      return this.user().profile.name;
    }
  }
});
```

Add full name to `client/tweet-stream.html`

```html
...
{{#each tweets}}
          <!-- unit (delete extras for loop) -->
          <li class="list-group-item tweet">

            <!-- display name, @username, and time ago -->
            <h5 class="tweet-author">{{fullName}} <span class="author-info"><a href="#">@nedstark &middot; 18m</a></span></h5>
...
```

So now when we log in we will see full name only of the person who is logged in beside their tweets. Our first tweet had no userId associated with it so we will delete that but the other user... we can not see their full name. This is a problem we need to solve.

## add username

collections/tweets.js

```js
...
username: function() {
    if (this.user()) {
      return this.user().username;
    }
  }
...
```

update `tweet-stream.html` template

```html
...
<h5 class="tweet-author">{{fullName}} <span class="author-info"><a href="#">@{{username}} &middot; 18m</a></span></h5>
...
```

## Show ugly time

```html
...
<h5 class="tweet-author">{{fullName}} <span class="author-info"><a href="#">@{{username}} &middot; {{tweetedAt}}</a></span></h5>
...
```

### Moment to the rescue!

* Add some client side helper code to use moment to transform time to a more readable format

client/tweet-stream.js

```js
Template.tweetStream.helpers({
  tweets: function () {
    return Tweets.find();
  },
  tweetedTime: function() {
    return moment(this.tweetedAt).fromNow();
  }
});
```

update tweet-stream.html

```html
...
<h5 class="tweet-author">{{fullName}} <span class="author-info"><a href="#">@{{username}} &middot; {{tweetedTime}}</a></span></h5>
...
```

View the home page now and the time will be nicely formatted.
![nicely formatted time with moment](https://i.imgur.com/98aJQiL.png)

* time code can be on client or server

## Add a form

Change this in `client/tweet-stream.html`

```html
...
<!-- compose a tweet -->
          <div class="panel-footer">
            <input type="text" class="form-control" placeholder="Compose new Tweet...">
          </div>
...
```

To this:

```html
...
<!-- compose a tweet -->
  <div class="panel-footer">
   <form class="frm-tweet">
      <input type="text" class="form-control tweet-text" placeholder="Compose new Tweet...">
      <div class="row">
        <input type="submit" class="btn btn-default btn-xs pull-right tweet-btn" value="Tweet">
      </div>
    </form>
  </div>
...
```

client/tweet-stream.js

```js
Template.tweetStream.events({
  'submit form': function (evt, template) {
    debugger
  }
});
```

View page and click tweet button

The debugger will kick in.
* In Console
    - type `evt` and you'll see it's just a jquery event
    - type `evt.target` and you'll see the target is the entire form
    - type `template` - from blaze we get the template
        + `template.data` null
        + `template.$()` - scoped jquery call
            * `template.$('.frm-tweet')` - will give us the form as a jquery object
            * To get text of tweet we can type:

```template.$('.frm-tweet .tweet-text').val()
```

Will give us the text inside the tweet textbox.

Insert a tweet with the form

client/tweet-stream.html

```js
Template.tweetStream.events({
  'submit form': function (evt, template) {
    evt.preventDefault();
    tweetText = template.$('.frm-tweet .tweet-text').val();
    Tweets.insert({text: tweetText});
  }
});
```

* show what happens without evt.preventDefault();
* submit is better than click because it includes if user clicks `return`

We also want to clear out the form when the user tweets

add this to client/tweet-stream.html

```js
Template.tweetStream.events({
  'submit .frm-tweet': function (evt, template) {
    evt.preventDefault();
    tweetText = template.$('.frm-tweet .tweet-text').val();
    Tweets.insert({text: tweetText}, function(error, result) {
      if (result) {
        template.$('.tweet-text').val(null);
      }
    });
  }
});
```

* tweet is added to UI
* getting more specific using form class instead of just `form` (in case we have more than one form in our template)
* tweet in form is removed after submission

## Search for packages

```
$ meteor search coffee
```

Will show you all packages with your search team inside it

Add this package to help us generate nice alerts

```
$ meteor add pfafman:coffee-alerts
```

## Add alert notification to base.html

```html
<template name="base">
  <header>
    {{> header}}
  </header>

  {{> coffeeAlerts}}
  {{> yield}}
</template>
```

**Bug:** Alert is there but is full screen width and hidden by navigation
* also doesn't disappear

Find another package
[Bert](https://atmospherejs.com/themeteorchef/bert)
* read documentation
* remove problematic code and replace with Bert code
* Bert doesn't need anything on base - automatically added

new client/tweet-stream.js code

```js
emplate.tweetStream.events({
  'submit .frm-tweet': function (evt, template) {
    evt.preventDefault();
    tweetText = template.$('.frm-tweet .tweet-text').val();
    Tweets.insert({text: tweetText}, function(error, result) {
      if (result) {
        Bert.alert( 'Your tweet has been added', 'success', 'growl-top-right' );
        template.$('.tweet-text').val(null);
      } else {
        CoffeeAlerts.warning( 'There was a problem adding your tweet', 'danger', 'growl-top-right' );
        console.log(error); // use a log file for better solution
      }
    });
  }
});
```

### Test it out in the browser, enter a tweet and check out the cool growl effect notification!


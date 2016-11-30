# Iron Router

* start with login
    - security

* Iron Router
    - great documenation

* Set up global config file

`lib/router.js`

```js
Router.configure({
  layoutTemplate: 'base',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('tweetStream', {path: '/'});
  this.route('notifications', {path: '/notifications'});
  this.route('profile', {path: '/profile'});
});
```


Add [font-awesome](https://atmospherejs.com/fortawesome/fontawesome)
![error](https://i.imgur.com/BZ2uPhs.png)

`header.html`

Link is wrong.

Change this

```html
<a class="navbar-brand" href="{{pathFor 'tweet_stream'}}"><i class="fa fa-twitter"></i></a>
```

To this:

```html
<a class="navbar-brand" href="{{pathFor 'tweetStream'}}"><i class="fa fa-twitter"></i></a>
```

* will remove warning error in Chrome Dev Toolbar.

## Very powerful git feature
Find out what's changed with Git

```
$ git add -p
```

### Patch Mode
[video how it works](http://johnkary.net/blog/git-add-p-the-most-powerful-git-feature-youre-not-using-yet/)
Patch mode allows you to stage parts of a changed file, instead of the entire file. This allows you to make concise, well-crafted commits that make for an easier to read history.

### Show changes that are in staging area

```
$ git diff --cached
```


## Package: useraccounts

```
$ meteor add useraccounts:bootstrap
```





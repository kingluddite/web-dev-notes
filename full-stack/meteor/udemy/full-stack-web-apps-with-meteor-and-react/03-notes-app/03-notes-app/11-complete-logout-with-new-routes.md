# Setting up Logout to Work with New Routes (Part 2)
* `currentPagePrivacy` gets updated as we move through the app
* We added the code that will make this work but now we need to wire it up
* Currently we are pulling the actual *url* from the browser and using that to determine if we should redirect

```
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if public page and logged in - let them in
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }
}
```

Instead of the above, we want to use `currentPagePrivacy`

## Refactor time
Remove these lines

`routes.js`

```
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
```

We don't need these anymore because we'll be using `currentPagePrivacy`

## Update `onAuthChange()`
* It will no longer just get called with the authentication status (`isAuthenticated`)

`client/main.js`

Update our Tracker.autorun()

```
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  console.log('currentPagePrivacy', currentPagePrivacy);
  onAuthChange(isAuthenticated);
});
```

To this:

```
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  console.log('currentPagePrivacy', currentPagePrivacy);
  onAuthChange(isAuthenticated, currentPagePrivacy); // update this line
});
```

* Also remove the `console.log()` inside this method
    + `console.log('currentPagePrivacy', currentPagePrivacy);`

We're good to go on `client/main.js` and now let's clean up `routes.js`

Update `onAuthChange()` from this:

```
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if public page and logged in - let them in
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }
}
```

To this

```
// update by adding the second argument 'currentPagePrivacy'
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth'; // update this line
  const isAuthenticatedPage = currentPagePrivacy === 'auth'; // update this line

  // if public page and logged in - let them in
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }
}
```

Let's update `onEnterNotePage()`

```
const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    // console.log(nextState);
    Session.set('selectedNoteId', nextState.params.id);
  }
};
```

* We no longer need to do the redirecting as it will be done for us
* Update it to:

```
const onEnterNotePage = (nextState) => {
    Session.set('selectedNoteId', nextState.params.id);
};
```

## Houston we have a problem
* Log in
* Add a note
* Select it
* Make some changes to it
* Log out
* Log back in and you'll see that note is still selected. This is bad we don't want that old note still selected. When we leave the dashboard we need to set `selectedNoteId` to **undefined**
* Also the URL is not matching up to which note we are seeing

### Bug
We need to make `selectedNoteId` empty when we delete a note

So when we leave this dynamic route `/dashboard/:id` we want to set our `selectedNoteId` to **undefined**

`routes.js`

```
<Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage} />
```

And we add that method in `routes.js`

```
// more code
const authenticatedPages = ['/dashboard'];

// add this code below
const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};
// more code
```

* Test and you'll see that when you delete a note, our message changes to `Pick or create a note to get started` (_because we changed selectedNoteId to **undefined**_)

### git add . vs git commit -a -m
When we have files that are being tracked and there is nothing new we are going to add we can sue `$ git commit -a -m 'some message'`

`-a` flag adds all of your changes not staged for commit to the commit

* If we had a new file we would have to use `$ git add .` or `$ git add filename`

`$ git status`

`$ git commit -a -m 'Add test cases for Editor Component'`

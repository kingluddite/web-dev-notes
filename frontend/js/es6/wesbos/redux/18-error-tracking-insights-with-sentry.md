# Error Tracking and Insights with Sentry
Client calls up and says web site is broken. I can't download this or this page doesn't load

Frustrating because there is no context as to why it doesn't work. You try it out on your machine and it works just fine

## Sentry
Provides error tracking and great insights as to what happened. It works with JavaScript and any language you need

But we are interested in the **client side error tracking**

**Sentry** is generally used in production application

You can configure in your app and let it run in production

* It will track all of the errors that happen on your users console and send them back and give you great insight

### Install Sentry
Easy to set up

`client/data/config.js`

```
import Raven from 'raven-js';

const sentry_key = '4fa58e51d2be4530b91e74sfsdfasdfsdf';
const sentry_app = '145345';
export const sentry_url = `https://${sentry_key}@sentry.io/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
   window && window.console && console.error && console.error(ex);
}
```

* We import Raven from `raven-js`
    - That is the tool they use to send errors from your user's browsers to Sentry

## Integrate Sentry into your app
Go to your one point of entry (ours is `reduxstagram.js`)

* We import **Raven**
* Point to our `sentry_url`
* We take the Raven and pass it to the Sentry URL and call the install method on it

```
import Raven from 'raven-js';
import { sentry_url } from './data/config';

Raven.config(sentry_url).install();
```

That's all we need to set it up

## Test it by writing bad code
`reduxstagram.js`

`console.log(window.doesNotExist.nope);`

**Refresh** and you'll see `can not read property 'nope' of undefined`

Open sentry dashboard you will see that same error

## Adding tags
We could group errors by a recent git commit by tagging it

```
Raven.config(sentry_url, {
  tags: {
    git_commit: 'asdfdsfkasdf',
    userLevel: 'editor'
  }
}).install();
```

## Add another error
comment out the last error and add this one

`console.log(window.user.nopeNopeNope);`

Refresh and see the client side error, go to Sentry dashboard. After about 20 seconds you'll see your tags showing up in Sentry Dashboard

It will group all the errors with that `git_commit` or that specific user level

### Create our own custom exception
That is what our `logException` is for in `client/data/config.js`

```
export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
   window && window.console && console.error && console.error(ex);
}
```

In `reduxstagram.js`

```
logException(new Error('download failed'), {
  email: 'gijoe@army.com'
});
```

## Add error
`console.log(store.doesNot.existEver());`

**Refresh**, see client-side error, jump into Sentry Dashboard and you'll see the error and all other details associated with it

## Capture some sort of message
`Raven.captureMessage('Something bad happened');`

You won't see an error because an error didn't happen, but you can use **Sentry** to get all info about that message

## Report Dialog
`Raven.showReportDialog();`

Sometimes you need more info from the user or the user wants to provide feedback as to what bad stuff happened

After bad stuff happens, the dialog will appear and the user can enter details about error that will be tied exactly to the bug



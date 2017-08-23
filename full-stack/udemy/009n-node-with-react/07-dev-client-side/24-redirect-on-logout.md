# Redirect on Logout
* Logging out seems simple, we could just link to our api logout route
* But in reality logging out is a large consideration

## How we track if users are logged in
![logged in user tracking diagram](https://i.imgur.com/Xkt6ocK.png)

* When user first logs in
* We put some token inside their cookie
    - Set-Cookie
    - It says to put this token in any follow up requests
* Send the cookie along so we know who you are
* To log out a user we just have to on server side is make sure that that cookie get un set

## How we empty the cookie is the real question
* When user clicks on `Logout` button in Header are we going to:
    1. Or make `Logout` into a traditional anchor tag that will cause the entire browser to go to this logout route and then kick the user back somewhere inside our app
    2. Make an Ajax request that goes to that logout route

## Let's analyze these two methods
![two logout possibilities](https://i.imgur.com/UQI9HNK.png)

### Method #1 `Use anchor tag`
* This would be a full HTTP Request
* User clicks on a button, which is an anchor tag
* Which causes the entire browser to forcibly redirect to `/api/logout`
* And when the user visits that route, the server will say "ok you're here I will log you out and redirect you somewhere back inside the app"

### Method #2 `Make an Ajax request that goes to that logout route`
* We just make an Ajax request to the backend
* To `/api/logout` route
* Ajax requests like that and still get full access and all the handling that is associated with cookies
* And when we make an ajax request like this and get the response back
* The response will say, "Hey browser empty out your cookies, you're no longer signed in"
    - And the browser will respect that
    - And then it is up to us to update our Redux side of our app to make sure it was clear to the user that they are no longer signed in
    - We might have to make an `Action Creator` to say "hey let's log out the user"
    - We would have to update our reducer to say "hey after this logout request is complete make sure to the reducer says correctly that we are no longer logged in"
    - And we would like to redirect our user back to the root route of our app

## Which one do we use?
* Method #1 is way easier to use and implement and take care of
* But the Benefit of Method #2 is it would be a much faster process
* But if the user is logging out and leaving us do we really want that to be a user friendly process? It is your decision at the end of the day

`Header.js`

```
// more code
renderContent() {
  switch (this.props.auth) {
    case null:
      return; // return nothing - show nothing at all
    case false:
      return (
        <li>
          <a href="/auth/google">Login With Google</a>
        </li>
      );
    default:
      return (
        <li>
          <a href="/api/logout">Logout</a>
        </li>
      );
  }
}
// more code
```

* But when you click on the Logout button you are taken to a blank screen
* We need to add a redirect when the user comes to this `/api/logout` and we redirect them to `/`

`authRoutes.js`

```js
// more code
app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
// more code
```

## Test it out
* Our auth system should now work properly
* We can easily log in and out

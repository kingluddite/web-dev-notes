# Why we care about Auth
![authReducer diagram](https://i.imgur.com/YwsbmQT.png)

* The authReducer is concerned with whether or not the user is logged in
* So why do we care about that?
    - We only want the user to use our app if they are logged in (obvious answer)
    - But thinking deeper what aspects of our app will change with the user is logged in?

## Mockup - ourdomain.com/
![mockup home](https://i.imgur.com/8GIa5QU.png)

### The Times They Are a Changin'
* What parts change in our Home page?
* The content inside of our Header will change if the user is logged in

![Header content](https://i.imgur.com/oDSzqBi.png)

* When user is not signed in link will say `Login with Google`
* If the user does sign in with Google
    - That our Header is supposed to magically change
        + To a Logout button
        + And a button to add money to their account (late)
        + And credits button (later)

### Secret Routes
![routes hidden or not](https://i.imgur.com/2opveTS.png)
* What routes will be accessible when logged in
* What routes won't be accessible when not logged in
* The App Component will show the following Components:
    - Header (always visible - but content inside will change on user login state) - but no matter what the user should always see the Header
    - Landing (Show when user is at `ourdomain.com/`)
    - Dashboard (only give user access if they are logged in)
    - Survey (only give user access if they are logged in)

## Next - Build our Components and Wireup React Router
* So we can make them visible on the screen
* Once we can see them them we can begin adding logic to hide or show them when we need to

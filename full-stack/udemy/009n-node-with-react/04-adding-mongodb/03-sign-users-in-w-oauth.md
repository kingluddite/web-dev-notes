# Signing Users in With OAuth
![cookies diagram](https://i.imgur.com/r09Y6ba.png)

* We kind of glossed over the initial `Log in` request
* We could use a log in password but we will use the OAuth flow to sign in a user

## Using the OAuth flow to log a user into our app

### First let's talk traditional approach - email and password

### Email and Password Flow
![email password flow](https://i.imgur.com/Q6gDN8z.png)

1. User comes to app and signs up with email and password
2. We take their email/password combo and write it down somewhere on our server
    * And "keep it around"
3. Time passes
4. Our user signs out at some point
5. More time passes
6. User comes back and tries to log in again
7. The user provides us the exact same email and password
8. On our server we compare both email/password combinations
9. It they are identical we can assume the user is the same user from before and we let them into our site
    * Then we give them the cookie and do the other steps we talked about previously

![previous steps](https://i.imgur.com/9CdmGbl.png)

* The critical info is the user is always providing the exact same email and password every time they log in

## How can we apply the Email and Password Flow to the OAuth Flow?
![OAuth Flow](https://i.imgur.com/7TTpLWQ.png)

* With OAuth flow we don't have the benefit of any time of `email/password`
* Then how are we supposed to do some comparison that this is the same person who logged in before?

1. The User signs up for our for the first time
2. The start the OAuth flow
3. They then get directed to Google Server where they get the google profile
4. The user signs out
5. They come back through the OAuth flow again
6. When they click on that `Login to google` a second time, they still go through the exact same Oauth flow
    * They still get redirected to Google
    * Google sends a response with the user's profile
    * Now we need to determine if the user is the exact same one who signed up for our app before
    * We need to pick some very unique identifying token in the user's Google profile
        - Is that token consistent between logins?
        - We will store that token
        - And every time the user comes back we will use that token to decide if the user is the same

## What unique piece of identifying information will we we use for our token?
* We could use the person's email but Google allows you to associate as many emails with your account as you wish so there is a high probability that this won't be the unique piece of identifying info we need
* If a user changes their email they they have lost access to our app and won't be able to sign in again
* A better piece of unique info is the user's `id`

![user id for google profile](https://i.imgur.com/hIJDnCU.png)

* It will never change over time
* It will always be the exact same `id`

### Now let's try this again

## Oauth Flow
1. User signs into app with Oauth
2. We redirect them to Google
3. The user agrees to share their profile
4. Google redirects them back to our server with the User profile
5. We store the user's Google 'id'
6. Any subsequent visit's by the user we compare their google user profile id to see if they are the same person from before

## Takeaway
* The key here is the only purpose for this entire OAuth flow is to get and save the user's google profile `id`
* We are putting our trust in Google that this is the same person
* If Google ever changed this user's `id` then we are in trouble
    - We are putting our trust on a third party----> Google

## More indepth view of what we will be doing
![very detailed chart of what we will do to Oauth login](https://i.imgur.com/6miphWm.png)

1. User signs up and comes to our page with Google User profile
    * It is our server that takes the code from the user and exchanges that code for the user id (let's just assume they are at our site with their profile and want us to sign them up)
2. Our server will create a brand new user by creating a document in the user's collection of our `MongoDB`
    * **note** Anytime we will always check our user collection to see if we have a user that has a matching google profile id inside it
3. We move to our `MongoDB` and their will be a huge list of users
4. We will create a new user record (document)
5. Let's assume it is `user123`
6. We come back to Express after the document in `MongoDB` is created
    On Express we take the cookie and send it back to the user's browse
7. Any time the user makes any follow up requests, our Express will see that cookie
8. Let's say the user creates several survey's in our app
9. Eventually the user logs out of our app
10. Our Express Server will `unset` the cookie (aka expire)
11. We respond back to the client/browser and `Set-Cookie` in the Header of the response will be empty and tell the user they are logged our of our app
12. Then the user comes back to our app again
13. They click on the log in with google button
14. They go to Google
    * Anytime the user signs in to our app, they always go through the entire Google OAuth flow
15. The user gets redirected back from Google to our server with their user' profile
    * But before we create their record we want to check their user profile id to see if they were here in the past
    * So we query our `MongoDB` to see if there is a user with the google profile id
        - We search through all our user and eventually we find `user123` to find the goodle user profile id we sent with the request
        - We have a match so we don't create a new record for that user
        - We then give the user a cookie that says they are `user123`

### Most important part
* Getting the profile user `id` is how we uniquely id users

## Next - Setting us users inside `MongoDB`

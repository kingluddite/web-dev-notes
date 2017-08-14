# OAuth Flow
![oauth flow diagram](https://i.imgur.com/ktZWKhX.png)

* Zoom in on top part
![OAuth flow diagram](https://i.imgur.com/nHaZjVW.png)

* We are dealing with `Client`, `Server` and `Google`
    - `Client`
        + All steps undertaken by our Client
        + Which is the user in their browser
    - `Server`
        + This is what we are building
        + Our running Express server
    - `Google`
        + Their servers

## What is the entire purpose of OAuth?
* To authenticate our users
* Being able to identify who is logging in to our Application
* Our app is creating surveys so we need to know who the user is
* Any time someone does something in our Application we need to ID who is doing it

## The OAuth Flow
1. A user clicks 'Login'
2. We will redirect our user to `localhost:5000/auth/google`
    * localhost:5000 is the current host for our Express server
    * The route they are accessing is `/auth/google`
    * We could name that route anything but I named it this because it makes logical sense
        - But I could easily create a route called `/goonie/googoo`
        - Anyone that hits the `/auth/google` route means they probably want to go through my Google OAuth flow
3. My Express server sees the `/auth/google` route and forwards that request to Google
    * We send the user request to google servers and make sure they grant you our application permission to read about your profile on Google
    * We redirect the user to `google.com/auth?appId=123`
    * The appId is important and we'll get back to that later
4. The user is on Google and Google will show them some permission page
    * Google will ask user if they (the user) grant permission
        - It will ask something like "Yo! This app wants access to your Google profile, is that cool with you?"
        - If the user says, "Yep, I grant them permission" by clicking the accept button
5. That triggers the **callback** where Google automatically redirects the user back over to an address of `localhost:5000/auth/google/callback?code=456`
    * The route is made up and not inherently important
    * We will use this route in our app
    * We could make it something else if we wanted to
    * But the `code` in the querystring (after the `?`) and that `code` is REALLY IMPORTANT to us
    * When the user is redirected from Google to our site, Google is putting that `code` inside the URL
6. We see that request coming into our Express server
    * We put the user on hold
    * And then we take that `code`
7. We then on our Express server, use that code to send a request to Google with the `code` included
    * The `code` is important because that is what allows our Express server to reach back out to Google and communicate with them
    * We say, "Yo Google, we're pretty sure this user just granted us permission to see their profile and you just gave us this code and we want to exchange this code with some details about this user"
        - Like: give us their email, give us their profile, give us their identifying info
8. Google sees that `code` in the URL and they will reply with details about the user
9. Our Express server gets user details and we create a new record in our Database
10. Then we need to do stuff to uniquely identify this user by setting user ID in cookie for the user
    * This will actually be a `token` and how we store it might be different than cookie
    * But we'll talk about that later
11. Then we kick user back to localhost:5000 (we'll talk about this later) (Client)
12. At that point in time, the user is "magically" logged in on the client
13. All follow request user makes
        * They may need more resources from the API
        * Or they are trying to pay money to our app
        * Or trying to create a new survey
        * We'll make up a follow up request and something "magical" will happen
        * The Express server will see their user ID matches and we can validate that they already logged in

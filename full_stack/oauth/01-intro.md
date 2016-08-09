# oAuth

## What is oAuth?
OAuth is a protocol that allows users of social networks to grant 3rd party websites access to profile information without revealing their username and passwords.

only way to share data between sites was to enter email and password into a 3rd parties website
the 3rd party would then log in on behalf of the user to access an API
but the high profile hacks happened
hackers who could compromise a 3rd party's site now had user's email and password for other sites too

[oAuth](http://oauth.net/) was invented to fix this
[wiki info on oAuth](https://en.wikipedia.org/wiki/OAuth)

[passwords stolen](https://www.google.com/trends/explore?date=all&q=passwords%20stolen)

## Difference between Authentication and Authorization

### Authentication
Who you are

### Authorization
What you can do

We have an app and we want users to log in with their facebook profile
We need to register our app with Facebook
they'll give us a couple of tokens (aka unique identifiers) that will give our app access to their API
* normally come in the form of ID and key or secret
    - think of it as a username and password specifically for our app
    - this allow facebook the ability to remove users who are abusing their information
        + like using data for unauthorized purposes (like Spam)
* we use the ID and secret in our application
* when user wants to use our app, they are redirected to facebooks page
* the user authenticates on facebook with their username and password
* and then they authorize our app to have access to their profile information
* if the user is already authenticated with the service, the user won't see the login page but they will see the authorization page
* the requested profile information is sent back to our app for us to use in whatever which way we want
* in this case, to authenticate them with our app
* along with profile info, you get 2 specific tokens for the user
    1. Access Token
        * Allows you to access other parts of the API
    2. Refresh Token (sometimes)
        * Used to renew access tokens without forcing the user to reauthenticate with the provider

## oAuth
Can be used to authorize an application to work with a provider's API
But in most cases its used to authenticate a user

### 3 ways to authenticate someone
1. What they know
    * password for logging in or secret phrase to reset a password
2. What they are
    * using biometric scanners to recognize fingerprints, faces or irises
        - apple uses touch id to read fingerprints to authenticate people
        - microsoft uses face detection in Windows Hello to allow people to log in without a password
3. What someone has
    * Slack allows you to sign in via magic links sent to an email address
    * Other apps send a text message with a unique code
        - to prove that you have access to that telephone number
    * 2-factor authentication
        - you have an app installed on your phone
        - that generates secret codes to prove that you have the device and you are who you say you are

Oauth can request info for create, reading, update, deleting all sorts of info on a provider's website
valid profile with a trusted provider

# oAuth

## What is oAuth?
OAuth is a protocol that allows users of social networks to grant 3rd party websites access to profile information without revealing their username and passwords.

* Only way to share data between sites was to enter **email** and **password** into a 3rd parties website
* The 3rd party would then log in on behalf of the user to access an API
* But high profile hacks started to occur a lot 
* Hackers who could compromise a 3rd party's site now had user's email and password for other sites too

[oAuth](http://oauth.net/) was invented to fix this

[wiki info on oAuth](https://en.wikipedia.org/wiki/OAuth)

### Google Trends shows Passwords stolen
[passwords stolen](https://www.google.com/trends/explore?date=all&q=passwords%20stolen)

## Difference between Authentication and Authorization

### Authentication
Who you are?

### Authorization
What you can do?

## How oAuth Works - An Example Using Facebook
1. We have an app and we want users to log in with their Facebook profile
2. We need to register our app with Facebook
3. They'll give us a couple of tokens (_aka unique identifiers_) that will give our app access to their **API**
    * normally tokens come in the form of **ID** and key or **secret**
    - Think of it as a username and password specifically for our app
    - This allow Facebook the ability to remove users who are abusing their information
        + Like using data for unauthorized purposes (like spam)
4. We use the **ID** and **secret** in our application
5. When user wants to use our app, they are redirected to Facebook's page
6. The user authenticates on Facebook with their **username** and **password**
7. Then they authorize our app to have access to their profile information
8. If the user is already authenticated with the service, the user won't see the login page but they will see the authorization page
9. The requested profile information is sent back to our app for us to use in whatever which way we want
10. In this case, to authenticate them with our app
11. Along with profile info, you get **TWO** specific tokens for the user
    1. Access Token
        * Allows you to access other parts of the **API**
    2. Refresh Token (_sometimes_)
        * Used to renew access tokens without forcing the user to reauthenticate with the provider

## oAuth
Can be used to authorize an application to work with a provider's **API**
But in most cases its used to authenticate a user

### 3 ways to authenticate someone
1. What they know
    * password for logging in or secret phrase to reset a password
2. What they are
    * Using biometric scanners to recognize fingerprints, faces or irises
        - Apple uses touch id to read fingerprints to authenticate people
        - Microsoft uses face detection in Windows Hello to allow people to log in without a password
3. What someone has
    * Slack allows you to sign in via magic links sent to an email address
    * Other apps send a text message with a unique code
        - to prove that you have access to that telephone number
    * 2-factor authentication
        - you have an app installed on your phone
        - that generates secret codes to prove that you have the device and you are who you say you are

**Oauth** can request info for **create**, **reading**, **update**, **deleting** all sorts of info on a provider's website
* Valid profile with a trusted provider

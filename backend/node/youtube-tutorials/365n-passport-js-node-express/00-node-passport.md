# User Authentication in Web App
* [URL to original video - https://www.youtube.com/watch?v=F-sFp_AvHc8&t=2128s)]
## (Passport.js, Node, Express)
* passport-local strategy
* passport-jwt strategy

## User Authentication Choices
![user auth options](https://i.imgur.com/B0f5q0C.png)

* Session
* JSON Web Tokens (JWTs)
* OAuth
    - In-House
    - SaaS
* Other Ad-Hoc

### This is a review of Session and JSON Web Tokens

## What is OAuth?
* It is just a protocal (you will use this if you are using large APIs like GitHub or Google or Amazon) that gives different access rights to users trying to access resources within their API
* There are SaaS providers like Okta (and now they own Auth0) provide this OAuth protocal as a service

### What does the OAuth protocal aim to do?
* It separates out the two components of "user authentication"
    - **note** There is a big difference between authorization and authentication
    - Session and JWTs are all about knowing who the user is (this is what we call "Authentication")
    - But those login like (sign in with Google or GitHub or Facebook) this is more about "Authorization"
        + So not as much about who are we talking about but more about who has access to what resources
            * This entails:
                - scopes: What does this user have authorization/access to
                    + examples:
                        * They just have permission to make GET requests to the API or do they have permission to also edit certain resources within that API
                - You will also hear a lot about `Open ID Connect` (closely relatated)
* The most common are:
    - Session
    - JWTs
* They are used mostly by:
    - Startups
    - People just trying to get their app off the ground
    - They'll worry about OAuth and Custom when they have more resources or money or both

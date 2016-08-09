# Authentication and Authorization
* They are not the same
* But often used together

## Authentication
Refers to the process of confirming that the user is who they claim to be.

Websites authenticate user by validating the credentials the user provides
**example**

* using email address and password

## Authorization
When site determines who the user it, it can determine which parts of the site the user will have access to

* Means you are allowed to:
    - See certain information
    - Do certain things

**example**

* After siging into facebook you can:
    - View your friends statuses
    - Update your own status

## Steps in process
1. User creates account
  * Presented with registration form
    - email address
    - username
    - password
2. User info saved in database
3. User logs into website entering username and password
4. App checks if credentials user entered match records in user table of DB
    * If info matches
        - Then site knows who they are
        - The user is now authenticated
5. When user is logged in the web app can alter the appearance and functionality of website based on that user's preferences, settings and history
6. Once you are authenticated a web site can follow you from page to page

## Session
How does it know you from page to page? Session

* Think of a Session as a unique token that the server uses to ID you
the session sticks with you and your browser, while you visit the site
and then it is destroyed after a period of inactivity
* The token lasts for one session or one visit

## Logging Out
Log out - when you want to leave the website you click the log out button
this sends a request to the server and this deletes the session object

* Without that session, the server forgets who you are

## Express
* We will build an authentication system
* We will use Express JS
    - A Popular web application written in `node.js`
    - Provides many features you'll need when creating a web app

## MongoDB
MondoDB is a document based NoSQL DB

* Express will manage the web app
* MongoDB will store user info (stuff like the user email and password)

## Our Project
We will start with a basic web site
We will add the ability to create a user account
Log into that account
Create the ability to use a password protected page



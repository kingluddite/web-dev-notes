# Authentication and Authorization
* they are not the same
* but often used together

## Authentication
Refers to the process of confirming that the use is who they claim to be.

Websites authenticate user by validating the credentials the user provides
example (using email address and password)

## Authorization
when site determines who the user it, it can determine which parts of the site the user will have access to

* means you are allowed to see certain information
* and do certain things
after siging into facebook you can
* view your friends statuses
* update your own status

Steps in process
1. User creates account
  * presented with registration form
    - email address
    - username
    - password
2. User info saved in database
3. User logs into website entering username and password
4. App checks if credentials user entered match records in user table of DB
    * if info matches, then site knows who they are
        - the user is now authenticated
5. When user is logged in the web app can alter the appearance and functionality of website based on that user's preferences, settings and history
6. Once you are authenticated a web site can follow you from page to page
7. how does it know you from page to page? Session

Think of a Session as a unique token that the server uses to ID you
the session sticks with you and your browser, while you visit the site
and then it is destroyed after a period of inactivity
the token lasts for one session or one visit

Log out - when you want to leave the website you click the log out button
this sends a request to the server and this deletes the session object

without that session, the server forgets who you are

## Express and MongDB
Build an authentication system
Express popular web application written in node.js
provides many features you'll need when creating a web app

mondoDB is a document based NoSQL DB

Express will manage the web app
MongoDB will store user info (email, password)

Basic web site, create account, log in and use a password protected page







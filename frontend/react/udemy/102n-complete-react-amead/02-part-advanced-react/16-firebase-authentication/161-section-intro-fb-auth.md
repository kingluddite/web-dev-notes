# Section intro: Firebase Authentication
* We will integrate user accounts and authentication into the expensify app
* Currently anyone can view the app URL and start messing with the data stored in the Database
    - They could delete every single expense created by other users
    - If someone adds an expense they are essentially sharing it with anyone who might want to look at in (and we don't want that)

## Log in
* We will first force users to log in before they can use the application
* Once they are logged in their data will be associated with their user account (like every user will have their own little chunk of the Database)
    - So an expense created by user A won't be accessible or visible by user B

## Next - Create our Log In Page
* This will be the first thing a user will see 

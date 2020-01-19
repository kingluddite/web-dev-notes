# Intro - Firebase with Redux
* We will integrate our Firebase Database into our React/Redux app
* All our data will be persistently stored in our Database
* All CRUD will work with Database

## A new type of action
* An asynchronous Redux action
    - This will allow us to do more than just change the redux store
    - It will allow us to run some additional code that will allow us to run the firebase code we explored in last section
        + So when someone dispatches a asynchronous action we can update the Redux store and the Firebase Database
            * This will keep the UI up to date and the Database synced with the actual changes the user is making

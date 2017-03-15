# MongoDB Collections

## Challenge #1
Find a place to store our data

![diagram of our full stack application](https://i.imgur.com/vvTeRNZ.png)

Front End - React JS <--> Meteor JS <--> MongoDB Database (Backend)
                                            Collections
                                             `employees`


* **React JS** - Take some amount of data and produce some **HTML**
* Data will be handed to **React** by our **Meteor JS** application
    - This will be code that we will specifically write in our **Meteor** application
* What is storing our data?
    - That is where **MongoDB** comes in to play
        + Whenever we run the `meteor` command via the command line
            * This spins up an instance of the **MongoDB** database for us
                - **MongoDB** works by creating `collections` of data
                    + Think of a `collection` sort of like a bucket, a gigantic bucket that we can keep on stuffing more and more data into
                    + Any app you write with a **MongoDb** database, you will ALWAYS have at least one collection and that collection will usually be an array of objects
                    + In our case we will have one **employees** collection and that collection's purpose will be to store a list of `employees`
                        * In this collection of the list of `employees` we will have an array of objects where each object represents a single employee
                        * So these objects that represent **employees** will have properties like:
                            - name
                            - phone number
                            - image
                            - address
                            - ... and all the data that we'll need for a single employee
                    + Where will we store our data?
                        * We will store our data within a collection that we are specifically going to call **employees**
                        * Even though we only have one collection for our app, in future sections we will have many similar collections and they will all be named something different and the purpose of each of them will be to store some amount of data for our application
                    + Once **MongoDB** has stored our big bucket of data, it is then upto **Meteor JS** (_aka our **Meteor framework**, all the code we are going to write on the Meteor side_) to fish in to this `Meteor` **MongoDB** database and pull out the data we want to send on to our React Application

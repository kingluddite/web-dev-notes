# Handling Data Securely
We first need to remove a package that Meteor ships with by default whenever you generate a meteor project

## Uninstall `insecure` package
This package allows any user to update any collection at any time. By removing it we essentially lock down the entire application and prevent anyone from changing any data at all

### meteor remove

`$ meteor remove insecure`

### Now we need some way in which the client can update the database
To do this we are going to use a feature called `meteor methods`

![saving data securely diagram](https://i.imgur.com/yFh6uhj.png)

This is the flow we want and it looks more complicated

Meteor methods are part of the special sauce of meteor. A Meteor method is a function that is used to run a chunk of code in a secure fashion

We will use Meteor methods to manipulate data in our MongoDB database and Meteor methods are how we are going to securely update some data

Let's go through the flow
1. We start on the client side
2. The client wants to save some data
3. The client is going to call a Meteor Method with the data and it will pass the data it wants to save as an argument
4. Here's where things get really interesting
5. On the client side our data is instantly updated on the client side collection (if we stopped here, all of our React components would instantly update here and that is the key here). Because we are running this meteor method on the client our React UI instantly updates with the new data
6. Whenever we call a Meteor Method the method executes on both the client and the server... so let's talk about the server side flow now (literally the same chunk of code is executing on both the client and the server)
7. The server will now be our **source of truth**
8. The method will execute on the server where the server will have the opportunity to validate the record in a secure context
    * So a client can mess with the client side collection but they can't actually mess with the server side code that is used to validate the input when it executes on the server (that is the key here and that is why the Meteor method is secure when it runs on the server). The client can not mess with the code on the server
9. Inside of the Meteor Method on the server we can add any type of validation check that we want. If all these checks are successful. We then save the record to our database (that is the traditional way servers work)
10. What happens if the data was added on the client collection but it was rejected on the server side collection? If that happens, the server will notify the client that the record was not saved successfully and that the client needs to revert that change from it's collection

### One more run through
When we call a Meteor method the change is instantly reflected on the client. That makes our users think that the app is super fast. Because that change happens instantly. So the same Meteor method is simultaneously called and run on the server at the same time. The server has the opportunity to validate the data that was submitted. If it wants to it will save that record to the save that record to the database and it will tell the client whether or not that save was successful or not. If the server save was not successful the server will notify the client and the change to the collection will be rolled back. Which means the UI will be updated because the React components were watching that collection and whatever UI updates were made, will be removed out of the UI

This entire flow is one of the huge benefits of Meteor. On the client side of this flow they are referred to as **optimistic UI updates**. So whenever somebody makes a change we'll just assume that it will be a successful change. But at the same time the server is going to execute the same operation as well and only if the server agrees with the result is the client side going to continue showing the data.

## Next up
Defining our first Meteor method




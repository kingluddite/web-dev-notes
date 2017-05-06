# Overview of Methods

![methods diagram](https://i.imgur.com/j3inyUf.png)

This is responsible for writing data:

* Creating a Document
* Updating a Document
* Removing a Document

## Steps in creating a Method
* You will define an object with **key/value** pairs where the `key` is the method **name** and the **value** is a function
* We will look at what Meteor does in the Client and the Server to handle **methods**
* We mostly will start our method calls on the `Client` (_i.e. - someone clicks a button to remove a link or they submit a form to add a new one - all this user interaction will trigger **method calls**_)

### The Client will provide two things
1. The String method **name**
2. The Data (_maybe a URL in our short link app example_)

The **Client** will say, "_Yo, I want to write the method `links.create` with these arguments_"

## links.create
* This is just a syntax format
* It means nothing special we could name it whatever we like
* But we'll use this pattern for consistency 

## Let's say we pass in the link of the URL we are going to shorten

1. The Server will see this request
2. The Server will find the appropriate function (_links.create_)
3. The Server will run that function with those arguments and at some point it will get a response, "_Hey, here is the response_" (_maybe it's an error related to data validation or maybe it is a "success" response_)
4. But whatever happens the `Client` will get that **response** and it will be able to do something with that response (_whether it shows an error to the screen or adds a new link to the list..._)

* Method calls need to communicate with the `Server` (_to do things like make sure you are authenticated and associate that link with your userId_)
* But on the `Client` it actually runs that method as well
    - This enables us to use **optimistic UI**

## Optimistic UI
* We can run the method on the `Client` in the browser's JavaScript
    - This will allow us to simulate the result and get that rendered to the screen much faster then the Server can respond
    - A `Server` response could take a few hundred milliseconds, getting the client to run that method will take maybe a millisecond and it will use MiniMongo to make those changes (_if I'm inserting into the links Collection, it will insert into the Links MiniMongo Collection then it can render it almost instantly_)
    - If the response from the **Server-side** and **Client-side** differ, it will always go with the `Server` side result
    - The **Server-side** is the more secure version but we use the **Client-side** because it makes our app appear much faster and if the method call changes the data, the publication might update, "_Hey here's some new data for the links list you are rendering, we noticed you are still subscribed to the links Publication_"

## More Social Application
Let's use a Grocery Store List App where 3 family members are on same list and they see the changes on the list (_all 3_) if someone adds milk

**Family member #1** would make a method call to, as an example, `groceries.add`, passing in the name of the grocery item they want the family to purchase, this will run on the `Server` and assuming the `Server` takes the request (_meaning they are logged in and the data is valid, it is going to issue an update to anyone subscribed to some sort of Publication_)

![diagram client Server and methods](https://i.imgur.com/ktFXSXV.png)

## We could have a groceries publication (_for example_)
* We could have multiple `Clients`
* Let's say we have three `Clients`, they could get notified of those changes
* Here we have one `Client` making a **method request**
* It then updates the `Publication` and all three **subscribers** get that new information (_this will still be secure_). If there were other `Clients` (_other family members with other lists_) They would not see our grocery item added because they won't have access to that list
* We could lock this list down by adding an array of all the user `id`s of people in the family

## Takeaway - This is a great and powerful pattern
A single method call can cause a `Publication` to update and that in turn can update multiple **Clients**

## Next
Digging into our Short Link App

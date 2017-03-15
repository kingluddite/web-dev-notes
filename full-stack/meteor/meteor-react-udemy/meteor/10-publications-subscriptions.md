# Publications and Subscriptions
Now we need to talk about how we get data from our `server` onto our `client` (_aka browser_)

![diagram](https://i.imgur.com/5p9jClm.png)

The above diagram shows us how we can exchange data with our backend `server`

**note** Both our **client side** and our **server side** have access to our `Employees` **collection**

So on our `server` we have all 5000 Employees but on the `client side` (_when someone visits our webpage, they are also going to have access to our Employees collection but it will only be a sub-set of our Employees collection_)

**note** aka disclaimer - **Meteor** at all times is going to provide the entire set of all employees to the client side at all times. This feature was added solely for development purposes. It is a feature that **Meteor** ships with just to make it easier for you to develop and create application quickly and painlessly

But the immediate thing that you are going to want to do if you plan on having any security with your data is you are going to only **publish** a limited set to the `client` (_to the web application itself_). This is to prevent someone coming to your webpage and arbitrarily making a query to all the records in your database

Think if we had social security numbers inside our user profiles. We would not want that data easily accessed. We would not want all of our users to have access to every single social security number

We would want them to have access to a very small subset of data

## Publish and Subscribe system
Limiting the amount of data that a user can see at one time

![Another pub sub diagram](https://i.imgur.com/6k8UMGW.png)

The **Publish** and **Subscribe** system is how we share data (_or slices of data_) from the backend (_our MongoDB database_) to our front end (_to our React applicaton itself_)

The **Publish** and **Subscribe** are both methods that are available through **Meteor**

Our **React** application is going to `subscribe` to a set of data provided by our backend (_diagram shows that our **React** application has a local copy of our `Employees` collection_). It can choose to **subscribe** to a subset to the `Employees` that are stored on the Backend - We may ask for a **subscription** for the first 20 records (_or however many records we want_)

The **Meteor server** can then choose to respond to this `subscription` by `publishing` the first 20 records (_or however many records we want to send over to our client_)

So the **subscription** and **publish** system is how we limit access to data in our **Meteor** applications

We will use the **publish** and **subscribe** system in every application that we work on

Lots of stuff online about **Meteor** doesn't really give you a good idea how **Publish** and **Subscribe** work but it is essential to know but it is also very difficult to wrap your head around

## Set Up a subscription and a publication for our employees
Up next!

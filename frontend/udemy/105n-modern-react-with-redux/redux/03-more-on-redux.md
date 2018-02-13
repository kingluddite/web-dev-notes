# More on Redux
![data view diagram](https://i.imgur.com/4ihsl6p.png)

Where does Redux come into this diagram or the discussion we just had about our book app?

And what part does React play at all?

## Redux
Redux is the data contained inside the application box (in the diagram)

## React
React is the views contained inside the application box (in the diagram)

## What is Redux?
A state container. But it really is a collection of all the data that describes the app. That includes the **hard data** (list of books) but also contains meta-level properties like (what is the currently selected book)

## What is React?
React represents the views which translates the apps data into something that can be displayed on the screen as something that the user can actually interact with

### Isn't this the exact same as Angular, Backbone or Flux?
The difference is we centralize all of the app's data inside of a single object

Any other JavaScript library has separate collections of data

Backbone has collections
Flux has different stores

`Redux`, on the other hand, centralizes all of this data into a central, single object which is referred to as the `state`

Remember the difference between **component level state** and **application level state**

Redux deals with **application level state**

It is this big object that contains all the data of our application

## Examples
### A counter
![counter diagram](https://i.imgur.com/Opk66hk.png)

Click plus and count increases and minus does the opposite. Simple app

If you had a diagram to show all the different types of data and all the different types of views, [what would that diagram look like](https://i.imgur.com/lI0qHvm.png)?

The data is just the current count
The view is the plus and minus button and the view that shows the current count

So React would show the views and Redux would keep track of the current state of the `counter` (keeps track of the actual number, the number of times the button has been pressed)

### Modeling a more complicated app
Separating into a bucket of data and a bucket of views

One of the most import parts of created a Redux app is how to design your state

### Let's model the Tinder App
![tinder wireframe](https://i.imgur.com/1iwsS3f.png)

### How does Tinder work?
A user is prompted with an image of another user
If user likes the current user they tap `like` button
If they don't like the current user they tap the `dislike` button

Once a person likes a person and that person likes the person who puts the image back (in other words you have a match), the two get a chat log opened and they can talk to each other

Users can see a list of all the open chats they have and they also can view an individual conversation (just a series of text messages back and forth)

![tinder diagram](https://i.imgur.com/swdzImB.png)

### Let's model the Tinder swiping screen
Single screen that allows a user to like or dislike a user

To show the screen we need to have two things:
1. A list of users to be reviewed
2. The currently viewed user for image swiping (we are liking or disliking)

We are rating users over time and that list of users we'll be rating will be getting smaller and smaller, it makes sense that we'll also have to have a list of overall users as well (both those that have been rated and those that have not yet been rated)
Also assume these lists also contain an image of the user and conversation logs of our current user if any exist

### Let's model the list of conversations screen
This screen needs to know all of the open conversations that our current user has

### Let's model the conversation screen itself
Where you exchange text messages. This screen will focus on a single user and display all the conversation logs for that user

In total we could model Tinder with 5 pieces of state

1. The currently viewed user
2. A list of open conversations
3. The currently viewed conversations
4. A list of the users who still need to be reviewed
5. A list of all users overall
    * Those that have been reviewed and those that have not been reviewed

### Now the React side of Tinder
* Have an image card where you can like people
* Like/Dislike buttons
* individual text message
* A list of conversations
* A list of text messages

**note** All the data that describes this application sits in a single JavaScript object that is maintained by redux and we refer to it as our **application state**




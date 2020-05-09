# More on Redux
![data view diagram](https://i.imgur.com/4ihsl6p.png)

## Where does Redux come into this diagram or the discussion we just had about our book app?

## And what part does React play at all?

## Redux
* Redux is the data contained inside the application box (in the diagram)

## React
* React is the views contained inside the application box (in the diagram)

## What is Redux?
* A state container
* But it really is a collection of all the data that describes the app
* That includes the **hard data** (list of books) but also contains meta-level properties like (what is the currently selected book)

## What is React?
* React represents the views which translates the apps data into something that can be displayed on the screen as something that the user can actually interact with

### Isn't this the exact same as Angular, Backbone or Flux?
* The difference is we centralize all of the app's data inside of a single object
* Any other JavaScript library has separate collections of data
    * Backbone has collections
    * Flux has different stores
* `Redux`, on the other hand, centralizes all of this data into a central, single object which is referred to as the `state`

## Remember the difference between component level state and application level state?
* Redux deals with **application level state**
* It is this big object that contains all the data of our application

### Examples
* A counter

![counter diagram](https://i.imgur.com/Opk66hk.png)

* Click plus and count increases and minus does the opposite
* Simple app
* If you had a diagram to show all the different types of data and all the different types of views, 

![what would that diagram look like](https://i.imgur.com/lI0qHvm.png)?

* The data is just the current count
* The view is the plus and minus button and the view that shows the current count
* So React would show the views and Redux would keep track of the current state of the `counter` (keeps track of the actual number, the number of times the button has been pressed)

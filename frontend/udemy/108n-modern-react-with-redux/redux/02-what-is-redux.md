# What is Redux?
"Redux is a predictable state container for JavaScript apps."

## What the heck does that definition mean?
![traditional JavaScript app diagram](https://i.imgur.com/tR84QKA.png)

We are making an app that displays a list of books
When a user clicks on one of those books in the book list, the app will show details of that book on the right

### Talk about this app
And juxtapose the view layer (what we see) and the data layer

![view and data layer diagram](https://i.imgur.com/eYWtWu7.png)

### The app is divided into two separate parts:

1. The data that powers the app
2. The views that display that data

### Two types of data that make that app work
1. A list of books (displayed on sidebar)
2. And a currently displayed book (displayed in the detail view)

### View side
* We have a list view
* An item View and a detail view (shows detail of currently selected book)

What we are trying to do here is separate the **views** in our application with the **data** in our application

The data sits in its own separate bucket but the view and the data come together to make an actual working application

# Intercepting Requests with Meteor Middleware
We are still missing the key piece to our app - redirecting the user from a short link to a long link

When the user clicks on the short link we don't want to show them the React application at all

[mockup diagram](https://i.imgur.com/dQ9oAji.png)

## Accessing `localhost:3000`

When user visits our app with a link like `localhost:3000` (request) we want them to fall through the Meteor app to React, get some HTML on the screen (response)

## Accessing `localhost:3000/anything`
In this case when someone visits `localhost:3000/anything` we don't want our users to hit our React application at all

Redirecting a user who is visiting our app with a short URL code should be as fast as possible. And loading up the React application takes time. We have to respond with a HTML file. Then they get some JavaScript bundle and finally the React app will finally boot up

So when they visit our site with `localhost:3000/anything` we want to look inside our `Links` collection and see if there is a matching URL and then redirect them to that URL immediately

## Middlewares
When an HTTP request comes into our application it falls through a series of `middlewares`.

### What are Middlewares?
* Just small snippets of code (really just functions) that execute for any request that comes into the application
* Middle can also be used to modify or process requests in some fashion

We will create a Middleware that will detect when the user is visiting the app with a URL like `http://localhost/anything` and if they are, we want to redirect them to the appropriate destination

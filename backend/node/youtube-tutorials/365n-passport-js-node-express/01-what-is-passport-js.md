# What is Passort JS?
* Summary - Password is just a framework that is a middleware that also allows individual developers to develop other middlewares called `Strategies` to connect in with the bigger middleware called Password JS framework
    - Then all of that gets put into a bundle and put into your Express app
    - And it works seamlessly with your Express routes
* Welcome to Express middlewares
    - On each HTTP request, Password will use a "Strategy" to determine whether the requestor has permission to view that resource
    - If the user does not have permission, a 401 Unauthorized Error is thrown

## What are Passport Strategies?
* [Dearch the docs for a Strategy you want on Passport JS](http://www.passportjs.org/packages/)
* Each strategy uses the Passport JS framework as a template
* The Passport Local Strategy utilizes Cookies, Express Sessions, and some authentication logic

## What is the code logic of Passport JS (PPJS)?
* Passport JS is a middleware
* On every HTTP request that a user calls to our Express server
* The Passport Framework is going to pick up what Strategy are we using here
    - And then it will use that Strategy to determine if "is that user that requested that resource authenticated?"
        + If that user is authenticated that PPJS will let that user access the resource and go into the Express route
        + If that user is not authenticated based on the Strategy we are using then PPJS will return a 401 HTTP status (this is the unauthorized status)



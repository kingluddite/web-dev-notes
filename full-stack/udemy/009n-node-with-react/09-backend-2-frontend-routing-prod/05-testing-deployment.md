# Testing Deployment
* Visit Heroku live URL
* Log in
* In Heroku live app append and visit `/surveys`
    - When I type the new URL in address bar and press enter it makes an entirely new HTTP request to our Express server
    - The Express server has no idea what `/surveys` is pointing at
        + It asks, do I have a file inside my build directory called 'surveys'?
        + I don't?
        + OK, I'll just load up the `index.html` document
        + So that `index.html` loads up
        + inside that HTML document
        + We see this:

![main.js](https://i.imgur.com/9FP0goE.png)

* Then the HTML document is responsible for making another request back to the Express server and it will try to grab this very specific file which it does file `main.js` and the server responds with the main.js file
* And then the entire `React` app boots up
* When the `React` app boots up, `React Router` takes over and sees `/surveys` and then decides what Components to show on the screen depending on the current route

## `React Router` is a client side navigation library only
* So only once a user is inside our HTML document with our JavaScript file loaded up does any of the `React Router` rules take any affect whatsoever
* None of the `React Router` stuff is at all loaded up into Express
* None of the routing there is shared at all

### The Logo
* Uses the `React Router` "Link" and that means if we click on it, the Components get swapped out and there is not a page refresh
* Browse to `/surveys/new` and then click the `Emaily` logo and you will see how the page updates, swaps out Components without a page refresh
    - The reason there is no page refresh is that `React Router` is not refetching the entire HTML document, it was just changing the set of Components that are visible on the screen

## Test
* The production and development site should now work the same
* Test all functionality to see that it does work the same

## Next - Build our surveys

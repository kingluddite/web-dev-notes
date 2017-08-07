# HTTP and Angular2
* How do we use HTTP with Angular2?
* We want to send data the user added in the frontend to the backend

## Request Response from Server and Client
* This is the normal flow

![normal req res client server diagram](https://i.imgur.com/W2G9tw1.png)

### But how do we do this with Angular2?
* We only get one page that we render
* Angular2 handles the complete web page
* Angular2 is still able to send requests behind the scenes
    - It doesn't re-render the page
    - But it is still able to send AJAX requests

![Angular and Ajax](https://i.imgur.com/vyw9P2F.png)

## Angular2 Observables
* Observables are objects coming from a 3rd party library which allow us to handle asynchronous tasks
* We send it now and get back a response in a couple of milliseconds
* The Angular2 HTTP service (built-in service) allows us to connect to the web/ and connect to any routes and handle responses in the background
    - This service uses `observables`
* It sets up a **request** as an observable so that we can listen to any responses we get back from the request which was sent to the backend (aka to our server)
* This is just a pattern to make sure that we can still execute code whilst our request is traveling through the web, handled by the server, and eventually gives us back a response
    - It would suck if we had to wait for that
    - But with observables, it is really easy to do

![angular and observables response](https://i.imgur.com/xGBKZnz.png)

* `.map()` helps us deal with the observable data
* `.subscribe()` we use in the callback to deal with the responses coming back

## Next
* Send HTTP requests with Angular2

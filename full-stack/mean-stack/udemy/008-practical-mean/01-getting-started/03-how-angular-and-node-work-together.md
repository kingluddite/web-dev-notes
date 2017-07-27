# How Angular and Node work together
* NodeJS - on the server
* AngularJS - on the client

## Typical Server-side only application
![client-server classic relationship diagram](https://i.imgur.com/yKkbSIV.png)

* We exchange a request from the client with a response from the server (typically in HTML form which is rendered in the browser)
* Nothing wrong with this process but there is one issue to be concerned with
    - We need to send a request with every single change
    - Our page needs to constantly be re-rendered

## But that changes in a SPA
* SPA - Single Page Application

![single page app diagram](https://i.imgur.com/GfKy1A0.png)

* We don't need to request new HTML constantly
* We will need to make requests from our server if we need data from our database
    - Angular 2 will do this in the background

## Maybe we don't even need a server
![client only](https://i.imgur.com/dPM0t4x.png)

* Generally we can handle everything in the browser

## But we will need, at time, to connect
* We start with our user who is on the web page
* That web page initially was sent by the server
* But once we are on that page we use the Angular 2 app with its own router
    - It will handle all the user input
    - It will handle rendering the DOM
    - It will handle the routing
* From time-to-time we'll need to reach out to the server
    - If you log in and want to store data in Database
    - Angular 2 does not have direct access to Database
        + Angular 2 is front end only
        + Angular 2 runs in the browser

## Ajax Request
* We need to communicate from Angular to the NodeJS Server
    - We do this with an AJAX http request
    - We have a router on the server
        + The NodeJS router
        + This will expose several End Points, (routes) that Angular can connect to via Ajax
        + This connection will work without reloading the page
        + These End Points then tell NodeJS what to do whenever a request reaches such an End Point
        + Then NodeJS handle the routes and we execute some code
        + We can access the Database if we want
        + Then at the end NodeJS sends a reponse back to the browser and the Angular 2 application
        + All of this happens asynchronously
        + Our browser keeps working
        + We don't see the HTTP response with all the new data from NodeJS, it happens in the background
        + When it arrives in Angular 2, Angular 2 will handle it, parse it, do whatever it needs to do
            * And if it needs to it will update the DOM or part of the DOM
            * Inbetween the update it might show a progress bar waiting for the data to arrive and the DOM to be re-rendered

## Takeaway
* NodeJS exposes some API End Points (routes) to which Angular 2 can connect behind the scenes to exchange data and speak to the server
* But generally all that the user sees is handled by Angular 2 and the page is not reloaded at any point because we ony have one single page which is handled by Angular 2 on the front end

![diagram of angular and nodejs](https://i.imgur.com/B5zBJLI.png)



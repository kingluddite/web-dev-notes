# Intro
[source files](https://github.com/StephenGrider/WebpackCasts)

## Why do I need to use Webpack?
![why webpack diagram](https://i.imgur.com/3xsQ8yJ.png)

* Server Side Templating
    - Legacy apps
    - shows HTML Documents to users
    - We depend on a backend server
        + Who cares about the technology
        + It will create an HTML document and send it down to a user
        + HTML document is fully rendered (_has all the info in it that a user may want to see, text, images, buttons_)
* Single Page App
    - Totally in contrast to Server Side Templating
    - Server sends a bare-bones HTML document
    - Then it grabs JavaScript scripts and that JavaScript is responsible for assembling what the user sees

## Takeaway
* In Server Side Templating we rely on a server to serve assets
* In SPA we rely on a bunch of JavaScript scripts to render the page that is being assembled on the user's machine (_aka the Client_)

### A step-by-step view of Server Side Templating
![Server Side Templating](https://i.imgur.com/uiAeJFV.png)

1. User visits our page (_type in URL and press enter_)
2. That makes an HTTP request to the server
3. They get an HTML document back
4. Maybe they click a link at some point
5. That issues a new HTTP request
6. And they get back a new HTML document
7. Every time you navigate around you are getting a completely new HTML document

### A step-by-step view of SPA
1. User visits page
2. Makes HTTP request to server
3. We send back a new HTML document (_has a bunch of JavaScript scripts_)
4. Our front end framework (_React/Angular/Backbone/KnockoutJS/VUE js_) framework will boot up and it will assemble some amount of HTML to display to the user
5. When user clicks link
6. We don't get a brand new page, we are relying on React/Angular shows new content

## Takeway for SPA
We are relying on JavaScript to show content on the screen

### Look at the trends
* SPA popularity up
* SST popularity down

![popularity chart](https://i.imgur.com/H3JBvUG.png)

### Why is this important for webpack?
![amount of js code](https://i.imgur.com/uQPEseO.png)

* We are shipping a ton of JavaScript to our user's browser in SPA
* With SSR (server side rendering), there was very little JavaScript code


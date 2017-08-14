# Application Architecture
## Tech Stack
![tech stack](https://i.imgur.com/qVrY1wq.png)

* User navigates to our domain
    - We will send them back and HTML document and JavaScript files that contain a React app
    - The React app doesn't know what to show to the user
        + It needs some data to show the right stuff
* Our app will use `MongoDB` to store all emails and surveys
    - How do we get `MongoDB` to communicate with our React Application
    - React never talks directly to `MongoDB`
    - Instead we will use Express/Node API
        + This Express API will contain business logic to take incoming **requests** from the React Application
            * Pull some data from our `MongoDB`
            * Then send that info back to our React app
* The Express API and React will communicate with each other entirely through HTTP Requests (or AJAX requests)
    - Each one of these requests will contain a small bit of JSON
* Express API and `MongoDB` also communicate with each other through an internal system that we won't cover

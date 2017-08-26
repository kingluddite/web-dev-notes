# Server Routes
![survey diagram](https://i.imgur.com/ChRZGgh.png)

* We will create a GET request to `/api/surveys`
    - When a user makes a request to this route, it will return:
        + A list of surveys created by the current_user
* Let's skip `/api/surveys/webhooks` for now
* When a POST request is made to `/api/surveys`
    - User uses this route to create a new survey
    - And have that survey emailed out to everyone they want
* Whenever someone makes a post request to this route, we want them to send along 4 pieces of data
    - `title` - the title of the survey the user will see in our app
    - `subject` - the subject line
    - `body` - text to show in the survey
    - `recipients` - comma-separated list of email address to send survey to
* Using webhooks
    - POST `/api/surveys/webhooks`
        + The purpose of the route is to receive feedback from the user
        + If the user clicks yes, that is the feedback we want to receive
        + The email provider will provide the actual click

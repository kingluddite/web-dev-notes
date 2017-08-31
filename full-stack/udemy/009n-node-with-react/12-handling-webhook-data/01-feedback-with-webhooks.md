# Feedback with Webhooks
* We need to show a list of all the surveys that have been created (Dashboard)
* We need to record a `yes` or `no` feedback when user clicks on their email

## How we receive feedback from the user
* We enabled click tracking inside the emails
    - We did that inside our Mailer
* Sendgrid replaces all links inside our email with their custom link
* Now Sendgrid knows who clicked on a link and which link they clicked on
* Sendgrid then sends us details about that click
    - This is known as a **webhook**
    - When one server makes some communication with another server because of some event
* Our API server needs to process that email from Sendgrid
    - And we will record in inside our `MongoDB`
    - This is what we'll dive into now

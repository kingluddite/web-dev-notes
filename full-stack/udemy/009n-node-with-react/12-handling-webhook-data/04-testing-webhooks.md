# Testing Webhooks
* We need to instruct Sendgrid that any time it receives some kind of click event from one of our emails it should send that data to a URL we provide (it will be our localtunnel subdomain)
* Log in to Sendgrid Dashboard
    - Go to `Settings` > `Mail`
    - Lots of stuff there
        + We want `Event Notification`
        + Turn on Event Notification but clicking the ON button
        + Then we need to provide an HTTP POST URL
            * This is where we want SendGrid to send user data every single time a user clicks on a link in their email (that we sent)
            * We will provide a URL of our localtunnel address
            * localtunnel will receive this address and then forward it on to our local machine
            * And then the request will be forwarded on to localhost:5000 which is our local Express server
            * Make sure you copy the right URL [by grabbing it from your Terminal](https://i.imgur.com/bjQBpeA.png)
* GOTCHA
    - We don't just provide the subdomain
    - We also have to provide the exact URL with the route that we want any of these webhook notifications to be sent to

![feedback route diagram](https://i.imgur.com/LK11Pjf.png)

* We will append the API route of `/api/surveys/webhooks`
* So it will look like this in the Dashboard `https://acsksielsegsesi.localtunnel.me/api/surveys/webhooks`

## Test Your Integration
* Click the blue button on Sendgred Notification settings
* This is important because it will let you know if everything is set up correctly
* Nothing will work yet because we did not set the `/api/surveys/webhooks` route yet

`surveyRoutes.js`

```
// more code
module.exports = app => {
  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);
    res.send({});
  });
// more code
```

* We just send a response of an empty object so we don't leave Sendgrid hanging on the request
* We want to see the payload inside the `req.body` that Sendgrid sends to us
* Now click the SendGrid blue Test Your Integration button and scroll to the top and you will see a green success message `A sample event notification will be sent to your endpoint shortly`

## LocalTunnel Crash Fix
* The localtunnel script appears to be crashing very often!
* A tiny script to automatically restart your localtunnel if it crashes.  Here's what to do:
    - In your root project directory, create a new file called `sendgrid_webhook.sh`
    - Inside of it, add the following code:

```
function localtunnel {
  lt -s YOUR_SUBDOMAIN --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
```

* Replace YOUR_SUBDOMAIN with the subdomain you picked!

Then in your `package.json` file, replace the "webhook" script with this:

`"webhook": "./sendgrid_webhook.sh"`

* Click the blue button again (it may take a minute)
* View your terminal and you should see a sample test coming from SendGrid

## What can Webhook track?
![diagram of webhook events](https://i.imgur.com/b6kcOjG.png)

* List of events
    - You can track when someone resubscribes to an email list
    - You can find out when someone unsubscribes from an email list
    - Anytime someone issues a spam report
    - Anytime an email fails to send properly (aka bounces)
    - Anytime someone `click` (we care about this)

    ![click event](https://i.imgur.com/f5AgonB.png)

    * We can see the email of the person
    * We can see the click event
    * We can see the URL of what they clicked on (this will give us `yes` or `no`)

## Woops!
* We only tested the webhook on Sendgrid
* We need to do two more things to get it to work
* We need to specify which action we want to send a webhook notification on
* We only care when someone clicks on an event in an email
    - Check the `Clicked` checkbox under **SELECT ACTIONS** of Sendgrid Mail section
* We also need to click the blue checkbox (scroll up) to finalize the webhook

![blue checkbox](https://i.imgur.com/Dz8Pnc4.png)

* If you did everything correctly, you will see `ACTIVE` beside `Event Notification`

![active](https://i.imgur.com/j69nanI.png)

## Caution
* In Sendgrid you can not set up two different webhook URLs for production and development
* So when we go to production we'll need to update this webhook URL

## Test
* Let's go through the survey process to see what our event from SendGrid will look like

1. Create and send out another survey
2. All our previous emails did not have webhooks set up so they won't work
3. Open email and click `Yes` link
4. After clicking on email view your terminal and you may have to wait 30 seconds to a minute to see your object from SendGrid

* I receieve the event from SendGrid
* Inspecting it
* You will see the event has a type of `click`
* You can see who clicked on link `email` property
* And we get the URL the user tried to visit
* Nothing in this event tells us anything about the survey the user was responding to
* We also don't know if the user clicked on `Yes` or `No`

![Sendgrid Diagram](https://i.imgur.com/SMhn9xW.png)

## We have two problems
* We don't know which survey the user clicked on
* We don't know which answer in the survey the user clicked on
* We can't rely on email to determine which survey the user clicked on
    - User emails can be on more than one survey we send out

### Solutions
![solution](https://i.imgur.com/eQWHvRs.png)

* We can add a survey id and end the route with their choice
* We'll update the route to be `/api/surveys/:sid/:choice`

## Test
* Fill out survey
* Send it out
* Open email
* Click Yes
* We get error (we need to update our route)

## Next
![survey id and choice](https://i.imgur.com/EhNwmMi.png)

* We have the id of the survey and the choice
* Now we just need to extract the data

# Webhooks in development
![Sendgrid webhooks diagram](https://i.imgur.com/gih1Ujr.png)

## Lifecycle of Sendgrid lifehooks
* User clicks link (in short succession many users click many links inside many emails)
* For everyone of these clicks, Sendgrid records that event
* Sendgrid doesn't call our sever every time a user clicks a link
    - Instead Sendgrid waits
    - In some interval of time (every 30 seconds, or every minute)
    - Then Sendgrid makes a single request to our API and says, "in the last 1 minute here are all the events that occurred tied to your emails"

## How webhooks work in Production
* It is easier to discuss this topic then development

![webhooks production diagram](https://i.imgur.com/kQJrJtz.png)

* Every 30 seconds or so, Sendgrid will make a request to our Express server
    - With a list of all the different clicks
* Sendgrid will make a POST request to `ourdomain.com/surveys/webhooks`
    - This is the route we give it
    - Because our server is listed at a specific domain, this is what makes webhooks in production easy to understand
    - It is a server that is available to the outside world
    - Sendgrid has no issues making a POST request to a public domain
* We process list of clicks on API

## Webhooks in Development
* Here thinks get tricky
* Our local laptop is server at `localhost:5000`
* And when Sendgrid tries to make post requests to `localhost:5000` it has issues because that address is not public and is just available to our own machine
    - Your localhost:5000 is completely different than my localhost:5000
* Sendgrid does not have the ability to reach out to my laptop and make a post request to my running development server
    - We could create a custom network setup to make this work
    - But that would be different for every user
    - That is a complicated setup
    - We need a more clever solution

## localTunnel
* This is a package that will give us our more clever solution
* localTunnel diagram

![localTunnel diagram](https://i.imgur.com/bYVPIPZ.png)

### Life with localTunnel
* We are still in development
* We have two worlds
    1. Everything running on the outside world (web)
        * Whenever Sendgrid makes a request to our server
        * We will tell Sendgrid to send that POST request to the domain `localtunnel.com`
            - This is a special API/service that we can make use of for free to automatically handle webhosts inside the development environment
            - We will tell localtunnel.com that if they every receive a post request to the domain of something like the subdomain of `webhookhelper.localhosttunnel.com` then they should take that request and they should automatically forward it on to a local tunnel server that is running on our local laptop
            - We'll then tell this local server to forward this request on to `localhost:5000`
            - This works because we will set up a local server that automatically communicates with `localtunnel.com`
            - So there is a lot of back and forth traffic that happens between the `localtunnel` **subdomain** and the localTunner server running on my machine
    
    - 2. Everything running on our local development laptop

* **Note** Webhooks are notorious for being challenging to setup in local development environments
* There are lots of products that do the same thing as localtunnel
    - We are using localtunnel because it is free and easy to setup
* [localtunnel documentation](http://localtunnel.github.io/www/)

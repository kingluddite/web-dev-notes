# Identifying Unique Users
![email diagram](https://i.imgur.com/mcxvVdy.png)

## Good way and Bad Way
* We will look at two ways to send an email off to an email provider
* We'll first look at the bad way

### The Bad Way
![the bad way to send emails to 3rd party](https://i.imgur.com/2E17gtW.png)

* We could create a separate Mailer object for every recipient in our mailing list
* We could then send that Mailer object off to our email provider and then our email provider could send off the email
* Why is this a bad approach?
    - This would generate possible 200,000 requests to send one survey!

### The Better Way
* Take all Recipients and make one Mailer object and then generate one HTTP request to our third party
    - This would be a `batch` operation

![the good way](https://i.imgur.com/Z34W4TC.png)

* We'll make one Mailer object for all our Recipients and then use one HTTP request to send our Mailer object to our 3rd Party Email Provider

#### How does this approach affect our app?
* It affects our app in a BIG way
* Let's look at the cons of `The Better Way` and figure out how we'll address them in our app

![survey email](https://i.imgur.com/fGKsnnD.png)

* We have one Survey Instance and one Email Template
    - What's the downside to using the exact same template for all our recipients?

![how to id user email](https://i.imgur.com/nIILkHA.png)

* We won't be able to id the individual users
* How can we tell which user clicked on which link?
* In a perfect world we could make the link pass data when clicked

![id user in email](https://i.imgur.com/UtS9HXb.png)

* `ourdomain.com/surveys/feedback/111/no/use@example.com`
* But since everyone is getting the exact same email, we can not id the user and their answer via the link
    - We can not put any identifying token inside the link because every recipient gets the exact same email

## SendGrid - Our Email Provider
* [link to SendGrid](https://sendgrid.com/)

![using SendGrid](https://i.imgur.com/auIOhU1.png)

* When SendGrid sends out emails for us
* It does something behind the scenes for us
    - For each user sendgrid will send to they will look at the body of the email and they will look to see if any links exist inside that email
    - Our email will have links (yes and no links)
    - Whenever SendGrid sees a link they automatically replace the link with a customized link that sends the user's to their own servers
        + Regards of what URL's we put inside the email links, the links will go to SendGrids servers instead
            * They do this to find out what links people are clicking inside the emails they are sending out
        + So first the user clicks the link in the email
        + The user is taking to SendGrid, they record the info
        + The user is then taken to the original destination of the email links

## How can SendGrid do this?
![SendGrid diagram](https://i.imgur.com/JCND1wE.png)

1. We tell Sendgrid to send an email
2. Sendgrid scans the email
    * They will replace every link with their own special link
    * (Sendgrid knows who the recipient of every email is! The links they inject into the email contains a token that 'ids' the user!)
3. User clicks a link
4. Sendgrid knows who clicked it!
5. User sent to their destination and Sendgrid sends a message to our server telling us about the click, and the email address of who clicked on it
6. User Happy
7. This process saves us from not knowing who clicked on a link

### What is a webhook?
* When Sendgrid sends a message back to our server telling us about the user who clicked on which link is a webhook
* A webhook is anything where some outside API is kind of facilitating some process and then gives our app some type of callback or some type of notice that some event has just occurred

![webhooks route](https://i.imgur.com/kefkEhQ.png)

* This route `/api/surveys/webhooks` is a route that only Sendgrid accesses
* Sendgrid at some integrals is going to be sending us notifications saying "Yo, someone just clicked on one of your links and here's the information about it"

# App Overview
* Build one single project
* Send bulk emails to users to collect info for feedback to improve their site

## Stuff we need
* App to send out bulk emails
* We need billing
* We need authentication

![feedback diagram](https://i.imgur.com/kKOEB89.png)

## App Flow walkthrough
* Feedback collection Application

## Steps and Tech Stack
* ![Steps in app](https://i.imgur.com/FGcjy4i.png)

1. User signs in using Google OAuth (_Express server + `MongoDB` + PassportJS_)
2. Our client pays us money to send out all these emails (_Stripe + `MongoDB`_)
    * After user signs up, we want them to pay us some money
    * We won't use subscription based payments
    * We will use credit based payments
        - They pay for a certain amount of emails
        - The user will pay using **stripe**
3. User creates a campaign (_React + Redux_)
    * The user will create this campaign that will send emails out to people
    * User will enter a list of emails that they want to send their survey to
        - (_React + Redux + Redux Form_)
    * User is product owner or startup owner
4. We then create the email to send to all of those surveyees (_Email Provider_)
    * In email will be link
    * surveyees click on link and then answer questions to give us feedback (_Email Provider + Express + Mongo_)
5. We will tabulate that feedback (Mongo?)
6. We will generate report of all survey responses (Mongo + React + Redux)

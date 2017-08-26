# Creating Mailers
* We are currently working on the POST request route handler
    - `/api/surveys`
* We are creating a new survey
    - It also is used to send out a big email

## Dive in
1. How are we going to create and send this email
2. Make sure we understand what we are going to do in the routeHandler
3. Make sure that when user clicks on survey email buttons, we understand (somehow) whether they clicked `yes` or `no`
    * And we attribute some feedback to the survey this email belongs to

## What we are going to do inside our `/api/surveys` routeHandler
![surveys route handler](https://i.imgur.com/Qs6jXKb.png)

1. Create a new instance of a survey (done!)
2. Add code to create and send off an email
    * This email will be sent to every single recipient inside the survey
3. (After we attempt to send out the email) Was the email sent off successfully?
4. If we did send email successfully, we'll then save the survey into `MongoDB`
5. Done! Survey handler complete!!!

### How we create and send an email
![create/send email diagram](https://i.imgur.com/3Dvdcg9.png)

* The survey instance kind of describes the email we want to send out
    - It records the:
        + subject line of email
        + The body text
        + And a list of recipients of who should receive this email
        + (that is just the data layer)
    - We also need code to describe the two `yes` and `no` buttons in the email
        + We need to make sure they are links
        + And we need to make sure our email has nice CSS styling too!
        + This will be the purpose behind the **Email Template**

## The Email Template
* The Survey instance holds the data
* The Email Template holds the structure of our email (the presentation layer)
    - The look or design of the email
    - It will be a blob of HTML that describes what the body of the email should look like

## Mailer Object
* Once we have both the Survey Instance (data) and the Email Template (style)
    - We'll merge the two together
    - This Mailer Object represents one single email that we want to send out as a list to possible people (1 person or 1000 people)
    - Think of a Mailer as a **helper** that helps us generate and send an email to lots of people

## Email Provider
* We send the Mailer object Via HTTP request to our outside 3rd Party email provider
* We'll send off the email to our Email Provider
* We won't be interfacing with a email server directly
    - Instead, we'll make use of an API that will help us to automatically send out all these emails in our recipient list

## Outcome
* Eventually each recipient should see this inside their mailbox

![email mockup](https://i.imgur.com/IfoZpHd.png)

## Next
* Dealing with how we send our Mailer to the Email Provider
    - Complicated subject!

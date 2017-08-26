# Survey Overview
* We are building the survey endpoint on our API

## Survey Flow
![survey flow diagram](https://i.imgur.com/vZKgvb1.png)

1. User creates survey with simple yes/no question
2. We then send survey to our backend API
3. Express will take that survey and create an email template from it
4. The Express server will use a 3rd party email provider to send out a big email blast to all the people who are supposed to getting the survey
5. The people who receive the email will click `yes/no` to the question in the given survey
    * When use clicks yes/no on email question
    * Our 3rd party email company who is sending out the emails, will be the one who notes whether or not the user clicked yes or no
6. The email provider sends note to our Express server
    * They tells us "yo, someone just clicked a link and they said yes on this survey question"
7. Our Express server will record that feedback in `MongoDB`

## Sample Email mockup
1[sample survey email mockup](https://i.imgur.com/4WNqhQB.png)

* The email subject should be able to be customized
* The `from` field of email should be customized as well too
    - Whoever is creating these surveys is the one getting these emails
* The body of the email can be customized

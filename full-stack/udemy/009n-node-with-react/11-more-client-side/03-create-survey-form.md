# SurveyNew Component form
![SurveyForm mockup](https://i.imgur.com/jcL47ud.png)

* Overall form we're navigating to is `SurveyNew`
    - This will be a big container Component
* The Form itself we'll call `SurveyForm`
* Each individual field will be called `SurveyField`
    - Survey Title
    - Subject Line
    - Email Body
    - Recipient List

## Safety Net
* We don't want to have the user's hit Submit and then send out emails
* We need a way for the user to verify their data and then submit
    - Solution:
        + Give them the opportunity to review their data on another form
        + Make a new Component called `SurveyFormReview`

![SurveyFormReview mockup](https://i.imgur.com/VIfG5di.png)

* So now our form will have two separate screens (steps)
* This will also show us how to handle multi page forms
* `SurveyNew` will have logic to advance to `SurveyFormReveiw`

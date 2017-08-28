# Purpose of Redux Form
![SurveyNew mockup](https://i.imgur.com/5WpWeqG.png)

## Why are we using so many Components?
* So the form can easily be changed in the future
* If we build it all in one Component (we easily could), the code would be long and nasty

## How are all the form Components work together
![form Component relationship diagram](https://i.imgur.com/Z6sxgCf.png)

* At the top we have our `App` Component
    - It has our `React Router`
    - We have our logic to show the SurveyNew Component
        + Will be a wrapper for
            * SurveyForm
                - The purpose of this form is just to wrap and display all these fields (labels and inputs the user types into the form)
                    + `SurveyField`
                    + `SurveyField`
                    + `SurveyField`
            * SurveyFormReview
                - User makes sure their data is correct

### The relation of data of our form
![relation of form data diagram](https://i.imgur.com/83t1bl5.png)

* User types data into `SurveyField`
* We need to take that data and transfer it over to `SurveyFormReveiw`

## How would we approach this problem if we were just using React
* No Redux
* No Redux Form

### Lowest common parent
* To get data from SurveyField to SurveyForm Review we would have to store the data in the `lowest common parent` Component which would be `SurveyNew`
    - So `SurveyNew` would store all the inputs and it would pass down that data as `props` to the `SurveyFormReview`

#### That gets nasty!
* Every time we a user enters data into the form field `SurveyField` we have to somehow figure out a way to send that data back up to `SurveyNew` so that it can pass data back down to `SurveyFormReview`
* It is not easy
* Communicating data from `SurveyField` to `SurveyFormReview` is tough and that would translate into nasty looking React code

##### Solution: Use Redux
* In Redux world communicating from `SurveyField` to `SurveyFormReview` gets a lot easier
    - Every single time a user enters data into `SurveyField`, that will call an `Action Creator` and updates the state in Redux

![redux and input fields](https://i.imgur.com/ZXqvb6z.png)

###### Then if we do that we can communicate data easier
* We then can have `SurveyFormReview` use **connect** to pull data out of Redux

![pull data out of Redux with connect](https://i.imgur.com/Q0lRcmS.png)

* This is at the core of Redux
* This is the whole purpose behind using Redux
    - Put all of our data at the very top and allow any Component inside of our hierarchy to pull data out of that store
        + This avoids dealing with using a complicated system of pushing data to some parent Component and then passing down that data to child Components using props

###### Houston we have a problem!
* If we just use Redux that means we have to create a bunch of new `Action Creators`
* We would have to create a new `reducer` inside of our Redux store
* We would have to wire up the `SurveyFormReview` and attach that `mapStateToProps` to it
* We would have to figure out how to add in custom validation logic
    - We need to check data user enters before they send form over to `SurveyFormReview`

### This is where Redux Form comes in
* It is around to save us time from having to create all the items mentioned above

#### What does Redux Form do?
* It wires up the `Action Creators`
* It is putting the data into the Redux store
* It is pulling data out and getting access to that data inside other Components in our app
* And it does it all for us automatically
* Redux form is creating nothing new it is just around to save us the time of having to do it ourselves

#### How does Redux Form do this for us?
* Through a couple of helpers

#### Should I always use Redux form?
* No
* Redux Form is overkill for simple forms
* But any advanced type of forms, use Redux Forms

### Redux Form internally
![Redux Form internal process diagram](https://i.imgur.com/gUIKbmn.png)

* We use Redux to create our store
* The Store is where all the data lives inside our app
* We modify or update that data through the use of our reducers
    - We only have one right now called `authReducer`
    - We will add and wire up a reducer called `formReducer`
        + `formReducer` is managed entirely by `ReduxForm`
        + It records all the values from our form automatically

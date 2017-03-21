# Learning Meteor

[github repo](https://github.com/StephenGrider/MeteorCasts)

## Mockup
We will [build this](https://i.imgur.com/xZkOIvo.png) in Meteor

* Not pulling from 3rd Party API
* Our own data using thousands of users
* Devise paginate (_aka lazy load_) the users when we need them
    - When user **clicks** 'load more' button
        + When clicked, Meteor should grab next batch of user and load it onto our page (_result set_)

## Components we'll need
* ProfileList
* Profile Component

## Challenges
* Need a place to store our **data**
* Need to somehow generate this **data**
* Must assume that we have thousands of entries and we only want to send a small subset to the client at any time
* Need a way to load more **data** when the user clicks "Load More" button



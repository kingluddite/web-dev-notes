# Dev and Prod Keys
* Having one set of all these keys will lead us into trouble

## Two Set of Keys are Better than One
![dev and prod keys](https://i.imgur.com/Wy1drdB.png)

* In Dev world
    - Your laptop
        + keys for
            * `MongoDB`
            * Google API
            * Cookie Key
* Production Environment
    - Heroku Deployment
        + `MongoDB`
        + Google API
        + Cookie Key

### Two Reasons why this is a good setup
#### Reason # 2 - We can store all our Production keys remotely on Heroku servers
* All the Developer keys can still remain on our personal laptops
* Hate to say it but we all could at some point in time, lose our laptops or have them stolen
* Write now on my laptop I have a plain text file with all the keys for my app
* It is not impossible for someone to steal my laptop, get to my text file and steal my passwords to my production site
    - With the keys.js file open they could have direct access to
        + my `MongoDB` Database
        + The entire Google API (my slice of it)
        + And will be able to decrypt any cookies that I have issued to my users

##### If keys stored on Heroku for production, and laptop gets stolen...
* Then it doesn't matter if the laptop is stolen because `keys.js` only has dev info on it
    - I can just delete my test database and start over
    - I can create a new random cookie in a new git pull down of my app
    - I can regenerate my Google API key

#### Reason # 2 - You can have two separate copies of your `MongoDB` Database
* This is very important
* Whenever we deploy our Application to production we want to have a clean Database that only has our user's data
    - We always treat that as pristine data that we will never mess around with at any given time
* But in a Development world we can decide to:
    - Add records
    - Delete records
    - Delete collections
    - Create collections
    - We can change everything all we want without having any fear of accidentally breaking all of our user's production data

## Takeaway
* The vast majority, if not all, of all production Applications in the world do take a similar approach to this

## Refactor of our environment variables
![refactor env variables diagram](https://i.imgur.com/ItcXqyD.png)

* Inside of our `keys.js` we will NO LONGER STORE all of our RAW API keys
* We will just ask a question
    - Are we running in our development environment or our production environment
    - Depending on the answer, we'll return a different file

## Next
* We will have to set up a separate:
    - `MongoDB`
    - Google API key
    - Cookie Key


 

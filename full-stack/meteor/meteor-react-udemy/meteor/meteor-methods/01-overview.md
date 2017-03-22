# Meteor Methods
CRUD for data sitting in MDB

pub sub used to read data
met methods used to maniupluate data

## Our app
[bitly](https://bitly.com/)

link shortening service

people have a long url and they want to shorten it to easily share on sites like twitter and facebook

### what we will build
Users will enter a url and we will return to them a shortened version of it

![mockup](https://i.imgur.com/B3wFFM5.png)

* have input to prompt the user to enter so our app can shorten it
* localhost:3000 will be the url we show
* number of times link has been clicked (number of times someone has followed this link through and been redirected by our application)

## Challenges
* Need a way to store links
    - long form and short form URL will be stored as a pair
    - we want urls to persist (leave site and come back to it later on)
    - we will create a collection to store our data, any urls user enters will be stored in `links` collection
* Have to discover a way to 'redirect' a user from a shortened URL to the original one
    - when someone goes to a url, our server has to be hit with a HTTP request, we have to recognize that this is a user that is trying to visit a short link and then somehow redirect them over to the long link
* Have to record a click whenever a user gets redirected

## Plan Out all components our app will use
![components plan](https://i.imgur.com/CXNXbnf.png)

Take the time to sketch out on a piece of paper all the components your app will need
* App component - acts as a container, parent of all components that pulls all aps in with not much logic inside it
* Header - warm up component - super simple component with just text
* LinkCreate - form with input, label and button
* LinkList - will have 3 columns (_original url, shortened url, number of clicks_)

### Two different flows
![diagram](https://i.imgur.com/6GLLMJJ.png)

#### Flow One
Link Creation Flow - Users wants to make a short link
they navigate to our application (localhost:3000)
    * in the wild it would be mylinkshortener.com or something like that
when they hit our app we want them to see the react app (this is key)
    * i hit localhost:3000, then I hit the media server, and then I get my react app rendered and then react app gets placed on screen

#### Flow Two
Link Usage Flow - User clicks a short link
* When user click on our app, they will first come to our server (localhost:3000)
* localhost:300/a83kd0 -> meteor -> target website
    - url has a **token** of 'a83kd0'. Look in `Links` collection to see what long URL that maps to
    - token will be unique
    - 1 to 1 pairing with long urls and tokens
    - do they need to see our react app? do we need to render any html to the screen? no, they don't. whenever someone visits our app using the target url, we want to skip our react app entirely
        + because - the react app takes time to load up, we have to send user back an html doc, load up JavaScript, react has to boot up, all this stuff takes time to happen but in reality, all the user wants to happen is get redirected as fast as possible to the target website

So in one flow we do need React but in the other, we do not

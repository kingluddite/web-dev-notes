# Create App that will serve 3 purposes
1. Solidify our knowledge of React
2. Get more familiar with Redux
3. How to make async calls with Redux (_like Ajax requests as an example_)

## App Wireframe
![weather app](https://i.imgur.com/r12RJmb.png)

## What we are building
Weather Forecast browser

## The purpose of our app
* User will be able to search for a city

![search city wireframe](https://i.imgur.com/iXe8ENX.png)

* When city is submitted, we will send query to 3rd party API
* 3rd Party Weather API will return response of 5 day weather forecast
* We will handle response by rendering a row about that particular cities forecast for the next 5 days
* All cities that are searched will be added as an additional row (_storing the weather searches by city per row_)

col1: City | col2: temperature | col3: pressure | col4: humidity

As values for each we will do a simple line chart

## Challenges
### Challenge #1

#### How to make Ajax requests with Redux
- With YouTube app we did Ajax request right in event handler of our component
- We did that because we only had React and didn't have Redux to help manage our `Application state`
- With **Redux** we need to center all of our logic into **Reducers** and **Actions** as much as possible and our **React Components** are only responsible for showing data, they are not responsible for fetching data at all
    + They can tell **Redux** to go fetch data, (_like "someone just clicked on the search button, go fetch some data Redux"_)
    + But in general our **React Components** will not make any **Ajax** requests whatsoever. We will rely 100% on **Redux** to do that for us

### Challenge #2
We need to figure out how to do our line chart

![our line chart](https://i.imgur.com/PFZWhzH.png)

* We will use a 3rd party Library to draw the chart for us
* We will need to figure out how to work with another **React Component** that has been created by another developer and integrate it into our own project

### Challenge #3

#### Gathering `state` over time
How to deal with a **Redux Application** where our `state` changes significantly over time
* Our last **Redux** app was fairly static. We had a set array of books and the only thing that ever changed was the active book
* Now we will be changing our `state` significantly, each time a user conducts a search we will add a new city so we will not be replacing an array of cities we will be adding onto that array (_Before we had an active book and when we clicked on another book, we knocked off that book and just replaced it with another book_). Now we will be gathering `state` over time

### Install starter boilerplate
`$ git clone git@github.com:StephenGrider/ReduxSimpleStarter.git .`

### Install our project dependencies
`$ npm install`

### Start our app inside our development server
`$ npm start`


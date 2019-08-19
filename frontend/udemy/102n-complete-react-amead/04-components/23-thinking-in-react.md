# Thinking in React
* We will go through 2 examples and talk about how to break them up into small logical, reusable chunks

## What is a React Component?
* Just think of it as an individual piece of the UI

## Why Components?
* We won't just write one page filled with JSX
* Instead let's take the Header - it's used on every page
    - They create one Header Component and use it on all Private pages
    - This is better than writing Header code 25 times if you have 25 pages

## Example #1 Twitter
![twitter page](https://i.imgur.com/4wom7GG.png)

* We'll draw boxes around parts we'll make as components
    - Header
    - Profile
    - Trends
    - Tweets
        + If we have 6 Tweets this box will be created 6 times
            * Yes the data inside them will change but the structure, the underlying JSX is identical
                - We did the same thing here when we did our individual list items for options
                - All of them are list items with the text dumped inside although the text changes
* We are just creating custom HTML elements (technically we call them React Components)
    - So for our Header components we'll call it `<Header />`
        + Wherever I use `<Header />` in my app I get access to all the behavior of that component
* Here are all the components for Twitter

![All Twitter Components](https://i.imgur.com/iHWWl2G.png)

## Where do we put all these components?
* In a parent component
    - We could call our parent component `<DashboardPage />` and all our components go inside `<DashboardPage />`
        + And all the details of the children components are extracted away and DashboardPage really doesn't care about them

![DashboardPage wrapper component](https://i.imgur.com/AUO6aYa.png)

## Breaking up Trends
* We could break up Trends into their own components - something that can be reused

![reuse Trends](https://i.imgur.com/w9XjUiS.png)

* Trends would be parent
* Trend would be child

![Twitter Trends parent Trend child relationship components](https://i.imgur.com/HwxEahv.png)

## Indecision App we'll be building
* We'll break up the final UI for indecision

![indecision app](https://i.imgur.com/bbhAVPk.png)

### Components (Pieces) of our app
* Header
* What should I do button? (We'll call this component Action)
* All our options - The `Options` component
    - We'll create an `Option` component to hold all the individual options we use
    - Keep in mind that `<IndecisionApp />` wrapper does not render `<Option />`, instead `<Options />` renders `<Option />`

![individual options](https://i.imgur.com/E1bqQEo.png)

* Our form - AddOptionForm - The AddOption component

![IndecisionApp diagram of components](https://i.imgur.com/iANqE2F.png)

#### We need a wrapper component
* We'll call that IndecisionApp
    - It will be the parent component that renders all child components

![wrapper components](https://i.imgur.com/RHH4YvL.png)

## A better representation of our app structure
![app tree structure](https://i.imgur.com/xuNJl2w.png)


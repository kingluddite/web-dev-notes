# The Gist of Redux
![diagram of Redux](https://i.imgur.com/PzBN2Cg.png)

* Redux is a state manager
* It is meant for larger applications
* It is not the only state manager
* You also have the `context API` built into React
* But since we are using a lot of Reducers Redux is best (just a personal preference at the end of the day)

## Component level state
* We have component level state already with our Login and Register forms
* The input data gets put into the component level state

## But what about app level items
* Like:
    - authentication
    - profiles
    - posts
* All of the above will be "app level state items" that we want people to be able to access from anywhere, from any component and that is where Redux comes in - because it gives us "app level state"
    - Think of Redux as a cloud that floats over our application that we can submit `actions` to through events and then we can get data to fall down into a component
* Diagram just focuses on the profile side of things
    - The profile data we get from the server will be put inside a Redux "store"
    - We'll fire off an action to fetch the data and that gets put into the store
    - **once again** Think of the cloud as the Redux store
    - And from any component we can call an action that will do something
    - **example** Let's say we want to update a profile
        + It goes to the server, it makes the update on the server and the Database
            * We'll get a response
            * And then what we want to do is update our UI (anything that needs updating - any component at all)
                - This happens through a "Reducer" (it is just a function) that takes in an "action" (We can dispatch an action to the Reducer)
                - The Reducer than decides how to handle the state and how to pass it down to the components in the UI and it will update any components that use that piece of state (this prevents us from having to pass things around from component to component - which would have to do if we weren't using a state manager like Redux)

## Steps in Redux
1. We call an Action
2. We dispatch an Action to a Reducer (we'll have multiple reducers)
3. That Reducer will decide what to do with that state
    * Like:
        - Are we deleting a post
        - Are we updating a profile
        - Whatever it is we're doing
4. Then it will send that state back down to all the components (any components that need it)
    * Example:
        - It could be our Profile component
            + And we could have inner components (aka child components)
                * Like About, Experiences, Education
                * All this stuff comes from the profile state

## What Reducers will we have?
* We'll have a `auth` Reducer (will handle everything to do with authentication - on every single load of the App component we want to check for a user (aka load a user))
* We want to hit our backend `api/auth` endpoint and see if we're logged in (see if there is a token stored and see if we're logged in)
    - If we are then components will react to that
        + Example:
            * The Navbar will have certain likes like `logout` if we are authenticated (logged in) and Dashboard (private pages)
            * If we are not logged in it will show Register and Login (public pages)
            * So our Navbar component will react to whatever is in that state
* We'll have a `profile` Reducer (that will handle anything to do with Profiles)
* We'll have a `posts` Reducer
* We'll have an `alert` Reducer
    - We want to set alerts and have alerts show on the screen whether there is an error or a success message
    - And then we'll have another Action to remove the alert
    - We'll do the alert Reducer first because it is the easiest as it only has 2 actions

## If this is confusing - Redux dev tools are a godsend!
* Make sure you have the Redux dev tools installed in your browser
* Know that the Redux dev tools will help clear up some confusion as they help you visualize what is going on
    - They show you the actions that are being fired off
    - They show you all the data that is in the state

## Next - Creating the Redux store

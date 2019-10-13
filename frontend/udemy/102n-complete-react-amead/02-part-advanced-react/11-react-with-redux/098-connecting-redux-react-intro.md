# Intro to Connecting Redux and React
* This will allow us to create "connected components"
    - This is a React component that is connected to the Redux store
    - When we do that our components will be able to do 2 important things:

1. Components will be able to fetch data off of the Redux store so they can render something to the screen
    * When that data that they fetch changes the components using them will automatically get re-rendered so we'll always have the UI up to date with the latest changes to the Redux store
2. Dispatch actions from our React components
    * So if we have a React component with a form
        - An end user can submit the form and the React component can dispatch the necessary action to change the store's data

## Next
Figure out how to link React and Redux

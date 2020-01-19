# Section Intro: Testing React Components
* Learn how to set up an automated test suite to test your React apps

## What is the value of testing react apps?
* To verify that your entire application works by running a single command and waiting about 6 seconds

## Test cases
* We will write "test cases"

## What are test cases?
* "Test cases" are functions that have code inside of them designed to test specific things about your app
    - Examples:
        + One test case that uses code to render a react component with a given set of props
        + Then we write other code to verify that what it rendered is correct
        + We could also write test cases that render a react component and then interact with it
            * We can use code to type things in input fields
            * We can submit the form that a component renders
            * And we can verify that the component takes the correct action
                - Whether it is dispatching an action to the Redux store (or doing anything else)

## But can't we test all this stuff manually?
* Yes
* Many newbies think testing is a waste of time
* This could not be further from the true

## The goal of setting up the test case
* The goal is not to test something that we can't test manually
* Everything we are testing here could be testing manually
    - We could open the browser and submit a form and check that it is working
    - We can click links/buttons to delete some data and make sure it works correctly and use our eyes to make sure it works
* But setting up automated testing is solely to improve that process as our app grows
    - It will take more time to manually test our app
    - It will reduce human errors
    - It will help prevent bugs from getting into our apps
* This gives us the developer a lot of confidence 
* We'll have a test suite that can verify that our entire app is still working as expected
    - As we write new features our test suite will automatically be running in the background and this will let us know that what we are coding now is not affecting some random piece of code somewhere else
    - Knowing that new code hasn't broken our app is a powerful thing

## Do we have to write code to test
* Yes and that will take some time
* But the good news is once we write a test case we can use it over and over again dozens a time a day
    - And this is what happens with real apps
    - We're always writing new features and we're not going to have the time to manually test each new feature and edge case by hand as we want to make and deploy small changes to our application

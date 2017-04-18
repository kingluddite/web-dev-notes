# Meteor and React Developer Tools

## [Eslint with React and Meteor](https://github.com/Firfi/meteor-react-bootstrap/blob/master/.eslintrc)

`.eslintrc`

```
{
  "env": {
    "browser": true,
    "node": true
  },
  "ecmaFeatures": {
    "jsx": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "comma-spacing": 2,
    "key-spacing": 0,
    "no-underscore-dangle": 0,
    "no-unused-vars": [2, { "vars": "all", "args": "none" }],
    "no-var": 2,
    "object-shorthand": 2,
    "quotes": [2, "single", "avoid-escape"],
    "react/display-name": 0,
    "react/jsx-no-undef": 2,
    "react/jsx-uses-react": 2,
    "react/no-did-mount-set-state": 2,
    "react/no-did-update-set-state": 2,
    "react/no-multi-comp": 2,
    "react/prop-types": [2, { ignore: [children, className] }],
    "react/react-in-jsx-scope": 2,
    "react/self-closing-comp": 2,
    "react/wrap-multilines": 2,
    "react/jsx-uses-vars": 2,
    "strict": 0
  }
}
```

* Debugging code is a pain
* It can take you hours. You stare at your screen. You pull out your hair.
* But as you debug more and more, you get better, faster and more efficient. 

You learn to write better code when you debug

## We have used
Chrome inspector **Element** and **Console** tabs

### We can use the `debugger` keyword inside our code
This will let us stop the program at a given point and explore the variables at that point in time

#### Add `debugger` inside our code
`AddPlayer`

```
// more code
handleSubmit(event) {
    const playerName = event.target.playerName.value;

    event.preventDefault();

    debugger; // add this line
    if (playerName) {
      event.target.playerName.value = '';

      Players.insert({
        name: playerName,
        score: 0
      });
    }
  }
// more code
```

### To debug or not to debug. That is the question
#### We need to do two more things in the inspector to get this to work
1. Make sure developer tools are open
2. The line of code has to run
    * We put our `debugger` inside our `handleSubmit()` function so we just have to make sure this function runs by manually adding a player

When you do that you will see:

![debugger](https://i.imgur.com/SrCpXWb.png)

### Pause and Play
We pause our program in the exact spot of where our `debugger` is. There is a **play** button to resume our program if we want to

The most useful information [is on the right](https://i.imgur.com/JqoLbhH.png)

## Where paused
We can see where the code is stopped:

![code paused](https://i.imgur.com/c7HCvpr.png)

## Stack Trace
We see the Stack trace

![stack trace](https://i.imgur.com/Z3VR41o.png)

## Local Variables
We see the local variables

* We have 'playerName'
* We also have the event

![event](https://i.imgur.com/tKt7ggy.png)

![local variables](https://i.imgur.com/1JTmPde.png)

If you hover over the variable names you will get some context

![hover context](https://i.imgur.com/bGAKpQE.png)

**tip** You can toggle the `console` by presses `esc`

### Use console
Let's use the JavaScript `.split()` method to create an array of our name and break it into two names based on the empty space

![split name](https://i.imgur.com/HXkyAxC.png)

Click `play` button to end **debugger** and get back to work

**note** Remember to remove **debugger** from your code or you will inadvertently stop your app every time you add a player

### Ignore this error
![WebSocket error](https://i.imgur.com/e1pg6xz.png)

This error happens because when we use the `debugger` keyword the frontend is unable to communicate with the backend. This is not a problem with your code. This is a side effect of stopping the browser for a minute. Just refresh the page to remove those errors

## Install Chrome's Meteor Dev Tools
![meteor dev tools](https://i.imgur.com/tvSEuQr.png)

## Install React Developer Tools
![react developer tools](https://i.imgur.com/QU9lVuJ.png)

After installing, refresh Chrome to see them inside your developer tools

## More about React Developer Tools
* You can see the Components and their `props`

![props in react extension](https://i.imgur.com/IXuEMUv.png)

* On the fly we can change the data
* Use `$r` to access that component in the console (_click `Show console drawer`_) or just click `esc` to toggle it

![console drawer](https://i.imgur.com/I76AQlo.png)

![$r](https://i.imgur.com/Upyw6B7.png)

### View all props
![$r.props](https://i.imgur.com/CmPt3GE.png)

**note** `$r` is just like `this` keyword in method. It gives us access to that instance of the Component

### Dive into the Component tree structure
![tree](https://i.imgur.com/pCrFFxE.png)

We could dive into **Player** and see its `key`, `ref` and `props`

![player diving](https://i.imgur.com/Jae5Vig.png)

## The Meteor extension tab
![meteor tab](https://i.imgur.com/92hfIwg.png)

### Security
You will see warnings. We can ignore them for now but we will eventually address them all

![warnings](https://i.imgur.com/jBMm2TC.png)

### MiniMongo
![minimongo](https://i.imgur.com/tVJmY5W.png)

* You can query players where the `score = 7`

![query](https://i.imgur.com/LMkuwpE.png)

* Query players where name is `'Jack'`

![query name](https://i.imgur.com/myZYkFJ.png)

## Blaze
We won't be using this because we are using **React** and why we installed the **React Developer tools**

## DDP - Distributed Data Protocol
This is what syncs up our local MiniMongo with the Meteor server side database (_The MongoDB database_) and then it syncs that up with all other connected `clients` who need to know about updates to data
![view DDP](https://i.imgur.com/rSrDfrk.png)

This lets us know what is happening between the `client` and the `server` (_All the communication that is getting sent over those Web Sockets_)

## Clear and present danger
Hit the clear button

![clear button](https://i.imgur.com/3b2DXNB.png)

Remove one player. Instantly four things occurred:

![four things](https://i.imgur.com/jFyXXGz.png)

1. We send out an event to the `server` with a message of **'method'** and this tells the `server` we want to do some updating

![send message](https://i.imgur.com/1VFGkTg.png)

* We have the `id` of the **player** and the method we want to use `/players/remove`. This is everything the `server` needs to make the change to our database
* Each one of our calls [has a unique id](https://i.imgur.com/FQc3DuS.png)

2. We get the result message

![result message](https://i.imgur.com/RqKLa8N.png)

* It uses the **id** from `step 1`

3. We'll talk about this later

4. Updates

![updates](https://i.imgur.com/yb0NTKg.png)

Let's you know all updates have been sent to you and you are good to go

Let's talk about `step 3`:

![collection](https://i.imgur.com/ZR9FPg9.png)

This does not just get sent to us, it gets sent to everyone who needs to be aware of updates. This lets other `clients` sync up their databases. That is how the user is automatically removed when we have the app open in a separate tab

## Exercise
Debug

* If you click the error it will open up the stack trace. The problem with this is this stack trace is not related to your code but to the libraries your code is using. So for the most part, in general [this stack trace](https://i.imgur.com/OLr6J7n.png) is not helpful
* What is important is the error line on the top right [error](https://i.imgur.com/z82CzwQ.png). If you click that link it takes you right to where the error is. Then you can open it up in Atom and start debugging
    - `TitleBar` has an instance of `TitleBars`
* Next error. Unknown DOM property `class`

## Mongo-Hacker
Make your mongo results sets auto pretty print

[Link](https://github.com/TylerBrock/mongo-hacker)

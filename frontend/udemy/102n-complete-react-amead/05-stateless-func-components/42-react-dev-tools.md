# React Dev Tools
* [download react dev tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
    - Chrome extension
    - After installing, restart Chrome to see React Dev Tools tab
    - icon at tob (hide as it's not too useful)
    - core functionality is in React tab below

## What does React Tools do for us?
* Gives us our JSX treeview

![react dev tab](https://i.imgur.com/pe3tVV2.png)

* You can see state and props for components
* If you add to state dev tab updates
* As your app grows it becomes necessary to search for components and this dev tab has a search bar
    - Search for AddOption
    - Submit with no options and you'll see error appear and the state is updated with that error
* Regular markup is shown in gray
* Tools are in dev and a bit buggy
    - You can edit state at runtime
    - But you can't add and remove items to state

## ==$r
* Follows us wherever we are
* It is a global variable that you have access to in the console
* It is set by the React Dev tools
* Any element we click we have access to the `$r` variable

### How to use $r
* Highlight component
* Switch to console and type `> $r`
* That will give you access to that element
    - You can view that components
        + props
        + state
* Not used much but good to know you have access to it

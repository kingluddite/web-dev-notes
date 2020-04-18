# Debugging our apps
## console.log() works but there is a better way

## Using the `debugger` statement
* `debugger` is supported by all major browsers
* You can use as many `debugger` statements as you want
* **tip** Instead of using a bunch of console.log() statements and switching back and forth, just drop `debugger` and it will trigger the debugging tools in our browser
* Just drop `debugger` anywhere in your code where you want to pause your app and figure out what variable values equal

`todo-app/todos-function.js`

```
// MORE CODE

  const hideCompletedTodos = filteredTodos.filter(function(todo) {
    // if hideCompleted is false show all
    // else show only incomplete
    return filters.hideCompleted;
  });

  debugger;

// MORE CODE
```

## Save file
* When browser restarts
* We get something similar but slightly different than what you would expect
* The page is still loading but we don't have our items rendered
    - That is because the browser has stopped the JavaScript execution at this point in time (before we render the data)
    - Now we can explore our data at this point in time
    - We can take a look at all the various variables and their values

### debugger working
![debugger working](https://i.imgur.com/60Wf69h.png)

* We can switch between various text files to see what makes up our app

### Toggle the `esc` key
* If we toggle the `esc` we can run various statements below
* Then you can type in console `todos` and you will see the todos in that array
* Then type `filters` and you can easily switch to see what's in that object
* Then type `filteredTodos` and you'll see what's in that array of objects at the point in time you paused your code

## Continue with app
* Just click the play button and the app will continue on and render your items in your todos

### Multiple debugger statements
```
// MORE CODE

  debugger;

  // find out how many todos still need to be completed
  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  debugger;

// MORE CODE
```

* We pause our script before we define `incompleteTodos` and in our console if we want to find it's value it is `undefined`
    - But we hit play to move to next `debugger` statement and type `incompleteTodos` and now it is defined with the todos

## Troubleshooting Debugger
* Why is debugger not working?
* It only will work if the dev tools are open, if they are not, it will execute the app as expected and the debugger in the code will be ignored

## Trying it out
* Drop the debugger into the hideCompletedTodos function
    - At pause find out what `todo` is equal to, it will be the first todo
    - Click play, and todo again and you'll have access to the second todo

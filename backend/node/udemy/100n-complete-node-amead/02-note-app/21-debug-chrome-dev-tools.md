# Chrome dev tools
* Use a flag

`$ node --inspect-brk`

* Tells node we want to run in inspect mode but we don't want to connect via the command line
* We don't want to see all that output
* We don't want to issue commands like `n` or `c`
* Just like last time we want to break before the first line

`$ node --inspect-brk playground/debugging.js`

* Only get two lines
* It doesn't tell us we connected yet because we haven't
* We will connect via Chrome

`chrome://inspect`

* Lots of different pages here
* We just need the `inspect` page

![chrome inspect page](https://i.imgur.com/BQM6T6x.png)

* You should have 1 remote target
* There is an inspect button (don't click that!)
  - Instead click on the `Open dedicated DevTools for Node` link
  - A window will open up
  - We only care about the `Sources` tab
  - esc keys lets you hide show console
  - console similar to repl (where we can run javascript)
  - file:// shows current file
  - big play blue button - does same as `c`
    + cmd + \ (keyboard shortcut)
    + Will continue until the program ends or we hit one of our break points
    + manually click to create break points
    + Do most of your node debugging almost always from the chrome dev tools

### nodemon with chrome dev tools
`$ nodemon --inspect-brk playground/debugging.js`



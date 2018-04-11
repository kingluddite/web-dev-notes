# Writing HTML with JSX
* Old way of concatenating string in JavaScript is a pain
* ES6 templating strings is a huge improvement but it is still a pain
* A better way is JSX

## What is JSX
* The ability to write JSX inside our JavaScript

## What if I didn't want to use JSX?
* Then your code would look like this and it will work

```js
class TeamPicker extends React.Component {
  render() {
    return React.createElement('p', {className: 'Testing'}, 'This is a test');
  }
}
```

## Multiple lines
* We need to return but we will be using multiple lines
* If we just have `return` it will never get to the next line and just return
* We need to use parentheses like this:

```js
return (
 // code all html we need here
 // code all html we need here
);
```

### Writing JSX --> Emmet expand
* Writing JSX can be annoying as the usual Emmet `tab` doesn't work

#### keyboard shortcut
**tip** When writing template strings inside JSX with emmet use this syntax before you hit `ctrl` + `e`

`ctrl` + `e`

* Using Emmet is a must for any text editor
* It is smart enough to convert it to JSX
  - class ---> className
* **note** Emmet is built into **Visual Studio Code** but you need to add this setting (`cmd` + `,`):

```
"emmet.triggerExpansionOnTab": true
```

* That will make hitting tab convert your Emmet shortcut syntax to full JSX
* Try it out!
* Here are instructions for using Sublime and Emmet with JSX support
    - You have to use the `ctrl` + `e` shortcut
    - [Wes Box video on this](http://wesbos.com/emmet-react-jsx-sublime/)

#### Emmet and Atom
[Use emmet tab completion in Atom](https://gist.github.com/mxstbr/361ddb22057f0a01762240be209321f0)

Add this to `keymap.cson`

```
'atom-text-editor[data-grammar~="jsx"]:not([mini])':
  'tab': 'emmet:expand-abbreviation-with-tab'
```

**note** - If it's not properly syntax highlighted, select `Babel ES6 JavaScript` or `JSX` as the syntax, this won't work otherwise
* Now tab completion works!

##### Atom `language-babe`l
* Make sure this is installed and active

## JSX has no `class`
* Uses `className` instead of `class`
* **class** but class is a `reserved` word in JavaScript and so React and JSX have disallowed it 

### JSX rule - Only one parent
* In JSX you can only return one parent element
* Workaround - Wrap a `div` parent container around both sibling elements
* **Fragment** is new way to avoid adding extra `div` in React

### What does this rule mean? 
```
// this is good
class TeamPicker extends React.Component {
  render() {
    return (
      <form className="team-selector">
        <p>This is Good</p>
      </form>
    )
  }
}
```

```
// this is bad (had 2 parents)
class TeamPicker extends React.Component {
  render() {
    return (
      <form className="team-selector">
      </form>
      <p>This is Bad</p>
    )
  }
}
```

* Because of this part:

```
<form className="team-selector">
</form>
<p>This is Bad</p>
```

* The second bad option above will generate a error similar to: `Syntax error: Adjacent JSX elements must be wrapped in an enclosing tag (8:6)`

## Close your tags - JSX Rule
* You must self close your tags

```
// BAD
<input type="text" required placeholder="This is not self closed">
```

```
// GOOD
<input type="text" required placeholder="This is not self closed" />
```

### Remember to close these tags when writing JSX
* input ----> `<input />`
* hr ------> `<hr />`
* br ----> `<br />`
* img -----> `<img />`

## Update TeamPicker.js

```
import React from 'react';

class TeamPicker extends React.Component {
  render() {
    return (
      <form className="team-selector">
        <h2>Please Enter a Team Name</h2>
        <input type="text" required placeholder="Team Name" />
        <button type="submit">Visit Team</button>
      </form>
    )
  }
}

export default TeamPicker;
```

### What it looks like in the browser
* No CSS yet but it is what it is

![app so far](https://i.imgur.com/86gzcGa.png)

## Comments in JSX
* Use this syntax

`TeamPicker.js`

```
// MORE CODE
<form className="team-selector">
    {/* Look here */}
    <h2>Please Enter a Team</h2>
    <input type="text" required placeholder="Team Name" />
    <button type="submit">Visit Team</button>
</form>
// MORE CODE
```

* Only when inside JSX do you need to use this syntax for comments
* When outside JSX and in JavaScript, use the standard `//` or `/* multi-line` comments
* Emmet makes this easy

**tip** Don't use JSX comments like this

```
// MORE CODE
{/* Look here */}
<form className="team-selector">
    <h2>Please Enter a Team</h2>
    <input type="text" required placeholder="Team Name" />
    <button type="submit">Visit Team</button>
</form>
// MORE CODE
```

The reason is it violates the `only return one parent rule`

### Add comments in Atom
* Have `React` and `language-babel` activated and you can comment out JSX code and your tab for emmet should work to (_if you added keybindings above for tab_)

# Writing HTML with JSX
Old way of concatenating string in JavaScript is a pain. ES6 templating strings is a huge improvement but it is still a pain. A better way is JSX

## What is JSX
The ability to write JSX inside our JavaScript

## What if I didn't want to use JSX?
Then your code would look like this and it will work.

```
class StorePicker extends React.Component {
  render() {
    return React.createElement('p', {className: 'Testing'}, 'This is a test');
  }
}
```

## Multiple lines
We need to return but we will be using multiple lines. If we just have `return` it will never get to the next line and just return. We need to use parentheses like

```
return (
 // code all html we need here
 // code all html we need here
);
```

### Emmet expand
`ctrl` + `e`

Writing JSX can be annoying as the usual Emmet `tab` doesn't work. You have to use the `ctrl` + `e` shortcut ([Wes Box video on this](http://wesbos.com/emmet-react-jsx-sublime/))

**tip** When writing template strings inside JSX with emmet use this syntax before you hit `ctrl` + `e`

`li.person{${person.name}}+p.age{${person.age}}` - Then hit `tab` and you will get the expanded JSX you expect

#### Emmet and Atom
[Use emmet tab completion in Atom](https://gist.github.com/mxstbr/361ddb22057f0a01762240be209321f0)

Add this to `keymap.cson`

```
'atom-text-editor[data-grammar~="jsx"]:not([mini])':
  'tab': 'emmet:expand-abbreviation-with-tab'
```

**note** - If it's not properly syntax highlighted, select Babel ES6 JavaScript or JSX as the syntax, this won't work otherwise

Now tab completion works!

##### Atom language-babel
Make sure this is installed and active

## JSX has no class
Just a joke. React has lots of class but class is a `reserved` word in JavaScript and so React and JSX have disallowed it. 

### You must use `className` instead
**note** - Update - emmet now adds `className` instead of `class`
~~But with Emmet you can use `ctrl` + `e` and it will automatically (if you are inside JSX file) type `className` instead of `class`~~

**JSX rule** In JSX you can only return one parent element

* Workaround - Wrap a div parent container around both sibling elements

What does this rule mean? Easy

```
// this is good
class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <p>This is Good</p>
      </form>
    )
  }
}

// this is bad (had 2 parents)
class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
      </form>
      <p>This is Bad</p>
    )
  }
}
```

The second bad option above will generate a `Syntax error: Adjacent JSX elements must be wrapped in an enclosing tag (8:6)`.

**note** Note how cool our terminal output error is. It is very clear and way more user friendly in letting us know about the error than before

**JSX rule** You must self close your tags

```
// BAD
<input type="text" required placeholder="This is not self closed">
// GOOD
<input type="text" required placeholder="This is not self closed" />
```

### Tags to remember to close
* input
* hr
* br
* img

```
import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name" />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;
```

### What it looks like in the browser
No CSS yet but it is what it is

![app so far](https://i.imgur.com/86gzcGa.png)

## Comments in JSX
Use this syntax

```
<form className="store-selector">
    {/* Look here */}
    <h2>Please Enter a Store</h2>
    <input type="text" required placeholder="Store Name" />
    <button type="submit">Visit Store</button>
</form>
```

Only when inside JSX do you need to use this syntax for comments. When outside JSX and in JavaScript, use the standard `//` or `/* multi-line` comments

Emmet makes this super easy!

**tip** Don't use JSX comments like this

```
{/* Look here */}
<form className="store-selector">
    <h2>Please Enter a Store</h2>
    <input type="text" required placeholder="Store Name" />
    <button type="submit">Visit Store</button>
</form>
```

The reason is it violates the `only return one parent rule`

### Add comments in Atom
* Have React and language-babel activated and you can comment out JSX code and your tab for emmet should work to (_if you added keybindings above for tab_)

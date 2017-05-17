# BEM Naming
Stands for: Block, Element, Modifier

* Naming convention
* Just one way to think about and structure your styles and selectors
* It's not a Library
* Its not a framework
* It's just a pattern you can use to create styles for apps

## Reading Homework
* [More info on BEM](http://getbem.com/introduction/)
* [BEM 101](https://css-tricks.com/bem-101/)
* [BEM and SMACSS](https://www.sitepoint.com/bem-smacss-advice-from-developers/)
* There are a bunch of other patterns

## _item.scss

```
.item
{
    margin-bottom: 1.3rem;
    padding: 1.3rem;

    border: 1px solid #e8e8e8;
    background: #fff;

    p
    {
        color: purple;
    }
}
```

* Our selector is too generic and it will style things we didn't intend to style
    - Add a player and see that it is also purple
    - Currently we are targeting all `p` tags nested inside `.item`
    - Coding like this will make you start to sweat small changes in the structure of your app and you'll start to wonder if you are breaking something else

## BEM - Block, Element, Modifier
* Block - Core building block for your web app
    - We currently have a red area, and two distinct white boxes

![blocks](https://i.imgur.com/3iG4ULE.png)

* We already created blocks without knowing it, it's the simplest building block in **BEM**

### The E in BEM - Elements
These are things that go inside a specific block

* Out `Title Bar` block, we may have:
    - a **Title** and **slogan** element
* Our `Player` block might have: 
    - **player name** and **player score** paragraph

These are **elements** inside of your **blocks**

### Two core rules to BEM
1. Always use classes
    * You will never select by element (_p, table, form..._) or by ID (_#app_)
2. We will never nest any of our selectors
    * All that does is create unwanted [specificity](https://specificity.keegan.st/)
        - [What is specificity?](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/)

#### Example
This is the naming convention for multi-word `block` and/or `element`

`.some-item__some-message`

Some item block and some message element

`_item.scss`

```
.item
{
    margin-bottom: 1.3rem;
    padding: 1.3rem;

    border: 1px solid #e8e8e8;
    background: #fff;
}

.item__message
{
    color: purple;
}
```

Use the class

`PlayerList`

```
// more code
      return (
        <div className="item">
          <p className="item__message">Please add some players.</p>
        </div>
      );
// more code
```

Now you'll see the purple text when you have no players but there won't be purple text when you add players

`_item.scss`

Let's remove the ugly purple and make our item message look nicer

```
.item__message {
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 300;
  text-align: center;
}
```

## Change behavior with block or element
`.item--some-modifier`

```
// element
.item--last-item
{
    // maybe have some special styles for the last item
}
```

`_item.scss`

```
// more code
// modifier
.item__message--empty
{
    color: #999;
}
```

Add to `PlayerList`

```
more code
return (
        <div className="item">
          <p className="item__message item__message--empty">Please add some players.</p>
        </div>
      );
// more code
```

* This is useful if you have multiple messages but you only want some of them to have the lighter font color
* **elements** get used in a lot of places
* **modifiers** get used in a few places
* Later we'll create square buttons but we'll use a rounded modifier

### BEM is great
**BEM** is a great pattern that enables you to create scalable, reusable, maintainable styles

Let's remove the modifier as we won't use it

```
.item__message--empty
{
    color: #999;
}
```

Make sure to remove the `item__message--empty` class from `PlayerList` too

`_item.scss`

```
.item {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  padding: 1.3rem;
  margin-bottom: 1.3rem;
}

.item__message {
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 300;
  text-align: center;
}
```

## Create our `_button.scss`

`imports/client/styles/components/_button.scss`

```
.button
{
    color: red;
}

// modifier
.button--round
{
    //
}
```

After creating the file make sure to import it into `_main.scss`

```
@import './components/title-bar';
@import './components/wrapper';
@import './components/item';
@import './components/button'; // add this line
```

Add the class to our Components

`AddPlayer`

`<button className="button">Add Player</button>`

`Player`

```
  return (
        <div key={player._id} className="item">
          <p>
            {player.name} has {player.score} {this.checkPoints(player.score)}.
          </p>
          <button className="button" onClick={() => {
            Players.update( player._id, { $inc: { score: 1} } );
          }}>+1</button>
          <button className="button" onClick={() => {
            Players.update( player._id, { $inc: { score: -1} } );
          }}>-1</button>
          <button className="button" onClick={() => Players.remove(player._id)}>X</button>
        </div>
    );
```

### View in browser
You'll see red font color for increment/decrement and Add Player buttons

![red font color](https://i.imgur.com/GoVlpMN.png)

Make the button color a little more subtle:

`_button.scss`

```
.button
{
    color: #555;
}

// modifier
.button--round
{
    //
}
```

![outline tab focus](https://i.imgur.com/XIB3zVw.png)

* This is what outline looks like by default in Chrome
    - We are temporarily turning it off `outline: none`
    - Later we'll add something here for accessibility purposes

* `cursor: pointer` - gives us the common hand pointer to alert the user that this is a button when they hover over it

`_button.scss`

```
.button {
  border: 1px solid #555555;
  color: #555555;
  cursor: pointer;
  font-weight: 600;
  margin-left: 1.3rem;
  outline: none;
  padding: 1.3rem;
}
```

## Make Buttons round
Using a modifier

```
// modifier
.button--round {
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
}
```

Add to `button--round` to `Player`

```
return (
        <div key={player._id} className="item">
          <p>
            {player.name} has {player.score} {this.checkPoints(player.score)}.
          </p>
          <button className="button button--round" onClick={() => {
            Players.update( player._id, { $inc: { score: 1} } );
          }}>+1</button>
          <button className="button button--round" onClick={() => {
            Players.update( player._id, { $inc: { score: -1} } );
          }}>-1</button>
          <button className="button button--round" onClick={() => Players.remove(player._id)}>X</button>
        </div>
    );
```

## Transitions for cool FX!

### `&` - in **Sass**
Lets us add things to the current selector

#### Example of `&` in Sass
```
.button
{

    &.test {

    }
}
```

`&.test` - Will apply to any elements that have a class of `.button` but also has a class of `test` like `<div className="button test">`

We'll never use it for class selectors but we will use it for [pseudo-selectors](https://www.w3schools.com/css/css_pseudo_classes.asp)

`_button.scss`

```
.button {
  border: 1px solid #555555;
  color: #555555;
  cursor: pointer;
  font-weight: 600;
  margin-left: 1.3rem;
  outline: none;
  padding: 1.3rem;
  transition: background .2s ease;
    
    // pseudo-selectors
    &:hover,
    &:focus {
      background: #e8e8e8;
    }
}
```

* Hover over the buttons and you'll see the effect
    - Transition from white to gray background
    - Focus works when you hit tab
* We disabled focus and use our own background animation to give the user a visual clue where the focus is (_Necessary for accessibility_)

![hover effect](https://i.imgur.com/QXEUHNW.png)

## Make button appear darker when we click it
Change the `active` psuedo-selector

`_button.scss`

```
.button {
  border: 1px solid #555555;
  color: #555555;
  cursor: pointer;
  font-weight: 600;
  margin-left: 1.3rem;
  outline: none;
  padding: 1.3rem;
  transition: background .2s ease;

  &:hover,
  &:focus {
    background: #e8e8e8;
  }

  &:active {
    background: #cccccc;
  }
}
// more code
```

### Using CSS3 `transform`
* `transform: scale(1.1)`

Let's modify our button so that when it is clicked it will get slightly larger
`_button.scss`

```
// more code
  &:active {
    background: #cccccc;
    transform: scale(1.1);
  }
// more code
```

### Slight problem
When we transform, it kind of jumps a little. We can improve on this effect by also use transition on it:

Update your transition to look like this:

`transition: background .2s ease, transform .2s ease;`

Roll over buttons and you'll see the jump is gone and the scale grows nicely

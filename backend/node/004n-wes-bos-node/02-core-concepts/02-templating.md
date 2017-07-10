# Templating
## `res.render()` - (`res` is short for response)
It will render a template for us

## pug
* This is our templating language
* Formerly `jade`
* `pug` templating language very popular in **node** community

`app.js`

```
// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too
```

* We have a `views` folder
* All `.pug` files reside inside `views`
* All our templates reside inside `views`
* `pug` is based on indentation

## Other templating languages
* mustache
* EJS

## How do we render out a template?
`views/learning-pug-for-fun.pug`

```
doctype html
html
  head
    title Learning Pug is Fun
  body
    p hello
```

* That template is our view but in order to see that we need to create a route that points to that template
* We'll create a `/learning` route

`routes/index.js`

```js
// more code
router.get('/learning', (req, res) => {
  res.render('learning-pug-for-fun');
});

module.exports = router;
```

### View `http://localhost:7777/learning-pug-for-fun` in browser
* You will see `Hello`
* All the HTML that we did not include the browser will insert it for us
  - View source to check

`<!DOCTYPE html><html><head><title>Learning Pug is Fun</title></head><body><p>hello</p></body></html>`

## pug Nesting
`learning-pug-is-fun.pug`

```
doctype html
html
  head
    title Learning Pug is Fun
  body
    div
      p Hello
      span Oh Yeah!
```

## Indentation is important in Pug
* Practice and get used to it
* Used to be called `Jade`
* Pick a style `2 space, 4 space, 1 tab`
    - And stick with it
    - `pug` will force you to pay attention to your spacing

![pug spacing](https://i.imgur.com/4wNAGnr.png) 

## Adding classes and id's
```
doctype html
html
  head
    title Learning Pug is Fun
  body
    div.container.awesome
      p.important Hello
      span#groovy.awesome Oh Yeah!
```

![pug class and id's](https://i.imgur.com/J101G5O.png)

* If you don't specify an element, `div` will be assumed

`.container.awesome` --> `<div class="container awesome></div>`

## pug attributes
```
doctype html
html
  head
    title Learning Pug is Fun
  body
    .container.awesome
      p.important Hello
      span#groovy.awesome Oh Yeah!
      img.roll-seven(src="dice.jpg" alt="rolling dice")
```

![pug attributes](https://i.imgur.com/w4DFJGG.png)

### Structure Code
```
doctype html
html
  head
    title Learning Pug is Fun
  body
    ul
      li item one
      li item two
```

* View Element tab of Code Inspector inside chrome

### Tip if you don't want to have really lines of code

```
doctype html
html
  head
    title Learning Pug is Fun
  body
    ul
      li item one
      li.
        this is lots of text
        still lots of text
        more lots of text
        you get this idea
```

* See what happens when you remove the `.` in `li.`
* That `.` is necessary to have a multi-code-line string inside an element
![broken code](https://i.imgur.com/7VsNVR2.png)

## Add some CSS
```
doctype html
html
  head
    title Learning Pug is Fun
    link(rel='stylesheet', href='/dist/fun-test.css')
  body
    ul
      li item one
      li
        this is lots of text
        still lots of text
        more lots of text
        you get this idea
    input(type='text').fun-class-name#fun-id-name
```

`/public/dist/fun-test.css`

```css
li {
  background-color: red;
}
```

![output of pug css](https://i.imgur.com/tyTr55W.png)

![output of html](https://i.imgur.com/Ej9sri2.png)

## Inject variables into templates
`routes/index.js`

```js
// more code
router.get('/learning', (req, res) => {
  res.render('learning-pug-for-fun', { title: 'Pug is Fun!'} );
});
// more code
```

* And modify our template like this

`learning-pug-for-fun.pug`

```
doctype html
html
  head
    title= title
// more code
```

* Refresh the browser and you'll see this in the title:

![pug is fun title](https://i.imgur.com/t42OWuG.png)

* This is how we insert JavaScript objects into our template
* And in the template we can output that object by using just the variable name
* The `=` tells pug to not render text but rather render a variable and use whatever that variable contains

## Conditions and logic with Pug
`learning-pug-for-fun.pug`

```
// more code
input(type='text').fun-class-name#fun-id-name
    if condition
      p all is well
```

* Update our router

`index.js`

```js
// more code
router.get('/learning', (req, res) => {
  res.render('learning-pug-for-fun',
    {
      title: 'Pug is Fun!',
      condition: true,
    });
});
// more code
```

* Refresh browser and you will see `all is well`

## Define variable inside `pug` files
* Use the minus sign for defining variable inside pug

`learning-pug-for-fun.pug`

```
// more code
 - const condition = true
    if condition
      p all is well
```

* Remove the condition from the route `index.js`

```js
// more code
router.get('/learning', (req, res) => {
  res.render('learning-pug-for-fun',
    {
      title: 'Pug is Fun!',
    });
});

module.exports = router;
```

* Refresh the browser and you will see `all is well`

## Override conditions
* What happens if my route defines the condition as false and my template defines the condition as true?

`index.js`

```
// more code
router.get('/learning', (req, res) => {
  res.render('learning-pug-for-fun',
    {
      title: 'Pug is Fun!',
      condition: false,
    });
});
// more code
```

* The template condition of true will override the route condition of false

### Looping with Pug templates
* Remember, no semi-colons!
* In Pug everything is done with indentation
  - No need for know when a line ends with a semi-colon
  - Because indentation and line breaks tell you that information

`learning-pug-for-fun.pug`

```
// more code
- const anyArray = [1, 2, 3]
each value in anyArray
  p= value
```

* Will output when you refresh the browser

![loop output](https://i.imgur.com/93F7jmu.png)

## block content and layout
* We will use a special view file that will serve as the basic layout for all our pages
* We will call that special view file `layout.pug`
* We will temporarily rename our existing `layout.pug` to `old-layout.pug`
  - And create a new `layout.pug`
  - This `layout.pug` serves as our basic "skeleton" which other layouts reuse and extend and add their content into it
  - We can provide basic **hooks** in our skeleton where we want our inheriting layouts to insert content
  - We define these **hooks** with the `block` keyword
    + `block content`
      * Is a content block which can be used by our views extending the `layout.pug` to insert some content

`layout.pug`

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/dist/fun-test.css')
  body
    block content
```

`learning.pug`

```
extends layout

block content
  h1= title
  p Welcome to #{title}

  ul
    li item 1
    li item 2
```

* `extends layout` means we are inheriting at the very beginning of `learning-pug-for-fun` the contents of `layout.pug`
  - **layout** in `learning-pug-for-fun.pug` (_extends layout_) must match the layout in **layout.pug** file name

### But why do I need to add `block content`?
* Because the `layout.pug` is closed in itself
* We only have access to these hooks where an extending layout may enter something
  - So in layout we have `block content`
  - And in `learning-pug-for-fun.pug` we also have `block content`
  - And by doing this we are signaling, "Hey Pug! I want to insert something into this block content"
    + And what follows is the content I want to insert

### Why do we need `#{title}`
* If we have a mixture of normal text and a variable we use #{variableNameHere}
}

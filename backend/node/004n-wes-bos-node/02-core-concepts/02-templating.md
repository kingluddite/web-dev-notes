# Templating
## `res.render()` - (res is short for response)
It will render a template for us

## pug
* This is our templating language
* Formerly `jade`
* pug templating language very popular in **node** community

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
`views/hello.pug`

```
p Hello
```

`routes/index.js`

```
router.get('/', (req, res) => {
  const player = { name: 'Kobe', age: 40, good: true };
  // res.send('Hey! It works!');
  // res.json(player);
  // res.send(req.query.good);
  // res.json(req.query);
  res.render('hello');
});
```

### View `http://localhost:7777/` in browser
* You will see `Hello`
* All the HTML that we did not include the browser will insert it for us

## pug Nesting
`hello.pug`

```
div
  p Hello
  span Oh Yeah!
```

* Indentation is huge in Jade, practice and get used to it
* Pick a style `2 space, 4 space, 1 tab`
    - And stick with it
    - `pug` will force you to pay attention to your spacing

![pug spacing](https://i.imgur.com/4wNAGnr.png) 

## Adding classes and id's
```
div.container.awesome
  p.important Hello
  span#groovy.awesome Oh Yeah!
```

![pug class and id's](https://i.imgur.com/J101G5O.png)

* If you don't specify an element, `div` will be assumed

`.container.awesome` --> `<div class="container awesome></div>`

## pug attributes
```
.container.awesome
  p.important Hello
  span#groovy.awesome Oh Yeah!
  img.roll-seven(src="dice.jpg" alt="rolling dice")
```

![pug attributes](https://i.imgur.com/w4DFJGG.png)

* pug-lint atom file
* language-pug (_syntax highlighting_)

`.pug-lintrc` [github](https://www.npmjs.com/package/pug-lint)

```
{
  "extends": "./node_modules/coding-standard/.pug-lintrc",
  "disallowIdLiterals": null
}
```

* You need to have `Node.js` installed
* Install pug-lint globally

`$ npm install -g pug-lint`

#### Sublime Text 3
If you use SublimeLinter 3 with Sublime Text 3, you can install the SublimeLinter-pug-lint plugin using Package Control.

#### Atom
If you use Atom, you can install the linter-pug package.

#### VS Code
If you use VS Code, you can install the vscode-puglint extension.

## Put multiple tags on same line
```
h2
  | hello
  em How are you?
```

![on same line](https://i.imgur.com/OVvqnYj.png)

### Watch out for this
```
h2
  hello
  em How are you?
```

![hello tag is bad](https://i.imgur.com/IrRQyPS.png)

* looping
* logic
* advanced templating
* mixins
* and lots more

## How do you get information from your route?
* Maybe it is coming from a Database?
* Or it is coming from your URL?
* How do you get that info to your template?

`routes/index.js`

```
router.get('/', (req, res) => {
  res.render('hello', {
    name: 'Pele',
    team: 'Brazil',
  });
});
```

## Interpolate a variable inside of text using `pug`
`#{dog}`

`hello.pug`

```
.wrapper
  p.hello I am #{name} and my team is #{team}
```

Output --> `I am Pele and my team is Brazil`

## Plucking variables `off` of URLs
* These are local variables (often called _locals_ in express)

```
router.get('/', (req, res) => {
  res.render('hello', {
    name: 'Diego',
    team: req.query.team,
  });
});
```

URL -> `http://localhost:7777/?team=argentina`

Output -> `I am Diego and my team is argentina`

## How do you put variables inside pug attribute values?
### This won't work
``img.team(src="pele.jpg" alt="`Player #{name}"`)``

* That will just output the `name` literally
* Pug took the ability to put variables in attributes unless you just use JavaScript
    - Use backticks and ES6 template literals
    - ``img.team(src="pele.jpg" alt=`Player ${name}`)``

### Gotcha
* When writing content text use `#{team}`
* When writing attribute values use ``${team}``

## You can run any JavaScript inside of pug
* Most of the work will be done in your routes but you have the option of using JavaScript in pug
* We declare a variable inside `pub` using `-`

```
.wrapper
  - const upTeam = team.toUpperCase();
  p.hello I am #{name} and my team is #{upTeam}
```

Output --> `I am Diego and my team is ARGENTINA`

Or

```
.wrapper
  p.hello I am #{name} and my team is #{dog.toUpperCase()}
```

With same output as before `I am Diego and my team is ARGENTINA`

* **Major pro** of `pug` is that it <u>is JavaScript based</u>

## Layouts, extending templates
* Atom Text Editor
To get pug and emmet to play nice open `config.json` and add

```
"file-types":
    pug: "source.jade"
```

Just like this:

![add pug to emmet](https://i.imgur.com/yI8EAKV.png)

### Emmet to the rescue
**! + [tab]**

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Document
body
```

**ul.dogs>li.dog.dog.$$*10**

```
ul.dogs
  li.dog.dog.01
  li.dog.dog.02
  li.dog.dog.03
  li.dog.dog.04
  li.dog.dog.05
  li.dog.dog.06
  li.dog.dog.07
  li.dog.dog.08
  li.dog.dog.09
  li.dog.dog.10
```

## block
A section of your website that can be filled in by another template

We want to consume our entire `layout.pug` and place our content inside:

```
.content
  block content
```

`hello.pug`

```
extends layout

block content
  p Hello
```

![cool header](https://i.imgur.com/C6vta8A.png)

This will extend our layout and place the code we typed inside the spot in `layout.pug` that says this:

![block content](https://i.imgur.com/OZPP7JN.png)

## Override header with custom header
`hello.pug`

```
extends layout

block header
  h2 I am overriding the layout header!

block content
  p Hello
```

![override header](https://i.imgur.com/oxlKSZs.png)

* Express is not like WordPress where you pull in the pages that you want
* It is more like you grab your layout and you pass it the data you want

## Add a footer
`layout.pug`

```
    .content
      block content
      
    footer
      block footer
        p (C) KL 

    block scripts
      script(src=`https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_KEY}&libraries=places`)
      script(src="/dist/App.bundle.js")
```

![add a footer](https://i.imgur.com/D48ndft.png)

But if I want to override this footer I could:

`hello.pug`

```
extends layout

block content
  p Hello
  
block footer
  p I am overriding my default footer!
```

![override footer](https://i.imgur.com/R1XPZ4s.png)

* Layout is your overall page layout
* And you can **extend** that layout with pieces you want to extend it with
* Usually you'll have:
    * One front end layout
    * One back end layout
    * Than use blocks to plop in part you need when you need them

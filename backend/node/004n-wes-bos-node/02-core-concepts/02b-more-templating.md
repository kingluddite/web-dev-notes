# More Fun with Pug
* Delete our test `layout.pug`
* Rename `old-layout.pug` to `layout.pug`

## Inspect all the pug code inside `layout.pug`
* Pay attention to all the indentations
* The **hooks**
  - block header
  - block messages
  - block content
  - block header

## Put multiple tags on same line
```
h2
  | hello
  em How are you?
```

* View in browser `/learning` route and you will see

![inline code](https://i.imgur.com/SDRFHua.png)

![on same line](https://i.imgur.com/OVvqnYj.png)

### Watch out for this
```
h2
  hello
  em How are you?
```

![hello tag is bad](https://i.imgur.com/IrRQyPS.png)

## Pug lets us do stuff like this:
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
router.get('/learning', (req, res) => {
  res.render('learning-pug-for-fun', {
    name: 'Pele',
    team: 'Brazil',
  });
});
```

## Interpolate a variable inside of text using `pug` 
`#{dog}`

`learning-pug-for-fun.pug`

```
extends layout

block content
  .wrapper
    p.hello I am #{name} and my team is #{team}
```

Output --> `I am Pele and my team is Brazil`

## Plucking variables `off` of URLs
* These are local variables (often called _locals_ in express)

`index.js`

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
* Pug put variables in attributes using JavaScript
    - Use backticks and ES6 template literals
 
 ``img.team(src="pele.jpg" alt=`Player ${name}`)``

### Gotcha! Watch out for this
* When writing content text use `#{team}`
* When writing attribute values use ``${team}``

## You can run any JavaScript inside of pug
* Most of the work will be done in your routes
* But you have the option of using JavaScript in `pug`
* We declare a variable inside `pug` using `-`

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

## Pug is JavaScript based!
* **Major pro** of `pug` is that it <u>is JavaScript based</u>

## Layouts, extending templates

## block
A section of your website that can be filled in by another template

We want to consume our entire `layout.pug` and place our content inside:

```
.content
  block content
```

`learning-pug-for-fun.pug`

```
extends layout

block content
  p Hello
```

![cool header](https://i.imgur.com/C6vta8A.png)

This will extend our layout and place the code we typed inside the spot in `layout.pug` that says this:

![block content](https://i.imgur.com/OZPP7JN.png)

## Override header with custom header
`learning-pug-for-fun.pug`

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
    p (C) The Retail Apocalypse 

block scripts
  script(src=`https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_KEY}&libraries=places`)
  script(src="/dist/App.bundle.js")
```

![add a footer](https://i.imgur.com/D48ndft.png)

## Override the footer!
But if I want to override this footer I could:

`learning-pug-for-fun.pug`

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
    * Than use blocks to plop in parts you need when you need them

## Git
* Save
  - `$ ga -A`
* Commit
  - `$ gc -m 'more-templating notes`
* Checkout master
  - `$ gcm`
* Merge branch into master
  - `$ git merge more-templating`
* Push master to github (_and all branches_)
  - `$ git push --all`

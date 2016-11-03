# Sass

## What does Sass stand for? 
Syntatically Awesome Style Sheets

## Spell Sass like Sass
The creator wants people to spell Sass like Sass and not like SASS or any other variation. Out of respect for [him](https://en.wikipedia.org/wiki/Hampton_Catlin), I'll type the name Sass in all my notes.

## Confusion Says or was it Confucious who said that?
So ready to be confused right out of the gates? The language is called Sass but the most common file extension for Sass files is `.scss`. To make matters worse there is also a version of Sass that has a `.sass` extension. `.sass` files don't use curly braces and is meant to make typing Sass faster. Think of it like the [CoffeeScript](http://coffeescript.org/) for Sass.

## How do I install Sass?

To get Sass working, you first have to install it. Here's how:

```
$ gem install sass
```

## Get Sassing with Sass

You have your `scss` and you want to convert it into css. Just create a `scss` folder.

Now that you have Sass installed, here's how you run it (aka `watching`). 

```
$ sass --watch scss:css
$ sass --watch app/sass:public/stylesheets
```
What is happening here is Sass is watching for any changes inside the `scss` folder and when anything changes, the all the Sass gets changed into `css` and moved into the `css` folder.

As an added bonus, if you type and `scss` errors, you will be alerted to the fact inside the terminal.

If you want to do other stuff in the terminal, open another tab.

If you need to stop Sass running, follow the next instruction.

## Stop watching Sass keyboard shortcut

```
ctrl + c
```
## Refactoring Sass

I'm not sure how you wroter your `css` but with Sass you should write your code in a modular fashion as it makes it much easier to manage. I'll introduce a modular way to break up your code into logical chunks but if you want to take this to the extreme and get supersonic modular, check out [SMACSS](https://smacss.com/).

## What are Partials?

When you see a file prefaced with an underscore like `_some-freaking-awesome-sass.scss`, that is a partial. It is called a `partial` because it is just a partial piece of code.

### Folder Structure

Here is an example of what our Sass folder struture will look like. Notice the folder names. Notice all files are `partials` except for `application.scss`. The way this works is all the `partials` will be `imported` into `application.scss`.

* scss
  * base
    * _base.scss
  * components
    * _buttons.scss
    * _icons.scss
    * _index.scss
    * _typography.scss
  * layout
    * _columns.scss
    * _containers.scss
    * _footer.scss
    * _header.scss
    * _index.scss
  * _style.scss
  * application.scss

#### Base Folder
All `css` that define what elements look like by default

**Note:**
* Each folder has an `_index.scss`

`scss/components/_index.scss`

Let's take a peek inside one of the folder's `_index.scss`

```
// ========================
// Component Imports
// ========================

@import 'typography';
@import 'buttons';
@import 'icons';
```

##### Why is @import not importing the full file name?
With Sass, you don't need to add the .scss file name extension. This saves you some type so be happy about it.

##### Why use `_index.scss` partials?
Instead of importing all files into one global `application.scss` file, we can just import the index files for each folder. This makes everything more modular and a lot more manageable.

### Comment flag

Comments makes the coding team happy.

`scss/application.scss`

```
// ==========================================================================
// Global Imports
// ==========================================================================

@import 'base/index';
@import 'layout/index';
@import 'components/index';
```

* We import files by including their path

### Order Is Important

Order is important during `css` to `scss` conversion. You that the `C` in `CSS` stands for cascade, so if you change the order of the imports, you'll change the cascade effect and this may or may not be what you want. So just pay close attention to the order when you include your imports.

Case in point. If you have a `_variables.scss` partial and you @import that after a file that uses those variables, you'll get an error.

### Placeholder selectors
Placeholders are useful as they don't compile to css unless they are extended or called up in another rule
* A.K.A. - `placeholders` or `extends`

**TIP**

Create an `_extends.scss` file inside each of your scss sub folders

**Why?**

It improves code manageability

#### Helper or utility placeholder rule
If you see the same rule used repeatedly

**Tip**
Watch out for **placeholder puke**

In `layout` folder include new `_extends.scss` file

```scss
// ==========================================================================
// Layout Imports
// ==========================================================================

@import 'header';
@import 'footer';
@import 'containers';
@import 'columns';
@import 'extends';
```

Here are examples of `extends`

```
// Center text
%centered {
 text-align: center;
}

// Top border
%top-border {
  border-top: 2px solid #dfe2e6;
}

// Containers
%content {
  width: 75%;
  padding-left: 50px;
  padding-right: 50px;
  margin: auto;
  max-width: 960px;
}

// Columns
%columns {
  width: 46.5%;
}

// Clearfix
%clearfix {
 &:after {
  content: "";
  display: table;
  clear: both;
 }
}
```

Here's how to use them in a file

`_container.scss`

```scss
.primary-content {
  @extend %content;
  @extend %top-border;
  @extend %centered;
  padding-top: 25px;
  padding-bottom: 95px;
}

.secondary-content {
  @extend %content;
  @extend %top-border;
  @extend %clearfix;
  padding-top: 80px;
  padding-bottom: 70px;
  border-bottom: 2px solid #dfe2e6;
}
```

### Nesting Selectors
Nesting if done improperly can lead to code bloat
Here's how to nest properly

`base/_base.scss`

```
/* Pseudo-classes ------------------ */
a {
  &:link {
    color: rgb(255, 169, 73);
    text-decoration: none;
  }

  &:visited {
    color: lightblue;
  }

  &:hover {
    color: rgba(255, 169, 73, .5);
  }
}
```

### Another `nesting` example

Here's what we start out with:

`_typography.scss`

```
.main-heading {
  font-size: 5.625rem;
  color: rgba(255, 255, 255, 1);
  text-transform: uppercase;
  font-weight: normal;
  line-height: 1.3;
  text-shadow: 0 1px 1px rgba(0,0,0,.8);
  margin: 12px 0 0;
}

.main-title {
  color: white;
  font-size: 1.625rem;
  letter-spacing: .065em;
  font-weight: 200;
  border-bottom: 2px solid;
  padding-bottom: 10px;
}
```

And we turn it into this:

`_typography.scss`
```
.main {
   &-heading {
    font-size: 5.625rem;
    color: rgba(255, 255, 255, 1);
    text-transform: uppercase;
    font-weight: normal;
    line-height: 1.3;
    text-shadow: 0 1px 1px rgba(0,0,0,.8);
    margin: 12px 0 0;
  }

  &-title {
    color: white;
    font-size: 1.625rem;
    letter-spacing: .065em;
    font-weight: 200;
    border-bottom: 2px solid;
    padding-bottom: 10px;
  }
}
```

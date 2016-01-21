# SASS
**How to start watching sass**
```
$ sass --watch scss:css
$ sass --watch app/sass:public/stylesheets
```
## Stop watching sass keyboard shortcut

```
ctrl + c
```

## install sass

```
$ gem install sass
```

## Refactoring sass

Partial Files
* have underscore before name of file
  * _filename.scss

### Folder Structure
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

**Base Folder** - all css that define what elements look like by default

**Note:**
Each folder has an _index.scss
```
// ========================
// Component Imports
// ========================

@import 'typography';
@import 'buttons';
@import 'icons';
```
**why do this?**
instead of importing all files into global `application.scss` file, we can just import the index files for each folder
makes everything a lot more manageable

### comment flag (application.scss)
```
// ==========================================================================
// Global Imports
// ==========================================================================

@import 'base/index';
@import 'layout/index';
@import 'components/index';
```

**Note:**
Order is important during css to scss conversion

### Placeholder selectors
Cool - don't compile to css unless they are extended or called up in another rule
aka - `placeholders` or `extends`

**Tip**
Create an `_extends.scss` file inside each of your scss sub folders
**Why?** - It improves code manageability

#### Helper or utility placeholder rule
If you see the same rule used repeatedly

**Tip**
Watch out for **placeholder puke**

In `layout` folder include new `_extends.scss` file
```
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

```
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

### Another cool `nesting` example
Turn this in `_typography.scss`

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

Into this in `_typography.scss`
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

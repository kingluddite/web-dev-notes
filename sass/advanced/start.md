# Writing Good Quality Code with Sass

## Sass Basics
## Rule
Leave your code as clean as or better than you found it

[sassmesiter](http://www.sassmeister.com/)

## Comments
"wag star, star wag" is code speak for these comment tags /*  */ 

If you use /* */ in Sass as a comment that comment will be output in your css
If you use // in Sass as a comment that will not be output in css as a comment

Compress output - no comments

## Caution - Inception Rule
4 times? Think if you really need that much specificity

```
.block {
  color: orange;
  ul {
    width: 100%;
    li {
      width: 100%;
      p {
        font-weight: bold;
      }
    }
  }
}
```

Output

```
.block {
  color: orange;
}

.block ul {
  width: 100%;
}

.block ul li {
  width: 100%;
}

.block ul li p {
  font-weight: bold;
}
```

Less nesting is cleaner
.sass example
```
.block
  color: orange

ul
  width: 100%

li
  width: 100%

p
  font-weight: bold
```

Output css
```
.block {
  color: orange;
}

ul {
  width: 100%;
}

li {
  width: 100%;
}

p {
  font-weight: bold;
}

```

## Naming Conventions
PascalCase - functions
camelCase - mixins
hyphen-case - everything else

**Example**

```
@function MakeColor ($color) {
  @return $color + #010;
}

@mixin textFormat($size, $family, $color) {
  font: {
    size: $size;
    family: $family;
  };
  color: MakeColor($color);
}

.site-header {
  @include textFormat(12px, verdana, red);
}
```

## RULE
Put mixins first so they won't get overwritten

**Bad**

```
.foo {
  font-size: 12px;
  padding: 10px;
  width: 50%;
  @include textFormat(12px, verdana, red);
  .nested-foo {
    background-color: green;
  }
}
```

**Good**

```
.foo {
  @include textFormat(12px, verdana, red);
  font-size: 12px;
  padding: 10px;
  width: 50%;
  .nested-foo {
    background-color: green;
  }
}

```

## @extend
Where you put it can output where it is placed in CSS which means it could be overwritten if you are not sure with where you want to put it

```
@mixin textFormat($size, $family, $color) {
  font: {
    size: $size;
    family: $family;
  };
  color: MakeColor($color);
}

.foo {
  @include textFormat(12px, verdana, red);
  @extend .block;
  font-size: 12px;
  padding: 10px;
  width: 50%;
  .nested-foo {
    background-color: green;
  }
}

.block {
  color: orange;
}
```

CSS Output

```
.foo {
  font-size: 12px;
  font-family: verdana;
  color: #ff1100;
  font-size: 12px;
  padding: 10px;
  width: 50%;
}

.foo .nested-foo {
  background-color: green;
}

.block, .foo {
  color: orange;
}
```

But if you move your extend here:

```
.block, .foo {
  color: orange;
}

.foo {
  font-size: 12px;
  font-family: verdana;
  color: #ff1100;
  font-size: 12px;
  padding: 10px;
  width: 50%;
}

.foo .nested-foo {
  background-color: green;
}
```

Output CSS - the `.block, .foo` rule is move above `.foo` rule which means you have changed the cascade flow of your css. Did you want to do that?

```
.block, .foo {
  color: orange;
}

.foo {
  font-size: 12px;
  font-family: verdana;
  color: #ff1100;
  font-size: 12px;
  padding: 10px;
  width: 50%;
}

.foo .nested-foo {
  background-color: green;
}
```

## Partials
1 css file

Cool way to organize
![oranize partials](https://i.imgur.com/8AatqrQ.png)

Example:
* _base.scss
* _functions.scss
* _layout.scss
* _mixins.scss
* _modules.scss
* _reset.scss
* _state.scss
* _theme.scss
* _variables.scss
* application.scss

* Pull them all inside application.scss
* You only output file without `_file.scss` naming convention only `applicaiton.scss` will be output into the `CSS` folder when you are watching it with the watch terminal command.

```
$ sass --watch sass:css
```

**Note:** Partials are NOT output as CSS

## Manifest (application.scss)
* When creating a Sass file that's only job is to import other files, we refer to this as a `manifest`


application.scss == `core manifest file`

```
//@import "compass";

@import "variables";
@import "functions";
@import "mixins";

@import "reset";

@import "base";
@import "modules";
@import "state";
@import "layout";
@import "theme";

// @import "plug-in"; // add these last
```

* order is essential! Pay attention to it
* 

## Event better organization
1. Create a folder for mixins
2. Add your `_mixin.scss` file inside it
3. Rename `_mixin.scss` to be `_manifest.scss`
4. Create `_grid.scss` inside `mixin` folder
5. Put code inside `_grid.scss`
6. Inside `_manifest.scss` add
``` 
@import "grid";
```

* `_manifest.scss` is aware of everything that happens inside of the `mixins` folder

We need to update `application.scss`

```
@import "variables";
@import "functions";
@import "mixins/manifest";

@import "reset";

@import "base";
@import "modules";
@import "state";
@import "layout";
@import "theme";
```

## Sass Globbing
Globbing refers to pattern matching based on wildcard characters that allows Sass to assemble all the partials within a directory without a specific manifest file.

### You need to install ruby gem `sass-gobbing`
* requires more power

So now you can delete the manifest file
and use this to import a folder of files

```
@import "library/mixins/*"
```

Or import a tree of files

```
@import "library/**/*"
```

To run sass globbing you have to run a different command

```
$ sass -r sass-globbing --watch sass:css
```

**Warning** Globbing using names of files to determine order so name them appropriately or a file that needs a dependency could cause problems

* Manifest let's you determine the order.

## Sass Line Comments
You have partials but how do you see where bugs are in a hug compiled css file?
* You will see line css comes from but not Sass line
* You will not see which sass file it comes from

### Sourcemaps! to the rescue

View Sass Help

```
$ sass --help
```

That shows me that -l will give me line numbers. Cool!

I can use this line to see output in terminal

```
$ sass -l sass/application.scss
```

But viewing in the terminal isn't the best

I could create an output css file with

```
$ sass -l sass/application.scss:css/style.css
```

Will will give me the output I need with Sass info inside the style.css file

```
/* line 3, ../sass/_theme.scss */
body {
  background-color: orange; }

/* line 7, ../sass/_theme.scss */
h1 {
  color: white; }
```

### Using Ptyhon Simple Server to view output in the browser
* Python is installed by default on Macs
* Open up a new tab in `iTerm` (Terminal)

```
$ python -m SimpleHTTPServer
```

* Make sure you have an `index.html` file at the root of your project folder that you'll be viewing in the browser?

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Advanced Sass</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
 <h1>Hello From Sass</h1>
</body>
</html>
```

### View in browser
`http://localhost:8000`

* Now you can see line numbers and sass file names from where your code came from.

![sass filename and line numbers in browser](https://i.imgur.com/aDPL9DR.png)

If you click on `scss` file will take you to that file and the code.

## How to use Sourcemaps
* We need to do 2 things
    - Tell inspector to use maps
        + open chrome browser
        +   open settings
            *   General
                -   Make sure `Enable CSS source maps is checked`
                -   Also check `Auto-reload generated CSS`
    - Produce the souremap from Sass (now automatically generated)
        + 

**What is a sourcemap file?** A json file with info that shows where the Sass is generated from to produce the CSS

In your output css file you will now see this at the bottom:

```
/*# sourceMappingURL=application.css.map */
```

That ties the css file to the map file that shows where the stuff is in your scss files.

## Better now
Now we can see the scss file directly which is a major improvement

## Even Better - Make changes in Chrome that actually change the files
* sourcemaps make this possible!

### Now we need to create a workspace in Chrome

![workspace and add folder](https://i.imgur.com/9pM1fOC.png)
Chrome Inspector > Settings > Workspace > Add Folder
* Point to your project folder
* DevTools will request full access to this foler - click Allow
![allow workspace](https://i.imgur.com/FqoWYaL.png)

* Go to `Sources` on Web Dev toolbar and doubleclick the `application.scss` file
![application.scss](https://i.imgur.com/Mg9pYcb.png)

You right click and point map to the correct file. If you are using partials you map have work with several files but it will work. Just experiment. In the end you can quickly make changes in the browser and it will update on the browser and in your code in real time. `Cool!`

## Scoping and !default Variables
Currently in Sass, all variables declared outside of a mixin or function will have a global scope and can be referenced in other imported Sass files.

All variables, arguments used in mixins and functions are 100% scoped.

Sass version >= 3.4 Scoping is different
old version

```
$text-color: blue;

.error {
  $text-color: red;
  color: $text-color;
}

.normal-text {
  color: $text-color;
}
```

The above will have $text-color at the end be `red`

but after 3.4 Sass it will be `blue` because of the new scoping rules
[source](http://webdesign.tutsplus.com/articles/understanding-variable-scope-in-sass--cms-23498)

So in 3.4 Sass will treat the variable defined in .error to be locally scoped and

## Override local scope and make it global after it's local use
Just use the below technique

```
$text-color: blue;

.error {
  $text-color: red !global;
  color: $text-color;
}

.normal-text {
  color: $text-color;
}
```

* Now the last $text-color value will be `red`

### RULE
Arguments used within mixins or functions are NEVER global.

```
$var: yellow;

@mixin foo($var: $var) {
  global-color: $var;
  $var: purple;
  scoped-color: $var;
}

.block {
  @include foo;
  $var: lime;
}

block {
  global-color: $var;
}
```

Old way last global-color: $var would output lime
New way (Sass 3.4) last global-color: $var outputs global yellow value defined at top.

Doing this:

```
$var: yellow;

@mixin foo($var: $var) {
  global-color: $var;
  $var: purple !global;
  scoped-color: $var;
}

.block {
  @include foo;
  $var: lime;
}

block {
  global-color: $var;
}
```

Css output of last $var will be `purple`

## !default
Example

```
// included from a config file
$default-var: green;

// included from a mixin
$default-var: yellow !default;
@mixin foo($var: $default-var) {
  color: $var;
}

.block {
  @include foo;
}
```

* So we set a default color of green but we grab 3rd party code that give a default value of yellow to their default variable. When we run this the CSS output will give us a color of green because that is our default and it overrides a 3rd party default variable.

Using !default is very important so you don't override your defaults.

**Note:**
When the !default flag is on the value of a global variable that succeeds another global variable of the same name, it will have NO EFFECT ON THE VALUE OF THE VARIABLE

**Note:**
Arguments used as variables in a mixin or function remain scoped to the mixin or function







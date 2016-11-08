# Writing Custom Functions

add 3 numbers function

```stylus
add(a, b, c)
  a + b + c

body
  margin-left add(1,2,3)
```

output

```stylus
margin-left: 6;
```

but this will generate errors

`margin-left add(1rem,3)`

because it is expecting 3 arguments and we only passed it 2

the solution is to assign default values

```stylus
add(a, b, c = 3)
  a + b + c
```
if we want to override that 3 just passin a 3rd value to the function call

we can also do this

```stylus
add(a, b, c = a)
  a + b + c
```

## breaking stylus

```stylus
marg(a)
  a a
```

outputs this

```stylus
margin: a: 10px;;
```

stylus has problems with multiple values so to fix this we need to supply the `return` keyword

```stylus
marg(a)
  return a a
```

and that outputs

```css
body main {
  margin: 10px 10px;
}
```

using math to come up with values like this

```stylus
marg(a)
  return a a/2
```

## Interpolation with vendor prefixes

```stylus
vendor(property, arg)
  {property} arg
  -webkit-{property} arg
  -moz-{property} arg

border-radius(radius = 5px)
  vendor('border-radius', radius)

  transition(args)
    vendor('transition', args)
```

and then use those mixins with Interpolation

```stylus
main
    transition(all 0.2s ease)
```

outputs this

```css
body main {
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  border: solid 1px #475cd1;
  border-radius: 20px;
}
```

## Conditional Statement and Operators

```stylus
test(var)
  if var
      background red
  else
      background blue
```

and in the style.styl file

```stylus
main
    test(true)
```

and that will output

```css
main {
  background: #be2525;
}
```

* and if you passed `false` you would get the else value of blue

you could test numbers

```stylus
test(var)
  if var > 11
      background red
  else
      background blue
```

and then pass a number `test(10)`

we can get fancy like this

```stylus
test(var)
  margin-top unit(var, 'em')
  if var > 11
      background red
```

this ill always set a margin-top to var set to ems
and if the value of var is greater than 11, the background will be red, it it's not no background is set

## Operators

[documentation](http://stylus-lang.com/docs/operators.html)

```
.
 []
 ! ~ + -
 is defined
 ** * / %
 + -
 ... ..
 <= >= < >
 in
 == is != is not isnt
 is a
 && and || or
 ?:
 = := ?= += -= *= /= %=
 not
 if unless
```

## Add extensions onto stylus

let's install nib

### nib
just need to install node to do this extension stuff

we need to install nib globally in your system

`$ sudo npm install nib -g`

this is how you now use nib while watching

`$ stylus -u nib -w style.styl`

now import nib

`@import 'nib'`

nib includes css3 prefixes so we don't need to write prefix code

```stylus
@import 'nib'
@import 'styl/*'

body
  background linear-gradient(top, white, black)
```

outputs this:

```css
body {
  background: -webkit-linear-gradient(top, #fff, #000);
  background: -moz-linear-gradient(top, #fff, #000);
  background: -o-linear-gradient(top, #fff, #000);
  background: -ms-linear-gradient(top, #fff, #000);
  background: linear-gradient(to bottom, #fff, #000);
}
```

## More with Nib
like burban or compass for Sass

[nib website](https://tj.github.io/nib/)

cool mixins
fixed, absolute, relative

```stylus
body
  fixed top left
/* or pass values */
body
  fixed top 20px left 30px
```

outputs

```css
body {
  position: fixed;
  top: 0;
  left: 0;
  background:
}
```

we can remove our clearfix mixin and use theirs

### elipsis for more text mixin

```stylus
main
    a
      overflow ellipsis
```

outputs

```css
body main a {
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
```

use eric meyers css reset

`reset-html-5()`

or the more preferred `normalize.css`

`normalize-html5()`

and we can get all the base normalize with

`normalize-base()`

## border is easy to add with

`border @color` (and it will add the border `1px solid {your color}`)

just saves you time typing

```stylus
a
  shadow-stroke(blue)
```
outputs

```css
a {
  text-shadow: -1px -1px 0 #475cd1, 1px -1px 0 #475cd1, -1px 1px 0 #475cd1, 1px 1px 0 #475cd1;
}

```

## easy breakpoints with rupture
media queries
* shorthand for quickly adding media queries
k

just a breakpoint mixin with

using `rupture`

[link to rupture github](https://github.com/jescalan/rupture)

`$ npm install rupture -g`

and then watch with nib and rupture

`stylus -u nib -u rupture -w style.styl`

```stylus
body
  margin-left add(1rem,3)
  +below(700px)
    color blue
      main
        color blue
```

outputs

```css
@media only screen and (max-width: 700px) {
  body color blue main {
    color: #475cd1;
  }
}
```

we want a more structured breakpoint

```stylus
rupture.scale = 0 400px 600px 800px 1050px 1800px
rupture.scale-names = 'xs' 's' 'm' 'l' 'xl' 'hd'

body
  +above('m')
    color red
  +above('xl')
    color blue
```

outputs

```css
@media only screen and (min-width: 600px) {
  body {
    color: #be2525;
  }
}
@media only screen and (min-width: 1050px) {
  body {
    color: #475cd1;
  }
}
```

## Typographic for stylus
* font stacks
* ratios font sizes

`$ sudo npm install typographic -g`

note: all of our installs are globab but if we had an npm package.json we could just install all these packages locally to our project

`$ stylus -u nib -u rupture -u typographic -w style.styl`

make sure to import the typograhic library

```stylus
@import 'typographic'
@import 'nib'
@import 'styl/*'

body
  font-family $futura
```

outputs

```css
body {
  font-family: 'Futura', 'Trebuchet MS', 'Arial', 'sans-serif';
}
```

so just use this in your project `typographic()`

and it will use these settings:

```stylus
$line-height-ratio   = 1.75
$heading-ratio       = $golden
$body-font           = $helvetica
$body-font-weight    = 300
$body-color          = #666
$heading-font        = $helvetica
$heading-font-weight = 500
$heading-color       = #111
$min-font            = 13px
$max-font            = 20px
$min-width           = 600px
$max-width           = 1000px
$vertical-rhythm     = true
```

and these ratios

```stylus
$minor-second   = 1.067
$major-second   = 1.125
$minor-third    = 1.2
$major-third    = 1.25
$perfect-fourth = 1.333
$aug-fourth     = 1.414
$perfect-fifth  = 1.5
$minor-sixth    = 1.6
$golden         = 1.618
$major-sixth    = 1.667
$minor-seventh  = 1.778
$major-seventh  = 1.875
$octave         = 2
$major-tenth    = 2.5
$major-eleventh = 2.667
$major-twelfth  = 3
$double-octave  = 4
```

and you should be off to the races!



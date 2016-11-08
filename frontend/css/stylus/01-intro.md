# Stylus

[link to video series](https://www.youtube.com/watch?v=eJahtnmywMI&list=PLLnpHn493BHFWQGA1PcyQZWAfR96a4CkH)

stylus page

[website](http://stylus-lang.com/)

need to install node.js

we now have access to npm

`$ npm install stylus -g`

if you get errors use `sudo`

```stylus
body
  background red
```

how to compile (similar to sass watching files)

`$ stylus -w styl.styl`

## video 3 - variables in stylus
[link to video #3](https://www.youtube.com/watch?v=ieSV35SsKjE&index=3&list=PLLnpHn493BHFWQGA1PcyQZWAfR96a4CkH)

## Variables in stylus

```stylus
blue = #47FCD1
body
  background blue
```

* you can use dollar sign if you want for variables
* can use properties as varaibles that we haven't defined

## using @ with stylus
When @ is used it looks up to find the first previous occurance of that property and uses it's value. Helps colors stay in sync

```stylus
blue = #47FCD1
red = #BE2525

body
  background blue
  color red
  border solid 1px @color
  main
    color blue
    border solid 1px @color
```

## Mixins
a group of code that is contained inside a statement
maybe reuse a bunch, like a clearfix
like a variable where you can reuse it but it can accept variables

### define Mixin

```stylus
border-radius()
  -webkit-border-radius 5px
  border-radius 5px
```

#### use mixin

```stylus
main
    color blue
    border solid 1px @color
    border-radius()
```

output

```stylus
main {
  color: #47fcd1;
  border: solid 1px #47fcd1;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

border-radius(radius)
  -webkit-border-radius radius
  border-radius radius

use

```stylus
main
    color blue
    border solid 1px @color
    border-radius(10px)
```

output

```stylus
main {
  color: #47fcd1;
  border: solid 1px #47fcd1;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
```

default value

```stylus
border-radius(radius = 10)
  -webkit-border-radius radius
  border-radius radius
```

then when using the mixin you can provide a radius and it will be used and if not the default value of 10 will be used

## (Transparent Mixins) can be used to replace properties

since we defined border-radius as our mixin we can do this

```stylus
main
    color blue
    border solid 1px @color
    border-radius 20px
```

it it will use the value of 20px and pass it to our mixin (other preprocessors can't do this)

## define a clearfix mixin

```stylus
blue = #47FCD1
red = #BE2525

/* clearfix */
cf()
  zoom 1
  &:after
  &:before
    content ""
    display table
  &:after
    clear both

body
  main
    color blue
    cf()
```

output

```stylus
/* clearfix */
body main {
  color: #47fcd1;
  zoom: 1;
}
body main:after,
body main:before {
  content: "";
  display: table;
}
body main:after {
  clear: both;
}
```

### import files
our file is getting large and unorganized

pro - easy to organize code using separate files and import statements

this is easy to do
grab your mixins and put them in their own file
grab your variables and put them in their own file

create a folder called `styl` and put all the files you are importing inside this folder

`styl/variables`

```stylus
blue = #47FCD1
red = #BE2525
```

`styl/mixins`

```styl
/* clearfix */
cf()
  zoom 1
  &:after
  &:before
    content ""
    display table
  &:after
    clear both
```

and import them into your main stylus file `style.styl`

```stylus
@import 'styl/variables'
@import 'styl/mixins'

body
  main
    color blue
    cf()
```

That's all there is to importing files

### stylus supports globbing
what is globbing?
a wildcard in an import statement

replace your imports and use this globbing pattern to import everything

```stylus
@import 'styl/*'

body
  main
    color blue
    cf()
```

## Using built-in functions
[video #6](https://www.youtube.com/watch?v=WDkuBUYJ7Hg&index=6&list=PLLnpHn493BHFWQGA1PcyQZWAfR96a4CkH)

use rgba() like this

old way
`rgba(255,255,255,0.9)`

new way
`background rgba(#FFF,0.9)`

you can also pass in variables into it like

`background rgba(blue,0.9)`

[typographic for stylus](https://github.com/corysimmons/typographic)

## show saturations
`background grayscale(blue)`

tinting (mixing color with white)

`background tint(blue, 80%)`

shade (adding black)

`background shade(blue, 40%)`

invert colors

`background invert(blue)`

find the complement of a color

`background complement(blue)`

desaturate

`background desaturate(blue, 30%)`

## Absolute value
`margin-top abs(-10px)`

## ceiling function
`margin-top ceil(4.6px)`

## floor()
`margin-top floor(4.3)`

## round()
`margin-top round(3.3)`

## unit()
what kind of value am I receiving? Is is a number or a string?
`margin-bottom unit(4.3%)`

outputs

`margin-bottom: '%';`

you can also use this to assign variables different units
`margin-top unit(4.6%, 'px')`

practical example
offset values in a grid like this

```stylus
body
  margin-left -10px
  main
    margin-left abs(@margin-left)
```

outputs this

```stylus
body {
  margin-left: -10px;
}
body main {
  margin-left: 10px;
}
```

K




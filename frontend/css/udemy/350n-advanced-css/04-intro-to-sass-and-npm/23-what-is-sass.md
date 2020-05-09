# What is Sass?
* Sass is a CSS preprocessor, an extension of CSS that adds power and elegance to the basic language

```
sass source code ----(Sass compiler)----> compiled css code
```

## Other CSS preprocessors
* LESS
* Stylus
* But Sass is most popular

## Main Sass Features
* `Variables`: for reusable values such as colors, font-sizeaz, sacpincing, etc;
* `Nesting`: to nest selectors inside of one another, allowing us to write less code
* `Operators`: for mathematical operations right inside of CSS
* `Partials and imports`: to write CSS in different files and importing them iall into one single file
* `Mixins`: to write reusable pieces of CSS code
* `Functions`: similar to mixins, with the difference that they produce a value that can than be used
* `Extends`: To make different selectors inherit declarations that are common to all of them
* `Control directives` (not covered here) for writing complex code using conditionals and loops
    - More used when writing CSS frameworks

## Sass vs Scss
![difference between sass and scss](https://i.imgur.com/anyubzp.png)

### scss is better
* sass is more confusing
* sass doesn't use an curly braces nor semi-colons
* sass is indentation sensitive (like yaml)
* It is more difficult to learn
* It is more difficult to convert original CSS projects to Sass with .sass syntax
* scss preserves the way original CSS looks like


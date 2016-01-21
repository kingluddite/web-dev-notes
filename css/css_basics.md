#Cascade

Order styles are followed

## Importance
* User Agent style sheet
  * each browser has its own user agent style sheet
* User style sheet
 * mostly for accessiblity
   * larger font sizes, specific colors
* Author Style Sheet

Specifitiy
* the game of war determines which rule wins

Source Order
If 2 rules are same, the later one wins

Each css property is assigned a weight to determine if it will be used

## CSS Inheritance
Property inherited from its parent

h1 (selector)
{ font-size: 2.5em; } (declaration)
```
h1 {
 font-size: 2.5em; }
}
```

* Inline
* Embedded
* External
```
<link rel="stylesheet" href="file_location.css">
```
**note:**
internal styles are required to be downloaded by the browser each time a page loads

`@import`
allows us to bring one or more style sheets into another style sheet

## Old types of CSS names
* inline
* embedded
* external

## New types of CSS names
* inline
* internal
* external

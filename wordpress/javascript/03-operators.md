# Operators

Let us perform operations

## Assignment operators

x = 5;
username = 'admin';
[link](http://jsbin.com/lutewo/edit?js,console)

## Comparison operators

Determine if one value is less than, equal to, greater than or not equal to another value.

## Arithmetic operators
[link](http://jsbin.com/zoqiga/edit?js,console)


## Logical operators

Offer AND(&&), OR(||), and NOT(!) when comparing values
[link](http://jsbin.com/nesolem/edit?js,console)

## String operators

Concatenate or join strings together
[link](http://jsbin.com/pozira/edit?js,console)

## Conditional (ternary) operator

Lets us assign a value based on a conditional statement. Also called a Ternary Operator (since they have 3 parts).

```js
variable = ( conditional ) ? true : false;
```

[link](http://jsbin.com/gozabud/edit?js,console)

## If Statements

**WordPress style recommendation for JavaScript**

* spaces between
    - parenthesees
    - curly braces
    - in general, add spaces generously

### === vs ==

`===` (checks to make sure same value AND same type)

**note:** in JavaScript 0 (zero) will pass as `false` in conditional statements and any other number or value will pass as `true`

[link](http://jsbin.com/conasek/edit?js,output)

in above example if we set variable value to 0 and test for it's conditional, it will result in false which will not be what we want

to prevent this problem, use `===`

#### How do the `==` work in Javascript?

##### Coercion
The **automatic** converting of values from one data type to another

happens a bunch of places in JavaScript

* one place is when use `==` in if statements or conditional statements

**tip:** it is preferable to use `===` to compare with `boolean` values

**note:** If statement with no = 

will be true if statement is true

[link](http://jsbin.com/gezimez/edit?js,output)

### Yoda Style

Style of writing where the value we want to test against comes before what we are testing.

```
If yoda username is,
      Then proceed
```

This helps us avoid assigning instead of comparing.
if we follow this rule, we'll get a warning instead of assigning a value of true to our condition which could break our code

[link](http://jsbin.com/hifati/edit?js,output)

coding standards says
```
a little bizarre, it is, to read.
  get used to it, you will.
```

# IF Else & Else If

[link](http://jsbin.com/poxifu/edit?js,output)

**Best Practice** Write If/Else If/Else statements so most common scenario runs first

**Best Practice** Do not omit curly braces even if using 1 line
```js
// GOOD
if (condition) {
 // do something
}

// BAD
if (condition) 
 // do something

```

# Switch Statement

Executes different code based on the value of a single expression, like a variable

* if you omit `break` JavaScript will continue checking until the end of the switch statement. this is inefficient and should be avoided

## Jsbin has jslint built into it.

[link](http://jsbin.com/tirada/edit?js,output)

Switch or Else if?

Use Switch
* when test values of single expression because they're faster

Use Else If
* when test multiple expressions because they are more flexible

**Note** Switch statments always check for value and type (`===`)

**Best Practice**
Switch statements are generally discouraged, but can be useful when multiple cases can be handled by the same block



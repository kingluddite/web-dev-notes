# Loops

Loops let us iterate over and perform actions on a collection of items (like arrays or objects)

## for loop

[link](http://jsbin.com/cojuro/edit?js,output)

```js
for ( initial; conditional; increment ) {

    // Loop body;
    
}

```

intial is usually `i` (stands for `iterator`)
iterator ususally starts at 0

```js
for ( ; ; ) {

    // Still works
    
}
```

**Note**: all options are still optional in for loop

## Infitite Loops

Loops in which the conditions to end the loop are never met and the loop runs indefinitely. (BAD)

result - error, browser crashing or something bad happening

# Do While

Executes once and then checks condition to see if should continue to loop

```js
do {

    // loop body;
     
} while ( condition );
```

# While Loop

Iterates until the condition fails

* simplist loop in all of JavaScript

```js
while ( condition ) {

    // Loop body;
    
}
```

* we use a while loop all the time in WordPress when we display posts
(but that is PHP while loop)

# When to use For, Do While and While Loops

[comparing loops](https://i.imgur.com/8SUGFj2.png)

# Break and Continue Statements

`Break`
Exits from a loop
* used in switch statements
* can also use break within loops

`Continue`
Skips to next iteration of a loop

[link](http://jsbin.com/legosi/edit?js,console)

## For In Loop

Iterates through properties of an object

```js
for ( var prop in obj ) {

    console.log( prop );
    console.log( post[prop] );

}
```

[link](http://jsbin.com/xejoji/edit?js,console)

**Notes:**

* you want to use `For In` loops with objects with properties not with arrays
* you could use `for in` loop with arrays but it is not recommended

## For Of Loop

Iterates through items in a collection, such as an array

```js
for ( var item of collection ) {

    console.log( item );

}
```

[link](http://jsbin.com/yofehu/edit?js,console)

jsbin will alert you that this is a ES6/Bable new feature
so you need to select that from the dropdown in jsbin

pro of using it: much less typing then using the `for loop`



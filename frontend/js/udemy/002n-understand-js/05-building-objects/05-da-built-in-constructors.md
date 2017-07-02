# Dangerous Aside
## Built-in Constructors
```js
> var a = 3;
> var b = new Number(3);
> a == b;
< true
```

* Why is it true?
* Because == coerces types
    - JavaScript Engine sees `a` and sees a primitive
    - JavaScript Engine sees `b` and sees an object
    - And == tries to coerce them and once it does they are equal
    - But if we use the recommended === because `a` is a primitive and `b` is an object made with this function contructor `new Number(3)`

## The Danger
* By using built-in function constructors for creating primitives you aren't really creating primitives and bad things can happen with coercion and comparisons
* It is better, in general, to not use the build-in function constructors, use literals, use the actual primitive values

## Working with Dates
* Use the [moment.js](http://momentjs.com/) library


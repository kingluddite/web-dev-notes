# Undefined and Null
```
let name = 'John';

console.log(name); // John

```

## But we can also define a variable but not assign it like this
```
let noname;

console.log(noname); // undefined
```

* **note** `undefined` is used in JavaScript to represent the **absence** of a value
    - `undefined` is set implicitly behind the scenes

## Write a conditional to check if variable has a value (and is not `undefined`)

```
let anonymous;
if (anonymous === undefined) {
  console.log('Please provide a value');
} else {
  console.log(anonymous);
}
// will output a terminal log 'Please provide a value'
```

## undefined for function arguments
### Where else will we see `undefined` set for us?
* You will also see this with your functional arguments

```
// Undefined for function arguments
let square = function(num) {
  console.log(num);
};

square();
```

* If you do not provide an argument to the function JavaScript will set `num` equal to `undefined`
    - It won't crash the program
    - It won't alert you that the argument is required (there's no way to do that)
    - **remember** When an argument is not provided but it is named in the function definition, `undefined` is assigned as its value

## undefined and function return values
* **remember** When we return from a function we can store its value in a variable
* We will get `undefined` twice
* When you do not explicitly return a value from a function JavaScript will explicitly return `undefined` for that function

```
// Undefined for function arguments
let square = function(num) {
  console.log(num);
};

let result = square();

console.log(result);
```

* **note** `undefined` as function return default value (if none provided)

## Can we manually assign `undefined`? Yes we can
* If you defined a variable and set its value you can remove that value and replace it with `null` like in the following example:

```
let age = 27;
age = undefined;
console.log(age); // undefined
```

* **note** We can explicitly assign `null` to a variable

## Houston we have a problem
* When I manually assign `undefined` to a variable I cause a problem
    - I'm not sure if `age` is `undefined` because it was never given a value
    - Or if it is `undefined` because the variable was explicitly cleared
    - We lose the context between the explicit JavaScript language assigning `undefined` and a coder manually assigned `undefined`
    - **note** This context is IMPORTANT
        + To preserve that context JavaScript gave us a different type that also represents a sort of emptiness and this is called `null`

## Use `null` instead of `undefined` when you want to explicity clear a variable value

```
// using null
let age = 27;

age = null;
console.log(age); // null
```

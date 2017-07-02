# Dangerous Aside
## Arrays and for...in
```js
var arr = ['Manny', 'Moe', 'Jack'];

for (var prop in arr) {
  console.log(prop + ': ' + arr[prop]);
}
```

* Outputs

```
0: Manny
1: Moe
2: Jack
```

* In JavaScript the `key` is actually the name inside the object
* arrays are objects inside JavaScript
* that is how we can use brackets `[prop]` to grab it

## Here is the problem
```js
Array.prototype.myCustomFeature = 'nice!';

var arr = ['Manny', 'Moe', 'Jack'];

for (var prop in arr) {
  console.log(prop + ': ' + arr[prop]);
}
```

* We add a property using prototype to the built in array object
* Lots of libraries/frameworks may add a feature like this to your array object
* Since the array will use the array index as the keys if we add a property like `myCustomerFeature` with prototype, it will get pulled into every for in loops we use with any array

## Rule/Tip
In the case of **arrays** DO NOT USE `for in`

* Instead use the standard for loop

```js
for (var i = 0; i < arr.length; i++) {
    // do stuff
}
```

* That is safe
* But iterating over all properties is NOT SAFE because arrays are objects and you can iterate down to the prototype

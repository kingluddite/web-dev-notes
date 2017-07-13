# JavaScript Aside
## `.call()` and `.apply()`

* We will use ES6 so we set up our VS `jsconfig.json` file

```json
{
    "compilerOptions": {
        "target": "es6"
    }
}
```

* `this` will point to the object itself (obj)

```js
const obj = {
  name: 'John Doe',
  greet() {
    console.log(`Hello ${ this.name }`);
  }
}

obj.greet();
```

* Run with `$ node app.js`
* Outputs

`Hello John Doe`

## Now I will use `.call()`
* I can take any function
    - Because functions are objects in JavaScript
    - They are first class so they have their own methods and properties

```js
const obj = {
  name: 'John Doe',
  greet() {
    console.log(`Hello ${ this.name }`);
  }
}

obj.greet();
object.greet.call(); // add this line
```

* But the difference here by using `.call()` is when I invoke with `.call()` and pass a parameter, whatever I pass is what the `this` keyword will point to
    - I now can overwrite what the `this` keyword will point to
    - This gives the ability to use some powerful patterns

```js
const obj = {
  name: 'John Doe',
  greet() {
    console.log(`Hello ${ this.name }`);
  }
}

obj.greet();
obj.greet.call({ name: 'Jane Doe'});
```

Will output

```
Hello John Doe
Hello Jane Doe
```

* .call() lets me borrow the `obj` method greet() and use my object as this instead of the obj this

## I can use `.apply()` too
```js
const obj = {
  name: 'John Doe',
  greet(param1, param2) {
    console.log(`Hello ${ this.name }`);
  }
}

obj.greet();
obj.greet.call({ name: 'Jane Doe'}, param1, param2);
obj.greet.apply({ name: 'Jane Doe'}, [param1, param2]);
```

* So the only difference between `.call()` and `.apply()` is how you pass the parameters
* With `.apply()` you pass the parameters in an array
* With `.call()` you pass parameters in a comma separated list

## Important takeaway
* Call and apply allow me to change what the `this` keyword points to
* This is a powerful option for borrowing methods and giving them the object I want them to work on

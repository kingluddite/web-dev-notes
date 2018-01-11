# Array Destructuring
```js
const address = ['123 Elm Stree', 'Los Angeles', 'California', '19454'];

console.log(`You are in ${address[1]} ${address[2]}`);
```

* We can do better using array destructuring

```js
const address = ['123 Elm Stree', 'Los Angeles', 'California', '19454'];

const [street, city, state, zip] = address;
console.log(`You are in ${city} ${state}`);
```

* They are named by position in the array

### Do I have to use all items in array to destructure the array?
* No
* Just leave off the end and place commas to represent the missing array items

```js
const [, city, state] = address;
console.log(`You are in ${city} ${state}`);
```

* Use a default value

```js
const address = ['123 Elm Stree', , 'California', '19454'];

const [, city = 'Iowa', state] = address;
console.log(`You are in ${city} ${state}`);
```

* Will output `You are in Iowa California`

```js
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName, small, medium, large] = item;
console.log(`A medium ${itemName} costs ${medium}`);
```




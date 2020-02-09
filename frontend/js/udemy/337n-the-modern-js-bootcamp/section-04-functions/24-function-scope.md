# Function Scope
* We saw scope in conditional blocks
* In JavaScript we have a **Lexical** scoping
    - There is one global scope
    - And multiple local scopes
    - We could create new local scopes inside the blocks of an `if` statement
        + They are accessible inside the local scope and not accessible out of there
        + We created a visualization of the "scope tree"

## We can apply these same scope rules to Functions
`function-scope.js`

```
// Scope Tree
//  Global scope (we always have this)
//   What is in Global scope in this file?
//     convertFahrenheitToCelsius, temp1, temp2
//   What is in the function local scope?
//     tempAsCelcius
//     IMPORTANT - the function arguments are also part of this function's local scope
//     So temp is also in the local function scope

let convertFahrenheitToCelsius = function(temp) {
  // code
  let tempAsCelcius = ((temp - 32) * 5) / 9;

  // return value
  return tempAsCelcius;
};

// reference values
const temp1 = convertFahrenheitToCelsius(32);
const temp2 = convertFahrenheitToCelsius(68);

// output
console.log(temp1); // 0
console.log(temp2); // 20
```

* We can't access `temp` or `tempAsCelcius` even after the function runs

## Let's adjust our code and our scope tree
```
let convertFahrenheitToCelsius = function(temp) {
  // code
  let tempAsCelcius = ((temp - 32) * 5) / 9;

  if (tempAsCelcius <= 0) {
    let isFreezing = true;
  }

  // return value
  return tempAsCelcius;
};

// reference values
const temp1 = convertFahrenheitToCelsius(32);
const temp2 = convertFahrenheitToCelsius(68);

// output
console.log(temp1); // 0
console.log(temp2); // 20
```

### Here is the scope tree of the above code
```
// Global scope (convertFahrenheitToCelcius, temp1, temp2)
//   Local scope (temp, tempAsCelcius)
//     Local scope (isFreezing)
```

* From inside isFreezing if block
    - You can access isFreezing
    - Go up the tree to access temp or tempAsCelcius
    - Go one more up the tree and access convertFahrenheitToCelcius, temp1, temp2)

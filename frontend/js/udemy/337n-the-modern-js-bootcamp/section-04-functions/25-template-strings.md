# Template strings
* aka Template literals
* Strings use `""` and `""`
* ES6 introduced template literals that use the backtick (`)
    - Surround your string with backticks
    - Put a javascript expression inside the template string `${variable}`

```
let name = 'John';
console.log(`Hello, my name is ${name`); // Hello my name is John
```

## Pros of Template strings
* Easier to read
* Easier to move and rearrange things

## Integrate template string inside getTip function
```
let getTip = function tipCalculator(total, tipPercent = 0.2) {
  return (total * (1 + tipPercent)).toFixed(2);
};
```

* But you want to output a template string that says `A 20% tip on the total value of $100 would be $120`

```
console.log('#### Tip Calculator Challenge ####');
let getTip = function tipCalculator(total, tipPercent = 0.2) {
  let tip = total * (1 + tipPercent).toFixed(2);
  return `A ${tipPercent *
    100} percent tip on a total value of $${total} would be $${tip.toFixed(
    2
  )}`;
};

let tipOne = getTip(100, 0.05);
let tipTwo = getTip(100);
let tipThree = getTip(100, 0.15);

// Output
// A 5 percent tip on a total value of $100 would be $ 105.00
// A 20 percent tip on a total value of $100 would be $ 120.00
// A 15 percent tip on a total value of $100 would be $ 115.00
```

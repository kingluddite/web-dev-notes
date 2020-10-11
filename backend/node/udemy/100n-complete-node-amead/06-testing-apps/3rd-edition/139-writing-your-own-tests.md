# Writing your own tests
```
const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!
```

## Solution
```
test('Should convert 32 F to 0 C', () => {
  const total = fahrenheitToCelsius(32);
  expect(total).toBe(0);
})


test('Should convert 0 C to 32 F', () => {
  const total = celsiusToFahrenheit(0);
  expect(total).toBe(32);
})
```


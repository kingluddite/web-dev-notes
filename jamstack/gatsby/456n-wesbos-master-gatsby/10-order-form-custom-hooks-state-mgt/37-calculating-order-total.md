# Calculate Order Total
* And display it at the bottom
* We'll display a button that when clicked
    - We can generate the order
    - Sending it over via email

## calculateOrderTotal custom hook
```
export default function calculateOrderTotzal(order, pizzas) {
  return 'yo!';
}
```

* Consume our custom hook

```
// MORE CODE

        <fieldset>
          <h3>Your Total is {calculateOrderTotal(order, pizzas)}</h3>
          <button type="submit">Order Ahead</button>
        </fieldset>
      </OrderStyles>

// MORE CODE
```

* Test and you'll see `YOUR TOTAL IS YO!` in the browser

#### What do we want do do in our calculateOrderTotal custom hook?
1. Loop over every single item in the order 
2. Calculate the total for that pizza
3. Add that total to the running total

* **Tip** Using a reduce
    - Great for taking an array of things and reducing it down into a single number
        + The reduce() method takes two things
            * (the first argument) The callback function where that callback function takes and accumulator (acc) and the single item in the order
            * (the second argument) What you start with (we'll start with `0`)

```
order.reduce((acc, singleOrder) => {
 // what you want to reduce
}, 0);
```

## And here is the custom hook
```
import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotzal(order, pizzas) {
  // 1. Loop over every single item in the order
  const total = order.reduce((acc, singleOrder) => {
    const pizzaOrder = pizzas.find((pizza) => pizza.id === singleOrder.id);
    return acc + calculatePizzaPrice(pizzaOrder.price, singleOrder.size);
  }, 0);
  return total;
  // 2. Calculate the total for that pizza
  // 3. Add that total to the running total
}
```

* `acc` is the accumulator but we could name it to fit in with our function to make our code more readable

```
// MORE CODE

export default function calculateOrderTotzal(order, pizzas) {
  // 1. Loop over every single item in the order
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizzaOrder = pizzas.find((pizza) => pizza.id === singleOrder.id);
  // 2. Calculate the total for that pizza
  // 3. Add that total to the running total
    return runningTotal + calculatePizzaPrice(pizzaOrder.price, singleOrder.size);
  }, 0);
  return total;
}

// MORE CODE
```

## We can refactor our hook
```
import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotzal(order, pizzas) {
  // 1. Loop over every single item in the order
  return order.reduce((runningTotal, singleOrder) => {
    const pizzaOrder = pizzas.find((pizza) => pizza.id === singleOrder.id);
    // 2. Calculate the total for that pizza
    // 3. Add that total to the running total
    return runningTotal + calculatePizzaPrice(pizzaOrder.price, singleOrder.size);
  }, 0);
}
```

* Test in browser
    - Add pizzas and what the total grow

## Upper scope error wes fix
* You don't want to name your variable what the same name as the find array method's single variable name

```
import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotzal(order, pizzas) {
  // 1. Loop over every single item in the order
  return order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((singlePizza) => singlePizza.id === singleOrder.id);
    // 2. Calculate the total for that pizza
    // 3. Add that total to the running total
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
```

## Format our money
`orders.js`

```
// MORE CODE

>
          <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
          <button type="submit">Order Ahead</button>
        </fieldset>

// MORE CODE
```

* Now our total is formatted in currency

## Next - Persist our order using React Context

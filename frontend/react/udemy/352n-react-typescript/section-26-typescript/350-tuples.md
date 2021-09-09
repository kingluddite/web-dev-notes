# Tuples
* Array like structure where each element represents one specific property of some record
* An array organizes a bunch of different records
    - A tuple usually contains multiple different properties to describe one single thing
    - Usually inside a tuple you will mix and match many different types of data inside there

## Represent a drink object
```js
{
    color: 'brown',
    carbonated: true,
    suger: 40
}
```
* A tuple is a fixed **order** if items inside an array

```js
[
    color: 'brown',
    carbonated: true,
    suger: 40
]
```
## Type Alias
* The following does not create an array
* It creates an idea of a tuple inside of our application
* It is a brand new type that we can freely use that anyplace where we would normally put a type

```js
type Drink = [string, boolean, number];

const coke: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];
```

### You won't use tuples much
* Objects are easier to understand at first glace vs a tuple





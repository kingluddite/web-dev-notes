# JavaScript aside
## JSON
"JavaScript Object Notation"

* A standard for structuring data that is inspired by JavaScript object literals
* JavaScript Engines are built to understand it

Example

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "address": {
    "street": "123 Elm St",
    "city": "Hatfield",
    "state": "Maine"
  }
}
```

* Note we don't put functions inside JSON because this is pure data we are sending across the wire
* We also have to put our names in double quotes `""`
* JavaScript and the V8 engine comes built-in with the ability take this as text and convert this to a JavaScript object just as if we had used object literal notation
* And they can take objects and convert them to JSON

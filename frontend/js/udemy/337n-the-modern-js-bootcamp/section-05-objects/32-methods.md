# Methods
* We can add functions as values for our object properties
* A method is nothing more than an object property who's value is a function

`objects-methods.js`

```
let restaurant = {
  name: 'Wawa',
  guestCapacity: 75,
  guestCount: 0,
  checkAvailability: function() {}
}
```

* How do we call checkAvailability?

```
let restaurant = {
  name: 'Wawa',
  guestCapacity: 75,
  guestCount: 0,
  checkAvailability: function(partySize) {
    console.log(partySize);
  },
};
```

* **note** `console` is an object available to us via JavaScript
    - `log` (console.log()) is a method of `console`

```
let restaurant = {
  name: 'Wawa',
  guestCapacity: 75,
  guestCount: 0,
  checkAvailability: function(partySize) {
    console.log(partySize);
  },
};

restaurant.checkAvailability(4);
```

* We want checkAvailability to return a boolean if there is room in the restaurant for the party passed in as an argument

## The `this` keyword
```
let restaurant = {
  name: 'Wawa',
  guestCapacity: 75,
  guestCount: 0,
  checkAvailability: function(partySize) {
    console.log(this);
    return true;
  },
};

let status = restaurant.checkAvailability(4);
console.log(status);
```

* That will output the restaurant object

```
{
  name: 'Wawa',
  guestCapacity: 75,
  guestCount: 0,
  checkAvailability: [Function: checkAvailability]
}
```

* `this` inside the method represents the parent object

```
let restaurant = {
  name: 'Wawa',
  guestCapacity: 75,
  guestCount: 0,
  checkAvailability: function(partySize) {
    let seatsLeft = this.guestCapacity - this.guestCount;
    return partySize <= seatsLeft;
  },
  seatParty: function(partySize) {
    this.guestCount = this.guestCount + partySize;
  },
  removeParty: function(partySize) {
    this.guestCount = this.guestCount - partySize;
  },
};

// seatParty (takes the party size to be seated and adds that on to guestCount
// removeParty (takes the party size to be removed and subtracts that from guestCount)

console.log(restaurant);
restaurant.seatParty(72);
console.log(restaurant.checkAvailability(4)); // false (guestCount is 72, capacity is 75, if we add 4 people we don't have enough room)
restaurant.removeParty(5);
console.log(restaurant.checkAvailability(4)); // true (after removing 5 guests we have room for more people)
console.log(restaurant);
```

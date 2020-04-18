# Logical "and" "or" operators
* `&&` (and)
* `||` (or)

`logical-and-or.js`

```
let temp = 150;
if (temp >= 60 && temp <= 90) {
  console.log("Great day!");
} else if (temp <= 0 || temp >= 120) {
  console.log("Do not go outside");
} else {
  console.log("You decide");
}
```

## Challenge
```
let isGuestOneVegan = true;
let isGuestTwoVegan = false;
// Are both vegan? Only offer up vegan dishes
// At least one vegan? Make sure to offer up some vegan options
// Else, Offer up anything on the menu

if (isGuestOneVegan && isGuestTwoVegan) {
  console.log("Oh boy you will love our vegan food!");
} else if (isGuestOneVegan || isGuestTwoVegan) {
  console.log("We have some vegan and meat dishes for both of you");
} else {
  console.log("You have access to our full menu");
}
```


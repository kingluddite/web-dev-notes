# Advanced If statements
* The Not operator `!`
* `else if` and `else` are optional in if statements

`boolean-advanced.js`

```
let isAccountLocked = false;
let userRole = 'admin';

if (isAccountLocked) {
  console.log('The account is  locked');
} else if (userRole === 'admin') {
  console.log('Welcome admin');
} else {
  console.log('Welcome');
}
// output --> Welcome admin
```

## Challenge
* print too hot, too cold or just a perfect day

```
let temp = 132;
if (temp >= 110) {
  console.log('too darn hot!');
} else if (temp <= 32) {
  console.log('too darn cold!');
} else {
  console.log('what a perfect day');
}
```



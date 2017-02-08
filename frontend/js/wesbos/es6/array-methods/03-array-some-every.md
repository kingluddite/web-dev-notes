# Array .some() and .every()

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Array .some() and .every()</title>
</head>
<body>
<script>
const ages = [32, 15, 19, 12];

// Is there at least one adult in the group?

// Is everyone old enough to drink?
</script>
</body>
</html>
```

These are not part of ES6 but they are not used enough

`.some()` and `.every()` will check the data in an array and check if some of the items meet you're looking for or all of them are

## .some()

```js
const ages = [32, 15, 19, 12];
const youngsters = [1, 3, 4, 8];

// Is there at least one adult in the group?
// const adultPresent = ages.some(age => age >= 18);
const adultPresent = youngsters.some(age => age >= 18);
console.log(adultPresent)
```

Search just for one match and returns true

## every()
```js
// Is everyone old enough to drink?
const allOldEnough = ages.every(age => age >= 21);
console.log(allOldEnough);
```

Change it to have all ages greater than or equal to 21 and you will get `true` otherwise you will get false

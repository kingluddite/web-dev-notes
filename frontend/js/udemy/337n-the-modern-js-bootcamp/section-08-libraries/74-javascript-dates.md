# JavaScript Dates
* We'll work with dates and time in JavaScript
* We'll wire up our sorting dropdown
    - Sort by last edited (date/time)
    - Sort by recently created (date/time)
    - Sort alphabetically

## Let's work with dates in JavaScript
`const new = Date()` is something we recognize

* But this:

`const new = new Date()` is something "new" (pun intended)

* The `new` word is a constructor and it is creating a "new" instance of the Date object
* This date represents the current point in time
* We'll discuss `new` more when we discuss object oriented programming in JavaScript

## Let's get a string representation of our date
`notes-app.js`

```
const currentTime = new Date();
console.log(currentTime.toString()); // like Thu Feb 13 2020 18:10:03 GMT-0800 (Pacific Standard Time)
```

### We need better time format
* We just need the day of the week or the day/month/year
* Or 3 days ago (last edited)

#### Docs for Date
* The date object gives us all the stuff we need
* There are a lot of docs on date in JavaScript
* [date docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

`notes-app.js`

```
// MORE CODE
const now = new Date();
console.log(now.toString()); // like Thu Feb 13 2020 18:10:03 GMT-0800 (Pacific Standard Time)
// today is 2/13/2020 @ 6:52pm
console.log(`Year: ${now.getFullYear()}`); // 2020
console.log(`Month: ${now.getMonth()}`); // 1 (January is 0, December is 11)
console.log(`Day of month: ${now.getDate()}`); // 13
console.log(`Hour: ${now.getHours()}`); // 18 (military time)
console.log(`Minute: ${now.getMinutes()}`); // 50
console.log(`Second: ${now.getSeconds()}`); // Second 49
```

## How to create a date at a different point in time
* Not just the current date

### new Date()
* No arguments creates a date in current time
* If we provide arguments we can create a date at that point in time

```
// MORE CODE
const now = new Date('January 21 2000 6:25:01');
console.log(now.toString()); // like Thu Feb 13 2020 18:10:03 GMT-0800 (Pacific Standard Time)
// today is 2/13/2020 @ 6:52pm
console.log(`Year: ${now.getFullYear()}`); // 2020
console.log(`Month: ${now.getMonth()}`); // 1 (January is 0, December is 11)
console.log(`Day of month: ${now.getDate()}`); // 13
console.log(`Hour: ${now.getHours()}`); // 18 (military time)
console.log(`Minute: ${now.getMinutes()}`); // 50
console.log(`Second: ${now.getSeconds()}`); // Second 49
```

* But we normally don't store dates in strings but rather in a number

## Unix Epoch
* Unix Epoch is a specific point in time in the past
    - `January 1st 1970 00:00:00`
* We represent positive time all numbers after this data
    - Use a positive number to represent today
* We represent negative time all numbers before this dat
    - Use a negative number to represent 1930

### The Epoch is 0
* 1 second past the epoch is `1000` because 1000 milliseconds is 1 second
* 1 minute in the past would be `-1000` * **60** = -60,000 milliseconds

## A day is a large number - when taking into consideration the Epoch
* Yes it is

### getTime (gets us the timestamp)

```
// MORE CODE
const now = new Date('January 21 2000 6:25:01');
console.log(now.toString(now.getTime())); // like Thu Feb 13 2020 18:10:03 GMT-0800 (Pacific Standard Time)
// today is 2/13/2020 @ 6:52pm
// console.log(`Year: ${now.getFullYear()}`); // 2020
// console.log(`Month: ${now.getMonth()}`); // 1 (January is 0, December is 11)
// console.log(`Day of month: ${now.getDate()}`); // 13
// console.log(`Hour: ${now.getHours()}`); // 18 (military time)
// console.log(`Minute: ${now.getMinutes()}`); // 50
// console.log(`Second: ${now.getSeconds()}`); // Second 49
```

`Fri Jan 21 2000 06:25:01 GMT-0800 (Pacific Standard Time)`

## If we have a timestamp
* We can easily get a date representation back from it

### Steps to get a good date representation
* We want to get the year

1. Get the date now
2. Convert to a timestamp with getTime()
3. Create a new date and pass the Date() method the date you just created
4. Log out that date how you want to see the date (let's just show the year)

```
// MORE CODE
const now = new Date();
const timestamp = now.getTime();
const newDate = new Date(timestamp);
console.log(newDate.getFullYear()); // 2020
```

### We'll use this to get date when we create new note
```
const now = new Date();
const timestamp = now.getTime();
const newDate = new Date(timestamp);
console.log(newDate.getFullYear());

```

### This is how we use dates after we read the data from localStorage and do something specific related to the date

### Knowing which date comes first
* Using timestamps this is easy just use `<` or `>`
* `timestamp` is a number so we can easily compare it to other timestamps

## Challenge
* Get 2 dates from the past
* Get the timestamps for both dates you got in step 1
* Then figure out which date comes first using comparison operators, and print the one that does come first (use `toString()` to print the timestamp)

### Challenge Solution
```
// MORE CODE
const dateOne = new Date('July 1, 1971 12:00:00');
const dateTwo = new Date('July 1, 1980 12:20:00');

const timestampOne = dateOne.getTime();
const timestampTwo = dateTwo.getTime();

if (timestampOne > timestampTwo) {
  console.log(dateTwo.toString());
} else if (timestampOne < timestampTwo) {
  console.log(dateOne.toString());
} else {
  console.log('timestamps are the same');
}
```

* Output

`> Thu Jul 01 1971 00:00:00 GMT-0700 (Pacific Daylight Time)`

## Working with Dates in JavaScript is not easy nor fun
* If I want to print out the month of February using the Date object there is no method to get that done
    - I would have to take our months
    - Figure out which number that month is `0 - 11`
    - I would have to keep track of a list of all of the strings
    - And I would have to look those strings up by their index
    - That would be a huge burden
    - We would have to write a ton of code just to get simple date stuff working
* Most dev's use a 3rd party library when working with dates call `moment`

## Next - Working with moment js library

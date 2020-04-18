# Moment
* We'll install with the [cdn link](https://cdnjs.com/libraries/moment.js) on the [moment docs page](https://momentjs.com/docs/)
* We'll use a CDN and use the most recent version
    - moment min with locales

```
https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js
```

* Add the above to both notes and todos just below the other library (uuid v4)

`todo-app/index.html`

```
// MORE CODE
    <script src="assets/js/uuidv4.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>
    <script src="assets/js/todos-functions.js"></script>
    <script src="assets/js/todos-app.js"></script>
  </body>
</html>
```

`notes-app/index.html`

```
// MORE CODE
    <script src="assets/js/uuidv4.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>
    <script src="assets/js/todos-functions.js"></script>
    <script src="assets/js/todos-app.js"></script>
  </body>
</html>
    <script src="assets/js/notes-functions.js"></script>
    <script src="assets/js/notes-app.js"></script>
  </body>
</html>
```

* Grab all our date code and put in `date-stuff.js`

```
const dateOne = new Date('July 1, 1991 12:00:00');
const dateTwo = new Date('July 1, 1990 12:20:00');

const timestampOne = dateOne.getTime();
const timestampTwo = dateTwo.getTime();

if (timestampOne > timestampTwo) {
  console.log(dateTwo.toString());
} else if (timestampOne < timestampTwo) {
  console.log(dateOne.toString());
} else {
  console.log('timestamps are the same');
}

// const now = new Date();
// const timestamp = now.getTime();
// const newDate = new Date(timestamp);
// console.log(newDate.getFullYear());

// today is 2/13/2020 @ 6:52pm
// console.log(`Year: ${now.getFullYear()}`); // 2020
// console.log(`Month: ${now.getMonth()}`); // 1 (January is 0, December is 11)
// console.log(`Day of month: ${now.getDate()}`); // 13
// console.log(`Hour: ${now.getHours()}`); // 18 (military time)
// console.log(`Minute: ${now.getMinutes()}`); // 50
// console.log(`Second: ${now.getSeconds()}`); // Second 49
```

## Let's start with moment js
`notes-app.js`

```
// MORE CODE
// get representation of current point in time with moment js
const now = moment();
console.log(now.toString()); // Sat Feb 15 2020 17:13:03 GMT-0800
```

* Above is moment's way of doing what we did with new Date() in vanilla JavaScript

## Now we'll manipulate moment
* [get set docs](https://momentjs.com/docs/#/get-set/)
    - For minute, hour and date there is a singular and plural
    - If you don't pass an argument you are "getting" a value
    - If you do pass an argument you are "setting" a value

## So I want to manipulate the time we set above to be 1 minute 
```
// MORE CODE

// get representation of current point in time with moment js
const now = moment();
now.minute(1);
console.log(now.toString()); // Sat Feb 15 2020 17:01:48 GMT-0800

// MORE CODE
```

## How to just find out the minute of time
```
// MORE CODE

// get representation of current point in time with moment js
const now = moment();
// now.minutes();
console.log(now.minute()); // 20

// MORE CODE
```

## Add and substract dates relative to where we are
* Will be under the `Manipulate` section of the moment docs
    - moment's `add()` and `subtract()` take 2 arguments:
        1. the amount
        2. the unit

## Add on 1 year
```
// MORE CODE

// get representation of current point in time with moment js
const now = moment();
now.add(1, 'year');
console.log(now.toString()); // Mon Feb 15 2021 17:23:28 GMT-0800

// MORE CODE
```

* Notice 1 years was added on to the current year of 2020

## Now we'll add 1 year and subtrace 20 days
* We'll use `chaining` to save typing

```
// MORE CODE

// get representation of current point in time with moment js
const now = moment();
now.add(1, 'year').subtract(20, 'days');
console.log(now.toString()); // Tue Jan 26 2021 17:25:38 GMT-0800

// MORE CODE
```

* Above we see we added a year and subtracted 20 days from the that date

## How to format dates
* Making the dates "pretty" for end users
* It will be under the `Display` heading in [the moment docs](https://momentjs.com/docs/#/displaying/)

`moment().format()`

* You don't need to pass any arguments to `format()` but if you don't you'll get an ugly hard to read date
* We can pass in a String to our `moment.format()`
    - You will see Token and Output in the table on this page
    - Pass in the tokens you need to get the Output you desire

## Make your moment look like `November 3rd, 2003`
```
// MORE CODE

// get representation of current point in time with moment js
const now = moment();
now
  .year(2003)
  .month(10)
  .date(3);
console.log(now.format('MMMM Do, YYYY')); 

// MORE CODE
```

## Time from now
* Under `Display` in the [docs](https://momentjs.com/docs/#/displaying/fromnow/)
* You see this on instagram posts (post was made "4 minutes ago")

### I can see how long from now our date above is (november 13, 2003)
```
// MORE CODE

// get representation of current point in time with moment js
const now = moment();
now
  .year(2003)
  .month(10)
  .date(3);
console.log(now.format('MMMM Do, YYYY')); // Tue Jan 26 2021 17:25:38 GMT-0800
console.log(now.fromNow()); "16 years ago"

// MORE CODE
```

## Future time
```
// MORE CODE

// get representation of current point in time with moment js
const now = moment();
now
  .year(2020)
  .month(10)
  .date(13);
console.log(now.format('MMMM Do, YYYY')); // Tue Jan 26 2021 17:25:38 GMT-0800
console.log(now.fromNow()); "in 9 months"

// MORE CODE
```

## How do we get the Unix Timestamp in milliseconds)
* [docs](https://momentjs.com/docs/#/displaying/unix-timestamp-milliseconds/)

```
// MORE CODE

// get representation of current point in time with moment js
const now = moment();
now
  .year(2020)
  .month(10)
  .date(13);
console.log(now.format('MMMM Do, YYYY')); // Tue Jan 26 2021 17:25:38 GMT-0800
console.log(now.fromNow());
console.log(now.valueOf()); // 1605318299603

// MORE CODE
```

## Use any timestamp with moment
* You most likely will be storing timestamps so you grab that data and manipulate it using moment
* I'll grab the timestamp of December 31st, 1999

```
// MORE CODE

// get representation of current point in time with moment js
const then = moment();
then
  .year(1999)
  .month(11)
  .date(31);
console.log(then.format('MMMM Do, YYYY')); // Tue Jan 26 2021 17:25:38 GMT-0800
console.log(then.fromNow());
const princeAndTheRevolutionTimestamp = then.valueOf();
console.log(moment(princeAndTheRevolutionTimestamp).toString());

// MORE CODE
```

* Output from above

```
0691048d-bccb-4d96-9598-16db66cbe660
notes-app.js:59 December 31st, 1999
notes-app.js:60 20 years ago
notes-app.js:62 Fri Dec 31 1999 17:52:31 GMT-0800
```

## Challenge with moment
1. Create a new moment
2. Set the month, day, and year to your birthday
3. Use format to print it in the following format: "July 1st, 1980"

### Challenge Solution
```
// MORE CODE

const coolGuyBirthday = moment()
  .month(6)
  .date(1)
  .year(1980);
console.log(coolGuyBirthday.format('MMMM Do, YYYY')); // July 1st, 1980

// MORE CODE
```


# Using Objects with functions
* I have 2 objects

```
let myBook = {
  title: '1984',
  author: 'George Orwell',
  pageCount: 326,
};

let otherBook = {
  title: 'A Peoples History',
  author: 'Howard Zinn',
  pageCount: 723,
};
```

* How would I print a summary of the title and author?
    - I would need to console.log for all books in my collection (not efficient)
    - Creating code that is duplicated over and over again is not DRY

## Using a function would be more efficient
* We'll write a function that excepts a book object
* It will then use the books properties to print the summary

`objects-functions.js`

```
let myBook = {
  title: '1984',
  author: 'George Orwell',
  pageCount: 326,
};

let otherBook = {
  title: 'A Peoples History',
  author: 'Howard Zinn',
  pageCount: 723,
};

let booksSummary = function(book) {
  console.log(`The book ${book.title} by ${book.author}`);
};

booksSummary(myBook);
booksSummary(otherBook);
```

## That was passing an object into a function

## Now let's learn how to return an object from a function
* Why would I want to do that?
    - One very good reason is it enables you to return multiple values
    - Up until now all our return statements returned a single item

```
let getSummary = function(book) {
  return {
    summary: `The book ${book.title} by ${book.author}`,
    pageCountSummary: `The book ${book.title} has ${book.pageCount} pages long.`,
  };
};
```

* Now we are not using console.log to get output and we need to do something with our returned object
* We store the invoking functions in a variable and then log them

```
let getSummary = function(book) {
  return {
    summary: `The book ${book.title} by ${book.author}`,
    pageCountSummary: `The book ${book.title} has ${book.pageCount} pages long.`,
  };
};

let firstBook = getSummary(myBook);
let secondBook = getSummary(otherBook);
console.log(firstBook.summary); // The book 1984 by George Orwell
console.log(firstBook.pageCountSummary); // The book 1984 has 326 pages long.
console.log(secondBook.summary); // The book A Peoples History by Howard Zinn
console.log(secondBook.pageCountSummary); // The book A Peoples History has 723 pages long.
```

## Challenge
* Convert Fahrenheit to Celsius and kelvin

```
function convertFahrenheitToCelsius(temp) {
  // code
  let tempAsCelcius = ((temp - 32) * 5) / 9;

  // return value
  return tempAsCelcius;
}
```

### Challenge Solution
```
console.log('***** Challenge Time! *****');
// Convert Fahrenheit to Celsius and Kelvin

let celsAndKelvin = function convertToTemps(fahrenheit) {
  // code
  let celcius = (((fahrenheit - 32) * 5) / 9).toFixed(2);
  let kelvin = (((fahrenheit - 32) * 5) / 9 + 273.15).toFixed(2);

  // return value
  return {
    fahrenheit,
    celcius,
    kelvin,
  };
};

let tempOne = celsAndKelvin(65);
let tempTwo = celsAndKelvin(90);
console.log(tempOne.celcius); // 18.33
console.log(tempOne.kelvin); // 291.48
console.log(tempOne.fahrenheit); // 65
console.log(tempTwo.celcius); // 32.22
console.log(tempTwo.kelvin); // 305.37
console.log(tempTwo.fahrenheit); // 90
```

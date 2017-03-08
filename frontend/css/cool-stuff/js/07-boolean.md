# Booleans
In order for JavaScript to compare two different data types (for example, numbers and strings), it must convert one type to another. Once it does, however, it can compare terms as follows:

   1   ==  1    // true
   1   ==  2    // false
   1   == '1'   // true
  "3"  ==  3    // true

  ## strict equality operator ===

Strict equality (===) is the counterpart to the equality operator (==). Unlike the equality operator, strict equality tests both the data type and value of the compared elements.

Examples

3 === 3   // true
3 === '3' // false
In the second example, 3 is a Number type and '3' is a String type.

## inequality operator
The inequality operator (!=) is the opposite of the equality operator. It means "Not Equal" and returns false where equality would return true and vice versa. Like the equality operator, the inequality operator will convert data types of values while comparing.

Examples

1 != 2      // true
1 != "1"    // false
1 != '1'    // false
1 != true   // false
0 != false  // false

## String Inequality operator
The strict inequality operator (!==) is the logical opposite of the strict equality operator. It means "Strictly Not Equal" and returns false where strict equality would return true and vice versa. Strict inequality will not convert data types.

Examples

3 !== 3   // false
3 !== '3' // true
4 !== 3   // true

## Comparison with the Greater than operator
The greater than operator (>) compares the values of two numbers. If the number to the left is greater than the number to the right, it returns true. Otherwise, it returns false.

Like the equality operator, greater than operator will convert data types of values while comparing.

Examples

 5 > 3   // true
 7 > '3' // true
 2 > 3   // false
'1' > 9  // false

## Comparison with Greator then or equal to operator
The greater than or equal to operator (>=) compares the values of two numbers. If the number to the left is greater than or equal to the number to the right, it returns true. Otherwise, it returns false.

Like the equality operator, greater than or equal to operator will convert data types while comparing.

Examples

 6  >=  6  // true
 7  >= '3' // true
 2  >=  3  // false
'7' >=  9  // false

## Comparison with the less operator
The less than operator (<) compares the values of two numbers. If the number to the left is less than the number to the right, it returns true. Otherwise, it returns false. Like the equality operator, less than operator converts data types while comparing.

Examples

  2 < 5  // true
'3' < 7  // true
  5 < 5  // false
  3 < 2  // false
'8' < 4  // false

## Comparisons with Logical AND Operator (&&)
Sometimes you will need to test more than one thing at a time. The logical and operator (&&) returns true if and only if the operands to the left and right of it are true.

The same effect could be achieved by nesting an if statement inside another if:

if (num > 5) {
  if (num < 10) {
    return "Yes";
  }
}
return "No";
will only return "Yes" if num is greater than 5 and less than 10. The same logic can be written as:

if (num > 5 && num < 10) {
  return "Yes";
}
return "No";

Logical Order is important
Order is important in if, else if statements.

The loop is executed from top to bottom so you will want to be careful of what statement comes first.

Take these two functions as an example.

Here's the first:

function foo(x) {
  if (x < 1) {
    return "Less than one";
  } else if (x < 2) {
    return "Less than two";
  } else {
    return "Greater than or equal to two";
  }
}
And the second just switches the order of the statements:

function bar(x) {
  if (x < 2) {
    return "Less than two";
  } else if (x < 1) {
    return "Less than one";
  } else {
    return "Greater than or equal to two";
  }
}
While these two functions look nearly identical if we pass a number to both we get different outputs.

foo(0) // "Less than one"
bar(0) // "Less than two"


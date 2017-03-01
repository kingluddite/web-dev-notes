# Numbers
We can store decimal numbers in variables too. Decimal numbers are sometimes referred to as floating point numbers or floats.

**Note**
Not all real numbers can accurately be represented in floating point. This can lead to rounding errors.

## Remainder operator
Usage
In mathematics, a number can be checked to be even or odd by checking the remainder of the division of the number by 2.
```
17 % 2 = 1 (17 is Odd)
48 % 2 = 0 (48 is Even)
```

**Note**
The remainder operator is sometimes incorrectly referred to as the "modulus" operator. It is very similar to modulus, but does not work properly with negative numbers.

## Compound Assignment With Augmented Addition

In programming, it is common to use assignments to modify the contents of a variable. Remember that everything to the right of the equals sign is evaluated first, so we can say:

myVar = myVar + 5;

to add 5 to myVar. 

Since this is such a common pattern, there are operators which do both a mathematical operation and assignment in one step

One such operator is the `+=` operator

```
var myVar = 1;
myVar += 5;
console.log(myVar); // Returns 6
```

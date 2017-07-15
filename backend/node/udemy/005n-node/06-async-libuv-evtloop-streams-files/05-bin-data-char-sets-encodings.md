# Conceptual Aside
* Binary Data
* Character Sets
* Encoding

## Binary Data
* Data stored in binary (_sets of 1s and 0s_)
* The core of the math that computers are based on
* Each one or zero is called a **bit** or **binary digit**

### Example
0101

* Binarys are numbers eiter 0 or 1

![binary digits](https://i.imgur.com/EPpj64q.png)

* From right to left each digit is associated with 2 to some power
* 0101
    - 2 to zero power is 1
    - 2 to first power is 2
    - 2 to second power is 4
    - 2 to third power is 8

### Multiply numbers
* Then we multiple (2 to third power is 8) * 0 = 0
* Then we multiple (2 to second power is 4) * 1 = 4
* Then we multiple (2 to first power is 2) * 0 = 0
* Then we multiple (2 to zero power is 1) * 1 = 1

### Add numbers
0 + 4 + 0 + 1 = 5

* So this binary number = 5

![add to 5 binary](https://i.imgur.com/h8iVz8j.png)

## Base 2
* Because we are calculating each number using 2 we call it `Base 2` (_binary_)
* It is Base 2 representation of a number
* We only need 2 digits to represent this number
    - 0,1

## We are used to numbers like 53
* How do we know this number is 53?

53
10(1) 10(0)

* From right to left
    - 10 to zero power is 1 x (3) = 3 
    - 10 to first power is 10 x (5) = 50
    - 50 + 3 = 53
* Because we are basing it off 10 to some power we call it **Base 10**

![base 2 and base 10](https://i.imgur.com/YQm3g6k.png)

* We use 10 digits to represent it
    - 1,2,3,4,5,6,7,8,9,0

## Binary is great for computers
* We can easily represent binary data physically
* BlueRay bumps
    - As it spins lasers hit a bump or no bump
    - A bump is 1, no bump is 0
    - You have a way physically to represent 0 and 1
* Inside your computer there are billions of transisters
    - Which are essentially switches
    - Whether electricity is flowing or not
    - on is 1
    - off is 0
* Because we can physically store numbers, that lets us store data
* Everything we store is in binary data, it is numeric
    - In order to store other kinds of data we have to represent it as a number

## Character Set
* A representation of characters as numbers
* Each character gets a number
* `Unicode` and `ASCII` are character sets 

| h | e | l | l | o
| :---: |:---:| :---:| :---:| :---: |
| 104  | 101 | 108 | 108 | 111 |

* What number I give the character defines that particular character set
* Above is the `Unicode` character set
* So I **map** a number to a **letter** (that is a character set)

## Unicode is popular
* English and Spanish don't have many characters
* Other languages require a lot more characters
    - Japanese
    - Chinese
* We need larger character sets so we need bigger numbers
* We need more numbers available to represent all the numbers
* Since we need more numbers we need more bits for every character
* We are going from a letter to a number
    - But remember the number is stored in **binary**

## Character Encoding
* How characters are stored in binary
* The numbers (_or code points_) are converted and stored in binary
* There are different ways I could store a number in binary

![character encoding](https://i.imgur.com/INFfpEp.png)

* I have a number
* And the `Character Set` says "Ok, this is the number that each letter represents"
* And then the `Character Encoding` (above diagram uses UTF-8) determines how we are going to store the number in `Binary`

## But isn't there only one way to store 0's and 1's?
* When we talk about encoding we are really talking about how many **bits** we use to represent each number
    - With UTF-8
        + We have 8 **bits**
            * 8 digits to represent the number
            * H would be `01101000` (that is 8 digits)
                - Even if it doesn't need all the digits there will be 0's to the left but it always gets 8 digits
                - The more bits/digits, the bigger the number we can represent
        + UTF-8 is popular because the more numbers we have the more numbers we can use for international usage
            * For languages that have more characters than others

## Takeaway
* Character Set is what number represents that letter
* Character Encoding is how many bits are we using to store that number 
* UTF-8 is the most popular on the internet

## When dealing with a server
* You need to be able to deal with binary data, character sets and character encodings
* JavaScript is not good at the `Encoding` part
* JavaScript handles `Unicode` well, translating letters to numbers and back and forth
* But the pure, raw binary data, JavaScript doesn't have a lot of features to deal with that
    - Because of that Node and the V8 JavaScript Engine inside it, expands on the JavaScript language and gives us mechanisms to deal with binary data (_raw 0s and 1s_)
    - This is good and important because when dealing with files and data flying across `the wire` we need to deal with binary data


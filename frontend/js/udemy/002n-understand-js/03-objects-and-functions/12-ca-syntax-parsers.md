# Conceptual Aside: Syntax Parsers
* The code you write isn't directly run on the computer
* There is that intermediary program between your code and the computer that translates your code into something the computer can understand
* The JavaScript Engine on your browser does this and it has different aspects and elements to it and one of them being a syntax parser which reads your code and determines if it is valid and what it is you are trying to do

## Example
* If it sees `r` by itself, it assumes you are going to write a `return` statement
* JavaScript Engine goes through your code character by character
    - `r` `e` `t` `u` `r` `n` `;`
    - As it goes through each character
    - It makes assumptions
    - States certain rules
    - And can even make changes to your code before it is executed

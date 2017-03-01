# Strings

## Escaping Literal Quotes in Strings
When you are defining a string you must start and end with a single or double quote. What happens when you need a literal quote: " or ' inside of your string?

In JavaScript, you can escape a quote from considering it as an end of string quote by placing a backslash (\) in front of the quote.

var sampleStr = "Alan said, \"Peter is learning JavaScript\".";

This signals to JavaScript that the following quote is not the end of the string, but should instead appear inside the string. So if you were to print this to the console, you would get:

Alan said, "Peter is learning JavaScript"

**note** - Unlike some languages, single and double quotes are functionally identical in JavaScript.

# Escape Sequences in Strings
Quotes are not the only characters that can be `escaped` inside a string. There are two reasons to use escaping characters: First is to allow you to use characters you might not otherwise be able to type out, such as a backspace. Second is to allow you to represent multiple quotes in a string without JavaScript misinterpreting what you mean.

**Code**    **Output**
`\'`  single quote
`\"`  double quote
`\\`  backslash
`\n`  newline
`\r`  carriage return
`\t`  tab
`\b`  backspace
`\f`  form feed 

**note**that the backslash itself must be escaped in order to display as a backslash

Assign the following three lines of text into the single variable myStr using escape sequences

```js
FirstLine
    \SecondLine
ThirdLine
```

You will need to use escape sequences to insert special characters correctly. You will also need to follow the spacing as it looks above, with no spaces between escape sequences or words.

`var myStr = "FirstLine\n\tSecondLine\nThirdLine";`

## Understand String Immutability
In JavaScript, String values are immutable, which means that they cannot be altered once created.

example:

```js
var myStr = "Bob";
myStr[0] = "J";
```

Cannot change the value of `myStr` to "Job", because the contents of myStr cannot be altered. Note that this does not mean that myStr cannot be changed, just that the individual characters of a string literal cannot be changed. The only way to change myStr would be to assign it with a new string, like this:

```
var myStr = "Bob";
myStr = "Job";
```

# JavaScript

## Syntax
A programming language's commands, special words and punctuation.

## Statement
Is like a sentence
* ends with a semi-colon;

## Program
Set of statements that run one after the other
One statement needs to be complete before the next statement runs

## Browsers
Every browser has a JavaScript interpreter built into it. It will read, understand and run the instructions in a JS program.
* when a browser finds JS, the JS interpreter reads each statement and does what the statement says.
* Your program `runs` as the JS interpreter reads it
* When a browser follows the instructions in a program, it "runs" or "executes" that program.

**Can not do**
```
<script src="script.js">
 alert("Yo");
</script>
```
* Must have on script file per link to an external JS file.
* Can have multiple SCRIPT tags on a page.

## Console
* Only shows you one error at a time
* Fix that error and then deal with the next error (if there is one)
* Rinse and repeat

**Note:**
One benefit of putting your JavaScript code just before the closing </body> tag on a web page is visitors will be able to see the contents of the web page BEFORE the JS runs.

* Sometimes Chrome doesn't list a line number of a JS error. Sometimes refreshing the page lists the line number

# Variables
var name = 0; // assigning a value to a variable
* only use var keyword when you first create a variable

## Naming variables
[JS Reserved Words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)
* Can NOT start with a number (Bad: 9lives)
    - right1 is a valid variable name
* Can only contain letters, numbers, $, _ 
    - Bad
        + pricePer#
        + @home
    - Good
        + price$
        + home_alone

## Values
* Numbers
* Strings

### Escape Strings

```js
message = 'She\s a great person!';
htmlSnippet = "<h1 class=\"special\">Yes</h1>";
```

## Prompt
prompt() returns a value
* we can store that returned value

```js
var visitorName = prompt('What is your name?'); 
```

## Concatenation

```js
'Welcome ' + 'to ' + 'the' + ' jungle';
```

```
var message = "This is my message.";
message = message + " I am adding onto the first message.";
message += " I am using a shortcut here to add again to message.";
document.write(message);
```

object.property
message.length

# Objects
* A string, the document, the browser's console
* Object have properties, such as the length of a string
* Objects have methods, which are actions the object can perform

[MDN: JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

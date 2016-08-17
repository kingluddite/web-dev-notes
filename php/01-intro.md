# PHP
* released in 1995
* PHP Hypertext Pre-Processor
Server side language
code processed on server
server receives request from a client
processes that script on that server
returns results as HTML response to client machine
* your web browser is the client
* no source code on client has php only html server outputs after server php program

statement: in programming, an instruction to perform a specified action

```php
<?php echo 'Hello world'; ?>
```

CLI - Command Line Interface
processes the code and only outputs the result

space code properly

## PHP comments
### Single Line Comment
```php
// single line
```

they can even wrap, don't add hard return

### Multi Line Comment
```php
/* multi
multi
line
comment
*/
```

### docblock comments
```php
/*
 * Doc Block comment
 *
 * @author: Pip
*/
```

## Variables
$score = 100;

Scalar (base) Type

Type | Value | Example
boolean | true/false | $myBoolean = true;
integer | 1 thru 9 or -1 thru -9 | $myInteger = 1;
float | Uses a decimal place | $myFloat = 2.25;
string | combines any number of characters | $myString = "Hello World";

### Compound Types
Array
Object


# How do I upgrade to PHP 7
[Quick Start Tutorial](https://jason.pureconcepts.net/2016/09/upgrade-php-mac-os-x/)

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

How do I upgrade to the latest version
[Grab a site to get the latest version of php](https://coolestguidesontheplanet.com/upgrade-php-on-osx/)

But you won't see the latest version of php [because you need to add it to your path](http://apple.stackexchange.com/questions/107230/why-does-my-os-x-still-run-older-php-even-though-i-updated-it)

php-osx doesn't overwrite the php binaries installed by Apple, but installs everyting in /usr/local/php5. The new php binary is therefore in /usr/local/php5/bin/php.

I am using zsh so in my .zshrc

I add this line
`export PATH=/usr/local/php5/bin:$PATH`

I then `$ source ~/.zshrc`

run `$ php -v` and you should now see the latest version


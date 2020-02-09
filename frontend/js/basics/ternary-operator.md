# Diving Deep into Okta Expressions
(Level: Advanced)

## Let's first see the Okta Expression we will be dissecting
* Below is a similar Okta Expression we used on a client to help them meet specific needs they had for their Okta production instance

### The Problem
Workday was their HRaaM in Okta. They had multiple domains. For the sake of this example let's say the domains were `website-one-gov.com`, `website-two.com` and `website-three.com`. For this company they had an all government portion of the site and a non-government portion. We were told that every user in Workday had a manager assigned to them in Workday.

Our client wanted Okta to automatically change the employees manager's email to have a domain of `website-two.com` or `website-three.com` depending on certain logic.

### The Client's Logic
If the employee had a government domain `website-one-gov.com` then search if that user had a Workday account. If they did, then find that user's manager's email and change it to have domain of `website-two.com`.

If that employee was not in Workday, or did not have a `website-one-gov.com` domain in their email then find that user's manager's email and set it to have a `website-three.com` domain. Whew!

So...

If a user's email was `john.doe@website-one-gov.com`, and he was found in Workday and his manager was `jane.doe@anything.com`, Jane's email would be updated to `jane.doe@website-two.com`.

But if John did not have a `website-one-gov.com` domain his manager's email would be updated to `jane.doe@website-three.com`

But if John did not have `website-one-gov.com` domain in his email, Jane's email would be updated to `jane.doe@website-three.com`

And finally, if John had a website-one-gov.com domain in his email but did not have a Workday account, Jane, his manager would have her email updated to `jane.doe@website-three.com`

Whew!

## Now that we understand the problem, here's the solution we came up with

```javascript
String.stringContains(user.email,"@website-one-gov.com") ? workday_aaaaaaa.hasWorkdayUser() ? String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-two.com') : String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com') : String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com')
```

## Pretty intimidating, huh?
Don't worry, my goal of this blog post is to break down the above Okta Expression so that even a 5 year old can understand it. It seems almost impossible to wrap your head around this Okta Expression the first time you see it but let's break into into more digestible pieces.

### The pieces of the puzzle
* Okta Expression language gives us access to some powerful and useful methods
* `StingContains()` let's us search for a string inside an email to find a match
* Okta sees Workday as an application so in the above code `workday_aaaaaaa` is just the name Okta associates with that instance of Workday. You could have 10 versions of Workday in Okta (not sure if that would be very practical but it is definitely possible in Okta land) and each instance needs it's own "name" so that Okta can communicate with it
* `hasWorkdayUser()` let's us find out if the user we are dealing with has an account in Workday
* `findWorkdayUser()` let's us find a specific user in Workday
* `String.join()` let's us build strings in Okta dynamically
* **note** A string is just a series of text characters tied together (a string of characters)
* Using `join()` we can take two strings "john.doe" and "@gmail.com" and `join` them together (aka concatenate them) to form "john.doe@gmail.com"

### If Else statements
Every programming language has it's own version of `if/else` statements. Programming at it's core is just true and false or 0 and 1.

If it is sunny outside wear sunglasses, else don't wear sunglasses. Simple, right?

The developers at Iron Cove Solutions have a strong background in JavaScript so working with Okta Expressions is an easy transition because the language Okta Expressions was based on, `SpEL` is very similar to JavaScript. Since JavaScript is fairly ubiquitous in the world of coding we'll use that to explain an `if/else` statement written programmatically.

```javascript
var age = 19;
var canDrive;
if (age > 16) {
    canDrive = 'yes';
} else {
    canDrive = 'no';
}
```

In the above fragment of code we have a simple `if/else` statement written in JavaScript.

We declare an `age` variable and set it to 19. We have another variable `canDrive` and we don't assign it a value yet.

We then write our `if/else` and say if `age` is greater than the number 16, we will assign the `canDrive` to a string value of `yes` else we will assign it to a string value of `no`

Simple, right?

## The Ternary operator
If you are not aware of this programmers are lazy. They hate typing the same stuff over and over again. They like to follow a DRY principle - "Don't Repeat Yourself". And if a programmer can cut a corner and save some time, you can bet your bottom dollar, they will take that shortcut. Some may say programmers are lazy but I like to think of me and my coding brethren as efficient.

So the reason the ternary operator was created was to make developers type less. And it should be noted that you will see the ternary operator used in most programming languages used today.

Below is the same code fragment above converted into a ternary operator

```javascript
var age = 19;
var canDrive = age > 16 ? 'yes' : 'no';
```

The code looks cleaner, right? Less typing. We went from 7 lines of code to 2 lines of code. Now that's what I call efficient!

## The General Syntax for the Ternary operator
```
condition ? expression_1 : expression_2;
```

Breaking it down a little further

```
condition (true or false) ? if condition evaluates true do this : else do this;
```

### Getting back to our monster Okta Expression
```javascript
String.stringContains(user.email,"@website-one-gov.com") ? workday_aaaaaaa.hasWorkdayUser() ? String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-two.com') : String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com') : String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com')
```

### Breaking it down
Yes, it still looks intimidating but let's break it up into easy to understand pieces

#### Our initial condition
```
String.stringContains(user.email,"@website-one-gov.com")
```

We search the user's email for the string `@website-one-gove.com`. If we find it the condition is true, else it is false

### Nested ternary operators
What makes our monster Okta Expression so intimidating is we are nested a ternary operator inside another ternary operator.

After the first `?` in our monster Okta Expression we see:

```javascript
workday_aaaaaaa.hasWorkdayUser() ? String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-two.com') : String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com')
```

The secret to solving nested ternary operators is starting from the inside of the expression and working your way out

We grab the condition and find out if it is true or false

```
workday_aaaaaaa.hasWorkdayUser()
```

In the parent ternary operator we gained access to a specific user and this is the user we are checking if they exist in this instance of Workday. If they do, the value is true, else it is false

#### If true (user exists in Workday)
```
String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-two.com')
```

Find the user's manager's name and join that manager's string name with this string `@website-two.com` which would be `jane.doe@website-two.com`

#### If false (user doesn't exist in Workday)
```javascript
String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com')
```

* Else make the user's manager's name join with `@website-three.com` which would be `jane.doe@website-three.com`

### The outside ternary operator's else
Finally we grab the else part of the parent ternary operator

```javascript
String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com')
```

* If the original condition, the user's email had a string `@website-one-gov.com` then make their manager's email by joining `jane.doe` and `@website-three.com` to form `jane.doe@website-three.com`

### Easier to Understand
If you can see this code:

```javascript
String.stringContains(user.email,"@website-one-gov.com") ? workday_aaaaaaa.hasWorkdayUser() ? String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-two.com') : String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com') : String.join('', workday_aaaaaaa.findWorkdayUser().managerUserName, '@website-three.com')
```

As the below code then chances are high you will have a far easier time understanding complex Okta Expressions and using their full power inside your Okta tenant.

```
condition 1 (true or false) ? 
    condition 2 (true or false) ? 
        if condition 2 is true do this : 
        if condition 2 is false do this : 
if condition 1 is false do this
```

### Conclusion
Hopefully you now understand Okta Expressions a lot better and did this article make it possible for a 5 year old to understand it? I'll leave that up to you to decide.

If you have any questions or would like Iron Cove Solutions to help you make full use of your Okta tenant, feel free to give us a call.






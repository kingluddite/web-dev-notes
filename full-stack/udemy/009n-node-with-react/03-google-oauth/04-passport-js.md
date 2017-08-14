# Overview of Passport JS
* Passport JS is a helper library
* It will help us create this application flow

![Passport JS handles diagram](https://i.imgur.com/vWRJ6y8.png)

* Everything in the yellow box is what Passport JS will help us achieve without us having to write a lot of boilerplate code

## Two Common Complaints about Passport JS
* In order for Passport JS to work, it requires us to jump into specific parts inside the yellow box outlined above and add some custom code
    - So Passport JS automates the vast majority of the process but not the entire process
    - The problem with having to add code here and there is it prevents us, the developers, from seeing the full picture of what is going on
    - Like we add code here and there without having a good understanding of how it all fits together
* The inherent confusion of how the Library is structured
    - We are talking about Passport JS but when you use Passport JS we are actually making use of two different libraries
        + passport
        + passport strategy

## Passport Library Components
* `passport` - General helpers for handling auth in Express apps
* `passport strategy` - Helpers for authenticating with one very specific method (email/password, Google, Facebook, etc)
    - For every site you want to use OAuth with, you must install a separate Strategy for each
        + And wire all them up inside your app
    - We are just adding one Passport Strategy - Google

## Passport website
[link](http://passportjs.org/)

* You will see the word `Strategies` all over the place
* [The documentation](http://passportjs.org/docs) is not super clear
* Click on `Strategies` to see all the available Strategies you can use
    - We are using Google, you could use any of these

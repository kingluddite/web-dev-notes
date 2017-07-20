# Conceptual Aside
## Packages and Package Mangers

## Package
* Code... Just a collection of code and you can use it in your code
* ... managed and maintained with a package management system

## Package Management System:
* Software that automates installing and updating packages
* Deals with what version you have or need, and manages **dependencies**
    - Your code gets installed via the system
    - And it gets updated via the package management system
    - The software will do that for you so you don't have to manually know which version you have and when you need to update to a newer version
    - It deals with the code you need but it also manages **dependencies**

## Dependencies
* Code that another set of code depends on to function
* If you use that code in your app, it is a dependency
    - Your app depends on it to function
    - And that dependency package might itself have dependencies where it depends on other code to work etc. etc. etc.
    - This can get really unmanageable if you don't have a good package management system

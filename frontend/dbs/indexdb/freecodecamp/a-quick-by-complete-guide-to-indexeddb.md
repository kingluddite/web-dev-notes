# Intro to IndexedDB
* [resource](https://www.freecodecamp.org/news/a-quick-but-complete-guide-to-indexeddb-25f030425501/)
* The definitive solution for storing data in browsers
* It's an asynchronous API, which means that performing costly operations won't block the UI thread providing a sloppy experience to users
* It can store an indefinite amount of data
    - Although once over a certain threshold the user is prompted to give the site higher limits
* [supported in all modern browsers](http://caniuse.com/#feat=indexeddb)

## What else can we store inside the browser?
* Cookies
    - Can host a very small amount of strings
* Web Storage (aka DOM Storage)
    - A term that commonly identifies `localStorage` and `sessionStorage`, two **key/value** stores
        + `sessionStorage`, does not retain data, which is cleared when the session ends
        + while `localStorage` keeps the data across sessions

### Cons of Local/session storage
* Capped at a small (and inconsistent) size
    - browsers offering 2MB - 10MB of space per site

## What about Web SQL? - DON'T USE
* Used in the past - but now it is deprecated and not supported in some modern browsers
* Never was recognized as a standard and SHOULD NOT BE USED
    - **note** But [83% of users have this technology on their devices](http://caniuse.com/#feat=sql-storage)

## How man databases per site?
* You can create multiple Databases per site but generally the rule of thumb is one single Database (and inside that Database you can create multiple object stores)
* **note** A Database is private to a domain (so any other site cannot access another website IndexedDB stores)

## What can a store contain?
* strings
* numbers
* objects
* arrays
* dates
* NOT BOOLEAN

### Other facts about a store
* A store contains a number of items which have a unique key (which represents the way by which an object can be identified)

#### How can these stores be altered? `transactions`
* By performing the following operations:
    - add,
    - edit
    - delete
* And iterating over the items they contain

## Promises
* Since the advent of Promises in ES6, and the subsequent move of APIs to usings promises, the IndexedDB API might seem out of date

### A slight improvement
* This makes using IndexedDB easier to use
* [idb docs](https://github.com/jakearchibald/idb)
    - A tiny layer on top of the IndexedDB API to make it easier to use

## How do I create an IndexedDB Database?
/poll "fist of 5 or thumbs up/thumbs down?" "fist of 5" "thumbs up/down" anonymous
